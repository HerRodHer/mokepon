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

    let buttonRestart = document.getElementById('button-restart')
    buttonRestart.addEventListener('click', restartGame)

    let buttonFire = document.getElementById('boton-fuego')
    let buttonWater = document.getElementById('boton-agua')
    let buttonEarth = document.getElementById('boton-tierra')
    buttonFire.addEventListener('click', attackFire)
    buttonWater.addEventListener('click', attackWater)
    buttonEarth.addEventListener('click', attackEarth)

    // BUTTONS INITIALLY DISABLED (EXCEPT FOR 'PET SELECT') 
    buttonFire.disabled = true
    buttonWater.disabled = true
    buttonEarth.disabled = true
    buttonRestart.disabled = true
}
function selectPetPlayer()
{
    let inputHipoperro = document.getElementById('hipoperro')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let inputLangosucio = document.getElementById('langosucio')
    let inputTucanazo = document.getElementById('tucanazo')
    let inputPedos = document.getElementById('pedos')

    let selectedPet = "Ninguna"
    let spanPetPlayer = document.getElementById('mascota-jugador')

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
    if (selectedPet == "Ninguna")
    {
        alert("Selecciona una mascota, por favor")
        return 1;
    }
    // BUTTON DEACTIVATION (AFTER PET SELECTION)
    let buttonPetPlayer = document.getElementById('button-pet-select')
    buttonPetPlayer.disabled = true

    // BUTTON ACTIVATION (AFTER PET SELECTION)
    let buttonFire = document.getElementById('boton-fuego')
    let buttonWater = document.getElementById('boton-agua')
    let buttonEarth = document.getElementById('boton-tierra')
    buttonRestart = document.getElementById('button-restart')
    buttonFire.disabled = false
    buttonWater.disabled = false
    buttonEarth.disabled = false
    buttonRestart.disabled = false
}
function selectPetEnemy()
{
    let randomPet = randomNum(1,6)
    let spanPetEnemy = document.getElementById('mascota-enemigo')
    spanPetEnemy.innerHTML = pets[randomPet - 1]
}
function attackFire()
{
    attackPlayer = 'FUEGO'
    combat()
}
function attackWater()
{
    attackPlayer = 'AGUA'
    combat()
}
function attackEarth()
{
    attackPlayer = 'TIERRA'    
    combat()       
}
function combat()
{
    attackEnemyRandom()

    if (attackPlayer == attackEnemy)
    {attackResult = 'EMPATE'}
    else if (attackPlayer == 'FUEGO' && attackEnemy == 'TIERRA' || attackPlayer == 'AGUA' && attackEnemy == 'FUEGO' || attackPlayer == 'TIERRA' && attackEnemy == 'AGUA')
    {
        attackResult = 'GANASTE'
        healthEnemy--
    }
    else
    {
        attackResult = 'PERDISTE'
        healthPlayer --
    }

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
    { attackEnemy = 'FUEGO'}
    else if (attackRandom == 2)
    { attackEnemy = 'AGUA'}
    else
    { attackEnemy = 'TIERRA'}
}
function printMessage()                     // PRINT MESSAGE (ROUNDS)
{
    let sectionMessages = document.getElementById('messages')
    let parrafo = document.createElement("p")                   //paragraph creation

    parrafo.innerHTML = 'Tu mascota atacó con ' + attackPlayer + ' y la mascota enemiga atacó con ' + attackEnemy + ' - ' + attackResult + '.' //paragraph content insertion
    sectionMessages.appendChild(parrafo)                        //paragraph insertion to <section id='messages'>
}
function victoryOrDefeat()                  // CHECK PLAYERS LIVES 
{
    if (healthPlayer == 0)
    {
        printMessageFinal("DERROTA!")
    }
    else if (healthEnemy == 0)
    {
        printMessageFinal("VICTORIA!")
    }
}
function printMessageFinal(finalResult)     // PRINT MESSAGE (FINAL)
{
    let sectionMessages = document.getElementById('messages')
    let parrafo = document.createElement("p")

    parrafo.innerHTML = finalResult
    sectionMessages.appendChild(parrafo)

    // BUTTONS DISABLED AFTER GAME IS OVER
    let buttonFire = document.getElementById('boton-fuego')
    let buttonWater = document.getElementById('boton-agua')
    let buttonEarth = document.getElementById('boton-tierra')
    
    buttonFire.disabled = true
    buttonWater.disabled = true
    buttonEarth.disabled = true
}
function restartGame()
{
    location.reload()
}

function randomNum(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', startGame)