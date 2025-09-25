document.getElementById("loginPage").style.display = "block";

function showSignUp() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("signUpPage").style.display = "block";
}

function showLogin() {
  document.getElementById("signUpPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

function signUp() {
  const user = {
    name: document.getElementById("name").value,
    fathername: document.getElementById("fathername").value,
    email: document.getElementById("email").value,
    Aadhar: document.getElementById("Aadhar").value,
    mobile: document.getElementById("signUpMobile").value,
    password: document.getElementById("password").value,
    college: document.getElementById("college").value
  };

  if (!user.name || !user.email || !user.mobile || !user.password || !user.college || !user.Aadhar) {
    document.getElementById("signUpMessage").innerText = "Please fill all fields!";
    document.getElementById("signUpMessage").classList.add("error");
    return;
  }

  localStorage.setItem(user.mobile, JSON.stringify(user));
  document.getElementById("signUpMessage").innerText = "Registration successful ✅";
  document.getElementById("signUpMessage").classList.remove("error");

  setTimeout(() => {
    showLogin();
  }, 1500);
}

function login() {
  const mobile = document.getElementById("loginMobile").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem(mobile));

  if (!user) {
    document.getElementById("loginMessage").innerText = "User not found!";
    return;
  }

  if (user.password === password) {
    currentUser = user;
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("shopPage").style.display = "block";
    updateCartUserDetails(currentUser);
  } else {
    document.getElementById("loginMessage").innerText = "Wrong password!";
  }
}

function updateCartUserDetails(user) {
  document.getElementById("userName").innerText = user.name;
  document.getElementById("userFatherName").innerText = user.fathername;
  document.getElementById("userMobile").innerText = user.mobile;
  document.getElementById("userEmail").innerText = user.email;
  document.getElementById("userCollege").innerText = user.college;
}

function toggleUserPanel() {
  const userPanel = document.getElementById("userPanel");
  if (userPanel.style.display === "block") {
    userPanel.style.display = "none";
  } else {
    document.getElementById("panelName").value = currentUser.name;
    document.getElementById("panelFatherName").value = currentUser.fathername;
    document.getElementById("panelEmail").value = currentUser.email;
    document.getElementById("panelMobile").value = currentUser.mobile;
    document.getElementById("panelAadhar").value = currentUser.Aadhar;
    document.getElementById("panelCollege").value = currentUser.college;
    userPanel.style.display = "block";
  }
}

function saveUserDetails() {
  currentUser.name = document.getElementById("panelName").value;
  currentUser.fathername = document.getElementById("panelFatherName").value;
  currentUser.email = document.getElementById("panelEmail").value;
  currentUser.Aadhar = document.getElementById("panelAadhar").value;
  currentUser.college = document.getElementById("panelCollege").value;

  localStorage.setItem(currentUser.mobile, JSON.stringify(currentUser));
  updateCartUserDetails(currentUser);

  document.getElementById("panelMessage").innerText = "Details saved successfully! ✅";
  document.getElementById("panelMessage").classList.remove("error");

  setTimeout(() => {
    document.getElementById("userPanel").style.display = "none";
  }, 1500);
}

function addToCart(product, price) {
  cart.push({ product, price });
  renderCart();
}

function removeFromCart(product) {
  const index = cart.findIndex(item => item.product === product);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");
  cartList.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.product} - ₹${item.price}`;
    cartList.appendChild(li);
    sum += item.price;
  });

  total.innerText = sum;
}

function goToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  document.getElementById("shopPage").style.display = "none";
  document.getElementById("checkoutPage").style.display = "block";
  document.getElementById("checkoutTotal").innerText = document.getElementById("cartTotal").innerText;
}

function backToCart() {
  document.getElementById("checkoutPage").style
}
