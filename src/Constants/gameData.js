const gameData = {
    isPreloadComplete: false,
    app: undefined, 
    isMute: false,
    isDarkMode: true,
    isLibrasActive: false,
    isPaused: false,
    lastAccText: '',
    lastLevel: 1,
    mainClass: 'Preload'
} 

window.gameData = gameData // RETIRAR DEPOIS


export{
    gameData
}