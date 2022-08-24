const pets = [ "Hipoperro", "Capipepo", "Ratigueya", "Langosucio", "Tucanazo", 'Pedos' ]
let attackPlayer
let attackEnemy
let attackResult

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
    {attackResult = 'GANASTE'}
    else
    {attackResult = 'PERDISTE'}

    printMessage() 
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
    alert('Tu mascota atacó con ' + attackPlayer + ' y la mascota enemiga atacó con ' + attackEnemy + ' - ' + attackResult + '.')
}
function randomNum(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', startGame)