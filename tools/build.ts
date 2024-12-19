import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

// Create a pseudo build directory
rmSync("build", { recursive: true, force: true });
mkdirSync("build");
const config = {
  name: "pages-redirected-config",
  compatibility_date: "2024-12-01",
  pages_build_output_dir: "./public",
  vars: {
    generated: "HELLO AGAIN 3",
    PAGES_BUILD_IMAGE:
      "us-west1-docker.pkg.dev/cloudflarepages/pages-build-image/ew/pages-infra/pages-build-image-v2/carmen/bump-wrangler-version:1843-bfed6b7-amd64@sha256:8f4ef4c0b3c3377de3eede9fd1e68f45ca9d8589828accf4decf9c782bfa9162",
  },
};
writeFileSync("build/wrangler.json", JSON.stringify(config, undefined, 2));

mkdirSync("build/public");
copyFileSync("src/index.js", "build/public/_worker.js");

// Create the redirect file
rmSync(".wrangler/deploy", { recursive: true, force: true });
mkdirSync(".wrangler/deploy", { recursive: true });
const redirect = { configPath: "../../build/wrangler.json" };
writeFileSync(
  ".wrangler/deploy/config.json",
  JSON.stringify(redirect, undefined, 2)
);
