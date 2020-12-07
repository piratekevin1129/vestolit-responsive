var json_cc = []

var franja = null
var cc_loaded_errors = 0

function spdLoadClosedCaption(params) {
    var new_url = params.url
    //var url = 'https://www.virtualcolors.com/demos/arus/'+new_url
    var url = new_url
    //alert(url)

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    //xhr.responseType = 'blob';
    xhr.onload = function(e) { 
        if (this.status == 200) {
            var file = new File([this.response], 'temp');
            var fileReader = new FileReader();
            fileReader.addEventListener('load', function(){
                //do stuff with fileReader.result
                //console.log(xhr.responseText)
                cc_loaded_errors = 0
                json_cc = JSON.parse(xhr.responseText);
                if(params.callBack!=null){
                    params.callBack()
                }
            });
            fileReader.readAsText(file);
        }else{
            cc_loaded_errors++
            /*if(cc_loaded_errors==3){
                //definitivamente hay error no lo encontró
                cc_loaded_errors = 0
                params.Error()
            }else{
                //calma calma
            }*/
            cc_loaded_errors = 0
            params.Error()
        }
    }
    xhr.send();
    

    /*var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback 
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode
            //console.log(xobj.responseText)
            cc_loaded_errors = 0
            json_cc = JSON.parse(xobj.responseText);
            if(params.callBack!=null){
                params.callBack()
            }
        }else{
            cc_loaded_errors++
            if(cc_loaded_errors==3){
                //definitivamente hay error no lo encontró
                cc_loaded_errors = 0
                params.Error()
            }else{
                //calma calma
            }
        }
    };
    xobj.send(null);*/
}

function spdLoadJsonActivity(params){
    var url = params.url

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback 
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode

            //console.log(xobj.responseText)
            var json = JSON.parse(xobj.responseText);
            //if(params.callBack!=null){
                params.callBack(json)
            //}
        }else{
            //params.callBack(null)
            console.log("error cargando el json")
            //alert("error puto "+xobj.status+" "+xobj.readyState)
        }
    };
    xobj.send(null);
}

var audio_cc = null
var cc_finished = false

function spdLoadAudio(params){
    var url = params.url

    audio_cc = document.createElement('audio')
    audio_cc.setAttribute('src',url)
    audio_cc.load()
    audio_cc.addEventListener('loadeddata',function(){
        //alert("cargo")
        if(params.autoplay=='on'){
            audio_cc.play()
        }
        if(params.callBack!=null){
            params.callBack()
        }
    })
    audio_cc.addEventListener('error',function(){
        console.log("error audio "+url)
    })
}

function spdLoadFx(params){
    var url = params.url

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        params.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error")
        params.callBack(audio_fx)
    })
}

function spdPlayClosedCaptionOnly(params){

}

function spdPlayClosedCaption(params){
    if(!cc_finished){
        document.getElementById('cc').className = "cc_on"

        var is_continue = false
        //mirar si continua o si empieza otra vez
        if(params.continue!=null&&params.continue!=undefined){
            if(params.continue=='on'){
                is_continue = true
            }
        }

        franja = document.getElementById(params.franja_name)
        if(params.audio=='on'){
            audio_cc.play()
            if(!is_continue){
                audio_cc.addEventListener('ended',function (){
                    spdEndAudio()
                    spdStopSprite()
                    /*if(params.avatar_name!=null){
                        spdSetFrameSprite(3,params.avatar_name)
                    }*/ //ya no sirve esto porque el se para solito
                    if(params.callBack!=null&&params.callBack!=undefined){
                        params.callBack()
                    }
                })
            }//si esta continuando no añadimos el evento porque ya se añadió antes
        }

        if(!is_continue){
            animation_cc_seconds = 0
        }//si no esta continuando no reseteamos el cc
        
        clearInterval(animation_cc)
        animation_cc = setInterval(function(){
            var texto = ""
            var actual_secs = (Math.round(animation_cc_seconds*10)/10)
            var obj_json_ = json_cc[0]

            if(obj_json_.ini == undefined){
                for(var i = 0;i<json_cc.length;i++){
                    var obj_json = json_cc[i]
                    var ini = String(obj_json.start_time)
                    var fin = String(obj_json.end_time)
                    var label = obj_json.text

                    var fragmentos_ini = ini.split(":")
                    var horas_ini = parseInt(fragmentos_ini[0])//siempre 0
                    var minutos_ini = parseInt(fragmentos_ini[1])
                    var segundos_ini = parseFloat(fragmentos_ini[2].replace(',','.'))
                    ini = horas_ini+(minutos_ini*60)+segundos_ini
                    
                    var fragmentos_fin = fin.split(":")
                    var horas_fin = parseInt(fragmentos_fin[0])//siempre 0
                    var minutos_fin = parseInt(fragmentos_fin[1])
                    var segundos_fin = parseFloat(fragmentos_fin[2].replace(',','.'))
                    fin = horas_fin+(minutos_fin*60)+segundos_fin
                    
                    if(actual_secs>=ini&&actual_secs<fin){
                        //console.log("1actual_secs: "+actual_secs+" el ini: "+ini+" el fin: "+fin)
                        franja.innerHTML = label
                    }
                }
            }else {
                for(var i = 0;i<json_cc.length;i++){
                    var obj_json = json_cc[i]
                    var ini = parseFloat(obj_json.ini)
                    var fin = parseFloat(obj_json.fin)
                    var label = obj_json.label

                    //var actual_secs = Math.floor((animation_cc_seconds/1000)*10)/10    
                    //console.log("2actual_secs: "+actual_secs+" el ini: "+ini+" el fin: "+fin)
                    if(actual_secs>=ini&&actual_secs<fin){
                        franja.innerHTML = label
                    }
                    
                }
            }

            //hacemos esto para que la rayita no quede fea
            if(franja.innerHTML==""||franja.innerHTML==" "){
                franja.innerHTML = '<span style="opacity:0">.</span>'
            }

            if(params.audio=='on'){
                var time_audio = audio_cc.currentTime
                animation_cc_seconds = time_audio
                //spdSetCcSeconds(time_audio)
                //setear segundos del avatar con este parametro sabemos si hay que sincronizar audio con sprite
                if(params.avatar!=null){
                    spdSpriteSetSecond(params.llaves,params.avatar_name,time_audio)
                }
            }
            //animation_cc_seconds+=100
        },20)
    }//si ya finalizo el cc
}

var animation_cc = null
var animation_cc_seconds

function spdEndAudio(){
    cc_finished = true
    //alert("termino")
    if(audio_cc!=null){
        audio_cc.pause()
        audio_cc.currentTime = 0
    }
    clearInterval(animation_cc)
}

function spdStopCcAnimation(){
    if(audio_cc!=null){
        audio_cc.pause()
    }
    if(animation_cc!=null){
        clearInterval(animation_cc)
    }
}

function spdSetCcSeconds(tiempo){
    animation_cc_seconds = tiempo
}

function printFranjacc(){
    var actual_secs = (Math.round(animation_cc_seconds*10)/10)
    var texto = ""
    
    var obj_json_ = json_cc[0]
    if(obj_json_.ini == undefined){
        for(var i = 0;i<json_cc.length;i++){
            var obj_json = json_cc[i]
            var ini = String(obj_json.start_time)
            var fin = String(obj_json.end_time)
            var label = obj_json.text

            var fragmentos_ini = ini.split(":")
            var horas_ini = parseInt(fragmentos_ini[0])//siempre 0
            var minutos_ini = parseInt(fragmentos_ini[1])
            var segundos_ini = parseFloat(fragmentos_ini[2].replace(',','.'))
            ini = horas_ini+(minutos_ini*60)+segundos_ini
            
            var fragmentos_fin = fin.split(":")
            var horas_fin = parseInt(fragmentos_fin[0])//siempre 0
            var minutos_fin = parseInt(fragmentos_fin[1])
            var segundos_fin = parseFloat(fragmentos_fin[2].replace(',','.'))
            fin = horas_fin+(minutos_fin*60)+segundos_fin
            
            if(actual_secs>=ini&&actual_secs<fin){
                if(franja!=null){
                    //console.log("01actual_secs: "+actual_secs+" el ini: "+ini+" el fin: "+fin)
                    texto = label
                }
            }  
        }
    }else {
        for(var i = 0;i<json_cc.length;i++){
            var obj_json = json_cc[i]
            var ini = parseFloat(obj_json.ini)
            var fin = parseFloat(obj_json.fin)
            var label = obj_json.label

            //var actual_secs = Math.floor((animation_cc_seconds/1000)*10)/10    
            //console.log(ini)
            if(actual_secs>=ini&&actual_secs<fin){
                if(franja!=null){
                    //console.log("02actual_secs: "+actual_secs+" el ini: "+ini+" el fin: "+fin)
                    texto = label
                }
            }      
            
        }
    }
    //console.log("("+texto+")")

    //hacemos esto para que la rayita no quede fea
    if(texto==""||texto==" "){
        if(franja!=null){
            franja.innerHTML = '<span style="opacity:0">.</span>'
        }
    }else{
        if(franja!=null){
            franja.innerHTML = texto
        }
    }
    //console.log("("+franja.innerHTML+")")
}

var contadora=1

function spdContinueCcAnimation(franja_name){
    franja = document.getElementById(franja_name)

    animation_cc = setInterval(function(){
        //console.log("animation cc 2")
        
        var texto = ""
        var actual_secs = (Math.round(animation_cc_seconds*10)/10)

        var obj_json_ = json_cc[0]
        if(obj_json_.ini == undefined){
            for(var i = 0;i<json_cc.length;i++){
                var obj_json = json_cc[i]
                var ini = String(obj_json.start_time)
                var fin = String(obj_json.end_time)
                var label = obj_json.text

                var fragmentos_ini = ini.split(":")
                var horas_ini = parseInt(fragmentos_ini[0])//siempre 0
                var minutos_ini = parseInt(fragmentos_ini[1])
                var segundos_ini = parseFloat(fragmentos_ini[2].replace(',','.'))
                ini = horas_ini+(minutos_ini*60)+segundos_ini
                
                var fragmentos_fin = fin.split(":")
                var horas_fin = parseInt(fragmentos_fin[0])//siempre 0
                var minutos_fin = parseInt(fragmentos_fin[1])
                var segundos_fin = parseFloat(fragmentos_fin[2].replace(',','.'))
                fin = horas_fin+(minutos_fin*60)+segundos_fin

                if(actual_secs>=ini&&actual_secs<fin){
                    //console.log("001actual_secs: "+actual_secs+" el ini: "+ini+" el fin: "+fin)
                    franja.innerHTML = label
                }     
            }
        }else {
            for(var i = 0;i<json_cc.length;i++){
                var obj_json = json_cc[i]
                var ini = parseFloat(obj_json.ini)
                var fin = parseFloat(obj_json.fin)
                var label = obj_json.label

                //var actual_secs = Math.floor((animation_cc_seconds/1000)*10)/10    
                //console.log(ini)
                if(actual_secs>=ini&&actual_secs<fin){
                    //console.log("002actual_secs: "+actual_secs+" el ini: "+ini+" el fin: "+fin)
                    franja.innerHTML = label
                }     
            }
        }

        //hacemos esto para que la rayita no quede fea
        if(franja.innerHTML==""||franja.innerHTML==" "){
            franja.innerHTML = '<span style="opacity:0">.</span>'
        }
        //animation_cc_seconds+=100
    },100)
}

function spdShowHideCC(btn){
    var status = btn.getAttribute("status")
    var cc = document.getElementById('cc')
    if(status=="on"){
        btn.setAttribute("status","off")
        btn.className = "spd_cc_off_btn"
        cc.className = "cc_off"
    }else{
        btn.setAttribute("status","on")
        btn.className = "spd_cc_on_btn"
        cc.className = "cc_on"
    }
}

function spdRemoveCc(){
    json_cc = []
    audio_cc = null
    animation_cc_seconds = 0
    if(animation_cc!=null){
        clearInterval(animation_cc)
    }
    animation_cc = null
    document.getElementById('cc_txt').innerHTML = ""
}

function spdResetCcFinished(){
    cc_finished = false
}

function spdPlayAudioCc(params){
    if(!cc_finished){
        
        var is_continue = false
        //mirar si continua o si empieza otra vez
        if(params.continue!=null&&params.continue!=undefined){
            if(params.continue=='on'){
                is_continue = true
            }
        }

        if(params.audio!=null){
            if(audio_cc!=null){
                audio_cc.pause()
                audio_cc.currentTime = 0
            }
            audio_cc = params.audio
            audio_cc.play()
            if(!is_continue){
                audio_cc.addEventListener('ended',function (){
                    spdEndAudio()
                    /*//spdStopSprite()
                    if(params.avatar_name!=null){
                        spdSetFrameSprite(3,params.avatar_name)
                    }*/ //ya no sirve esto porque el se para solito
                    if(params.callBack!=null&&params.callBack!=undefined){
                        params.callBack()
                    }
                })
            }//si esta continuando no añadimos el evento porque ya se añadió antes
        }

        if(!is_continue){
            animation_cc_seconds = 0
        }//si no esta continuando no reseteamos el cc
        
        clearInterval(animation_cc)
        animation_cc = setInterval(function(){
            if(params.audio!=null){
                var time_audio = audio_cc.currentTime
                //spdSetCcSeconds(time_audio)
                animation_cc_seconds = time_audio
                //setear segundos del avatar con este parametro sabemos si hay que sincronizar audio con sprite
                if(params.avatar!=null){
                    spdSpriteSetSecond(params.llaves,params.avatar_name,time_audio)
                }
            }
            //animation_cc_seconds+=100
        },30)
    }//si ya finalizo el cc
}