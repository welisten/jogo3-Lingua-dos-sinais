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

                                // main container
        const wd_bg = this.game.createNewElement('div', 'bg wd')
        const mainContainer = this.game.createNewElement('div', 'wd_main container')
        
        const wd_main_cardContainer = this.game.createNewElement('div', 'wd_main_cardContainer container')
        
        const imgCardContainer = this.game.createNewElement('div', 'imgCard card container')
        const img = this.getImage('ddd')
        console.log(img)
        img.setAttribute('alt', 'Dedo de Deus')

        const vLibrasCardContainer =this.game.createNewElement('div', 'vLibrasCard card')
        const access = document.querySelector('.access')
        const vwBtn = document.querySelector('[vw-access-button]')

        
        vLibrasCardContainer.appendChild(access)
        imgCardContainer.appendChild(img)
        wd_main_cardContainer.append(imgCardContainer, vLibrasCardContainer)
        mainContainer.appendChild(wd_main_cardContainer)
        this.element.append(wd_bg, mainContainer)

        vwBtn.click()
        if(!gameData.wereVLibrasActived) {
            setTimeout(() => this.setCloseBtn(), 10000);
            gameData.wereVLibrasActived = true
        }
        access.style.display = 'block'

        const wd_main_middleBar = this.game.createNewElement('div', 'wd_main_middleBar container')
        const prevBtn = this.game.createNewElement('button', 'prevBtn wd_btn', 'prevBtn' )
        const iprev = this.game.createNewElement('i', 'fa-solid fa-arrow-left' )
        const imgTitle = this.game.createNewElement('div', 'imgTitle container')
        const pTitle = this.game.createNewElement('p', 'p_title')
        pTitle.innerHTML = 'dedo de deus'
        const nextBtn = this.game.createNewElement('button', 'nextBtn wd_btn', 'nextBtn' )
        const inext = this.game.createNewElement('i', 'fa-solid fa-arrow-right' )

        prevBtn.appendChild(iprev)
        imgTitle.appendChild(pTitle)
        nextBtn.appendChild(inext)
        wd_main_middleBar.append(prevBtn, imgTitle, nextBtn)
        mainContainer.appendChild(wd_main_middleBar)

                                // footer container

        const footerContainer = this.game.createNewElement('div', 'wd_footer container')
        const imgDescription = this.game.createNewElement('div', 'imgDescription')
        const p_imgDescri = this.game.createNewElement('p', 'p_imgDescri')
        p_imgDescri.innerHTML = `<strong>Descrição:</strong>  Montanha famosa em Guapimirim com formato de uma mão apontando para o céu.<br><strong>Gesto:</strong>  Use uma mão para fazer o gesto de uma mão aberta, e levante o dedo indicador, apontando para cima, representando o formato da montanha.`
        imgDescription.appendChild(p_imgDescri)
        footerContainer.appendChild(imgDescription)

        this.element.append(wd_bg, mainContainer, footerContainer)
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