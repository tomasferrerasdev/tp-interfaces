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