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

  function handleSwipe(startX, endX) {
    if (startX - endX > 50) {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    } else if (endX - startX > 50) {
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
      currentSlide = (currentSlide - 1 + slides.length);
      showSlide(currentSlide);
    }
  });

  // Lightbox لعرض الصورة مكبرة
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  document.body.appendChild(lightbox);

  const img = document.createElement('img');
  lightbox.appendChild(img);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.innerHTML = '❌';
  lightbox.appendChild(closeBtn);

  slides.forEach(image => {
    image.addEventListener('click', () => {
      img.src = image.src;
      lightbox.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  showSlide(currentSlide);
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
