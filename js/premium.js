let totalOrder = 0;
let totalPrice = 0;
let orderList = [];

// ===== មុខងារបង្ហាញលទ្ធផលនៅលើអេក្រង់ (UI) =====
function renderOrders() {
  const orderBox = document.getElementById("order-box");
  const totalOrderEl = document.getElementById("totalOrder");
  const messageEl = document.getElementById("message");

  // ប្រសិនបើរកមិនឃើញកន្លែងបង្ហាញទិន្នន័យ មិនបាច់ដំណើរការកូដខាងក្រោមទេ
  if (!messageEl) return; 

  // ១. ពិនិត្យមើលលក្ខខណ្ឌ៖ បើគ្មានទំនិញក្នុងកន្ត្រកទេ ឱ្យលាក់ប្រអប់ព័ត៌មានចោលតែម្តង
  if (orderList.length === 0) {
    if (orderBox) orderBox.style.display = "none"; 
    return; // បញ្ឈប់ការធ្វើការត្រឹមនេះ
  } else {
    // បើមានទំនិញចាប់ពី ១មុខឡើងទៅ ឱ្យបង្ហាញប្រអប់ព័ត៌មានឡើងវិញ
    if (orderBox) orderBox.style.display = "block"; 
  }

  // ២. បើមានទំនិញ ធ្វើការបង្ហាញលេខ និងឈ្មោះបន្តគ្នាធម្មតា
  if (totalOrderEl) totalOrderEl.textContent = totalOrder;

  const allOrderedNames = orderList.map(item => item.name).join(", ");

  const listNames = orderList.map((item, index) => 
    `${item.name} <button onclick="removeOrder(${index})">❎</button>`
  ).join("<br>");
  
  document.getElementById("message").innerHTML =
    `✅ You ordered: <b>${orderList.length > 0 ? orderList[orderList.length-1].name : "None"}</b><br>
    💵 Total price: $${totalPrice.toFixed(2)}<br>
    📋 Orders list:<br>${listNames}<br>
   <button class="contact-btn" onclick="goToContact()">Contact</button>`;
}


// ===== មុខងារកុម្ម៉ង់ផ្លែឈើ =====
function orderfurit(name) {
  const card = [...document.querySelectorAll(".card")]
    .find(c => c.querySelector("h2").textContent.toLowerCase() === name.toLowerCase());

  let newPrice = 2.5; 
  if (card) {
    const newPriceEl = card.querySelector("span");
    if (newPriceEl) {
      newPrice = parseFloat(newPriceEl.textContent.replace("$", ""));
    }
  }

  totalOrder++;
  totalPrice += newPrice;
  orderList.push({ name, price: newPrice });

  localStorage.setItem("cart", JSON.stringify(orderList));
  renderOrders(); // ពេលចុចកុម្ម៉ង់ វានឹងរុញទៅ renderOrders ដើម្បីបង្ហាញប្រអប់ឡើងវិញ
}

// ===== មុខងារលុបទំនិញ =====
function removeOrder(index) {
  if (index !== -1 && index < orderList.length) {
    totalOrder--;
    totalPrice -= orderList[index].price;
    orderList.splice(index, 1);
  }
  
  localStorage.setItem("cart", JSON.stringify(orderList));
  renderOrders(); // ពេលលុបអស់រលីងពីកន្ត្រក វានឹងរុញទៅ renderOrders ដើម្បីលាក់ប្រអប់វិញ
}

// ===== មុខងារស្វែងរកផ្លែឈើ =====
function searchfruit() {
  const input = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}

function goToContact() {
  window.location.href = "contact.html";
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    orderList = JSON.parse(savedCart);
    totalOrder = orderList.length;
    totalPrice = orderList.reduce((total, item) => total + Number(item.price), 0);
  }
}

window.onload = function() {
  loadCart();     
  renderOrders(); 
};
