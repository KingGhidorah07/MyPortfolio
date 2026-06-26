  (function(){
    const THEME_KEY='portfolio-theme';
    const htmlEl=document.documentElement;
    function getInitialTheme(){const saved=localStorage.getItem(THEME_KEY);if(saved)return saved;return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
    function applyTheme(theme){htmlEl.setAttribute('data-theme',theme);localStorage.setItem(THEME_KEY,theme);updateToggleBtn(theme);}
    function updateToggleBtn(theme){const btn=document.getElementById('theme-toggle');if(!btn)return;btn.setAttribute('aria-label',theme==='dark'?'Cambiar a modo claro':'Cambiar a modo oscuro');}
    function toggleTheme(){const current=htmlEl.getAttribute('data-theme')||'light';applyTheme(current==='dark'?'light':'dark');}
    applyTheme(getInitialTheme());
    document.addEventListener('DOMContentLoaded',function(){const btn=document.getElementById('theme-toggle');if(btn){btn.addEventListener('click',toggleTheme);updateToggleBtn(htmlEl.getAttribute('data-theme'));}window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(e){if(!localStorage.getItem(THEME_KEY)){applyTheme(e.matches?'dark':'light');}});});
  })();
