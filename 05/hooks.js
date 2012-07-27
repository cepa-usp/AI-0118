var scorm = pipwerks.SCORM; // Seção SCORM
scorm.version = "2004"; // Versão da API SCORM

var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!

var oaName = "AI-0118_5"
function AILocalStorageData() {
    this.txResposta1 = "";
}
var ai_data;

function startAI(){
    loadScreen("../flash/AI-0112.swf", 640, 480);
    loadContent();

}


/*
 * Configurações DEPENDENTES do status da AI 
 */
function posFetchConfig () {
	//Parada 1
	if(state.parte5.resp_05_01_verify == "")
	{
		$("#bt-05-01").click(function (){
			$(".parada-2").removeClass('invisible').addClass('visible');
			$("#bt-05-01").addClass('invisible');
			state.parte5.resp_05_01_verify = "done";
			ai = $("#ai-0112")[0];
			config_parada2();
		});
	}else if(state.parte5.resp_05_01_verify == "done")
	{
		$(".parada-2").removeClass('invisible').addClass('visible');
		$("#bt-05-01").addClass('invisible');
		config_parada2();
	}
	
	//Parada 2
	if(state.parte5.resp_05_02_verify == "")
	{
		$("#bt-05-02").click(function(){
			$(".parada-3").removeClass('invisible').addClass('visible');
			$("#bt-05-02").addClass('invisible');
			state.parte5.resp_05_02_verify = "done";
		});
	}else if(state.parte5.resp_05_02_verify == "done")
	{	
		$(".parada-3").removeClass('invisible').addClass('visible');
		$("#bt-05-02").addClass('invisible');
	}
	
	//Parada 3
	if(state.parte5.resp_05_03_verify == "")
	{
		$("#bt-05-03").click(function(){
			$(".parada-4").removeClass('invisible').addClass('visible');
			$("#bt-05-03").addClass('invisible');
			state.parte5.resp_05_03_verify = "done";
			state.parte5.resp_05_plot = ai.sendPointsToJs();//Armazeno oq estiver grafado pelo usuário
		});
	}else if(state.parte5.resp_05_03_verify == "done")
	{
		$(".parada-4").removeClass('invisible').addClass('visible');
		$("#bt-05-03").addClass('invisible');
		ai.receivePointsFromJs(state.parte5.resp_05_plot);//Retorno o desenho salvo pelo usuário
	}
	
	//Parada 4
	if(state.parte5.resp_05_04_verify == "")
	{
		$("#bt-05-04").click(function(){
			$(".parada-5").removeClass('invisible').addClass('visible');
			$("#bt-05-04").addClass('invisible');
			state.parte5.resp_05_04_verify = "done";
			state.parte5.resp_05_plot = ai.sendPointsToJs();//Armazeno oq estiver grafado pelo usuário
		});
	}else if(state.parte5.resp_05_04_verify == "done")
	{
		$(".parada-5").removeClass('invisible').addClass('visible');
		$("#bt-05-04").addClass('invisible');
		ai.receivePointsFromJs(state.parte5.resp_05_plot);//Retorno o desenho salvo pelo usuário
	}
	
	//Parada 5
	if(state.parte5.resp_05_05_verify == "")
	{
		$("#bt-05-05").click(function(){
			$(".parada-6").removeClass('invisible').addClass('visible');
			$("#bt-05-05").addClass('invisible');
			state.parte5.resp_05_05_verify = "done";
			state.parte5.resp_05_plot = ai.sendPointsToJs();//Armazeno oq estiver grafado pelo usuário
			config_parada6();
		});
	}else if(state.parte5.resp_05_05_verify == "done")
	{
		$(".parada-6").removeClass('invisible').addClass('visible');
		$("#bt-05-05").addClass('invisible');
		ai.receivePointsFromJs(state.parte5.resp_05_plot);//Retorno o desenho salvo pelo usuário
		config_parada6();
	}
	
	//Parada 6
	if(state.parte5.resp_05_06_verify == "")
	{
		$("#bt-05-06").click(function(){
			$(".parada-7").removeClass('invisible').addClass('visible');
			$("#bt-05-06").addClass('invisible');
			state.parte5.resp_05_06_verify = "done";
			state.parte5.resp_05_plot = ai.sendPointsToJs();//Armazeno oq estiver grafado pelo usuário
		});
	}else if(state.parte5.resp_05_06_verify == "done")
	{
		$(".parada-7").removeClass('invisible').addClass('visible');
		$("#bt-05-06").addClass('invisible');
		ai.receivePointsFromJs(state.parte5.resp_05_plot);//Retorno o desenho salvo pelo usuário
	}
	
	//Parada 7
	if(state.parte5.resp_05_07_verify == "")
	{
		$("#bt-05-07").click(function(){
			config_parada8();
			$(".parada-8").removeClass('invisible').addClass('visible');
			$("#bt-05-07").addClass('invisible');
			state.parte5.resp_05_07_verify = "done";
			state.parte5.resp_05_plot = ai.sendPointsToJs();//Armazeno oq estiver grafado pelo usuário
		});
	}else if(state.parte5.resp_05_07_verify == "done")
	{
		config_parada8();
		$(".parada-8").removeClass('invisible').addClass('visible');
		$("#bt-05-07").addClass('invisible');
		ai.receivePointsFromJs(state.parte5.resp_05_plot);//Retorno o desenho salvo pelo usuário
	}
	
	$("#bt-05-08").button().click(function (){finish();});
}

/**
* Configuração das paradas - comunicação entre Flash e Javascript
*/
function config_parada2()
{
	var aux = "<item label='y' value='1'><points><pt x='0' y='0' /><pt x='5' y='5' /></points></item>";
	ai.receivePointsFromJs(aux);
}

function config_parada6()
{
	var aux = "<item label='z' value='1'><points><pt x='0.2' y='5' /><pt x='0.25' y='4' /><pt x='0.3333' y='3' /><pt x='0.5' y='2' /><pt x='1' y='1' /><pt x='2' y='0.5' /><pt x='3' y='0.3333' /><pt x='4' y='0.25' /><pt x='5' y='0.2' /></points></item>";
	var str = ai.sendPointsToJs();
	var nova_str = str.concat(aux);
	ai.receivePointsFromJs(nova_str);
}

function config_parada8()
{
	flashMovie2 = $('#movie-0113');

	flashMovie2.flash(
	{
		swf: '../swf/AI-0113.swf',
		width: 640,
		height: 480,
		play: false,
		id: 'ai-0113'
	}
	);
	
	ai2 = $("#ai-0113")[0]; 
}
 
/*
 * Avaliação da atividade
 */
function evaluate(num)
{
	
}

/*
 * Finaliza a atividade
 */
function finish () {

	state.parte5.complete_05 = true;
	
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
	ans.part = 5;
	ans.parte5 = {};
	ans.parte5.part_stop = 1;
	ans.parte5.complete_05 = false;
	ans.parte5.resp_05_01_verify = "";
	ans.parte5.resp_05_02_verify = "";
	ans.parte5.resp_05_03_verify = "";
	ans.parte5.resp_05_04_verify = "";
	ans.parte5.resp_05_05_verify = "";
	ans.parte5.resp_05_06_verify = "";
	ans.parte5.resp_05_07_verify = "";
	ans.parte5.resp_05_plot = "";
	ans.parte5.score_05 = 0;
	
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
		ans.part = 5;
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
  data.score = 100;
  
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