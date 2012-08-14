
/*
	MÉTODOS start_FRAMENAME
	SÃO EXECUTADOS AUTOMATICAMENTE, AO FINAL DO MÉTODO loadSlide(FRAMENAME)
	Toda vez que um slide é carregado, caso exista a função relacionada, ela é executada.
	Elas servem para carregar o conjunto adequado de métodos do SWF que são disponibilizados via ExternalInterface.
*/
var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!

var oaName = "AI-0118"




function AILocalStorageData() {
	this.cp1 = "";
    this.cp2 = "";
    this.cp3 = "";
    this.cp4 = "";
    this.score2 = 0;
    this.score3 = 0;


}
var ai_data;
function initStep(){
    setCurrentAtv(2);
}


function startAI(){



    //oaData[2].slides = new AILocalStorageData()
    if(oaData[2].slides==undefined) oaData[2].slides = new AILocalStorageData();
    loadScreen("swf/AI-0111.swf", 700, 350);
	//loadContent();

}

function saveData(){
    oaData[2].score = (oaData[2].slides.score2 + oaData[2].slides.score3)/2

}


/**
	Determinar o comportamento inicial da atividade que está sendo inserida
*/
function onInitialize(){	

	loadSlide("quadro1");
}




function start_quadro1(){
	
	// popular o slide com as variáveis colhidas do scorm;
		
	$("#bt-02-01").button().click(function(){
		loadSlide("quadro2");

	});	
}

/**
 * A função que recebe o conteúdo da AI-0119
 */
function finishAI()
{


    //ai.finish();
    //alert("findou")
    oaData[2].slides.score3 = ai.getScore();
    //oaData[2].slides.resp_02_03_verify = "done";

    saveData();
    loadSlide("quadro2meio");

}




function start_quadro2(){
    $("#errou01").hide();
    $("#acertou01").hide();
    $("#resp").hide();
    downScreen();




    $("#btToSlide3").button().click(function(){
        loadSlide("quadro4")
    });
    $("#bt-02-02").button().click(function(){
        avaliarQuadro2()
    });
    $("#cp1").val(oaData[2].slides.cp1);
    $("#cp2").val(oaData[2].slides.cp2);
    $("#cp3").val(oaData[2].slides.cp3);
    $("#cp4").val(oaData[2].slides.cp4);
    if(oaData[2].slides.cp1!=""){
        disableElement("#cp1");
        disableElement("#cp2");
        disableElement("#cp3");
        disableElement("#cp4");
    }
}

function avaliarQuadro2() {
    for(var j = 0; j<5;j++){
        if($("select[name='cp" + j + "'] :selected").val() == ""){
            return;
        }
    }


    if($("select[name='cp1'] :selected").val() == "maior" && $("select[name='cp2'] :selected").val() == "0" && $("select[name='cp3'] :selected").val() == "maior" && $("select[name='cp4'] :selected").val() == "0")
    {
        //console.log("correto");
        oaData[2].slides.score2 = 100;
    }else if($("select[name='cp1'] :selected").val() == "maiorigual" && $("select[name='cp2'] :selected").val() == "0" && $("select[name='cp3'] :selected").val() == "maior" && $("select[name='cp4'] :selected").val() == "0")
    {
        //console.log("correto/2-1");
        oaData[2].slides.score2 = 90;
    }else if($("select[name='cp1'] :selected").val() == "maior" && $("select[name='cp2'] :selected").val() == "0" && $("select[name='cp3'] :selected").val() == "maiorigual" && $("select[name='cp4'] :selected").val() == "0")
    {
        //console.log("correto/2-2");
        oaData[2].slides.score2 = 90;
    }else if($("select[name='cp1'] :selected").val() == "maiorigual" && $("select[name='cp2'] :selected").val() == "0" && $("select[name='cp3'] :selected").val() == "maiorigual" && $("select[name='cp4'] :selected").val() == "0")
    {
        //console.log("correto/2-3");

        oaData[2].slides.score2 = 80;
    }else
    {
        //console.log("errado");

        oaData[2].slides.score2 = 0;
    }
    //console.log(oaData[2].slides.score_02_02);
    //console.log("saindo");
    //Armazenando os valores no array de avaliação dos selects
    oaData[2].slides.cp1 = $("select[name='cp1'] :selected").val();
    oaData[2].slides.cp2 = $("select[name='cp2'] :selected").val();
    oaData[2].slides.cp3 = $("select[name='cp3'] :selected").val();
    oaData[2].slides.cp4 = $("select[name='cp4'] :selected").val();

    //Atualizando a visibilidade da próxima parte
    disableElement("#cp1");
    disableElement("#cp2");
    disableElement("#cp3");
    disableElement("#cp4");
    disableElement("#bt-02-02");

    onFlashContentLoaded = function(){
        downScreen();
    }

    loadScreen("swf/AI0119.swf", 640, 460)
    $("#btCalcular119").button().click(function(){
        ai.performClick();
    });


    onDownScreenComplete = function(){
        $('#etapaAtual').scrollTop(300);
    }


    //alert(oaData[2].slides.score_02_02)

    saveData()
    if(oaData[2].slides.score2 < 100)
    {
        $("#errou01").show();
    }else{
        $("#acertou01").show();
    }
    $("#resp").show();

}

function onFlashAvaliou(){
    sendToJavaScript();
    loadSlide("quadro2meio");
}

function start_quadro4(){
    saveData()
    concluirAtividade();

}

function start_quadro2meio(){
    $("#btAvancarParaQuadro4").button().click(function(){
        loadSlide("quadro4");
        upScreen();

    })
    var eq_score = oaData[2].slides.score3;
    oaData[2].score3 = eq_score;
    saveData()
    $("#acertoseq").html(eq_score);

}

function notificar(tx){
	//substituir o 'alert' por um pseudo pop-up (?)
	alert(tx);
}


// Checks if given selector (type input) is a valid number. If not, resets field.
function validateAnswer (selector) {
  var value = $(selector).val().replace(",", ".");
  var isValid = !isNaN(value) && value != "";
  if (!isValid) $(selector).val("");
  return isValid;
}

 