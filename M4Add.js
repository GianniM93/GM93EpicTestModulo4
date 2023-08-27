const API_URL = 'https://striveschool-api.herokuapp.com/api/product/' 

const form = document.getElementById('item-form');

const itemIdInput = document.getElementById('item-Id');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('imageUrl');
const priceInput = document.getElementById('price');

console.log(nameInput)

form.addEventListener('submit', async (event) => {

  event.preventDefault();

  const isFormValid = FormValidation();
  if (!isFormValid) return false;

  const item = {
    
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value
    }

  try {

    const URL = itemIdInput.value 
      ? `${API_URL}${itemIdInput.value}`
      : `${API_URL}`

    const HTTP_METOD = itemIdInput.value ? 'PUT' : 'POST'
    
const response = await fetch(URL, {
        method: HTTP_METOD,
        body: JSON.stringify(item),
        headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MjY3ZWFkMjQ5NzAwMTQ2OTM2N2IiLCJpYXQiOjE2OTI4NzAyNzAsImV4cCI6MTY5NDA3OTg3MH0.6d5GOtgBL0WsAjzKgkvk-dOyGGvG29mCnoPdMtNJM18",
        'Content-Type': 'application/json' }
      })

    if (response.ok) {
      window.location.href = itemIdInput.value 
        ? 'M4Front.html?status=edit-ok' 
        : 'M4Front.html?status=create-ok'
    } else {
      alert('Error Adding the Item.')
    }
  } catch (error) {
    console.log('Failed Save: ', error);
    alert('Failed Save.')  }
}  )


function FormValidation() {
  
  const validation = validateForm()
  let isValid = true;

  if (!validation.isValid) {

    for (const field in validation.errors) {
      const errorElement = document.getElementById(`${field}-error`)
      errorElement.textContent = '';
      errorElement.textContent = validation.errors[field]   }

    isValid = false  }
    return isValid   }

function validateForm() {
  const errors = {}

  const name = document.getElementById('name').value
  const description = document.getElementById('description').value
  const brand = document.getElementById('brand').value
  const imageUrl = document.getElementById('imageUrl').value
  const price = document.getElementById('price').value

  if (!name) errors.name = "The Item Must Have a Name."
  else errors.name = "";

  if (!description) errors.description = "The Item Must Have a Description."
  else errors.description = "";

  if (!brand) errors.brand = "The Item Must Have a Brand."
  else errors.brand = "";

  if (!imageUrl) errors.imageUrl = "The Item Must Have an Image."
  else errors.imageUrl = "";

  if (!price) errors.price = "The Item Must Have a Price."
  else errors.price = "";

  return {
    isValid: Object.values(errors).every(value => value === ''),
    errors }
  }

function goBack() {
  window.location.href = 'M4Front.html' }

  function buildTitle(itemId) {
    const pageTitle = document.getElementById('page-title');
    pageTitle.innerHTML = itemId ? 'Update Item' : 'Add New Item';  }
  
  async function getItemData() {
    const qsParams = new URLSearchParams(window.location.search);
    const itemId = qsParams.get('_id')
  
    buildTitle(itemId);
  
    if (itemId) {
     
    try {
        const response = await fetch(`${API_URL}${itemId}`, {
          headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MjY3ZWFkMjQ5NzAwMTQ2OTM2N2IiLCJpYXQiOjE2OTI4NzAyNzAsImV4cCI6MTY5NDA3OTg3MH0.6d5GOtgBL0WsAjzKgkvk-dOyGGvG29mCnoPdMtNJM18"
          } });
        
        const item = await response.json(); 
        
        setTimeout( () => {
          document.querySelector('.spinner-container').classList.add('d-none');
          document.querySelector('#item-form').classList.remove('d-none');
        }, 500)
  
        if (!('name' in item)) {
          console.log('No Item Found');
          return  }
      
        itemIdInput.value = item._id;
        nameInput.value = item.name;
        descriptionInput.value = item.description;
        brandInput.value = item.brand;
        imageUrlInput.value = item.imageUrl;
        priceInput.value = item.price;
  
      } catch (error) {
        console.log('Item Recovery Error: ', error);  }
      
      } else {
      document.querySelector('.spinner-container').classList.add('d-none');
      document.querySelector('#item-form').classList.remove('d-none'); }
    }
        getItemData() 
  