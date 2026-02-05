export default defineNuxtConfig({
  app: {
    head: {
      title: 'vishuro',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { 
          href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
          rel: 'stylesheet'
        }
      ]
    }
  },

  css: [
    '@/assets/global.css',
    '@/assets/SeasonTheme.css'
  ],

  // Auto-import komponentów
  components: true,

  // Tutaj możesz dodać np. @nuxtjs/tailwindcss itp.
  modules: [],

  // Jeśli potrzebujesz dodatkowych opcji build, dodaj tutaj
  build: {},

  compatibilityDate: '2025-02-14'
});