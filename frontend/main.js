

let form = document.getElementById('my-form')

form.addEventListener('submit', postNewBooking)

window.onload = loadData

async function loadData(){
  const res = await axios.get('http://localhost:5000/bookings');
  res.data.forEach(element => {
    displayRecord(element);
  })
}

async function postNewBooking(e){
  e.preventDefault()
  let name = document.getElementById('name').value 
  let email = document.getElementById('email').value 
  let phone = document.getElementById('phone').value 

  let obj = {
    'name' : name,
    'email': email,
    'phone' : phone
  }

  const result = await axios.post('http://localhost:5000/new-booking', obj);
  displayRecord(result.data.newBooking);

  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
  document.getElementById('phone').value = ''

}

function displayRecord(object){
  let toBePrinted = object.name+' - '+ object.email+' - '+ object.phone

  let textInside = document.createTextNode(toBePrinted)
  let deleteBtn = document.createElement('button')
  deleteBtn.textContent = "Delete"
  deleteBtn.className = 'btnDelete'
  let li = document.createElement('li')
  li.appendChild(textInside)
  li.appendChild(deleteBtn)
  
  let ul = document.getElementById('items')
  ul.appendChild(li)

  deleteBtn.addEventListener('click', deleteBooking);

  async function deleteBooking(event){
    const liCurrent = event.target.parentElement;
    const ul = document.getElementById('items');
    await axios.delete(`http://localhost:5000/bookings/${object.id}`);
    ul.removeChild(liCurrent);
  }
}
