import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";

class Letters {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#gameContainer')

        this.game.resetContainerToNewScene()
    }

    
}

export{
    Letters
}