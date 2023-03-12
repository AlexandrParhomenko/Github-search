const search = document.querySelector('.form-input')
const submitButton = document.querySelector('.form-btn');
const results = document.querySelector('.result-list')
const input = document.querySelector('input');
const error = document.querySelector('.error')
const items = document.querySelector('.result-list');
const form = document.querySelector('.chatbox-form')
const currentName = document.getElementById('name');
const nameError = document.getElementById('error');


function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

currentName.onblur = function () {
  if (!currentName.value) {
    currentName.classList.add('invalid');
    nameError.style.display = 'flex';
    nameError.innerHTML = 'Пожалуйста, введите запрос.'
  }
};

currentName.onfocus = function () {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    nameError.style.display = 'none';
  }
};

async function getData() {
  items.innerHTML = '';
  let url = `https://api.github.com/search/repositories?q=${search.value}`
  const res = await fetch(url);
  try {
    const data = await res.json();
    for (let i = 0; i < 10; i++) {
      const item = document.createElement('div')
      const link = document.createElement('a')
      const watchNum = document.createElement('span')
      const description = document.createElement('span')
      const languages = document.createElement('span')
      languages.textContent = `Used languages: ${data.items[i].language}`
      watchNum.textContent = `${data.items[i].watchers} watchers`;
      !data.items[i].description ? description.textContent = 'No description given' : description.textContent = data.items[i].description;
      link.classList.add('link')
      link.target = '_blank'
      link.href = data.items[i].html_url;
      link.textContent = data.items[i].full_name;
      item.classList.add('result-list__item');
      item.append(link, watchNum, description, languages);
      results.append(item);
      search.value = ''
    }
  } catch (err) {
    const error = document.createElement('span')
    error.classList.add('error')
    error.textContent = 'Search has given no results :('
    if (items.innerHTML.length === 0) results.append(error)
    search.value = '';
  }
  console.log(items.innerHTML)
}

input.addEventListener('submit', function (e) {
  e.preventDefault();
})

submitButton.addEventListener('click', function () {
  if (search.value) {
    getData().then(r => r)
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    if (search.value) {
      getData().then(r => r)
    }
  }
});


