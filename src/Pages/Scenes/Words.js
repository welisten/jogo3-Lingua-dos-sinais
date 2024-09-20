import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";

class Words {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#game_Container')
        
        document.title = 'Aprendendo Palavras!'
        gameData.mainScene = 'Words'

        this.game.resetContainerToNewScene('wd')
        this.start()
    }
    start(){
        this.buildContainer()
        this.game.playAudio(gameAssets['nature_ambience'], 1, true)
        this.setContainerElement()
    }

    buildContainer(){
        this.game.buildBg()

        
    }
    
    setContainerElement(){

    }
    setCloseBtn(){
        const closeBtn = document.querySelector('.vpw-header-btn-close')
        const access = document.querySelector('.access')

        if(!closeBtn){
            this.game.popUpMessage('O botão de fechar não foi encontrado !')
            console.error('O botão de fechar não foi encontrado !')
        }
        else {
            closeBtn.addEventListener('click', () => {
                access.style.display = 'none'
            } )
        }
    }
    readWithAccessibility(){
        const accessibleTextContainer = document.querySelector('#userText')
        
        const mouseOverEvent = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: false,
            view: window
        })
        const mouseOutEvent = new MouseEvent('mouseout', {
            bubbles: true,
            cancelable: false,
            view: window
        })
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: false,
            view: window
        })

        accessibleTextContainer.dispatchEvent(mouseOverEvent)
        setTimeout(() => accessibleTextContainer.dispatchEvent(clickEvent), 200)
        accessibleTextContainer.dispatchEvent(mouseOutEvent)
    }
    
    getImage(key){
        return gameAssets[key]
    }
    
}

export{
    Words
}