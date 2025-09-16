import { throttle } from "@solid-primitives/scheduled";
import { KeyCode, KeyMod, languages, editor as mEditor, Uri } from "monaco-editor";
import { type Component, createEffect, onCleanup, onMount } from "solid-js";

import { liftOff } from "./setupSolid";

const Editor: Component<{
  model: mEditor.ITextModel;
  disabled?: true;
  isDark?: boolean;
  withMinimap?: boolean;
  formatter?: Worker;
  linter?: Worker;
  displayErrors?: boolean;
  onDocChange?: (code: string) => void;
  onEditorReady?: (
    editor: mEditor.IStandaloneCodeEditor,
    monaco: {
      Uri: typeof Uri;
      editor: typeof mEditor;
    },
  ) => void;
}> = (props) => {
  let parent!: HTMLDivElement;
  let editor: mEditor.IStandaloneCodeEditor;

  if (props.formatter) {
    languages.registerDocumentFormattingEditProvider("typescript", {
      async provideDocumentFormattingEdits(model) {
        props.formatter!.postMessage({
          code: model.getValue(),
          event: "FORMAT",
          pos: editor.getPosition(),
        });

        return await new Promise((resolve) => {
          props.formatter!.addEventListener(
            "message",
            ({ data: { code } }) => {
              resolve([
                {
                  range: model.getFullModelRange(),
                  text: code,
                },
              ]);
            },
            { once: true },
          );
        });
      },
    });
  }
  if (props.linter) {
    const listener = ({ data }: any) => {
      if (props.displayErrors) {
        const { event } = data;
        if (event === "LINT") {
          mEditor.setModelMarkers(props.model, "eslint", data.markers);
        } else if (event === "FIX") {
          mEditor.setModelMarkers(props.model, "eslint", data.markers);
          data.fixed && props.model.setValue(data.output);
        }
      }
    };
    props.linter.addEventListener("message", listener);
    onCleanup(() => props.linter?.removeEventListener("message", listener));
  }

  const runLinter = throttle((code: string) => {
    if (props.linter && props.displayErrors) {
      props.linter.postMessage({
        code,
        event: "LINT",
      });
    }
  }, 250);

  // Initialize Monaco
  onMount(() => {
    editor = mEditor.create(parent, {
      automaticLayout: true,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 14,
      lineDecorationsWidth: 5,
      lineNumbersMinChars: 3,
      minimap: {
        enabled: props.withMinimap,
      },
      model: null,
      padding: { top: 15 },
      readOnly: props.disabled,
    });

    createEffect(() => {
      editor.updateOptions({ readOnly: !!props.disabled });
    });

    if (props.linter) {
      editor.addAction({
        contextMenuGroupId: "1_modification",
        contextMenuOrder: 3.5,
        id: "eslint.executeAutofix",
        label: "Fix all auto-fixable problems",
        run: (ed) => {
          const code = ed.getValue();
          if (code) {
            props.linter?.postMessage({
              code,
              event: "FIX",
            });
          }
        },
      });
    }

    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => {
      // auto-format
      editor.getAction("editor.action.formatDocument")?.run();
      // auto-fix problems
      props.displayErrors && editor.getAction("eslint.executeAutofix")?.run();
      editor.focus();
    });

    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      props.onDocChange?.(code);
      runLinter(code);
    });
  });
  onCleanup(() => editor.dispose());

  createEffect(() => {
    editor.setModel(props.model);
    liftOff();
  });

  createEffect(() => {
    mEditor.setTheme(props.isDark ? "vs-dark-plus" : "vs-light-plus");
  });

  createEffect(() => {
    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: !props.displayErrors,
      noSyntaxValidation: !props.displayErrors,
    });
  });

  createEffect(() => {
    if (props.displayErrors) {
      // run on mount and when displayLintMessages is turned on
      runLinter(editor.getValue());
    } else {
      // reset eslint markers when displayLintMessages is turned off
      mEditor.setModelMarkers(props.model, "eslint", []);
    }
  });

  onMount(() => {
    props.onEditorReady?.(editor, { editor: mEditor, Uri });
  });

  return <div class="min-h-0 min-w-0 flex-1 p-0" ref={parent} />;
};

export default Editor;
