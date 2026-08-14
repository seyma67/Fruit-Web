function orderFruit(name, price, oldPrice = null) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
   
  let discount = 0;
  if (oldPrice && oldPrice > price) {
    discount = oldPrice - price;
  }

  // រក្សាទុកទិន្នន័យចាំបាច់ទាំងអស់ចូលក្នុង Cart
  cart.push({ 
    name: name, 
    price: price, 
    oldPrice: oldPrice || price, 
    discount: discount 
  });
  
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemCount = cart.length;
  const subtotal = cart.reduce((sum, item) => sum + (item.oldPrice || item.price), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + (item.discount || 0), 0);
  const total = subtotal - totalDiscount;

  document.getElementById("itemCount").textContent = itemCount;
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("discount").textContent = `-$${totalDiscount.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;

  const orderListEl = document.getElementById("orderList");
  orderListEl.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");


    
    if (item.discount && item.discount > 0) {
   li.innerHTML = `
        <span class="fruit-name">${item.name}</span>
        <span class="fruit-price">
          <del style="margin-right: 8px; color: #f16161;">$${item.oldPrice.toFixed(2)}</del> 
          <strong>$${item.price.toFixed(2)}</strong>
        </span>
      `;
    } else {
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    }
    orderListEl.appendChild(li);
  });
});

window.onload = function() {
  applyDiscountBadges();  // ៣. បង្ហាញស្លាកភាគរយចុះតម្លៃនៅលើកាត
  
};
function goToContact() {
  window.location.href = "contact.html";















}// ===== ១. ប្រកាស Variable នៅខាងលើគេបង្អស់ =====
// let totalOrder = 0;
// let totalPrice = 0;
// let orderList = [];

// // ===== ២. មុខងារទាញទិន្នន័យពី LocalStorage ពេលបើក Web ភ្លាម =====
// function loadCart() {
//   const savedCart = localStorage.getItem("cart");
//   if (savedCart) {
//     orderList = JSON.parse(savedCart);
//     totalOrder = orderList.length;
//     totalPrice = orderList.reduce((total, item) => total + Number(item.price), 0);
//   }
// }

// ===== ៣. មុខងារកុម្ម៉ង់ផ្លែឈើ (រក្សាទុកបន្តគ្នា) =====
// menu.js
// function orderFruit(name, price) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cart.push({ name, price });
//   localStorage.setItem("cart", JSON.stringify(cart));

// }
// document.addEventListener("DOMContentLoaded", () => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const itemCount = cart.length;
//   const subtotal = cart.reduce((sum, item) => sum + (item.oldPrice || item.price), 0);
//   const totalDiscount = cart.reduce((sum, item) => sum + (item.discount || 0), 0);
//   const total = subtotal - totalDiscount;

//   document.getElementById("itemCount").textContent = itemCount;
//   document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
//   document.getElementById("discount").textContent = `-$${totalDiscount.toFixed(2)}`;
//   document.getElementById("total").textContent = `$${total.toFixed(2)}`;

//   const orderListEl = document.getElementById("orderList");
//   orderListEl.innerHTML = "";
//   cart.forEach(item => {
//     const li = document.createElement("li");
//     if (item.discount && item.discount > 0) {
//       li.innerHTML = `${item.name} <del>$${item.oldPrice.toFixed(2)}</del> 
//                       <span>$${item.price.toFixed(2)}</span> 
//                       (Saved $${item.discount.toFixed(2)})`;
//     } else {
//       li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
//     }
//     orderListEl.appendChild(li);
//   });
// });


// // ===== ៤. មុខងារលុបទំនិញតាមលំដាប់ (Index) ការពារលុបជាន់ឈ្មោះគ្នា =====
// function removeOrder(index) {
//   if (index !== -1 && index < orderList.length) {
//     totalOrder--;
//     totalPrice -= orderList[index].price;
//     orderList.splice(index, 1);
//   }
  
//   // ធ្វើបច្ចុប្បន្នភាពទិន្នន័យក្នុង LocalStorage ក្រោយពេលលុប
//   localStorage.setItem("cart", JSON.stringify(orderList));
//   renderOrders();
// }

// // ===== ៥. មុខងារបង្ហាញលទ្ធផលនៅលើអេក្រង់ UI (បង្ហាញឈ្មោះបន្តគ្នា) =====
// function renderOrders() {
//   const totalOrderEl = document.getElementById("totalOrder");
//   if (totalOrderEl) totalOrderEl.textContent = totalOrder;

//   const messageEl = document.getElementById("message");
//   if (!messageEl) return; // ការពារកូដគាំងបើទំព័រខ្លះគ្មាន id="message"

//   // បង្កើតអក្សរបង្ហាញឈ្មោះផ្លែឈើទាំងអស់បន្តគ្នា (ឧទាហរណ៍៖ cherry, blueberry)
//   const allOrderedNames = orderList.length > 0 
//     ? orderList.map(item => item.name).join(", ") 
//     : "None";

//   // បង្កើតបញ្ជីឈ្មោះដែលមានប៊ូតុងលុប
//   const listNames = orderList.map((item, index) => 
//     `${item.name} <button onclick="removeOrder(${index})">❎</button>`
//   ).join("<br>");
  
//   document.getElementById("message").innerHTML =
//     `✅ You ordered: <b>${orderList.length > 0 ? orderList[orderList.length-1].name : "None"}</b><br>
//     💵 Total price: $${totalPrice.toFixed(2)}<br>
//     📋 Orders list:<br>${listNames}<br>
//    <button class="contact-btn" onclick="goToContact()">Contact</button>`;
// }

// ===== ៦. មុខងារស្វែងរកផ្លែឈើ =====
// function searchfruit() {
//   const input = document.getElementById("search").value.toLowerCase();
//   const cards = document.querySelectorAll(".card");

//   cards.forEach(card => {
//     const title = card.querySelector("h2").textContent.toLowerCase();
//     card.style.display = title.includes(input) ? "block" : "none";
//   });
// }

// // ===== ៧. មុខងារទៅកាន់ទំព័រ Contact =====
// function goToContact() {
//   window.location.href = "contact.html";
// }

// // ===== ៨. គណនាបង្ហាញស្លាក % បញ្ចុះតម្លៃអូតូម៉ាទិក =====
// function applyDiscountBadges() {
//   const cards = document.querySelectorAll(".card");

//   cards.forEach(card => {
//     const priceElement = card.querySelector("h3");
//     if (!priceElement) return;

//     const oldPriceEl = priceElement.querySelector("del");
//     const newPriceEl = priceElement.querySelector("span");

//     if (oldPriceEl && newPriceEl) {
//       const oldPrice = parseFloat(oldPriceEl.textContent.replace("$", ""));
//       const newPrice = parseFloat(newPriceEl.textContent.replace("$", ""));

//       if (!isNaN(oldPrice) && !isNaN(newPrice)) {
//         const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

//         if (!card.querySelector(".discount-badge")) {
//           const badge = document.createElement("div");
//           badge.className = "discount-badge";
//           badge.textContent = `-${discount}%`;
//           card.style.position = "relative";
//           card.appendChild(badge);
//         }
//       }
//     }
//   });
// }

// // ===== ៩. មុខងារចម្រាញ់កាត (Filter) បង្ហាញតែទំនិញដែលមានការបញ្ចុះតម្លៃ =====
// function showPromotions() {
//   const cards = document.querySelectorAll(".card");
//   cards.forEach(card => {
//     const priceElement = card.querySelector("h3");
//     if (!priceElement) {
//       card.style.display = "none";
//       return;
//     }
//     // បើកាតមាន Tag <del> មានន័យថាជាទំនិញ Promotion
//     const hasDiscount = priceElement.querySelector("del") !== null;
//     card.style.display = hasDiscount ? "block" : "none";
//   });
// }

// // មុខងារបង្ហាញផ្លែឈើទាំងអស់ឡើងវិញ (សម្រាប់ប៊ូតុង ALL)
// function showAllFruits() {
//   const cards = document.querySelectorAll(".card");
//   cards.forEach(card => {
//     card.style.display = "block";
//   });
// }

//===== ១០. ដំណើរការរាល់មុខងារចាំបាច់ទាំងអស់ពេល Web ដើរដំបូង =====
window.onload = function() {
  // loadCart();             // ១. ទាញទិន្នន័យដែលធ្លាប់កុម្ម៉ង់ពី Memory មកវិញ
  // renderOrders();         // ២. បង្ហាញបញ្ជីកន្ត្រកទំនិញលើ Layout
  applyDiscountBadges();  // ៣. បង្ហាញស្លាកភាគរយចុះតម្លៃនៅលើកាត
  
};
function goToContact() {
  window.location.href = "contact.html";
}

