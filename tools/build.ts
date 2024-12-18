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
      "us-west1-docker.pkg.dev/cloudflarepages/pages-build-image/ew/pages-infra/pages-build-image-v2/carmen/bump-wrangler-version:1841-9685ab84c64b-amd64@sha256:66de1ed216283ea9be43ae289f831263aa525b8bcc53ea47d403d937a7cbd92a",
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
