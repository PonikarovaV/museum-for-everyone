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

})();