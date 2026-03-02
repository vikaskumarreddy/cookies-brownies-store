function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function displayCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80"/>
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <div>
            <button onclick="changeQty(${item.id}, -1)">-</button>
            ${item.quantity}
            <button onclick="changeQty(${item.id}, 1)">+</button>
            <button onclick="removeItem(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  totalEl.textContent = "Total: ₹" + total;
}

function changeQty(id, change) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeItem(id);
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

document.addEventListener("DOMContentLoaded", displayCart);

