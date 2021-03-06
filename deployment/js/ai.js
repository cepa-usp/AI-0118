﻿var scorm = pipwerks.SCORM;
scorm.version = "2004";
var movie;
var memento = {};
var session = {};
var t1;
var currentAtv;
var oaData = new Object();
var lastBreakpoint = 1;
var currentSlide;
var started = false;
var projetor = false;
var onDownScreenComplete = function(){
    // nada
};
var onFlashContentLoaded = function(){
    // nada
};
var positions = new Object();

function Position(name) {
	this.breakpoint=1;
	this.breakpointPos=1;
	this.isbreak=false;
	this.name=name;
	this.visited=false;
	
}

var AI_WIDTH = 700;
var AI_HEIGHT = 700;
var AI_NAV_HEIGHT = 30;
var AI_MOVIE_HEIGHT_MIN = 0;
var AI_MOVIE_HEIGHT = 500;
var oaName = "AI-0118";

$(document).ready(init);
$(window).unload(uninit);

var currentPosition = 1;
var maxPos = 0;
var dadosExercicio1 = [];


function init() {
    setInitialSizes();
    $("#seletor").change(loadAtv)
	maxPos = currentPosition;	
    try{
        //initStep();
    } catch(e){

    }

    getDataContent();
    loadContent()
}

function getDataContent(){
    oaData = fetch();
    if(oaData.currentAtv==undefined){
        setCurrentAtv(1);
    } else {
        if(oaData[currentAtv]==undefined) {
            oaData[currentAtv]= {};
        }
        setCurrentAtv(oaData.currentAtv);
    }
}

function setInitialSizes(){	
	//$("#atividade").css("width", AI_WIDTH+"px");
	//$("#fls").css("width", AI_WIDTH+"px");
	//$("#navegador").css("width", AI_WIDTH+"px");
	//$("#etapaAtual").css("width", AI_WIDTH+"px");
	//$("#aicontainer").css("width", AI_WIDTH+"px");

	$("#fls").css("height", AI_MOVIE_HEIGHT_MIN + "px");
	$("#navegador").css("height", AI_NAV_HEIGHT+"px");
	$("#atividade").css("height", AI_HEIGHT+"px");
	$("#etapaAtual").css("height", (AI_HEIGHT - AI_MOVIE_HEIGHT_MIN - AI_NAV_HEIGHT) + "px");
	
	
}

function concluirAtividade(){
    oaData.ultAtividade = Math.max(currentAtv+1, (oaData.ultAtividade==undefined?0:oaData.ultAtividade));
    commit(oaData);
}

function proximaAtividade(){
    loadAtv(currentAtv+1);
}

var currentPath = "";
function loadScreen(swfpath, w, h){
	if(swfpath!=""){
    if(currentPath==swfpath){
        return;
    } else {
        currentPath = swfpath;
    }
	//loadScreen("flash/AI0125.swf", 640, 480)
	var flashvars = {};
	flashvars.ai = swfpath;
	flashvars.width = w;
	flashvars.height = h;

    $("#fls").html("<div id=\"flscontent\">.</div>")

	var params = {};
	params.menu = "false";
	//params.scale = "noscale";

	var attributes = {};
	attributes.id = "ai";
	attributes.align = "middle";

	swfobject.embedSWF(flashvars.ai, "flscontent", flashvars.width, flashvars.height, "10.0.0", "expressInstall.swf", flashvars, params, attributes, onFlashContentLoaded);
		
	movie = $("#ai")[0];
	}
	
	t1 = new Date().getTime();
	//memento = fetch();
	checkCallback();
}

function checaSePodeAtv(atv){

    if((oaData.ultAtividade==undefined?1:oaData.ultAtividade)<atv){
        return true
    } else {
        return false;
    }
}


/**
 * Muda para a atividade chamada
 * @param atv o número da etapa
 */
function loadAtv(){
    var newatv = parseInt($("#seletor option:selected").attr('id').replace("atv", ""));
    //var n = parseInt(atv.replace("atv", ""))

        if(checaSePodeAtv(newatv)){
            alert("Você precisa concluir esta etapa para poder avançar!")
            return;
        } else {

            setCurrentAtv(newatv);
            commit(oaData);
            loadContent()
        }

}

/**
 * Modifica a exibição do combo box para aparecer em evidência a atividade atual
 * @param atv o número da etapa
 */
function setCurrentAtv(atv){
    currentAtv = atv;
    $("#atv0"+atv).attr('selected', 'selected');
}



function startSaving(){
	setTimeout("commitStatus()", 5*60*1000);
}

function commitStatus(){
	commit(memento);
	//notificar("memento salvo");
	setTimeout("commitStatus()", 5*60*1000);
}

function onFlash_Loaded(){
	
	currentPosition = 1;	
	//hideProjector();
	
}

function upScreen(){
	//$( "#flscontent" ).hide();
	$( "#fls" ).animate({height: AI_MOVIE_HEIGHT_MIN + "px"}, 500)
	$( "#etapaAtual" ).animate({height: (AI_HEIGHT - AI_NAV_HEIGHT - AI_MOVIE_HEIGHT_MIN) + "px"}, 500)
}


function downScreen(){
	//$( "#flscontent" ).show();
	var AI_MOVIE_HEIGHT2 = $("#ai").height();
    $( "#fls" ).animate({height:  + AI_MOVIE_HEIGHT2 + "px"}, 500)
	$( "#etapaAtual" ).animate({height: (AI_HEIGHT - AI_NAV_HEIGHT - AI_MOVIE_HEIGHT2) + "px"}, 500, onDownScreenComplete)
	
}



function onEndScreen(){
	// nada
}



function trace(msg){
//	$('#debug').prepend("-- " + msg + "<br />")
}

function loadContent(){
    var vvv = "0";
    if (currentAtv>9) vvv = "";

    $.ajax({
	url: vvv + currentAtv + "/conteudo.html",
	context: document.body,
	success: function(data){

		$('#total').html(data);

		createNavigator()
        loadScriptContent();


	}
});
}

function loadScriptContent(){
    var vvv = "0";
    if (currentAtv>9) vvv = "";

    $.ajax({
        url: vvv + currentAtv + "/hooks.js",
        dataType: "script",
        success: function(){

            getDataContent();
            MathJax.Hub.Typeset();
            startAI();
            onInitialize();

        }
    });


}

function loadMathJax(){
    if ((window.unsafeWindow == null ? window : unsafeWindow).MathJax == null) {
        //
        //  Replace the images with MathJax scripts of type math/tex
        //
        var images = document.getElementsByTagName('img'), count = 0;
        for (var i = images.length - 1; i >= 0; i--) {
            var img = images[i];
            if (img.className === "tex") {
                var script = document.createElement("script"); script.type = "math/tex";
                if (window.opera) {script.innerHTML = img.alt} else {script.text = img.alt}
                img.parentNode.replaceChild(script,img); count++;
            }
        }
        if (count) {
            //
            //  Load MathJax and have it process the page
            //
            var script = document.createElement("script");
            script.src = "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML-full";
            var config = 'MathJax.Hub.Startup.onload()';
            if (window.opera) {script.innerHTML = config} else {script.text = config}
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    }
}



function hideProjector(){
	$('#aicontainer').hide('slow');
	projetor = false;
	//console.log("escondeu projetor")
}

function showProjetor(){
	$('#aicontainer').show('slow');
	projetor = true;
}


var qtcb=0;
function checkCallback () {	
	var rodou=true;
	qtcb++;
	movie = $("#ai")[0];
	try {
		movie.doNothing();
		trace('função doNothing rodou');
	} catch(error) {			
			rodou = false;
			if(qtcb==10) return;
			setTimeout("checkCallback()", 1000);
			
	}
	if(rodou) onFlash_Loaded();
	
}




function uninit() {
	scorm.quit();
}

function fetch() {
	var ans = {};
	ans.completed = false;

	ans.score = 0;
	//ans.choices = [];
	ans.learner = "Fulano de tal";
	ans.ex1 = false;
	//ans.tries = 0;
	//ans.config = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	session.connected = scorm.init();
	session.standalone = !session.connected;
	if (session.standalone) {
		var stream = localStorage.getItem(oaName + "-memento");
		
		if (stream != null)	ans = JSON.parse(stream);
	} else {
		var completionstatus = scorm.get("cmi.completion_status");
		switch (completionstatus) {
		case "not attempted":
		case "unknown":
		default:
			ans.learner = scorm.get("cmi.learner_name");
			break;
		case "incomplete":
			var stream = scorm.get("cmi.suspend_data");			
			if (stream != "")
				ans = JSON.parse(stream);
			ans.learner = scorm.get("cmi.learner_name");
			break;
		case "completed":
			var stream = scorm.get("cmi.suspend_data");
			if (stream != "")
				ans = JSON.parse(stream);
			ans.learner = scorm.get("cmi.learner_name");
			break;
		}
	}
    if(ans[currentAtv]!=undefined){
        ans.slides = ans[currentAtv].slides;
    }

	if(ans.ultAtividade!=undefined){
        if(ans.ultAtividade<currentAtv){
            loadAtv(ans.ultAtividade);
            return null;
        }
    }
    return ans;
}
function commit(data) {

	var success = false;
    if(data.currentAtv!=currentAtv) data.currentAtv = currentAtv;

    if(data.slides!="" && data.slides!=undefined) {
        data[currentAtv] = {};
        data[currentAtv].slides =  data.slides
    }
    data.slides = undefined;

	if (session.standalone) {
		var stream = JSON.stringify(data);
		
		localStorage.setItem(oaName + "-memento", stream);
		success = true;
	} else {
		if (session.connected) {
			success = scorm.set("cmi.score.raw", data.score);
			success = scorm.set("cmi.completion_status", (data.completed ? "completed" : "incomplete"));
			var stream = JSON.stringify(data);

			success = scorm.set("cmi.suspend_data", stream);
		}
	}
	return success;
}



function loadConteudo(c){
	//if (projetor) hideProjector();	
	$('#posicaoconteudo').html('');
	$('#posicaoconteudo').append($('#'+ c).html());	

}

function loadBlock(n, f){	
	if(n>maxPos && DEBUG==false) return;
	
	loadSlide(f);
}


function loadSlide(n){
	
	$('#etapaAtual').html($('#'+ n).html());
	if(positions[n].isbreak){
		lastBreakpoint = Math.max(lastBreakpoint, positions[n].breakpoint);
		
	}
	currentSlide = n;
	positions[n].visited = true;
	iluminar();
	var qtde = $(".breakpoint").size();
	for(var i=0; i<qtde;i++){
		var arr = $(".breakpoint")[i].id.split("_");
		var number = arr[1]
		var framename = arr[2]		
		
		if(framename==n){
			iluminar('bl_'+number);
			if(maxPos<=number) {
				maxPos = number;
				//$("#bl_"+number).css("border", "2px green solid");
			}
			
		}
	}
	
	var ret;

    //MathJax.Hub.Typeset("etapaAtual");

	trace("start_"+n+"()");
	ret = eval("start_"+n+"()");
	
	

	
}


function createNavigator(){
	var pos = $(".etapa");	
	for(var x=0; x<pos.size();x++){
		var name = pos[x].id;
		newPosition = new Position(name);
		newPosition.name = name;
		positions[name] = newPosition;
		
		
	}

	var qtde = $(".breakpoint").size();
	var str = "";
	for(var i=0; i<qtde;i++){
		var slideName = $(".breakpoint")[i].id;
			positions[slideName].breakpoint = i+1;
			positions[slideName].isbreak = true;
			onclk = " onClick=\"checkLoadSlide('"+slideName+"', " + (i+1) + ");\" "
			//if(lastBreakpoint<(i+1)) onclk = "";
			 
			 str += "<div id='bl_"+i+"' class='bloco' " + onclk + ">" + (i+1)
                if(i<qtde-1) str += "</div><div class='linha'></div>"
	}
	//str += "<div id='blocofinal' class='bloco'>x</div>"
	
	$("#navegador").html(str);
}


function checkLoadSlide(slideName, i){
    if(i<=lastBreakpoint)  loadSlide(slideName);
}


function disableElement(elementString){
	$(elementString).attr('disabled', 'disabled');
}
function enableElement(elementString){
	$(elementString).removeAttr('disabled');

}

function iluminar(){
	resetarBlocos();
	var b = positions[currentSlide].breakpoint-1;
	$("#bl_"+b).css('background-image', 'url("http://midia.atp.usp.br/atividades-interativas/AI-0118/figures/step_active.png")');
}

function resetarBlocos(){
	var qtde = $(".bloco").size();
	for(var i=0; i<qtde;i++){
        $("#bl_"+i).css('background-image', 'url("http://midia.atp.usp.br/atividades-interativas/AI-0118/figures/step.png")');
        if(i <= lastBreakpoint - 1) {
            $("#bl_"+i).css('background-image','url("http://midia.atp.usp.br/atividades-interativas/AI-0118/figures/step_hover.png")');
        }

	}

}
 