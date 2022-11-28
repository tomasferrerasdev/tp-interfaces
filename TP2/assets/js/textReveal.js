const logoImg = document.getElementById('logo-img')
const subHeader = document.getElementById('subheader')
const line = document.getElementById('line')
const text = document.getElementById('obs-title')
const gameplay_title = document.getElementById('gameplay-title')


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



/*
Funcionalidad requerida
1. El menú Hamburguesa de todas las páginas cuando se despliega se debe transformar las 3 líneas
en una Cruz, utilizando una animación. (no debe cambiar directamente sino via una transición)

2. Los ítems del menú tienen que aparecer desde un costado de la pantalla e ir cargándose uno por
uno

3. Al hacer scroll el Header debe ser sticky y achicarse, de tal manera que además el logo debe
achicarse. En caso de ser necesario cambiar el fondo a un color plano (recomendado)

TODO: 4. En la galería de imágenes listado de juegos, los carruseles deben estar animados al momento de
moverse hacia la izquierda y la derecha. (No es un desplazamiento horizontalmente, no sirve el
scroll común)

5. En la Página de lanzamiento de un juego, en la sección del Hero realizar un background que se
debe mover automáticamente utilizando efecto parallax. El H1 debe reaccionar/disolverse y
volver a aparecer.

6. Al scrollear en la Página de lanzamiento del juego, las “Cards” deben aparecer con una
animación desde afuera de la pantalla y posicionarse en el lugar final tal cual el diseño original.
Tener en cuenta que es on-scroll.

TODO: 7. En la Página de lanzamiento de un juego, en la sección de “historia del juego” se debe tener 2
columnas en la cual la parte izquierda es una imagen y sobre la derecha está el texto descriptivo.
A modo de ejemplo ver en https://growproexperience.com/ (Te acompañamos en tu viaje de
principio a fin).

TODO: 8. En la Página de lanzamiento de un juego, animar utilizando un spritesheet un personaje del
juego en lanzamiento.

9. En la Página de lanzamiento de un juego, en la sección de personajes y habilidades debe tener
una separación entre el título y nombres de personajes que a medida que se scrollea se acercan
hasta quedar en su posición final. (Ejemplo en https://the-goonies.webflow.io/ final de la pagina
donde esta el back to top)
*/