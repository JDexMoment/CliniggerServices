let isHidden = false;

function toggleCards() {
    var cards = document.querySelectorAll('.card');
    if (!isHidden) {
        cards.forEach(function(card) {
            card.style.display = 'none';
        });
        document.querySelector('.hideCardsButton').textContent = 'Показать услуги';
        isHidden = true;
    } else {
        cards.forEach(function(card) {
            card.style.display = 'block';
        });
        document.querySelector('.hideCardsButton').textContent = 'Скрыть услуги';
        isHidden = false;
    }
}
