import { ColorModeProvider, ColorModeScript } from "@kobalte/core/color-mode";

import { Workbench } from "@/components/workbench/workbench";

export default function App() {
  return (
    <>
      <ColorModeScript />
      <ColorModeProvider>
        <Workbench></Workbench>
      </ColorModeProvider>
    </>
  );
}
