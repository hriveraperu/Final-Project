import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        register: resolve(__dirname, "src/register.html"),
        forgotten: resolve(__dirname, "src/forgot.html"),
        user: resolve(__dirname, "src/user/index.html"),
        header: resolve(__dirname, "src/partials/header.html"),
        footer: resolve(__dirname, "src/partials/footer.html"),
        time: resolve(__dirname, "src/time/index.html")
      },
    },
  },
});
