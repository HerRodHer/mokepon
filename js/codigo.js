
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

    const inputs = [ inputHipoperro, inputCapipepo, inputRatigueya, inputLangosucio, inputTucanazo, inputPedos ]
    const mascotas = [ "Hipoperro", "Capipepo", "Ratigueya", "Langosucio", "Tucanazo", 'Pedos' ]

    for (i = 0; i < mascotas.length; i++)
    {
        if (inputs[i].checked)
        {
            mascotaSeleccionada = mascotas[i]
            break
        }
    }
    alert("Elegiste a: " + mascotaSeleccionada)

    if (mascotaSeleccionada == "Ninguna")
    {
        alert("Selecciona una mascota, por favor")
    }
}

window.addEventListener('load', iniciarJuego)



/*
    if (inputHipoperro.checked)
        alert('Elegiste a Hipoperro')
    if (inputCapipepo.checked)
        alert('Elegiste a Capipepo')
    if (inputRatigueya.checked)
        alert('Elegiste a Ratigueya')
    if (inputLangosucio.checked)
        alert('Elegiste a Langosucio')
    if (inputTucanazo.checked)
        alert('Elegiste a Tucanazo')
    if (inputPedos.checked)
        alert('Elegiste a Pedos')
*/