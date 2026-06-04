// ─── Shared components used on every page ────────────────────────────────────
// Registered automatically by createBookClubApp() in app.js.
// Styling comes from style.css — no inline Tailwind needed here.
// ─────────────────────────────────────────────────────────────────────────────

const AppNav = {
  props: ['page'],
  template: `
    <nav class="border-b border-[#b8c6bb]">
      <ul class="flex flex-col md:flex-row justify-center gap-6 p-4 text-sm">
        <li><a href="index.html"      :class="['nav-link', { active: page === 'home' }]">Home</a></li>
        <li><a href="maingroup.html"  :class="['nav-link', { active: page === 'main' }]">Main Book Discussions</a></li>
        <li><a href="fantasy.html"    :class="['nav-link', { active: page === 'fantasy' }]">Fantasy Reading Group</a></li>
        <li><a href="forum.html"      :class="['nav-link', { active: page === 'forum' }]">Members' Forum</a></li>
        <li><a href="admin.html"      :class="['nav-link', { active: page === 'admin' }]">Organizer Dashboard</a></li>
      </ul>
    </nav>
  `
};

const AppFooter = {
  template: `
    <footer class="text-center text-sm text-muted py-6 border-t border-[#b8c6bb]">
      &copy; 2026 Linz English Book Club
    </footer>
  `
};
