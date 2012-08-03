var scorm = pipwerks.SCORM; // Seção SCORM
scorm.version = "2004"; // Versão da API SCORM

var state = {};
var flashMovie;

var a=[-2,-1.5,-1,-0.5,0,0.5,1,1.5,2];
var c=[-5,-4.5,-4,-3.5,-3,-2.5,-2,-1.5,-1,-0.5,0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5];

var a_sort;
var c_sort;

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
function preFetchConfig () 
{
	
	$('.borda').click(function() {

	$('#slidebottom').animate({
			right: parseInt($('#slidebottom').css('right'),10) == 0 ?
			-$('#slidebottom').outerWidth() + 20 :
			0
		});
	});
  
	flashMovie = $('.inner');

	flashMovie.flash(
	{
		swf: '../swf/AI-0117.swf',
		width: 640,
		height: 480,
		play: false,
		id: 'ai-0117'
	}
	);
	
	ai = $("#ai-0117")[0];
}

/*
 * Configurações DEPENDENTES do status da AI 
 */
function posFetchConfig () {
	//Parada 1
	if(state.parte7.resp_07_01_verify == "")
	{
		$("#bt-07-01").click(function () {
			$(".parada-2").removeClass('invisible').addClass('visible');
			state.parte7.resp_07_01_verify = "done";
			$("#bt-07-01").addClass('invisible');
		});
		
	}else if(state.parte7.resp_07_01_verify == "done")
	{
		$(".parada-2").removeClass('invisible').addClass('visible');
		$("#bt-07-01").addClass('invisible');
	}
	
	//Parada 2
	if(state.parte7.resp_07_02_verify == "")
	{
		$("#bt-07-02").click(function () {
			$(".parada-3").removeClass('invisible').addClass('visible');
			state.parte7.resp_07_02_verify = "done";
			$("#bt-07-02").addClass('invisible');
		});
		
	}else if(state.parte7.resp_07_02_verify == "done")
	{
		$(".parada-3").removeClass('invisible').addClass('visible');
		$("#bt-07-02").addClass('invisible');
	}
	
	//Parada 3
	if(state.parte7.resp_07_03_verify == "")
	{
		$("#bt-07-03").click(function () {
			$(".parada-4").removeClass('invisible').addClass('visible');
			state.parte7.resp_07_03_verify = "done";
			$("#bt-07-03").addClass('invisible');
			config_parada3();
		});
		
	}else if(state.parte7.resp_07_03_verify == "done")
	{
		$(".parada-4").removeClass('invisible').addClass('visible');
		$("#bt-07-03").addClass('invisible');
		config_parada3();
	}
	
	//Parada 4
	if(state.parte7.resp_07_04_verify == "")
	{
		$("#bt-07-04").click(function () {
			$(".parada-5").removeClass('invisible').addClass('visible');
			state.parte7.resp_07_04_verify = "done";
			$("#bt-07-04").addClass('invisible');
			config_parada4();
		});
	}else if(state.parte7.resp_07_04_verify == "done")
	{
		config_parada4();
		$(".parada-5").removeClass('invisible').addClass('visible');
		$("#bt-07-04").addClass('invisible');
	}
	
	//Parada 5
	if(state.parte7.resp_07_05_verify == "")
	{
		$("#bt-07-05").click(function () {
			$(".parada-6").removeClass('invisible').addClass('visible');
			state.parte7.resp_07_05_verify = "done";
			$("#bt-07-05").addClass('invisible');
			config_parada5();
		});
	}else if(state.parte7.resp_07_05_verify == "done")
	{
		config_parada5();
		$(".parada-6").removeClass('invisible').addClass('visible');
		$("#bt-07-05").addClass('invisible');
	}
	
	//Parada 6
	if(state.parte7.resp_07_06_verify == "")
	{
		$("#bt-07-06").click(function () {
			$(".parada-7").removeClass('invisible').addClass('visible');
			state.parte7.resp_07_06_verify = "done";
			$("#bt-07-06").addClass('invisible');
			config_parada6();
		});
	}else if(state.parte7.resp_07_06_verify == "done")
	{
		config_parada6();
		$(".parada-7").removeClass('invisible').addClass('visible');
		$("#bt-07-06").addClass('invisible');
	}
	
	//Parada 7
	if(state.parte7.resp_07_07_verify == "")
	{
		$("#bt-07-07").click(function () {
			$(".parada-8").removeClass('invisible').addClass('visible');
			$("#bt-07-07").addClass('invisible');
			state.parte7.resp_07_07_verify = "done";
			config_parada7();
		});
	}else if(state.parte7.resp_07_07_verify == "done")
	{
		config_parada7();
		$(".parada-8").removeClass('invisible').addClass('visible');
		$("#bt-07-07").addClass('invisible');
	}
	
	//Parada 8
	if(state.parte7.resp_07_08_verify == "")
	{
		$("#bt-07-08").click(function () {
			$(".parada-9").removeClass('invisible').addClass('visible');
			$("#bt-07-08").addClass('invisible');
			state.parte7.resp_07_08_verify = "done";
			config_parada8();
		});
	}else if(state.parte7.resp_07_08_verify == "done")
	{
		config_parada8();
		$(".parada-9").removeClass('invisible').addClass('visible');
		$("#bt-07-08").addClass('invisible');
	}
	
	//Parada 9
	if(state.parte7.resp_07_09_verify == "")
	{
		$("#bt-07-09-01").click(function () {
			$(".parada-9 continua").removeClass('invisible').addClass('visible');
			$("#bt-07-09-01").addClass('invisible');
			config_parada9();
		});
		$("#bt-07-09-02").click(function () {
			$(".parada-10").removeClass('invisible').addClass('visible');
			$("#bt-07-09-02").addClass('invisible');
			state.parte7.resp_07_09_verify = "done";
		});
	}else if(state.parte7.resp_07_09_verify == "done")
	{
		config_parada9();
		$(".parada-9 continua").removeClass('invisible').addClass('visible');
		$("#bt-07-09-01").addClass('invisible');
		$("#bt-07-09-02").addClass('invisible');
	}
	
	//Parada 10
	if(state.parte7.resp_07_10_verify == "")
	{
		$("#bt-07-10").click(function () {
			$(".parada-11").removeClass('invisible').addClass('visible');
			$("#bt-07-10").addClass('invisible');
			state.parte7.resp_07_10_verify = "done";
			config_parada10();
		});
	}else if(state.parte7.resp_07_10_verify == "done")
	{
		config_parada10();
		$(".parada-11").removeClass('invisible').addClass('visible');
		$("#bt-07-10").addClass('invisible');
	}
	
	//Parada 11
	if(state.parte7.resp_07_11_verify == "")
	{
		$("#bt-07-11").click(function () {
			$(".parada-12").removeClass('invisible').addClass('visible');
			$("#bt-07-11").addClass('invisible');
			state.parte7.resp_07_11_verify = "done";
			config_parada11();
		});
	}else if(state.parte7.resp_07_11_verify == "done")
	{
		config_parada11();
		$(".parada-12").removeClass('invisible').addClass('visible');
		$("#bt-07-11").addClass('invisible');
	}
	
	//Parada 12
	if(state.parte7.resp_07_12_verify == "")
	{
		$("#bt-07-12").click(function () {
			evaluate(12);
			$(".parada-13").removeClass('invisible').addClass('visible');
			$("#bt-07-12").addClass('invisible');
			state.parte7.resp_07_12_verify = "done";
			config_paradaFinal();
		});
	}else if(state.parte7.resp_07_12_verify == "done")
	{
		$(".parada-13").removeClass('invisible').addClass('visible');
		$("#bt-07-12").addClass('invisible');
		config_paradaFinal();
	}
	
	$("#bt-07-13").button().click(function (){finish();});
}

/*
 * Enviado para AS - 
 */
function config_parada3()
{

	ai.setEpsilon(3);
	ai.blockEpi(true);

}

function config_parada4()
{


		var pointX = ai.getX0();
		var pointY = ai.getY0();
		var delta = ai.getDelta();
		
		if(Math.abs(pointX - 2) > 0.2 )
		{
			ai.setX(2);
		}
		if(Math.abs(pointY - 2) > 0.2 )
		{
			ai.setY(2);
		}
		if(Math.abs(delta - 1) > 0.1 )
		{
			ai.setDelta(1);
		}
		ai.lockX0Y0();
		ai.lockDelta();

}

function config_parada5()
{

		var lim = ai.getL();
		
		if(Math.abs(lim - 20) > 0.2 )
		{
			ai.setL(20);
		}
		ai.lockL();

}

function config_parada6()
{

		ai.unlockL();

}

function config_parada7()
{

		ai.unlockDelta();

}

function config_parada8()
{

		ai.setDelta(0.2);
		ai.lockDelta();

}

function config_parada9()
{

		ai.setEpsilon(1);
		ai.unlockL();

}

function config_parada10()
{
 
		var lim = ai.getL();
		
		if(Math.abs(lim - 4) > 0.04 )
		{
			ai.setL(4);
		}
		ai.lockL();
		
		ai.setEpsilon(0.5);
		
		ai.unlockDelta();
		
}

function config_parada11()
{
		var lim = ai.getDelta();
		
		if(Math.abs(lim - 0.05) > 0.005 )
		{
			ai.setDelta(0.05);
		}
	
}

function config_paradaFinal()
{
	ai.changeFunction(2);
	ai.unlockX0Y0();
	ai.unlockDelta();
	ai.unlockL();
}
 
 
/*
 * Avaliação da atividade
 */
function evaluate(num)
{
	if(num == 12)
	{
		//Verificação do resultado oferecido pelo usuário no campo de limite
		if(state.parte7.resp_07_12 == "")
		{
			state.parte7.resp_07_12 = $("#07-12").val();
		}
		if(Math.abs(state.parte7.resp_07_12 - 4) > 0.4)
		{
			//Errou
			state.parte7.score_07_12 = 0;
			$(".parada-12 .p-07-12").removeClass('visible').addClass('invisible');
			$(".parada-12 .errado").removeClass('invisible').addClass('visible');
		}else{
			state.parte7.score_07_12 = 100;
			$(".parada-12 .p-07-12").removeClass('visible').addClass('invisible');
			$(".parada-12 .errado").removeClass('invisible').addClass('visible');
		}
	}
}

/*
 * Finaliza a atividade
 */
function finish () {

	state.parte7.complete_07 = true;
	
	var success = commit(state);
	
	if (success) {
		/*$("#enviar").button("option", "disabled", true);
		$("#answer").button("option", "disabled", false);
		$(".completion-message").show();
		$("#after-finish-dialog").dialog("open");
		$(".count").html(current_count);
		$(".score").show();*/
		alert("Go to next part");
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
	//ans.completed = false;
	//ans.try_completed = false;
	//ans.score = 0;
	//ans.learner = "";
	//ans.connected = false;
	ans.part = 7;
	ans.parte7 = {};
	ans.parte7.part_stop = 1;
	ans.parte7.complete_07 = false;
	ans.parte7.resp_07_01_verify = "";
	ans.parte7.resp_07_02_verify = "";
	ans.parte7.resp_07_03_verify = "";
	ans.parte7.resp_07_04_verify = "";
	ans.parte7.resp_07_05_verify = "";
	ans.parte7.resp_07_06_verify = "";
	ans.parte7.resp_07_07_verify = "";
	ans.parte7.resp_07_08_verify = "";
	ans.parte7.resp_07_09_verify = "";
	ans.parte7.resp_07_10_verify = "";
	ans.parte7.resp_07_11_verify = "";
	ans.parte7.resp_07_12_verify = "";
	ans.parte7.resp_07_12 = "";
	ans.parte7.score_07_12 = 0;
	
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
		//ans.completed = <valor padrão>;
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
		ans.part = 7;
		//ans.learner = scorm.get("cmi.learner_name");
		//ans.completed = false;
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
		//ans.completed = true;
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
  data.score = state.parte7.score_07_12;
  
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