
/*
	MÉTODOS start_FRAMENAME
	SÃO EXECUTADOS AUTOMATICAMENTE, AO FINAL DO MÉTODO loadSlide(FRAMENAME)
	Toda vez que um slide é carregado, caso exista a função relacionada, ela é executada.
	Elas servem para carregar o conjunto adequado de métodos do SWF que são disponibilizados via ExternalInterface.
*/
var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!

var oaName = "AI-0118_2"
oaData.slides = new AILocalStorageData()
function AILocalStorageData() {
	this.cp1 = "";
    this.cp2 = "";
    this.cp3 = "";
    this.cp4 = "";
    this.score_02_02 = 0;
    this.score_02_03 = 0;
    this.resp_02_03_verify = "";
}
var ai_data;

function startAI(){
    oaData = fetch();
    oaData.slides = new AILocalStorageData()
//    if(oaData.slides==undefined) oaData.slides = new AILocalStorageData();
    loadScreen("../swf/AI-0111.swf", 700, 350);
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
		
	$("#bt-02-01").button().click(function(){
		loadSlide("quadro2");

	});	
}

/**
 * A função que recebe o conteúdo da AI-0119
 */
function sendToJavaScript()
{


    ai.finish();
    oaData.slides.score_02_03 = ai.getScore();
    oaData.slides.resp_02_03_verify = "done";
    commit(state);
    loadSlide("quadro4");

}




function start_quadro2(){
    $("#errou01").hide();
    $("#acertou01").hide();
    $("#resp").hide();
    downScreen();
    $("#aDownScreen1").click(function(){

        $('#etapaAtual').fadeIn().delay(1000).scrollTop(300);
    });



    $("#btToSlide3").button().click(function(){
        loadSlide("quadro4")
    });
    $("#bt-02-02").button().click(function(){
        avaliarQuadro2()
    });
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
        oaData.slides.score_02_02 = 100;
    }else if($("select[name='cp1'] :selected").val() == "maiorigual" && $("select[name='cp2'] :selected").val() == "0" && $("select[name='cp3'] :selected").val() == "maior" && $("select[name='cp4'] :selected").val() == "0")
    {
        //console.log("correto/2-1");
        oaData.slides.score_02_02 = 90;
    }else if($("select[name='cp1'] :selected").val() == "maior" && $("select[name='cp2'] :selected").val() == "0" && $("select[name='cp3'] :selected").val() == "maiorigual" && $("select[name='cp4'] :selected").val() == "0")
    {
        //console.log("correto/2-2");
        oaData.slides.score_02_02 = 90;
    }else if($("select[name='cp1'] :selected").val() == "maiorigual" && $("select[name='cp2'] :selected").val() == "0" && $("select[name='cp3'] :selected").val() == "maiorigual" && $("select[name='cp4'] :selected").val() == "0")
    {
        //console.log("correto/2-3");

        oaData.slides.score_02_02 = 80;
    }else
    {
        //console.log("errado");

        oaData.slides.score_02_02 = 0;
    }
    //console.log(oaData.slides.score_02_02);
    //console.log("saindo");
    //Armazenando os valores no array de avaliação dos selects
    oaData.slides.resp_02_02_01 = $("select[name='cp1'] :selected").val();
    oaData.slides.resp_02_02_02 = $("select[name='cp2'] :selected").val();
    oaData.slides.resp_02_02_03 = $("select[name='cp3'] :selected").val();
    oaData.slides.resp_02_02_04 = $("select[name='cp4'] :selected").val();

    //Atualizando a visibilidade da próxima parte
    disableElement("cp1");
    disableElement("cp2");
    disableElement("cp3");
    disableElement("cp4");
    disableElement("#bt-02-02");



    loadScreen("../swf/AI0119.swf", 640, 480)
    onDownScreenComplete = function(){
        $('#etapaAtual').scrollTop(300);
    }

    downScreen();
    onDownScreenComplete = function(){
        //
    }
    //alert(oaData.slides.score_02_02)


    if(oaData.slides.score_02_02 < 100)
    {
        $("#errou01").show();
    }else{
        $("#acertou01").show();
    }
    $("#resp").show();

}

function onFlashAvaliou(){
    loadSlide("quadro2meio");
}

function start_quadro4(){

}

function start_quadro2meio(){
    $("#btAvancarParaQuadro4").button().click(function(){
        loadSlide("quadro4");
        upScreen();
    })
    var eq_score = movie.getScore();
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

 