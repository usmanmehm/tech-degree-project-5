// This program reads from an API that generates random users and populates a
// page with the details that are needed to display including name, age, DOB,
// address, etc...

let people = []; // this empty array is set to store the people's data
$.ajax({
  url: 'https://randomuser.me/api/?gender=male&results=12&nat=us,au,nz,gb',
  dataType: 'json',
  success: function(data) {
    people = data.results;
    let personHTML = '';
    people.forEach((person, index) => { //this function is adding the details to the HTML
      personHTML +=
      `<div class="card" id=${index}>
          <div class="card-img-container">
              <img class="card-img" src="${person.picture.large}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
              <p class="card-text">${person.email}</p>
              <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
          </div>
      </div>`;
    });
    $('.gallery').html(personHTML);
}
});

// Adding the search bar!
let searchHTML =
`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`

$('.search-container').html(searchHTML);

// personIndex is the variable we will use to target the appropriate person when doing
// any action
let personIndex = 0;

const modalDiv = document.createElement('div'); // adding the modal window as HTML
modalDiv.className = 'modal-container';
modalDiv.innerHTML = createModalHTML();
const bodyElement = document.querySelector('body');
bodyElement.appendChild(modalDiv);
modalDiv.style.display = 'none'; // it will be hidden until clicked

$('.gallery').on('click', (e) => { //when a person clicks the card, the modal window will appear
  let clickedClass = e.target.className;
  let card = '';
  if(clickedClass === 'card') { // you can click anywhere on the card so need to specify and specify the card variable accordingly
    card = e.target;
  } else if (clickedClass === 'card-img-container' || clickedClass === 'card-info-container') {
    card = e.target.parentNode;
  } else if (clickedClass === 'card-img' || clickedClass === 'card-name cap' || clickedClass === 'card-text' || clickedClass === 'card-text cap') {
    card = e.target.parentNode.parentNode;
  }
  let person = people[card.id];
  changeModalHTML(person); // modal window HTML is set to the person clicked
  modalDiv.style.display = ''; // modal window appears
  personIndex = parseInt(card.id); // this will be used in the next/prev button functions
})
// When the x is clicked
$('.modal-close-btn').on('click', () => {
  modalDiv.style.display = 'none'; // when the x is clicked, the modal window is hidden
})
// When the next button is clicked
document.querySelector('.modal-next').addEventListener('click', () => {
  personIndex = personIndex < 11 ? personIndex + 1 : 0; // if we get to the end of the array, we start at the beginning again
  changeModalHTML(people[personIndex]); // the modal HTML is set to the next person
})
// When the previous button is clicked
document.querySelector('.modal-prev').addEventListener('click', () => {
  personIndex = personIndex > 0 ? personIndex - 1 : 11; // if we get to the beginning of the array, we start at the end again
  changeModalHTML(people[personIndex]); // the modal HTML is set to the prev person
})

// This search function is implemented so that whenever the user enters anything, the results are updated
$('.search-container').on('keyup', function(event) {
  let searchVal = document.querySelector('.search-input').value;
  people.forEach((person, index) => {
    let personName = person.name.first + person.name.last;
    if (personName.indexOf(searchVal) === -1) {
      $(`#${index}`).hide(); // only those people's names that don't match the search field will be hidden
    } else {
      $(`#${index}`).show();
    }
  });
});

function createModalHTML() { // function to initialize the modal HTML
  let modalHTML =
  `<div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
              <h3 id="modal-name" class="modal-name cap">name</h3>
              <p id='modal-email' class="modal-text">email</p>
              <p id='modal-city'class="modal-text cap">city</p>
              <hr>
              <p id='modal-phone' class="modal-text">(555) 555-5555</p>
              <p id='modal-address' class="modal-text cap">123 Portland Ave., Portland, OR 97204</p>
              <p id='modal-bday' class="modal-text">Birthday: 10/21/2015</p>
          </div>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>`;
  return modalHTML;
}

function changeModalHTML(person) { // function to change the modal HTML depending on the person clicked/specified
  $('.modal-img').prop("src", person.picture.large);
  $('#modal-name').text(`${person.name.first} ${person.name.last}`);
  $('#modal-email').text(person.email);
  $('#modal-city').text(person.location.city);
  $('#modal-phone').text(person.phone);
  $('#modal-address').text(`${person.location.street}, ${person.location.city}, ${person.location.state} ${person.location.postcode}`);
  $('#modal-bday').text(`${person.dob.date.slice(0,10)}`);
}
