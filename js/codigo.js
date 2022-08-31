
// FUNCTIONS: startGame() - selectPetPlayer() - printMessageFinal(finalResult) 
const buttonPetPlayer = document.getElementById('button-pet-select')
const sectionSelectAttack = document.getElementById('select-attack')
const sectionRestart = document.getElementById('restart')

// FUNCTIONS: selectPetPlayer()
const pets = [ "Hipochad", "Kapikat", "Hornybug" ]
const sectionSelectPet = document.getElementById('select-pet')
const inputHipochad = document.getElementById('hipochad')
const inputKapikat = document.getElementById('kapikat')
const inputHornybug = document.getElementById('hornybug')
const spanPetPlayer = document.getElementById('pet-player')

// FUNCTIONS: selectPetEnemy() 
const spanPetEnemy = document.getElementById('pet-enemy')

// FUNCTIONS: combat()
const spanHealthPlayer = document.getElementById('health-player')
const spanHealthEnemy = document.getElementById('health-enemy') 
let attackPlayer
let attackEnemy
let attackResult
let healthPlayer = 3
let healthEnemy = 3

// FUNCTIONS: printMessage(combatResult)  
const playerAttacks = document.getElementById('player-attack')
const enemyAttacks = document.getElementById('enemy-attack')

// FUNCTIONS: selectPetPlayer() - printMessageFinal(finalResult) 
const buttonFire = document.getElementById('button-fire')
const buttonWater = document.getElementById('button-water')
const buttonEarth = document.getElementById('button-earth') 

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
    }
}
// CLASS OBJECTS DEFINITION
let hipochad = new Axiemon('Hipochad', './assets/axie-full-transparent (7).png', 5)
let kapikat = new Axiemon('Kapikat', './assets/axie-full-transparent.png', 5)
let hornybug = new Axiemon('Hornybug', './assets/axie-full-transparent (3).png', 5)

// CLASS OBJECTS PUSHED(LOADED) INTO THE ARRAY 'axiemons'
axiemons.push(hipochad, kapikat, hornybug)

console.log(axiemons)

function startGame()
{   
    // FUNCTION TO SELECT PET ASIGNED TO THE PLAYER BUTTON   
    buttonPetPlayer.addEventListener('click', selectPetPlayer)

    // HIDE SECTIONS: 'ATTACK SELECTION & RESTART BUTTON'    
    sectionSelectAttack.style.display = 'none'    
    sectionRestart.style.display = 'none'
}
function selectPetPlayer()
{
    let selectedPet = "NONE"
    const inputs = [ inputHipochad, inputKapikat, inputHornybug ]

    for (i = 0; i < pets.length; i++)
    {
        if (inputs[i].checked)
        {
            selectedPet = pets[i]
            spanPetPlayer.innerHTML = selectedPet
            selectPetEnemy()
            break
        }
    }
    if (selectedPet == "NONE")
    {
        alert("⚠⚠ PLEASE SELECT A PET ⚠⚠")
        return 1;
    }
    sectionSelectPet.style.display = 'none'                 // HIDE SECTION: 'PET SELECTION'        
    sectionSelectAttack.style.display = 'flex'              // SHOW SECTION: 'ATTACK'

    // ATTACK BUTTONS ACTIVATION (AFTER PET SELECTION)    
    buttonFire.addEventListener('click', attackFire)
    buttonWater.addEventListener('click', attackWater)
    buttonEarth.addEventListener('click', attackEarth)
}
function selectPetEnemy()                   // AUTO SELECT A RANDOM ENEMY PET + SHOW IT IN HTML
{
    let randomPet = randomNum(1, 3)
    spanPetEnemy.innerHTML = pets[randomPet - 1]
}
function attackFire()
{
    attackPlayer = 'FIRE'
    combat()
}
function attackWater()
{
    attackPlayer = 'WATER'
    combat()
}
function attackEarth()
{
    attackPlayer = 'EARTH'    
    combat()       
}
function combat()
{
    attackEnemyRandom()

    if (attackPlayer == attackEnemy)
    {attackResult = 'DRAW'}
    else if (attackPlayer == 'FIRE' && attackEnemy == 'EARTH' || attackPlayer == 'WATER' && attackEnemy == 'FIRE' || attackPlayer == 'EARTH' && attackEnemy == 'WATER')
    {
        attackResult = 'YOU WIN !!!'
        healthEnemy--
    }
    else
    {
        attackResult = 'YOU LOSE !!!'
        healthPlayer --
    }
    // SHOW & UPDATE THE LIVES COUNTER   
    spanHealthPlayer.innerHTML = healthPlayer + "💖"
    spanHealthEnemy.innerHTML = healthEnemy + "💖"
    printMessage(attackResult)
    victoryOrDefeat()
}
function attackEnemyRandom()
{
    let attackRandom = randomNum(1,3)

    if (attackRandom == 1)
    { attackEnemy = 'FIRE'}
    else if (attackRandom == 2)
    { attackEnemy = 'WATER'}
    else
    { attackEnemy = 'EARTH'}
}
function printMessage(combatResult)                     // PRINT MESSAGE (ROUNDS)
{
    let newPlayerAttack = document.createElement("p")   // CREATES A <p> ELEMENT FOR PLAYER ATTACKS 
    let newEnemyAttack = document.createElement("p")    // CREATES A <p> ELEMENT FOR ENEMY'S ATTACKS

    combatNotification.innerHTML = combatResult         // CREATES THE TEXT INSIDE THE ALREADY CREATED <P> IN THE HTML         
    newPlayerAttack.innerHTML = attackPlayer            // CREATES THE TEXT IN THE <p> ELEMENT FOR PLAYER ATTACKS 
    newEnemyAttack.innerHTML = attackEnemy              // CREATES THE TEXT IN THE <p> ELEMENT FOR ENEMY'S ATTACKS

    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)
}
function victoryOrDefeat()                          // CHECK PLAYERS LIVES 
{
    if (healthPlayer == 0)
    {
        printMessageFinal("🎃 DEFEAT! 🎃")
    }
    else if (healthEnemy == 0)
    {
        printMessageFinal("✨ VICTORY! ✨")
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