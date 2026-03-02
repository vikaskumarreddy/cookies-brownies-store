<script type="module">
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const auth = getAuth(app);

  window.register = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created!");
      })
      .catch(error => alert(error.message));
  };

  window.login = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login successful!");
        window.location.href = "index.html";
      })
      .catch(error => alert(error.message));
  };

  window.logout = function () {
    signOut(auth).then(() => {
      alert("Logged out");
    });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email
      }));
    } else {
      localStorage.removeItem("user");
    }
  });
</script>
