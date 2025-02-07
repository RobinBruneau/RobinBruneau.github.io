const enlargedImage = document.querySelector('#enlarged-image');

document.querySelectorAll('.selectable-image').forEach(img => {
  img.addEventListener('mouseleave', function() {
    enlargedImage.style.opacity = 0;
  });
  img.addEventListener('touchend', function() {
    enlargedImage.style.opacity = 0;
  });
});