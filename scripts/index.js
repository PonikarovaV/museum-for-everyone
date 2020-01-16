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

        if (days < -2) {
            document.querySelector('.banner__counter').textContent = 'Событие завершилось, но мы еще встретимся! ;)';
        }

        if (days === 1) {
            document.querySelector('.banner__counter').textContent = 'Завтра!';
        }

        if (days === 0 || days === -1 || days === -2) {
            document.querySelector('.banner__counter').textContent = 'Сегодня!';
        }

        if (days > 1) {
            document.querySelector('.banner__counter').textContent = `${days} ${title(days, [' день', ' дня', ' дней'] )}`;
        }
    }

    fillDateLine(dayCounter(), declination);

    function smoothScroll(element, duration) {
        let target = document.getElementById(element);
        let targetPosition = target.getBoundingClientRect().top;
        let startPosition = window.pageYOffset;
        let distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) {
                startTime = currentTime;
            }
            let timeElapsed = currentTime - startTime;
            let run = easy(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easy(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

        requestAnimationFrame(animation);
    }

    function addLinksListeners() {
        let navigationLinks = document.querySelectorAll('.navigation__link');

        navigationLinks.forEach( el => {
            let href = el.getAttribute('href');
            el.addEventListener('click', function(event) {
                event.preventDefault();
                smoothScroll(href.slice(1), 1000);
            });
        });
    }

    addLinksListeners();

})();