var oplossingen = [];
function handleStart(){
    oplossingen = []; // Clear lijst met oplossingen
    $('#insertdiv').html('');
    let aantal = document.getElementById("aantalOefeningenInput").value;
    let optellingtrue = document.getElementById("optellingoefeninginput").checked;
    let verschiltrue = document.getElementById("verschiloefeninginput").checked;
    if (optellingtrue === true && verschiltrue === true){
        getOptellingOefOrVerschilOef(aantal);
    } else if (optellingtrue === true){
        getOptellingOef(aantal);
    } else if (verschiltrue === true){
        getVerschilOef(aantal);
    }
};

function getVerschilOef(aantal){
    if(checkParamsOk("verschil")){
        hide("summary");
        for(let i = 0; i < aantal; i++){
            oplossingen.push(getVerschil(i));
        }
    }
}

function getOptellingOef(aantal){
    if(checkParamsOk("optelling")){
        hide("summary");
        for(let i = 0; i < aantal; i++){
            oplossingen.push(getOptelling(i));
        }
    }
}

function getOptellingOefOrVerschilOef(aantal){
    if(checkParamsOk("optelling") && checkParamsOk("verschil")){
            hide("summary");
            for(let i = 0; i < aantal; i++){
                let soort = getRndInteger(1, 2); // 1 = optelling, 2 = verschil
                if(soort === 1){
                    oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
                } else if(soort === 2){
                    oplossingen.push(getVerschil(i)); // sla oplossing op &  maak verschil aan
                }
            }
        }
}

function checkAllOk(functie){
    if(checkInputOk(functie) && checkParamsOk(functie)){
        return true;
    } else {
        return false;
    }
}

function checkInputOk(){
    if(functie === "optelling" || functie === "verschil"){
        let param1 = document.getElementById(functie + "minimum").value;
        let param2 = document.getElementById(functie + "maximum").value;
        let param3 = document.getElementById(functie + "aantalparams").value;
    }
}

function checkParamsOk(functie){
    // We ondersteunen 2 tot en met 5 params.
    if(parseInt(document.getElementById(functie + "aantalparams").value) > 1      // functie meer dan 1 param
    && parseInt(document.getElementById(functie + "aantalparams").value) <= 5     // functie minder of gelijk aan 5 params
    ){          // meer dan 1 en minder dan 6 params
        clearError(functie);
        return true;
    } else {    // minder dan 2 of meer dan 5 params
        throwError(functie);
        return false;
    }
}

function throwError(functie){
    if(parseInt(document.getElementById(functie + "aantalparams").value) <= 1){           // functie minder dan 2 params
        document.getElementById(functie + "error").innerText = "Een " + functie + " moet minstens 2 parameters bevatten!";
    } else if(parseInt(document.getElementById(functie + "aantalparams").value) > 5){     // functie meer dan 5 params
        document.getElementById(functie + "error").innerText = "We ondersteunen enkel oefeningen tot en met 5 parameters.";
    }
}

function clearError(functie){
    document.getElementById(functie + "error").innerText = "";
}

function hide(div){
    if(div == "summary"){
        document.getElementById("summarydiv").style.display = "none";
        document.getElementById("oefeningdiv").style.display = "inline";
    } else if(div == "insert"){
        document.getElementById("summarydiv").style.display = "inline";
        document.getElementById("oefeningdiv").style.display = "none";
    }
}

function loadsummary(){
    hide("insert");
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

function handleCheck(){
    let uitkomst = 0;
    for (let i = 0; i < oplossingen.length; i++){
        uitkomst = parseInt(document.getElementById("oplossing"+i).value);
        if(oplossingen[i] === uitkomst){
            console.log("juist");
            document.getElementById("oplossing"+i).style.backgroundColor = "lightgreen";
        } else {
            console.log("fout");
            document.getElementById("oplossing"+i).style.backgroundColor = "red";
        }
    }
}

function getOptelling(index){
    console.log("optelling");
    let minimum = parseInt(document.getElementById("optellingminimum").value);
    let maximum = parseInt(document.getElementById("optellingmaximum").value);
    let aantalparams = parseInt(document.getElementById("optellingaantalparams").value);
    let eerstegetaltiental = document.getElementById("optellingeerstegetaltiental").checked;
    let tweedegetaltiental = document.getElementById("optellingtweedegetaltiental").checked;
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
            //console.log(param1 + " + " + param2 + " = " + uitkomst);
            $('#insertdiv').append('<p class="oefening">' 
                                    + param1 + " + " 
                                    + param2 + " = " 
                                    + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
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
            //console.log(param1 + " + " + param2 + " + " + param3 + " = " + uitkomst);
            $('#insertdiv').append('<p class="oefening">' 
                                    + param1 + " + " 
                                    + param2 + " + " 
                                    + param3 + " = " 
                                    + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
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
            //console.log(param1 + " + " + param2 + " + " + param3 + " + " + param4 + " = " + uitkomst);
            $('#insertdiv').append('<p class="oefening">' 
                                    + param1 + " + " 
                                    + param2 + " + " 
                                    + param3 + " + " 
                                    + param4 + " = " 
                                    + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
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
            //console.log(param1 + " + " + param2 + " + " + param3 + " + " + param4 + " + " + param5 + " = " + uitkomst);
            $('#insertdiv').append('<p class="oefening">' 
                                    + param1 + " + " 
                                    + param2 + " + " 
                                    + param3 + " + " 
                                    + param4 + " + " 
                                    + param5 + " = " 
                                    + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
        }
        return uitkomst;
    } else {
        // error
        document.getElementById("optellingerror").innerText = "Het minimum kan niet groter zijn dan het maximum. Voorbeeld: Optelling met uitkomst tussen 0 en 100 met 2 parameters: 46 + 7 = 53";
        hide("insert");
    }
}

function getVerschil(index){
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
            //console.log(param1 + " - " + param2 + " = " + uitkomst);
            $('#insertdiv').append('<p class="oefening">' 
                                    + param1 + " - " 
                                    + param2 + " = " 
                                    + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
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
            //console.log(param1 + " - " + param2 + " - " + param3 + " = " + uitkomst);
            $('#insertdiv').append('<p class="oefening">' 
                                    + param1 + " - " 
                                    + param2 + " - " 
                                    + param3 + " = " 
                                    + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
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
            //console.log(param1 + " - " + param2 + " - " + param3 + " - " + param4 + " = " + uitkomst);
            $('#insertdiv').append('<p class="oefening">' 
                                    + param1 + " - " 
                                    + param2 + " - " 
                                    + param3 + " - " 
                                    + param4 + " = " 
                                    + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
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
            //console.log(param1 + " - " + param2 + " - " + param3 + " - " + param4 + " - " + param5 + " = " + uitkomst);
            $('#insertdiv').append('<p class="oefening">' 
                                    + param1 + " - " 
                                    + param2 + " - " 
                                    + param3 + " - " 
                                    + param4 + " - " 
                                    + param5 + " = " 
                                    + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
        }
        return uitkomst;
    } else {
        console.log("Het minimum kan niet groter zijn dan het maximum. Voorbeeld: Verschil met uitkomst tussen 0 en 100 met 2 parameters: 85 - 63 = 22");
        // error
    }
}

function bodyOnload(){
    loadFunctionOptions('vermenigvuldiging');
    loadFunctionOptions('deling');
}

function loadFunctionOptions(functie){
    for(let i = 0; i <= 10; i++){
        $('#'+functie+'_checkboxes').append('<input type="checkbox" class="'+functie+'oefeninginput_item" id="'+functie+'_'+i+'" name="'+functie+'oefeninginput_'+i+'"><label for="'+functie+'oefeninginput_'+i+'" class="'+functie+'_option">'+i+'</label><br>');
    }
}

function checkAlleCheckboxes(functie){
    let alles_status = document.getElementById(functie+"_alles").checked;
    let checkboxes = document.getElementById(functie+"_checkboxes").getElementsByTagName("input");
    if (alles_status){
        for (let i = 1, input; input = checkboxes[i++]; ) {

            // Set each input's value to 'checked'.
            input.checked = true;
        }
    } else {
        for (let i = 1, input; input = checkboxes[i++]; ) {

            // Set each input's value to 'unchecked'.
            input.checked = false;
        }
    }
}