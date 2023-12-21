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
                input.value = cleaned.slice(0, 11); // Ограничиваем ввод 11 символами
            }
        }
    }

    // Слушатель события для поля ввода номера телефона
    phoneInput.addEventListener('input', formatPhoneNumber);
});
