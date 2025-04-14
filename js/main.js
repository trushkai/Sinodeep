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

//burger-menu
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

//questions
const accordionQuestions = document.querySelectorAll(".question__accordion__question");

accordionQuestions.forEach((accordionQuestion) => {
  accordionQuestion.addEventListener("click", () => {
    const clickedItem = accordionQuestion.parentElement;
    const clickedAnswer = clickedItem.querySelector(".question__accordion__answer");
    const isActive = accordionQuestion.classList.contains("question__accordion__question--active");

    // Закрываем все ответы
    accordionQuestions.forEach((q) => {
      q.classList.remove("question__accordion__question--active");
      const answer = q.parentElement.querySelector(".question__accordion__answer");
      answer.classList.remove("question__accordion__answer--visible");
      answer.style.maxHeight = null;
    });

    // Если выбранный вопрос был не активен, открываем его
    if (!isActive) {
      accordionQuestion.classList.add("question__accordion__question--active");
      clickedAnswer.classList.add("question__accordion__answer--visible");
      clickedAnswer.style.maxHeight = clickedAnswer.scrollHeight + "px";
    }
  });
});

//fix
const fixButtons = document.querySelectorAll(".fix-btn");

fixButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    // Предполагаем, что .fix-info находится сразу после кнопки
    const infoBlock = button.nextElementSibling;

    if(infoBlock) {
      // Если элемент уже видим, убираем класс, иначе — добавляем
      infoBlock.classList.toggle("fix-info--visible");

      // Можно также переключить состояние кнопки, если это нужно
      button.classList.toggle("fix-btn--active");
    }
  });
});
