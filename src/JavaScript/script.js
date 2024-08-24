import { Preloader } from "../Pages/Scenes/Preload.js";


const gameData = {
    isPreloadComplete: false,
    app: undefined, 
    isMute: false,
    isDarkMode: true,
    isLibrasActive: false,
    isPaused: false,
    lastAccText: '',
    lastLevel: 1,
    class: 'Preload'
} 

window.gameData = gameData // RETIRAR DEPOIS
  
new Preloader()

const mainContainer      = document.querySelector('#gameContainer')
  
export{
  gameData
}