const sortByName = document.getElementById('sortByMoveName');
const sortByAccuracy = document.getElementById('sortByMoveAccuracy');
const sortByPower = document.getElementById('sortByMovePower');

sortByName.addEventListener('click', () => {
    const url = new URL(window.location);
    const asc = url.searchParams.get('nameSort');
    if (asc === 'asc') {
        url.searchParams.set('nameSort', 'desc');
    } else {
        url.searchParams.set('nameSort', 'asc');
    }
    window.location = url.toString();
});

sortByAccuracy.addEventListener('click', () => {
    const url = new URL(window.location);
    const asc = url.searchParams.get('accuracySort');
    if (asc === 'asc') {
        url.searchParams.set('accuracySort', 'desc');
    } else {
        url.searchParams.set('accuracySort', 'asc');
    }
    window.location = url.toString();
});

sortByPower.addEventListener('click', () => {
    const url = new URL(window.location);
    const asc = url.searchParams.get('powerSort');
    if (asc === 'asc') {
        url.searchParams.set('powerSort', 'desc');
    } else {
        url.searchParams.set('powerSort', 'asc');
    }
    window.location = url.toString();
});
