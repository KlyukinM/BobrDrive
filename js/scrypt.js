
const body = document.querySelector('body')
const header = document.querySelector('header')
const wrapper = document.querySelector('.wrapper')

const lowMenuContainer = document.querySelector('.low__menu__container')

const premiumButton = document.querySelector('.premium__button')
const comfortButton = document.querySelector('.comfort__button')
const economButton = document.querySelector('.econom__button')

const leftArrowContainer = document.querySelector('.left__arrow__container')
const rightArrowContainer = document.querySelector('.right__arrow__container')

const leftArrow = document.querySelector('.left__arrow__body')
const rightArrow = document.querySelector('.right__arrow__body')

const carsButton = document.querySelector('.cars__button')
const tariffsButton = document.querySelector('.tariffs__button')
const loyalityButton = document.querySelector('.loyality__button')

// Обработка события для нижнего меню

if (premiumButton) {
    premiumButton.addEventListener('click', clickPremium)
}

if (comfortButton) {
    comfortButton.addEventListener('click', clickComfort)
}

if (economButton) {
    economButton.addEventListener('click', clickEconom)
}

function clickPremium () {
    if (body.classList.contains('comfort')) {
        body.classList.remove('comfort') 
        body.classList.add('premium')
    } else if (body.classList.contains('econom')) {
        body.classList.remove('econom')
        body.classList.add('premium')
    }
}

function clickComfort () {
    if (body.classList.contains('econom')) {
        body.classList.remove('econom')
        body.classList.add('comfort')
    } else if (body.classList.contains('premium')) {
        body.classList.remove('premium')
        body.classList.add('comfort')
    }
}

function clickEconom () {
    if (body.classList.contains('comfort')) {
        body.classList.remove('comfort')
        body.classList.add('econom')
    } else if (body.classList.contains('premium')){
        body.classList.remove('premium')
        body.classList.add('econom')
    }
}

// Обработка событий для стрелок

if (leftArrow) {
    leftArrow.addEventListener('click', leftArrowClick)
}

function leftArrowClick () {
    if (body.classList.contains('premium')) {
        clickEconom ()
    } else if (body.classList.contains('econom')) {
        clickComfort ()
    } else if (body.classList.contains('comfort')) {
        clickPremium ()
    }
}

if (rightArrow) {
    rightArrow.addEventListener('click', rightArrowClick)
}

function rightArrowClick () {
    if (body.classList.contains('premium')) {
        clickComfort ()
    } else if (body.classList.contains('econom')) {
        clickPremium ()
    } else if (body.classList.contains('comfort')) {
        clickEconom ()
    }
}

// Обработка событий для верхнего меню

if (carsButton) {
    carsButton.addEventListener('click', carsButtonClick)
}

function carsButtonClick () {
    if (header.classList.contains('tariffs') && wrapper.classList.contains('tariffs')) {
        header.classList.remove('tariffs')
        header.classList.add('cars')
        wrapper.classList.remove('tariffs')
        wrapper.classList.add('cars')
    } else if (header.classList.contains('loyality') && wrapper.classList.contains('loyality')) {
        header.classList.remove('loyality')
        header.classList.add('cars')
        wrapper.classList.remove('loyality')
        wrapper.classList.add('cars')
        arrowsAndLowMenuActivation()
    }
}

if (tariffsButton) {
    tariffsButton.addEventListener('click', tariffsButtonClick)
}

function tariffsButtonClick () {
    if (header.classList.contains('cars') && wrapper.classList.contains('cars')) {
        header.classList.remove('cars')
        header.classList.add('tariffs')
        wrapper.classList.remove('cars')
        wrapper.classList.add('tariffs')
    } else if (header.classList.contains('loyality') && wrapper.classList.contains('loyality')) {
        header.classList.remove('loyality')
        header.classList.add('tariffs')
        wrapper.classList.remove('loyality')
        wrapper.classList.add('tariffs')
        arrowsAndLowMenuActivation()
    }
}

if (loyalityButton) {
    loyalityButton.addEventListener('click', loyalityButtonClick)
}

function loyalityButtonClick () {
    if (header.classList.contains('cars') && wrapper.classList.contains('cars')) {
        header.classList.remove('cars')
        header.classList.add('loyality')
        wrapper.classList.remove('cars')
        wrapper.classList.add('loyality')
        arrowsAndLowMenuDeactivation()
    } else if (header.classList.contains('tariffs') && wrapper.classList.contains('tariffs')) {
        header.classList.remove('tariffs')
        header.classList.add('loyality')
        wrapper.classList.remove('tariffs')
        wrapper.classList.add('loyality')
        arrowsAndLowMenuDeactivation()
    }
}

// Скрытие и показ стрелок и нижнего меню

function arrowsAndLowMenuDeactivation () {    
    if (lowMenuContainer) {
        lowMenuContainer.classList.add('hidden')
    }
    if (leftArrowContainer) {
        leftArrowContainer.classList.add('hidden')
    }
    if (rightArrowContainer) {
        rightArrowContainer.classList.add('hidden')
    }
}

function arrowsAndLowMenuActivation () {
    if (lowMenuContainer) {
        lowMenuContainer.classList.remove('hidden')
    }
    if (leftArrowContainer) {
        leftArrowContainer.classList.remove('hidden')
    }
    if (rightArrowContainer) {
        rightArrowContainer.classList.remove('hidden')
    }
}

// Обрабатываем свайпы на телефоне

// Вешаем на прикосновение функцию handleTouchStart
document.addEventListener('touchstart', handleTouchStart, false);  
// А на движение пальцем по экрану - handleTouchMove      
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            leftArrowClick ()
        } else {
            rightArrowClick ()
        }                       
    } else { // Это вам, в общем-то, не надо, вы ведь только влево-вправо собираетесь двигать
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};