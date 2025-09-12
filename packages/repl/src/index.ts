import { transform } from "@babel/standalone";
import babelPresetSolid from "babel-preset-solid";

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
const result = babel(`
import { createSignal } from 'solid-js';

export function active() {
  return {
    a: 1,
    b: 2,
  }
}
`);

console.log(result);
