const sortByName = document.getElementById('sortByName');
const sortByBirthdate = document.getElementById('sortByBirthDate');
const sortByWeight = document.getElementById('sortByWeight');

sortByName.addEventListener('click', () => {
  // add to url params for sortByName asc or desc
  const url = new URL(window.location);
  const asc = url.searchParams.get('nameSort');
  if (asc === 'asc') {
    url.searchParams.set('nameSort', 'desc');
  } else {
    url.searchParams.set('nameSort', 'asc');
  }
  window.location = url.toString();
});

sortByBirthdate.addEventListener('click', () => {
  const url = new URL(window.location);
  const asc = url.searchParams.get('birthdateSort');
  if (asc === 'asc') {
    url.searchParams.set('birthdateSort', 'desc');
  } else {
    url.searchParams.set('birthdateSort', 'asc');
  }
  window.location = url.toString();
});

sortByWeight.addEventListener('click', () => {
  const url = new URL(window.location);
  const asc = url.searchParams.get('weightSort');
  if (asc === 'asc') {
    url.searchParams.set('weightSort', 'desc');
  } else {
    url.searchParams.set('weightSort', 'asc');
  }
  window.location = url.toString();
});