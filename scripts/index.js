// ! Popular Categories Bölümünde Sağa Sola Kaydırmak İçin;
const popularCategoriesWrapper = document.querySelector(
  ".popular-categories-wrapper"
);
const rightBtn = document.querySelector(".right-btn");
const leftBtn = document.querySelector(".left-btn");

rightBtn.addEventListener("click", function () {
  popularCategoriesWrapper.scrollLeft += 100;
});

leftBtn.addEventListener("click", function () {
  popularCategoriesWrapper.scrollLeft -= 100;
});

// ! Popular Categories Bölümü İçin;

const categoryImages = {
  furniture:
    "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png",
  groceries: "https://cdn.dummyjson.com/products/images/groceries/Apple/1.png",
  "home-decoration":
    "https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/1.png",
  "kitchen-accessories":
    "https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/1.png",
  laptops:
    "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png",
  "mens-shirts":
    "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png",
  "mens-shoes":
    "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/1.png",
  "mens-watches":
    "https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png",
  "mobile-accessories":
    "https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png",
  motorcycle:
    "https://cdn.dummyjson.com/products/images/motorcycle/Generic%20Motorcycle/1.png",
  "skin-care":
    "https://cdn.dummyjson.com/products/images/skin-care/Attitude%20Super%20Leaves%20Hand%20Soap/1.png",
  smartphones:
    "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png",
  "sports-accessories":
    "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png",
  sunglasses:
    "https://cdn.dummyjson.com/products/images/sunglasses/Black%20Sun%20Glasses/1.png",
  tablets:
    "https://cdn.dummyjson.com/products/images/tablets/iPad%20Mini%202021%20Starlight/1.png",
  tops: "https://cdn.dummyjson.com/products/images/tops/Blue%20Frock/1.png",
  vehicle:
    "https://cdn.dummyjson.com/products/images/vehicle/300%20Touring/1.png",
  "womens-bags":
    "https://cdn.dummyjson.com/products/images/womens-bags/Blue%20Women's%20Handbag/1.png",
  "womens-dresses":
    "https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/1.png",
  "womens-jewellery":
    "https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Crystal%20Earring/1.png",
  "womens-shoes":
    "https://cdn.dummyjson.com/products/images/womens-shoes/Calvin%20Klein%20Heel%20Shoes/1.png",
  "womens-watches":
    "https://cdn.dummyjson.com/products/images/womens-watches/Watch%20Gold%20for%20Women/1.png",
  beauty:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
  fragrances:
    "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png",
};

fetch("https://dummyjson.com/products/category-list")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const popularCategoriesWrapper = document.querySelector(".popular-categories-wrapper");

    data.forEach((categoryName) => {
      
      const col2 = document.createElement("div");
      col2.classList = "col-2";

      col2.addEventListener("click", function(){
        // console.log(index)
        window.location.href = `urunler.html?category=${categoryName}`
      })
    
      // İlk harfi büyük yapmak için
      const formattedCategoryName =
        categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase();

      // Kategoriye ait resmi almak için categoryImages objesini kullan
      const categoryImage = categoryImages[categoryName] || "img/default.jpg"; // Varsayılan resim

      col2.innerHTML = `
            <div class="border border-1 border-success p-2 rounded-2 bg-body-secondary">
                <img class="w-100 height rounded-2 cursor" src="${categoryImage}" alt="${formattedCategoryName}">
                <a href="#" class="d-block my-3 text-center active text-decoration-none">${formattedCategoryName}</a>
            </div>
        `;

        popularCategoriesWrapper.append(col2);
    });
  });


// ! Shop ifadesine tıkladığımda o sayfaya göndermek için;
const shopNav = document.querySelector("#shop");
shopNav.addEventListener("click", function(){
  window.location.href = "urunler.html";
})

// ! Tooltips İçin;
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// ! Features Popular New Added Bölümü İçin;
const oneCikanlar = document.querySelector("#one-cikanlar");
  const populer = document.querySelector("#populer");
  const sonEklenenler = document.querySelector("#son-eklenenler");

  const productWrapperRow = document.querySelector(".product-wrapper-row");

  // Initial fetch to display featured products
  fetch('https://dummyjson.com/products/category/groceries?limit=0')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      ilgiliUrunleriGetir(data.products, 4.4);
      // Set initial active button background
      setActiveButton(oneCikanlar);
    });

  const ilgiliUrunleriGetir = (data, rating) => {
    const filteredProducts = data.filter((urun) => urun.rating >= rating);

    filteredProducts.slice(0, 8).forEach((urun) => {
      const col3 = document.createElement("div");
      col3.classList = "col-3 mb-3";

      const originalPrice = (urun.price / (1 - (urun.discountPercentage / 100))).toFixed(2);

      col3.innerHTML = `
        <div class="border border-1 border-success p-3 rounded-4 position-relative">
          <img class="w-100 rounded-4 yükseklik" src="${urun.images[0]}" alt="">
          <p class="fs-7 mt-2 mb-0">${urun.category}</p>
          <p class="mb-0">${urun.title}</p>
          <div class="star-rating">
            <i class="bi bi-star text-warning fs-7"></i>
            <i class="bi bi-star text-warning fs-7"></i>
            <i class="bi bi-star text-warning fs-7"></i>
            <i class="bi bi-star text-warning fs-7"></i>
            <i class="bi bi-star text-warning fs-7"></i>
          </div>
          <p class="price active fw-bold me-3 d-inline-flex my-0">$${urun.price}</p>
          <del class="text-secondary"><small>$${originalPrice}</small></del>
          <div class="add-to-cart">
            <button type="button" class="btn rounded-circle fs-7" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
              <i class="bi bi-bag-plus"></i>
            </button>
          </div>
        </div>
      `;

      productWrapperRow.append(col3);
    });
  };

  // Helper function to set the active button
  const setActiveButton = (button) => {
    [oneCikanlar, populer, sonEklenenler].forEach(btn => btn.classList.remove("active-button"));
    button.classList.add("active-button");
  };

  // Event listener for "Populer" section
  populer.addEventListener("click", function () {
    fetch('https://dummyjson.com/products?limit=0')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        productWrapperRow.innerHTML = "";
        ilgiliUrunleriGetir(data.products, 4.8);
        setActiveButton(populer);
      });
  });

  // Event listener for "Son Eklenenler" section to sort by date
  sonEklenenler.addEventListener("click", function () {
    fetch('https://dummyjson.com/products?limit=0')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        productWrapperRow.innerHTML = "";

        const sortedByDate = data.products
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        sortedByDate.forEach((urun) => {
          const col3 = document.createElement("div");
          col3.classList = "col-3 mb-3";

          const originalPrice = (urun.price / (1 - (urun.discountPercentage / 100))).toFixed(2);

          col3.innerHTML = `
            <div class="border border-1 border-success p-3 rounded-4 position-relative">
              <img class="w-100 rounded-4 yükseklik" src="${urun.images[0]}" alt="">
              <p class="fs-7 mt-2 mb-0">${urun.category}</p>
              <p class="mb-0">${urun.title}</p>
              <div class="star-rating">
                <i class="bi bi-star text-warning fs-7"></i>
                <i class="bi bi-star text-warning fs-7"></i>
                <i class="bi bi-star text-warning fs-7"></i>
                <i class="bi bi-star text-warning fs-7"></i>
                <i class="bi bi-star text-warning fs-7"></i>
              </div>
              <p class="price active fw-bold me-3 d-inline-flex my-0">$${urun.price}</p>
              <del class="text-secondary"><small>$${originalPrice}</small></del>
              <div class="add-to-cart">
                <button type="button" class="btn rounded-circle fs-7" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart">
                  <i class="bi bi-bag-plus"></i>
                </button>
              </div>
            </div>
          `;

          productWrapperRow.append(col3);
        });

        setActiveButton(sonEklenenler);
      });
  });

  oneCikanlar.addEventListener("click", function () {
    fetch('https://dummyjson.com/products?limit=0')
      .then(response => response.json())
      .then((data) => {
        productWrapperRow.innerHTML = "";
        ilgiliUrunleriGetir(data.products, 4.4);
        setActiveButton(oneCikanlar);
      });
  });


//! Timer Yapımı
// Geri sayım için süreyi gün, saat, dakika ve saniye olarak ayarlayın
let countdown = {
  days: 2,
  hours: 22,
  minutes: 57,
  seconds: 24
};

function startCountdown() {
  const daysElement = document.querySelector("#days");
  const hoursElement = document.querySelector("#hours");
  const minutesElement = document.querySelector("#minutes");
  const secondsElement = document.querySelector("#seconds");

  const countdownInterval = setInterval(function () {
      // Saniyeyi bir azalt
      countdown.seconds--;

      // Eğer saniye 0'ın altına düşerse, dakikayı azalt ve saniyeyi 59'a ayarla
      if (countdown.seconds < 0) {
          countdown.seconds = 59;
          countdown.minutes--;
      }

      // Eğer dakika 0'ın altına düşerse, saati azalt ve dakikayı 59'a ayarla
      if (countdown.minutes < 0) {
          countdown.minutes = 59;
          countdown.hours--;
      }

      // Eğer saat 0'ın altına düşerse, günü azalt ve saati 23'e ayarla
      if (countdown.hours < 0) {
          countdown.hours = 23;
          countdown.days--;
      }

      // Gün 0'ın altına düştüyse geri sayımı durdur
      if (countdown.days < 0) {
          clearInterval(countdownInterval);
          alert("Zaman Doldu!"); // Veya başka bir işlem yapabilirsiniz
          return;
      }

      // Güncellenen zamanı HTML öğelerine ekle
      daysElement.innerText = countdown.days.toString().padStart(2, '0');
      hoursElement.innerText = countdown.hours.toString().padStart(2, '0');
      minutesElement.innerText = countdown.minutes.toString().padStart(2, '0');
      secondsElement.innerText = countdown.seconds.toString().padStart(2, '0');
  }, 1000);
}

// Sayfa yüklendiğinde geri sayımı başlat
document.addEventListener("DOMContentLoaded", startCountdown);

