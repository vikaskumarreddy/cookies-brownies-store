function loadCheckout() {
  const cart = getCart();
  const container = document.getElementById("checkout-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("checkout-total");

  if (!container) return;

  container.innerHTML = "";

  let subtotal = 0;
  const deliveryCharge = 40;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    container.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>₹${itemTotal}</td>
      </tr>
    `;
  });

  subtotalEl.textContent = "₹" + subtotal;
  totalEl.textContent = "₹" + (subtotal + deliveryCharge);
}

document.addEventListener("DOMContentLoaded", loadCheckout);

function startPayment() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const options = {
    key: "rzp_live_SMM0CUEonWSfA8",
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
