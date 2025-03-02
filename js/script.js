const translations = {
    ru: {
        services: "Услуги",
        advantages: "Преимущества",
        process: "Процесс работы",
        questions: "Вопросы",
        contacts: "Контакты",
        "contact-text": "Напишите нам,<br> мы всегда онлайн"
    },
    en: {
        services: "Services",
        advantages: "Advantages",
        process: "Work Process",
        questions: "FAQ",
        contacts: "Contacts",
        "contact-text": "Write to us,<br> we're always online"
    }
};

let currentLang = 'ru';

function switchLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    updateLanguage();
    updateButtonIcon();
    localStorage.setItem('language', currentLang);
}

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = translations[currentLang][key];
    });
}

function updateButtonIcon() {
    const icon = document.getElementById('language-icon');
    icon.src = currentLang === 'ru' ? 'lib/ruen.svg' : 'lib/enru.svg';
    icon.alt = currentLang === 'ru' ? 'English' : 'Русский';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'ru';
    if (savedLang !== 'ru') {
        currentLang = savedLang;
        updateLanguage();
        updateButtonIcon();
    }
    
    document.querySelector('.language-switcher').addEventListener('click', switchLanguage);
});