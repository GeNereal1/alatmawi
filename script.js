document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');

  // إنشاء عداد الصور
  const counter = document.createElement('div');
  counter.id = "counter";
  counter.className = "counter";
  if (slider && slider.parentNode) {
    slider.parentNode.appendChild(counter);
  }

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
    if (counter) {
      counter.textContent = `${currentSlide + 1} / ${slides.length}`;
    }
  }

  // السحب باللمس أو الماوس
  let startX = 0;
  let isDragging = false;

  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
    });

    slider.addEventListener('touchend', (e) => {
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
