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
}
