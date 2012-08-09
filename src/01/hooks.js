
/*
	MÉTODOS start_FRAMENAME
	SÃO EXECUTADOS AUTOMATICAMENTE, AO FINAL DO MÉTODO loadSlide(FRAMENAME)
	Toda vez que um slide é carregado, caso exista a função relacionada, ela é executada.
	Elas servem para carregar o conjunto adequado de métodos do SWF que são disponibilizados via ExternalInterface.
*/

var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!

var oaName = "AI-0118_1"
function AILocalStorageData() {
	this.txResposta1 = "";
}
var ai_data;

function startAI(){
	//loadScreen("../flash/AI0125.swf", 640, 480);
	loadContent();

}

/**
	Determinar o comportamento inicial da atividade que está sendo inserida
*/
function onInitialize(){	

	loadSlide("quadro_1_1");
	
	
}


function start_quadro_1_1(){
	
	// popular o slide com as variáveis colhidas do scorm;
	
		
	$("#correto1").hide();
	$("#errado1").hide();
	$("#errado2").hide();
	$("#avancar1").hide();
	popularQuadro1();
	avaliarQuadro1();
	
	$("#bt-01-01").button().click(function(){
		var tx = $("#txResposta1").val();
		if(tx==""){
			alert("Escreva um valor");
			return;
		}
		avaliarQuadro1();
	});
	
	$("#btAvancar01").button().click(function(){
		loadSlide("quadro_1_2");
	});	
}

function popularQuadro1(){
	oaData = fetch();
	dt = oaData.slides;
	if(dt==undefined) return;
	$("#txResposta1").val(dt.txResposta1);
}

function persistirQuadro1(){	
	if(ai_data==null) ai_data = new AILocalStorageData();
	ai_data.txResposta1 = $("#txResposta1").val();	
	oaData.slides = ai_data;
	commit(oaData);
}

function avaliarQuadro1(){
		var tx = $("#txResposta1").val();
		if(tx=="") return;
		$("#suaresposta1").text(tx)
		if(tx=="xy" || tx=="yx"){
			$("#correto1").show();
            oaData.score = 100;
		} else {
			$("#errado1").show();
			$("#errado2").show();
            oaData.score = 0;
			
		}
		$("#avancar1").show();
		disableElement("#txResposta1")
		disableElement("#bt-01-01");
		persistirQuadro1();
}


function start_quadro_1_2(){
	$("#btConcluir02").button().click(function(){
		//loadSlide("quadro_1_1")
		oaData.completed = true;
        scorm.set("cmi.exit", "suspend");
        commit(oaData);
	});
}

function eval_quadro_1_2(){

}


function notificar(tx){
	//TODO: substituir o 'alert' por um pseudo pop-up (?)
	alert(tx);
}


// Checks if given selector (type input) is a valid number. If not, resets field.
function validateAnswer (selector) {
  var value = $(selector).val().replace(",", ".");
  var isValid = !isNaN(value) && value != "";
  if (!isValid) $(selector).val("");
  return isValid;
}

 