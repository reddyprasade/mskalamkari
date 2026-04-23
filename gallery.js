const initGallery = (images, options = {}) => {
  if (!Array.isArray(images) || images.length === 0) {
    return;
  }

  const slideImage = document.getElementById("slideImage");
  const caption = document.getElementById("caption");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!slideImage || !caption || !prevBtn || !nextBtn) {
    return;
  }

  const interval = Number(options.interval) > 0 ? Number(options.interval) : 3500;
  const altText = options.altText || "Gallery image";

  let index = 0;
  let autoSlideId = null;

  const render = () => {
    slideImage.src = images[index];
    slideImage.alt = altText;
    caption.textContent = `${index + 1} / ${images.length}`;
  };

  const next = () => {
    index = (index + 1) % images.length;
    render();
  };

  const prev = () => {
    index = (index - 1 + images.length) % images.length;
    render();
  };

  const restartAutoSlide = () => {
    if (autoSlideId) {
      clearInterval(autoSlideId);
    }
    autoSlideId = setInterval(next, interval);
  };

  nextBtn.addEventListener("click", () => {
    next();
    restartAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prev();
    restartAutoSlide();
  });

  render();
  restartAutoSlide();
};
