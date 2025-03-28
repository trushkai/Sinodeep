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

//form
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    const checkbox = this.querySelector('input[name="agreement"]');
    const inputs = this.querySelectorAll('input, textarea');
    
    // Проверка заполнения всех полей
    let isValid = true;
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('invalid');
            isValid = false;
        }
    });
    
    // Проверка чекбокса
    if (!checkbox.checked) {
        checkbox.closest('.agreement').classList.add('invalid');
        isValid = false;
    }
    
    if (!isValid) {
        e.preventDefault();
        alert('Пожалуйста, заполните все поля и подтвердите соглашение');
    }
});

// Добавляем обработчики для сброса стилей ошибок
document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
        el.classList.remove('invalid');
        if(el.name === 'agreement') {
            el.closest('.agreement').classList.remove('invalid');
        }
    });
});


const burgerButton = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');

burgerButton.addEventListener('click', function()  {
   burgerMenu.classList.toggle('burger-menu--active');
   burgerButton.classList.toggle('burger-active');
});



const menu = document.querySelector('.burger-menu');
window.addEventListener('scroll', () => {
  if (window.pageOffset > 0) {
    menu.classList.remove('burger-menu--active');
   } else {
  }
});