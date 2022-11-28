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



