let productName = document.getElementById('name');
let category = document.getElementById('category');
let quantity = document.getElementById('quantity');
let price = document.getElementById('price');
let description = document.getElementById('description');
let addBtn = document.getElementById('add-btn');
let deleteBtn = document.getElementById('delete-btn');
let totalPrice = document.getElementById('totalPrice');

let mood = 'create';
let x;
let myProducts;
if(localStorage.product != null) {
    myProducts = JSON.parse(localStorage.product)
} else {
    myProducts = [];
}

//validation
function getValue() {
    let small = document.querySelector('small');
    let productValue = productName.value;
    let nameRgx = /^[A-Z]/g;
    small.classList.remove('small');
    if(productValue.match(nameRgx)) {
       small.innerHTML = '';
       small.classList.remove('small');
    } else {
        small.innerHTML = 'plz start with capital letter';
        small.classList.add('small');
    }
}
// Add Button
addBtn.onclick = function() {
    let newProducts = {
        productName: productName.value,
        category: category.value,
        quantity:parseInt(quantity.value),
        price:parseInt(price.value),
        description: description.value,
        totalPrice: quantity.value * price.value,
    }

    console.log(myProducts);
    localStorage.setItem('product', JSON.stringify(myProducts));

    if(mood === 'create') {
        myProducts.push(newProducts);
    } else {
        myProducts[x] = newProducts;
        addBtn.innerHTML = "Add Product"
    }

    clearData();
    showData();
    validateName();
}
deleteBtn.onclick = function() {
    clearData();
}

// Clear
function clearData() {
    productName.value = '';
    category.value = '';
    quantity.value = '';
    price.value = '';
    description.value = '';
}

//Show Data
function showData() {
    let tbody = '';
    for (let i = 0; i < myProducts.length; i++) {
        tbody += `
        <tr>
            <td>${i + 1}</td>
            <td>${myProducts[i].productName}</td>
            <td>${myProducts[i].category}</td>
            <td>${myProducts[i].quantity}</td>
            <td>${myProducts[i].price}</td>
            <td>${myProducts[i].totalPrice}</td>
            <td>${myProducts[i].description}</td>
            <td>
                <button onclick="increase(${i})" id="increament">+</button>
                <button onclick="decrease(${i})" id="decrement">-</button>
            </td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr> 
        `
    }
    document.getElementById('tbody').innerHTML = tbody;

    //deletAll Btn
    let deletAll = document.getElementById("deleteAll");
    if(myProducts.length > 0) {
        deletAll.innerHTML = `
        <button id='btn-all' onclick="deleteAll()">Delete All</button>
        `
    } else {
        deletAll.innerHTML = '';
    }
}
showData();

//Delete
function deleteData(i) {
    myProducts.splice(i, 1)
    localStorage.product = JSON.stringify(myProducts)
    showData()
}

//DeleteAll
function deleteAll() {
    localStorage.clear();
    myProducts.splice(0);
    showData();
}

//Update 
function updateData(i) {
    productName.value = myProducts[i].productName;
    category.value = myProducts[i].category;
    quantity.value = myProducts[i].quantity;
    price.value = myProducts[i].price;
    description.value = myProducts[i].description;
    mood = "Update";
    x = i;
    showData();
    addBtn.innerHTML = "Update";
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

//Increase
function increase(i) {
    let newQuantity = myProducts[i].quantity + 1;
 
    myProducts[i].quantity = newQuantity;
    myProducts[i].totalPrice = newQuantity * myProducts[i].price;
   localStorage.setItem('product', JSON.stringify(myProducts))
    showData();
}

//Decrese
function decrease(i) {
    let newQuantity = Number (myProducts[i].quantity - 1);
    myProducts[i].quantity = newQuantity;
    myProducts[i].totalPrice = newQuantity * myProducts[i].price;
    localStorage.setItem('product', JSON.stringify(myProducts));
    showData()
}

//Search
let search = document.getElementById("input-search");
function searchProduct(){
    let str = "";
    for(var i=0; i<myProducts.length; i++){
        if(myProducts[i].productName.includes(search.value)){
            if(myProducts[i].productName != ''){
                str += `
                <tr>
                <td>${i + 1}</td>
                <td>${myProducts[i].productName}</td>
                <td>${myProducts[i].category}</td>
                <td>${myProducts[i].quantity}</td>
                <td>${myProducts[i].price}</td>
                <td>${myProducts[i].totalPrice}</td>
                <td>${myProducts[i].description}</td>
                <td>
                    <button onclick="increase(${i})" id="increament">+</button>
                    <button onclick="decrease(${i})" id="decrement">-</button>
                </td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>  `
            }
            else{
                str += `
                <tr>
                    <td>${i}</td>
                    <td>${myProducts[i].productName}</td>
                    <td>${myProducts[i].category}</td>
    
                    <td>${myProducts[i].quantity}</td>
                    <td>${myProducts[i].price}</td>
                    <td>${myProducts[i].totalPrice}</td>
    
                    <td>${myProducts[i].description}</td>
    
                    <td></td>
        
                    <td></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                    <td></td>
                </tr>
                `
            }


        tbody.innerHTML = str;

        console.log( myProducts[i].productName ,(search.value) )
    }
    else{
        console.log(str)
         tbody.innerHTML = str;
      ;
    }    
}
}