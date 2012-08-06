/*
 ExternalInterface.addCallback("setA", setA);
 ExternalInterface.addCallback("setB", setB);
 ExternalInterface.addCallback("setC", setC);
 ExternalInterface.addCallback("getA", getA);
 ExternalInterface.addCallback("getB", getB);
 ExternalInterface.addCallback("getC", getC);
 ExternalInterface.addCallback("update", update);
 ExternalInterface.addCallback("reseta", reset);
 ExternalInterface.addCallback("f", f);
 ExternalInterface.addCallback("doNothing", doNothing);
 */

var scorm = pipwerks.SCORM; // Seção SCORM
scorm.version = "2004"; // Versão da API SCORM

var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!
var a=[-2,-1.5,-1,-0.5,0,0.5,1,1.5,2];
var c=[-5,-4.5,-4,-3.5,-3,-2.5,-2,-1.5,-1,-0.5,0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5];
var a_sort;
var c_sort;


var oaName = "AI-0118_6"
function AILocalStorageData() {
    this.resp_06_01_verify = "";

}
var ai_data;

function startAI(){
    loadScreen("../swf/AI-0115.swf", 640, 480);
    loadContent();

}


/**
 Determinar o comportamento inicial da atividade que está sendo inserida
 */
function onInitialize(){
    loadSlide('quadro1');

}



function start_quadro1(){
    $("#quadro1_correto").hide();
    $("#quadro1_errado").hide();
    $("#quadro1_prosseguir").hide();

    $("#bt-06-01").button().click(function (){
            avaliarQuadro1();
        });
    $("#btAbrirQuadro2").button().click(function (){
        loadSlide('quadro2');
    });

}

function avaliarQuadro1() {
    var r_user = $("#06-01").val();
    r_user = r_user.trim().toLowerCase();
    r_user = r_user.replace(" ", "");
    r_user = r_user.replace(" ", "");
    r_user = r_user.replace(" ", "");
    r_user = r_user.replace(" ", "");
    r_user = r_user.replace(".", "");
    r_user = r_user.replace("*", "");


    var r = "z-xy"
    var r2 = "z-yx"
    if(r_user==r || r_user==r2){
        $("#quadro1_correto").show();
    } else {
        $("#quadro1_errado").show();
        $("#quadro1_respostausuario").html(r_user);
    }
    $("#quadro1_prosseguir").show();

    disableElement("#bt-06-01");
    disableElement("#06-01");

}

function start_quadro2()
{

        $("#quadro2_errado").hide();
        $("#quadro2_correto").hide();
        $("#quadro2_prosseguir").hide();
        $("#btAvaliarQuadro2").button().click(function(){
            avaliarQuadro2();
        })
        $("#btAbrirQuadro3").button().click(function(){
            loadSlide('quadro3');
        })

        a_sort = Math.floor(Math.random()*(a.length-1));
        c_sort = Math.floor(Math.random()*(c.length-1));
        //ai.sendToActionScript(a_sort, -1, c_sort);
        ai.setA(a_sort, false)
        ai.setB(-1, false)
        ai.setC(c_sort, false);
        ai.update();
        $("#coefa").html(a_sort.toString());
        $("#coefc").html(c_sort.toString());
        downScreen();


}

function avaliarQuadro2(){
    $("#quadro2_errado").hide();
    $("#quadro2_correto").hide();

    var r_a = $("#txQuadro2A").val().trim().toLowerCase();
    var r_c = $("#txQuadro2C").val().trim().toLowerCase();
    disableElement("#btAvaliarQuadro2");
    disableElement("#txQuadro2A");
    disableElement("#txQuadro2C");

    $("#coefa-aluno").html(r_a);
    $("#coefc-aluno").html(r_c);

    if(a_sort==r_a && c_sort==r_c){
        $("#quadro2_correto").show();
    } else {
        $("#quadro2_errado").show();
    }
    $("#quadro2_prosseguir").show();

}


function start_quadro3()
{
    downScreen();
    var q3a = 1;
    var q3b = 0;
    var q3c = -1;

    ai.setA(q3a, false);
    ai.setB(q3b, false);
    ai.setC(q3c, false);
    ai.update();

    $("#quadro3_errado").hide();
    $("#quadro3_correto").hide();
    $("#quadro3_prosseguir").hide();
    $("#btAvaliarQuadro3").button().click(function(){
        avaliarQuadro3();
    })
    $("#btAbrirQuadro4").button().click(function(){
        loadSlide('quadro4');
    })
}

function avaliarQuadro3(){
    var r_a = $("#txQ3_1").val().trim().toLowerCase();
    var r_b = $("#txQ3_2").val().trim().toLowerCase();
    var r_c = $("#txQ3_3").val().trim().toLowerCase();
    disableElement("#btAvaliarQuadro3");
    disableElement("#txQ3_1")
    disableElement("#txQ3_2")
    disableElement("#txQ3_3")
    if(r_a==1 && r_b==0 & r_c == -1){
        $("#quadro3_correto").show();
    } else {
        $("#quadro3_errado").show();
        $("#coefa-aluno2").html(r_a);
        $("#coefb-aluno2").html(r_b);
        $("#coefc-aluno2").html(r_c);

    }
    $("#quadro3_prosseguir").show();
}

function start_quadro4(){
    $("#encerrar").hide();
    $("#quadro4_errado").hide();
    $("#quadro4_correto").hide();

    $("#btAvaliarQuadro4").button().click(function(){
        avaliarQuadro4();
    })
    $("#btEncerrar").button().click(function(){
        loadSlide('quadro4');
    })
}

function limpar(tx){
    var s = tx.trim().toLowerCase();
    s = s.replace(" ", "");
    s = s.replace(" ", "");
    s = s.replace(" ", "");
    s = s.replace(" ", "");
    s = s.replace(" ", "");
    s = s.replace("*", "");
    return s
}

function avaliarQuadro4(){

    var r_a = limpar($("#txQ4_1").val());
    var r_b = limpar($("#txQ4_2").val());
    var r_c = limpar($("#txQ4_3").val());
    disableElement("#btAvaliarQuadro4");
    disableElement("#txQ4_1")
    disableElement("#txQ4_2")
    disableElement("#txQ4_3")
    if(r_a=='-m' && r_b=='1' & r_c == 'mx0-y0'){
        $("#quadro4_correto").show();
    } else {
        $("#quadro4_errado").show();
    }
    $("#encerrar").show();

}

/*
 * Configurações DEPENDENTES do status da AI 
 */
function posFetchConfig () {
	//Parada 1
	if(oaData.slides.resp_06_01_verify == "")
	{
		$("#bt-06-01").click(function (){evaluate(1);});
		
	} else if(state.parte6.resp_06_01_verify == "correct")
	{
		$(".p-06-01").removeClass('visible').addClass('invisible');
		$(".parada-2").removeClass('invisible').addClass('visible');
		$("#bt-06-01").addClass('invisible');
		$(".parada-1 .correto").removeClass('invisible').addClass('visible');
		config_parada2();
	}else if(state.parte6.resp_06_01_verify == "wrong")
	{
		$(".p-06-01").removeClass('visible').addClass('invisible');
		$(".parada-2").removeClass('invisible').addClass('visible');
		$("#bt-06-01").addClass('invisible');
		$(".parada-1 .errado").removeClass('invisible').addClass('visible');
		$(".parada-1 .sua-resposta").html(state.parte6.resp_06_01);
		config_parada2();
	}
	
	//Parada 2
	if(state.parte6.resp_06_02_verify == "")
	{
		$("#bt-06-02").click(function (){evaluate(2);});
	}else if(state.parte6.resp_06_02_verify == "correct")
	{
		$("#bt-06-02").addClass('invisible');
		$(".p-06-02").removeClass('visible').addClass('invisible');
		$(".parada-2 .errado").removeClass('invisible').addClass('visible');
		$(".parada-2 .coefa").html(state.parte6.resp_06_02_sort_01);
		$(".parada-2 .coefc").html(state.parte6.resp_06_02_sort_02);
		$(".parada-2 .resposta").addClass('invisible');
		$(".parada-3").removeClass('invisible').addClass('visible');
		config_parada3();
	}else if(state.parte6.resp_06_02_verify == "wrong")
	{
		$("#bt-06-02").addClass('invisible');
		$(".p-06-02").removeClass('visible').addClass('invisible');
		$(".parada-2 .errado").removeClass('invisible').addClass('visible');
		$(".parada-2 .coefa").html(state.parte6.resp_06_02_sort_01);
		$(".parada-2 .coefc").html(state.parte6.resp_06_02_sort_02);
		$(".parada-2 .coefa-aluno").html(state.parte6.resp_06_02_01);
		$(".parada-2 .coefc-aluno").html(state.parte6.resp_06_02_02);
		$(".parada-3").removeClass('invisible').addClass('visible');
		config_parada3();
	}
	
	//Parada 3
	if(state.parte6.resp_06_03_verify == "")
	{
		$("#bt-06-03").click(function (){evaluate(3);});
	}else if(state.parte6.resp_06_03_verify == "correct")
	{
		$("#bt-06-03").addClass('invisible');
		$(".p-06-03").removeClass('visible').addClass('invisible');
		$(".parada-3 .errado").removeClass('invisible').addClass('visible');
		$(".parada-3 .resposta").addClass('invisible');
		$(".parada-4").removeClass('invisible').addClass('visible');
	}else if(state.parte6.resp_06_03_verify == "wrong")
	{
		$("#bt-06-03").addClass('invisible');
		$(".p-06-03").removeClass('visible').addClass('invisible');
		$(".parada-3 .errado").removeClass('invisible').addClass('visible');
		$(".parada-3 .coefa-aluno").html(state.parte6.resp_06_03_01);
		$(".parada-3 .coefb-aluno").html(state.parte6.resp_06_03_02);
		$(".parada-3 .coefc-aluno").html(state.parte6.resp_06_03_03);
		$(".parada-4").removeClass('invisible').addClass('visible');
	}
	
	//Parada 4
	if(state.parte6.resp_06_04_verify == "")
	{
		$("#bt-06-04").click(function(){evaluate(4);});
	}else if(state.parte6.resp_06_04_verify == "correct")
	{
		$("#bt-06-04").addClass('invisible');
		$(".p-06-04").removeClass('visible').addClass('invisible');
		$(".parada-4 .errado").removeClass('invisible').addClass('visible');
		$(".parada-4 .resposta").addClass('invisible');
		$("#bt-06-05").addClass('visible');
	}else if(state.parte6.resp_06_04_verify == "wrong")
	{
		$("#bt-06-04").addClass('invisible');
		$(".p-06-04").removeClass('visible').addClass('invisible');
		$(".parada-4 .errado").removeClass('invisible').addClass('visible');
		$(".parada-4 .coefa-aluno").html(state.parte6.resp_06_04_01);
		$(".parada-4 .coefb-aluno").html(state.parte6.resp_06_04_02);
		$(".parada-4 .coefc-aluno").html(state.parte6.resp_06_04_03);
		$("#bt-06-05").addClass('visible');
	}
	
	$("#bt-06-05").click(function(){finish();});
}

/*
 * Enviado para AS - 
 */

function config_parada3()
{
	ai.sendToActionScript(1, 0, -1);
}
 
 
/*
 * Avaliação da atividade
 */
function evaluate(num)
{
	if(num == 1)
	{
		//Verificação do resultado oferecido pelo usuário no 1º campo
		var i;
		var x;
		var z;
		var y;
		var correct = 0;
		for (i = 8; i > 0; i--)
		{
			x = Math.floor(Math.random()*100);
			y = Math.floor(Math.random()*100);
			z = Math.floor(Math.random()*100);
			
			try {
				if(eval(z-x*y) == eval($("#06-01").val()))
				{
					correct = correct + 1;
				}
			}
			catch (error) {
				// roda isso em erro
			}
		}
		state.parte6.resp_06_01 = $("#06-01").val();
		if(correct == 8)
		{
			state.parte6.resp_06_01_verify = "correct";
			$(".parada-1 .correto").removeClass('invisible').addClass('visible');
			$(".p-06-01").removeClass('visible').addClass('invisible');
			state.parte6.score_06_01 = 100;
		}
		else
		{
			state.parte6.resp_06_01_verify = "wrong";
			$(".parada-1 .errado").removeClass('invisible').addClass('visible');
			$(".sua-resposta").html(state.parte6.resp_06_01);
			$(".p-06-01").removeClass('visible').addClass('invisible');
			state.parte6.score_06_01 = 0;
		}
		$(".parada-2").removeClass('invisible').addClass('visible');
		$("#bt-06-01").addClass('invisible');
		config_parada2();
	}
	
	if(num == 2)
	{
		state.parte6.score_06_02 = 0;
		//Verificação dos valores 'a' e 'c' digitados pelo usuário
		state.parte6.resp_06_02_01 = $("#06-02-01").val().replace(",",".");
		state.parte6.resp_06_02_02 = $("#06-02-02").val().replace(",",".");
		
		a_sort.toString();
		c_sort.toString();
		
		if(state.parte6.resp_06_02_01 == a_sort)
		{
			state.parte6.score_06_02 = state.parte6.score_06_02 + 50;
		}
		
		if(state.parte6.resp_06_02_02 == c_sort)
		{
			state.parte6.score_06_02 = state.parte6.score_06_02 + 50;
		}
		
		if(state.parte6.score_06_02 < 100)
		{
			$(".parada-2 .coefa-aluno").html(state.parte6.resp_06_02_01);
			$(".parada-2 .coefc-aluno").html(state.parte6.resp_06_02_02);
			state.parte6.resp_06_02_verify = "wrong";
		}
		
		if(state.parte6.score_06_02 == 100)
		{
			
			$(".parada-2 .resposta").addClass('invisible');
			state.parte6.resp_06_02_verify = "correct";
		}
		$(".parada-3").removeClass('invisible').addClass('visible');
		$("#bt-06-02").addClass('invisible');
		$(".p-06-02").removeClass('visible').addClass('invisible');
		$(".parada-2 .errado").removeClass('invisible').addClass('visible');
		$(".parada-2 .coefa").html(a_sort);
		$(".parada-2 .coefc").html(c_sort);
		config_parada3();
	}
	
	if(num == 3)
	{
		state.parte6.score_06_03 = 0;
		//Verificação dos valores 'a' e 'c' digitados pelo usuário
		state.parte6.resp_06_03_01 = $("#06-03-01").val().replace(",",".");
		state.parte6.resp_06_03_02 = $("#06-03-02").val().replace(",",".");
		state.parte6.resp_06_03_03 = $("#06-03-03").val().replace(",",".");
		
		if(Math.abs(Number(state.parte6.resp_06_03_01) - 1) < 0.0001)
		{
			state.parte6.score_06_03 = state.parte6.score_06_03 + 33;
		}
		
		if(Math.abs(Number(state.parte6.resp_06_03_02) - 0) < 0.0001)
		{
			state.parte6.score_06_03 = state.parte6.score_06_03 + 33;
		}
		
		if(Math.abs(Number(state.parte6.resp_06_03_03) + 1) < 0.0001)
		{
			state.parte6.score_06_03 = state.parte6.score_06_03 + 33;
		}
		
		if(state.parte6.score_06_03 < 99)
		{
			$(".parada-3 .coefa-aluno").html(state.parte6.resp_06_03_01);
			$(".parada-3 .coefb-aluno").html(state.parte6.resp_06_03_02);
			$(".parada-3 .coefc-aluno").html(state.parte6.resp_06_03_03);
			state.parte6.resp_06_03_verify = "wrong";
		}
		
		if(state.parte6.score_06_03 == 99)
		{
			state.parte6.score_06_03 = 100;
			$(".parada-3 .resposta").addClass('invisible');
			state.parte6.resp_06_03_verify = "correct";
		}
		$(".parada-4").removeClass('invisible').addClass('visible');
		$("#bt-06-03").addClass('invisible');
		$(".p-06-03").removeClass('visible').addClass('invisible');
		$(".parada-3 .errado").removeClass('invisible').addClass('visible');
	}
	
	if(num == 4)
	{
		state.parte6.score_06_04 = 0;
		//Verificação dos valores 'a' e 'c' digitados pelo usuário
		state.parte6.resp_06_04_01 = $("#06-04-01").val();
		state.parte6.resp_06_04_02 = $("#06-04-02").val();
		state.parte6.resp_06_04_03 = $("#06-04-03").val();
		
		//Passando os valores do usuário para letra minúscula
		if(isNaN(state.parte6.resp_06_04_01)) state.parte6.resp_06_04_01 = state.parte6.resp_06_04_01.toLowerCase();
		if(isNaN(state.parte6.resp_06_04_02)) state.parte6.resp_06_04_02 = state.parte6.resp_06_04_02.toLowerCase();
		if(isNaN(state.parte6.resp_06_04_03)) state.parte6.resp_06_04_03 = state.parte6.resp_06_04_03.toLowerCase();
		
		var m;
		var x0;
		var y0;
		
		var correct01 = 0;
		var correct02 = 0;
		var correct03 = 0;
		
		for (i = 8; i > 0; i--)
		{
			m = Math.floor(Math.random()*100)+1;
			x0 = Math.floor(Math.random()*100)+1;
			y0 = Math.floor(Math.random()*100)+1;
			try {
				if(Math.abs(eval("-m") - eval(state.parte6.resp_06_04_01)) < 0.0001)
				{
					correct01 = correct01 + 1;
				}
				if(Math.abs(1 - eval(state.parte6.resp_06_04_02)) < 0.0001)
				{
					correct02 = correct02 + 1;
				}
				if(Math.abs(eval("m*x0-y0") - eval(state.parte6.resp_06_04_03)) < 0.0001)
				{
					correct03 = correct03 + 1;
				}
			}catch (error) {}
		}
		if(correct01 == 8)
		{
			//state.parte4.resp_06_04_verify == "done";
			state.parte6.score_06_04 = state.parte6.score_06_04 + 1/3;
		}
		else
		{
			//state.parte4.resp_06_04_verify == "done";
			state.parte6.score_06_04 = state.parte6.score_06_04 + 0;
		}
		if(correct02 == 8)
		{
			//state.parte4.resp_06_04_verify == "done";
			state.parte6.score_06_04 = state.parte6.score_06_04 + 1/3;
		}
		else
		{
			//state.parte4.resp_06_04_verify == "done";
			state.parte6.score_06_04 = state.parte6.score_06_04 + 0;
		}
		if(correct03 == 8)
		{
			//state.parte4.resp_06_04_verify == "done";
			state.parte6.score_06_04 = state.parte6.score_06_04 + 1/3;
		}
		else
		{
			//state.parte4.resp_06_04_verify == "done";
			state.parte6.score_06_04 = state.parte6.score_06_04 + 0;
		}
		state.parte6.score_06_04 = Math.round(state.parte6.score_06_04);
		state.parte6.resp_06_04_verify = "done";
		$(".parada-4 .avancar").removeClass('invisible').addClass('visible');
		$("#bt-06-04").addClass('invisible');
	}
	
}

/*
 * Finaliza a atividade
 */
function finish () {

	state.parte6.complete_06 = true;
	
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
	ans.part = 6;
	ans.parte6 = {};
	ans.parte6.part_stop = 1;
	ans.parte6.complete_06 = false;
	ans.parte6.resp_06_01_verify = "";
	ans.parte6.resp_06_02_verify = "";
	ans.parte6.resp_06_03_verify = "";
	ans.parte6.resp_06_04_verify = "";
	ans.parte6.resp_06_01 = "";
	ans.parte6.resp_06_02_sort_01 = "";
	ans.parte6.resp_06_02_sort_02 = "";
	ans.parte6.resp_06_02_01 = "";
	ans.parte6.resp_06_02_02 = "";
	ans.parte6.resp_06_03_01 = "";
	ans.parte6.resp_06_03_02 = "";
	ans.parte6.resp_06_03_03 = "";
	ans.parte6.resp_06_04_01 = "";
	ans.parte6.resp_06_04_02 = "";
	ans.parte6.resp_06_04_03 = "";
	ans.parte6.score_06_01 = 0;
	ans.parte6.score_06_02 = 0;
	ans.parte6.score_06_03 = 0;
	ans.parte6.score_06_04 = 0;
	
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
		ans.part = 6;
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
  data.score = (state.parte6.score_06_01 + state.parte6.score_06_02 + state.parte6.score_06_03 + state.parte6.score_06_04)/4
  
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