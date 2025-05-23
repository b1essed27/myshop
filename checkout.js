const products = [
  { id: 1, name: "Футболка белая", price: 900, image: "images/tshirt1.jpg" },
  { id: 2, name: "Футболка чёрная", price: 1000, image: "images/tshirt2.jpg" },
  { id: 3, name: "Футболка с принтом", price: 1100, image: "images/tshirt3.jpg" },
  { id: 4, name: "Штаны спортивные", price: 1800, image: "images/pants1.jpg" },
  { id: 5, name: "Штаны джинсовые", price: 2000, image: "images/pants2.jpg" },
  { id: 6, name: "Штаны карго", price: 2200, image: "images/pants3.jpg" },
  { id: 7, name: "Кроссовки белые", price: 3000, image: "images/shoes1.jpg" },
  { id: 8, name: "Кроссовки черные", price: 3200, image: "images/shoes2.jpg" },
  { id: 9, name: "Кроссовки цветные", price: 3500, image: "images/shoes3.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCheckout() {
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");
  container.innerHTML = "";

  let total = 0;

  cart.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      const item = document.createElement("div");
      item.innerText = `${product.name} - ${product.price} ₸`;
      container.appendChild(item);
      total += product.price;
    }
  });

  totalEl.innerText = total;
}

function confirmOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    alert("Пожалуйста, введите имя и телефон.");
    return;
  }

  // Очистка корзины
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // Очистка формы
  document.getElementById("checkout-form").style.display = "none";
  document.getElementById("thank-you").style.display = "block";
  document.getElementById("checkout-items").innerHTML = "";
  document.getElementById("checkout-total").innerText = "0";
}

renderCheckout();