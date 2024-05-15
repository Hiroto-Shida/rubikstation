import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"

// export default defineConfig({
//   base: process.env.GITHUB_PAGES
//     ? "./rubic-timer/"
//     : "./",
//   plugins: [react()],
// });

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    build: { outDir: "docs" },
    base: process.env.VITE_BASE_URL,
    plugins: [react()],
  })
})
