import { gameData } from "../JavaScript/script.js";
import { colors } from "../Constants/Colors.js";


class App {
    constructor(){
        this.element = document.querySelector('#gameContainer'),
        this.start()
    }
    start(){
        const gContainerWidth  = Math.floor(window.innerWidth * 0.65 > 1500 ? 1500 : window.innerWidth * 0.65)
        const gcontainerHeight  = window.innerHeight * 0.7

        this.element.classList.add('active')

        console.log(this.element)
        this.element.style.width = `${gContainerWidth}px`
        this.element.style.height = `${gcontainerHeight}px`
    }
}

export{
    App
}