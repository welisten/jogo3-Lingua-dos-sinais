import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";


class App {
    constructor(){
        
        this.element = document.querySelector('#gameContainer'),
       
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()//rever propriedade do obj
        this.gainNode = this.audioContext.createGain()
        
        document.title = 'Vamos Librar !'
        this.element.classList.toggle('hm')
        
        this.start()

    }

    start(){
        this.setContainer()

        this.playAudio(gameAssets['positiveBlipEffect'])
            setTimeout(() => this.playAudio(gameAssets['theme1'], .5, true), 1000)

        



    }
    setContainer(){
        console.log(window.getComputedStyle(document.documentElement).fontSize)


        this.element.classList.remove('inactive')
        let ruleW = window.innerWidth > 2000 ? window.innerWidth * 0.40 : window.innerWidth > 1500 ? window.innerWidth * 0.65 : window.innerWidth * 0.55

        const gContainerWidth  = Math.floor(ruleW)
        const gcontainerHeight  = window.innerHeight * .7 

        this.element.style.width = `${gContainerWidth}px`
        this.element.style.height = `${gcontainerHeight}px`

    }

    playAudio(audioBuffer, volume = 1.0, loop = false){   
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