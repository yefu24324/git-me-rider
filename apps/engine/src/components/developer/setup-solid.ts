import { languages } from "monaco-editor";

const solidTypes: Record<string, string> = import.meta.glob("/node_modules/{solid-js,csstype}/**/*.{d.ts,json}", {
  eager: true,
  import: "default",
  query: "?raw",
});

for (const path in solidTypes) {
  languages.typescript.typescriptDefaults.addExtraLib(solidTypes[path], `file://${path}`);
  languages.typescript.javascriptDefaults.addExtraLib(solidTypes[path], `file://${path}`);
}
