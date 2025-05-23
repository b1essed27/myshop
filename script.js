const products = [
  { id: 1, name: "Футболка черная", price: 6000, image: "images/футболка.jpg" },
  { id: 2, name: "Футболка белая", price: 7000, image: "images/футболка2.jpg" },
  { id: 3, name: "Футболка зеленая", price: 6000, image: "images/футболка4.jpg" },

  { id: 2, name: "Штаны", price: 5000, image: "images/штаны.jpg" },
  { id: 4, name: "Брюки Bronks", price: 6800, image: "images/штаны3.jpg" },
  { id: 5, name: "Брюки Main Street", price: 8000, image: "images/штаны4.jpg" },
  { id: 6, name: "Брюки MAX PAYNE", price: 12000, image: "images/брюки.jpg" },

  { id: 3, name: "Кроссовки спортивные", price: 15800, image: "images/кроссовки.jpg" },
  { id: 7, name: "Кроссовки белые", price: 17000, image: "images/кроссовки2.jpg" },
  { id: 8, name: "Кроссовки черные", price: 22000, image: "images/кроссовки3.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = `🛒 Корзина (${cart.length})`;
}

function addToCart(id) {
  cart.push(id);
  saveCart();
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  showCart(); 
}


function showCart() {
  document.getElementById("cart-modal").classList.remove("hidden");
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((id, index) => {
  const product = products.find(p => p.id === id);
  if (product) {
    const div = document.createElement("div");
    div.innerHTML = `
      ${product.name} - ${product.price} ₸ 
      <button onclick="removeFromCart(${index})" style="margin-left:10px;">🗑</button>
    `;
    cartItems.appendChild(div);
    total += product.price;
  }
});

  document.getElementById("cart-total").innerText = total;
}

function closeCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}

function renderProducts(filteredProducts = products) {
  const container = document.getElementById("products-container");
  container.innerHTML = ""; // очищаем старые

  filteredProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p class="new-price">${product.price} ₸</p>
      <button onclick="addToCart(${product.id})">Добавить</button>
    `;
    container.appendChild(div);
  });
}

document.getElementById("cart-count").addEventListener("click", showCart);

renderProducts();
updateCartCount();

document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

function goToCheckout() {
  closeCart();
  setTimeout(() => {
    window.location.href = "checkout.html";
  }, 300);
}

function completePurchase() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartItems.forEach(item => {
    total += item.price;
  });

  
  const earnedPoints = Math.floor(total / 100);

  
  let currentPoints = parseInt(localStorage.getItem("myshopPoints")) || 0;
  currentPoints += earnedPoints;
  localStorage.setItem("myshopPoints", currentPoints);

  
  localStorage.removeItem("cart");
  updateCartCount();

  alert(`Спасибо за заказ! Вы получили ${earnedPoints} баллов. Всего у вас: ${currentPoints} 🎉`);
}

function updatePointsDisplay() {
  const points = parseInt(localStorage.getItem("myshopPoints")) || 0;
  document.getElementById("points-display").textContent = `🌟 Баллы: ${points}`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updatePointsDisplay();
});