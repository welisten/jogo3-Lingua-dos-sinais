import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";

class Words {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#gameContainer')

        this.element.classList.add('wd')
        this.game.resetContainerToNewScene()
        this.start()
    }
    start(){
       this.buildContainer()
    }

    buildContainer(){
        this.game.buildBg()
    }
    getImage(key){
        return gameAssets[key]
    }
    
}

export{
    Words
}