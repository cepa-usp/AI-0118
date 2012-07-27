var scorm = pipwerks.SCORM;
scorm.version = "2004";
var movie;
var memento = {};
var session = {};
var t1;

var oaData = new Object();
var lastBreakpoint = 1;
var currentSlide;
var projetor = false;

var positions = new Object();

function Position(name) {
	this.breakpoint=1;
	this.breakpointPos=1;
	this.isbreak=false;
	this.name=name;
	this.visited=false;
	
}

var AI_WIDTH = 700;
var AI_HEIGHT = 708;
var AI_NAV_HEIGHT = 20;
var AI_MOVIE_HEIGHT_MIN = 0;
var AI_MOVIE_HEIGHT = 480;


$(document).ready(init);
$(window).unload(uninit);

var currentPosition = 1;
var maxPos = 0;
var dadosExercicio1 = [];

function init() {
	setInitialSizes();
	maxPos = currentPosition;	
	if(!DEBUG) $('#debug').hide();
	startAI();
	//onInitialize();
	//startSaving();
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

function loadScreen(swfpath, w, h){
	if(swfpath!=""){
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

	swfobject.embedSWF(flashvars.ai, "flscontent", flashvars.width, flashvars.height, "10.0.0", "expressInstall.swf", flashvars, params, attributes);		
		
	movie = $("#ai")[0];
	}
	
	t1 = new Date().getTime();
	//memento = fetch();
	checkCallback();
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
	$( "#fls" ).animate({height:  + AI_MOVIE_HEIGHT + "px"}, 500)
	$( "#etapaAtual" ).animate({height: (AI_HEIGHT - AI_NAV_HEIGHT - AI_MOVIE_HEIGHT) + "px"}, 500)
	
}



function onEndScreen(){
	// nada
}



function trace(msg){
//	$('#debug').prepend("-- " + msg + "<br />")
}

function loadContent(){	
	$.ajax({
	url: "conteudo.html",
	context: document.body,
	success: function(data){
		//$("#loading").hide('slow');		
		
		$('#total').html(data);
		//alert($('#total').html())
		//MathJax.Hub.Typeset();
		createNavigator()
		//MathJax.CallBack.Queue.push([onInitialize])
		//MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		
		
		onInitialize();
		//console.log("carregou conteúdo");
	}
});
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
			var stream = scorm.get("cmi.location");			
			if (stream != "")
				ans = JSON.parse(stream);
			ans.learner = scorm.get("cmi.learner_name");
			break;
		case "completed":
			var stream = scorm.get("cmi.location");
			if (stream != "")
				ans = JSON.parse(stream);
			ans.learner = scorm.get("cmi.learner_name");
			break;
		}
	}
	return ans;
}
function commit(data) {
	var success = false;
	if (session.standalone) {
		var stream = JSON.stringify(data);
		
		localStorage.setItem(oaName + "-memento", stream);
		success = true;
	} else {
		if (session.connected) {
			success = scorm.set("cmi.score.raw", data.score);
			success = scorm.set("cmi.completion_status", (data.completed ? "completed" : "incomplete"));
			var stream = JSON.stringify(data);
			success = scorm.set("cmi.location", stream);
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
				$("#bl_"+number).css("border", "2px green solid");
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
			onclk = " onClick=\"loadSlide('"+slideName+"');\" "
			if(lastBreakpoint<(i+1)) onclk = "";
			 
			 str += "<div id='bl_"+i+"' class='bloco' " + onclk + ">" + (i+1) + "</div><div class='linha'></div>"
	}
	//str += "<div id='blocofinal' class='bloco'>x</div>"
	
	$("#navegador").html(str);
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
	$("#bl_"+b).css("backgroundColor", "yellow")	
	$("#bl_"+b).css("color", "black")
}

function resetarBlocos(){
	var qtde = $(".bloco").size();
	for(var i=0; i<qtde;i++){
		$(".bloco").css("backgroundColor", "#000000")
		$(".bloco").css("color", "#FFFFFF")
	}

}
 