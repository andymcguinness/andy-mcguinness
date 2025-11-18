// Theme management script
// This runs inline in the <head> to prevent flash of wrong theme

export function initTheme() {
  const getThemePreference = (): 'light' | 'dark' => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme: 'light' | 'dark') => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  };

  // Initialize theme
  const theme = getThemePreference();
  setTheme(theme);

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't manually set a preference
    const stored = localStorage.getItem('theme');
    if (!stored) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

export function toggleTheme() {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(next);
  localStorage.setItem('theme', next);

  // Dispatch custom event for components that need to react
  window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: next } }));
}

// Make toggleTheme available globally for the button
if (typeof window !== 'undefined') {
  (window as any).toggleTheme = toggleTheme;
}
