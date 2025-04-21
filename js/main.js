//form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const notice = document.getElementById('submit-notice');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // отменяем стандартный переход при submit :contentReference[oaicite:4]{index=4}

    // Валидация полей
    const checkbox = form.querySelector('input[name="agreement"]');
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;
    inputs.forEach(el => {
      if (!el.checkValidity()) {
        el.classList.add('invalid');
        valid = false;
      }
    });
    if (!checkbox.checked) {
      checkbox.closest('.agreement').classList.add('invalid');
      valid = false;
    }
    if (!valid) {
      alert('Пожалуйста, заполните все поля и подтвердите соглашение');
      return;
    }

    // Сбор данных формы в FormData :contentReference[oaicite:5]{index=5}
    const data = new FormData(form);

    // Отправка через Fetch API :contentReference[oaicite:6]{index=6}
    fetch(form.action, {
      method: 'POST',
      body: data
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Сервер вернул ${response.status}`);
      }
      return response.text(); // ожидаем текстовый ответ от PHP
    })
    .then(text => {
      // Показать сообщение в контейнере и очистить форму
      notice.textContent = text;
      notice.classList.add('notice-success');
      form.reset();
    })
    .catch(err => {
      notice.textContent = 'Ошибка отправки: ' + err.message;
      notice.classList.add('notice-error');
      console.error(err);
    });
  });

  // Сброс ошибок при изменении полей
  document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('invalid');
      if (el.name === 'agreement') {
        el.closest('.agreement').classList.remove('invalid');
      }
    });
  });
});


//burger-menu
const menu = document.querySelector(".burger-header");
const burgerBtn = document.querySelector(".burger");

burgerBtn.addEventListener('click', () => {
    menu.classList.toggle("menu--open");
})

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
