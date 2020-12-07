

//NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

var ya_repitio=false;

function repetirAhorcado(){
    console.log("entro ac´!")
    unsetModal()
    reloadTema()
}

function reloadTema(){
    console.log("entro a reload tema!");
    cerrarModal();
    prerenderView()
    //renderView(url,actual_tema)
}

function cambiarVariable(){
    ya_repitio=true;
}

function clickSiguienteRom1(){
    console.log("ingresar al primer rompecabezas")
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setRompecabezas1()
}

function clickSiguienteRom2(){
    console.log("ingresar al segundo rompecabezas")
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setRompecabezas2()
}

function clickSiguienteRom3(){
    console.log("ingresar al tercer rompecabezas")
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setRompecabezas3()
}

function clickSiguienteFra1(){
    console.log("ingresar al primer frase")
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setFrase1()
}

function clickSiguienteFra2(){
    console.log("ingresar al segunda frase")
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setFrase2()
}

function clickSiguienteFra3(){
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setEleFrase3()
}

function clickAntesSopa2(){
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setAntesSopa1()
}


function clickSiguienteSopa2(){
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setSopa2()
}

function clickSiguienteAhorca1(){
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    setAhorca1()
}

function clickSiguienteAhorcaHace2(){
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    unsetModal({callback:function(){
        if(actual_tema.tipo=='video'){
            spdClickPlayStopTimeline(getI('spd_playstop_btn'))            
        }
    }})
    setAhorcaHace2()
}

function clickSiguienteAhorca3(){
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    if(getI('modal').className=="modal_on"){
    	unsetModal({callback:function(){
	        if(actual_tema.tipo=='video'){
	            spdClickPlayStopTimeline(getI('spd_playstop_btn'))            
	        }
	    }})
    }
    setAhorca3()
}

function clickSiguienteFinal(){
    if(actual_tema=='video'){
        spdClearAnimationTimeline()
        spdRemoveTimeline()
    }
    if(getI('modal').className=="modal_on"){
    	unsetModal({callback:function(){
	        /*if(actual_tema.tipo=='video'){
	            spdClickPlayStopTimeline(getI('spd_playstop_btn'))            
	        }*/
	    }})
    }
    desbloquearSiguiente()
	nextTema()
}