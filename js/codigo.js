
// FUNCTIONS: startGame() - selectPetPlayer() - printMessageFinal(finalResult) 
const buttonPetPlayer = document.getElementById('button-pet-select')
const sectionSelectAttack = document.getElementById('select-attack')
const sectionRestart = document.getElementById('restart')
const cardsContainer = document.getElementById('cardsContainer')
const attacksContainer =document.getElementById('attacks-Container')
let axiemonOptions
let attackOptions
let inputKapikat
let inputHornybug
let inputHipochad

// FUNCTIONS: selectPetPlayer()
const sectionSelectPet = document.getElementById('select-pet')
const spanPetPlayer = document.getElementById('pet-player')
let selectedPet

// FUNCTIONS: selectPetEnemy() 
const spanPetEnemy = document.getElementById('pet-enemy')
let attacksEnemyAvailable = []

// FUNCTIONS: indexBothEnemies(player, enemy)
let indexPlayerAttack
let indexEnemyAttack

// FUNCTIONS: combat()
const spanWinsPlayer = document.getElementById('health-player')
const spanWinsEnemy = document.getElementById('health-enemy')
let attackPlayerSelected = []
let attackEnemySelected = []
let attackResult
let healthPlayer = 3
let healthEnemy = 3
let winsPlayer = 0
let winsEnemy = 0

// FUNCTIONS: printMessage(combatResult)  
const playerAttacks = document.getElementById('player-attack')
const enemyAttacks = document.getElementById('enemy-attack')

// FUNCTIONS: showAttacks(attacks) - printMessageFinal(finalResult) 
let buttonFire 
let buttonWater 
let buttonEarth
let buttons = []

// FUNCTIONS: printMessage(combatResult) - printMessageFinal(finalResult) 
const combatNotification = document.getElementById('combat-result')
const buttonRestart = document.getElementById('button-restart')

let axiemons = []

// CLASS DEFINITION
class Axiemon
{
    constructor(name, picture, health)
    {
        this.name = name
        this.picture = picture
        this.health = health
        this.attacks = []               // LITERAL OBJECT (NOT DECLARED ABOVE AT FUNCTION LVL)
    }
}

// CLASS OBJECTS DEFINITION
let hipochad = new Axiemon('Hipochad', './assets/axie-full-transparent7.png', 5)
let kapikat = new Axiemon('Kapikat', './assets/axie-full-transparent.png', 5)
let hornybug = new Axiemon('Hornybug', './assets/axie-full-transparent3.png', 5)

// LITERAL OBJECTS PUSHED(LOADED) INTO THE ARRAY 'attacks'
hipochad.attacks.push (
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '💧', id: 'button-water' },
    { name: '🔥', id: 'button-fire' },
    { name: '🌱', id: 'button-earth' },
)
kapikat.attacks.push (
    { name: '🌱', id: 'button-earth' },
    { name: '🌱', id: 'button-earth' },
    { name: '🌱', id: 'button-earth' },
    { name: '💧', id: 'button-water' },
    { name: '🔥', id: 'button-fire' },
)
hornybug.attacks.push (
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '🔥', id: 'button-fire' },
    { name: '💧', id: 'button-water' },
    { name: '🌱', id: 'button-earth' },
)
// CLASS OBJECTS PUSHED(LOADED) INTO THE ARRAY 'axiemons'
axiemons.push (hipochad, kapikat, hornybug)

function startGame()
{   
    // FUNCTION TO SELECT PET ASIGNED TO THE PLAYER BUTTON   
    buttonPetPlayer.addEventListener('click', selectPetPlayer)

    // HIDE SECTIONS: 'ATTACK SELECTION & RESTART BUTTON'    
    sectionSelectAttack.style.display = 'none'    
    sectionRestart.style.display = 'none'

    axiemons.forEach ((axiemon) => 
    {
        axiemonOptions = 
        `
            <input type="radio" name="pet" id='${axiemon.name}'/>              
            <label class="pet-card" for='${axiemon.name}'>
                <p>${axiemon.name}</p>
                <img src=${axiemon.picture} alt=${axiemon.name}>
            </label>
        `
        cardsContainer.innerHTML += axiemonOptions

        inputHipochad = document.getElementById('Hipochad')
        inputKapikat = document.getElementById('Kapikat')
        inputHornybug = document.getElementById('Hornybug')        
    })
}
function selectPetPlayer()
{
    let petsChecked = false
    const inputs = [ inputHipochad, inputKapikat, inputHornybug ]

    for (i = 0; i < inputs.length; i++)
    {        
        if (inputs[i].checked)
        {
            spanPetPlayer.innerHTML = inputs[i].id
            selectedPet = inputs[i].id
            petsChecked = true
            extractAttacks(selectedPet)
            selectPetEnemy()
            break
        }
    }
    if (petsChecked == false)
    {
        alert("⚠⚠ PLEASE SELECT A PET ⚠⚠")
        return 1;
    } 
    sectionSelectPet.style.display = 'none'                 // HIDE SECTION: 'PET SELECTION'        
    sectionSelectAttack.style.display = 'flex'              // SHOW SECTION: 'ATTACK'
}
function extractAttacks(selectedPet)
{
    let attacks
    for (let i = 0; i < axiemons.length; i++)
    {
        if (selectedPet === axiemons[i].name)
        {
            attacks = axiemons[i].attacks
        }
    }
    showAttacks(attacks)
}
function showAttacks(attacks)
{
    attacks.forEach((attack) => 
    {
        attackOptions = 
            `
            <button id=${attack.id} class="buttons-attack attack-buttons">${attack.name}</button>
            `        
        attacksContainer.innerHTML += attackOptions        
    })
    // ATTACK BUTTONS DEFINITION (AFTER PET SELECTION) 
    buttonFire = document.getElementById('button-fire')
    buttonWater = document.getElementById('button-water')
    buttonEarth = document.getElementById('button-earth') 
    buttons = document.querySelectorAll('.attack-buttons')      
}
function selectPetEnemy()                   // AUTO SELECT A RANDOM ENEMY PET + SHOW IT IN HTML
{
    let randomPet = randomNum(0, axiemons.length - 1)
    spanPetEnemy.innerHTML = axiemons[randomPet].name
    attacksEnemyAvailable = axiemons[randomPet].attacks
    attackSequence()
}
function attackSequence()                   // ATTACK BUTTONS ACTIVATION (AFTER ENEMY PET SELECTION) 
{
    buttons.forEach
    (
        (button) =>
        {
            button.addEventListener
            (
                'click', (e) => 
                { 
                    if (e.target.textContent === '🔥')
                    {
                        attackPlayerSelected.push('FIRE')
                        console.log(attackPlayerSelected)
                        button.style.background = '#112f58'
                    }
                    else if (e.target.textContent === '💧')
                    {
                        attackPlayerSelected.push('WATER')
                        console.log(attackPlayerSelected)
                        button.style.background = '#112f58'
                    }
                    else
                    {
                        attackPlayerSelected.push('EARTH')
                        console.log(attackPlayerSelected)
                        button.style.background = '#112f58'
                    }
                    attackEnemyRandom() 
                }
            )
        }
    )
}
function attackEnemyRandom()
{
    let attackRandom = randomNum(0, attacksEnemyAvailable.length - 1)     // MAX ENEMY ATTACKS

    if (attacksEnemyAvailable[attackRandom].name == '🔥')
    { attackEnemySelected.push('FIRE') }
    else if (attacksEnemyAvailable[attackRandom].name == '💧')
    { attackEnemySelected.push('WATER') }
    else
    { attackEnemySelected.push('EARTH') }
    console.log(attackEnemySelected)
    console.log(attacksEnemyAvailable)
    attacksEnemyAvailable.splice(attackRandom, 1)                        // .splice REMOVES 1 ARRAY ELEMENT: (attackRandom, 1) == (POSITION, QUANTITY)
    startCombat()
}
function startCombat()
{
    if (attackPlayerSelected.length === 5)
    {
        combat()
    }
}
function indexBothEnemies(player, enemy)
{
    indexPlayerAttack = attackPlayerSelected[player]
    indexEnemyAttack = attackEnemySelected[enemy]
}
function combat()
{
    for (let index = 0; index < attackPlayerSelected.length; index++)
    {
        if (attackPlayerSelected[index] === attackEnemySelected[index])
        {
            indexBothEnemies(index, index)
            attackResult = 'DRAW'
        }
        else if (attackPlayerSelected[index] === 'FIRE' && attackEnemySelected[index] === 'EARTH' || attackPlayerSelected[index] === 'WATER' && attackEnemySelected[index] === 'FIRE' || attackPlayerSelected[index] === 'EARTH' && attackEnemySelected[index] === 'WATER')
        {
            indexBothEnemies(index, index)
            attackResult = 'YOU WIN !!!'
            winsPlayer++
        }
        else
        {
            indexBothEnemies(index, index)
            attackResult = 'YOU LOSE !!!'
            winsEnemy++
        }    
        printMessage(attackResult)           
    }

    victoryOrDefeat() 
    // SHOW & UPDATE THE LIVES COUNTER   
    spanWinsPlayer.innerHTML = winsPlayer + "🏆" 
    spanWinsEnemy.innerHTML = winsEnemy + "🏆" 
}
function printMessage(combatResult)                     // PRINT MESSAGE (ROUNDS)
{
    let newPlayerAttack = document.createElement("p")       // CREATES A <p> ELEMENT FOR PLAYER ATTACKS 
    let newEnemyAttack = document.createElement("p")        // CREATES A <p> ELEMENT FOR ENEMY'S ATTACKS

    combatNotification.innerHTML = combatResult             // CREATES THE TEXT INSIDE THE ALREADY CREATED <P> IN THE HTML         
    newPlayerAttack.innerHTML = indexPlayerAttack           // CREATES THE TEXT IN THE <p> ELEMENT FOR PLAYER ATTACKS 
    newEnemyAttack.innerHTML = indexEnemyAttack             // CREATES THE TEXT IN THE <p> ELEMENT FOR ENEMY'S ATTACKS

    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)
}
function victoryOrDefeat()                          // CHECK PLAYERS LIVES 
{
    if (winsPlayer < winsEnemy)
    {
        printMessageFinal("🎃 DEFEAT! 🎃")
    }
    else if (winsPlayer > winsEnemy)
    {
        printMessageFinal("✨ VICTORY! ✨")
    }
    else
    {
        printMessageFinal("⚖ DRAW! ⚖")
    }
}
function printMessageFinal(finalResult)     // PRINT MESSAGE (FINAL)
{
    // <P> CREATION INSIDE MESSAGE SECTION WITH TEXT FROM 'victoryOrDefeat()' FUNCTION    
    combatNotification.innerHTML = finalResult

    // BUTTONS DISABLED AFTER GAME IS OVER
    buttonFire.disabled = true
    buttonWater.disabled = true
    buttonEarth.disabled = true

    // SHOW RESTART SECTION & ACTIVATE BUTTON
    sectionRestart.style.display = 'block'
    buttonRestart.addEventListener('click', restartGame)
}
function restartGame()
{
    location.reload()
}
function randomNum(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
}

// CALLS 'startGame()' FUNCTION (AFTER ALL HTML IS LOADED)
window.addEventListener('load', startGame)



/*
function attackEnemyRandom()
{
    let attackRandom = randomNum(1,attacksEnemyAvailable.length)     // MAX ENEMY ATTACKS

    if (attackRandom == 1 || attackRandom == 2)
    { attackEnemySelected.push('FIRE') }
    else if (attackRandom == 3 || attackRandom == 4)
    { attackEnemySelected.push('WATER') }
    else
    { attackEnemySelected.push('EARTH') }
    console.log(attackEnemySelected)
    combat()
}
*/