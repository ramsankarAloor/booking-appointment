

let form = document.getElementById('my-form')

form.addEventListener('submit', postNewBooking)

window.onload = loadData

async function loadData(){
  const res = await axios.get('http://localhost:5000/bookings');
  res.data.forEach(element => {
    const id = element.id;
    const name = element.name;
    const email = element.email;
    const phone = element.phone;

    displayRecord(id, name, email, phone);
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

  displayRecord(id, name, email, phone);

  await axios.post('http://localhost:5000/new-booking', obj);

  // deleteBtn.addEventListener('click', deleteEle)
  // editBtn.addEventListener('click', editEle)

  document.getElementById('name').value = ''
  document.getElementById('email').value = ''
  document.getElementById('phone').value = ''

}

function displayRecord(id, name, email, phone){
  let toBePrinted = name+' - '+email+' - '+phone

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
    // await axios.delete(`http://localhost:5000/bookings/${id}`);
    ul.removeChild(liCurrent);
  }
}
