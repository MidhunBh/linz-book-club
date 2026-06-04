// ─── createBookClubApp ────────────────────────────────────────────────────────
//
// Every page calls this instead of repeating the Vue setup boilerplate.
// Pass in your page-specific data() and methods just like you would to
// createApp(), and the shared components are registered automatically.
//
// Usage:
//   createBookClubApp({ data() {...}, methods: {...} }).mount('#app')
//
// ─────────────────────────────────────────────────────────────────────────────

function createBookClubApp(config) {
  const { createApp } = Vue;

  const app = createApp(config || {});

  // Shared components available on every page
  app.component('app-nav',    AppNav);
  app.component('app-footer', AppFooter);

  return app;
}
