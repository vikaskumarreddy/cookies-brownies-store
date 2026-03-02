const products = [
  { id: 1, name: "Choco Fudge Brownie", price: 120, image: "images/brownie1.jpg", category: "brownies", featured: true },
  { id: 2, name: "Walnut Brownie", price: 150, image: "images/brownie2.jpg", category: "brownies", featured: false },
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

function renderProducts(productList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (productList.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}">
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
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

