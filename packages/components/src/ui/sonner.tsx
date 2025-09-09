import { useColorMode } from "@kobalte/core";
import { Toaster as Sonner } from "somoto";

export const Toaster = (props: Parameters<typeof Sonner>[0]) => {
  const { colorMode } = useColorMode();

  return (
    <Sonner
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-border": "var(--border)",
        "--normal-text": "var(--popover-foreground)",
      }}
      theme={colorMode()}
      {...props}
    />
  );
};
