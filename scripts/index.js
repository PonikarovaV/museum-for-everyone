(function() {

    document.querySelector('.header__menu').addEventListener('click', function() {
        let headerHeight = document.querySelector('.header').offsetHeight;
        document.querySelector('.header__list').classList.add('header__list_active');
        document.querySelector('.header__list').style.top = `${headerHeight}px`;
    });

    document.querySelector('.header__list').addEventListener('click', function(event) {
        if (!event.target.closest('header__menu')) {
            document.querySelector('.header__list').classList.remove('header__list_active');
        }
    });

    function dayCounter() {
        let eventDay = new Date(2020, 03, 18).setHours(0);
        let today = new Date().setHours(0, 0, 0, 0);
        let distance = eventDay - today;
        let days = Math.floor(distance/(1000 * 3600 * 24));
    
        return days;
    }

    function declination(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2:cases[(number%10<5)?number%10:5] ];
    };

    function fillDateLine(days, title) {

        if (days < 0) {
            document.querySelector('.banner__counter').textContent = 'Событие завершилось, но мы еще встретимся! ;)';
        }

        if (days === 1) {
            document.querySelector('.banner__counter').textContent = 'Завтра!';
        }

        if (days === 0) {
            document.querySelector('.banner__counter').textContent = 'Сегодня!';
        }

        if (days > 1) {
            document.querySelector('.banner__counter').textContent = `${days} ${title(days, [' день', ' дня', ' дней'] )}`;
        }
    }

    fillDateLine(dayCounter(), declination);

})();