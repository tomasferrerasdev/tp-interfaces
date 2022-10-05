// MENU
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));

// PROGRESS BAR

const progressBar = document.getElementById('progress-bar');
const loaderContainer = document.getElementById('loader-container');

setInterval(() => {
  const computedStyle = getComputedStyle(progressBar);
  const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
  progressBar.style.setProperty('--width', width + 0.1);
  if (width === 100) {
    loaderContainer.classList.add('remove');
  }
}, 4);

const slider = document.querySelector('.slider-inner');

slider.parentElement.addEventListener('scroll', (e) => {
  progressBar.style.width = `${getScrollPercentage()}%`;
});

slider.addEventListener('mousedown', (e) => {
  sliderGrabbed = true;
  slider.style.cursor = 'grabbing';
});

slider.addEventListener('mouseup', (e) => {
  sliderGrabbed = false;
  slider.style.cursor = 'grab';
});

slider.addEventListener('mouseleave', (e) => {
  sliderGrabbed = false;
});

slider.addEventListener('mousemove', (e) => {
  if (sliderGrabbed) {
    slider.parentElement.scrollLeft -= e.movementX;
  }
});

slider.addEventListener('wheel', (e) => {
  e.preventDefault();
  slider.parentElement.scrollLeft += e.deltaY;
});

function getScrollPercentage() {
  return (
    (slider.parentElement.scrollLeft /
      (slider.parentElement.scrollWidth - slider.parentElement.clientWidth)) *
    100
  );
}
