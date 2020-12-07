var i = 0
var j = 0

/*var nombre_txt = document.getElementById('nombre_txt')
var documento_txt = document.getElementById('documento_txt')
var correo_txt = document.getElementById('correo_txt')

nombre_txt.value = getNombre()
documento_txt.value = getDocumento()
correo_txt.value = getCorreo()*/

function clickEntrar(){
    /*var nombre = nombre_txt.value
    var documento = documento_txt.value
    var correo = correo_txt.value*/
    //console.log(nombre+"-"+documento+"-"+correo)
    parent.startCourse()
    /*
    if(
        Empty(nombre)||
        Empty(documento)
        //Empty(correo)
    ){
        setError('Por favor digite correctamente todos los campos')
    }else{
        if(!ifNumber(documento)){
            setError('El número de documento está incorrecto')
        }else{
            parent.setNames(nombre,documento,correo)
            //alert("Bien")
            parent.startCourse()
        }
    }*/
}

var animacion_error = null
function setError(msg){
    if(animacion_error!=null){
        clearInterval(animacion_error)
        animacion_error = null
    }
    var msg_error = document.getElementById('man_formulario_error')
    msg_error.className = "man_formulario_error_on"
    msg_error.innerHTML = msg
    animacion_error = setInterval(function(){
        clearInterval(animacion_error)
        animacion_error = null

        msg_error.className = "man_formulario_error_off"
    },3000)
}