function hideMenu(){
    //getI('menu_btn').style.display = 'none'
    getI('menu_txt').style.display = 'none'
}
function showMenu(){
    //getI('menu_btn').style.display = 'block'
    getI('menu_txt').style.display = 'flex'
}

function hideHelpers(){
    getI('helpers').style.display = 'none'
    /*getI('siguiente_btn').style.display = 'none'
    getI('anterior_btn').style.display = 'none'
    getI('documentos_btn').style.display = 'none'*/
}
function showHelpers(){
    getI('helpers').style.display = 'flex'
    /*getI('siguiente_btn').style.display = 'block'
    getI('anterior_btn').style.display = 'block'
    getI('documentos_btn').style.display = 'none'*/
}

function clickDocumentos(){
    var html = ''
    html+='<h1>Documentos de apoyo</h1>'
    html+='<br />'
    html+='<div id="documentos_box">'
        for(i = 0;i<documentos_data.length;i++){
            html+='<a href="docs/'+documentos_data[i].url+'" target="_blank">'
                html+='<div class="doc_icon_'+documentos_data[i].icon+'">'+documentos_data[i].nombre+'</div>'
            html+='</a>'
        }
    html+='</div>'
    setModal({content:html,value:'cerrar',action:'unsetModal',width:500})
}

function getI(idname){
    return document.getElementById(idname)
}

var path = 'anims/'
var i_frame = getI('i_frame')
var video_cont = getI('video_cont')
var video_vid = getI('video_vid')
var i_frame2 = getI('i_frame2')


function renderView(src,data){
    i_frame.src = ''
    i_frame2.src = ''
    video_vid.src = ''

    var url = path+src+'/'
    
    if(data.tipo=="html"){
        setDefaultAlto()
        i_frame.style.display = 'block'
        video_cont.style.display = 'none'
        i_frame2.style.display = 'none'

        i_frame.onload = function() { 
            i_frame.onload = null
            unsetCargador({callback:function(){
                if(data.autocomplete!=null&&data.autocomplete!=undefined){
                    if(data.autocomplete==true){
                        setVisto()
                        desbloquearSiguiente()
                    }
                }
            }})
        }
        i_frame.src = url+'index.html'
        i_frame.setAttribute('width','100%')
        i_frame.setAttribute('height','100%')
    }else{
        setDefaultAlto()
        i_frame.style.display = 'none'
        video_cont.style.display = 'block'
        i_frame2.style.display = 'none'

        if (/iPad|iPhone|iPod/.test(navigator.userAgent)){
            //alert("es iphone")
            //video_vid.controls = true
            //video_vid.autoplay = true
            //unsetCargador({})
        }else{
            //video_vid.controls = false
            //video_vid.autoplay = false
        }
        
        video_vid.addEventListener('loadedmetadata', loadedDataVideo, false);
        //video_vid.addEventListener('loadeddata', loadedDataVideo, false);
        video_vid.addEventListener('error', errorDataVideo, false);
        
        //video_vid.onloadeddata = function(){
        function loadedDataVideo(e){
            video_vid.controls = false
            //video_vid.onloadeddata = null
            video_vid.removeEventListener('loadedmetadata', loadedDataVideo, false);
            //video_vid.removeEventListener('loadeddata', loadedDataVideo, false);
            video_vid.removeEventListener('error', errorDataVideo, false);
            unsetCargador({})

            if(data.cc!=null&&cc!=undefined){
                if(data.cc){
                    ////funciones de cc
                    setVideoFunctionsCC(url)
                }else{
                    setVideoFunctions(url)
                }
            }else{
                setVideoFunctions(url)
            }

            //video_vid.play()
        }

        video_vid.onended = function(){
            video_vid.onended = null
            video_vid.onerror = null
            spdClearAnimationTimeline()
            spdRemoveTimeline()

            setVisto()
            desbloquearSiguiente()
            nextTema()
        }

        function errorDataVideo(e){
        //video_vid.onerror = function(){
            video_vid.removeEventListener('loadeddata', loadedDataVideo, false);
            video_vid.removeEventListener('error', errorDataVideo, false);
            video_vid.onended = null
            console.log("error carregando video: "+url+'video.webm')
        }
        if(data.format!=null&&data.format!=undefined){
            video_vid.src = url+'video.'+data.format
        }else{
            video_vid.src = url+'video.webm'
        }
    }
}

function clearView(){
    i_frame.src = ''
    i_frame.onload = null

    spdClearAnimationTimeline()
    spdRemoveTimeline()
    video_vid.onloadeddata = null
    video_vid.onended = null
    video_vid.onerror = null
    video_vid.src = ''    
}

var animacion_cargador = null
function setCargador(data){
    if(data.text!=null&&data.text!=undefined){
        getI('cargador_txt').innerHTML = data.text
    }
    getI('cargador').className = 'cargador_on'
    animacion_cargador = setTimeout(function(){
        clearTimeout(animacion_cargador)
        animacion_cargador = null
        if(data.callback!=null&&data.callback!=undefined){
            data.callback()
        }
    },300)
    
}

function unsetCargador(data){
    getI('cargador').className = 'cargador_off'
    animacion_cargador = setTimeout(function(){
        clearTimeout(animacion_cargador)
        animacion_cargador = null
        if(data.callback!=null&&data.callback!=undefined){
            data.callback()
        }
    },300)
}

var animacion_modal = null
function setModal(data){
    if(data.icono!=null&&data.icono!=undefined){
        getI('modal_icon').className = data.icono
        getI('modal_icon').style.display = 'block'
    }else{
        getI('modal_icon').style.display = 'none'
    }

    getI('modal_content').innerHTML = data.content;
    
    if(data.action!=null&&data.action!=undefined){
        getI('modal_btn').setAttribute('onclick',data.action+'()')
    }else {
        
        getI('modal_btn').setAttribute('onclick','cerrarModal()')
    }

    if(data.value!=null&&data.value!=undefined){
        getI('modal_btn').innerHTML = data.value
    }

    if(data.width!=null&&data.width!=undefined){
        getI('modal_box').style.width = data.width+'px'
    }else{
        getI('modal_box').style.width = '400px'
    }

    //NUEVO - Para left y rigth - top o botom

    if(data.left!=null&&data.left!=undefined){
        getI('modal_box').style.left = data.left+'%'
        if(data.left=="15"){
            var bgColor = "rgba(0,0,0,0)";
            getI('modal').style.backgroundColor = bgColor;
        }else{
            var bgColor = "rgba(0,0,0,0.5)";
            getI('modal').style.backgroundColor = bgColor;
        }
    }else{
        var bgColor = "rgba(0,0,0,0.5)";
        getI('modal_box').style.left = '0%'
        getI('modal').style.backgroundColor = bgColor;
    }

    if(data.top!=null&&data.top!=undefined){
        getI('modal_box').style.top = data.top+'%'
    }else{
        getI('modal_box').style.top = '0%'
    }


    //--------------------------------------------------

    getI('modal').className = 'modal_on'

    //detener video
    if(actual_tema.tipo=='video'){
        if(!spd_paused){
            spdClickPlayStopTimeline(getI('spd_playstop_btn'))
        }
    }
}

function cerrarModal(){
    unsetModal({callback:function(){
        if(actual_tema.tipo=='video'){
            spdClickPlayStopTimeline(getI('spd_playstop_btn'))            
        }
    }})
}

function unsetModal(data){
    getI('modal').className = 'modal_off'
    animacion_modal = setTimeout(function(){
        clearTimeout(animacion_modal)
        animacion_modal = null

        if(data!=null&&data!=undefined){
            if(data.callback!=null&&data.callback!=undefined){
                data.callback()
            }
        }
        
    },500)
    
}

function setVideoFunctionsCC(url){
    var links = false
    var linksdata = null
    if(actual_tema!=null){
        if(actual_tema.links!=null&&actual_tema.links!=undefined){
            links = true
            linksdata = actual_tema.linksdata
            console.log("linksdata: "+linksdata)
        }
    }

    //console.log("actual_data.links: "+actual_data.links)
    spdLoadClosedCaption({url:url+'cc.json',autoplay:'off',
        callBack:function(){
            spdCreateTimeline('timeline',getI('video_vid'),{autoplay:'on',controls:'on',cc:true,ccname:'cc_txt',links:links,linksdata:linksdata})
            spdPlayClosedCaption({audio:'off',franja_name:'cc_txt',avatar_name:null})
        },
        Error:function(){
            getI('cc').className = "cc_off"
            spdCreateTimeline('timeline',getI('video_vid'),{autoplay:'on',controls:'on',cc:false,ccname:'cc_txt',links:links,linksdata:linksdata})
        }
    })
}

function setVideoFunctions(){
    var links = false
    var linksdata = null
    if(actual_tema!=null){
        if(actual_tema.links!=null&&actual_tema.links!=undefined){
            links = true
            linksdata = actual_tema.linksdata
        }
    }
    
    getI('cc').className = "cc_off"
    spdCreateTimeline('timeline',getI('video_vid'),{autoplay:'on',controls:'on',cc:false,ccname:'cc_txt',links:links,linksdata:linksdata})
}