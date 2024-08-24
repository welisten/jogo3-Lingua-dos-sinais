// GAME DATA
import { gameData } from "../../JavaScript/script.js";

// CLASS
import { App } from "../../Class/App.js";

// ASSETS DATA
import { generalImgDtArr, handsImgDtArr, lettersImgDtArr } from "../../Constants/ImagesData.js";
import { audioDataArr } from "../../Constants/songsData.js";

// CONSTANTS
import { colors } from "../../Constants/Colors.js";

class Preloader extends Phaser.Scene {
    constructor(){
        super({key: 'Preloader'})
        this.intro = null // aqui posteriormente irá entrar uma classe referente a uma introdução (instruçãoes por exemplo)
        this.phaserGame = null
        this.assetsControls = {}
        this.setPreloader()

    }
    setPreloader(){
        const gContainerWidth  = Math.floor(window.innerWidth * 0.65 > 1500 ? 1500 : window.innerWidth * 0.65) // 760 é o width mais comum (convenção) 
        const gcontainerHeight  = window.innerHeight * 0.7
        const parent = document.querySelector('#logoContainer')
        const config = {
            type: Phaser.AUTO,
            width: gContainerWidth,
            height: gcontainerHeight,
            parent: parent,
            scene: {
                preload: this.preload,
            }
        }

        this.phaserGame = new Phaser.Game(config)
    }
    preload(){
        const gameCanvas = this.sys.game.canvas

        gameCanvas.id                       = 'jogo3_canvas'
        // gameCanvas.parentNode.style.display = 'flex'
        gameCanvas.style.border             = `5px solid ${colors.letter_c2}`;
        gameCanvas.style.borderRadius       = "20px"
        
        // os assets devem ser armazenado no navegador
        window.gameAssets = {}
        let store = window.gameAssets

        for(let dataObj of generalImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }

        for(let dataObj of handsImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }

        for(let dataObj of lettersImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }

        audioDataArr.forEach((dataObj) => {
            this.load.audio(dataObj.name, dataObj.src)
        })

        const gContainerWidth  = Math.floor(window.innerWidth * 0.65 > 1500 ? 1500 : window.innerWidth * 0.65) // 760 é o width mais comum (convenção) 
        const gcontainerHeight  = window.innerHeight * 0.7

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()
        
        progressBox.fillStyle('0xfdfdfd', 1)
        progressBox.fillRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 , gcontainerHeight * .85, gContainerWidth * .8, 20, 15)
        progressBox.lineStyle(5, '0xfdfdfd', 1)
        progressBox.strokeRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 , gcontainerHeight * .85, gContainerWidth * .8, 20, 15)
        progressBox.setDepth(1)
        progressBar.setDepth(2)
        
        const loadingText = this.make.text({
            x: gContainerWidth / 2,
            y: gcontainerHeight * .8,
            text: 'Carregando...',
            style: {
            font: '30px monospace',
            fill: '#ffffff'
        }
        })
        loadingText.setOrigin(0.5, 0.5)

        this.load.on('progress', value => {
            progressBar.clear();
            progressBar.fillStyle(0xf2dd04, 1);
            progressBar.fillRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 + gContainerWidth * .01 , gcontainerHeight * .85 + 5, (gContainerWidth * .78) * value, 10)
        })


        const getImage = (key) => { // retorna a url
            return this.textures.get(key).getSourceImage()
        }

        const getAudio = (key) => {// retorna audioBuffer
            return this.cache.audio.get(key)
        }
        this.load.on('filecomplete', (key) => {
            console.log(`a imagem "${key}" foi carregada`)
        })

        this.load.on('complete',  () => {
            console.log(window.location.href)
            audioDataArr.forEach( dataObj => criarObjeto(store, dataObj.name, getAudio(dataObj.name)))
            for(let dataObj of generalImgDtArr){
                criarObjeto(store, dataObj.name, getImage(dataObj.name))
            }
            if(window.location != 'http://localhost:6060/Pages/home.html'){

                this.time.delayedCall(5000, () => {
                    progressBar.destroy()
                    progressBox.destroy()
                    loadingText.destroy()
                    window.location.href = "./home.html"
                })
            }
        });

        function criarObjeto(object, key, callback){ // object pode ser retirado e substituido por store(global) internamente na função
            object[key] = callback
        }
    }

    getIntro(){
        if (this.intro) {
            console.log('Starting the game with intro:', this.intro)
        } else {
            console.log('Intro is not initialized yet')
        }
    }
}


export{
    Preloader
}


