
/*
 MÉTODOS start_FRAMENAME
 SÃO EXECUTADOS AUTOMATICAMENTE, AO FINAL DO MÉTODO loadSlide(FRAMENAME)
 Toda vez que um slide é carregado, caso exista a função relacionada, ela é executada.
 Elas servem para carregar o conjunto adequado de métodos do SWF que são disponibilizados via ExternalInterface.
 */
var DEBUG = false; //MUDE DEBUG PARA TRUE PRA FACILITAR A NAVEGAÇÃO PELA ATIVIDADE!!!

var oaName = "AI-0118"

function AILocalStorageData() {
    this.tx01 =  "";
    this.tx02 =  "";
    this.tx03 =  "";
    this.score1=  0;
    this.score2=  0;
    this.score3=  0;

}
var ai_data;
function initStep(){
    setCurrentAtv(4);
}
function startAI(){

    state = fetch();

    if(oaData[4].slides==undefined) oaData[4].slides = new AILocalStorageData();
    loadScreen("swf/AI-0114.swf", 640, 480);
    //loadContent();


}

function bindData(){
    oaData = fetch();
    dt = oaData[4].slides;
    if(dt==undefined) {
        dt = oaData[4].slides = new AILocalStorageData();
        return;
    }
}

function saveData(){
    //if(ai_data==null) ai_data = new AILocalStorageData();


    var ai_data = oaData[4].slides;
    oaData[4].score = (ai_data.score1 + ai_data.score2 + ai_data.score3)/3

    concluirAtividade();
}

/**
 Determinar o comportamento inicial da atividade que está sendo inserida
 */
function onInitialize(){

    loadSlide("quadro1");
    $("#acertou1").hide();
    $("#errou1").hide();


}


function start_quadro1(){
    upScreen();
    // popular o slide com as variáveis colhidas do scorm;
    $( "#04-01").val(oaData[4].slides.tx01);
    if(oaData[4].slides.tx01!="") disableElement("#04-01")

    $("#bt-04-01").button().click(function(){
        disableElement("#bt-04-01");
        oaData[4].slides.tx01 = $( "#04-01").val();
        $( "#04-01" ).attr("disabled",true);

        //Avalia resposta
        if($("#04-01").val() == 6)
        {
            oaData[4].slides.score1 = 100;
            $("#acertou1").show();
            //state.parte4.score_04_01 = 100;
        }
        else
        {
            oaData[4].slides.score1 = 0;
            $("#errou1").show();
            //state.parte4.score_04_01 = 0;
        }
        saveData();
    });

    $("#avancar1").button().click(function(){
        loadSlide("quadro2");

    });
}



function start_quadro2(){
    $("#errou2").hide();
    $("#acertou2").hide();
    $( "#04-02").val(oaData[4].slides.tx02);
    if(oaData[4].slides.tx02!="") disableElement("#04-02")

    $("#bt-04-02").button().click(function(){
        oaData[4].slides.tx02 = $( "#04-02").val();
        disableElement("#bt-04-02");
        $( "#04-02" ).attr("disabled",true);

        //Avalia resposta
        var i;
        var x;
        var z;
        var y;
        var correct = 0;
        for (i = 8; i > 0; i--)
        {
            x = Math.floor(Math.random()*100);
            z = Math.floor(Math.random()*100);
            if(eval(z/x) == eval($("#04-02").val()))
            {
                correct = correct + 1;
            }
        }
        //var state = $("#04-02").val();
        if(correct == 8)
        {
            oaData[4].slides.score2 = 100;
            $("#acertou2").show();
            //state.parte4.score_04_02 = 100;
        }
        else
        {
            oaData[4].slides.score2 = 100;
            $("#errou2").show();
            //state.parte4.score_04_02 = 0;
        }
        saveData();
    });

    $("#avancar2").button().click(function(){
        loadSlide("quadro3");

    });
}

function start_quadro3(){
    $("#errou3").hide();

    $( "#04-03").val(oaData[4].slides.tx03);
    if(oaData[4].slides.tx03!="") disableElement("#04-03")


    $("#bt-04-03").button().click(function(){
        oaData[4].slides.tx03 = $( "#04-03").val();
        disableElement("#bt-04-03");
        saveData();

        $("#errou3").show();
        $( "#04-03" ).attr("disabled",true);
    });

    $("#avancar3").button().click(function(){
        loadSlide("quadro4");
    });
}

function start_quadro4(){
    oaData.completed = true;
    saveData()
}


// Checks if given selector (type input) is a valid number. If not, resets field.
function validateAnswer (selector) {
    var value = $(selector).val().replace(",", ".");
    var isValid = !isNaN(value) && value != "";
    if (!isValid) $(selector).val("");
    return isValid;
}


