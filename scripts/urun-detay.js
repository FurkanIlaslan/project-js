const urlParams = new URLSearchParams(window.location.search);
const urunId = urlParams.get("id");

console.log(urunId);

const urunDetayRow = document.querySelector(".urun-detay-row");
// İlgili Ürünün Detayı İçin İstek atıyoruz
const url = `https://dummyjson.com/products/${urunId}`;

fetch(url)
.then(response=>response.json())
.then((data)=>{
    console.log(data);

    const categoryName = data.category[0].toUpperCase() + data.category.slice(1).toLowerCase();

    urunDetayRow.innerHTML = `
        <div class="col-5 border border-1 p-2">
            <img class="w-100" src="${data.images[0]}" alt="">
        </div>
        <div class="col-7">
            <h2 class="active fw-bold">${data.title}</h2>
            <img width="50px" src="${data.meta.qrCode}" alt="">
            <span>${data.meta.barcode}</span>
            <p class="active">${categoryName}</p>
            <p>${data.description}</p>
            <p>$${data.price}</p>
            <p>Rating : ${data.rating}</p>
            <p>Stok Durumu : ${data.stock} adet / ${data.availabilityStatus}</p>
        </div>
    `

    // ! Yorumlar İçin;
    const yorumTamami = document.querySelector(".yorumlar-tamami");

    const yorumlar = data.reviews;
    console.log(yorumlar);
    yorumlar.forEach((yorum) => {
        const date = new Date(yorum.date);
        const commentDate = date.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    
        // Yıldızların oluşturulması
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= yorum.rating) {
                starsHTML += '<i class="bi bi-star-fill"></i>'; // Dolu yıldız
            } else {
                starsHTML += '<i class="bi bi-star"></i>'; // Boş yıldız
            }
        }
    
        yorumTamami.innerHTML += `
            <div class="yorum-kapsayici mt-2 border border-1 rounded-2 p-3 sidebar-bg-color">
                <div class="kullanici-info">
                    <img width="50px" height="50px" class="rounded-circle" src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21pbGluZyUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" alt="">
                    <p class="m-0 mt-2 active fw-bold d-inline-flex">${yorum.reviewerName}</p>
                    <p class="float-end">${commentDate}</p>
                    <div class="yildizlar mt-2">
                        ${starsHTML}
                    </div>
                    <hr class="w-100 m-0 mt-2">
                </div>
                <div class="yorum mt-3">
                    <p>${yorum.comment}</p>
                </div>
            </div>
        `;
    });
    

})