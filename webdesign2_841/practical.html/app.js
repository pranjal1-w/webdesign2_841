const productData = [
{
name:"MacBook Pro",
price:120000,
img:"https://images.pexels.com/photos/18105/pexels-photo.jpg"
},
{
name:"iPhone",
price:80000,
img:"https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
},
{
name:"Headphones",
price:3500,
img:"https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
},
{
name:"Watch",
price:5000,
img:"https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
},
{
name:"Shoes",
price:4000,
img:"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
}
];

const products = Array.from({length:50}, (_,i) => {
const item = productData[i % productData.length];

return {
id:i+1,
name:`${item.name} ${i+1}`,
price:item.price + i*100,
img:item.img
};
});

let cart = [];

/* PAGE NAVIGATION */

function showPage(page){

document
.getElementById("home")
.classList.add("hidden");

document
.getElementById("cart")
.classList.add("hidden");

document
.getElementById(page)
.classList.remove("hidden");

if(page === "cart"){
renderCart();
}

}

/* PRODUCTS */

function renderProducts(){

const search =
document
.getElementById("search")
.value
.toLowerCase();

const container =
document
.getElementById("productContainer");

container.innerHTML = "";

products
.filter(product =>
product.name
.toLowerCase()
.includes(search)
)

.forEach(product => {

container.innerHTML += `

<div class="card">

<img src="${product.img}" alt="${product.name}">

<div class="card-content">

<h3>${product.name}</h3>

<div class="price">
₹${product.price}
</div>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>

</div>

`;

});

}

/* ADD CART */

function addToCart(id){

const product =
products.find(
p => p.id === id
);

cart.push(product);

updateCartCount();

}

/* COUNT */

function updateCartCount(){

document
.getElementById("cartCount")
.innerText = cart.length;

}

/* REMOVE */

function removeFromCart(index){

cart.splice(index,1);

updateCartCount();

renderCart();

}

/* CART */

function renderCart(){

const cartItems =
document.getElementById("cartItems");

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<div>
<h4>${item.name}</h4>
<p>₹${item.price}</p>
</div>

<button
class="remove-btn"
onclick="removeFromCart(${index})">
Remove
</button>

</div>

`;

});

document
.getElementById("totalPrice")
.innerText = total;

}
function checkout() {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

/* START */

renderProducts();