document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev_btn');
  const nextButton = document.querySelector('.next_btn');
  const slides = Array.from(slider.querySelectorAll('img'));
  const slideCount = slides.length;
  let slideIndex = 0;

  prevButton.addEventListener('click', () => {
      slideIndex = (slideIndex - 1 + slideCount) % slideCount;
      slide();
  });

  nextButton.addEventListener('click', () => {
      slideIndex = (slideIndex + 1) % slideCount;
      slide();
  });

  const slide = () => {
      const imageWidth = slider.clientWidth;
      const slideOffset = -slideIndex * imageWidth;
      slider.style.transform = `translateX(${slideOffset}px)`;
  };

  window.addEventListener('load', () => {
      slide();
  });
});


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
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
}

function submitForm() {
  const name = document.getElementById('name').value;
  const phoneInput = document.getElementById("phone");
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
  var phoneInput = document.getElementById('phone');

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

function handleRatingClick(clickedItem) {
  // Получаем все элементы с классом "rating_item"
  const ratingItems = document.querySelectorAll('.rating_item');
  
  // Убираем класс "selected" у всех элементов
  ratingItems.forEach(innerItem => {
    innerItem.classList.remove("selected");
  });
  
  // Добавляем класс "selected" только выбранному элементу
  clickedItem.classList.add("selected");
  
  // Получаем текущее значение рейтинга
  const selectedRatingItem = document.querySelector(".rating_item.selected");
  const ratingValue = selectedRatingItem ? selectedRatingItem.getAttribute("data-item-value") : null;
  
  console.log("Выбранный рейтинг:", ratingValue);
}
  
function submitReview() {
  const username = document.getElementById("username").value;
  const reviewComment = document.getElementById("review_comment").value;

  // Получаем текущее значение рейтинга
  const selectedRatingItem = document.querySelector(".rating_item.selected");
  const ratingValue = selectedRatingItem ? selectedRatingItem.getAttribute("data-item-value") : null;

  // Проверяем, что данные не являются пустыми или null
  if (username.trim() === "" || reviewComment.trim() === "" || !ratingValue) {
      alert('Заполните все обязательные поля.');
      return false; // Предотвращаем отправку формы
  } else {
      // Если поля не пустые, выполните отправку данных на сервер
      const reviewData = {
          username: username,
          reviewComment: reviewComment,
          rating: ratingValue,
      };

      fetch('http://localhost:5000/submit-review', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
      })
      .then(data => {
        console.log('Ответ от сервера:', data);
    
        if (data.error) {
            console.error('Ошибка на сервере:', data.error);
            alert('Произошла ошибка при отправке отзыва');
        } else {
            alert('Отзыв успешно отправлен');
            // Дополнительные действия на фронтенде, если необходимо
            // Например, обновление интерфейса или переход на другую страницу
            location.reload();
        }
      })    
      return true; // Разрешаем отправку формы
  }
}



document.addEventListener('DOMContentLoaded', function () {
  const reviewsList = document.querySelector('.reviews_list');

  function convertRatingToStars(rating) {
    const maxRating = 5;
    const roundedRating = Math.round(rating);
  
    const stars = Array.from({ length: maxRating }, (_, index) => {
      const isFilled = index + 1 <= roundedRating;
      const starClass = isFilled ? 'rating_item_orange' : 'rating_item_rev';
  
      return `<span class="${starClass}">&#9733;</span>`;
    });
  
    return stars.join('');
  }
  
  fetch('http://localhost:5000/reviews')
    .then(response => response.json())
    .then(reviews => {
      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        const userInfo = document.createElement('div');
        userInfo.classList.add('user_info');
        const username = document.createElement('p');
        username.textContent = review.username;
        userInfo.appendChild(username);

        const userRating = document.createElement('div');
        userRating.classList.add('user_rating');
        const ratingStars = document.createElement('span');
        ratingStars.classList.add('rating_stars');
        ratingStars.innerHTML = convertRatingToStars(review.rating); // Используем функцию для отображения рейтинга
        userRating.appendChild(ratingStars);

        const comment = document.createElement('p');
        comment.classList.add('comment');
        comment.textContent = review.reviewComment;

        reviewElement.appendChild(userInfo);
        reviewElement.appendChild(userRating);
        reviewElement.appendChild(comment);

        reviewsList.appendChild(reviewElement);
      });
    })
    .catch(error => console.error('Ошибка при получении отзывов:', error));
});



