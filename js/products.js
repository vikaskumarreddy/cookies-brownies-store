const products = [
  {
    id: 1,
    name: "Choco Fudge Brownie",
    price: 120,
    image: "images/brownie1.jpg"
  },
  {
    id: 2,
    name: "Walnut Brownie",
    price: 150,
    image: "images/brownie2.jpg"
  },
  {
    id: 3,
    name: "Choco Chip Cookie",
    price: 80,
    image: "images/cookie1.jpg"
  },
  {
    id: 4,
    name: "Butter Cookie",
    price: 60,
    image: "images/cookie2.jpg"
  }
];

function displayProducts() {
  const container = document.getElementById("product-container");

  products.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

displayProducts();
