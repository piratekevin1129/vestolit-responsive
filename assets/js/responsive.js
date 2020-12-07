window.onresize = function(){
    if(!set_height){
        resizeContainer()
    }
}
var is_responsive = false
function resizeContainer(){
    var ancho = getI('container').offsetWidth
    var alto = window.innerHeight

    var nuevo_alto = 0
    var new_height = 0
    var new_height1 = 0

    if(ancho>1023){
        nuevo_alto = (ancho*56.25)/100
        new_height = Math.floor(nuevo_alto*10)/10
        new_height2 = (new_height-65)
        
        getI('menu_wrapper').style.maxHeight = new_height2+'px'
    }else if(ancho>=768&&ancho<=1023){
        nuevo_alto = (ancho*56.25)/100
        new_height = Math.floor(nuevo_alto*10)/10
        new_height1 = (new_height+30)//30 de la linea de tiempo
        new_height2 = (new_height-2)
                
        console.log("fit")
        getI('main').style.height = new_height1+'px'
        getI('menu_wrapper').style.maxHeight = new_height2+'px'
    }else if(ancho>=530&&ancho<768){
        is_responsive = true
    	nuevo_alto = (ancho*56.25)/100
        new_height = Math.floor(nuevo_alto*10)/10
        new_height1 = (new_height+30)//30 de la linea de tiempo
        new_height2 = (new_height-2)

    	console.log("fit2")
        getI('main').style.height = new_height1+'px'
        getI('menu_wrapper').style.maxHeight = new_height2+'px'
    }else if(ancho>=230&&ancho<530){
        is_responsive = true
    	nuevo_alto = (ancho*56.25)/100
        new_height = Math.floor(nuevo_alto*10)/10
        new_height1 = (new_height+70)//30 de la linea de tiempo y 40 del cc
        new_height2 = (new_height-2)

    	console.log("fit3")
        getI('main').style.height = new_height1+'px'
        //getI('menu_wrapper').style.maxHeight = new_height2+'px'
    }else{
        //menor a 230
        nuevo_alto = (ancho*56.25)/100
        new_height = Math.floor(nuevo_alto*10)/10
        new_height1 = (new_height+52)
        new_height2 = (new_height-2)

    	//console.log("normal")
    	getI('main').removeAttribute('style')
        getI('menu_wrapper').removeAttribute('style')
    }
}

var set_height = false
function setAlto(data){
    set_height = true
    getI('main').style.height = data.height+'px'
}
function setDefaultAlto(){
    set_height = false
    resizeContainer()
}

// Listen for orientation changes
animacion_orientacion = null
window.addEventListener("orientationchange", function() {
    //Announce the new orientation number
    //alert(window.orientation);

    //alert("resize")
    if(animacion_orientacion!=null){
        clearTimeout(animacion_orientacion)
        animacion_orientacion = null
    }

    animacion_orientacion = setTimeout(function(){
        clearTimeout(animacion_orientacion)
        animacion_orientacion = null
        resizeContainer()
    },500)
}, false);
resizeContainer()