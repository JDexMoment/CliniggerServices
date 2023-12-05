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
}

window.addEventListener('load', () => {
    slide();
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

  function submitForm() {
    // Здесь вы можете добавить код для отправки данных на сервер
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var service = document.getElementById('service').value;

    // Ваш код для отправки данных, например, через AJAX
    console.log('Отправка данных:', name, phone, service);

    // Закрываем меню после отправки
    hideMenu();
  }

function submitReview() {
  const username = document.getElementById("username").value;
  const reviewComment = document.getElementById("review_comment").value;
  const ratingValue = parseInt(document.querySelector("rating"));
    // Код для отправки отзыва на сервер
  if (reviewData.reviewComment !== null & reviewData.username !== null & reviewData.ratingValue !== null) {
    // Отправка данных на сервер
    fetch('http://localhost:5000/submit-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Ответ от сервера:', data);
      // Дополнительная обработка ответа при необходимости
    })
    .catch(error => console.error('Ошибка при отправке отзыва:', error));
  } else {
    console.error('Значение reviewComment не должно быть null.');
  }
}
