const getElemById = (id = '') => document.getElementById(id)



const labels = {
  name: 'nombre',
  username: 'username',
  phone: 'phone',
  email: 'email',
  password: 'password',
  roles: 'rol'
}

// const createInputsLabel = (component) => {
//   function firstCapitalLetter(texto) {
//     if (texto.length === 0) return texto; // Maneja el caso de una cadena vacía
//     return texto.replace(/^[a-z]/, (letra) => letra.toUpperCase());
//   }
//   const typeInput = (key='') => {
//     const typesInput = {
//       email: 'email',
//       password: 'password'
//     }
//     return typesInput[key] || 'text'
//   }

//   const components = Object.keys(labels).map((key) => {
//     const labelSquema = document.createElement('label')
//     const inputSquema = document.createElement('input')
//     labelSquema.textContent =  firstCapitalLetter(labels[key])
//     labelSquema.for = key
//     inputSquema.id = key
//     inputSquema.name = key
//     inputSquema.type = typeInput(key)
//     labelSquema.append(inputSquema)
//     return labelSquema
//   })
  
//   components.forEach((e)=>component.appendChild(e))
// }

const fetchData = ({ params }) => {
  const url = '/api/'
  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
}

const sendData = () => {
  const name = getElemById('name')
  const email = getElemById('email')
  console.log(name.value, email.value)
  alert("data",)
}



const sendButton = document.getElementById('send-button')
sendButton.addEventListener('click', sendData)
const formEmployee = document.getElementById('form-employee')
formEmployee.addEventListener("submit", (evt) => evt.preventDefault())
