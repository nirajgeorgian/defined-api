function createElement(inputtype) {
  const divElement = document.createElement('div')
  divElement.className = 'form-group'
  const inputElement = document.createElement('input')
  inputElement.type = inputtype
  inputElement.className = 'form-control schema-input'
  inputElement.placeholder = 'Change to your Schema'
  divElement.appendChild(inputElement)
  const startSchema = document.querySelector('#start-schema')
  startSchema.appendChild(divElement)
}

function createTextArea() {
  const divElement = document.createElement('div')
  divElement.className = 'form-group'
  const inputElement = document.createElement('textarea')
  inputElement.className = 'form-control schema-input'
  inputElement.rows = 7
  inputElement.placeholder = 'Change to your Schema'
  divElement.appendChild(inputElement)
  const startSchema = document.querySelector('#start-schema')
  startSchema.appendChild(divElement)
}

const addBtn = document.getElementById('add-btn')
if(addBtn) {
  addBtn.addEventListener('click', function(event) {
    event.preventDefault()
    const selectOption = document.querySelector('#select-option').value
    switch(selectOption) {
      case 'text':
        createElement('text')
        break;
      case 'integer':
        createElement('number')
        break;
      case 'date':
        createElement('date')
        break;
      case 'blob':
        createTextArea()
        break;
      case 'file':
        createElement('file')
        break;
      case 'check-box':
        createElement('checkbox')
        break;
      case 'radio':
        createElement('radio')
        break;
      default:
        createElement('text')
        break;
    }
  });
}

const removeBtn = document.getElementById('remove-btn')
if(removeBtn) {
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
}


function removeElem(selector) {
  setTimeout(function() {
    selector.innerHTML = ''
  }, 2000)
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

function handleAjax(formElem, dataUrl, redirectUrl, functionCall = null) {
  if(functionCall != null) {
    functionCall()
  }
  let schemaFormData = new FormData(formElem)
  let result = {}
  for(let entry of schemaFormData.entries()) {
    result[entry[0]] = entry[1]
  }
  result = JSON.stringify(result)
  const responsePromise = sendFormData(dataUrl, result)
  responsePromise
    .then(function(response) {
      if(response.status == 200 && response.type == 'basic') {
        window.location.href=  redirectUrl + JSON.parse(result).schema
      }
    })
}

// add event handler to input element change element
function addName() {
  const inputElem = document.querySelectorAll('.schema-input')
  inputElem.forEach(function(elem) {
    elem.name = elem.value
    elem.value = ''
  })
}

const formElem = document.querySelector('#schema-form')
if(formElem) {
  formElem.addEventListener('submit', function(event) {
    event.preventDefault()
    handleAjax(formElem, '/user', '/client/schema/', addName)
  })
}

const singleSchemaForm = document.querySelector('#singleSchemaForm')
if(singleSchemaForm) {
  singleSchemaForm.addEventListener('submit', function(event) {
    event.preventDefault()
    handleAjax(singleSchemaForm, singleSchemaForm.action, '/user')
  })
}

const allModels = document.querySelectorAll('.schema-model')
if(allModels) {
  Array.from(allModels).forEach(model => {
    const oldData = model.value
    model.addEventListener('keypress', function(event) {
      if(event.which == 13 || event.keyCode == 13) {
        const data = {
          modelName: oldData,
          newModelName: this.value
        }
        const url = `/model/api/models/${oldData}`
        const results = sendFormData(url, JSON.stringify(data))
        results
          .then(function(renamed) {
            return renamed.json()
          })
          .then(function(json) {
            return false;
          })
          .catch(function(err) {
            console.log(err);
          })
          // alter your page from here
          const messageElem = document.querySelector('#message')
          messageElem.innerHTML = 'Successfully renamed'
          removeElem(messageElem)
          this.blur()
      }
    })
  })
}
