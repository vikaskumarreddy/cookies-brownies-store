function addProduct() {
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;

  alert(`Product ${name} added with price ₹${price}`);
}
