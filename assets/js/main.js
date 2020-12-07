var i = 0
var j = 0
var k = 0

function overHelper(btn){
    if(!is_responsive){
        var parent = btn.parentNode
        if(parent.className.indexOf('locked')==-1){
            var label = parent.getElementsByTagName('p')[0]
            label.className = 'helper_p_on'
        }
    }
}
function outHelper(btn){
    if(!is_responsive){
        var parent = btn.parentNode
        if(parent.className.indexOf('locked')==-1){
            var label = parent.getElementsByTagName('p')[0]
            label.className = 'helper_p_off'
        }
    }
}
function clickMenu(btn){
    if(btn==null){
        btn = getI('menu_btn')
    }
    var clase = btn.className
    if(clase.indexOf('open')!=-1){
        btn.classList.remove('menu_btn_open')
        btn.classList.add('menu_btn_close')
        menu_wrapper.className = "menu_wrapper_on"
        getI('menu_txt').innerHTML = 'MENÚ ▲'

        //desplegar acordeones
        collapseAllAcordeon1()
        collapseAllAcordeon2()
        if(navegacion[actual_nivel].nivel=='tema'){
            
        }else if(navegacion[actual_nivel].nivel=='subtemas'){
            abrirAcordeonTema(navegacion[actual_nivel].t)
        }else if(navegacion[actual_nivel].nivel=='submodulos'){
            abrirAcordeonTema(navegacion[actual_nivel].t)
            abrirAcordeonSubtema(navegacion[actual_nivel].t,navegacion[actual_nivel].s)
        }
    }else{
        getI('menu_txt').innerHTML = 'MENÚ ▼'
        btn.classList.remove('menu_btn_close')
        btn.classList.add('menu_btn_open')
        menu_wrapper.className = "menu_wrapper_off"
    }
}
function closeMenu(){
    var btn = getI('menu_btn')
    btn.className = 'menu_btn_open'
    menu_wrapper.className = "menu_wrapper_off"
}

var actual_acordeon1 = null
var actual_acordeon_section1 = null
function clickAcordeonTema(t){
    var accordion = getI('acordeon_tema_'+t)
    var btn = getI('tema_'+t+'_btn')
    var section = btn.getElementsByTagName('section')[0]
    var clase = accordion.className

    if(clase.indexOf('off')!=-1){
        //alert("abrir")
        //mirar si ya hay uno abierto y si lo hay, cerrar
        if(actual_acordeon1!=null){
            actual_acordeon1.classList.remove('menu_subtemas_on')
            actual_acordeon1.classList.add('menu_subtemas_off')
            actual_acordeon_section1.style.transform = 'rotate(0deg)'
            actual_acordeon_section1.style.webkitTransform = 'rotate(0deg)'
            actual_acordeon_section1.style.oTransform = 'rotate(0deg)'
        }

        //abrir el que se clickeo
        accordion.classList.remove('menu_subtemas_off')
        accordion.classList.add('menu_subtemas_on')
        section.style.transform = 'rotate(180deg)'
        section.style.webkitTransform = 'rotate(180deg)'
        section.style.oTransform = 'rotate(180deg)'

        actual_acordeon1 = accordion
        actual_acordeon_section1 = section
    }else{
        //alert("cerrar")
        accordion.classList.remove('menu_subtemas_on')
        accordion.classList.add('menu_subtemas_off')
        section.style.transform = 'rotate(0deg)'
        section.style.webkitTransform = 'rotate(0deg)'
        section.style.oTransform = 'rotate(0deg)'

        actual_acordeon1 = null
        actual_acordeon_section1 = null
    }
}
function abrirAcordeonTema(t){
    var accordion = getI('acordeon_tema_'+t)
    var btn = getI('tema_'+t+'_btn')
    var section = btn.getElementsByTagName('section')[0]

    //abrir el clickeado
    accordion.classList.remove('menu_subtemas_off')
    accordion.classList.add('menu_subtemas_on')
    section.style.transform = 'rotate(180deg)'
    section.style.webkitTransform = 'rotate(180deg)'
    section.style.oTransform = 'rotate(180deg)'

    actual_acordeon1 = accordion
    actual_acordeon_section1 = section
        
}

var actual_acordeon = null
var actual_acordeon_section = null
function clickAcordeonSubtema(t,s){
    var accordion = getI('acordeon_subtema_'+t+'_'+s)
    var btn = getI('subtema_'+t+'_'+s+'_btn')
    var section = btn.getElementsByTagName('section')[0]
    var clase = accordion.className

    if(clase.indexOf('off')!=-1){
        //cerrar el actual si hay
        if(actual_acordeon!=null){
            actual_acordeon.classList.remove('menu_submodulos_on')
            actual_acordeon.classList.add('menu_submodulos_off')
            actual_acordeon_section.style.transform = 'rotate(0deg)'
            actual_acordeon_section.style.webkitTransform = 'rotate(0deg)'
            actual_acordeon_section.style.oTransform = 'rotate(0deg)'
        }

        //abrir el que se clickeó
        accordion.classList.remove('menu_submodulos_off')
        accordion.classList.add('menu_submodulos_on')
        section.style.transform = 'rotate(180deg)'
        section.style.webkitTransform = 'rotate(180deg)'
        section.style.oTransform = 'rotate(180deg)'

        actual_acordeon = accordion
        actual_acordeon_section = section
    }else{
        //cerrar
        accordion.classList.remove('menu_submodulos_on')
        accordion.classList.add('menu_submodulos_off')
        section.style.transform = 'rotate(0deg)'
        section.style.webkitTransform = 'rotate(0deg)'
        section.style.oTransform = 'rotate(0deg)'

        actual_acordeon = null
        actual_acordeon_section = null
    }
}
function abrirAcordeonSubtema(t,s){
    var accordion = getI('acordeon_subtema_'+t+'_'+s)
    var btn = getI('subtema_'+t+'_'+s+'_btn')
    var section = btn.getElementsByTagName('section')[0]

    //abrir el que se clickeó
    accordion.classList.remove('menu_submodulos_off')
    accordion.classList.add('menu_submodulos_on')
    section.style.transform = 'rotate(180deg)'
    section.style.webkitTransform = 'rotate(180deg)'
    section.style.oTransform = 'rotate(180deg)'

    actual_acordeon = accordion
    actual_acordeon_section = section
}

function collapseAllAcordeon1(){
    var acordeones_1 = menu_wrapper.getElementsByClassName('menu_subtemas')
    for(i = 0;i<acordeones_1.length;i++){
        acordeones_1[i].classList.remove('menu_subtemas_on')
        acordeones_1[i].classList.remove('menu_subtemas_off')
        acordeones_1[i].classList.add('menu_subtemas_off')
    }
}
function collapseAllAcordeon2(){
    var acordeones_2 = menu_wrapper.getElementsByClassName('menu_submodulos')
    for(i = 0;i<acordeones_2.length;i++){
        acordeones_2[i].classList.remove('menu_submodulos_on')
        acordeones_2[i].classList.remove('menu_submodulos_off')
        acordeones_2[i].classList.add('menu_submodulos_off')
    }
}

function clickSiguiente(){
    if(navegacion[(actual_nivel+1)].bloqueado==false){
        nextTema()
    }else{
        setModal({content:_contenido_bloqueado_,value:'Continuar'})
    }
    
}
function clickAnterior(){
    prevTema()
}

function setWelcomePage(){
    renderView('welcome_page',{tipo:'html'})
}

var menu_wrapper = getI('menu_wrapper')
function createMenu(){
    var html = ""
    
    for(i = 0;i<menu_data.length;i++){
        var tema_div = document.createElement('div')
        tema_div.className = 'menu_tema'
        tema_div.id = 'tema_'+i+'_btn'
        html = ''
        if(menu_data[i].icon!=null&&menu_data[i].icon!=undefined){
            html+='<p class="menu_tema_p_icon">'+menu_data[i].nombre+'</p>'
            html+='<span class="menu_icon_'+menu_data[i].icon+'"></span>'
        }else{
            html+='<p>'+menu_data[i].nombre+'</p>'
        }
        if(menu_data[i].tipo=='subtemas'){
            html+='<section></section>'
            tema_div.setAttribute('onclick','clickAcordeonTema('+i+')')
            tema_div.classList.add('menu_tema_subtemas')
        }else{
            tema_div.setAttribute('onclick','clickTema('+i+')')
            var obj = getObject2(i,-1,-1)
            if(navegacion[obj].bloqueado){
                tema_div.classList.add('menu_locked')
            }
        }
        
        tema_div.innerHTML = html
        menu_wrapper.appendChild(tema_div)

        
        if(menu_data[i].tipo=='subtemas'){
            var html2 = ""
            var acordeon_subtemas = document.createElement('div')
            acordeon_subtemas.id = 'acordeon_tema_'+i
            acordeon_subtemas.className = 'menu_subtemas menu_subtemas_off'

            for(j = 0;j<menu_data[i].subtemas.length;j++){
                var subtema_div = document.createElement('div')
                subtema_div.className = 'menu_subtema'
                subtema_div.id = 'subtema_'+i+'_'+j+'_btn'
                html2 = ''
                if(menu_data[i].subtemas[j].icon!=null&&menu_data[i].subtemas[j].icon!=undefined){
                    html2+='<p class="menu_subtema_p_icon">'+menu_data[i].subtemas[j].nombre+'</p>'
                    html2+='<span class="menu_icon_'+menu_data[i].subtemas[j].icon+'"></span>'
                }else{
                    html2+='<p>'+menu_data[i].subtemas[j].nombre+'</p>'
                }
                if(menu_data[i].subtemas[j].tipo=="submodulos"){
                    html2+='<section></section>'
                    subtema_div.setAttribute('onclick','clickAcordeonSubtema('+i+','+j+')')
                    subtema_div.classList.add('menu_subtema_submodulos')
                }else{
                    subtema_div.setAttribute('onclick','clickSubtema('+i+','+j+')')
                    var obj2 = getObject2(i,j,-1)
                    if(navegacion[obj2].bloqueado){
                        subtema_div.classList.add('menu_locked')
                    }
                }
                
                subtema_div.innerHTML = html2
                acordeon_subtemas.appendChild(subtema_div)


                if(menu_data[i].subtemas[j].tipo=="submodulos"){
                    var html3 = ""
                    var acordeon_submodulos = document.createElement('div')
                    acordeon_submodulos.id = 'acordeon_subtema_'+i+'_'+j
                    acordeon_submodulos.className = 'menu_submodulos menu_submodulos_off'

                    for(k = 0;k<menu_data[i].subtemas[j].submodulos.length;k++){
                        var submodulo_div = document.createElement('div')
                        submodulo_div.className = 'menu_submodulo'
                        submodulo_div.id = 'submodulo_'+i+'_'+j+'_'+k+'_btn'
                        html3 = ''
                        if(menu_data[i].subtemas[j].submodulos[k].icon!=null&&menu_data[i].subtemas[j].submodulos[k].icon!=undefined){
                            html3+='<p class="menu_submodulo_p_icon">'+menu_data[i].subtemas[j].submodulos[k].nombre+'</p>'
                            html3+='<span class="menu_icon_'+menu_data[i].subtemas[j].submodulos[k].icon+'"></span>'
                        }else{
                            html3+='<p>'+menu_data[i].subtemas[j].submodulos[k].nombre+'</p>'
                        }
                        //click btn
                        submodulo_div.setAttribute('onclick','clickSubmodulo('+i+','+j+','+k+')')
                        var obj3 = getObject2(i,j,k)
                        if(navegacion[obj3].bloqueado){
                            submodulo_div.classList.add('menu_locked')
                        }
                        submodulo_div.innerHTML = html3
                        acordeon_submodulos.appendChild(submodulo_div)
                    }
                    acordeon_subtemas.appendChild(acordeon_submodulos)
                }
            }
            menu_wrapper.appendChild(acordeon_subtemas)
        }
    }
}
function updateMenu(obj_visto,obj_desbloquea){
    if(obj_desbloquea.nivel=='tema'){
        var tema_div = getI('tema_'+obj_desbloquea.t+'_btn')
        tema_div.classList.remove('menu_locked')
    }else if(obj_desbloquea.nivel=='subtemas'){
        var subtema_div = getI('subtema_'+obj_desbloquea.t+'_'+obj_desbloquea.s+'_btn')
        subtema_div.classList.remove('menu_locked')
    }else if(obj_desbloquea.nivel=='submodulos'){
        var submodulo_div = getI('submodulo_'+obj_desbloquea.t+'_'+obj_desbloquea.s+'_'+obj_desbloquea.m+'_btn')
        submodulo_div.classList.remove('menu_locked')
    }

    if(obj_visto!=null){
        if(obj_visto.nivel=='tema'){
            var tema_div = getI('tema_'+obj_visto.t+'_btn')
            var clase_tema = tema_div.className
            if(clase_tema.indexOf('visto')==-1){
                tema_div.classList.add('menu_visto')
            }
        }else if(obj_visto.nivel=='subtemas'){
            var subtema_div = getI('subtema_'+obj_visto.t+'_'+obj_visto.s+'_btn')
            var clase_subtema = subtema_div.className
            if(clase_subtema.indexOf('visto')==-1){
                subtema_div.classList.add('menu_visto')
            }
            subtema_div.classList.remove('menu_locked')
        }else if(obj_visto.nivel=='submodulos'){
            var submodulo_div = getI('submodulo_'+obj_visto.t+'_'+obj_visto.s+'_'+obj_visto.m+'_btn')
            var clase_submodulo = submodulo_div.className
            if(clase_submodulo.indexOf('visto')==-1){
                submodulo_div.classList.add('menu_visto')
            }
        }
    }else{
        //la unica razon por la que entra aqui es porque es el primero, entonces no hay nada que poner en visto
    }

}

var navegacion = []
function createNavegacion(){
    var locked = true
    var seen = false
    if(restrict=='normal'){
        locked = false
        seen = false
    }else if(restrict=='no'){
        locked = false
        seen = true
    }
    for(i = 0;i<menu_data.length;i++){
        if(menu_data[i].tipo=="subtemas"){
            for(j = 0;j<menu_data[i].subtemas.length;j++){
                if(menu_data[i].subtemas[j].tipo=="submodulos"){
                    for(k = 0;k<menu_data[i].subtemas[j].submodulos.length;k++){
                        navegacion.push({visto:seen,bloqueado:locked,nivel:'submodulos',t:i,s:j,m:k})    
                    }
                }else{
                    navegacion.push({visto:seen,bloqueado:locked,nivel:'subtemas',t:i,s:j,m:-1})
                }
            }
        }else{
            navegacion.push({visto:seen,bloqueado:locked,nivel:'tema',t:i,s:-1,m:-1})
        }
    }
    //console.log(navegacion)
}

var tema = 0
var subtema = 0
var submodulo = 0

var actual_nivel = -1
var actual_btn = null
var actual_tema = {}

function clickTema(t){
    var obj = getObject2(t,-1,-1)
    if(navegacion[obj].bloqueado){
        setModal({content:_contenido_bloqueado_,value:'Continuar'})
    }else{
        actual_nivel = obj
        prerenderView()
    }
}

function clickSubtema(t,s){
    var obj = getObject2(t,s,-1)
    if(navegacion[obj].bloqueado){
        setModal({content:_contenido_bloqueado_,value:'Continuar'})
    }else{
        actual_nivel = obj
        prerenderView()
    }
}

function clickSubmodulo(t,s,m){
    var obj = getObject2(t,s,m)
    if(navegacion[obj].bloqueado){
        setModal({content:_contenido_bloqueado_,value:'Continuar'})
    }else{
        actual_nivel = obj
        prerenderView()
    }
}

function setVisto(){
    navegacion[actual_nivel].visto = true
}
function desbloquearSiguiente(){
    //console.log("actual_nivel: "+actual_nivel)
    //console.log("navegacion.length: "+navegacion.length)
    if((actual_nivel+1)>=navegacion.length){
        //alert("ya estamos en el último")
        setModal({icono:'icon_info',content:_final_mensaje_})
    }else{
        navegacion[(actual_nivel+1)].bloqueado = false
        updateMenu(navegacion[(actual_nivel)],navegacion[(actual_nivel+1)])
    }
}

function nextTema(){
    
    if((actual_nivel+1)==0){
        //document.getElementById("anterior_btn").style.display = "none"
        //getI('anterior_btn').style.visibility = 'hidden'
        getI('anterior_btn').className = 'helper helper-locked'
    }else {
        //document.getElementById("anterior_btn").style.display = "block"
        //getI('anterior_btn').style.visibility = 'inherit'
        getI('anterior_btn').className = 'helper'
    }

    if((actual_nivel+1)==(navegacion.length-1)){
        //document.getElementById("siguiente_btn").style.display = "none"
        //getI('siguiente_btn').style.visibility = 'hidden'
        getI('siguiente_btn').className = 'helper helper-locked'
    }else {
        //document.getElementById("siguiente_btn").style.display = "block"
        //getI('siguiente_btn').style.visibility = 'inherit'
        getI('siguiente_btn').className = 'helper'
    }
    
    if((actual_nivel+1)>=navegacion.length){
        setModal({icono:'icon_info',content:_final_mensaje_})
        //alert("fin de todo")
    }else{
        guardarScorm()
        actual_nivel++
        prerenderView()
    }
}

function prevTema(){
    if((actual_nivel-1)<0){
        //alert("principio de todo")
    }else{
        actual_nivel--
        prerenderView()
    }
}

function getObject(pos){
    var obj = {}
    if(navegacion[pos].nivel=='tema'){
        obj = menu_data[navegacion[pos].t]
    }else if(navegacion[pos].nivel=='subtemas'){
        obj = menu_data[navegacion[pos].t].subtemas[navegacion[pos].s]
    }else if(navegacion[pos].nivel=='submodulos'){
        obj = menu_data[navegacion[pos].t].subtemas[navegacion[pos].s].submodulos[navegacion[pos].m]
    }
    return obj
}

function getObject2(ii,jj,kk){
    var ind = -1
    for(var p = 0;p<navegacion.length;p++){
        if(navegacion[p].t==ii&&navegacion[p].s==jj&&navegacion[p].m==kk){
            ind = p
        }
    }
    return ind    
}

function prerenderView(){
    var url = ''
    var titulo = ''

    actual_tema = getObject(actual_nivel)
    var t = navegacion[actual_nivel].t
    var s = navegacion[actual_nivel].s
    var m = navegacion[actual_nivel].m
    
    if(navegacion[actual_nivel].bloqueado){
        setModal({content:_contenido_bloqueado_,value:'Continuar'})
    }else{
        if(actual_btn!=null){
            actual_btn.classList.remove('menu_selected')
        }

        if(navegacion[actual_nivel].nivel=='tema'){
            actual_btn = getI('tema_'+t+'_btn')
            url = menu_data[t].carpeta
            titulo = menu_data[t].nombre
        }else if(navegacion[actual_nivel].nivel=='subtemas'){
            actual_btn = getI('subtema_'+t+'_'+s+'_btn')
            url = menu_data[t].carpeta+'/'+menu_data[t].subtemas[s].carpeta
            titulo = menu_data[t].nombre+'<i></i>'+menu_data[t].subtemas[s].nombre
        }else if(navegacion[actual_nivel].nivel=='submodulos'){
            actual_btn = getI('submodulo_'+t+'_'+s+'_'+m+'_btn')
            url = menu_data[t].carpeta+'/'+menu_data[t].subtemas[s].carpeta+'/'+menu_data[t].subtemas[s].submodulos[m].carpeta
            titulo = menu_data[t].nombre+'<i></i>'+menu_data[t].subtemas[s].nombre+'<i></i>'+menu_data[t].subtemas[s].submodulos[m].nombre
        }

        setCargador({callback:function(){
            //poner selected
            actual_btn.classList.add('menu_selected')
            
            //set breadcrumb
            getI('breadcrumbs_txt').innerHTML = titulo
            closeMenu()

            clearView()
            renderView(url,actual_tema)
        }})
    }

    if((actual_nivel)==0){
        //document.getElementById("anterior_btn").style.display = "none"
        //getI('anterior_btn').style.visibility = 'hidden'
        getI('anterior_btn').className = 'helper helper-locked'
    }else {
        //document.getElementById("anterior_btn").style.display = "block"
        //getI('anterior_btn').style.visibility = 'inherit'
        getI('anterior_btn').className = 'helper'
    }

    if((actual_nivel)==(navegacion.length-1)){
        //document.getElementById("siguiente_btn").style.display = "none"
        //getI('siguiente_btn').style.visibility = 'hidden'
        getI('siguiente_btn').className = 'helper helper-locked'
    }else {
        //document.getElementById("siguiente_btn").style.display = "block"
        //getI('siguiente_btn').style.visibility = 'inherit'
        getI('siguiente_btn').className = 'helper'
    }
}

function setFinaliza(){
    console.log("clic_en finaliza_deberia mostrar");
    //franja1.className = 'tra_escena_franja1_on'
    //franja2.className = 'tra_escena_franja2_on'
    spdPlayMovieclip({frame:1,stop:0,loop:false},0)

    var acambiar=document.getElementById('bos_instrucciones_cont')
    acambiar.classList.remove('instru_off');
    acambiar.classList.add('instru_on');
    acambiar.style.display = 'block'
}

function llamarahorasi(){
    var scambiar=document.getElementById('bos_instrucciones')
    scambiar.style.visibility='collapse';
    scambiar.style.display='none';
    /*var ecambiar=document.getElementById('bos_instrucciones_cont')
    ecambiar.classList.remove('instru_on');
    ecambiar.classList.add('instru_off');
    ecambiar.style.visibility='collapse';
    ecambiar.style.display='none';*/
}

function finalizarScorm(){
    guardarScorm(true)
}