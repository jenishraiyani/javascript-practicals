viewProduct();

function formData() {
  this.id = document.getElementById("productId").value;
  this.name = document.getElementById("productName").value;
  this.image = document.getElementById("image");
  this.price = document.getElementById("price").value;
  this.description = document.getElementById("description").value;
}
 
function addProduct() {
  if (validateData() == true) {
    let userInput = new formData();
    let productsList;
    let image = userInput.image.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      let url = reader.result;
      if (localStorage.getItem("productsList") == null) {
        productsList = [];
      } else {
        productsList = JSON.parse(localStorage.getItem("productsList"));
      }
      productsList.push({
        productId: userInput.id,
        productName: userInput.name,
        image: url,
        price: userInput.price,
        description: userInput.description,
      });
      localStorage.setItem("productsList", JSON.stringify(productsList));
      window.location.href = "index.html";
    });
  }
}

function viewProduct() {
  document.getElementById("edit").style.display = "none";
  let productsList = JSON.parse(localStorage.getItem("productsList"));
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
  document.getElementById("product-details").innerHTML = html;
}

function deleteProduct(clicked_id) {
  let productsList = JSON.parse(localStorage.getItem("productsList"));
  let msg = "Are you sure to remove this product?";
  if (productsList != null) {
    if(confirm(msg) == true){
      productsList.splice(clicked_id, 1);
      localStorage.setItem("productsList", JSON.stringify(productsList));
    }
  }
  viewProduct();
}

function updateProduct(index) {
  document.getElementById("edit").style.display = "block";
  document.getElementById("product-table").style.display = "none";
  let productsList = JSON.parse(localStorage.getItem("productsList"));
  if (productsList != null) {
    document.getElementById("productId").value = productsList[index].productId;
    document.getElementById("productName").value = productsList[index].productName;
    document.getElementById("productImage").src = productsList[index].image;
    document.getElementById("price").value = productsList[index].price;
    document.getElementById("description").value = productsList[index].description;
  }

  document.querySelector("#update").onclick = function () {
    let newImage = document.getElementById("image");
    let setInput = new formData();
      if (newImage.value == "") {
        productsList[index].productId = setInput.id;
        productsList[index].productName = setInput.name;
        productsList[index].image = document.getElementById("productImage").src;
        productsList[index].price = setInput.price;
        productsList[index].description = setInput.description;
        localStorage.setItem("productsList", JSON.stringify(productsList));
      } else {
        let image = newImage.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", () => {
          url = reader.result;
          productsList[index].productId = setInput.id;
          productsList[index].productName = setInput.name;
          productsList[index].image = url;
          productsList[index].price = setInput.price;
          productsList[index].description = setInput.description;
          localStorage.setItem("productsList", JSON.stringify(productsList));
        });
      }
  }
  document.querySelector("#cancel").onclick = function () {
    viewProduct();
  }
}

function validateData() {
  let userInput = new formData();
  let productsList = JSON.parse(localStorage.getItem("productsList")) || [];
  let data_filter = productsList.filter((element) => element.productId == userInput.id);
  let productLength = Object.keys(data_filter).length;
  let fileExtensions = userInput.image.value;
  let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  if (userInput.id == "" || userInput.name == "" || userInput.image == "" || userInput.price == "" ||userInput.description == "") {
    alert("All fields are required");
    return false;
  } else if (productLength > 0) {
    alert("Please enter unique product id");
    return false;
  } else if (!allowedExtensions.exec(fileExtensions)) {
    alert("Please upload .jpeg/.jpg/.png file only.");
    return false;
  } else {
    return true;
  }
}

//filter product by product id
function searchProduct() {
  let user_input = document.getElementById("search-id");
  let filter = user_input.value.toUpperCase();
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

//Sort product id
$("#sort-id").click(function () {
  $("#product-details .card").sort(function (a, b) {
      return $(a).find(".product-id").text() < $(b).find(".product-id").text() ? 1 : -1;
  }).appendTo("#product-details");
});

//Sort product name (A to Z)
$("#sort-name-AZ").click(function () {
  $("#product-details .card").sort(function (a, b) {
      return $(a).find(".product-name").text() > $(b).find(".product-name").text() ? 1 : -1;
    }).appendTo("#product-details");
});

//Sort product name (Z to A)
$("#sort-name-ZA").click(function () {
  $("#product-details .card").sort(function (a, b) {
      return $(a).find(".product-name").text() < $(b).find(".product-name").text() ? 1 : -1;
    }).appendTo("#product-details");
});

//Sort product price (Low to High)
$("#price-lh").click(function () {
  $("#product-details .card").sort(function (a, b) {
      return $(a).find(".product-price").text() > $(b).find(".product-price").text() ? 1 : -1;
    }).appendTo("#product-details");
});

//Sort product price (High to Low)
$("#price-hl").click(function () {
  $("#product-details .card").sort(function (a, b) {
      return $(a).find(".product-price").text() < $(b).find(".product-price").text() ? 1 : -1;
    }).appendTo("#product-details");
});
