/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   env: {
//     // __VALUE__: `"${process.env.REACT_APP_API_URL}"`,
//     // API_URL: import.meta.env.VITE_REACT_APP_API_URL,
//     API_URL: process.env.VITE_REACT_APP_API_URL,
//   },
// });
// eslint-disable-next-line no-unused-vars
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      "process.env.API_URL": JSON.stringify(env.REACT_APP_API_URL),
    },
  };
});
