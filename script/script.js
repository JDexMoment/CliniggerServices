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
  const phone = document.getElementById('phone').value;

  fetch('http://localhost:5000/submitForm', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      if (data.status === 'success') {
          document.getElementById('successMessage').style.display = 'block';
      } else {
          console.error('Сервер вернул ошибку:', data.error);
      }
  })
  .catch(error => {
      console.error('Ошибка при отправке запроса:', error);
  });
  hideMenu();
  clearForm();
}

function handleRatingClick(clickedItem) {
  // Получаем все элементы с классом "rating_item"
  const ratingItems = document.querySelectorAll(".rating_item");
  
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
  const selectedRatingInput = document.querySelector(".rating input:checked");
  const ratingValue = selectedRatingInput ? selectedRatingInput.value : null;

  // Проверяем, что данные не являются пустыми или null
  if (username && reviewComment && ratingValue) {
    // Создание объекта reviewData с полученными данными
    const reviewData = {
      username: username,
      reviewComment: reviewComment,
      rating: ratingValue,
    };

    // Отправка данных на сервер
    fetch('http://localhost:5000/submit-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Ответ от сервера:', data);
      // Вместо этой строки убедитесь, что вы что-то делаете с данными, например, обновляете интерфейс
      alert('Отзыв успешно отправлен'); 
    })
    .catch(error => {
      console.error('Ошибка при отправке отзыва:', error.message);
      // Вместо этой строки убедитесь, что вы что-то делаете в случае ошибки, например, выводите сообщение об ошибке
      alert('Произошла ошибка при отправке отзыва');
    });
    console.log('Отправляемые данные:', reviewData);
  } else {
    console.error('Значение username, reviewComment или rating не должно быть пустым.');
  }
}

// Пример JavaScript-кода на клиентской стороне
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



