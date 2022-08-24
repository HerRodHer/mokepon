const pets = [ "Hipoperro", "Capipepo", "Ratigueya", "Langosucio", "Tucanazo", 'Pedos' ]
let attackPlayer
let attackEnemy
let attackResult
let healthPlayer = 3
let healthEnemy = 3

function startGame()
{
    let buttonPetPlayer = document.getElementById('boton-mascota')
    buttonPetPlayer.addEventListener('click', selectPetPlayer)
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
}
function selectPetEnemy()
{
    let randomPet = randomNum(1,6)
    let spanPetEnemy = document.getElementById('mascota-enemigo')
    spanPetEnemy.innerHTML = pets[randomPet - 1]

    //now the 3 elemental attack buttons are activated
    let buttonFire = document.getElementById('boton-fuego')
    let buttonWater = document.getElementById('boton-agua')
    let buttonEarth = document.getElementById('boton-tierra')

    buttonFire.addEventListener('click', attackFire)
    buttonWater.addEventListener('click', attackWater)
    buttonEarth.addEventListener('click', attackEarth)
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
function printMessage()
{
    let sectionMessages = document.getElementById('messages')
    let parrafo = document.createElement("p")                   //paragraph creation

    parrafo.innerHTML = 'Tu mascota atacó con ' + attackPlayer + ' y la mascota enemiga atacó con ' + attackEnemy + ' - ' + attackResult + '.' //paragraph content insertion
    sectionMessages.appendChild(parrafo)                        //paragraph insertion to <section id='messages'>
}
function victoryOrDefeat()      //check players lives for 0  
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
function printMessageFinal(finalResult)
{
    let sectionMessages = document.getElementById('messages')
    let parrafo = document.createElement("p")

    parrafo.innerHTML = finalResult
    sectionMessages.appendChild(parrafo)
}
function randomNum(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', startGame)