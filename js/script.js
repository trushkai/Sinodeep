document.getElementById("language-switcher").addEventListener("click", function() {
    // const currentPath = window.location.pathname;
    // let newPath = '';

    // // Если текущий URL начинается с /ru, переключаем на /en
    // if (currentPath.startsWith('/ru')) {
    //   newPath = currentPath.replace('/ru', '/en');
    // } 
    // // Если URL начинается с /en, переключаем на /ru
    // else if (currentPath.startsWith('/en')) {
    //   newPath = currentPath.replace('/en', '/ru');
    // } 
    // // Если нет – можно задать язык по умолчанию, например, /en
    // else {
    //   newPath = '/en';
    // }
    
    // window.location.href = newPath;

    const repo = '/Sinodeep';                    // имя вашего репозитория
  const path = window.location.pathname.replace(repo, '');

  let newPath;
  if (path.startsWith('/ru')) {
    newPath = `${repo}${path.replace('/ru', '/en')}`;
  } else if (path.startsWith('/en')) {
    newPath = `${repo}${path.replace('/en', '/ru')}`;
  } else {
    newPath = `${repo}/ru/`;
  }

  window.location.href = newPath;

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