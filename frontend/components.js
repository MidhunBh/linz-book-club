const AppNav = {
  props: ['page'],
  template: `
    <nav class="border-b border-[#b8c6bb]">
      <ul class="flex flex-col md:flex-row justify-center gap-6 p-4 text-sm flex-wrap">
        <li><a href="index.html"     :class="['nav-link', { active: page === 'home' }]">Home</a></li>
        <li><a href="maingroup.html" :class="['nav-link', { active: page === 'main' }]">Main Group</a></li>
        <li><a href="fantasy.html"   :class="['nav-link', { active: page === 'fantasy' }]">Fantasy Group</a></li>
        <li><a href="meetings.html"  :class="['nav-link', { active: page === 'meetings' }]">Meetings</a></li>
        <li><a href="forum.html"     :class="['nav-link', { active: page === 'forum' }]">Forum</a></li>
        <li><a href="admin.html"     :class="['nav-link', { active: page === 'admin' }]">Organizer</a></li>
        <li><a href="login.html"     :class="['nav-link', { active: page === 'login' }]">Login</a></li>
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
