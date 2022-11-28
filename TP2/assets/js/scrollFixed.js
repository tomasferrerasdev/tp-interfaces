const items = Array.from(document.querySelectorAll('section div'));
const imgs = document.querySelectorAll('aside img');

function detectIntersection(entries) {
  for (let e of entries) {
    let i = items.indexOf(e.target);
    if (e.isIntersecting) {
      requestAnimationFrame(ts => {
        e.target.classList.add('visible');
        imgs[i].classList.add('visible');
      });
    } else {
      e.target.classList.remove('visible');
      imgs[i].classList.remove('visible');
    }
  }
}

const options = {
  threshold: 0.6
};

const observer2 = new IntersectionObserver(
  detectIntersection, options
);

items.forEach(i => observer2.observe(i));