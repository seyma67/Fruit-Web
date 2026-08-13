// ===== ១. ប្រកាស Variable នៅខាងលើគេបង្អស់ =====
let totalOrder = 0;
let totalPrice = 0;
let orderList = [];

// ===== ២. មុខងារទាញទិន្នន័យពី LocalStorage ពេលបើក Web ភ្លាម =====
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    orderList = JSON.parse(savedCart);
    totalOrder = orderList.length;
    totalPrice = orderList.reduce((total, item) => total + Number(item.price), 0);
  }
}

// ===== ៣. មុខងារកុម្ម៉ង់ផ្លែឈើ (រក្សាទុកបន្តគ្នា) =====
function orderfurit(name) {
  const card = [...document.querySelectorAll(".card")]
    .find(c => c.querySelector("h2").textContent.toLowerCase() === name.toLowerCase());

  if (!card) return;

  const oldPriceEl = card.querySelector("h3 del");
  const newPriceEl = card.querySelector("h3 span");

  let oldPrice = 0;
  let newPrice = 0;

  if (oldPriceEl) oldPrice = parseFloat(oldPriceEl.textContent.replace("$", ""));
  if (newPriceEl) newPrice = parseFloat(newPriceEl.textContent.replace("$", ""));

  // ប្រសិនបើមាន promotion → ចាប់តម្លៃថ្មី
  const finalPrice = newPrice > 0 ? newPrice : oldPrice;

  totalOrder++;
  totalPrice += finalPrice;
  orderList.push({ name, price: finalPrice, oldPrice, discount: oldPrice - finalPrice });

  localStorage.setItem("cart", JSON.stringify(orderList));
  renderOrders();
}


// ===== ៤. មុខងារលុបទំនិញតាមលំដាប់ (Index) ការពារលុបជាន់ឈ្មោះគ្នា =====
function removeOrder(index) {
  if (index !== -1 && index < orderList.length) {
    totalOrder--;
    totalPrice -= orderList[index].price;
    orderList.splice(index, 1);
  }
  
  // ធ្វើបច្ចុប្បន្នភាពទិន្នន័យក្នុង LocalStorage ក្រោយពេលលុប
  localStorage.setItem("cart", JSON.stringify(orderList));
  renderOrders();
}

// ===== ៥. មុខងារបង្ហាញលទ្ធផលនៅលើអេក្រង់ UI (បង្ហាញឈ្មោះបន្តគ្នា) =====
function renderOrders() {
  const totalOrderEl = document.getElementById("totalOrder");
  if (totalOrderEl) totalOrderEl.textContent = totalOrder;

  const messageEl = document.getElementById("message");
  if (!messageEl) return;

  if (orderList.length === 0) {
    // បង្ហាញតែ Total order 0
    messageEl.innerHTML = "";
  } else {
    // បង្ហាញ receipt ពេលមាន order
    const listNames = orderList.map((item, index) => 
      `${item.name} <button onclick="removeOrder(${index})">❎</button>`
    ).join("<br>");
    
    messageEl.innerHTML =
      `✅ You ordered: <b>${orderList[orderList.length-1].name}</b><br>
       💵 Total price: $${totalPrice.toFixed(2)}<br>
       📋 Orders list:<br>${listNames}<br>
       <button class="contact-btn" onclick="goToContact()">Contact</button>`;
  }
}


// ===== ៦. មុខងារស្វែងរកផ្លែឈើ =====
function searchfruit() {
  const input = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}

// ===== ៧. មុខងារទៅកាន់ទំព័រ Contact =====
function goToContact() {
  window.location.href = "contact.html";
}

// ===== ៨. គណនាបង្ហាញស្លាក % បញ្ចុះតម្លៃអូតូម៉ាទិក =====
function applyDiscountBadges() {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const priceElement = card.querySelector("h3");
    if (!priceElement) return;

    const oldPriceEl = priceElement.querySelector("del");
    const newPriceEl = priceElement.querySelector("span");

    if (oldPriceEl && newPriceEl) {
      const oldPrice = parseFloat(oldPriceEl.textContent.replace("$", ""));
      const newPrice = parseFloat(newPriceEl.textContent.replace("$", ""));

      if (!isNaN(oldPrice) && !isNaN(newPrice)) {
        const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

        if (!card.querySelector(".discount-badge")) {
          const badge = document.createElement("div");
          badge.className = "discount-badge";
          badge.textContent = `-${discount}%`;
          card.style.position = "relative";
          card.appendChild(badge);
        }
      }
    }
  });
}

// ===== ៩. មុខងារចម្រាញ់កាត (Filter) បង្ហាញតែទំនិញដែលមានការបញ្ចុះតម្លៃ =====
function showPromotions() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const priceElement = card.querySelector("h3");
    if (!priceElement) {
      card.style.display = "none";
      return;
    }
    // បើកាតមាន Tag <del> មានន័យថាជាទំនិញ Promotion
    const hasDiscount = priceElement.querySelector("del") !== null;
    card.style.display = hasDiscount ? "block" : "none";
  });
}

// មុខងារបង្ហាញផ្លែឈើទាំងអស់ឡើងវិញ (សម្រាប់ប៊ូតុង ALL)
function showAllFruits() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.display = "block";
  });
}


// ===== ១០. ដំណើរការរាល់មុខងារចាំបាច់ទាំងអស់ពេល Web ដើរដំបូង =====
window.onload = function() {
  loadCart();             // ១. ទាញទិន្នន័យដែលធ្លាប់កុម្ម៉ង់ពី Memory មកវិញ
  renderOrders();         // ២. បង្ហាញបញ្ជីកន្ត្រកទំនិញលើ Layout
  applyDiscountBadges();  // ៣. បង្ហាញស្លាកភាគរយចុះតម្លៃនៅលើកាត
};
