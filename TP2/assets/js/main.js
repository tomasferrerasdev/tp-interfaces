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

const slider = document.querySelectorAll('.slider-move');

let sliderGrabbed = false;

slider.forEach((element) => {
  element.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    element.style.cursor = 'grabbing';
  });
});

slider.forEach((element) => {
  element.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    element.style.cursor = 'grab';
  });
});

slider.forEach((element) => {
  element.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
  });
});

slider.forEach((element) => {
  element.addEventListener('mousemove', (e) => {
    if (sliderGrabbed) {
      element.parentElement.scrollLeft -= e.movementX;
    }
  });
});

slider.forEach((element) => {
  element.addEventListener('wheel', (e) => {
    e.preventDefault();
    element.parentElement.scrollLeft += e.deltaY;
  });
});

const body = document.getElementById('body');
const loader = document.getElementById('loader');

body.style.overflow = 'hidden';
setTimeout(() => {
  body.style.overflow = 'visible';
  loader.style.display = 'none';
}, 5000);

// function getScrollPercentage() {
//   return (
//     (slider.parentElement.scrollLeft /
//       (slider.parentElement.scrollWidth - slider.parentElement.clientWidth)) *
//     100
//   );
// }

let elementsArray = document.querySelectorAll(".character-card");
let subhero = document.getElementById('subhero')

window.addEventListener('scroll', fadeIn); 
function fadeIn() {
    for (let i = 0; i < elementsArray.length; i++) {
        let elem = elementsArray[i]
        let distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
        if (distInView < 0) {
            elem.style.opacity = '1'
            elem.style.transform = 'translateY(0px)'
            elem.style.transition = `${i + 0.5}s`
        } else {
            elem.classList.remove("inView");
        }
    }
}
fadeIn();


const menuButton = document.querySelector('.menu-btn')
const navMenu = document.getElementById('nav-menu')
const nav = document.getElementById('nav')
const logo = document.getElementById('nav-logo')
const avatarImage = document.getElementById('avatar-img')
let isMenuOpen = false


menuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen
    if(isMenuOpen) {
        menuButton.classList.add('open')
        navMenu.classList.add('show-menu')
    } else {
        menuButton.classList.remove('open')
        navMenu.classList.remove('show-menu')
    }
})

window.addEventListener('scroll', () => {
    let windowY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

    if(windowY > 99) {
        nav.style.height = "3rem"
        logo.style.width = "90px"
        logo.style.height = "10px"
        avatarImage.style.height = "30px"
        avatarImage.style.width = "30px"
    }

    if(windowY < 10) {
        nav.style.height = "3.5rem"
        logo.style.width = "113px"
        logo.style.height = "13px"
        avatarImage.style.height = "40px"
        avatarImage.style.width = "40px"
    }

})

document.addEventListener("DOMContentLoaded", ()=> {
    listenScroll();
})

function listenScroll() {
    const bg = document.getElementById('zoom')
    const fade = document.getElementById('fade')
    const bush = document.getElementById('bush')

    document.addEventListener('scroll', () => {
        let lastKnownScrollPosition = window.scrollY;
        let zoom = 1 + lastKnownScrollPosition * 0.002;
        let backgroundZoom = 1 + lastKnownScrollPosition * 0.0001;
        let opacity = lastKnownScrollPosition * 0.0007

        bush.style.transform = (`scale(${zoom})`)
        bg.style.transform = (`scale(${backgroundZoom}`)
        fade.style.opacity = (`${opacity}`)
        bush.style.zIndex = -99
    })
}

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

let cardArray = document.querySelectorAll(".feature-card");

console.log(cardArray)

window.addEventListener('scroll', fadeIn); 
function fadeIn() {
    for (let i = 0; i < cardArray.length; i++) {
        let elem = cardArray[i]
        let distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
        if (distInView < 0) {
            elem.style.opacity = '1'
            elem.style.transform = 'translateY(0px)'
            elem.style.transition = `${i + 0.5}s`
        } else {
            elem.classList.remove("inView");
        }
    }
}
fadeIn();

const logoImg = document.getElementById('logo-img')
const subHeader = document.getElementById('subheader')
const line = document.getElementById('line')
const text = document.getElementById('obs-title')
const gameplay_title = document.getElementById('gameplay-title')
const feature_card = document.getElementById('gameplay-title')



const dataLoad = (entradas) => {
    entradas.forEach((entrada) => {
        if(entrada.isIntersecting) {
            entrada.target.classList.add('visible')
        } else {
            entrada.target.classList.remove('visible')
        }
    });
}

const observer = new IntersectionObserver(dataLoad, {
    root: null,
    rootMargin: '100px',
    threshold: .8
})

observer.observe(logoImg)
observer.observe(subHeader)
observer.observe(text)
observer.observe(line)
observer.observe(gameplay_title)
