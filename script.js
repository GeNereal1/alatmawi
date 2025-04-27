document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // إنشاء عداد الصور
  const counter = document.createElement('div');
  counter.id = "counter";
  counter.className = "counter";
  prevBtn.parentNode.appendChild(counter);

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

  nextBtn.addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  showSlide(currentSlide);
});
