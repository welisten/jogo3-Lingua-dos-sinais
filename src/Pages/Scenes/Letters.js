import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";

class Letters {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#gameContainer')
        // this.game.resetContainerToNewScene()
        
        this.provisorySetContainer()
    }










    provisorySetContainer(){
        let ruleW , gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        
        ruleW = window.innerWidth > 2000 ? window.innerWidth * 0.40 : window.innerWidth > 1500 ? window.innerWidth * 0.65 : window.innerWidth * 0.55
        gContainerWidth  = Math.floor(ruleW)
        gcontainerHeight  = window.innerHeight * .7 

        this.element.style.width = `${gContainerWidth}px`
        this.element.style.height = `${gcontainerHeight}px`
    }
}

export{
    Letters
}