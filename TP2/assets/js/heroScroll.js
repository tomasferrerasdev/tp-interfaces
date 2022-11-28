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

