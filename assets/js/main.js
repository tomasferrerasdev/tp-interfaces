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

const slider = document.querySelectorAll('.slider-move');

let sliderGrabbed = false;



slider.forEach(element => {
  element.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    element.style.cursor = 'grabbing';
  });
  
});

slider.forEach(element => {
  element.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    element.style.cursor = 'grab';
  });
});

slider.forEach(element => {
  element.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
  }); 
});

slider.forEach(element => {
  element.addEventListener('mousemove', (e) => {
    if (sliderGrabbed) {
      element.parentElement.scrollLeft -= e.movementX;
    }
  });
});

slider.forEach(element => {
  element.addEventListener('wheel', (e) => {
    e.preventDefault();
    element.parentElement.scrollLeft += e.deltaY;
  });
});

// function getScrollPercentage() {
//   return (
//     (slider.parentElement.scrollLeft /
//       (slider.parentElement.scrollWidth - slider.parentElement.clientWidth)) *
//     100
//   );
// }
