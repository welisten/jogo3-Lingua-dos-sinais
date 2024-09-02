import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";
import { generalImgDtArr } from "../../Constants/ImagesData.js";
class Letters {
    constructor(game){
        this.game = game
        this.element = document.querySelector('#gameContainer')
        this.element.classList.add('lt') // le -> letter
        document.title = 'Aprendendo o alfabeto'
        
        this.lettersArr = []
        this.signsArr = []
        this.game.resetContainerToNewScene()
        
        this.provisorySetContainer()
        this.start()
    }

    provisorySetContainer(){
        let ruleW , gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        
        ruleW = window.innerWidth > 2000 ? window.innerWidth * 0.40 : window.innerWidth > 1500 ? window.innerWidth * 0.65 : window.innerWidth * 0.55
        gContainerWidth  = Math.floor(ruleW)
        gcontainerHeight  = window.innerHeight * .7 

        this.element.style.width = `${gContainerWidth}px`
        this.element.style.height = `${gcontainerHeight}px`
    }

    start(){
        this.game.playAudio(gameAssets['nature_ambience'])
        this.buildContainer()
    }

    buildContainer(){
        // this.generateCard()
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
                                    // BACKGROUND
        const backgroudGifsEl = createNewElement('div', "container bg-gifs")
       
        const bg_cloud1 = this.getImage('clouds_gif1')
        bg_cloud1.setAttribute('src', './../../Assets/imgs/general/clouds_gif.gif')
        bg_cloud1.setAttribute('alt', 'nuvens')
        bg_cloud1.setAttribute('class', 'bg-gifs-clouds bg-c1')
        console.log(bg_cloud1)
        
        const bg_cloud2 = this.getImage('clouds_gif2')
        bg_cloud2.setAttribute('src', './../Assets/imgs/general/clouds_gif.gif')
        bg_cloud2.setAttribute('alt', 'nuvens')
        bg_cloud2.setAttribute('class', 'bg-gifs-clouds bg-c2')
       
        const bg_sun = this.getImage('sun_gif')  
        bg_sun.setAttribute('src','./../Assets/imgs/general/sun_gif.gif')
        bg_sun.setAttribute('alt','sol')
        bg_sun.setAttribute('class','bg-gifs-sun')

        const bg_home = this.getImage('home_gif')  
        bg_home.setAttribute('src','./../Assets/imgs/general/home_gif.gif')
        bg_home.setAttribute('alt','home')
        bg_home.setAttribute('class','bg-gifs-home')

        const homeBtnEl = createNewElement('button', 'btn bg-homeBtn')

        homeBtnEl.appendChild(bg_home)
        backgroudGifsEl.appendChild(bg_cloud1)
        backgroudGifsEl.appendChild(bg_cloud2)
        backgroudGifsEl.appendChild(bg_sun)
        backgroudGifsEl.appendChild(homeBtnEl)
                                    // HEADER
        const lt_headerEl = createNewElement('div', "lt-header container")
        
        const searchContaiEl = createNewElement('form', 'lt-hd-search btn')
        const searchBarEl = createNewElement('input', 'lt-hd-searchBar')
        searchBarEl.setAttribute('type', 'text')
        searchBarEl.setAttribute('placeholder', 'digite uma letra')

        const searchBarBtn = createNewElement('button', 'lt-hd-searchBtn')
        searchBarBtn.setAttribute('type', 'submit')


        const iSearchEl = createNewElement('i', 'fa-solid fa-magnifying-glass')
        searchBarBtn.appendChild(iSearchEl)
        searchContaiEl.appendChild(searchBarEl)
        searchContaiEl.appendChild(searchBarBtn)
        
        const navContaiEl = createNewElement('div', 'lt-hd-nav container')
        const navFiltersContain = createNewElement('div', 'hd-nav-filters container')
        
        const filterContainer1 = createNewElement('div', 'ft-btn-container btn')
        const filterContainer2 = createNewElement('div', 'ft-btn-container btn')
        const filterContainer3 = createNewElement('div', 'ft-btn-container btn')

        const radio1 = createNewElement('input', 'ft-btn-rd', 'todos')
        radio1.setAttribute('type','radio')
        radio1.setAttribute('name','group')
        radio1.setAttribute('value','todos')
        radio1.setAttribute('checked','')

        
        const radio2 = createNewElement('input', 'ft-btn-rd', 'vogais')
        radio2.setAttribute('type','radio')
        radio2.setAttribute('name','group')
        radio2.setAttribute('value','vogais')

        const radio3 = createNewElement('input', 'ft-btn-rd', 'consoates')
        radio3.setAttribute('type','radio')
        radio3.setAttribute('name','group')
        radio3.setAttribute('value','consoantes')
        


        const label_rd1 = createNewElement('label', 'filterBtn')
        label_rd1.setAttribute('for', '')
        label_rd1.innerHTML = 'todos'
        
        const label_rd2 = createNewElement('label', 'filterBtn')
        label_rd2.setAttribute('for', '')
        label_rd2.innerHTML = 'vogais'
        
        const label_rd3 = createNewElement('label', 'filterBtn')
        label_rd3.setAttribute('for', '')
        label_rd3.innerHTML = 'consoantes'

        filterContainer1.append(radio1, label_rd1)
        filterContainer2.append(radio2, label_rd2)
        filterContainer3.append(radio3, label_rd3)

        navFiltersContain.append(filterContainer1, filterContainer2, filterContainer3)

        const char2 = this.getImage('char2')
        char2.setAttribute('src', './../Assets/imgs/general/char2.png')
        char2.setAttribute('alt', 'menina')
        char2.setAttribute('class', 'hd-nav-char2')

        let auxArr= [] 
        for(let i = 0; i < 4; i++){
            auxArr[i] = this.getImage(`grass${i+1}`)
            auxArr[i].setAttribute('src', './../Assets/imgs/general/grass.png')
            auxArr[i].setAttribute('alt', 'grama')
            auxArr[i].setAttribute('class', 'hd-nav-grass grass')
        }
        let [grass1, grass2, grass3, grass4] = auxArr
        
        navContaiEl.append(navFiltersContain, char2)
        navContaiEl.append(grass1, grass2, grass3, grass4)
        lt_headerEl.append(searchContaiEl, navContaiEl)

                                    // MAIN
        const lt_mainEl = createNewElement('div', "lt-main")
        const mainContainer = createNewElement('div', 'lt-mn-container container')
        const letterCard = createNewElement('div', 'lt-mn-letterCard lt-card')
        const letterImg = this.getImage('A')
        
        letterImg.setAttribute('src', './../Assets/imgs/letters/A.gif')
        letterImg.setAttribute('alt', `Letra A`) // atenção para template string ao refatorar essa parte
        letterImg.setAttribute('class', `lt-letter`) 

        const mn_iEqual = createNewElement('i', 'fa-solid fa-equals')
        const signCard = createNewElement('div', 'lt-mn-signCard lt-card')
        const signImg = this.getImage('a')
        
        signImg.setAttribute('src', './../Assets/imgs/hands/a.png')
        signImg.setAttribute('alt', `sinal A`) // atenção para template string ao refatorar essa parte
        signImg.setAttribute('class', `lt-sign`)
        
        letterCard.appendChild(letterImg)
        signCard.appendChild(signImg)
        mainContainer.append(letterCard, mn_iEqual, signCard)
        lt_mainEl.appendChild(mainContainer)

                                    // FOOTER
        const lt_footerEl = createNewElement('div', "lt-footer")
        const footerContainer = createNewElement('div', 'lt-ft-btns container')
        const prevBtn = createNewElement('button', 'prevBtn ft-btn btn', 'prevBtn')
        const nextBtn = createNewElement('button', 'nextBtn ft-btn btn', 'nextBtn')
        const playBtn = createNewElement('button', 'playBtn btn', 'playBtn')
        const iPrev = createNewElement('i', 'fa-solid fa-left-long')
        const iNext = createNewElement('i', 'fa-solid fa-right-long')
        const iYouTube = createNewElement('i', 'fa-brands fa-youtube')
        
        prevBtn.appendChild(iPrev)
        nextBtn.appendChild(iNext)
        playBtn.appendChild(iYouTube)
        footerContainer.append(prevBtn, nextBtn, playBtn)
        lt_footerEl.appendChild(footerContainer)
        
        this.element.append(backgroudGifsEl, lt_headerEl, lt_mainEl, lt_footerEl)
    }
    generateCards(){

    }
    getImage(key){
        return gameAssets[key]
    }
}

export{
    Letters
}