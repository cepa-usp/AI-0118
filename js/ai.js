var scorm = pipwerks.SCORM;
scorm.version = "2004";
var movie;
var memento = {};
var session = {};
var t1;
var projetor = false;
var AI_WIDTH = 700;
var AI_HEIGHT = 600;
var AI_NAV_HEIGHT = 20;
var AI_MOVIE_HEIGHT_MIN = 20;
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
	$("#atividade").css("width", AI_WIDTH+"px");
	$("#fls").css("width", AI_WIDTH+"px");
	$("#navegador").css("width", AI_WIDTH+"px");
	$("#etapaAtual").css("width", AI_WIDTH+"px");
	//$("#aicontainer").css("width", AI_WIDTH+"px");
	
	$("#fls").css("height", AI_MOVIE_HEIGHT_MIN + "px");
	$("#navegador").css("height", AI_NAV_HEIGHT+"px");
	$("#atividade").css("height", AI_HEIGHT+"px");
	$("#etapaAtual").css("height", (AI_WIDTH - AI_MOVIE_HEIGHT_MIN - AI_NAV_HEIGHT) + "px");
	
}

function loadScreen(swfpath, w, h){
	if(swfpath!=""){
	//loadScreen("flash/AI0125.swf", 640, 480)
	var flashvars = {};
	flashvars.ai = swfpath;
	flashvars.width = w;
	flashvars.height = h;
	
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
	loadContent();	
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
		
		loadConteudo('conteudo1')
		createNavigator()
		
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
		var stream = localStorage.getItem("AI-0125-memento");
		if (stream != null)
			ans = JSON.parse(stream);
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
		localStorage.setItem("AI-0125-memento", stream);
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
	onInitialize();
}

function loadBlock(n, f){	
	if(n>maxPos && DEBUG==false) return;
	iluminar(f);	
	loadSlide(f);
}


function loadSlide(n){
	
	//if(!projetor) showProjetor();	
	$('#etapaAtual').html($('#'+ n).html());
	
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
	trace("start_"+n+"()");
	ret = eval("start_"+n+"()");
	

	
}


function createNavigator(){
	var qtde = $(".breakpoint").size();
	var str = "";
	for(var i=0; i<qtde;i++){
		var arr = $(".breakpoint")[i].id.split("_");
		var number = arr[1]
		var framename = arr[2]
		
			 str += "<div id='bl_"+number+"' class='bloco' onClick=\"loadBlock('" + number + "', '"+framename+"');\">" + number + "</div><div class='linha'></div>"
	}
	str += "<div id='blocofinal' class='bloco'>x</div>"
	
	$("#navegador").html(str);
}

function iluminar(b){
	resetarBlocos();
	$("#"+b).css("backgroundColor", "yellow")	
	$("#"+b).css("color", "black")
}

function resetarBlocos(){
	var qtde = $(".bloco").size();
	for(var i=0; i<qtde;i++){
		$(".bloco").css("backgroundColor", "#000000")
		$(".bloco").css("color", "#FFFFFF")
	}

}
 