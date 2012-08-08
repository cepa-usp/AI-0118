
/*
	MÉTODOS start_FRAMENAME
	SÃO EXECUTADOS AUTOMATICAMENTE, AO FINAL DO MÉTODO loadSlide(FRAMENAME)
	Toda vez que um slide é carregado, caso exista a função relacionada, ela é executada.
	Elas servem para carregar o conjunto adequado de métodos do SWF que são disponibilizados via ExternalInterface.
*/
var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!

var oaName = "AI-0118_3"

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
    loadScreen("../swf/AI-0114.swf", 700, 500);
	loadContent();
	
	
}



/**
	Determinar o comportamento inicial da atividade que está sendo inserida
*/
function onInitialize(){	

	loadSlide("quadro1");
	
}


function start_quadro1(){
	
	// popular o slide com as variáveis colhidas do scorm;
		
	$("#avancar1").button().click(function(){
		loadSlide("quadro2");

	});	
}


function start_quadro4(){

}


function start_quadro2(){
	$("#parada-2").hide();
	$("#parada-3").hide();
	$("#parada-4").hide();
	$("#parada-5").hide();
    downScreen();

    $("#bt-03-01").button().click(function(){

	//Verificando se o ponto na atividade está dentro ou fora do domínio
	if(movie.insideDomain())
	{
		$("#parada-2").show();
		    disableElement("#bt-03-01");
		}else{
			alert("O ponto (x,y) está fora do domínio. Posicione novamente.");
			return;
		}
        $('#etapaAtual').scrollTop(300);
    });
	$("#bt-03-02").button().click(function(){
        $("#parada-3").show();
		disableElement("#bt-03-02");
        $('#etapaAtual').scrollTop(300);
    });
	$("#bt-03-03").button().click(function(){
        $("#parada-4").show();
		disableElement("#bt-03-03");
        $('#etapaAtual').scrollTop(300);
    });	
	$("#bt-03-04").button().click(function(){
        $("#parada-5").show();
		disableElement("#bt-03-04");
        $('#etapaAtual').scrollTop(300);
    });	
	$("#bt-03-05").button().click(function(){
		movie.reset();
		movie.openDomain(false);// Verificar a função que coloca x = 0 e y = 0 no domínio e reinicializa a atividade
        loadSlide("quadro3");
        //$('#etapaAtual').scrollTop(100);
		disableElement("#bt-03-05");
    });
}

function start_quadro3(){
    $("#parada-7").hide();
    $("#parada-8").hide();
    $("#parada-9").hide();	
	$("#parada-10").hide();
    $("#parada-11").hide();
	$("#parada-12").hide();
	$("#parada-13").hide();
	$("#errou01").hide();
    $("#acertou01").hide();
	$("#errou02").hide();
    $("#acertou02").hide();
	$("#errou03").hide();
    $("#acertou03").hide();
	$("#acertou03-1").hide();
    $("#acertou03-2").hide();
	$("#acertou03-3").hide();
    $("#acertou03-4").hide();
	$("#errou03-1").hide();
    $("#errou03-2").hide();
	$("#errou03-3").hide();
    $("#errou03-4").hide();
	
    $("#bt-03-06").button().click(function(){
		if(movie.onBorder())// Função que verifica se o ponto está ou não na fronteira
		{
			$("#parada-7").show();
			disableElement("#bt-03-06");
            $('#etapaAtual').scrollTop(300);
		}else {
			//Confirm box de avaliação do ponto na fronteira
			
			$("#dialog-confirm").dialog({
			
				resizable: false,
				modal: true,
				position: ['center',550],
				buttons: {
					"Posicione (x,y) por mim": function() {
						movie.setCircunferenceX(2);
						movie.setCircunferenceY(0);
						
						//onborder tem que mudar para true!!!
						$(this).dialog( "close" );
					},
					"Ok": function() {
						$(this).dialog( "close" );
					}
				}
			});	
		return;	
		}
    });
	
    $("#bt-03-07").button().click(function(){
        $("#parada-8").show();
		disableElement("#bt-03-07");
        $('#etapaAtual').scrollTop(300);
    });
	
    $("#bt-03-08").button().click(function(){
		$( "#sl-03-dom-01" ).attr("disabled",true);
	
		//Avaliar o select	
		if($("#sl-03-dom-01").val() == 'fechado')
		{
			console.log("correto");
			oaData.slides.score_02_02 = 100;
			 $("#acertou01").show();
		}else 
		{
			console.log("errado");
			 $("#errou01").show();
			oaData.slides.score_02_02 = 0;
		}
			oaData.slides.resp_03_03_01 = $("select[name='sl-03-dom-01'] :selected").val();
	
		$("#parada-9").show();
        $('#etapaAtual').scrollTop(1300);
		disableElement("#bt-03-08");		
	});	
		
	$("#bt-03-09").button().click(function(){
		$( "#sl-03-dom-02" ).attr("disabled",true);
		//App altera o dominio 
		
		//Avaliar o select	
		if($("#sl-03-dom-02").val() == 'aberto')
		{
			console.log("correto");
			oaData.slides.score_02_03 = 100;
			 $("#acertou02").show();
		}else 
		{
			console.log("errado");
			 $("#errou02").show();
			oaData.slides.score_02_03 = 0;
		}
			oaData.slides.resp_03_03_02 = $("select[name='sl-03-dom-02'] :selected").val();
		
			$("#parada-10").show();
        $('#etapaAtual').scrollTop(1300);
			disableElement("#bt-03-09");		
	});	
	    
	$("#bt-03-10").button().click(function(){
        $("#parada-11").show();
		disableElement("#bt-03-10");
        $('#etapaAtual').scrollTop(1300);
    });
	
	$("#bt-03-11").button().click(function(){
        loadSlide("quadro4")
        $('#etapaAtual').scrollTop(0);
        //$("#parada-12").show();
		//$( "#sl-03-dom-03" ).attr("disabled",true);
        //$('#etapaAtual').scrollTop(1300);

		
		//Avaliar o select	
		if($("#sl-03-dom-03").val() == 'aberto') 
		{
			console.log("correto");
			oaData.slides.score_02_03 = 100;
			 $("#acertou03").show();
		}else 
		{
			console.log("errado");
			 $("#errou03").show();
			oaData.slides.score_02_03 = 0;
		}
		disableElement("#bt-03-11");
    });

	$("#bt-03-12").button().click(function(){
		$("#parada-13").show();
		$( "#sl-03-dom-04" ).attr("disabled",true);
		$( "#sl-03-dom-05" ).attr("disabled",true);
		$( "#sl-03-dom-06" ).attr("disabled",true);
		$( "#sl-03-dom-07" ).attr("disabled",true);
		disableElement("#bt-03-12");
	
		//Avaliar o select	
		if($("#sl-03-dom-04").val() == 'aberto') 
		{
			console.log("correto");
			oaData.slides.score_02_03 = 100/4;
			 $("#acertou03-1").show();
		}else 
		{
			console.log("errado");
			 $("#errou03-1").show();
			oaData.slides.score_02_03 = 0;
		}

		//Avaliar o select	
		if($("#sl-03-dom-05").val() == 'fechado') 
		{
			console.log("correto");
			oaData.slides.score_02_03 = 100/4;
			 $("#acertou03-2").show();
		}else 
		{
			console.log("errado");
			 $("#errou03-2").show();
			oaData.slides.score_02_03 = 0;
		}	
		
		//Avaliar o select	
		if($("#sl-03-dom-06").val() == 'aberto') 
		{
			console.log("correto");
			oaData.slides.score_02_03 = 100/4;
			 $("#acertou03-3").show();
		}else 
		{
			console.log("errado");
			 $("#errou03-3").show();
			oaData.slides.score_02_03 = 0;
		}	
	
		//Avaliar o select	
		if($("#sl-03-dom-07").val() == 'fechado') 
		{
			console.log("correto");
			oaData.slides.score_02_03 = 100/4;
			 $("#acertou03-4").show();
		}else 
		{
			console.log("errado");
			 $("#errou03-4").show();
			oaData.slides.score_02_03 = 0;
		}

    });

}


function notificar(tx){
	//TODO: substituir o 'alert' por um pseudo pop-up (?)
	alert(tx);
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


 