const images = [
  "img/fruits-banner.jpg",
  "img/banner6.jpg",
  "img/banner5.jpg"
];

let index = 0;
const bannerImage = document.getElementById("bannerImage");

function changeImage() {
  index = (index + 1) % images.length;
  bannerImage.style.opacity = 0; // fade out
  setTimeout(() => {
    bannerImage.src = images[index];
    bannerImage.style.opacity = 1; // fade in
  }, 500);
}

// Auto change every 4 seconds
setInterval(changeImage, 4000);
