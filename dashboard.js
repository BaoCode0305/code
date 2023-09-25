
//
const url = 'http://localhost:3000/khachhang';
const addModalForm = document.querySelector('.form-user');
const editModalForm = document.querySelector('#myEditModal .form-user');
const tableUsers = document.querySelector('#table-user');
const searchInput = document.querySelector('#search-input');
let id = '';


fetch(url)
  .then(res => res.json())
  .then(data => {
    data.forEach(user => {
      renderUser(user);
    });
  });




const tableUser = document.querySelector('#table-user');
const renderUser = (user) =>{
  const output =`
       <tr data-id= '${user.id}'>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.Email}</td>
      <td>${user.Address}</td>
      <td>${user.Phone}</td>
      <td>
        <a class="btn-edit btn-primary btn-sm">Edit</a> |
        <a class="btn-del btn-danger btn-sm">Del</a>
      </td>
      </tr>
    `;
    tableUser.insertAdjacentHTML('beforeend',output);



    // xoá
  const btndel = document.querySelector(`[data-id = '${user.id}'] .btn-del`);
  btndel.addEventListener('click', (e) =>{
    // console.log('delete!!!');
    fetch(`${url}/${user.id}`,{
      method:'DELETE'
    })
    .then(res => res.json())
    .then(() => location.reload());
  });



  
  // edit 
  const btnedit = document.querySelector(`[data-id = '${user.id}'] .btn-edit`);
  btnedit.addEventListener('click',(e) =>{
    e.preventDefault();
    id = user.id;
    $('#myEditModal').modal('show');
    // console.log('edit');
    editModalForm.firstName.value = user.firstName;
    editModalForm.lastName.value = user.lastName;
    editModalForm.Email.value = user.Email;
    editModalForm.Address.value = user.Address;
    editModalForm.Phone.value = user.Phone;

  })
    // Search filter
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const userRow = document.querySelector(`[data-id='${user.id}']`);
  
      if (user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm)
          ) {
        userRow.style.display = 'table-row';
      } else {
        userRow.style.display = 'none';
      }
    });
  
  
}




//// thêm

addModalForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  // console.log('addEventListener')
  fetch(url,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: addModalForm.firstName.value,
      lastName: addModalForm.lastName.value,
      Email: addModalForm.Email.value,
      Address: addModalForm.Address.value,
      Phone: addModalForm.Phone.value
    })
  })
  
  .then(res => res.json())
  .then(data => {
      const dataArr = [];
      dataArr.push(data);
      renderUser(dataArr);
      
  })
  .then(() => location.reload());
  addModalForm.firstName.value = '';
  addModalForm.lastName.value = '';
  addModalForm.Email.value = '';
  addModalForm.Address.value = '';
  addModalForm.Phone.value = '';

})

// Edit
editModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: editModalForm.firstName.value,
      lastName: editModalForm.lastName.value,
      Email: editModalForm.Email.value,
      Address: editModalForm.Address.value,
      Phone: editModalForm.Phone.value
    })
  })
    .then(res => res.json())
    .then(() => location.reload());

  // Clear input values
  editModalForm.firstName.value = '';
  editModalForm.lastName.value = '';
  editModalForm.Email.value = '';
  editModalForm.Address.value = '';
  editModalForm.Phone.value = '';
});