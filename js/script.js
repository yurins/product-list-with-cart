//script.js
const items = [
  {
     "image": {
          "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
          "mobile": "./assets/images/image-waffle-mobile.jpg",
          "tablet": "./assets/images/image-waffle-tablet.jpg",
          "desktop": "./assets/images/image-waffle-desktop.jpg"
     },
     "name": "Waffle with Berries",
     "category": "Waffle",
     "price": 6.50
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
          "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
          "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
          "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
      },
      "name": "Vanilla Bean Crème Brûlée",
      "category": "Crème Brûlée",
      "price": 7.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
          "mobile": "./assets/images/image-macaron-mobile.jpg",
          "tablet": "./assets/images/image-macaron-tablet.jpg",
          "desktop": "./assets/images/image-macaron-desktop.jpg"
      },
      "name": "Macaron Mix of Five",
      "category": "Macaron",
      "price": 8.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
          "mobile": "./assets/images/image-tiramisu-mobile.jpg",
          "tablet": "./assets/images/image-tiramisu-tablet.jpg",
          "desktop": "./assets/images/image-tiramisu-desktop.jpg"
      },
      "name": "Classic Tiramisu",
      "category": "Tiramisu",
      "price": 5.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
          "mobile": "./assets/images/image-baklava-mobile.jpg",
          "tablet": "./assets/images/image-baklava-tablet.jpg",
          "desktop": "./assets/images/image-baklava-desktop.jpg"
      },
      "name": "Pistachio Baklava",
      "category": "Baklava",
      "price": 4.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
          "mobile": "./assets/images/image-meringue-mobile.jpg",
          "tablet": "./assets/images/image-meringue-tablet.jpg",
          "desktop": "./assets/images/image-meringue-desktop.jpg"
      },
      "name": "Lemon Meringue Pie",
      "category": "Pie",
      "price": 5.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
          "mobile": "./assets/images/image-cake-mobile.jpg",
          "tablet": "./assets/images/image-cake-tablet.jpg",
          "desktop": "./assets/images/image-cake-desktop.jpg"
      },
      "name": "Red Velvet Cake",
      "category": "Cake",
      "price": 4.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
          "mobile": "./assets/images/image-brownie-mobile.jpg",
          "tablet": "./assets/images/image-brownie-tablet.jpg",
          "desktop": "./assets/images/image-brownie-desktop.jpg"
      },
      "name": "Salted Caramel Brownie",
      "category": "Brownie",
      "price": 4.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
          "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
          "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
          "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
      },
      "name": "Vanilla Panna Cotta",
      "category": "Panna Cotta",
      "price": 6.50
   }
];

// Retrive the cart from localStorage; use an empty object if none exists
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// DOM
const container = document.querySelector(".menu-items");
const cartContainer = document.querySelector(".cart-items");
const totalContainer = document.querySelector(".cart-total");
const confirmButton = document.querySelector(".confirm-button");
const carbonImage = document.querySelector(".carbon-image-container")

// modal
const modalContainer = document.querySelector(".modal-container");
const confirmationDetail = document.querySelector(".confirmation-detail");
const modalTotal = document.querySelector(".modal-total");

// Render the product list 
function renderMenu() {
container.innerHTML = "";
items.forEach(item => {
  const quantity = cart[item.name] ? cart[item.name].quantity : 0;
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <picture>
      <source srcset="${item.image.desktop}" media="(min-width: 1024px)">
      <source srcset="${item.image.tablet}" media="(min-width: 768px)">
      <img src="${item.image.mobile}" alt="${item.name}">
    </picture>
    <div class=${quantity === 0 ? "cart-controls" : "cart-controls quantity-controls"}">
      ${quantity === 0 ? `
        <button class="add-to-cart" data-name="${item.name}"><img src="images/icon-add-to-cart.svg" alt="add to cart">
        Add to Cart</button>
      ` : `
        <button class="decrease" data-name="${item.name}">-</button>
        <span class="quantity">${quantity}</span>
        <button class="increase" data-name="${item.name}">+</button>
      `}
    </div>
    <p class="item__category">${item.category}</p>
    <h2>${item.name}</h2>
    <p class="item__price">$${item.price.toFixed(2)}</p>
  `;
  container.appendChild(div);
});
// bind product list button events only once here
attachMenuEvents();
}

function attachMenuEvents() {
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function() {
    const itemName = this.getAttribute("data-name");
    const item = items.find(i => i.name === itemName);
    addToCart(item);
  });
});
document.querySelectorAll(".increase").forEach(button => {
  button.addEventListener("click", function() {
    const itemName = this.getAttribute("data-name");
    const item = items.find(i => i.name === itemName);
    addToCart(item);
  });
});
document.querySelectorAll(".decrease").forEach(button => {
  button.addEventListener("click", function() {
    const itemName = this.getAttribute("data-name");
    const item = items.find(i => i.name === itemName);
    removeFromCart(item);
  });
});
}

function attachCartEvents() {
document.querySelectorAll(".remove-from-cart").forEach(button => {
  button.addEventListener("click", function() {
    const itemName = this.getAttribute("data-name");
    const item = items.find(i => i.name === itemName);
    removeItemFromCart(item);
  });
});
}

// add item on cart
function addToCart(item) {
// always update the cart to its latest state
if (!cart[item.name]) {
  cart[item.name] = { ...item, quantity: 1 };
} else {
  cart[item.name].quantity += 1;
}
updateCart();
updateBorder(item.name); // update border

}

// decrease the quantity of an item in the cart by 1
function removeFromCart(item) {
if (cart[item.name]) {
  cart[item.name].quantity -= 1;
  if (cart[item.name].quantity <= 0) {
    delete cart[item.name];
  }
}
updateCart();
updateBorder(item.name); // update border

}

function updateBorder(itemName) {
const card = [...document.querySelectorAll(".card")].find(card =>
  card.querySelector("img").alt === itemName // select img that matches the product name
);
if (card) {
  if (cart[itemName]) {
    card.classList.add("selected"); // apply border if items in cart
  } else {
    card.classList.remove("selected"); // remove border if no items in cart
  }
}
}


// remove items from cart completely
function removeItemFromCart(item) {
delete cart[item.name];
updateCart();
}

// update the cart display and total amount
function updateCart() {
// save the cart data to localStorage
localStorage.setItem("cart", JSON.stringify(cart));

// update the cart display
cartContainer.innerHTML = "";
let total = 0;
let totalQuantity = 0;

Object.values(cart).forEach(item => {
  total += item.price * item.quantity;
  totalQuantity += item.quantity;  // count # of items

  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `
    <h2>${item.name}</h2>
    <p><span class="cart-item-quantity">${item.quantity} x </span> <span class="cart-item-at">@ $${item.price.toFixed(2)}</span><span class="cart-item-total"> $${(item.price * item.quantity).toFixed(2)}</span></p>
  `;

  const button = document.createElement("button");
  button.classList.add("remove-from-cart");
  button.setAttribute("data-name", item.name);

  const img = document.createElement("img");
  img.src = "images/icon-remove-item.svg"; // specify the image path
  img.alt = "Remove item";
  img.classList.add("remove-icon"); // add styling class

  button.appendChild(img); // add the image inside the button

  div.appendChild(button);
  cartContainer.appendChild(div);

});

if (totalQuantity === 0) {
  // display an "empty image" and hide other elements when cart is empty
  const emptyCartImg = document.createElement("img");
  emptyCartImg.src = "images/illustration-empty-cart.svg";
  emptyCartImg.alt = "Your cart is empty";
  emptyCartImg.classList.add("empty-cart-image");

  const emptyCartText = document.createElement("p");
  emptyCartText.textContent = "Your added items will appear here";
  emptyCartText.classList.add("empty-cart-text");
  
  cartContainer.innerHTML = ""; // reset once
  cartContainer.appendChild(emptyCartImg);
  cartContainer.appendChild(emptyCartText);

  totalContainer.style.display = "none";
  confirmButton.style.display = "none";
  carbonImage.style.display ="none";

} else {
  //display if items in cart
  totalContainer.style.display = "flex";
  confirmButton.style.display = "block";
  carbonImage.style.display = "flex";

  totalContainer.innerHTML = 
  `<span class="order-total-left">Order Total</span>
   <span class="order-total-right"> $${total.toFixed(2)}</span>
  `;
}

// rebind the delete button event in cart
attachCartEvents();

// re-render and update the product list quantities.
renderMenu();


// update the total number of items in cart
const cartQuantity = document.querySelector(".cart-quantity");
  if (cartQuantity) {
    cartQuantity.textContent = totalQuantity;  // display # of items
  }
  }

// rebind the delete button event in cart
attachCartEvents();

// re-render and update the product list quantities.
renderMenu();

// display modal and confirmation button 
confirmButton.addEventListener("click", () => {
  modalContainer.style.display = "flex";  // diplay modal

// cart items on modal
confirmationDetail.innerHTML = "";  // reset 
let totalPrice = 0;

Object.values(cart).forEach(item => {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("cart-item-modal");
  itemDiv.innerHTML = `
    <picture>
      <img src="${item.image.thumbnail}" alt="${item.name}" class="modal-image">
    </picture>
    <div class="cart-item-details">
      <h2>${item.name}</h2>
      <p><span class="cart-item-quantity">${item.quantity}x </span> 
      <span class="cart-item-at">@ $${item.price.toFixed(2)}</span></p>
    </div>
    <div><span class="cart-item-total"> $${(item.price * item.quantity).toFixed(2)}</span></div>

  `;
  confirmationDetail.appendChild(itemDiv);

  totalPrice += item.price * item.quantity;
});

// total price on modal
modalTotal.innerHTML = `<span class="order-total-left">Order Total</span> 
<span class="order-total-right">$${totalPrice.toFixed(2)}</span>`;
});

// close modal and start a new order
document.querySelector(".close-button").addEventListener("click", () => {
  cart = {};  // remove item from cart
  localStorage.removeItem("cart");  // clear localStorage
  updateCart();  // update UI
  modalContainer.style.display = "none";  // close modal
});



// initial display
renderMenu();
updateCart();