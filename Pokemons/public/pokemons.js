document.addEventListener('DOMContentLoaded', function() {
    const sortByBirthDateLink = document.getElementById('sortByBirthDate');
    const sortByWeightLink = document.getElementById('sortByWeight');
    const sortByNameLink = document.getElementById('sortByName');
    
    sortByBirthDateLink.addEventListener('click', function(event) {
      event.preventDefault();
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set('sortBy', 'birthdate');
      window.location.href = '/?' + params.toString();
    });
  
    sortByWeightLink.addEventListener('click', function(event) {
      event.preventDefault();
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set('sortBy', 'weight');
      window.location.href = '/?' + params.toString();
    });

    sortByNameLink.addEventListener('click', function (event) {
        event.preventDefault();
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('sortBy', 'name');
        window.location.href = '/?' + params.toString();
    });
  });
  