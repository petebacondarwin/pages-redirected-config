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
      "us-west1-docker.pkg.dev/cloudflarepages/pages-build-image/ew/pages-infra/pages-build-image-v2/carmen/bump-wrangler-version:1838-03599beab235@sha256:7884e702b0692f9471106bbd5cf37326b39e3f45b8bda9d4fdf17cb23e26e524",
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
