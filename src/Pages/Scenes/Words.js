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
        wordParagraf.setAttribute('id', 'userText' )
        wordParagraf.innerText = ' '
        arvore_2.setAttribute('alt', 'arvore')

        container_1.append(arvore_1, wordParagraf, arvore_2)
        wordSection.appendChild(container_1)

        searchContainer.appendChild(wordSection)
        
        const signContainer = this.game.createNewElement('div', 'signContainer container')
        const vwBtn = document.querySelector('[vw-access-button]')
        const access = document.querySelector('.access')

        signContainer.appendChild(access)
        vwBtn.click()
        
        if(!gameData.wereVLibrasActived) setTimeout(() => this.setCloseBtn(), 10000);
        access.style.display = 'block'
        gameData.wereVLibrasActived = true

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
        const searchBtn =  document.getElementById('wdc-searchBtn')
        const searchBar =  document.getElementById('wdc-searchBar')
        const userTextEl = document.getElementById('userText')
        const vwBtn = document.querySelector('[vw-access-button]')
        
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault()
            if(searchBar.value){
                this.game.playAudio(gameAssets['btn_select'])
                userTextEl.innerText = searchBar.value
                searchBar.value = ''
                this.readWithAccessibility()
            }
            else {
                this.game.popUpMessage('Digite alguma palavra no campo de pesquisa')
            }
        })
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