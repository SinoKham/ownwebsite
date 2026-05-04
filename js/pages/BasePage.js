//БАЗА ДЛЯ ВСЕХ СТРАНИЦ (POM)

export class BasePage {
    constructor(pageName) {
        this.pageName = pageName;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
    }
    
    /**
     * Получить элемент по селектору
     */
    $(selector) {
        return document.querySelector(selector);
    }
    
    /**
     * Получить все элементы по селектору
     */
    $$(selector) {
        return document.querySelectorAll(selector);
    }
    
    /**
     * Инициализировать страницу
     */
    init() {
        console.log(`Инициализирована страница: ${this.pageName}`);
        this.setupThemeToggle();
        this.setupMenuToggle();
    }
    
    /**
     * Переключение темы
     */
    setupThemeToggle() {
        const themeBtn = this.$('#theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    /**
     * Переключение меню на мобильке
     */
    setupMenuToggle() {
        const menuToggle = this.$('#menu-toggle');
        const navLinks = this.$$('nav a');
        
        if (menuToggle && navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.checked = false;
                });
            });
        }
    }
    
    /**
     * Переключить тему
     */
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        if (this.currentTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
        } else {
            document.body.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', this.currentTheme);
    }
    
    /**
     * Рендерить HTML элемент
     */
    render(html, container) {
        if (typeof container === 'string') {
            container = this.$(container);
        }
        if (container) {
            container.innerHTML = html;
        }
    }
    
    /**
     * Добавить класс
     */
    addClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            element.classList.add(className);
        }
    }
    
    /**
     * Удалить класс
     */
    removeClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            element.classList.remove(className);
        }
    }
    
    /**
     * Проверить наличие класса
     */
    hasClass(element, className) {
        if (typeof element === 'string') {
            element = this.$(element);
        }
        if (element) {
            return element.classList.contains(className);
        }
        return false;
    }
}

export default BasePage;
