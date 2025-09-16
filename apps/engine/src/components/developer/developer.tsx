import "./setup-solid";
import { transform } from "@babel/standalone";
import { Button } from "@gmr/components/ui/button";
import babelPresetSolid from "babel-preset-solid";
import { editor, Uri } from "monaco-editor";

import Editor from "../editor";

function babel(source: string) {
  const { code } = transform(source, {
    filename: "repl.tsx",
    presets: [
      [babelPresetSolid, { generate: "dom", hydratable: false }],
      ["typescript", { onlyRemoveTypeImports: true }],
    ],
  });
  return { compiled: code, event: "BABEL" };
}

export function Developer() {
  const url = `file:///developer/main.tsx`;
  const uri = Uri.parse(url);
  const model = editor.createModel(
    `
import { createSignal } from 'solid-js';

const [name, setName] = createSignal("weizhihua");

export function active() {
  return {
    a: 1,
    b: 2,
  }
}

export function MarkdownControlHeaderRender(props: { rider: HeaderRiderNode }) {
  const text = toMarkdown(props.rider.node);
  return (
    <div class="markdown-heading hover:border-blue-700 border border-transparent">
      <Dynamic class="heading-element" component={"h" + props.rider.node.depth}>
        <For each={props.rider.children}>
          {(item) => {
            return <RiderRender rider={item} />;
          }}
        </For>
      </Dynamic>
      <a aria-label="Permalink: H1" class="anchor" href="#h1" id="user-content-h1">
        <span aria-hidden="true" class="octicon octicon-link"></span>
      </a>
    </div>
  );
}
`,
    "typescript",
    uri,
  );

  function compile() {
    const { compiled } = babel(model.getValue());
    console.log(compiled);
  }

  return (
    <>
      <Button onClick={compile}>Compile</Button>
      <Editor isDark={true} model={model} />;
    </>
  );
}
