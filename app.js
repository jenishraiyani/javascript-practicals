viewProduct();

function formData() {
  this.id = document.getElementById("productId").value;
  this.name = document.getElementById("productName").value;
  this.image = document.getElementById("image");
  this.price = document.getElementById("price").value;
  this.description = document.getElementById("description").value;
}

function addData() {
  var userInput = new formData();
  var productsList;
  var url = "";
  const image = userInput.image.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener("load", () => {
    url = reader.result;

    if (localStorage.getItem("productsList") == null) {
      productsList = [];
    } else {
      console.log("call");
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

function viewProduct() {
  document.getElementById("edit").style.display = "none";
  let productsList = JSON.parse(localStorage.getItem("productsList"));
  var html = "";
  if (productsList != null) {
    productsList.forEach(function (element, index) {
      html += `<tr>
                <th scope='row'>${element.productId}</th>
                <td>${element.productName}</td>
                <td><img src="${element.image}"/></td>
                <td>${element.price}</td>
                <td>${element.description}</td>
                <td><button type="button" class="btn btn-success" onclick=updateProduct(${index})>Edit</button>
                    <button type="button" class="btn btn-danger" onclick=deleteProduct(${index})>Delete</button>
                </td>
            </tr>`;
    });
  }
  document.getElementById("tbody").innerHTML = html;
}

function deleteProduct(clicked_id) {
  let productsList = JSON.parse(localStorage.getItem("productsList"));
  if (productsList != null) {
    productsList.splice(clicked_id, 1);
    localStorage.setItem("productsList", JSON.stringify(productsList));
  }
  viewProduct();
}

function updateProduct(index) {
  document.getElementById("edit").style.display = "block";
  document.getElementById("product-table").style.display = "none";

  let productsList = JSON.parse(localStorage.getItem("productsList"));
  if (productsList != null) {
    document.getElementById("productId").value = productsList[index].productId;
    document.getElementById("productName").value =
      productsList[index].productName;
    document.getElementById("productImage").src = productsList[index].image;
    document.getElementById("price").value = productsList[index].price;
    document.getElementById("description").value =
      productsList[index].description;
  }

  document.querySelector("#update").onclick = function () {
    var setInput = new formData();
    productsList[index].productId = setInput.id;
    productsList[index].productName = setInput.name;
    productsList[index].image = setInput.image;
    productsList[index].price = setInput.price;
    productsList[index].description = setInput.description;
    localStorage.setItem("productsList", JSON.stringify(productsList));
    viewProduct();
  };
}

function validateData() {
  var userInput = new formData();

  if (userInput.id == "" || userInput.name == "" || userInput.image == "" || userInput.price == "" || userInput.description == "") {
    alert("All fields are required");
    return false;
  }
}
