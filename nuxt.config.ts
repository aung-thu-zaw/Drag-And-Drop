// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: "light",
  },
  app: {
    head: {
      script: [
        {
          src: "https://kit.fontawesome.com/18c274e5f3.js",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
