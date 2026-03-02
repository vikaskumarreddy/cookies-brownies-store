const products = [
  { id: 1, name: "Choco Fudge Brownie", price: 120, image: "images/brownie1.jpg", category: "brownies", featured: true },
  { id: 2, name: "Walnut Brownie", price: 150, image: "images/brownie2.jpg", category: "brownies", featured: false },
  { id: 3, name: "Choco Chip Cookie", price: 80, image: "images/cookie1.jpg", category: "cookies", featured: true },
  { id: 4, name: "Butter Cookie", price: 60, image: "images/cookie2.jpg", category: "cookies", featured: false },
  { id: 5, name: "Premium Gift Box", price: 499, image: "images/brownie1.jpg", category: "gifts", featured: true }
];

function renderProducts(filteredProducts, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  filteredProducts.forEach(product => {
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

function loadFeaturedProducts() {
  const featured = products.filter(p => p.featured);
  renderProducts(featured, "featured-products");
}

function loadAllProducts() {
  renderProducts(products, "all-products");
}

function loadCategoryProducts(category) {
  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered, "category-products");
}
