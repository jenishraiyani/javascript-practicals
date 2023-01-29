viewProduct();

function addData() {

    if(validateData() == true){
        var productsList;
        var url = "";
        let productId = document.getElementById("productId").value;
        let productName = document.getElementById("productName").value;
        let input = document.getElementById("image");
        let price = document.getElementById("price").value;
        let description = document.getElementById("description").value;
        const image = input.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", () => {
            url = reader.result;
    
            if (localStorage.getItem("productsList") == null) {
                productsList = [];
            } else {
                productsList = JSON.parse(localStorage.getItem("productsList"));
            }
            productsList.push({
                productId: productId,
                productName: productName,
                image: url,
                price: price,
                description: description,
            });
            localStorage.setItem("productsList", JSON.stringify(productsList));
            window.location.href = "index.html";
    
        });
    }
   
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
        document.getElementById("productName").value = productsList[index].productName;
        document.getElementById("image").value = productsList[index].image;
        document.getElementById("price").value = productsList[index].price;
        document.getElementById("description").value = productsList[index].description;
    }

    document.querySelector("#update").onclick = function () {
        productsList[index].productId = document.getElementById("productId").value;
        productsList[index].productName = document.getElementById("productName").value;
        productsList[index].image = document.getElementById("image").value;
        productsList[index].price = document.getElementById("price").value;
        productsList[index].description = document.getElementById("description").value;
        localStorage.setItem("productsList", JSON.stringify(productsList));
        viewProduct();

    };
}


function validateData(){
    let productId = document.getElementById("productId").value;
    let productName = document.getElementById("productName").value;
    let image = document.getElementById("image").files[0];
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    
    if(productId == ""){
        alert("Name is required");
        return false;
    }
    if(productName == ""){
        alert("Product Name is required");
        return false;
    }
    if(image == ""){
        alert("Image is required");
        return false;    }

    if(price == ""){
        alert("Price is required");
        return false;
    }
    if(description == ""){
        alert("Description is required");
        return false;
    }


}