//ГЛАВНЫЙ МОДУЛЬ ПРИЛОЖЕНИЯ (ES MODULES)

import { BasePage } from './pages/BasePage.js';
import { ProjectCardList } from './components/ProjectCard.js';
import { DataTable } from './components/DataTable.js';
import { siteInfo, skills, projects, courseTable } from './data/constants.js';
import { arrayUtils, validators, domUtils, dateUtils } from './utils/helpers.js';

/**
 * Основной класс приложения
 */
class App {
    constructor() {
        this.currentPage = null;
        this.projects = projects;
        this.skills = skills;
        this.courseTable = courseTable;
        this.visitCount = parseInt(localStorage.getItem('visitCount') || '0');
        this.sessionStartTime = Date.now();
    }
    
    /**
     * Инициализировать приложение
     */
    init() {
        console.log('🚀 Приложение инициализировано');
        
        // Инициализируем базовую страницу
        this.currentPage = new BasePage('Main');
        this.currentPage.init();
        
        // Инициализируем компоненты
        this.initComponents();
        this.setupEventListeners();
        this.updateVisitStats();
        this.showGreeting();
    }
    
    /**
     * Инициализировать компоненты страницы
     */
    initComponents() {
        // Компонент проектов
        this.initProjectsComponent();
        
        // Компонент таблицы курсов
        this.initCoursesTable();
        
        // Компонент калькулятора
        this.initCalculator();
        
        // Компонент конвертера валют
        this.initCurrencyConverter();
    }
    
    /**
     * Инициализировать проекты
     */
    initProjectsComponent() {
        const container = document.getElementById('projects-list');
        if (!container) return;
        
        const projectList = new ProjectCardList(this.projects);
        container.innerHTML = projectList.renderAll();
        
        // Добавляем фильтры
        const filterContainer = document.createElement('div');
        filterContainer.id = 'project-filters';
        filterContainer.style.cssText = `
            margin-bottom: 20px;
            padding: 15px;
            background: var(--card-bg);
            border-radius: 8px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        `;
        
        filterContainer.innerHTML = `
            <input type="text" id="project-search" placeholder="Поиск по названию..." style="
                padding: 8px;
                background: var(--bg-dark);
                border: 1px solid var(--primary-green);
                color: var(--text-light);
                border-radius: 4px;
                flex: 1;
                min-width: 200px;
            ">
            <select id="project-tech-filter" style="
                padding: 8px;
                background: var(--bg-dark);
                border: 1px solid var(--primary-green);
                color: var(--text-light);
                border-radius: 4px;
            ">
                <option value="">Все технологии</option>
                <option>HTML5</option>
                <option>CSS3</option>
                <option>JavaScript</option>
                <option>React</option>
                <option>API</option>
            </select>
            <button id="project-reset" style="
                padding: 8px 16px;
                background: var(--primary-green);
                color: var(--bg-dark);
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            ">Сбросить</button>
        `;
        
        container.parentElement.insertBefore(filterContainer, container);
        
        // Обработчики фильтров
        document.getElementById('project-search').addEventListener('input', (e) => {
            const filtered = new ProjectCardList(this.projects)
                .filterByName(e.target.value)
                .renderAll();
            container.innerHTML = filtered;
        });
        
        document.getElementById('project-tech-filter').addEventListener('change', (e) => {
            const filtered = e.target.value 
                ? new ProjectCardList(this.projects).filterByTechnology(e.target.value).renderAll()
                : projectList.renderAll();
            container.innerHTML = filtered;
        });
        
        document.getElementById('project-reset').addEventListener('click', () => {
            document.getElementById('project-search').value = '';
            document.getElementById('project-tech-filter').value = '';
            container.innerHTML = projectList.renderAll();
        });
    }
    
    /**
     * Инициализировать таблицу курсов
     */
    initCoursesTable() {
        const container = document.getElementById('courses-table');
        if (!container) return;
        
        const table = new DataTable(this.courseTable, [
            { key: 'course', label: 'Курс' },
            { key: 'provider', label: 'Провайдер' },
            { key: 'duration', label: 'Продолжительность' },
            { key: 'status', label: 'Статус' },
            { key: 'rating', label: 'Рейтинг', render: (val) => val > 0 ? '⭐'.repeat(val) : '-' }
        ]);
        
        const filterHtml = `
            <div id="courses-filter" style="
                margin-bottom: 20px;
                padding: 15px;
                background: var(--card-bg);
                border-radius: 8px;
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            ">
                <input type="text" id="courses-search" placeholder="Поиск по названию курса..." style="
                    padding: 8px;
                    background: var(--bg-dark);
                    border: 1px solid var(--primary-green);
                    color: var(--text-light);
                    border-radius: 4px;
                    flex: 1;
                    min-width: 200px;
                ">
                <select id="courses-status" style="
                    padding: 8px;
                    background: var(--bg-dark);
                    border: 1px solid var(--primary-green);
                    color: var(--text-light);
                    border-radius: 4px;
                ">
                    <option value="">Все статусы</option>
                    <option>Завершён</option>
                    <option>В процессе</option>
                    <option>Планируется</option>
                </select>
                <button id="courses-reset" style="
                    padding: 8px 16px;
                    background: var(--primary-green);
                    color: var(--bg-dark);
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                ">Сбросить</button>
            </div>
            ${table.render()}
        `;
        
        container.innerHTML = filterHtml;
        
        // Фильтры таблицы
        document.getElementById('courses-search').addEventListener('input', (e) => {
            table.reset().filter('course', e.target.value);
            document.getElementById('courses-table').querySelector('table').replaceWith(
                domUtils.create('div', 'temp')
            );
            document.getElementById('courses-table').innerHTML = filterHtml.split('<table>')[0] + table.render();
        });
        
        document.getElementById('courses-status').addEventListener('change', (e) => {
            table.reset().filter('status', e.target.value);
            document.getElementById('courses-table').innerHTML = filterHtml.split('<table>')[0] + table.render();
        });
        
        document.getElementById('courses-reset').addEventListener('click', () => {
            table.reset();
            document.getElementById('courses-table').innerHTML = filterHtml;
        });
    }
    
    /**
     * Инициализировать калькулятор
     */
    initCalculator() {
        const skillsSection = document.querySelector('.skills-table');
        if (!skillsSection) return;
        
        const calcBlock = document.createElement('section');
        calcBlock.id = 'calculator-section';
        calcBlock.innerHTML = `
            <h2>Калькулятор</h2>
            <div style="margin: 20px 0;">
                <input type="text" id="calc-display" readonly value="0" style="
                    width: 100%;
                    padding: 10px;
                    font-size: 24px;
                    background: var(--bg-dark);
                    color: var(--primary-green);
                    border: 2px solid var(--primary-green);
                    border-radius: 4px;
                    text-align: right;
                    margin-bottom: 10px;
                ">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px;">
                    ${this.getCalculatorButtons()}
                </div>
            </div>
        `;
        
        skillsSection.parentElement.insertBefore(calcBlock, skillsSection.nextSibling);
        this.setupCalculatorListeners();
    }
    
    /**
     * Получить кнопки калькулятора
     */
    getCalculatorButtons() {
        const buttons = [
            { label: 'C', action: 'clear', class: 'calc-btn' },
            { label: '/', action: 'operate://', class: 'calc-btn' },
            { label: '*', action: 'operate:*', class: 'calc-btn' },
            { label: '-', action: 'operate:-', class: 'calc-btn' },
            { label: '7', action: 'digit:7', class: 'calc-btn' },
            { label: '8', action: 'digit:8', class: 'calc-btn' },
            { label: '9', action: 'digit:9', class: 'calc-btn' },
            { label: '+', action: 'operate:+', class: 'calc-btn' },
            { label: '4', action: 'digit:4', class: 'calc-btn' },
            { label: '5', action: 'digit:5', class: 'calc-btn' },
            { label: '6', action: 'digit:6', class: 'calc-btn' },
            { label: '.', action: 'digit:.', class: 'calc-btn' },
            { label: '1', action: 'digit:1', class: 'calc-btn' },
            { label: '2', action: 'digit:2', class: 'calc-btn' },
            { label: '3', action: 'digit:3', class: 'calc-btn' },
            { label: '0', action: 'digit:0', class: 'calc-btn' },
            { label: '=', action: 'equals', class: 'calc-btn', style: 'grid-column: span 2; background: var(--secondary-pink);' }
        ];
        
        return buttons.map(btn => `
            <button class="${btn.class}" data-action="${btn.action}" style="
                padding: 10px;
                background: transparent;
                border: 2px solid var(--primary-green);
                color: var(--primary-green);
                cursor: pointer;
                font-weight: bold;
                border-radius: 4px;
                transition: all 0.2s;
                ${btn.style || ''}
            ">${btn.label}</button>
        `).join('');
    }
    
    /**
     * Установить слушатели для калькулятора
     */
    setupCalculatorListeners() {
        let display = '0';
        let result = 0;
        let operation = null;
        let shouldReset = false;
        
        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                
                if (action === 'clear') {
                    display = '0';
                    result = 0;
                    operation = null;
                    shouldReset = false;
                } else if (action.startsWith('digit:')) {
                    const digit = action.split(':')[1];
                    if (shouldReset) {
                        display = digit;
                        shouldReset = false;
                    } else {
                        display = display === '0' ? digit : display + digit;
                    }
                } else if (action.startsWith('operate:')) {
                    const op = action.split(':')[1];
                    result = parseFloat(display);
                    operation = op;
                    shouldReset = true;
                } else if (action === 'equals') {
                    if (operation) {
                        const current = parseFloat(display);
                        display = this.calculate(result, current, operation).toString();
                        operation = null;
                        shouldReset = true;
                    }
                }
                
                document.getElementById('calc-display').value = display;
            });
        });
    }
    
    /**
     * Вычислить
     */
    calculate(a, b, op) {
        switch(op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '//': return b !== 0 ? a / b : 0;
            default: return b;
        }
    }
    
    /**
     * Инициализировать конвертер валют
     */
    initCurrencyConverter() {
        const aboutSection = document.querySelector('main');
        if (!aboutSection || !document.querySelector('main h1') || !document.querySelector('main h1').textContent.includes('Обо мне')) return;
        
        // Добавить конвертер в About
    }
    
    /**
     * Установить слушатели событий
     */
    setupEventListeners() {
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                const menuToggle = document.getElementById('menu-toggle');
                if (menuToggle) menuToggle.checked = false;
            });
        });
        
        // ВАЖНО: theme.js уже управляет переключением темы, не добавляем дублирование
    }
    
    /**
     * Показать приветствие
     */
    showGreeting() {
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour >= 6 && hour < 12) greeting = 'Доброе утро! ☀️';
        else if (hour >= 12 && hour < 18) greeting = 'Добрый день! 🌤️';
        else if (hour >= 18 && hour < 21) greeting = 'Добрый вечер! 🌅';
        else greeting = 'Доброй ночи! 🌙';
        
        const header = document.querySelector('header');
        if (header && !document.getElementById('greeting-message')) {
            const greetingDiv = document.createElement('div');
            greetingDiv.id = 'greeting-message';
            greetingDiv.style.cssText = `
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 10px;
                font-size: 14px;
                color: var(--primary-green);
            `;
            greetingDiv.textContent = greeting;
            header.appendChild(greetingDiv);
        }
    }
    
    /**
     * Обновить статистику посещений
     */
    updateVisitStats() {
        this.visitCount++;
        localStorage.setItem('visitCount', this.visitCount);
        
        const statsBlock = document.createElement('div');
        statsBlock.id = 'visit-stats';
        statsBlock.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 255, 65, 0.9);
            color: #0d0208;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        `;
        statsBlock.textContent = `Посещений: ${this.visitCount}`;
        
        if (!document.getElementById('visit-stats')) {
            document.body.appendChild(statsBlock);
        }
        
        window.addEventListener('beforeunload', () => {
            const sessionTime = Math.round((Date.now() - this.sessionStartTime) / 1000);
            localStorage.setItem('lastSessionTime', sessionTime);
        });
    }
}

// Инициализировать приложение когда DOM готов
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
    window.app = app; // Для отладки в консоли
});

export default App;
