/* ============================= */
/* 🔥 FIREBASE INITIALIZATION   */
/* ============================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

/* Your Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyDRzQ1qiq__Zp2IWa40IyV2kLi-5TwXjTQ",
  authDomain: "cookie-store-8d48b.firebaseapp.com",
  projectId: "cookie-store-8d48b",
  storageBucket: "cookie-store-8d48b.firebasestorage.app",
  messagingSenderId: "234022229604",
  appId: "1:234022229604:web:f58d2d99ae17fbc0da3171",
  measurementId: "G-1FLBZKGLV1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* ============================= */
/* 🛒 CART UTILITIES            */
/* ============================= */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}


/* ============================= */
/* 📦 LOAD CHECKOUT SUMMARY     */
/* ============================= */

function loadCheckout() {
  const cart = getCart();
  const container = document.getElementById("checkout-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("checkout-total");

  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<tr><td colspan="3">Cart is empty</td></tr>`;
    return;
  }

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


/* ============================= */
/* 💳 START PAYMENT             */
/* ============================= */

window.startPayment = function () {

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  /* Validate Address */
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const state = document.getElementById("state").value;

  if (!name || !phone || !address || !city || !pincode || !state) {
    alert("Please fill all address details.");
    return;
  }

  const deliveryCharge = 40;
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const finalTotal = subtotal + deliveryCharge;

  const options = {
    key: "rzp_test_SMNhigwmIBhDJ4", // your test key
    amount: Math.round(finalTotal * 100),
    currency: "INR",
    name: "Sweet Cravings",
    description: "Order Payment",
    prefill: {
      name: name,
      email: user.email,
      contact: phone
    },
    theme: {
      color: "#2f7d57"
    },
    handler: async function (response) {

      try {

        const orderData = {
          userId: user.uid,
          userEmail: user.email,
          items: cart,
          address: {
            name,
            phone,
            address,
            city,
            pincode,
            state
          },
          paymentId: response.razorpay_payment_id,
          subtotal,
          deliveryCharge,
          total: finalTotal,
          status: "Paid",
          createdAt: serverTimestamp()
        };

        await addDoc(collection(db, "orders"), orderData);

        localStorage.removeItem("cart");

        alert("Payment Successful! 🎉");
        window.location.href = "success.html";

      } catch (error) {
        console.error("Order Save Error:", error);
        alert("Payment done but order saving failed. Contact support.");
      }
    },
    modal: {
      ondismiss: function () {
        console.log("Payment popup closed");
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
};


/* ============================= */
/* 🚀 INIT                      */
/* ============================= */

document.addEventListener("DOMContentLoaded", () => {
  loadCheckout();
});
