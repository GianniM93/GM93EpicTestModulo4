const API_URL = 'https://striveschool-api.herokuapp.com/api/product/' 

function goBack() {
  window.location.href = 'M4Front.html' }
  
async function fetchItems2() {
    console.log(window.location.search)
const params= new URLSearchParams(window.location.search)
const query = params.get("q")
console.log(query)
    try {
    const response = await
fetch(`${API_URL}`+query,{
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MjY3ZWFkMjQ5NzAwMTQ2OTM2N2IiLCJpYXQiOjE2OTI4NzAyNzAsImV4cCI6MTY5NDA3OTg3MH0.6d5GOtgBL0WsAjzKgkvk-dOyGGvG29mCnoPdMtNJM18"
}});
const data = await response.json()
     console.log(data)
     const tableBody2 = document.getElementById('items-table-body2');
        tableBody2.innerHTML = ''
      const row = `
            <tr class="table-primary">
              <th class="d-none">${data._id}</th>
              <td>${data.name}</td>
              <td>${data.description}</td>
              <td>${data.brand}</td>
              <td><img src="${data.imageUrl}" alt"Prod Img"></td>
              <td>${data.price}</td>
              </tr>
          `
          tableBody2.innerHTML += row
  
    } catch (error) {
      console.log('Errore nel recupero degli utenti: ', error);
    }}

   async function deleteitem(query) {

console.log(window.location.search)
const params= new URLSearchParams(window.location.search)
const query2 = params.get("q")

    if (confirm('Are U really Sure about That?')) {
        try {
          await fetch(`${API_URL}`+ query2, { method: 'DELETE',
          headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MjY3ZWFkMjQ5NzAwMTQ2OTM2N2IiLCJpYXQiOjE2OTI4NzAyNzAsImV4cCI6MTY5NDA3OTg3MH0.6d5GOtgBL0WsAjzKgkvk-dOyGGvG29mCnoPdMtNJM18"
        } });
        window.location.href = 'M4Front.html?status=cancel-ok';
        } catch (error) {
          console.log('Error deleting the Item: ', error); }
      } } 
      
      function edititem(query) {
      const params= new URLSearchParams(window.location.search)
      const query3 = params.get("q")
        window.location.href = `M4Add.html?_id=${query3}` } 

fetchItems2()