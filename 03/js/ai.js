var scorm = pipwerks.SCORM; // Seção SCORM
scorm.version = "2004"; // Versão da API SCORM

var state = {};
var flashMovie;

var t1;

$(document).ready(init); // Inicia a AI.
$(window).unload(uninit); // Encerra a AI.

/*
 * Inicia a Atividade Interativa (AI)
 */ 
function init () {
	preFetchConfig();
	state = fetch();
	checkCallback();
	//posFetchConfig();
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
		swf: '../swf/AI-0114.swf',
		width: 640,
		height: 480,
		play: false,
		id: 'ai-0114'
	}
	);
	
	ai = document.getElementById("ai-0114");
}

/*
 * Configurações DEPENDENTES do status da AI 
 */
function posFetchConfig () {
	//Parada 1

	if(state.parte3.resp_03_01_verify == "")
	{
		$("#bt-03-01").click(function(){evaluate(1);commit(state);});

	}else if(state.parte3.resp_03_01_verify == "done")
	{
		$(".parada-2").removeClass('invisible').addClass('visible');
		$("#bt-03-01").addClass('invisible');
	}
	
	//Parada 2
	if(state.parte3.resp_03_02_verify == "")
	{
		$("#bt-03-02").click(function(){
			$(".parada-3").removeClass('invisible').addClass('visible');
			$("#bt-03-02").addClass('invisible');
			state.parte3.resp_03_02_verify = "done";commit(state);
		});
	}else if(state.parte3.resp_03_02_verify == "done")
	{		
		$(".parada-3").removeClass('invisible').addClass('visible');
		$("#bt-03-02").addClass('invisible');
	}
	
	//Parada 3
	if(state.parte3.resp_03_03_verify == "")
	{
		$("#bt-03-03").click(function(){
			$(".parada-4").removeClass('invisible').addClass('visible');
			$("#bt-03-03").addClass('invisible');
			state.parte3.resp_03_03_verify = "done";commit(state);
		});
	}else if(state.parte3.resp_03_03_verify == "done")
	{
		$(".parada-4").removeClass('invisible').addClass('visible');
		$("#bt-03-03").addClass('invisible');
	}
	
	//Parada 4
	if(state.parte3.resp_03_04_verify == "")
	{
		$("#bt-03-04").click(function(){
			$(".parada-5").removeClass('invisible').addClass('visible');
			$("#bt-03-04").addClass('invisible');
			state.parte3.resp_03_04_verify = "done";commit(state);
		});
	}else if(state.parte3.resp_03_04_verify == "done")
	{
		$(".parada-5").removeClass('invisible').addClass('visible');
		$("#bt-03-04").addClass('invisible');
	}
	
	//Parada 5
	if(state.parte3.resp_03_05_verify == "")
	{
		$("#bt-03-05").click(function(){
			$(".parada-6").removeClass('invisible').addClass('visible');
			$("#bt-03-05").addClass('invisible');
			state.parte3.resp_03_05_verify = "done";
			ai.setDomainClosed(true);// Verificar a função que coloca x = 0 e y = 0 no domínio e reinicializa a atividade
			commit(state);
		});
	}else if(state.parte3.resp_03_05_verify == "done")
	{
		$(".parada-6").removeClass('invisible').addClass('visible');
		$("#bt-03-05").addClass('invisible');
		ai.setDomainClosed(true);// Verificar a função que coloca x = 0 e y = 0 no domínio e reinicializa a atividade
	}
	
	//Parada 6
	if(state.parte3.resp_03_06_verify == "")
	{
		$("#bt-03-06").click(function() {evaluate(6);commit(state);});
	}else if(state.parte3.resp_03_06_verify == "done")
	{
		$(".parada-7").removeClass('invisible').addClass('visible');
		$("#bt-03-06").addClass('invisible');
		ai.setPos(2,0);// Verificar a função que coloca o ponto na fronteira (x=2 e y=0)
	}
	
	//Parada 7
	if(state.parte3.resp_03_07_verify == "")
	{
		$("#bt-03-07").click(function(){
			$(".parada-8").removeClass('invisible').addClass('visible');
			$("#bt-03-07").addClass('invisible');
			state.parte3.resp_03_07_verify = "done";
			commit(state);
		});
	}else if(state.parte3.resp_03_07_verify == "done")
	{
		$(".parada-8").removeClass('invisible').addClass('visible');
		$("#bt-03-07").addClass('invisible');
	}
	
	//Parada 8
	if(state.parte3.resp_03_08_verify == "")
	{
		$("#bt-03-08").click(function(){evaluate(8);commit(state);});
	}
	else if(state.parte3.resp_03_08_verify == "done")
	{
		$("select[name='sl-03-dom-01'] option[value='"+state.parte3.resp_03_08_01+"']").attr({selected:'selected',disabled:true});
		$(".parada-9").removeClass('invisible').addClass('visible');
		$("#bt-03-08").addClass('invisible');
		if(state.parte3.score_03_01 < 100)
		{
			$(".parada-9 .error").removeClass('invisible').addClass('visible');
		}
	}
	
	//Parada 9
	if(state.parte3.resp_03_09_verify == "")
	{
		$("#bt-03-09").click(function(){evaluate(9);commit(state);});
	}else if(state.parte3.resp_03_09_verify == "done")
	{
		$("select[name='sl-03-dom-02'] option[value='"+state.parte3.resp_03_09_01+"']").attr({selected:'selected',disabled:true});
		$(".parada-10").removeClass('invisible').addClass('visible');
		$("#bt-03-09").addClass('invisible');
	}
	
	//Parada 10
	if(state.parte3.resp_03_10_verify == "")
	{
		$("#bt-03-10").click(function(){
			$(".parada-11").removeClass('invisible').addClass('visible');
			$("#bt-03-10").addClass('invisible');
			state.parte3.resp_03_10_verify = "done";
			ai.setDomainPos(Math.PI, Math.PI);// Alterar o domínio para x >= pi
			ai.setDomainClosed(false);// abrir o domínio
			//ai.setZoom(1);//voltar zoom para 1
			commit(state);
		});
	}else if(state.parte3.resp_03_10_verify == "done")
	{
		$(".parada-11").removeClass('invisible').addClass('visible');
		$("#bt-03-10").addClass('invisible');
		ai.setDomainPos(Math.PI, Math.PI);// Alterar o domínio para x >= pi
		ai.setDomainClosed(false);// abrir o domínio
		//ai.setZoom(1);//voltar zoom para 1
	}
	
	//Parada 11
	if(state.parte3.resp_03_11_verify == "")
	{
		$("#bt-03-11").click(function(){
			$(".parada-12").removeClass('invisible').addClass('visible');
			$("#bt-03-11").addClass('invisible');
			state.parte3.resp_03_11_verify = "done";
			commit(state);
		});
	}else if(state.parte3.resp_03_11_verify == "done")
	{
		$(".parada-12").removeClass('invisible').addClass('visible');
		$("#bt-03-11").addClass('invisible');
	}
	
	//Parada 12
	if(state.parte3.resp_03_12_verify == "")
	{
		$("#bt-03-12").click(function(){evaluate(12);commit(state);});
	}else if(state.parte3.resp_03_12_verify == "done")
	{
		$("select[name='sl-03-dom-03'] option[value='"+state.parte3.resp_03_12_01+"']").attr({selected:'selected',disabled:true});
		$(".parada-13").removeClass('invisible').addClass('visible');
		$("#bt-03-12").addClass('invisible');
	}
	
	//Parada 13
	if(state.parte3.resp_03_13_verify == "")
	{
		$("#bt-03-13").click(function(){evaluate(13);commit(state);});
	}else if(state.parte3.resp_03_13_verify == "done")
	{
		$("select[name='sl-03-dom-04'] option[value='"+state.parte3.resp_03_13_01+"']").attr({selected:'selected',disabled:true});
		$("select[name='sl-03-dom-05'] option[value='"+state.parte3.resp_03_13_02+"']").attr({selected:'selected',disabled:true});
		$("select[name='sl-03-dom-06'] option[value='"+state.parte3.resp_03_13_03+"']").attr({selected:'selected',disabled:true});
		$("select[name='sl-03-dom-07'] option[value='"+state.parte3.resp_03_13_04+"']").attr({selected:'selected',disabled:true});
		$("#bt-03-13").addClass('invisible');
		$(".parada-14").removeClass('invisible').addClass('visible');
		$(".parada-13 .resposta").removeClass('invisible').addClass('visible');
	}
	
	$("#bt-03-14").click(function () {finish();});
}

/*
 * Enviado pelo AS - 
 */

 
 
/*
 * Avaliação da atividade
 */
function evaluate(num)
{
	if(num == 1)
	{
		//Verificando se o ponto na atividade está dentro ou fora do domínio
		if(ai.insideDomain())//TODO: Verificar qual é a função no AS que faz isso
		{
			state.parte3.resp_03_01_verify = "done";
			$(".parada-2").removeClass('invisible').addClass('visible');
			$("#bt-03-01").addClass('invisible');
		}else{
			alert("O ponto (x,y) está fora do domínio. Posicione novamente.");
		}
	}
	
	if(num == 6)
	{
		if(ai.onBorder())// Função que verifica se o ponto está ou não na fronteira
		{
			state.parte3.resp_03_06_verify = "done";
			$(".parada-7").removeClass('invisible').addClass('visible');
			$("#bt-03-06").addClass('invisible');
		}else {
			alert("O ponto (x,y) está fora da borda. Posicione novamente.\nDica: Arraste o ponto para a borda da função até que o eixo fique vermelho.");
			//Confirm box de avaliação do ponto na fronteira
			/*$("#dialog-confirm").dialog({
				resizable: false,
				modal: true,
				buttons: {
					"Posicione (x,y) por mim": function() {*/
					
					
						//ai.setPos(2,0);// Verificar função que posiciona ponto na fronteira(2,0)
						//$(".parada-7").removeClass('invisible').addClass('visible');
						//$("#bt-03-06").addClass('invisible');
						
						
						//$(this).dialog( "close" );
					/*},
					"Ok": function() {
						$(this).dialog( "close" );
					}
				}
			});*/
		}
	}
	
	if(num == 8)
	{
		//Avaliando a resposta e colocando o score parcial da atividade
		if($("select[name='sl-03-dom-01'] :selected").val() == "fechado")
		{
			state.parte3.score_03_08 = 100;
		}else{
			state.parte3.score_03_08 = 0;
			$(".parada-9 .error").removeClass('invisible').addClass('visible');
		}
		
		//Armazenando os valores no array de avaliação dos selects
		state.parte3.resp_03_08_01 = $("select[name='sl-03-dom-01'] :selected").val();// armazenar os values
		
		//Atualizando a visibilidade da próxima parte
		$("select[name='sl-03-dom-01']").attr({disabled:true});
		$("#bt-03-08").addClass('invisible');
		$(".parada-9").removeClass('invisible').addClass('visible');
		state.parte3.resp_03_08_verify = "done";
	}
	
	if(num == 9)
	{
		//Avaliando a resposta e colocando o score parcial da atividade
		if($("select[name='sl-03-dom-02'] :selected").val() == "aberto")
		{
			state.parte3.score_03_09 = 100;
		}else{
			state.parte3.score_03_09 = 0;
		}
		
		//Armazenando os valores no array de avaliação dos selects
		state.parte3.resp_03_09_01 = $("select[name='sl-03-dom-02'] :selected").val();// armazenar os values
		
		//Atualizando a visibilidade da próxima parte
		$("select[name='sl-03-dom-02']").attr({disabled:true});
		$("#bt-03-09").addClass('invisible');
		$(".parada-10").removeClass('invisible').addClass('visible');
		state.parte3.resp_03_09_verify = "done";
	}
	
	if(num == 12)
	{
		//Avaliando a resposta e colocando o score parcial da atividade
		if($("select[name='sl-03-dom-03'] :selected").val() == "aberto")
		{
			state.parte3.score_03_12 = 100;
		}else{
			state.parte3.score_03_12 = 0;
		}
		
		//Armazenando os valores no array de avaliação dos selects
		state.parte3.resp_03_12_01 = $("select[name='sl-03-dom-03'] :selected").val();// armazenar os values
		
		//Atualizando a visibilidade da próxima parte
		$("select[name='sl-03-dom-03']").attr({disabled:true});
		$("#bt-03-12").addClass('invisible');
		$(".parada-13").removeClass('invisible').addClass('visible');
		state.parte3.resp_03_12_verify = "done";
	}
	
	if(num == 13)
	{
		state.parte3.score_03_13 = 0
		//Avaliando a resposta e colocando o score parcial da atividade
		if($("select[name='sl-03-dom-04'] :selected").val() == "aberto")
		{
			state.parte3.score_03_13 = state.parte3.score_03_13 + 25;
		} if($("select[name='sl-03-dom-05'] :selected").val() == "fechado")
		{
			state.parte3.score_03_13 = state.parte3.score_03_13 + 25;
		} if($("select[name='sl-03-dom-06'] :selected").val() == "aberto")
		{
			state.parte3.score_03_13 = state.parte3.score_03_13 + 25;
		} if($("select[name='sl-03-dom-07'] :selected").val() == "fechado")
		{
			state.parte3.score_03_13 = state.parte3.score_03_13 + 25;
		}
		
		//Armazenando os valores no array de avaliação dos selects
		state.parte3.resp_03_13_01 = $("select[name='sl-03-dom-04'] :selected").val();// armazenar os values
		state.parte3.resp_03_13_02 = $("select[name='sl-03-dom-05'] :selected").val();// armazenar os values
		state.parte3.resp_03_13_03 = $("select[name='sl-03-dom-06'] :selected").val();// armazenar os values
		state.parte3.resp_03_13_04 = $("select[name='sl-03-dom-07'] :selected").val();// armazenar os values
		
		//Atualizando a visibilidade da próxima parte
		$("select[name='sl-03-dom-04']").attr({disabled:true});
		$("select[name='sl-03-dom-05']").attr({disabled:true});
		$("select[name='sl-03-dom-06']").attr({disabled:true});
		$("select[name='sl-03-dom-07']").attr({disabled:true});
		$("#bt-03-13").addClass('invisible');
		$(".parada-14").removeClass('invisible').addClass('visible');
		$(".parada-13 .resposta").removeClass('invisible').addClass('visible');
		
		state.parte3.resp_03_13_verify = "done";
	}
}

/*
 * Finaliza a atividade
 */
function finish () {

	state.parte3.complete_03 = true;
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

function checkCallback () {
  var t2 = new Date().getTime();
  
  try {
    ai.doNothing();
	posFetchConfig();
  }
  catch(error) {
    setTimeout("checkCallback()", 1000);
  }
}