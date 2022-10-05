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


// let slideIndex = 1;
// showSlides(slideIndex);
// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }
// function showSlides(n) {
//     var i;
//     var slides = document.getElementsByClassName("mySlides");
//     if (n > slides.length) {slideIndex = 1}
//     if (n < 1) {slideIndex = slides.length}
//     for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//     }
//     slides[slideIndex-1].style.display = "block";
// }

// let smallSlideIndex = 1;


// function plusSmallSlides(n, v) {
//   showSmallSlides(smallSlideIndex += n, v)
// }

// function showSmallSlides(n , v) {
//   let i;
//   let slides = document.getElementsByClassName("mySmallSlides");
//   if (n > slides.length) {smallSlideIndex = 1}
//   if (n < 1) {smallSlideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   if(v == 'dekstop'){
//     slides[smallSlideIndex-1].style.display = "block";
//     slides[smallSlideIndex].style.display = "block";
//     slides[smallSlideIndex+1].style.display = "block";
//   }else{
//     slides[smallSlideIndex-1].style.display = "block";
//   }
// }


// const containerS = document.querySelector('.slideshow-smallContainer');
// const cardsS = document.querySelector('.freeGames-Carousel');

// /* keep track of user's mouse down and up */
// let isPressedDownS = false;
// /* x horizontal space of cursor from inner container */
// let cursorXSpaceS;

// containerS.addEventListener('mousedown', (e) => {
//   console.log('CHOTA ABAJO')
//   isPressedDownS = true;
//   cursorXSpaceS = e.offsetX - cardsS.offsetLeft;
//   containerS.style.cursor = 'grabbing';
// });

// containerS.addEventListener('mouseup', () => {
//   console.log('CHOTA ARRIBA')
//   containerS.style.cursor = 'grab';
// });

// window.addEventListener('mouseup', () => {
//   isPressedDownS = false;
// });

// containerS.addEventListener('mousemove', (e) => {
//   if (!isPressedDownS) return;
//   e.preventDefault();
//   cardsS.style.left = `${e.offsetX - cursorXSpaceS}px`;
//   boundCardsS();
// });

// function boundCardsS() {
//   const container_rect = containerS.getBoundingClientRect();
//   const cards_rect = cardsS.getBoundingClientRect();

//   if (parseInt(cardsS.style.left) > 0) {
//     cardsS.style.left = 0;
//   } else if (cards_rect.right < container_rect.right) {
//     cardsS.style.left = `-${cards_rect.width - container_rect.width}px`;
//   }
// }


const container = document.querySelectorAll('.cards');
const cards = document.querySelectorAll('.c');

/* keep track of user's mouse down and up */
let isPressedDown = false;
/* x horizontal space of cursor from inner container */
let cursorXSpace;

container.forEach(c=> {c.addEventListener('mousedown', (e) => {
  console.log('CHOTA ABAJO')
  isPressedDown = true;
  c.style.cursor = 'grabbing';
})})

container.forEach(c =>{ c.addEventListener('mouseup', () => {
  console.log('CHOTA ARRIBA')
  c.style.cursor = 'grab';
  isPressedDown = false;
})});

container.forEach(c =>{ c.addEventListener('mouseleave', () => {
  console.log('CHOTA ARRIBA')
  c.style.cursor = 'grab';
  isPressedDown = false;
})});


container.forEach(element=>{
  element.addEventListener("mousemove", (e)=>{
     if(isPressedDown){
      console.log("PUTO")
      element.parentElement.scrollLeft -= e.movementX;
     }
  })
})


// container.forEach(elment => {c.addEventListener('mousemove', (e) => {
//   if (isPressedDown){
//     console.log("PUTO")
//     c.parentElement.scrollLeft -= e.movementX;
  
//   }
//   // boundCards();
// })})


// function boundCards() {
//   const container_rect = container.getBoundingClientRect();
//   const cards_rect = cards.getBoundingClientRect();

//   if (parseInt(cards.style.left) > 0) {
//     cards.style.left = 0;
//   } else if (cards_rect.right < container_rect.right) {
//     cards.style.left = `-${cards_rect.width - container_rect.width}px`;
//   }
// }




