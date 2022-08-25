const pets = [ "Hipoperro", "Capipepo", "Ratigueya", "Langosucio", "Tucanazo", 'Pedos' ]
let attackPlayer
let attackEnemy
let attackResult
let healthPlayer = 3
let healthEnemy = 3

function startGame()
{
    let buttonPetPlayer = document.getElementById('button-pet-select')
    buttonPetPlayer.addEventListener('click', selectPetPlayer)

    // HIDE SECTIONS: 'ATTACK SELECTION & RESTART BUTTON'
    let sectionSelectAttack = document.getElementById('select-attack')
    sectionSelectAttack.style.display = 'none'
    let sectionRestart = document.getElementById('restart')
    sectionRestart.style.display = 'none'
}
function selectPetPlayer()
{
    let inputHipoperro = document.getElementById('hipoperro')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let inputLangosucio = document.getElementById('langosucio')
    let inputTucanazo = document.getElementById('tucanazo')
    let inputPedos = document.getElementById('pedos')

    let selectedPet = "NONE"
    let spanPetPlayer = document.getElementById('pet-player')

    const inputs = [ inputHipoperro, inputCapipepo, inputRatigueya, inputLangosucio, inputTucanazo, inputPedos ]

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

    // HIDE SECTION: 'PET SELECTION'
    let sectionSelectPet = document.getElementById('select-pet')
    sectionSelectPet.style.display = 'none'

    // SHOW SECTION: 'ATTACK'
    let sectionSelectAttack = document.getElementById('select-attack')
    sectionSelectAttack.style.display = 'block'

    // ATTACK BUTTONS ACTIVATION (AFTER PET SELECTION)
    let buttonFire = document.getElementById('button-fire')
    let buttonWater = document.getElementById('button-water')
    let buttonEarth = document.getElementById('button-earth')
    buttonFire.addEventListener('click', attackFire)
    buttonWater.addEventListener('click', attackWater)
    buttonEarth.addEventListener('click', attackEarth)
}
function selectPetEnemy()                   // AUTO SELECT A RANDOM ENEMY PET + SHOW IT IN HTML
{
    let randomPet = randomNum(1,6)
    let spanPetEnemy = document.getElementById('pet-enemy')
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
    let spanHealthPlayer = document.getElementById('health-player')
    let spanHealthEnemy = document.getElementById('health-enemy')    
    spanHealthPlayer.innerHTML = healthPlayer
    spanHealthEnemy.innerHTML = healthEnemy

    printMessage()
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
function printMessage()                     // PRINT MESSAGE (ROUNDS)
{
    let sectionMessages = document.getElementById('messages')
    let paragraph = document.createElement("p")                   //paragraph creation
    paragraph.innerHTML = 'Your pet attacked with ' + attackPlayer + ' and your enemy\'s pet attacked with ' + attackEnemy + ' - ' + attackResult + '.' //paragraph content insertion
    sectionMessages.appendChild(paragraph)                        //paragraph insertion to <section id='messages'>
}
function victoryOrDefeat()                  // CHECK PLAYERS LIVES 
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
    let sectionMessages = document.getElementById('messages')
    let paragraph = document.createElement("p")
    paragraph.innerHTML = finalResult
    sectionMessages.appendChild(paragraph)

    // BUTTONS DISABLED AFTER GAME IS OVER
    let buttonFire = document.getElementById('button-fire')
    let buttonWater = document.getElementById('button-water')
    let buttonEarth = document.getElementById('button-earth')  
    buttonFire.disabled = true
    buttonWater.disabled = true
    buttonEarth.disabled = true

    // SHOW RESTART SECTION & ACTIVATE BUTTON
    let sectionRestart = document.getElementById('restart')
    sectionRestart.style.display = 'block'
    let buttonRestart = document.getElementById('button-restart')
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