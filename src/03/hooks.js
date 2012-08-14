
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
}
var ai_data;

function initStep(){
    setCurrentAtv(3);
}
function startAI(){
    if(oaData[3].slides==undefined) oaData[3].slides = new AILocalStorageData();
    loadScreen("swf/AI-0114.swf", 700, 500);

	
	
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
<<<<<<< HEAD
            oaData[3].slides.score_02_03 = 100/4;
=======
            oaData.slides.score_02_03 = 100/4;
>>>>>>> d7ff194d7bcd226751f362e512225bf26724f9b4
            $("#acertou03-1").show();
        }else
        {
            console.log("errado");
            $("#errou03-1").show();
<<<<<<< HEAD
            oaData[3].slides.score_02_03 = 0;
=======
            oaData.slides.score_02_03 = 0;
>>>>>>> d7ff194d7bcd226751f362e512225bf26724f9b4
        }

        //Avaliar o select
        if($("#sl-03-dom-05").val() == 'fechado')
        {
            console.log("correto");
<<<<<<< HEAD
            oaData[3].slides.score_02_03 = 100/4;
=======
            oaData.slides.score_02_03 = 100/4;
>>>>>>> d7ff194d7bcd226751f362e512225bf26724f9b4
            $("#acertou03-2").show();
        }else
        {
            console.log("errado");
            $("#errou03-2").show();
<<<<<<< HEAD
            oaData[3].slides.score_02_03 = 0;
=======
            oaData.slides.score_02_03 = 0;
>>>>>>> d7ff194d7bcd226751f362e512225bf26724f9b4
        }

        //Avaliar o select
        if($("#sl-03-dom-06").val() == 'aberto')
        {
            console.log("correto");
<<<<<<< HEAD
            oaData[3].slides.score_02_03 = 100/4;
=======
            oaData.slides.score_02_03 = 100/4;
>>>>>>> d7ff194d7bcd226751f362e512225bf26724f9b4
            $("#acertou03-3").show();
        }else
        {
            console.log("errado");
            $("#errou03-3").show();
<<<<<<< HEAD
            oaData[3].slides.score_02_03 = 0;
=======
            oaData.slides.score_02_03 = 0;
>>>>>>> d7ff194d7bcd226751f362e512225bf26724f9b4
        }

        //Avaliar o select
        if($("#sl-03-dom-07").val() == 'fechado')
        {
            console.log("correto");
<<<<<<< HEAD
            oaData[3].slides.score_02_03 = 100/4;
=======
            oaData.slides.score_02_03 = 100/4;
>>>>>>> d7ff194d7bcd226751f362e512225bf26724f9b4
            $("#acertou03-4").show();
        }else
        {
            console.log("errado");
            $("#errou03-4").show();
<<<<<<< HEAD
            oaData[3].slides.score_02_03 = 0;
        }


        oaData[3].score = 100;
        //commitaqui();
        concluirAtividade();
=======
            oaData.slides.score_02_03 = 0;
        }

        oaData.completed = true;
        saveData()
>>>>>>> d7ff194d7bcd226751f362e512225bf26724f9b4


    });


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
			oaData[3].slides.score_02_02 = 100;
			 $("#acertou01").show();
		}else 
		{
			console.log("errado");
			 $("#errou01").show();
			oaData[3].slides.score_02_02 = 0;
		}
			oaData[3].slides.resp_03_03_01 = $("select[name='sl-03-dom-01'] :selected").val();
	
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
			oaData[3].slides.score_02_03 = 100;
			 $("#acertou02").show();
		}else 
		{
			console.log("errado");
			 $("#errou02").show();
			oaData[3].slides.score_02_03 = 0;
		}
			oaData[3].slides.resp_03_03_02 = $("select[name='sl-03-dom-02'] :selected").val();
		
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
			oaData[3].slides.score_02_03 = 100;
			 $("#acertou03").show();
		}else 
		{
			console.log("errado");
			 $("#errou03").show();
			oaData[3].slides.score_02_03 = 0;
		}
		disableElement("#bt-03-11");
    });



}


function notificar(tx){
	//TODO: substituir o 'alert' por um pseudo pop-up (?)
	alert(tx);
}


/*
 * Salva cmi.score.raw, cmi.location e cmi.completion_status no LMS
 */ 
function commitaqui () {
  oaData[3].score = (state.parte3.score_03_08+state.parte3.score_03_09+state.parte3.score_03_12+state.parte3.score_03_13)/4;

}

// Checks if given selector (type input) is a valid number. If not, resets field.
function validateAnswer (selector) {
  var value = $(selector).val().replace(",", ".");
  var isValid = !isNaN(value) && value != "";
  if (!isValid) $(selector).val("");
  return isValid;
}


 