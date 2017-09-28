const addBtn = document.getElementById('add-btn')
addBtn.addEventListener('click', function(event) {
  event.preventDefault()
  const divElement = document.createElement('div')
  divElement.className = 'form-group'
  const inputElement = document.createElement('input')
  inputElement.type = 'text'
  inputElement.className = 'form-control schema-input'
  inputElement.placeholder = 'Change to your Schema'
  divElement.appendChild(inputElement)
  const startSchema = document.querySelector('#start-schema')
  startSchema.appendChild(divElement)
});

const removeBtn = document.getElementById('remove-btn')
removeBtn.addEventListener('click', function(event) {
  event.preventDefault();
  const schemaDiv = document.getElementById('start-schema')
  const elemCount = schemaDiv.children.length
  if(elemCount == 1) {
    const messageElem = document.querySelector('#message')
    messageElem.innerHTML = 'Sorry you need to keep atleast one Schema collection'
    removeElem(messageElem)
    return false;
  } else {
    const lastChild = schemaDiv.lastElementChild;
    lastChild.remove()
  }
})

function removeElem(selector) {
  setTimeout(function() {
    selector.innerHTML = ''
  }, 2000)
}

const formElem = document.querySelector('#schema-form')
formElem.addEventListener('submit', function(event) {
  event.preventDefault()
  let schemaFormData = new FormData(formElem)
  let result = {}
  for(let entry of schemaFormData.entries()) {
    result[entry[0]] = entry[1]
  }
  result = JSON.stringify(result)
  addName()
  const responsePromise = sendFormData('/user', result)
  responsePromise
    .then(function(response) {
      if(response.status == 200 && response.type == 'basic') {
        window.location.href= '/user/api/' + JSON.parse(result).schema
        // Response.redirect(`/client/schema/${JSON.parse(result).schema}`, 302)
      }
    })
})

// add event handler to input element change element
function addName() {
  const inputElem = document.querySelectorAll('.schema-input')
  inputElem.forEach(function(elem) {
    elem.name = elem.value
    elem.value = ''
  })
}

function sendFormData(url, bodyData) {
  let headers = new Headers();
  headers.set('Accept', 'application/json')
  headers.set('Content-Type', 'application/json')
  const fetchOptions = {
    method: 'POST',
    headers,
    body: bodyData
  }
  // will return an promise
  return fetch(url, fetchOptions)
}
