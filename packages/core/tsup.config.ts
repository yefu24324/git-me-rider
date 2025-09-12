import { glob } from "glob";
import * as tsup from "tsup";
import * as preset from "tsup-preset-solid";

async function analysis() {
  // const files = await fs.readdir("src");
  const files = await glob("src/**/*.{ts,tsx}", {
    posix: true,
  });
  const entries = files.map((file) => {
    return {
      entry: file,
      name: file.replace("src/", "").replace(/(.tsx|.ts)?$/, ""),
    };
  });
  console.log(entries);
  return entries;
}

const preset_options: preset.PresetOptions = {
  cjs: false,
  drop_console: true,
  entries: await analysis(),
  out_dir: "dist",
};

export default tsup.defineConfig((config) => {
  const watching = !!config.watch;

  const parsed_data = preset.parsePresetOptions(preset_options, watching);

  if (!watching) {
    const package_fields = preset.generatePackageExports(parsed_data);

    // eslint-disable-next-line no-console
    console.log(`package.json: \n\n${JSON.stringify(package_fields, null, 2)}\n\n`);

    /*
		will update ./package.json with the correct export fields
		*/
    preset.writePackageJson(package_fields);
  }

  return preset.generateTsupOptions(parsed_data);
});
