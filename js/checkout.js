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
    key: "rzp_test_SMNhigwmIBhDJ4",
    amount: Math.round(total * 100), // Use Math.round to ensure it's an integer
    currency: "INR",
    name: "Sweet Cravings",
    description: "Order Payment",
    // 1. Add Prefill (even if empty) to prevent initialization errors
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    // 2. Add Theme and Retry logic
    "theme": {
        "color": "#3399cc"
    },
    "modal": {
        "ondismiss": function() {
            console.log("Checkout closed");
        }
    },
    handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
        localStorage.removeItem("cart");
        window.location.href = "success.html";
    }
};


  const rzp = new Razorpay(options);
  rzp.open();
}

document.addEventListener("DOMContentLoaded", loadCheckout);
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("Please login first.");
  window.location.href = "login.html";
}
