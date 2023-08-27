const API_URL = 'https://striveschool-api.herokuapp.com/api/product/'

async function fetchItems() {  
  handleAlertMessage()
      try {
      const response = await fetch(API_URL, {
        headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MjY3ZWFkMjQ5NzAwMTQ2OTM2N2IiLCJpYXQiOjE2OTI4NzAyNzAsImV4cCI6MTY5NDA3OTg3MH0.6d5GOtgBL0WsAjzKgkvk-dOyGGvG29mCnoPdMtNJM18"
      } });
      const data = await response.json()

      setTimeout( () => {
        document.querySelector('.spinner-container').classList.add('d-none');
        displayItems(data);
      }, 500)
  
    } catch (error) {
      console.log('Item Recovery Error: ', error);
    }}
    
    function displayItems(items) {
  
      const tableBody = document.getElementById('items-table-body');
      tableBody.innerHTML = ''
    
      items.forEach(item => {
        console.log(item._id)

        const row = `
          <tr>
            <th class="d-none">${item._id}</th>
            <td><a href="M4Prod.html?q=${item._id}">${item.name}</a></td>
            <td>${item.description}</td>
            <td>${item.brand}</td>
            <td><img src="${item.imageUrl}" alt"Prod Img"></td>
            <td>${item.price}</td>
            <td>
            <button class="btn btn-primary"  onclick="edititem('${item._id}')">Edit</button>
            <button class="btn btn-danger" onclick="deleteitem('${item._id}')">Delete</button>
            </td>
    
          </tr>
        `
        tableBody.innerHTML += row
      });
    }
    function addItems() {
      window.location.href = 'M4Add.html'  }

    function edititem(itemId) {
        window.location.href = `M4Add.html?_id=${itemId}` }

     async function deleteitem(itemId) {

      if (confirm('Are U really Sure about That?')) {
        try {
          await fetch(`${API_URL}${itemId}`, { method: 'DELETE',
          headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MjY3ZWFkMjQ5NzAwMTQ2OTM2N2IiLCJpYXQiOjE2OTI4NzAyNzAsImV4cCI6MTY5NDA3OTg3MH0.6d5GOtgBL0WsAjzKgkvk-dOyGGvG29mCnoPdMtNJM18"
        } });
        window.location.href = 'M4Front.html?status=cancel-ok';
        } catch (error) {
          console.log('Error deleting the Item: ', error); }
      } }


      function handleAlertMessage() {

        const qsParams = new URLSearchParams(window.location.search);
        const status = qsParams.get('status')
      
        if (status && status === 'create-ok') showAlert('create');
        if (status && status === 'edit-ok') showAlert('update');
        if (status && status === 'cancel-ok') showAlert('cancel');
      
        clearQueryString()
      
      }
      
      function showAlert(actionType) {
        const alertCnt = document.getElementById('alert-container');
        alertCnt.classList.remove('d-none');
        alertCnt.innerHTML = actionType === 'create'
          ? 'New Item Added'
          : actionType === 'update'
            ? 'Item Updated'
            : 'Item Removed'
      
        setTimeout( () => {
          alertCnt.classList.add('d-none');
        }, 3000)
      }
      
      
      function clearQueryString() {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, '', url.toString());
      } 
      
fetchItems()

