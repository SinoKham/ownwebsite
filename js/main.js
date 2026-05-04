//ПЕРЕМЕННЫЕ И ТИПЫ ДАННЫХ
const siteData = {
    name: 'Сино',
    age: 19,
    university: 'ТюмГУ',
    email: 'sinohamraev@gmail.com',
    skills: ['HTML', 'CSS', 'JavaScript', 'C#', 'Python']
};

let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
let sessionStartTime = Date.now();

//счетчик посещений
function initVisitCounter() {
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    const avgTimeKey = 'avgSessionTime';
    const avgTime = localStorage.getItem(avgTimeKey) ? parseInt(localStorage.getItem(avgTimeKey)) : 0;
    
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
    
    statsBlock.innerHTML = `
        <div>Посещений: <span id="visit-number">${visitCount}</span></div>
        <div>Среднее время: <span id="avg-time">${avgTime}</span> сек</div>
    `;
    
    document.body.appendChild(statsBlock);
    
    // Обновляем среднее время при закрытии
    window.addEventListener('beforeunload', () => {
        const sessionTime = Math.round((Date.now() - sessionStartTime) / 1000);
        const newAvgTime = Math.round((avgTime * (visitCount - 1) + sessionTime) / visitCount);
        localStorage.setItem('avgSessionTime', newAvgTime);
    });
}

//ПРИВЕТСТВИЕ ПО ВРЕМЕНИ СУТОК
function showGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    let emoji = '';
    
    if (hour >= 6 && hour < 12) {
        greeting = 'Доброе утро! ☀️';
        emoji = '☀️';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Добрый день! 🌤️';
        emoji = '🌤️';
    } else if (hour >= 18 && hour < 21) {
        greeting = 'Добрый вечер! 🌅';
        emoji = '🌅';
    } else {
        greeting = 'Доброй ночи! 🌙';
        emoji = '🌙';
    }
    
    // Добавляем в header
    const header = document.querySelector('header');
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
    
    if (header && !document.getElementById('greeting-message')) {
        header.appendChild(greetingDiv);
    }
}

// ПРОСТОЙ КАЛЬКУЛЯТОР
class Calculator {
    constructor() {
        this.display = '';
        this.result = 0;
        this.operation = null;
        this.shouldResetDisplay = false;
    }
    
    add(num) {
        this.display += num;
    }
    
    clear() {
        this.display = '';
        this.result = 0;
        this.operation = null;
    }
    
    calculate(op) {
        const current = parseFloat(this.display) || 0;
        
        if (this.operation !== null && !this.shouldResetDisplay) {
            this.result = this.performOperation(this.result, current, this.operation);
        } else {
            this.result = current;
        }
        
        this.display = this.result;
        this.operation = op;
        this.shouldResetDisplay = true;
    }
    
    performOperation(prev, current, op) {
        switch(op) {
            case '+': return prev + current;
            case '-': return prev - current;
            case '*': return prev * current;
            case '/': return current !== 0 ? prev / current : 0;
            default: return current;
        }
    }
    
    equals() {
        const current = parseFloat(this.display) || 0;
        if (this.operation !== null) {
            this.result = this.performOperation(this.result, current, this.operation);
            this.display = this.result;
            this.operation = null;
            this.shouldResetDisplay = true;
        }
    }
    
    getDisplay() {
        return this.display || '0';
    }
}

const calculator = new Calculator();

//КОНВЕРТЕР ВАЛЮТ
const exchangeRates = {
    'USD': 1,
    'RUB': 90,
    'EUR': 0.92,
    'GBP': 0.79,
    'CNY': 7.24,
    'JPY': 149.50
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        return 'Неизвестная валюта';
    }
    
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];
    
    return convertedAmount.toFixed(2);
}

// ========== УТИЛИТЫ ==========
function parseFullName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    
    return {
        lastName: parts[0] || '',
        firstName: parts[1] || '',
        patronymic: parts[2] || ''
    };
}

function isValidPhoneNumber(phone) {
    // Проверка для русских номеров
    const phoneRegex = /^(\+7|7|8)?(\d{10})$/;
    return phoneRegex.test(phone.replace(/[-\s()]/g, ''));
}

function validateDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
}

//ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', () => {
    initVisitCounter();
    showGreeting();
    initSkillsCalculator();
    initContactForm();
});

//КАЛЬКУЛЯТОР НА СТРАНИЦЕ НАВЫКОВ
function initSkillsCalculator() {
    const skillsSection = document.querySelector('.skills-table');
    if (!skillsSection) return;
    
    const calcBlock = document.createElement('section');
    calcBlock.id = 'calculator-section';
    calcBlock.style.cssText = `
        margin-top: 40px;
        padding: 20px;
        background: var(--card-bg);
        border: 2px solid var(--primary-green);
        border-radius: 8px;
    `;
    
    calcBlock.innerHTML = `
        <h2>Калькулятор</h2>
        <div style="margin: 20px 0;">
            <input type="text" id="calc-display" readonly style="
                width: 100%;
                padding: 10px;
                font-size: 24px;
                background: var(--bg-dark);
                color: var(--primary-green);
                border: 2px solid var(--primary-green);
                border-radius: 4px;
                text-align: right;
                margin-bottom: 10px;
            " value="0">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px;">
                <button onclick="calculator.clear(); updateCalcDisplay()">C</button>
                <button onclick="calculator.calculate('/')">/</button>
                <button onclick="calculator.calculate('*')">*</button>
                <button onclick="calculator.calculate('-')">-</button>
                <button onclick="calculator.add('7')">7</button>
                <button onclick="calculator.add('8')">8</button>
                <button onclick="calculator.add('9')">9</button>
                <button onclick="calculator.calculate('+')">+</button>
                <button onclick="calculator.add('4')">4</button>
                <button onclick="calculator.add('5')">5</button>
                <button onclick="calculator.add('6')">6</button>
                <button onclick="calculator.add('.')">.</button>
                <button onclick="calculator.add('1')">1</button>
                <button onclick="calculator.add('2')">2</button>
                <button onclick="calculator.add('3')">3</button>
                <button onclick="calculator.add('0'); updateCalcDisplay()">0</button>
                <button onclick="calculator.equals(); updateCalcDisplay()" style="grid-column: span 2; background: var(--secondary-pink);">=</button>
            </div>
        </div>
    `;
    
    // Добавляем стили для кнопок калькулятора
    const style = document.createElement('style');
    style.textContent = `
        #calculator-section button {
            padding: 10px;
            background: transparent;
            border: 2px solid var(--primary-green);
            color: var(--primary-green);
            cursor: pointer;
            font-weight: bold;
            border-radius: 4px;
            transition: all 0.2s;
        }
        
        #calculator-section button:hover {
            background: var(--primary-green);
            color: var(--bg-dark);
        }
    `;
    document.head.appendChild(style);
    
    skillsSection.parentElement.insertBefore(calcBlock, skillsSection.nextSibling);
}

function updateCalcDisplay() {
    const display = document.getElementById('calc-display');
    if (display) {
        display.value = calculator.getDisplay();
    }
}

// РАСШИРЕННАЯ ФОРМА ОБРАТНОЙ СВЯЗИ
function initContactForm() {
    const contactsPage = document.querySelector('main');
    if (!contactsPage || !contactsPage.querySelector('form')) return;
    
    const form = contactsPage.querySelector('form');
    
    // Преобразуем форму
    form.innerHTML = `
        <h2>Форма обратной связи</h2>
        
        <div class="form-group">
            <label for="name">ФИО (только буквы):</label>
            <input type="text" id="name" name="name" placeholder="Иван Петрович Сидоров" required>
            <div id="name-error" style="color: #ff6b6b; font-size: 12px;"></div>
            <div id="name-parts" style="margin-top: 10px; font-size: 12px; color: var(--secondary-pink);"></div>
        </div>
        
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="example@example.com" required>
        </div>
        
        <div class="form-group">
            <label for="phone">Номер телефона:</label>
            <input type="tel" id="phone" name="phone" placeholder="+7 (999) 123-45-67" required>
            <div id="phone-error" style="color: #ff6b6b; font-size: 12px;"></div>
        </div>
        
        <div class="form-group">
            <label for="date">Желаемая дата связи:</label>
            <input type="date" id="date" name="date" required>
            <div id="date-error" style="color: #ff6b6b; font-size: 12px;"></div>
        </div>
        
        <div class="form-group">
            <label for="photo">Загрузить фото:</label>
            <input type="file" id="photo" name="photo" accept="image/*">
            <div id="photo-preview" style="margin-top: 10px;"></div>
        </div>
        
        <div class="form-group">
            <label for="message">Сообщение:</label>
            <textarea id="message" name="message" rows="5" placeholder="Ваше сообщение..." required></textarea>
        </div>
        
        <button type="submit">Отправить сообщение</button>
    `;
    
    // Обработчики для полей формы
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            // Только буквы и пробелы
            e.target.value = e.target.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
        });
        
        nameInput.addEventListener('change', (e) => {
            const parts = parseFullName(e.target.value);
            const namePartsDiv = document.getElementById('name-parts');
            if (namePartsDiv) {
                namePartsDiv.innerHTML = `
                    <strong>Распарсено:</strong><br>
                    Фамилия: ${parts.lastName}<br>
                    Имя: ${parts.firstName}<br>
                    Отчество: ${parts.patronymic}
                `;
            }
        });
    }
    
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('change', (e) => {
            const dateError = document.getElementById('date-error');
            if (validateDate(e.target.value)) {
                dateError.textContent = '';
            } else {
                dateError.textContent = 'Дата не может быть раньше сегодняшнего дня';
            }
        });
    }
    
    const photoInput = document.getElementById('photo');
    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const preview = document.getElementById('photo-preview');
                    preview.innerHTML = `<img src="${event.target.result}" style="max-width: 100px; max-height: 100px; border-radius: 4px;">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Форматирование номера телефона
            e.target.value = e.target.value.replace(/[^\d+\-()]/g, '');
        });
    }
    
    // Обработчик отправки
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameValue = nameInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const dateValue = dateInput.value;
        
        let isValid = true;
        
        if (!nameValue) {
            document.getElementById('name-error').textContent = 'ФИО обязательно';
            isValid = false;
        }
        
        if (!isValidPhoneNumber(phoneValue)) {
            document.getElementById('phone-error').textContent = 'Некорректный номер телефона';
            isValid = false;
        }
        
        if (isValid) {
            showSuccessModal();
        }
    });
}

//МОДАЛЬНОЕ ОКНО
function showSuccessModal() {
    const modal = document.createElement('div');
    modal.id = 'success-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--card-bg);
            border: 2px solid var(--primary-green);
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
        ">
            <h2 style="color: var(--secondary-pink); margin-bottom: 20px;">✅ Успешно!</h2>
            <p style="color: var(--text-light); margin-bottom: 20px;">
                Ваше сообщение отправлено. Спасибо за обращение!
            </p>
            <button onclick="document.getElementById('success-modal').remove()" style="
                background: var(--primary-green);
                color: var(--bg-dark);
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            ">Закрыть</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

//КОНВЕРТЕР ВАЛЮТ (НА СТРАНИЦЕ)
function initCurrencyConverter() {
    const aboutSection = document.querySelector('main');
    if (!aboutSection) return;
    
    const converterBlock = document.createElement('section');
    converterBlock.id = 'currency-converter';
    converterBlock.style.cssText = `
        margin-top: 40px;
        padding: 20px;
        background: var(--card-bg);
        border: 2px solid var(--primary-green);
        border-radius: 8px;
    `;
    
    converterBlock.innerHTML = `
        <h2>Конвертер валют</h2>
        <div style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
            <input type="number" id="converter-amount" placeholder="Сумма" value="1" style="
                padding: 10px;
                background: var(--bg-dark);
                color: var(--primary-green);
                border: 2px solid var(--primary-green);
                border-radius: 4px;
            ">
            <select id="converter-from" style="
                padding: 10px;
                background: var(--bg-dark);
                color: var(--primary-green);
                border: 2px solid var(--primary-green);
                border-radius: 4px;
            ">
                <option>USD</option>
                <option>RUB</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>CNY</option>
                <option>JPY</option>
            </select>
            <span style="color: var(--primary-green); font-weight: bold; align-self: center;">→</span>
            <select id="converter-to" style="
                padding: 10px;
                background: var(--bg-dark);
                color: var(--primary-green);
                border: 2px solid var(--primary-green);
                border-radius: 4px;
            ">
                <option>RUB</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>CNY</option>
                <option>JPY</option>
            </select>
            <button onclick="performCurrencyConversion()" style="
                padding: 10px 20px;
                background: var(--primary-green);
                color: var(--bg-dark);
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            ">Конвертировать</button>
        </div>
        <div id="converter-result" style="margin-top: 20px; font-size: 18px; color: var(--secondary-pink);"></div>
    `;
    
    aboutSection.appendChild(converterBlock);
}

function performCurrencyConversion() {
    const amount = parseFloat(document.getElementById('converter-amount').value) || 0;
    const from = document.getElementById('converter-from').value;
    const to = document.getElementById('converter-to').value;
    
    const result = convertCurrency(amount, from, to);
    const resultDiv = document.getElementById('converter-result');
    
    if (resultDiv) {
        resultDiv.textContent = `${amount} ${from} = ${result} ${to}`;
    }
}

// Инициализация конвертера на странице About
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('main h1') && document.querySelector('main h1').textContent.includes('Обо мне')) {
        initCurrencyConverter();
    }
});
