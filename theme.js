(function(){
    const btnId = 'theme-toggle';
    const body = document.body;
    const btn = document.getElementById(btnId);

    function applyTheme(theme){
        if(theme === 'light') {
            body.setAttribute('data-theme', 'light');
        } else {
            body.removeAttribute('data-theme');
        }

        if(btn){
            if(theme === 'light'){
                btn.classList.add('active');
                btn.textContent = '🌞';
            } else {
                btn.classList.remove('active');
                btn.textContent = '🌙';
            }
        }
    }

    const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(saved);

    if(btn){
        btn.addEventListener('click', function(){
            const current = body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }
})();
