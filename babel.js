import { promises as fs } from "fs";
import chokidar from "chokidar";
import { transformAsync } from "@babel/core";

const file = "code.tsx";

chokidar.watch([file]).on("all", async () => {
  try {
    const code = await fs.readFile(file, "utf-8");
    const result = await transformAsync(code, {
      filename: file,
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: {
              firefox: "97",
            },
          },
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: ["./plugin.js"],
    });
    console.log(result?.code);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
