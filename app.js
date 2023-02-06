let productContent = document.getElementById("product-details");
let editForm =  document.getElementById("edit");
let productCard =  document.getElementById("product-card");
let productDetails = "productsList";
let productId = document.getElementById("productId");
let productName = document.getElementById("productName");
let productImage = document.getElementById("image");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let displayImage = document.getElementById("productImage");
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

function displayProduct(productsList) {
  let html = "";
  if (productsList != null) {
    productsList.forEach(function (element, index) {
      html += `<div class="card me-3 mb-3">
                  <img class="card-img-top" src="${element.image}" alt="Card image cap"><hr>
                  <div class="card-body">
                    <h5 class="card-title product-name">${element.productName}</h5>
                    <h5 class="card-title product-id">ID: ${element.productId}</h5>
                    <h5 class="card-title product-price">Price: ${element.price}</h5>
                    <p class="card-text">${element.description}</p>
                    <div class="row">
                      <div class=col>
                        <button type="button" class="btn btn-success" onclick=updateProduct(${index})>Edit</button>
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
  if (validateData() == true && imageValidation() == true && validateId() == true) {
    let userInput = new formData();
    let productsList;
    let image = userInput.image.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      let url = reader.result;
      if (localStorage.getItem(productDetails) == null) {
        productsList = [];
      } else {
        productsList = productList();
      }
      productsList.push({
        productId: parseInt(userInput.id),
        productName: userInput.name,
        image: url,
        price: parseInt(userInput.price),
        description: userInput.description,
      });
      localStorage.setItem(productDetails, JSON.stringify(productsList));
      window.location.href = "index.html";
    });
  }
}

function viewProduct() {
  editForm.style.display = "none";
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
  editForm.style.display = "block";
  productCard.style.display = "none";
  let productsList = productList();

  if (productsList != null) {
    productId.value = productsList[index].productId;
    productName.value = productsList[index].productName;
    displayImage.src = productsList[index].image;
    productPrice.value = productsList[index].price;
    productDescription.value = productsList[index].description;
  }

  document.querySelector("#update").onclick = function () {
    let newImage = document.getElementById("image");
    if (newImage.value == "") {
      if (validateData() == true) {
        uploadDetails(index,displayImage.src);
      }
    } else {
      if (validateData() == true && imageValidation() == true) {
        let image = newImage.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", () => {
          url = reader.result;
          uploadDetails(index,url);
        });
      }
    }
  };
  document.querySelector("#cancel").onclick = function () {
    viewProduct();
  };
}

function uploadDetails(index,url){
  let setInput = new formData();
  let productsList = productList();
  productsList[index].productId = parseInt(setInput.id);
  productsList[index].productName = setInput.name;
  productsList[index].image = url;
  productsList[index].price = parseInt(setInput.price);
  productsList[index].description = setInput.description;
  localStorage.setItem(productDetails, JSON.stringify(productsList));
}


//validation functions
function validateId() {
  let userInput = new formData();
  let productsList =  productList() || [];
  let filterData = productsList.filter((element) => element.productId == userInput.id);
  let productLength = Object.keys(filterData).length;
  if (productLength > 0) {
    let msg = "Please enter unique product id";
    alert(msg);
    return false;
  } else {
    return true;
  }
}

function validateData() {
  let userInput = new formData();
  if(specialChars.test(userInput.id) || specialChars.test(userInput.price) || specialChars.test(userInput.name) || specialChars.test(userInput.description) ) {
    let msg = "Special characters or white space is not allowed!!";
    alert(msg);
    return false;
  }else if(!userInput.id || !userInput.name || !userInput.price || !userInput.description){
    return false;
  }
  else {
    return true;
  }
}

function imageValidation() {
  let userInput = new formData();
  let fileExtensions = userInput.image.value;
  let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (!allowedExtensions.exec(fileExtensions)) {
    let msg = "Please upload .jpeg/.jpg/.png file only";
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
      productContent.innerHTML = "Product not found..";
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
