const products = [
  { id: 1, name: "Choco Fudge Brownie", price: 1, image: "images/shopping.webp", category: "brownies", featured: true },
  { id: 2, name: "Walnut Brownie", price: 150, image: "images/Nutella_brownie.webp", category: "brownies", featured: false },
  { id: 3, name: "Choco Chip Cookie", price: 80, image: "images/cookie1.jpg", category: "cookies", featured: true },
  { id: 4, name: "Butter Cookie", price: 60, image: "images/cookie2.jpg", category: "cookies", featured: false },
  { id: 5, name: "Premium Gift Box", price: 499, image: "images/brownie1.jpg", category: "gifts", featured: true }
];

/* ========================= */
/* CATEGORY LIST GENERATION  */
/* ========================= */

function getUniqueCategories() {
  const categories = products.map(p => p.category);
  return [...new Set(categories)];
}

function renderCategories() {
  const container = document.getElementById("category-list");
  if (!container) return;

  const categories = getUniqueCategories();

  container.innerHTML = "";

  categories.forEach(cat => {
    container.innerHTML += `
      <a href="products.html?category=${cat}" class="product-card">
        <img src="${products.find(p => p.category === cat).image}">
        <h4 style="text-transform:capitalize">${cat}</h4>
      </a>
    `;
  });
}

/* ========================= */
/* PRODUCT RENDERING         */
/* ========================= */
function getCartItem(id) {
  const cart = getCart();
  return cart.find(item => item.id === id);
}

function renderProducts(productList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (productList.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach(product => {
    const cartItem = getCartItem(product.id);

    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" />
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>

        <div id="cart-btn-${product.id}">
          ${cartItem ? quantityControls(product.id, cartItem.quantity) 
                     : `<button onclick="addToCart(${product.id})" class="add-btn">Add to Cart</button>`}
        </div>
      </div>
    `;
  });
}
function quantityControls(id, qty) {
  return `
    <div class="qty-control">
      <button onclick="changeQty(${id}, -1)">-</button>
      <span>${qty}</span>
      <button onclick="changeQty(${id}, 1)">+</button>
    </div>
  `;
}

function loadProductsByCategoryFromURL(containerId) {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered, containerId);
  } else {
    renderProducts(products, containerId);
  }
}
function loadFeaturedProducts() {
  const featured = products.filter(p => p.featured);
  renderProducts(featured, "featured-products");
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = getCart();

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartButton(id);
  updateCartCount();

}
function updateCartButton(id) {
  const container = document.getElementById(`cart-btn-${id}`);
  if (!container) return;
  const cartItem = getCartItem(id);

  if (cartItem) {
    container.innerHTML = quantityControls(id, cartItem.quantity);
  } else {
    container.innerHTML = `
      <button onclick="addToCart(${id})" class="add-btn">
        Add to Cart
      </button>
    `;
  }
}
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const countEl = document.getElementById("cart-count");
  const countELMobile = document.getElementById("cart-count-mobile");
  if (countEl) {
    countEl.textContent = total;
    countELMobile.textContent = total;
  }
}

document.addEventListener("DOMContentLoaded", updateCartCount);
function loadCart() {
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

  totalEl.textContent = " ₹" + total;
}
function changeQty(id, change) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart(cart);

  displayCart();        // for cart page
  updateCartButton(id); // for products page
  updateCartCount();    // navbar badge
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

function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  loadCart();
  updateCartCount();
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadCart();
});












