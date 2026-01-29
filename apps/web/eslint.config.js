import { config as reactConfig } from "@repo/eslint-config/react-internal";
import { config as defineConfig } from "eslint/config";

export default defineConfig([
  ...reactConfig,
  {
    ignores: ["dist", "node_modules"],
  },
]);
