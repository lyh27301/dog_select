const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
  return fetch(url)
  .then(checkStatus)
  .then(response => response.json())
  .catch(err => console.log('Looks like there was a problem!', err));
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

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
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
  const html = `
    <img src="${data}" alt>
      <p>Click to view images of ${select.value}</p>`;
  // string(Result: ) + arrayOfString(['a', 'b', 'c']) === 'Result: a,b,c' 
  card.innerHTML = html;
}

function fetchBreedImage() {
  const breed = select.value;
  const img = card.querySelector('img');
  const p = card.querySelector('p');
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      p.textContent = `Click to view more ${breed}s!`
    })
} 
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------
function postData(e){
  // Inside the function I'll first cancel the browser's default submit behavior, with e.preventDefault.
  e.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;
  /*
  I'm going to submit the contents of the form to the JSONPlaceholder API. 
  This is a Fake Online REST API for Testing and Prototyping. So you can use
  it for testing or whenever you need fake data.
  I'm going to use the comment endpoint. Which, if you click on it, you can
  see it contains 500 fake comments, and when you post to this end point, 
  JSONPlaceholder API sends you this submitted data back with an id attached.
  */
  
  /*
  The fetch method accepts a second parameter. A configuration object that lets you
  control a number of different settings you can apply to the request like choosing
  a different HTTP method.
  */
  
  const config = {
    method: 'POST',
    headers: {
      // This communicates to the server that the data has been encoded with JSON.
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({name: name, comment: comment})
    // Tip: In ES 2015, there is a shorthand notation you can use in an object whenever a key and value are the same.
    //  {name: name, comment: comment} => {name, comment}

  }
  
  fetch('https://jsonplaceholder.typicode.com/comments', config)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => console.log(data));
  // The JSON Placeholder API is sending the submitted data back to us with an id. 
  // It's not actually adding this data to their servers. But I know that the test post was
  // successful because it logs an id property with the value 501.
} 














