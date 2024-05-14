document.addEventListener('DOMContentLoaded', function() {
  const sortByBirthDateLink = document.getElementById('sortByBirthDate');
  const sortByWeightLink = document.getElementById('sortByWeight');
  const sortByNameLink = document.getElementById('sortByName');
  const sortByMoveName = document.getElementById('sortByMoveName');
  const sortByMoveAccuracy = document.getElementById('sortByMoveAccuracy');
  const sortByMovePower = document.getElementById('sortByMovePower');

  sortByBirthDateLink.addEventListener('click', function(event) {
      event.preventDefault();
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set('sortBy', 'birthdate');
      params.set('sortOrder', toggleSortOrder(params.get('sortOrder')));
      window.location.href = '/?' + params.toString();
  });

  sortByWeightLink.addEventListener('click', function(event) {
      event.preventDefault();
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set('sortBy', 'weight');
      params.set('sortOrder', toggleSortOrder(params.get('sortOrder')));
      window.location.href = '/?' + params.toString();
  });

  sortByNameLink.addEventListener('click', function(event) {
      event.preventDefault();
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set('sortBy', 'name');
      params.set('sortOrder', toggleSortOrder(params.get('sortOrder')));
      window.location.href = '/?' + params.toString();
  });

  sortByMoveName.addEventListener('click', function(event) {
    event.preventDefault();
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set('sortBy', 'name');
      params.set('sortOrder', toggleSortOrder(params.get('sortOrder')));
      window.location.href = '/?' + params.toString();
  });
  sortByMoveAccuracy.addEventListener('click', function(event) {
    event.preventDefault();
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('sortBy', 'accuracy');;
    params.set('sortOrder', toggleSortOrder(params.get('sortOrder')));
    window.location.href = '/?' + params.toString();
  });
  sortByMovePower.addEventListener('click', function(event) {
    event.preventDefault();
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('sortBy', 'power');
    params.set('sortOrder', toggleSortOrder(params.get('sortOrder')));
    window.location.href = '/?' + params.toString();
  });

  function toggleSortOrder(currentOrder) {
      return currentOrder === 'asc' ? 'desc' : 'asc';
  }
});
