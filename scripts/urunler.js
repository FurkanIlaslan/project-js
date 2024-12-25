document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get("category");
  const productWrapperRow = document.querySelector(".product-wrapper-row");
  
  let currentPage = 1;
  const itemsPerPage = 16;

  const updateUrl = () => {
    let baseUrl = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
    if (categoryName) {
      baseUrl = `https://dummyjson.com/products/category/${categoryName}?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
    }
    return baseUrl;
  };

  const fetchAndDisplayProducts = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        productWrapperRow.innerHTML = "";
        urunleriGetir(data.products);
      });
  };

  const urunleriGetir = (data) => {
    data.forEach((urun) => {
      const col3 = document.createElement("div");
      col3.classList = "col-3 mb-3";
      col3.id = urun.id;

      col3.addEventListener("click", function () {
        window.location.href = `urun-detay.html?id=${urun.id}`;
      });

      const originalPrice = (urun.price / (1 - urun.discountPercentage / 100)).toFixed(2);

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

      // ! Sepete ekleme işlemleri için;
      const addToCart = col3.querySelector(".add-to-cart");
      // console.log(addToCart);

      addToCart.addEventListener("click", function (event) {
        event.stopPropagation(); // Tıklamanın parent elementlere yayılmasını engeller
        const adet = document.querySelector(".adet");
        adet.innerHTML++;

        const urunBilgileri = event.target.parentElement.parentElement.parentElement.children;
        console.log(urunBilgileri);

        const urunImage = urunBilgileri[0].src;
        const urunIsim = urunBilgileri[2].innerHTML;
        const urunFiyat = urunBilgileri[4].innerHTML.slice(1);
        // console.log(urunImage)
        // console.log(urunIsim)
        // console.log(urunFiyat)

        sepeteEkle(urunImage,urunIsim,urunFiyat);

      });
    });
  };


  const sepeteEkle = (urunImage, urunIsim, urunFiyat) => {
    const sepetListesi = document.querySelector(".sepet-listesi");
    const sepetToplamiEl = document.querySelector(".sepet-toplami");
    const kargoUcreti = 300;
  
    const li = document.createElement("li");
    li.classList = "list-unstyled mb-2";
  
    li.innerHTML = `
      <div class="row">
        <div class="col-2 d-flex align-items-center justify-content-center">
          <img class="w-100" src="${urunImage}" alt="">
        </div>
        <div class="col-3 d-flex align-items-center justify-content-center">
          <p class="mb-0">${urunIsim}</p>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
          <div class="butonlar">
            <button class="azalt btn btn-danger">-</button>
            <span class="adet">1</span>
            <button class="arttir btn btn-success">+</button>
          </div>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
          <div class="fiyat">$${urunFiyat}</div>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
          <div class="tekilToplam">$${urunFiyat}</div>
        </div>
        <div class="col-1 d-flex align-items-center justify-content-center">
          <i class="bi bi-x-circle fs-3 cursor remove-item"></i>
        </div>
      </div>
    `;
  
    sepetListesi.append(li);
  
    // Arttır ve azalt işlemleri için butonlar ve adet alanını seç
    const arttir = li.querySelector(".arttir");
    const azalt = li.querySelector(".azalt");
    const adet = li.querySelector(".adet");
    const tekilToplam = li.querySelector(".tekilToplam");
  
    const updateTekilToplam = () => {
      const adetSayisi = parseInt(adet.innerHTML);
      tekilToplam.innerHTML = `$${(adetSayisi * urunFiyat).toFixed(2)}`;
      updateSepetToplami();
    };
  
    arttir.addEventListener("click", function () {
      adet.innerHTML = parseInt(adet.innerHTML) + 1;
      updateTekilToplam();
    });
  
    azalt.addEventListener("click", function () {
      const adetSayisi = parseInt(adet.innerHTML);
      if (adetSayisi > 1) {
        adet.innerHTML = adetSayisi - 1;
        updateTekilToplam();
      }
    });
  
    // Çarpı butonuna tıklandığında ürünü kaldırma işlemi
    const removeItemButton = li.querySelector(".remove-item");
    removeItemButton.addEventListener("click", function () {
      li.remove(); // Ürünü DOM'dan kaldır
      updateSepetToplami(); // Toplamı güncelle
      const adet = document.querySelector(".adet");
      if(adet.innerHTML >0){
        adet.innerHTML--;
      }
    });
  
    // Sepet toplamını güncelleyen fonksiyon
    const updateSepetToplami = () => {
      const toplamFiyatlar = document.querySelectorAll(".tekilToplam");
      let toplam = 0;
  
      toplamFiyatlar.forEach((fiyat) => {
        toplam += parseFloat(fiyat.innerHTML.replace("$", ""));
      });
  
      const sepetToplamiEl = document.querySelector(".sepet-toplami");
      const odenecekTutarEl = document.querySelector(".odenecek-tutar");
  
      sepetToplamiEl.innerHTML = `$${toplam.toFixed(2)}`;
      odenecekTutarEl.innerHTML = `$${(toplam + kargoUcreti).toFixed(2)}`;
    };
  
    // İlk kez ürün eklendiğinde toplamı güncelle
    updateTekilToplam();
  };
  
  
  // Initial product load
  fetchAndDisplayProducts(updateUrl());

  // Pagination controls
  const prevButton = document.querySelector("#prevButton");
  const nextButton = document.querySelector("#nextButton");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndDisplayProducts(updateUrl());
    }
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    fetchAndDisplayProducts(updateUrl());
  });

  // Sidebar category filter
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      currentPage = 1; // Reset to the first page for new category
      const itemName = item.innerHTML;
      fetchAndDisplayProducts(`https://dummyjson.com/products/category/${itemName}?limit=${itemsPerPage}&skip=0`);
    });
  });

  // Search functionality
  const searchInput = document.querySelector("#searchInput");
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value;
    currentPage = 1; // Reset to first page for search
    fetchAndDisplayProducts(`https://dummyjson.com/products/search?q=${searchTerm}&limit=${itemsPerPage}&skip=0`);
  });
});
