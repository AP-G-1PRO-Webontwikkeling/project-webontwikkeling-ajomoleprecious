document.addEventListener('DOMContentLoaded', function () {
    const sortByNameLink = document.querySelector('#sortByName');
    const sortByAccuracyLink = document.querySelector('#sortByAccuracy');
    const sortByPowerLink = document.querySelector('#sortByPower');

    sortByNameLink.addEventListener('click', function (event) {
        event.preventDefault();
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('sortBy', 'name');
        window.location.href = '/moves?' + params.toString();
    });

    sortByAccuracyLink.addEventListener('click', function (event) {
        event.preventDefault();
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('sortBy', 'accuracy');
        window.location.href = '/moves?' + params.toString();
    });

    sortByPowerLink.addEventListener('click', function (event) {
        event.preventDefault();
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('sortBy', 'power');
        window.location.href = '/moves?' + params.toString();
    });
});
