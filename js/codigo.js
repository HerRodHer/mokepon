const mascotas = [ "Hipoperro", "Capipepo", "Ratigueya", "Langosucio", "Tucanazo", 'Pedos' ]

function iniciarJuego()
{
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador()
{
    let inputHipoperro = document.getElementById('hipoperro')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let inputLangosucio = document.getElementById('langosucio')
    let inputTucanazo = document.getElementById('tucanazo')
    let inputPedos = document.getElementById('pedos')

    let mascotaSeleccionada = "Ninguna"
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    const inputs = [ inputHipoperro, inputCapipepo, inputRatigueya, inputLangosucio, inputTucanazo, inputPedos ]

    for (i = 0; i < mascotas.length; i++)
    {
        if (inputs[i].checked)
        {
            mascotaSeleccionada = mascotas[i]
            spanMascotaJugador.innerHTML = mascotaSeleccionada
            seleccionarMascotaEnemigo()
            break
        }
    }
    if (mascotaSeleccionada == "Ninguna")
    {
        alert("Selecciona una mascota, por favor")
        return 1;
    }  
}

function seleccionarMascotaEnemigo()
{
    let mascotaAleatoria = aleatorio(1,6)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
    spanMascotaEnemigo.innerHTML = mascotas[mascotaAleatoria - 1]
}

function aleatorio(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', iniciarJuego)