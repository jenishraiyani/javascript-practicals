let productContent = document.getElementById("product-details");
let btnText = document.getElementById("btn-operation");
let formTitle = document.getElementById("form-title");
let objectIndex = document.getElementById("product-index");
let productDetails = "productsList";
let productId = document.getElementById("product-id");
let productName = document.getElementById("product-name");
let productImage = document.getElementById("product-image");
let productPrice = document.getElementById("product-price");
let productDescription = document.getElementById("product-description");
let displayImage = document.getElementById("display-image");
let specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

viewProduct();

function formData() {
  this.id = productId.value;
  this.name = productName.value;
  this.image = productImage;
  this.price = productPrice.value;
  this.description = productDescription.value;
}

function productList(){
  let productData = JSON.parse(localStorage.getItem(productDetails));
  return productData;
}

document.querySelector("#add-product").onclick = function () {
  btnText.innerHTML = "Submit";
  clearForm();
  formTitle.innerHTML = "Add Product";
};

function clearForm(){
  productId.disabled = false;
  productId.value = "";
  productName.value = "";
  productImage.value = "";
  productPrice.value = "";
  productDescription.value = "";
  displayImage.src = "";
  formTitle.innerHTML = "";
}

document.querySelector("#btn-operation").onclick = function () {
  if(this.innerHTML == "Submit"){
    addProduct();
  }else{
    updateProduct(objectIndex.value);
  }
}

function displayProduct(productsList) {
  let html = "";
  if (productsList != null) {
    productsList.forEach(function (element, index) {
      html += `<div class="card me-3 mb-3">
                  <img class="card-img-top" src="${element.image}" alt="Card image cap"><hr>
                  <div class="card-body">
                    <h5 class="card-title product-name">${element.productName}</h5>
                    <h5 class="card-title product-id">ID: ${element.productId}</h5>
                    <h5 class="card-title product-price">Price: <span>$</span>${element.price}</h5>
                    <p class="card-text">${element.description}</p>
                    <div class="row">
                      <div class=col>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formModal" onclick="updateProduct(${index})">Edit</button>
                      </div>
                      <div class=col>
                        <button type="button" class="btn btn-danger" onclick=deleteProduct(${index})>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>`;
    });
  }
  productContent.innerHTML = html;
}

//CRUD functions
function addProduct() {
  if (validateData() == true && validateNameId() == true) {
    let userInput = new formData();
    let productsList;
      if (localStorage.getItem(productDetails) == null) {
        productsList = [];
      } else {
        productsList = productList();
      }
      productsList.push({
        productId: parseInt(userInput.id),
        productName: userInput.name,
        image: displayImage.src,
        price: parseInt(userInput.price),
        description: userInput.description,
      });
      localStorage.setItem(productDetails, JSON.stringify(productsList));
      window.location.href = "index.html";
  }
}

function viewProduct() {
  let productsList = productList();
  displayProduct(productsList);
}

function deleteProduct(clickedId) {
  let productsList = productList();
  let msg = "Are you sure to remove this product?";
  if (productsList != null) {
    if (confirm(msg) == true) {
      productsList.splice(clickedId, 1);
      localStorage.setItem(productDetails, JSON.stringify(productsList));
    }
  }
  viewProduct();
}

function updateProduct(index) {
  btnText.innerHTML = "Update";
  formTitle.innerHTML = "Update Product";
  productId.disabled = true;
  let productsList = productList();
  if (productsList != null) {
    productId.value = productsList[index].productId;
    productName.value = productsList[index].productName;
    displayImage.src = productsList[index].image;
    productPrice.value = productsList[index].price;
    productDescription.value = productsList[index].description;
    objectIndex.value = index;
  }
  document.querySelector("#btn-operation").onclick = function () {
      if (validateData() == true) {
        uploadDetails(index);
      }
    }
}

function uploadDetails(index){
  let setInput = new formData();
  let productsList = productList();
  productsList[index].productId = parseInt(setInput.id);
  productsList[index].productName = setInput.name;
  productsList[index].image = displayImage.src;
  productsList[index].price = parseInt(setInput.price);
  productsList[index].description = setInput.description;
  localStorage.setItem(productDetails, JSON.stringify(productsList));
  $('.toast').toast('show');
}

function imageUrl(input) {
  if(imageValidation() == true){
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) { 
        displayImage.setAttribute("src",e.target.result);
      };
      reader.readAsDataURL(input.files[0]); 
    }
  }
}

//validation functions
function validateNameId() {
  let userInput = new formData();
  let productsList =  productList() || [];
  let filterData = productsList.filter((element) => element.productId == userInput.id || element.productName == userInput.name);
  let productLength = Object.keys(filterData).length;
  if (productLength > 0) {
    let msg = "Product Name and ID should be unique";
    alert(msg);
    return false;
  } else {
    return true;
  }
}

function validateData() {
  let userInput = new formData();
  if(specialChars.test(userInput.id) || specialChars.test(userInput.price) || specialChars.test(userInput.name) || specialChars.test(userInput.description)) {
    let msg = "Special characters or white space is not allowed!!";
    alert(msg);
    return false;
  }else if(!userInput.id || !userInput.name || !userInput.price || !userInput.description){
    let msg = "All fields are required";
    alert(msg);
    return false;
  }else {
    return true;
  }
}

function imageValidation() {
  let userInput = new formData();
  let fileExtensions = userInput.image.value;
  let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowedExtensions.exec(fileExtensions)) {
    let msg = "Please upload .jpeg/.jpg/.png file only";
    productImage.value = "";
    alert(msg);
    return false;
  } else {
    return true;
  }
}

//filter product by product id
function searchProduct() {
  let userSearchInput = document.getElementById("search-id");
  let filter = userSearchInput.value.toUpperCase();
  cards = document.getElementsByClassName("card");
  for (var i = 0; i < cards.length; i++) {
    let id = cards[i].querySelector(".product-id");
    if (id.innerText.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

//product sorting
function sorting(clickedId) {
  let productsList = JSON.parse(localStorage.getItem(productDetails));
  let productId = "productId";
  let productPrice = "price";
  let productName = "productName";
  if (productsList != null) {
    switch (clickedId) {
      case "sort-id-ascending":
        ascendingSort(productsList,productId);
        break;
      case "sort-id-descending":
        descendingSort(productsList,productId);
        break;
      case "sort-name-az":
        ascendingSort(productsList,productName);
        break;
      case "sort-name-za":
        descendingSort(productsList,productName);
        break;
      case "price-lh":
        ascendingSort(productsList,productPrice);
        break;
      case "price-hl":
        descendingSort(productsList,productPrice);
        break;
    }
  }
}

function ascendingSort(productsList, category) {
  let sortedList = productsList.sort((p1, p2) => p1[category] > p2[category] ? 1 : p1[category] < p2[category] ? -1 : 0);
  displayProduct(sortedList);
}

function descendingSort(productsList, category) {
  let sortedList = productsList.sort((p1, p2) => p1[category] < p2[category] ? 1 : p1[category] > p2[category] ? -1 : 0);
  displayProduct(sortedList);
}
