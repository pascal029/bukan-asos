const basedUrl = 'https://mighty-river-68966.herokuapp.com'
function checkCredential(){
    const access_token = localStorage.access_token
    if(!access_token){
        $('#navbar').show()
        $('#product-section').hide()
        $('#new-product-section').hide()
        $('#category-section').hide()
        $('#new-category-section').hide()
        $('#home-section').hide()
        $('#login-section').show()
    } else {
        $('#navbar').show()
        $('#product-section').hide()
        $('#new-product-section').hide()
        $('#category-section').hide()
        $('#new-category-section').hide()
        $('#home-section').show()
        $('#login-section').hide()
        userLoggedIn()
        $('#login-form').trigger('reset')
    }
}
function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);


    $.ajax({
        url : basedUrl + '/users/staf',
        method : 'POST',
        headers : {
            google_token : response.credential
        }
    })
        .done(user =>{
            localStorage.setItem('access_token', user.access_token)
            localStorage.setItem('username', user.username)
            userLoggedIn()
            Swal.fire('Login success')
            dashboard()
        })
        .fail(err =>{
            Swal.fire(err.message)
        })
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "493800475725-s6o4a3icu39cef0ju1eu457rnhp7m60o.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
    google.accounts.id.disableAutoSelect();
  }
function register(){
    const username = $('#register-username').val()
    const email =    $('#register-email').val()
    const password = $('#register-password').val()
    const phone =    $('#register-phone').val()
    const address =  $('#register-address').val()
    
    $.ajax({
        url : `${basedUrl}/users/register`,
        method : 'POST',
        data : {
            username,
            email,
            password,
            phone,
            address
        }
    })
        .done(message =>{
            checkCredential()         
            Swal.fire(`success create account with email ${message.email}`) 
            $('#register-form').trigger('reset')
        })
        .fail(error =>{
            Swal.fire(`${error.responseJSON.message}`)
        })
}
function dashboard(){
    let objProducts = {}
    $.ajax({
        url: basedUrl + '/products',
        method : 'GET',
        headers : {
            access_token : localStorage.access_token
        }
    })
        .then(data => {
            objProducts.products = data.products
            return $.ajax({
                url: basedUrl + '/products/categories',
                method : 'GET',
                headers : {
                    access_token : localStorage.access_token
                }
            })
        })
        .done(categories =>{
            $('#navbar').show()
            $('#product-section').hide()
            $('#new-product-section').hide()
            $('#category-section').hide()
            $('#new-category-section').hide()
            $('#home-section').show()
            $('#login-section').hide()
            $('#dashboard-section').show()
            $('#new-product-section').hide()
            $('#total-product').empty().append(objProducts.products.length)
            $('#total-category').empty().append(categories.length)
        })
        .fail(error =>{
            Swal.fire(error.responseJSON.message)
        })
}
function logout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
    checkCredential()
}

function deleteProduct(id){
    $.ajax({
        url : basedUrl + `/products/${id}`,
        method : 'DELETE',
        headers : {
            access_token : localStorage.access_token
        }
    })
            .done(deleted => {
                Swal.fire(deleted.message)
                products()
            })
            .fail(error => {
                Swal.fire('fail to delete')
            })
    
}

function deleteCategory(id){
    $.ajax({
        url: basedUrl + `/products/categories/${id}`,
        method : 'delete',
        headers : {
            access_token : localStorage.access_token
        }
    })
        .done(success =>{
            Swal.fire('success to delete')   
            categories()         
        })
        .fail(error =>{
            Swal.fire(`${error.responseJSON.message}`)
            categories()
        })
}
function addCategory(){
    const name = $('#category-name').val()
    $.ajax({
        url: basedUrl + '/products/categories',
        method : 'POST',
        headers : {
            access_token : localStorage.access_token
        },
        data : {
            name
        }
    })
        .done(category =>{
            Swal.fire(`success to add new category`)
            $('#category-form').trigger('reset')
            categories()
        })
        .fail(error =>{
            Swal.fire(`${error.responseJSON.message}`)
        })
}
function products(){
    $.ajax({
        url : basedUrl + '/products',
        method : 'GET',
        headers : {
            access_token : localStorage.access_token
        }
    })
        .done(data =>{
            let shownProducts = ``
            data.products.forEach((el,i) =>{
                shownProducts += `<tr>
                <td scope="row"> ${i+1}</td>
                <td class="fw-bold">${el.name}</td>
                <td>
                  <img src="${el.imgUrl}" class="img-fluid" />
                </td>
                <td>${el.description}</td>
                <td>${el.stock}</td>
                <td class="fw-bold">${el.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</td>
                <td>${el.User.email}</td>
                `
                if(data.user.role == 'admin' || data.user.id == el.authorId){
                    shownProducts += 
                    `<td>
                    <a href="#" onclick="deleteProduct(${el.id})" class="ms-3"><span class="icon material-symbols-outlined text-danger">delete</span></a>
                  </td>`
                }

                shownProducts += '</tr>'
            })
            $('#navbar').show()
            $('#product-section').show()
            $('#new-product-section').show()
            $('#category-section').hide()
            $('#new-category-section').hide()
            $('#home-section').show()
            $('#login-section').hide()
            $('#dashboard-section').hide()
            $('#new-product-section').hide()
            $('#table-product').empty().append(shownProducts)
        })
        .fail(error =>{
            Swal.fire(error.responseJSON.message)
        })
}
function categories(){
    $.ajax({
        url: basedUrl + '/products/categories',
        method : 'GET',
        headers : {
            access_token : localStorage.access_token
        }
    })
        .done(categories =>{
            let shownCategories = ``
            categories.forEach((el,i) => {
                shownCategories +=`
                <tr>
                <td scope="row">${i + 1}</td>
                <td class="fw-bold">${el.name}</td>
                <td>
                  <a href="#" onclick="deleteCategory(${el.id})"class="ms-3"><span class="icon material-symbols-outlined text-danger">delete</span></a>
                </td>
              </tr>
              `
            });
            $('#navbar').show()
            $('#product-section').hide()
            $('#new-product-section').hide()
            $('#category-section').show()
            $('#new-category-section').hide()
            $('#home-section').show()
            $('#login-section').hide()
            $('#dashboard-section').hide()
            $('#new-product-section').hide()
            $('#table-category').empty().append(shownCategories)
        })
        .fail(error =>{
            Swal.fire(`${error.responseJSON.message}`)
        })
}
function changeSelectCategory(){
    $.ajax({
        url: basedUrl + '/products/categories',
        method : 'GET',
        headers : {
            access_token : localStorage.access_token
        }
    })
        .done(categories =>{
            let selectCategories = `<option value="" selected disabled>-- Select Category --</option>`
            categories.map(el =>{
                selectCategories +=
                `
                <option value =${el.id}>${el.name}</option>
                `
            })
            $('#product-category').empty().append(selectCategories)
        })
}
function addProduct(){
    const name = $('#product-name').val()
    const categoryId = $('#product-category').val()
    const description = $('#product-desc').val()
    const stock = $('#product-stock').val()
    const price = $('#product-price').val()
    const imgUrl = $('#product-image').val()
    $.ajax({
        url: basedUrl +'/products',
        method : 'post',
        data : {
            name,
            categoryId,
            description,
            stock,
            price,
            imgUrl,
        },
        headers : {
            access_token : localStorage.access_token
        }
    })
        .done(newProduct =>{
            Swal.fire('success to add Product')
            products()
        })
        .fail(error =>{
            Swal.fire(error.responseJSON.message)
        })
}
function signIn(){
    const email = $('#login-email').val()
    const password = $('#login-password').val()
    $.ajax({
        url : basedUrl + '/users/login',
        method : 'POST',
        data : {
            email : email,
            password : password
        }
    })
        .done(user =>{
            localStorage.setItem('access_token', user.access_token)
            localStorage.setItem('username', user.username)
            Swal.fire('Login Success')
            checkCredential()
            userLoggedIn()
            dashboard()
        })
        .fail(error =>{
            Swal.fire(`${error.responseJSON.message}`)
        })
}
function userLoggedIn(){
    $('#username').empty()
    $('#username').append(localStorage.username)
}
function cancelToCategory(){
    categories()
}
$(document).ready(() => {
    checkCredential()
    dashboard()
    $('#register-form').on('submit', (e) =>{
        e.preventDefault()
        $('#register-username').empty()
        $('#register-email').empty()
        $('#register-password').empty()
        $('#register-phone').empty()
        $('#register-address').empty()
        register()
    })
    $('#login-form').on('submit', (e) =>{
        e.preventDefault()
        signIn()        
    })
    $('#nav-dashboard').on('click',(e) =>{
        e.preventDefault()
        dashboard()
    })
    $('#nav-logout').on('click', (e) =>{
        e.preventDefault()
        logout()
    })
    $('#nav-product').on('click', (e) =>{
        e.preventDefault()
        products()
    })
    $('#new-product').on('click', () =>{
        $('#navbar').show()
        $('#product-section').hide()
        $('#new-product-section').show()
        $('#category-section').hide()
        $('#new-category-section').hide()
        $('#home-section').show()
        $('#login-section').hide()
        $('#product-form').trigger('reset')
        changeSelectCategory()
    })
    $('#product-form').on('submit', (e) =>{
        e.preventDefault()
        addProduct()
    })
    $('#nav-category').on('click', (e) =>{
        e.preventDefault()
        categories()
    })
    $('#new-category').on('click',() =>{
        $('#navbar').show()
        $('#product-section').hide()
        $('#new-product-section').hide()
        $('#category-section').hide()
        $('#new-category-section').show()
        $('#home-section').show()
        $('#login-section').hide()
    })
    $('#category-form').on('submit', (e) =>{
        e.preventDefault()
        addCategory()
    })
})