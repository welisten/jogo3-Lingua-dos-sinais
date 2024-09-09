import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";

class Words {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#gameContainer')
        
        this.element.classList.add('wd')
        document.title = 'Aprendendo Palavras!'

        this.game.resetContainerToNewScene()
        this.start()
    }
    start(){
        this.buildContainer()
        this.game.playAudio(gameAssets['nature_ambience'], 1, true)
        this.setContainerElement()
    }

    buildContainer(){
        this.game.buildBg()

        //                              header
        const wd_header = this.game.createNewElement('div', 'wd-header')
        // substituir por this.getImage
        const bird1 = this.game.createNewElement('img', 'birds birds-left b-l', null, '../../Assets/imgs/general/bird.png')
        const bird2 = this.game.createNewElement('img', 'birds birds-left b-s', null, '../../Assets/imgs/general/bird.png')
        const bird3 = this.game.createNewElement('img', 'birds birds-right b-s', null, '../../Assets/imgs/general/bird.png')
        const bird4 = this.game.createNewElement('img', 'birds birds-right b-l', null, '../../Assets/imgs/general/bird.png')

        bird1.setAttribute('alt', 'passarinho')
        bird2.setAttribute('alt', 'passarinho')
        bird3.setAttribute('alt', 'passarinho')
        bird4.setAttribute('alt', 'passarinho')

        wd_header.append(bird1, bird2, bird3, bird4)

        //                              main
        const wd_main = this.game.createNewElement('div', 'wd-main container')
        
        const searchContainer = this.game.createNewElement('div', 'searchContainer container')
        
        const formEl  = this.game.createNewElement('form', 'wdc-mn-search btn')
        const inputEl = this.game.createNewElement('input', 'wdc-mn-searchBar', 'wdc-searchBar')
        const formSubBtn  = this.game.createNewElement('button', 'wdc-mn-searchBtn', 'wdc-searchBtn')
        const i_search = this.game.createNewElement('i', 'fa-solid fa-magnifying-glass')

        inputEl.setAttribute('placeholder', 'digite uma palavra')
        formSubBtn.setAttribute('type', 'submite')
        
        formSubBtn.appendChild(i_search)
        formEl.append(inputEl, formSubBtn)

        searchContainer.appendChild(formEl)

        const wordSection = this.game.createNewElement('div', 'wordSection')
        const container_1 = this.game.createNewElement('div', 'container')

        const arvore_1 = this.getImage('tree1')
        const wordParagraf = this.game.createNewElement('p')
        const arvore_2 = this.getImage('tree2')

        arvore_1.setAttribute('alt', 'arvore')
        wordParagraf.innerText = ' '
        arvore_2.setAttribute('alt', 'arvore')

        container_1.append(arvore_1, wordParagraf, arvore_2)
        wordSection.appendChild(container_1)

        searchContainer.appendChild(wordSection)
        
        const signContainer = this.game.createNewElement('div', 'signContainer container')
        const sign = this.game.createNewElement('div', 'sign')

        signContainer.appendChild(sign)

        wd_main.append(searchContainer, signContainer)

        //                              footer
        const wd_footer = this.game.createNewElement('div', 'wd-footer')

        for(let i = 0; i < 9; i++){
            let img = this.getImage(`grass${i + 1}`)

            img.classList.add('wd-grass')
            img.setAttribute('alt', 'grama')

            wd_footer.appendChild(img)
        }

        const hand_s = this.getImage('hand_slin')
        hand_s.classList.add('wd-hand-slin')

        const char3 = this.getImage('char3')
        char3.classList.add('wd-char3')
        char3.setAttribute('alt', 'menina com braço mecânico')

        wd_footer.append(hand_s, char3)

        this.element.append(wd_header, wd_main, wd_footer)
    }
    
    setContainerElement(){

    }
    
    getImage(key){
        return gameAssets[key]
    }
    
}

export{
    Words
}