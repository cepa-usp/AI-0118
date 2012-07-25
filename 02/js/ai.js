var scorm = pipwerks.SCORM; // Seção SCORM
scorm.version = "2004"; // Versão da API SCORM

var state = {};
var flashMovie;
var N_ANSWERS = 10;

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
		swf: '../swf/AI-0111.swf',
		width: 640,
		height: 480,
		play: false
	}
	);
	abrejanela();
}

/*
 * Configurações DEPENDENTES do status da AI 
 */
function posFetchConfig () {
	if(state.parte2.resp_02_01_verify == "")
	{
		$("#bt-02-01").click(function (){
			state.parte2.resp_02_01_verify = "done";
			$(".parada-2").removeClass('invisible').addClass('visible');
			$("#bt-02-01").addClass('invisible');
			commit(state);
		});
	}else if(state.parte2.resp_02_01_verify == "done")
	{
		$(".parada-2").removeClass('invisible').addClass('visible');
		$("#bt-02-01").addClass('invisible');
	}

	if(state.parte2.resp_02_02_verify == "")
	{
		$("#bt-02-02").click(function (){
			evaluate(2);
			state.parte2.resp_02_02_verify = "done";
			commit(state);
		});
	}else if(state.parte2.resp_02_02_verify == "done")
	{		
		$("select[name='sl-02-x-sig'] option[value='"+state.parte2.resp_02_02_01+"']").attr({selected:'selected'});
		$("select[name='sl-02-x-value'] option[value='"+state.parte2.resp_02_02_02+"']").attr({selected:'selected'});
		$("select[name='sl-02-y-sig'] option[value='"+state.parte2.resp_02_02_03+"']").attr({selected:'selected'});
		$("select[name='sl-02-y-value'] option[value='"+state.parte2.resp_02_02_04+"']").attr({selected:'selected'});
		$("select[name='sl-02-x-sig'] ").attr({disabled:true});
		$("select[name='sl-02-x-value'] ").attr({disabled:true});
		$("select[name='sl-02-y-sig'] ").attr({disabled:true});
		$("select[name='sl-02-y-value'] ").attr({disabled:true});
		$("#bt-02-02").addClass('invisible');
		$(".parada-3").removeClass('invisible').addClass('visible');
		
		flashMovie.flash(
			{
				swf: '../swf/ai-0119.swf',
				width: 640,
				height:480,
				play: false,
				id: 'ai-0119-1'
			}
		);
		
		ai = document.getElementById("ai-0119-1");
		
		if(state.parte2.score_02_02 < 100)
		{
			$(".parada-3 .erro").removeClass('invisible').addClass('visible');
		}else{
			$(".parada-3 .acerto").removeClass('invisible').addClass('visible');
		}
	}
	if(state.parte2.resp_02_03_verify == "")
	{
		ai.start();
	}else if(state.parte2.resp_02_03_verify == "done")
	{
		flashMovie.flash(
			{
				swf: '../swf/ai-0119.swf',
				width: 640,
				height:480,
				play: false,
				id: 'ai-0119-3'
			}
		);
		
		ai = document.getElementById("ai-0119-3");
		abrejanela();
		$(".parada-4").removeClass('invisible').addClass('visible');
		$("#bt-02-03").removeClass('visible').addClass('invisible');
	}
	$("#bt-02-03").click(function () {finish();});
}

/*
 * Enviado pelo AS - 
 */
function sendToJavaScript()
{
	evaluate(3);
	ai.finish();
	state.parte2.resp_02_03_verify = "done";
	commit(state);
}
 
 
/*
 * Avaliação da atividade
 */
function evaluate(num)
{
	if(num == 2)
	{
		//console.log($("select[name='sl-02-x-sig'] :selected").val());
		//console.log($("select[name='sl-02-x-value'] :selected").val());
		//console.log($("select[name='sl-02-y-sig'] :selected").val());
		//console.log($("select[name='sl-02-y-value'] :selected").val());
		//Avaliando a resposta e colocando o score parcial da atividade
		if($("select[name='sl-02-x-sig'] :selected").val() == "maior" && $("select[name='sl-02-x-value'] :selected").val() == "0" && $("select[name='sl-02-y-sig'] :selected").val() == "maior" && $("select[name='sl-02-y-value'] :selected").val() == "0")
		{
			//console.log("correto");
			state.parte2.score_02_02 = 100;
		}else if($("select[name='sl-02-x-sig'] :selected").val() == "maiorigual" && $("select[name='sl-02-x-value'] :selected").val() == "0" && $("select[name='sl-02-y-sig'] :selected").val() == "maior" && $("select[name='sl-02-y-value'] :selected").val() == "0")
		{
			//console.log("correto/2-1");
			state.parte2.score_02_02 = 90;
		}else if($("select[name='sl-02-x-sig'] :selected").val() == "maior" && $("select[name='sl-02-x-value'] :selected").val() == "0" && $("select[name='sl-02-y-sig'] :selected").val() == "maiorigual" && $("select[name='sl-02-y-value'] :selected").val() == "0")
		{
			//console.log("correto/2-2");
			state.parte2.score_02_02 = 90;
		}else if($("select[name='sl-02-x-sig'] :selected").val() == "maiorigual" && $("select[name='sl-02-x-value'] :selected").val() == "0" && $("select[name='sl-02-y-sig'] :selected").val() == "maiorigual" && $("select[name='sl-02-y-value'] :selected").val() == "0")
		{
			//console.log("correto/2-3");
			state.parte2.score_02_02 = 80;
		}else
		{
			//console.log("errado");
			state.parte2.score_02_02 = 0;
		}
		//console.log(state.parte2.score_02_02);
		//console.log("saindo");
		//Armazenando os valores no array de avaliação dos selects
		state.parte2.resp_02_02_01 = $("select[name='sl-02-x-sig'] :selected").val();// armazenar os values
		state.parte2.resp_02_02_02 = $("select[name='sl-02-x-value'] :selected").val();// armazenar os values
		state.parte2.resp_02_02_03 = $("select[name='sl-02-y-sig'] :selected").val();// armazenar os values
		state.parte2.resp_02_02_04 = $("select[name='sl-02-y-value'] :selected").val();// armazenar os values
		
		//Atualizando a visibilidade da próxima parte
		$("select[name='sl-02-x-sig']").attr({disabled:true});
		$("select[name='sl-02-x-value']").attr({disabled:true});
		$("select[name='sl-02-y-sig']").attr({disabled:true});
		$("select[name='sl-02-y-value']").attr({disabled:true});
		$("#bt-02-02").addClass('invisible');
		$(".parada-3").removeClass('invisible').addClass('visible');
		
		flashMovie.flash(
			{
				swf: '../swf/ai-0119.swf',
				width: 640,
				height:480,
				id: 'ai-0119-2'
			}
		);
		
		ai = document.getElementById("ai-0119-2");
		
		if(state.parte2.score_02_02 < 100)
		{
			$(".parada-3 .erro").removeClass('invisible').addClass('visible');
		}else{
			$(".parada-3 .acerto").removeClass('invisible').addClass('visible');
		}
	}
	
	if(num == 3)
	{
		//Avaliação da resposta do usuário à atividade AI-0119
		state.parte2.score_02_03 = ai.getScore();
		$(".parada-4").removeClass('invisible').addClass('visible');
	}
}

/*
 * Finaliza a atividade
 */
function finish () {

	state.parte2.complete_02 = true;
	state.completed = true;
	
	var success = commit(state);
	
	if (success) {
		/*$("#enviar").button("option", "disabled", true);
		$("#answer").button("option", "disabled", false);
		$(".completion-message").show();
		$("#after-finish-dialog").dialog("open");
		$(".count").html(current_count);
		$(".score").show();*/
		alert("Vá para a próxima seção (no sumário, à esquerda da tela)");
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
	ans.part = 2;
	ans.parte2 = {};
	ans.parte2.part_stop = 1;
	ans.parte2.resp_02_01_verify = "";//no caso, DONE - significa feito
	ans.parte2.resp_02_02_01 = "";// armazenar os values
	ans.parte2.resp_02_02_02 = "";// armazenar os values
	ans.parte2.resp_02_02_03 = "";// armazenar os values
	ans.parte2.resp_02_02_04 = "";// armazenar os values
	ans.parte2.resp_02_02_verify = "";//no caso, DONE - significa feito
	ans.parte2.resp_02_03_verify == ""//no caso, DONE - significa feito
	ans.parte2.complete_02 = false;
	ans.parte2.score_02_02 = 0;//score parcial - selects
	ans.parte2.score_02_03 = 0;//score parcial - atividade 119
	ans.parte2.score_02 = 0;
	
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
		ans.part = 2;
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
  data.score = (state.parte2.score_02_02+state.parte2.score_02_03)/2//score parcial - selects
  
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