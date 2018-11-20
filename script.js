// При нажатии на кнопку, через 5 секунд показывается форма
const letter = document.querySelector('.letter');
const buttonOpenForm = document.querySelector('#open-form');
buttonOpenForm.addEventListener('click', ()=> {
  buttonOpenForm.classList.add('button--disabled');
  buttonOpenForm.disabled = true;
  setTimeout(function() {
    letter.classList.remove('hidden');
    buttonOpenForm.classList.remove('button--disabled');
    buttonOpenForm.disabled = false;
  }, 5000);
});


// Добавляем обработчик событий на поля ввода. При каждом изменении символа в поле проводится проверка валидна ли форма, и в зависимости от этого прячем или показываем кнопку
const inputsFields = document.querySelectorAll('input');
const letterForm = document.querySelector('.letter__form');
const buttonSubmit = letterForm.querySelector('.letter__button');

inputsFields.forEach((it)=>{
  it.addEventListener('input',(evt)=>{
    if (letterForm.checkValidity()) {
      buttonSubmit.classList.remove('hidden');
    } else {
      buttonSubmit.classList.add('hidden');
    }
  });
})

// При отправке формы отменяем значение по умолчанию и показываем окно с данными
buttonSubmit.addEventListener('click', (evt)=>{
  evt.preventDefault();
  onShowData();

  // AJAX сделал комментариями, т.к. нет сервера отправки. Сделал его сама
    // const xhr = new XMLHttpRequest();
    // const URL = 'https://server.ru/server';
    // const message = new FormData(letterForm);

    // // Вывод информации об успешной отправке или ошибки
    // xhr.addEventListener('load', function () {
    //   if (xhr.status === 200) {
    //     console.log('Данные успешно отправлены')
    //   } else {
    //     console.log('Произошла ошибка');
    //   }
    // });

    // xhr.addEventListener('error', function () {
    //   console.log('Произошла ошибка');
    // });

    // xhr.timeout = 10000;
    // xhr.addEventListener('timeout', function () {
    //   console.log('Произошла ошибка');
    // });

    // xhr.open('POST', URL);
    // xhr.send(message);
})

// Функция которая создает блок с данными из шаблона и добавляет в него обработчик на очистку формы
function onShowData() {
  const fragment = document.querySelector('#data-template').content.querySelector('.data').cloneNode(true);
  let userText;
  inputsFields.forEach((it)=>{
    userText +=it.value + ' ';
  });
  fragment.querySelector('.data__text').textContent = userText;
  document.body.appendChild(fragment);

  const buttonClear = document.querySelector('.data__button');
  buttonClear.addEventListener('click', ()=>{
    letterForm.reset();
    letter.classList.add('hidden');
    buttonSubmit.classList.add('hidden');
    document.body.removeChild(fragment);
  });
}


