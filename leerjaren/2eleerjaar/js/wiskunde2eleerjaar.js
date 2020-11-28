// wanneer vermenigvuldiging of deling uitgevinkt, alle checkboxen uitgevinkt
// moet nog vermenigvuldiging en deling 0, 1, 2, 3, 4, 6, 7, 8, 9, 10 aanmaken, + combinaties van allemaal (ook 5)
// constants aanmaken
// setColor methode aanmaken (voor bij Verbetermethode)

var oplossingen = []; // Lijst met oplossingen
function handleStart(){
    oplossingen = [];           // Clear lijst met oplossingen
    $('#insertdiv').html('');   // Clear werkblad
    let aantal = document.getElementById("aantalOefeningenInput").value;
    let optellingtrue = document.getElementById("optellingoefeninginput").checked;
    let verschiltrue = document.getElementById("verschiloefeninginput").checked;
    let vermenigvuldigingtrue = document.getElementById("vermenigvuldigingoefeninginput").checked;
    let delingtrue =document.getElementById("delingoefeninginput").checked;
    getOefeningen(optellingtrue, verschiltrue, vermenigvuldigingtrue, delingtrue, aantal);
};

function getOefeningen(optellingtrue, verschiltrue, vermenigvuldigingtrue, delingtrue, aantal){
    // A = optelling, B = verschil, C = vermenigvuldiging, D = deling
    if(optellingtrue && verschiltrue && vermenigvuldigingtrue && delingtrue){
        getOptellingOefOrVerschilOefOrVermenigvuldigingOefOrDelingOef(aantal);  //x A B C D
    } else if (optellingtrue && verschiltrue && vermenigvuldigingtrue){
        getOptellingOefOrVerschilOefOrVermenigvuldigingOef(aantal);             //x A B C
    } else if (optellingtrue && verschiltrue && delingtrue){ 
        getOptellingOefOrVerschilOefOrDelingOef(aantal);                        //x A B   D
    } else if (optellingtrue && vermenigvuldigingtrue && delingtrue){ 
        getOptellingOefOrVermenigvuldigingOefOrDelingOef(aantal);               //x A   C D
    } else if (verschiltrue && vermenigvuldigingtrue && delingtrue){
        getVerschilOefOrVermenigvuldigingOefOrDelingOef();                      //x   B C D
    } else if (optellingtrue && verschiltrue){
        getOptellingOefOrVerschilOef(aantal);                                   //x A B
    } else if (optellingtrue && vermenigvuldigingtrue){
        getOptellingOefOrVermenigvuldigingOef(aantal);                          //x A   C
    } else if (optellingtrue && delingtrue){
        getOptellingOefOrDelingOef(aantal);                                     //x A     D
    } else if (verschiltrue && vermenigvuldigingtrue){
        getVerschilOefOrVermenigvuldigingOef(aantal);                           //x   B C
    } else if (verschiltrue && delingtrue){
        getVerschilOefOrDelingOef(aantal);                                      //x   B   D
    } else if (vermenigvuldigingtrue && delingtrue){
        getVermenigvuldigingOefOrDelingOef(aantal);                             //x     C D
    } else if (optellingtrue){
        getOptellingOef(aantal);                                                //x A
    } else if (verschiltrue){
        getVerschilOef(aantal);                                                 //x   B
    } else if (vermenigvuldigingtrue){
        getVermenigvuldigingOef(aantal);                                        //x     C
    } else if (delingtrue){
        getDelingOef(aantal);                                                   //x       D
    }
}

function getOptellingOefOrVerschilOefOrVermenigvuldigingOefOrDelingOef(aantal){ // A B C D
    if(checkAllOk("optelling") && checkAllOk("verschil") && checkAllOk("vermenigvuldiging") && checkAllOk("deling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 4); // 1 = optelling, 2 = verschil, 3 = vermenigvuldiging 4 = deling
            if(soort === 1){
                oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if (soort === 3) {
                oplossingen.push(getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            } else if (soort === 4) {
                oplossingen.push(getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function getOptellingOefOrVerschilOefOrVermenigvuldigingOef(aantal){            // A B C
    if(checkAllOk("optelling") && checkAllOk("verschil") && checkAllOk("vermenigvuldiging")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 3); // 1 = optelling, 2 = verschil, 3 = vermenigvuldiging
            if(soort === 1){
                oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if (soort === 3) {
                oplossingen.push(getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            }
        }
    }
}

function getOptellingOefOrVerschilOefOrDelingOef(aantal){                       // A B D
    if(checkAllOk("optelling") && checkAllOk("verschil") && checkAllOk("deling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 3); // 1 = optelling, 2 = verschil, 3 = deling
            if(soort === 1){
                oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if (soort === 3) {
                oplossingen.push(getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function getOptellingOefOrVermenigvuldigingOefOrDelingOef(aantal){              // A C D
    if(checkAllOk("optelling") && checkAllOk("vermenigvuldiging") && checkAllOk("deling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 3); // 1 = optelling, 2 = vermenigvuldiging, 3 = deling
            if(soort === 1){
                oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            } else if (soort === 3) {
                oplossingen.push(getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function getVerschilOefOrVermenigvuldigingOefOrDelingOef(aantal){              // B C D
    if(checkAllOk("verschil") && checkAllOk("vermenigvuldiging") && checkAllOk("deling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 3); // 1 = verschil, 2 = vermenigvuldiging, 3 = deling
            if(soort === 1){
                oplossingen.push(getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if(soort === 2){
                oplossingen.push(getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            } else if (soort === 3) {
                oplossingen.push(getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function getOptellingOefOrVerschilOef(aantal){                                  // A B
    if(checkAllOk("optelling") && checkAllOk("verschil")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 2); // 1 = optelling, 2 = verschil
            if(soort === 1){
                oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(getVerschil(i)); // sla oplossing op & maak verschil aan
            }
        }
    }
}

function getOptellingOefOrVermenigvuldigingOef(aantal){                         // A C
    if(checkAllOk("optelling") && checkAllOk("vermenigvuldiging")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 2); // 1 = optelling, 2 = vermenigvuldiging
            if(soort === 1){
                oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            }
        }
    }
}

function getOptellingOefOrDelingOef(aantal){                                    // A D
    if(checkAllOk("optelling") && checkAllOk("deling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 2); // 1 = optelling, 2 = deling
            if(soort === 1){
                oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function getVerschilOefOrVermenigvuldigingOef(aantal){                          // B C
    if(checkAllOk("verschil") && checkAllOk("vermenigvuldiging")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 2); // 1 = verschil, 2 = vermenigvuldiging
            if(soort === 1){
                oplossingen.push(getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if(soort === 2){
                oplossingen.push(getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            }
        }
    }
}

function getVerschilOefOrDelingOef(aantal){                                     // B D
    if(checkAllOk("verschil") && checkAllOk("deling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 2); // 1 = verschil, 2 = deling
            if(soort === 1){
                oplossingen.push(getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if(soort === 2){
                oplossingen.push(getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function getVermenigvuldigingOefOrDelingOef(aantal){                            // C D
    if(checkAllOk("vermenigvuldiging") && checkAllOk("deling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 2); // 1 = vermenigvuldiging, 2 = deling
            if(soort === 1){
                oplossingen.push(getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            } else if(soort === 2){
                oplossingen.push(getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function getOptellingOef(aantal){                                               // A
    if(checkAllOk("optelling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            oplossingen.push(getOptelling(i)); // sla oplossing op & maak optelling aan
        }
    }
}

function getVerschilOef(aantal){                                                // B
    if(checkAllOk("verschil")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            oplossingen.push(getVerschil(i)); // sla oplossing op & maak verschil aan
        }
    }
}

function getVermenigvuldigingOef(aantal){                                          // C
    if(checkAllOk("vermenigvuldiging")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            oplossingen.push(getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
        }
    }
}

function getDelingOef(aantal){                                                     // D
    if(checkAllOk("deling")){
        loadinsert();
        for(let i = 0; i < aantal; i++){
            oplossingen.push(getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
        }
    }
}

function checkAllOk(functie){
    if (functie === "optelling" || functie === "verschil"){
        if(checkInputOk(functie) && checkParamsOk(functie)){
            return true;
        } else {
            return false;
        }
    } else if(functie === "vermenigvuldiging" || functie === "deling"){
        if(checkInputOk(functie)){
            return true;
        } else {
            return false;
        }
    }
}

function checkInputOk(functie){
    if(functie === "optelling" || functie === "verschil"){
        let param1 = document.getElementById(functie + "minimum").value;
        let param2 = document.getElementById(functie + "maximum").value;
        let param3 = document.getElementById(functie + "aantalparams").value;
        if(param1 === "" || param2 === "" || param3 === ""){
            throwError(functie, "Niet alle nodige gegevens zijn ingevuld.");
            //document.getElementById(functie + "error").innerText = "Niet alle nodige gegevens zijn ingevuld.";
            return false;
        } else {
            clearError(functie);
            return true 
        }
    } else if (functie === "vermenigvuldiging" || functie === "deling"){
        let ingevuld = false;
        let field_value;
        for(let i = -1; i <= 10; i++){
            if(i === -1){
                field_value = document.getElementById(functie+"_alles").checked;
                if(field_value){
                    ingevuld = true;
                }
            } else {
                field_value = document.getElementById(functie+"_"+i).checked;
                if(field_value){
                    ingevuld = true;
                }
            }
        }
        if(ingevuld){
            clearError(functie);
            return true;
        } else {       
            throwError(functie, "Er werden geen tafels aangeduid.");  
            //document.getElementById(functie + "error").innerText = "Er werden geen tafels aangeduid.";
            return false;
        }
    }
}

function checkParamsOk(functie){
    // We ondersteunen 2 tot en met 5 params.
    let aantalparams = document.getElementById(functie + "aantalparams").value;
    if(aantalparams >= 2 && aantalparams <= 5){ // meer of gelijk aan 2 params, minder of gelijk aan 5 params       
        // meer dan 1 en minder dan 6 params
        clearError(functie);
        return true;
    } else if(aantalparams < 2){ // functie minder dan 2 params
        let tekst = "Een " + functie + " moet minstens 2 parameters bevatten!";
        throwError(functie, tekst);
        return false;
        //document.getElementById(functie + "error").innerText = "Een " + functie + " moet minstens 2 parameters bevatten!";
    } else if(aantalparams > 5){  // functie meer dan 5 params
        throwError(functie, "We ondersteunen enkel oefeningen tot en met 5 parameters.");
        return false;
        //document.getElementById(functie + "error").innerText = "We ondersteunen enkel oefeningen tot en met 5 parameters.";
    }
}

function throwError(functie, tekst){
    document.getElementById(functie + "error").innerText = tekst;
}

function clearError(functie){
    document.getElementById(functie + "error").innerText = "";
}

function loadsummary(){
    document.getElementById("summarydiv").style.display = "inline";
    document.getElementById("oefeningdiv").style.display = "none";
}

function loadinsert(){
    document.getElementById("summarydiv").style.display = "none";
    document.getElementById("oefeningdiv").style.display = "inline";
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

function handleVerbeteren(){
    let uitkomst = 0;
    for (let i = 0; i < oplossingen.length; i++){
        uitkomst = parseInt(document.getElementById("oplossing"+i).value);
        if(oplossingen[i] === uitkomst){
            document.getElementById("oplossing"+i).style.backgroundColor = "lightgreen";
        } else {
            document.getElementById("oplossing"+i).style.backgroundColor = "red";
        }
    }
}

function getOptelling(index){
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
        throwError("optelling", "Het minimum kan niet groter zijn dan het maximum. Voorbeeld: Optelling met uitkomst tussen 0 en 100 met 2 parameters: 46 + 7 = 53")
        loadsummary();
    }
}

function getVerschil(index){
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
        throwError("verschil", "Het minimum kan niet groter zijn dan het maximum. Voorbeeld: Verschil met uitkomst tussen 0 en 100 met 2 parameters: 85 - 63 = 22")
        loadsummary();
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

function getMeervoudVan(getal){
    let meervoud = getRndInteger(0, 10) * getal;
    return meervoud;
}

function getVermenigvuldigingOrDeling(index, functie){
    let tafelalles = document.getElementById(functie + "_alles").checked;
    let tafel0 = document.getElementById(functie + "_0").checked;
    let tafel1 = document.getElementById(functie + "_1").checked;
    let tafel2 = document.getElementById(functie + "_2").checked;
    let tafel3 = document.getElementById(functie + "_3").checked;
    let tafel4 = document.getElementById(functie + "_4").checked;
    let tafel5 = document.getElementById(functie + "_5").checked;
    let tafel6 = document.getElementById(functie + "_6").checked;
    let tafel7 = document.getElementById(functie + "_7").checked;
    let tafel8 = document.getElementById(functie + "_8").checked;
    let tafel9 = document.getElementById(functie + "_9").checked;
    let tafel10 = document.getElementById(functie + "_10").checked;
    let param1 = 0;
    let param2 = 0;
    let uitkomst = 0;

    if(tafelalles){
        param2 = getRndInteger(0, 10);
    } else if(tafel5){
        param2 = 5;
    }

    if(functie === "vermenigvuldiging"){
        param1 = getRndInteger(0, 10);
    } else if(functie === "deling"){
        param1 = getMeervoudVan(param2);
    }

    if(functie === "vermenigvuldiging"){
        $('#insertdiv').append('<p class="oefening">' 
                                + param1 + " x " 
                                + param2 + " = " 
                                + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
    } else if (functie === "deling"){
        $('#insertdiv').append('<p class="oefening">' 
                                + param1 + " : " 
                                + param2 + " = " 
                                + "<input class=\"oplossing\" id=\"oplossing" + index + "\"/>" + "</p>");
    }

    if(functie === "vermenigvuldiging"){
        uitkomst = param1 * param2;
    } else if(functie === "deling"){
        uitkomst = param1 / param2;
    }

    return uitkomst;
}