import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";


class App {
    constructor(){
        
        this.element = document.querySelector('#gameContainer'),
       
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()//rever propriedade do obj
        this.gainNode = this.audioContext.createGain()
        
        document.title = 'Vamos Librar !'
        
        this.start()

    }

    start(){
        this.setContainer()

        this.playAudio(gameAssets['positiveBlipEffect'])
            setTimeout(() => this.playAudio(gameAssets['theme1'], .5, true), 1000)

        
        


    }
    setContainer(){
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

        // {const logoC_El = createNewElement('div', cl = undefined, 'logoContainer')
        // const logoGroup_El = createNewElement('div', 'logo')
        // const char1_img_El = createNewElement('img', cl = undefined, 'char_1')
        // const bgRing_img_El = createNewElement('img', cl = undefined, 'bg_ring')

        // char1_img_El.setAttribute('alt', 'Eu te amo em Libras')
        // bgRing_img_El.setAttribute('alt', 'anelBrilhante')

        // char1_img_El.style.zIndex = '2'
        // bgRing_img_El.style.zIndex = '1'

        // logoGroup_El.appendChild(char1_img_El)
        // logoGroup_El.appendChild(bgRing_img_El)
        // logoC_El.appendChild}

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
        const wordBtn_El = createNewElement('button', 'btn hm-btn', 'hm-lettersBtn')

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

    playAudio(audioBuffer, volume = 1.0, loop = false){   
        if(!gameData.isMute){
            const src = this.audioContext.createBufferSource()
            let aux = volume
            src.buffer = audioBuffer
            src.loop = loop
    
            volume = gameData.isMute === true ? 0 : aux
            this.gainNode.gain.value = volume 
            
            src.connect(this.gainNode)
            this.gainNode.connect(this.audioContext.destination)
            src.start()
            if(loop === true) this.currentAudio = src
        }

    }
    stopCurrentAudio(){
        if(this.currentAudio.audio) {
            this.currentAudio.config.startTime = this.audioContext.currentTime
            this.currentAudio.audio.stop()
            this.currentAudio.audio = null
        }
    }

    getImage(key){
        return gameAssets[key]
    }
}


export{
    App
}