document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');

  // إنشاء عداد الصور
  const counter = document.createElement('div');
  counter.id = "counter";
  counter.className = "counter";
  document.body.appendChild(counter);

  // تحديث العداد
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
    updateCounter();
  }

  function updateCounter() {
    counter.textContent = `${currentSlide + 1} / ${slides.length}`;
  }

  // السحب باللمس أو الماوس
  let startX = 0;
  let isDragging = false;

  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      handleSwipe(startX, endX);
    });

    slider.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
    });

    slider.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.clientX;
      handleSwipe(startX, endX);
    });
  }

  // التعامل مع السحب (Swipe)
  function handleSwipe(startX, endX) {
    if (startX - endX > 50) {
      // سحب لليسار ➔ صورة تالية
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    } else if (endX - startX > 50) {
      // سحب لليمين ➔ صورة سابقة
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  }

  // التنقل عبر الأسهم بالكيبورد
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    } else if (e.key === 'ArrowLeft') {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  });

  // عرض أول شريحة عند التحميل
  showSlide(currentSlide);
});
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('.slide');
  
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  document.body.appendChild(lightbox);

  const img = document.createElement('img');
  lightbox.appendChild(img);

  // إنشاء زر الإغلاق
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '❌';
  lightbox.appendChild(closeBtn);

  images.forEach(image => {
    image.addEventListener('click', () => {
      img.src = image.src;  // تغيير المصدر
      lightbox.style.display = 'flex'; // إظهار نافذة Lightbox
    });
  });

  // إغلاق الـ Lightbox
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none'; // إخفاء نافذة Lightbox
  });

  // إغلاق الـ Lightbox عند الضغط على الخلفية
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
});
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // إنشاء زر للتثبيت
  const installBtn = document.createElement('button');
  installBtn.textContent = '📲 تثبيت التطبيق';
  installBtn.className = 'install-btn';
  document.body.appendChild(installBtn);

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('تم تثبيت التطبيق بنجاح');
      } else {
        console.log('تم إلغاء تثبيت التطبيق');
      }
      deferredPrompt = null;
    });
  });
});

