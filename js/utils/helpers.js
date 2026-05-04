// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ 
export const arrayUtils = {
    /**
     * Применить функцию к каждому элементу (аналог map)
     */
    map: (arr, fn) => arr.map(fn),
    
    /**
     * Отфильтровать массив
     */
    filter: (arr, predicate) => arr.filter(predicate),
    
    /**
     * Свернуть массив в одно значение
     */
    reduce: (arr, fn, initial) => arr.reduce(fn, initial),
    
    /**
     * Выполнить действие для каждого элемента
     */
    forEach: (arr, fn) => {
        arr.forEach(fn);
        return arr;
    },
    
    /**
     * Найти первый элемент, соответствующий условию
     */
    find: (arr, predicate) => arr.find(predicate),
    
    /**
     * Проверить, все ли элементы удовлетворяют условию
     */
    every: (arr, predicate) => arr.every(predicate),
    
    /**
     * Проверить, хотя бы один элемент удовлетворяет условию
     */
    some: (arr, predicate) => arr.some(predicate)
};

/**
 * Функции для работы с объектами
 */
export const objectUtils = {
    /**
     * Получить ключи объекта
     */
    keys: (obj) => Object.keys(obj),
    
    /**
     * Получить значения объекта
     */
    values: (obj) => Object.values(obj),
    
    /**
     * Получить пары ключ-значение
     */
    entries: (obj) => Object.entries(obj),
    
    /**
     * Объединить объекты
     */
    merge: (...objs) => Object.assign({}, ...objs),
    
    /**
     * Глубокое копирование объекта
     */
    clone: (obj) => JSON.parse(JSON.stringify(obj))
};

/**
 * Функции для работы со строками
 */
export const stringUtils = {
    /**
     * Заглавная первая буква
     */
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    
    /**
     * Убрать пробелы
     */
    trim: (str) => str.trim(),
    
    /**
     * Преобразовать в нижний регистр
     */
    toLowerCase: (str) => str.toLowerCase(),
    
    /**
     * Преобразовать в верхний регистр
     */
    toUpperCase: (str) => str.toUpperCase(),
    
    /**
     * Включает ли строка подстроку
     */
    includes: (str, substr) => str.includes(substr),
    
    /**
     * Заменить в строке
     */
    replace: (str, search, replacement) => str.replace(new RegExp(search, 'g'), replacement),
    
    /**
     * Разбить строку
     */
    split: (str, separator) => str.split(separator)
};

/**
 * Функции для работы с датами
 */
export const dateUtils = {
    /**
     * Получить текущую дату
     */
    now: () => new Date(),
    
    /**
     * Форматировать дату
     */
    format: (date, format = 'DD.MM.YYYY') => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        return format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year);
    },
    
    /**
     * Добавить дни к дате
     */
    addDays: (date, days) => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    },
    
    /**
     * Получить разницу между датами в днях
     */
    daysBetween: (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diff = Math.abs(d2 - d1);
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    },
    
    /**
     * Проверить, прошла ли дата
     */
    isPast: (date) => new Date(date) < new Date(),
    
    /**
     * Проверить, будущая ли дата
     */
    isFuture: (date) => new Date(date) > new Date()
};

/**
 * Функции валидации
 */
export const validators = {
    /**
     * Проверить email
     */
    isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    
    /**
     * Проверить номер телефона
     */
    isPhone: (phone) => /^(\+7|7|8)?(\d{10})$/.test(phone.replace(/[-\s()]/g, '')),
    
    /**
     * Проверить URL
     */
    isUrl: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    /**
     * Проверить, что строка не пустая
     */
    isNotEmpty: (str) => str && str.trim().length > 0,
    
    /**
     * Проверить длину строки
     */
    minLength: (str, length) => str && str.length >= length,
    
    /**
     * Проверить максимальную длину
     */
    maxLength: (str, length) => str && str.length <= length,
    
    /**
     * Проверить, что значение число
     */
    isNumber: (value) => !isNaN(value) && isFinite(value),
    
    /**
     * Проверить, что строка содержит только буквы
     */
    isAlpha: (str) => /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(str)
};

/**
 * Функции для DOM манипуляций
 */
export const domUtils = {
    /**
     * Получить элемент
     */
    get: (selector) => document.querySelector(selector),
    
    /**
     * Получить все элементы
     */
    getAll: (selector) => document.querySelectorAll(selector),
    
    /**
     * Создать элемент
     */
    create: (tag, className = '') => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        return el;
    },
    
    /**
     * Добавить класс
     */
    addClass: (el, className) => {
        if (el) el.classList.add(className);
    },
    
    /**
     * Удалить класс
     */
    removeClass: (el, className) => {
        if (el) el.classList.remove(className);
    },
    
    /**
     * Установить текст
     */
    setText: (el, text) => {
        if (el) el.textContent = text;
    },
    
    /**
     * Установить HTML
     */
    setHtml: (el, html) => {
        if (el) el.innerHTML = html;
    },
    
    /**
     * Показать элемент
     */
    show: (el) => {
        if (el) el.style.display = 'block';
    },
    
    /**
     * Скрыть элемент
     */
    hide: (el) => {
        if (el) el.style.display = 'none';
    }
};

export default {
    arrayUtils,
    objectUtils,
    stringUtils,
    dateUtils,
    validators,
    domUtils
};
