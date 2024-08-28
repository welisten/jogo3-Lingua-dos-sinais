import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";
import { Letters } from "./Letters.js";
import { Words } from "./Words.js";


class App {
    constructor(){
        
        this.element = document.querySelector('#gameContainer'),
       
        this.currentAudio = {config:{startTime: 0, pausedAt: 0}}
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()//rever propriedade do obj
        this.gainNode = this.audioContext.createGain()
        
        document.title = 'Vamos Librar !'
        
        this.start()

    }

    start(){
        this.buildContainer()
        this.setContainersElms()
        // this.setSettingsControllers()

        this.playAudio(gameAssets['positiveBlipEffect'])
        setTimeout(() => this.playAudio(gameAssets['theme1'], .5, true), 1000)

        
        


    }
    buildContainer(){
        // CONSTRUIR HIERARQUIA E OS ELEMENTOS DA DOM REFERENTE A PAGINA HOME
        let ruleW , gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        
        ruleW = window.innerWidth > 2000 ? window.innerWidth * 0.40 : window.innerWidth > 1500 ? window.innerWidth * 0.65 : window.innerWidth * 0.55
        gContainerWidth  = Math.floor(ruleW)
        gcontainerHeight  = window.innerHeight * .7 

        this.element.style.width = `${gContainerWidth}px`
        this.element.style.height = `${gcontainerHeight}px`

        const createNewElement = (el, cl = undefined, id = undefined, src = undefined) => {
            const element = document.createElement(el)

            if(cl){
                let clss = cl.split(' ')
                for(let i = 0; i < clss.length; i++){
                    element.classList.add(clss[i])
                }
            } 
            if(id)  element.setAttribute('id', id);
            if(src) element.setAttribute('src', src);

            return element
        }

        const gameC_El = this.element
        
        const homeC_top_El = createNewElement('div', 'hm-c container top')
        
        const homeLogo_El= createNewElement('div', 'hm-logo')
        const earth_img_El= createNewElement('img', 'lg-earth', undefined, "../Assets/imgs/general/earth.png")
        const cloud1_img_El = createNewElement('img', 'lg-clouds cl-1', undefined, "../Assets/imgs/general/clouds_gif.gif")
        const cloud2_img_El = createNewElement('img', 'lg-clouds cl-2', undefined, "../Assets/imgs/general/clouds_gif.gif")
        
        const homeTitle_El = createNewElement('div', 'hm-title')
        const title_img_El = createNewElement('img', 'title', undefined, "../Assets/imgs/general/title.png")
        
        earth_img_El. setAttribute('alt', 'crianças dando as mãos envolta do globo terrestre')
        cloud1_img_El. setAttribute('alt', 'nuvens se mechendo')
        cloud2_img_El. setAttribute('alt', 'nuvens se mechendo')
        title_img_El. setAttribute('alt', 'titulo: vamos librar')
        
        homeLogo_El.appendChild(earth_img_El)
        homeLogo_El.appendChild(cloud1_img_El)
        homeLogo_El.appendChild(cloud2_img_El)
        homeTitle_El.appendChild(title_img_El)
        homeC_top_El.appendChild(homeLogo_El)
        homeC_top_El.appendChild(homeTitle_El)
        gameC_El.appendChild(homeC_top_El)


        const homeC_bottom_El = createNewElement('div', 'hm-c container bottom')
        
        const menuC_El = createNewElement('div', 'hm-menu container')
        const letterBtn_El = createNewElement('button', 'btn hm-btn', 'hm-lettersBtn')
        const wordBtn_El = createNewElement('button', 'btn hm-btn', 'hm-wordsBtn')

        letterBtn_El.innerHTML = 'alfabeto'
        wordBtn_El.innerHTML = 'palavras'
        
        const hand1_img_El = createNewElement('img', 'hand h-1', undefined, "../Assets/imgs/general/hand.png")

        const wrapperC_El = createNewElement('div', 'wrapper')
        const hand2_img_El = createNewElement('img', 'hand h-2', undefined, "../Assets/imgs/general/hand.png")

        hand1_img_El.setAttribute('alt', 'mão referenciando a obra "A criação de Adão.')
        hand2_img_El.setAttribute('alt', 'mão referenciando a obra "A criação de Adão.')
        
        menuC_El.appendChild(letterBtn_El)
        menuC_El.appendChild(wordBtn_El)
        wrapperC_El.appendChild(hand2_img_El)
        homeC_bottom_El.appendChild(menuC_El)
        homeC_bottom_El.appendChild(hand1_img_El)
        homeC_bottom_El.appendChild(wrapperC_El)
        gameC_El.appendChild(homeC_bottom_El)


        const gControlsC_El = createNewElement('div', 'gameControls container')
        const muteBtn_El = createNewElement('button', 'btn controls', 'muteBtn')
        const lightBtn_El = createNewElement('button', 'btn controls', 'lightBtn')
        const vol_icon_El = createNewElement('i', 'fa-solid fa-volume-xmark')
        const sun_icon_El = createNewElement('i', 'fa-regular fa-sun')
        
        muteBtn_El.appendChild(vol_icon_El)
        lightBtn_El.appendChild(sun_icon_El)
        gControlsC_El.appendChild(muteBtn_El)
        gControlsC_El.appendChild(lightBtn_El)
        gameC_El.appendChild(gControlsC_El)

        const bg_El = createNewElement('div', 'bg')
        gameC_El.appendChild(bg_El)
    }

    setContainersElms(){
        // CONFIGURAR OS BOTÕES DO MENU E QUALQUER OUTRO ELEMENTO DA TELA
        const letterBtn_El = document.getElementById('hm-lettersBtn')
        const wordBtn_El = document.getElementById('hm-wordsBtn')
        
        letterBtn_El.addEventListener('click', (e) => {
            this.stopCurrentAudio()
            new Letters(this)
        })
        wordBtn_El.addEventListener('click', (e) => {
            this.stopCurrentAudio()
            new Words(this)
        })

        // HOVER E BLUR
        // sonds
    }
    setSettingsControllers(){
        // CONFIGURAR OS BOTÕES DE CONFIGURAÇÃO

    }


    playAudio(audioBuffer, volume = 1.0, loop = false){   
        if(!gameData.isMute){
            const src = this.audioContext.createBufferSource()
            src.buffer = audioBuffer
            src.loop = loop
    
            volume = gameData.isMute === true ? 0 : 1
            this.gainNode.gain.value = volume 
            
            src.connect(this.gainNode)
            this.gainNode.connect(this.audioContext.destination)
            if(loop !== true){
                src.start()
    
            } else {
                src.start(0, this.currentAudio.config.startTime)
                this.currentAudio.audio = src
            }
        }
    }
    stopCurrentAudio(){
        if(this.currentAudio.audio) {
            this.currentAudio.config.startTime = this.audioContext.currentTime
            this.currentAudio.audio.stop()
            this.currentAudio.audio = null
        }
    }

    resetContainerToNewScene(){
        this.element.querySelector('.bg').remove()
        this.element.querySelectorAll('.hm-c').forEach(el => el.remove())

    }
    getImage(key){
        return gameAssets[key]
    }
}


export{
    App
}