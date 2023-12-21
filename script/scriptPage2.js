function showMenu() {
    // Показываем высвечивающееся меню
    var menuOverlay = document.getElementById('menuOverlay');
    var menuContent = document.getElementById('menuContent');
    menuOverlay.style.display = 'flex';
    setTimeout(() => {
      menuOverlay.style.opacity = 1;
      menuContent.style.transform = 'scale(1)';
      menuContent.style.opacity = 1;
    }, 10);
  }
  
  function hideMenu() {
    // Скрываем высвечивающееся меню
    var menuOverlay = document.getElementById('menuOverlay');
    var menuContent = document.getElementById('menuContent');
    menuOverlay.style.opacity = 0;
    menuContent.style.transform = 'scale(0.8)';
    menuContent.style.opacity = 0;
  
    // Добавляем обработчик событий transitionend для скрытия после завершения анимации
    menuOverlay.addEventListener('transitionend', function() {
      menuOverlay.style.display = 'none';
    }, { once: true });
}
  
function clearForm() {
    document.getElementById("name2").value = "";
    document.getElementById("phone2").value = "";
}

function SubmitForm() {
  const name = document.getElementById('name2').value;
  const phoneInput = document.getElementById("phone2");
  const phone = phoneInput.value;

  if (name.trim() === "" || phone.trim() === "") {
    alert("Заполните все обязательные поля.");
  } else {
    // Функция для добавления маски номера телефона
    function formatPhoneNumber() {
      var cleaned = ('' + phone).replace(/\D/g, '');
      if (cleaned.length < 11) {
        return false;
      }
      return true;
    }

    if (formatPhoneNumber()) {  // Вызываем функцию проверки формата номера
      fetch('http://localhost:5000/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      })
      clearForm();
      alert("Ваша заявка записана, с вами обязательно свяжутся");
    } else {
      alert('Номер телефона не может содержать менее 11 символов.');  
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var phoneInput = document.getElementById('phone2');

  // Функция для добавления маски номера телефона
  function formatPhoneNumber(event) {
      var input = event.target;
      var key = event.key;
      var cleaned = ('' + input.value).replace(/\D/g, '');
      var match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

      if (match) {
          var formatted = '+';

          if (match[1]) {
              formatted += match[1];
          }
          if (match[2]) {
              formatted += match[2] !== '8' ? ' (' + match[2] + ')' : match[2];
          }
          if (match[3]) {
              formatted += ' ' + match[3];
          }
          if (match[4]) {
              formatted += '-' + match[4];
          }
          if (match[5]) {
              formatted += '-' + match[5];
          }

          // Проверка на количество символов
          if (cleaned.length <= 11) {
              input.value = formatted;
          } else {
              input.value = cleaned.slice(0, 11);
          }
      }
  }

  // Слушатель события для поля ввода номера телефона
  phoneInput.addEventListener('input', formatPhoneNumber);
});


