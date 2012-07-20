
/*
	MÉTODOS start_FRAMENAME
	SÃO EXECUTADOS AUTOMATICAMENTE, AO FINAL DO MÉTODO loadSlide(FRAMENAME)
	Toda vez que um slide é carregado, caso exista a função relacionada, ela é executada.
	Elas servem para carregar o conjunto adequado de métodos do SWF que são disponibilizados via ExternalInterface.
*/
var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!


function startAI(){
	loadScreen("../flash/AI0125.swf", 640, 480);


}

/**
	Determinar o comportamento inicial da atividade que está sendo inserida
*/
function onInitialize(){	
	loadSlide("quadro_1_1");
	MathJax.Hub.Typeset();
}
function start_quadro_1_1(){
	//alert("sdsd")
}

function eval_quadro_1_2(){

}


function notificar(tx){
	//TODO: substituir o 'alert' por um pseudo pop-up (?)
	alert(tx);
}


// Checks if given selector (type input) is a valid number. If not, resets field.
function validateAnswer (selector) {
  var value = $(selector).val().replace(",", ".");
  var isValid = !isNaN(value) && value != "";
  if (!isValid) $(selector).val("");
  return isValid;
}

 