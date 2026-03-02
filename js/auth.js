function login() {
  const email = document.getElementById("email").value;

  localStorage.setItem("user", email);
  alert("Logged in!");
  window.location.href = "products.html";
}
