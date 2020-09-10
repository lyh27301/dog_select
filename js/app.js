// Get elements
const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');
const moreBtn = document.getElementById('btn-more');

// Fetch functions

function fetchData(url) {
  return fetch(url)
  .then(checkStatus)
  .then(response => response.json())
  .catch(err => console.log('Problem occurred!', err));
}

Promise.all([
  fetchData('https://dog.ceo/api/breeds/list'),
  fetchData('https://dog.ceo/api/breeds/image/random')
])
  .then( data => {
    const breedList = data[0].message; 
    const randomImage = data[1].message; 
    generateOptions(breedList);
    generateImage(randomImage);
  })

function checkStatus(response) {
  if(response.ok) {
    return Promise.resolve(response);
  }else{
    return Promise.reject(new Error(response.statusText));
  }
}

function generateOptions(data) {
  const options = data.map(item => `<option value = "${item}">${item}</option>`); 
  select.innerHTML = options;
}

function generateImage(data) {
  const breed = select.value;
  const html = `<img id="imgDog" src="${data}" alt>`;
  // string(Result: ) + arrayOfString(['a', 'b', 'c']) === 'Result: a,b,c' 
  card.innerHTML = html;
}

// Fetch a random image of the chosen breed
function fetchBreedImage() {
  const breed = select.value;
  moreBtn.innerText = `More ${breed}s PLEASE!`
  const img = card.querySelector('img');
  const p = card.querySelector('p');
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
    })
} 

// Set event listeners.
select.addEventListener('change', fetchBreedImage);
moreBtn.addEventListener('click', fetchBreedImage);

// Initialize button text.
moreBtn.innerText = `More affenpinschers PLEASE!`











