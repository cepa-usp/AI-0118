/**
 *
 A AI-0112 usa esses dois métodos via ExternalInterface

 public function receivePointsFromJs(xmlstr:String){
 unmarshalItems(xmlstr);
 }

 public function sendPointsToJS(){
 return marshalItems();
 }
 * @type {*}
 */



var scorm = pipwerks.SCORM; // Seção SCORM
scorm.version = "2004"; // Versão da API SCORM

var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!

var oaName = "AI-0118_5"
function AILocalStorageData() {
    this.part_stop = 1;
    this.complete_05 = false;
    this.resp_05_plot = "";
    this.score_05 = 0;
}
var ai_data;

function startAI(){
    loadScreen("../swf/AI-0112.swf", 640, 480);
    loadContent();

}


/**
 Determinar o comportamento inicial da atividade que está sendo inserida
 */
function onInitialize(){
    loadSlide('quadro1');

}

function start_quadro1(){
    $("#btAbrirQuadro2").button().click(function (){
        loadSlide("quadro2")
    });
}

function start_quadro2(){
    downScreen();
    config_parada2();
    $("#btAbrirQuadro3").button().click(function (){
        loadSlide("quadro3")
    });
}

function start_quadro3(){
    $("#btAbrirQuadro31").button().click(function (){
        loadSlide("quadro31")
    });
}

function start_quadro31(){
    $("#btAbrirQuadro4").button().click(function (){
        loadSlide("quadro4")
    });
}


function start_quadro4(){
    $("#btAvaliarQuadro4").button().click(function (){
        loadSlide("quadro5")
    });
}

function start_quadro5(){
    $("#btAbrirQuadro6").button().click(function (){
        loadSlide("quadro6")
    });
}

function start_quadro6(){
    loadScreen("../swf/AI-0113.swf", 640, 480);
    $("#btAbrirQuadro7").button().click(function (){
        loadSlide("quadro7")
    });
}

function start_quadro7(){
    $("#btAbrirQuadro8").button().click(function (){
        loadSlide("quadro8")
    });
}

function start_quadro8(){

}

/*
 * Configurações DEPENDENTES do status da AI 
 */
function posFetchConfig () {

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
	var aux = "<item label='y' value='1'><points><pt x='-5' y='-5' /><pt x='5' y='5' /></points></item>";
	ai.receivePointsFromJs(aux);
}

function config_parada6()
{
	var aux = "<item label='z' value='1'><points><pt x='0.2' y='5' /><pt x='0.25' y='4' /><pt x='0.3333' y='3' /><pt x='0.5' y='2' /><pt x='1' y='1' /><pt x='2' y='0.5' /><pt x='3' y='0.3333' /><pt x='4' y='0.25' /><pt x='5' y='0.2' /></points></item>";
	var str = ai.sendPointsToJs();
	var nova_str = str.concat(aux);
	ai.receivePointsFromJs(nova_str);
}

