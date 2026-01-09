// Swiper
new Swiper('.heroSwiper', {
  pagination: { el: '.swiper-pagination' },
  autoplay: { delay: 4000 }
});

new Swiper('.productSwiper', {
  slidesPerView: 1.2,
  spaceBetween: 16,
  breakpoints: {
    768: { slidesPerView: 3 }
  }
});

// 제품
const loadProducts = async () => {
  const { data } = await supabaseClient
    .from('products')
    .select('*')
    .eq('is_deleted', false)
    .limit(10);

  const wrap = document.getElementById('productList');
  data.forEach(p => {
    wrap.innerHTML += `
      <div class="swiper-slide">
        <div class="card">
          <img src="${p.image_url}" style="width:100%">
          <h4>${p.title}</h4>
        </div>
      </div>`;
  });
};

loadProducts();
