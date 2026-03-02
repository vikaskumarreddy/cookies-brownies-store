function loadCheckout() {
  const cart = getCart();
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!cart.length) {
    container.innerHTML = "Cart is empty.";
    return;
  }

  let total = 0;
  container.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.quantity;
    container.innerHTML += `
      <p>${item.name} x ${item.quantity} = ₹${item.price * item.quantity}</p>
    `;
  });

  totalEl.textContent = "Total: ₹" + total;
}

function startPayment() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: total * 100, // paise
    currency: "INR",
    name: "Sweet Cravings",
    description: "Order Payment",
    handler: function (response) {
      alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

      localStorage.removeItem("cart");
      window.location.href = "success.html";
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

document.addEventListener("DOMContentLoaded", loadCheckout);
