const noBtn = document.getElementById('noBtn');

if (noBtn) {
  noBtn.style.position = 'absolute';
  noBtn.style.transition = 'all 0.6s ease';

  noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 80);
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
  });
}
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (3 + Math.random() * 5) + 's';
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 400);