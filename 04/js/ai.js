var scorm = pipwerks.SCORM; // Seção SCORM
scorm.version = "2004"; // Versão da API SCORM

var state = {};
var flashMovie;

$(document).ready(init); // Inicia a AI.
$(window).unload(uninit); // Encerra a AI.

/*
 * Inicia a Atividade Interativa (AI)
 */ 
function init () {
	preFetchConfig();
	state = fetch();
	posFetchConfig();
}

/*
 * Encerra a Atividade Interativa (AI)
 */ 
function uninit () {
  scorm.quit();
}

/*
 * Abre janela de SWF
 */
function abrejanela() {
	$('#slidebottom').animate({
		right: parseInt($('#slidebottom').css('right'),10) == 0 ? -$('#slidebottom').outerWidth() + 20 : 0
	});
}

/*
 * Configurações INDEPENDENTES do status da AI
 */
function preFetchConfig () {
	
	
}

/*
 * Configurações DEPENDENTES do status da AI 
 */
function posFetchConfig () {
	//Parada 1
	if(state.parte4.resp_04_01_verify == "")
	{
		$("#bt-04-01").click(function (){evaluate(1);});
	}else if(state.parte4.resp_04_01_verify == "correct")
	{
		$(".parada-1 .correto").removeClass('invisible').addClass('visible');
		$(".p-04-01").removeClass('visible').addClass('invisible');
	}else if(state.parte4.resp_04_01_verify == "wrong")
	{
		$(".parada-1 .errado").removeClass('invisible').addClass('visible');
		$(".parada-1 .sua-resposta").html(state.parte4.resp_04_01);
		$(".p-04-01").removeClass('visible').addClass('invisible');
	}
	
	//Parada 2
	if(state.parte4.resp_04_02_verify == "")
	{
		$("#bt-04-02").click(function (){evaluate(2);});
	}else if(state.parte4.resp_04_02_verify == "correct")
	{
		$(".parada-2 .correto").removeClass('invisible').addClass('visible');
		$(".p-04-02").removeClass('visible').addClass('invisible');
	}else if(state.parte4.resp_04_02_verify == "wrong")
	{
		$(".parada-2 .errado").removeClass('invisible').addClass('visible');
		$(".parada-2 .sua-resposta").html(state.parte4.resp_04_02);
		$(".p-04-02").removeClass('visible').addClass('invisible');
	}
	
	//Parada 3
	if(state.parte4.resp_04_03_verify == "")
	{
		$("#bt-04-03").click(function(){
			$(".parada-4").removeClass('invisible').addClass('visible');
			$("#bt-04-03").addClass('invisible');
			state.parte4.resp_04_03_verify = "done";
		});
	}else if(state.parte4.resp_04_03_verify == "done")
	{
		$(".parada-4").removeClass('invisible').addClass('visible');
		$("#bt-04-03").addClass('invisible');
	}
	
	$("#bt-04-04").click(function (){finish();$("#bt-04-04").addClass('invisible');$(".final").removeClass('invisible').addClass('visible');});
} 
 
/*
 * Avaliação da atividade
 */
function evaluate(num)
{
	//console.log("avaliar");
	if(num == 1)
	{
		//Verificação do resultado oferecido pelo usuário no 1º campo
		//console.log("aki");
		state.parte4.resp_04_01 = $("#04-01").val();
		if(state.parte4.resp_04_01 == 6)
		{
			//console.log("certo");
			state.parte4.resp_04_01_verify = "correct";
			$(".parada-1 .correto").removeClass('invisible').addClass('visible');
			$(".p-04-01").removeClass('visible').addClass('invisible');
			state.parte4.score_04_01 = 100;
		}
		else
		{
			//console.log("errado");
			state.parte4.resp_04_01_verify = "wrong";
			$(".parada-1 .errado").removeClass('invisible').addClass('visible');
			$(".parada-1 .sua-resposta").html(state.parte4.resp_04_01);
			$(".p-04-01").removeClass('visible').addClass('invisible');
			state.parte4.score_04_01 = 0;
		}
		$(".parada-2").removeClass('invisible').addClass('visible');
	}
	
	if(num == 2)
	{
		//Verificação do resultado oferecido pelo usuário no 1º campo
		var i;
		var x;
		var z;
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
		state.parte4.resp_04_02 = $("#04-02").val();
		if(correct == 8)
		{
			state.parte4.resp_04_02_verify = "correct";
			$(".parada-2 .correto").removeClass('invisible').addClass('visible');
			$(".p-04-02").removeClass('visible').addClass('invisible');
			state.parte4.score_04_02 = 100;
		}
		else
		{
			state.parte4.resp_04_02_verify = "wrong";
			$(".parada-2 .errado").removeClass('invisible').addClass('visible');
			$(".sua-resposta").html(state.parte4.resp_04_02);
			$(".p-04-02").removeClass('visible').addClass('invisible');
			state.parte4.score_04_02 = 0;
		}
		$(".parada-3").removeClass('invisible').addClass('visible');
	}
	
}

/*
 * Finaliza a atividade
 */
function finish () {

	state.parte4.complete_04 = true;
	state.completed = true;
	
	var success = commit(state);
	
	if (success) {
		/*$("#enviar").button("option", "disabled", true);
		$("#answer").button("option", "disabled", false);
		$(".completion-message").show();
		$("#after-finish-dialog").dialog("open");
		$(".count").html(current_count);
		$(".score").show();*/
		//alert("Vá para a próxima seção (no sumário, à esquerda da tela)");
		alert("Esta etapa da atividade está finalizada.");
	}
	else {
		alert("Falha ao enviar dados para o LMS.");
	}
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
	ans.part = 4;
	ans.parte4 = {};
	ans.parte4.part_stop = 1;
	ans.parte4.resp_04_01_verify = "";//no caso, DONE - significa feito
	ans.parte4.resp_04_01 = "";// armazenar os values
	ans.parte4.resp_04_02 = "";// armazenar os values
	ans.parte4.resp_04_02_verify = "";//no caso, DONE - significa feito
	ans.parte4.resp_04_03_verify = ""//no caso, DONE - significa feito
	ans.parte4.complete_04 = false;
	ans.parte4.score_04_01 = 0;//score parcial - 
	ans.parte4.score_04_02 = 0;//score parcial - 
	ans.parte4.score_04 = 0;
	
	// Conecta-se ao LMS
	session_connected = scorm.init();
    
	// Verifica se a AI já foi concluída.
	var completionstatus = scorm.get("cmi.completion_status");

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
		ans.part = 4;
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
  data.score = (state.parte4.score_04_01 +	state.parte4.score_04_02)/2;
  
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