function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-container");

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(id => {
    container.innerHTML += `<p>Product ID: ${id}</p>`;
  });
}
