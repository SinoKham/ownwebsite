// КОНСТАНТЫ И ДАННЫЕ САЙТА

export const siteInfo = {
    author: 'Сино Хамраев',
    university: 'ТюмГУ',
    email: 'sinohamraev@gmail.com',
    phone: '89324113091',
    city: 'Тюмень',
    age: 19
};

export const skills = [
    {
        name: 'HTML5',
        level: 2,
        experience: '6 месяцев',
        category: 'Frontend'
    },
    {
        name: 'CSS3',
        level: 1,
        experience: '6 месяцев',
        category: 'Frontend'
    },
    {
        name: 'JavaScript',
        level: 1,
        experience: '6 месяцев',
        category: 'Frontend'
    },
    {
        name: 'Python',
        level: 2,
        experience: '1 год',
        category: 'Backend'
    },
    {
        name: 'C#',
        level: 3,
        experience: 'язык который я сейчас знаю лучше всего',
        category: 'Backend'
    },
    {
        name: 'React',
        level: 1,
        experience: 'изучаю',
        category: 'Frontend'
    }
];

export const projects = [
    {
        id: 1,
        title: 'Сайт о себе',
        description: 'Мой первый учебный проект - многостраничный сайт-визитка с адаптивным дизайном.',
        year: 2025,
        details: 'Сделал в процессе обучения веб-разработке. Включает страницы: главная, обо мне, навыки, портфолио и контакты.',
        technologies: ['HTML5', 'CSS3', 'JavaScript']
    },
    {
        id: 2,
        title: 'Калькулятор',
        description: 'Простой калькулятор для базовых арифметических операций.',
        year: 2025,
        details: 'Сложение, вычитание, умножение, деление с интерфейсом кнопок.',
        technologies: ['JavaScript', 'HTML5', 'CSS3'],
        status: 'создан'
    },
    {
        id: 3,
        title: 'Список задач (TODO)',
        description: 'Приложение для управления повседневными задачами.',
        year: 2025,
        details: 'Добавление, удаление, отметка выполнения задач. Сохранение данных в localStorage.',
        technologies: ['JavaScript', 'localStorage API', 'CSS3'],
        status: 'Планируется'
    },
    {
        id: 4,
        title: 'Конвертер валют',
        description: 'Приложение для конвертации валют в реальном времени.',
        year: 2025,
        details: 'Поддержка основных мировых валют с актуальными курсами.',
        technologies: ['JavaScript', 'API', 'Fetch'],
        status: 'создан'
    },
    {
        id: 5,
        title: 'Шпаргалка по JavaScript',
        description: 'Интерактивная шпаргалка с основными концепциями JavaScript.',
        year: 2025,
        details: 'Примеры кода, основные функции, паттерны проектирования.',
        technologies: ['JavaScript', 'Markdown', 'Синтаксис'],
        status: 'Планируется'
    },
    {
        id: 6,
        title: 'Social Media Dashboard',
        description: 'Панель для отслеживания статистики социальных сетей.',
        year: 2025,
        details: 'Отображение метрик, графики, сравнение показателей во времени.',
        technologies: ['React', 'Chart.js', 'API'],
        status: 'Идея'
    }
];

export const goals = [
    'Выучить JavaScript на продвинутый уровень',
    'Создать 5 полноценных проекта',
    'Найти работу веб-разработчиком',
    'Выучить английский до уровня Upper-Intermediate',
    'Освоить фреймворк React',
    'Наполнить портфолио пет проектами'
];

export const softSkills = [
    'Коммуникабельность',
    'Умение работать в команде',
    'Ответственность',
    'Быстрая обучаемость',
    'Креативное мышление'
];

export const hobbies = [
    'Учеба',
    'Путешествия',
    'Спорт'
];

export const courseTable = [
    {
        course: 'HTML & CSS Basics',
        provider: 'freeCodeCamp',
        duration: '4 часа',
        status: 'Завершён',
        rating: 5
    },
    {
        course: 'JavaScript Fundamentals',
        provider: 'Codecademy',
        duration: '10 часов',
        status: 'Завершен',
        rating: 5
    },
    {
        course: 'React for Beginners',
        provider: 'Udemy',
        duration: '15 часов',
        status: 'Планируется',
        rating: 0
    },
    {
        course: 'Web Design Masterclass',
        provider: 'Skillshare',
        duration: '8 часов',
        status: 'Завершён',
        rating: 5
    },
    {
        course: 'Backend with Node.js',
        provider: 'LinkedIn Learning',
        duration: '12 часов',
        status: 'Планируется',
        rating: 0
    }
];
