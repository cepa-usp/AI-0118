
/*
	MÉTODOS start_FRAMENAME
	SÃO EXECUTADOS AUTOMATICAMENTE, AO FINAL DO MÉTODO loadSlide(FRAMENAME)
	Toda vez que um slide é carregado, caso exista a função relacionada, ela é executada.
	Elas servem para carregar o conjunto adequado de métodos do SWF que são disponibilizados via ExternalInterface.
*/
var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!

var oaName = "AI-0118_4"

function AILocalStorageData() {
	this.cp1 = "";
    this.cp2 = "";
    this.cp3 = "";
    this.cp4 = "";
}
var ai_data;

function startAI(){
    oaData = fetch();
	state = fetch();
	
    if(oaData.slides==undefined) oaData.slides = new AILocalStorageData();
    loadScreen("../swf/AI-0114.swf", 640, 480);
	loadContent();
	
	
}



/**
	Determinar o comportamento inicial da atividade que está sendo inserida
*/
function onInitialize(){	

	loadSlide("quadro1");
	$("#acertou1").hide();
	$("#errou1").hide();
	
	
}


function start_quadro1(){
	
	// popular o slide com as variáveis colhidas do scorm;
	$("#bt-04-01").button().click(function(){
		disableElement("#bt-04-01");
		$( "#04-01" ).attr("disabled",true);
		
		//Avalia resposta
		if($("#04-01").val() == 6)
		{
			$("#acertou1").show();
			//state.parte4.score_04_01 = 100;
		}
		else
		{
			$("#errou1").show();
			//state.parte4.score_04_01 = 0;
		}		
    });	
	
	$("#avancar1").button().click(function(){
		loadSlide("quadro2");

	});	
}



function start_quadro2(){
	$("#errou2").hide();
	$("#acertou2").hide();

	$("#bt-04-02").button().click(function(){
		disableElement("#bt-04-02");
		$( "#04-02" ).attr("disabled",true);
		
		//Avalia resposta
		var i;
		var x;
		var z;
		var y;
		var correct = 0;
		for (i = 8; i > 0; i--)
		{
			x = Math.floor(Math.random()*100);
			z = Math.floor(Math.random()*100);
			if(eval(z/x) == eval($("#04-02").val()))
			{
				correct = correct + 1;
			}
		}
		//var state = $("#04-02").val();
		if(correct == 8)
		{	
			$("#acertou2").show();
			//state.parte4.score_04_02 = 100;
		}
		else
		{
			$("#errou2").show();
			//state.parte4.score_04_02 = 0;
		}		
    });	
	
	$("#avancar2").button().click(function(){
		loadSlide("quadro3");

	});
}

function start_quadro3(){
    $("#bt-04-03").button().click(function(){
		disableElement("#bt-04-03");
		$( "#04-03" ).attr("disabled",true);
    });
	
	$("#avancar3").button().click(function(){
		loadSlide("quadro4");
	});
}

function start_quadro4(){
    //apenas para fins de declaração.
}

/*
 * Inicia a conexão SCORM.
 */ 
function fetch () {
 
	var ans = {};
	ans.completed = false;
	//ans.try_completed = false;
	//ans.score = 0;
	//ans.learner = "";
	//ans.connected = false;
	ans.part = 3;
	ans.parte3 = {};
	ans.parte3.part_stop = 1;
	ans.parte3.complete_03 = false;
	ans.parte3.resp_03_01_verify = "";
	ans.parte3.resp_03_02_verify = "";
	ans.parte3.resp_03_03_verify = "";
	ans.parte3.resp_03_04_verify = "";
	ans.parte3.resp_03_05_verify = "";
	ans.parte3.resp_03_06_verify = "";
	ans.parte3.resp_03_07_verify = "";
	ans.parte3.resp_03_08_verify = "";
	ans.parte3.resp_03_09_verify = "";
	ans.parte3.resp_03_10_verify = "";
	ans.parte3.resp_03_11_verify = "";
	ans.parte3.resp_03_12_verify = "";
	ans.parte3.resp_03_13_verify = "";
	ans.parte3.score_03_08 = 0;
	ans.parte3.resp_03_08_01 = "";
	ans.parte3.score_03_09 = 0;
	ans.parte3.resp_03_09_01 = "";
	ans.parte3.score_03_12 = 0;
	ans.parte3.resp_03_12_01 = "";
	ans.parte3.score_03_13 = 0;
	ans.parte3.resp_03_13_01 = "";
	ans.parte3.resp_03_13_02 = "";
	ans.parte3.resp_03_13_03 = "";
	ans.parte3.resp_03_13_04 = "";
	ans.parte3.score_03 = 0;
	
	// Conecta-se ao LMS
	session_connected = scorm.init();
    
	// Verifica se a AI já foi concluída.
	var completionstatus = scorm.get("cmi.completion_status");
	//console.log(completionstatus);
	// A AI já foi concluída.
	switch (completionstatus) {

	  // Primeiro acesso à AI
	  case "not attempted":
	  case "unknown":
	  default:
		//ans.learner = scorm.get("cmi.learner_name");
		ans.completed = false;
		//ans.try_completed = <valor padrão>;
		//ans.count = <valor padrão>;
		//ans.score = <valor padrão>;
		//ans.choices = <valor padrão>;
		ans.connected = session_connected;
		//ans.standalone = session_standalone;
		//ans.tries = <valor padrão>;
		break;
		
	  // Continuando a AI...
	  case "incomplete":
		var stream = scorm.get("cmi.location");
		if (stream != "") ans = JSON.parse(stream);
		ans.part = 3;
		//ans.learner = scorm.get("cmi.learner_name");
		ans.completed = false;
		//ans.try_completed = false;
		//ans.count = <obtido de cmi.location>;
		//ans.score = <obtido de cmi.location>;
		//ans.choices = <obtido de cmi.location>;
		ans.connected = session_connected;
		//ans.standalone = session_standalone;
		//ans.tries = <obtido de cmi.location>;
		break;
		
	  // A AI já foi completada.
	  case "completed":
		var stream = scorm.get("cmi.location");
		if (stream != "") ans = JSON.parse(stream);
		//ans.learner = scorm.get("cmi.learner_name");
		ans.completed = true;
		//ans.try_completed = true;
		//ans.count = <obtido de cmi.location>;
		//ans.score = <obtido de cmi.location>;
		//ans.choices = <obtido de cmi.location>;
		ans.connected = session_connected;
		//ans.standalone = session_standalone;
		//ans.tries = <obtido de cmi.location>;
		break;
	}    
  
  return ans;
}

/*
 * Salva cmi.score.raw, cmi.location e cmi.completion_status no LMS
 */ 
function commit (data) {

  var success = false;

  // Garante que a nota do usuário é um inteiro entre 0 e 100.
  data.score = (state.parte3.score_03_08+state.parte3.score_03_09+state.parte3.score_03_12+state.parte3.score_03_13)/4;
  
  // Se estiver rodando como stand-alone, usa local storage (HTML 5)
  if (data.standalone) {
	
    var stream = JSON.stringify(data);
    localStorage.setItem("ai_0006_redefor-memento", stream);
    
    success = true;
  }
  // Se estiver conectado a um LMS, usa SCORM
  else {  

    //if (scorm.connection.isActive) {
    if (data.connected) {
    
      // Salva no LMS a nota do aluno.
      success = scorm.set("cmi.score.raw", data.score);
      
      // Salva no LMS o status da atividade: completada ou não.
      success = scorm.set("cmi.completion_status", (data.completed ? "completed" : "incomplete"));
      
      // Salva no LMS os demais dados da atividade.
      var stream = JSON.stringify(data);      
      success = scorm.set("cmi.location", stream);
    }
  }
  
  return success;
}

// Checks if given selector (type input) is a valid number. If not, resets field.
function validateAnswer (selector) {
  var value = $(selector).val().replace(",", ".");
  var isValid = !isNaN(value) && value != "";
  if (!isValid) $(selector).val("");
  return isValid;
}


 