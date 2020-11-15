var summarydiv;
function handleStart(){
    $('#insertdiv').html('');
    console.clear();
    let aantal = document.getElementById("aantalOefeningenInput").value;
    let optellentrue = document.getElementById("optellingoefeninginput").checked;
    let verschiltrue = document.getElementById("verschiloefeninginput").checked;

    if (optellentrue === true && verschiltrue === true){
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 2); // 1 = optelling, 2 = verschil
            if(soort === 1){
                getOptelling();
            } else if(soort === 2){
                getVerschil();
            }
        }
    } else if (optellentrue === true){
        for(let i = 0; i < aantal; i++){
            getOptelling();
        }
    } else if (verschiltrue === true){
        for(let i = 0; i < aantal; i++){
            getVerschil();
        }
    }
    hide("summary");
    // document.getElementById("insertdiv").style.visibility = "visible";
    // $('#summarydiv').hide()
    console.log("uitgevoerd");
    // $('#insertdiv').append('<button onclick="loadsummary()"> Back! </button>');
    // summarydiv = document.getElementById("summarydiv").innerHTML;
    // $('#summarydiv').html('');
};

function hide(div){
    if(div == "summary"){
        document.getElementById("insertdiv").style.visibility = "visible";
        document.getElementById("execdiv").style.visibility = "visible";
        document.getElementById("summarydiv").style.visibility = "hidden";
        document.getElementById("summarydiv").style.display = "none";
    } else if(div == "insert"){
        document.getElementById("insertdiv").style.visibility = "hidden";
        document.getElementById("summarydiv").style.visibility = "visible";
        document.getElementById("execdiv").style.visibility = "hidden";
        document.getElementById("summarydiv").style.display = "inline";
    }
}

function loadsummary(){
    hide("insert");
    // $('#insertdiv').html('');
    // $('#summarydiv').html(summarydiv);
    console.clear();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

function getOptelling(){
    console.log("optelling");
    let minimum = parseInt(document.getElementById("optellenminimum").value);
    let maximum = parseInt(document.getElementById("optellenmaximum").value);
    let aantalparams = parseInt(document.getElementById("optellenaantalparams").value);
    let eerstegetaltiental = document.getElementById("optelleneerstegetaltiental").checked;
    let tweedegetaltiental = document.getElementById("optellentweedegetaltiental").checked;
    let param1 = 0;
    let param2 = 0;
    let uitkomst = 0;
    if(minimum < maximum){
        if(aantalparams === 2){
            do {
                if(eerstegetaltiental === true){
                    param1 = getRndInteger(0, 10) * 10;
                } else {
                    param1 = getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = getRndInteger(0, 10) * 10;
                } else {
                    param2 = getRndInteger(minimum, maximum);
                }
                uitkomst = param1 + param2;
            } while(uitkomst < minimum || uitkomst > maximum);
            console.log(param1 + " + " + param2 + " = " + uitkomst);
            $('#insertdiv').append('<p>' + param1 + " + " + param2 + " = " + uitkomst + '</p>');
        } else if(aantalparams === 3){
            let param3 = 0;
            do{
                if(eerstegetaltiental === true){
                    param1 = getRndInteger(0, 10) * 10;
                } else {
                    param1 = getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = getRndInteger(0, 10) * 10;
                } else {
                    param2 = getRndInteger(minimum, maximum);
                }
                param3 = getRndInteger(minimum, maximum);
                uitkomst = param1 + param2 + param3;
            } while(uitkomst < minimum || uitkomst > maximum);
            console.log(param1 + " + " + param2 + " + " + param3 + " = " + uitkomst);
        } else if(aantalparams === 4){
            let param3 = 0;
            let param4 = 0;
            do{
                if(eerstegetaltiental === true){
                    param1 = getRndInteger(0, 10) * 10;
                } else {
                    param1 = getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = getRndInteger(0, 10) * 10;
                } else {
                    param2 = getRndInteger(minimum, maximum);
                }
                param3 = getRndInteger(minimum, maximum);
                param4 = getRndInteger(minimum, maximum);
                uitkomst = param1 + param2 + param3 + param4;
            } while(uitkomst < minimum || uitkomst > maximum);
            console.log(param1 + " + " + param2 + " + " + param3 + " + " + param4 + " = " + uitkomst);
        } else if(aantalparams === 5){
            let param3 = 0;
            let param4 = 0;
            let param5 = 0;
            do{
                if(eerstegetaltiental === true){
                    param1 = getRndInteger(0, 10) * 10;
                } else {
                    param1 = getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = getRndInteger(0, 10) * 10;
                } else {
                    param2 = getRndInteger(minimum, maximum);
                }
                param3 = getRndInteger(minimum, maximum);
                param4 = getRndInteger(minimum, maximum);
                param5 = getRndInteger(minimum, maximum);
                uitkomst = param1 + param2 + param3 + param4 + param5;
            } while(uitkomst < minimum || uitkomst > maximum);
            console.log(param1 + " + " + param2 + " + " + param3 + " + " + param4 + " + " + param5 + " = " + uitkomst);
        }
    } else {
        console.log("Het minimum kan niet groter zijn dan het maximum. Voorbeeld: Optelling met uitkomst tussen 0 en 100 met 2 parameters: 46 + 7 = 53");
        // error
    }
}

function getVerschil(){
    console.log("verschil");
    let minimum = parseInt(document.getElementById("verschilminimum").value);
    let maximum = parseInt(document.getElementById("verschilmaximum").value);
    let aantalparams = parseInt(document.getElementById("verschilaantalparams").value);
    let eerstegetaltiental = document.getElementById("verschileerstegetaltiental").checked;
    let tweedegetaltiental = document.getElementById("verschiltweedegetaltiental").checked;
    let param1 = 0;
    let param2 = 0;
    let uitkomst = 0;
    if(minimum < maximum){
        if(aantalparams === 2){
            do {
                if(eerstegetaltiental === true){
                    param1 = getRndInteger(0, 10) * 10;
                } else {
                    param1 = getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = getRndInteger(0, 10) * 10;
                } else {
                    param2 = getRndInteger(minimum, maximum);
                }
                uitkomst = param1 - param2;
            } while(uitkomst < minimum || uitkomst > maximum);
            console.log(param1 + " - " + param2 + " = " + uitkomst);
        } else if(aantalparams === 3){
            let param3 = 0;
            do{
                if(eerstegetaltiental === true){
                    param1 = getRndInteger(0, 10) * 10;
                } else {
                    param1 = getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = getRndInteger(0, 10) * 10;
                } else {
                    param2 = getRndInteger(minimum, maximum);
                }
                param3 = getRndInteger(minimum, maximum);
                uitkomst = param1 - param2 - param3;
            } while(uitkomst < minimum || uitkomst > maximum);
            console.log(param1 + " - " + param2 + " - " + param3 + " = " + uitkomst);
        } else if(aantalparams === 4){
            let param3 = 0;
            let param4 = 0;
            do{
                if(eerstegetaltiental === true){
                    param1 = getRndInteger(0, 10) * 10;
                } else {
                    param1 = getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = getRndInteger(0, 10) * 10;
                } else {
                    param2 = getRndInteger(minimum, maximum);
                }
                param3 = getRndInteger(minimum, maximum);
                param4 = getRndInteger(minimum, maximum);
                uitkomst = param1 - param2 - param3 - param4;
            } while(uitkomst < minimum || uitkomst > maximum);
            console.log(param1 + " - " + param2 + " - " + param3 + " - " + param4 + " = " + uitkomst);
        } else if(aantalparams === 5){
            let param3 = 0;
            let param4 = 0;
            let param5 = 0;
            do{
                if(eerstegetaltiental === true){
                    param1 = getRndInteger(0, 10) * 10;
                } else {
                    param1 = getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = getRndInteger(0, 10) * 10;
                } else {
                    param2 = getRndInteger(minimum, maximum);
                }
                param3 = getRndInteger(minimum, maximum);
                param4 = getRndInteger(minimum, maximum);
                param5 = getRndInteger(minimum, maximum);
                uitkomst = param1 - param2 - param3 - param4 - param5;
            } while(uitkomst < minimum || uitkomst > maximum);
            console.log(param1 + " - " + param2 + " - " + param3 + " - " + param4 + " - " + param5 + " = " + uitkomst);
        }
    } else {
        console.log("Het minimum kan niet groter zijn dan het maximum. Voorbeeld: Verschil met uitkomst tussen 0 en 100 met 2 parameters: 85 - 63 = 22");
        // error
    }
}