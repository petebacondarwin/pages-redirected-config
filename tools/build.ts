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
      "us-west1-docker.pkg.dev/cloudflarepages/pages-build-image/ew/pages-infra/pages-build-image-v2/carmen/bump-wrangler-version:1842-73eca9535446-amd64@sha256:2c40296bfcc02114cefda553a5763651ecd0090c68f453f1f76287d60275d0fe",
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
