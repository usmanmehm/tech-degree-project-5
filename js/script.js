let people = [];
$.ajax({
  url: 'https://randomuser.me/api/?gender=male&results=12',
  dataType: 'json',
  success: function(data) {
    people = data.results;
    let personHTML = '';
    people.forEach((person, index) => {
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
    console.log(data);
    // $(".gallery").on('click', (e) => {
    //   console.log('hi');
    // });
}
});

let searchHTML =
`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`

$('.search-container').html(searchHTML);

$('.gallery').on('click', (e) => {
  let clickedClass = e.target.className;
  let card = '';
  if(clickedClass === 'card') {
    card = e.target;
  } else if (clickedClass === 'card-img-container' || clickedClass === 'card-info-container') {
    card = e.target.parentNode;
  } else if (clickedClass === 'card-img' || clickedClass === 'card-name cap' || clickedClass === 'card-text' || clickedClass === 'card-text cap') {
    card = e.target.parentNode.parentNode;
  }
  let person = people[card.id];
  console.log(person);
  const modalDiv = document.createElement('div');
  modalDiv.className = 'modal-container';
  modalDiv.innerHTML = addModalHTML(person);
  const bodyElement = document.querySelector('body');
  bodyElement.appendChild(modalDiv);
  $('.modal-close-btn').on('click', () => {
    bodyElement.removeChild(modalDiv);
  })
  $('.modal-next').on('click', () => {
    index = card.id;
    index = index + 1;
    modalDiv.innerHTML = addModalHTML(people[index]);
  })
})

function addModalHTML(person) {
  modalHTML =
  `<div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${person.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="modal-text">${person.email}</p>
          <p class="modal-text cap">${person.location.city}</p>
          <hr>
          <p class="modal-text">${person.phone}</p>
          <p class="modal-text cap">${person.location.street}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
          <p class="modal-text">Birthday: ${person.dob.date.slice(0,10)}</p>
      </div>
  </div>

  <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>`;
  return modalHTML;
}
