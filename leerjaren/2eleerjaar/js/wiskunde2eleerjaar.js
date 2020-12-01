// constants aanmaken
// setColor methode aanmaken (voor bij Verbetermethode)
// errors wegdoen wanneer functie niet meer geselecteerd is
// url-functie
// force numeric input in inputfields

// CONSTANTS & INITIALISATIONS
var oplossingen = []; // Lijst met oplossingen


// ONLOADS
// Public
function bodyOnload(){
    loadFunctionOptions('vermenigvuldiging');
    loadFunctionOptions('deling');
}

function loadFunctionOptions(functie){
    for(let i = 0; i <= 10; i++){
        $('#'+functie+'_checkboxes').append('<input type="checkbox" class="'+functie+'oefeninginput_item" id="'+functie+'_'+i+'" name="'+functie+'oefeninginput_'+i+'" onchange="checkOefening(\''+ functie + '\', true)"><label for="'+functie+'oefeninginput_'+i+'" class="'+functie+'_option">'+i+'</label><br>');
    }
}

function loadsummary(){
    document.getElementById("summarydiv").style.display = "inline";
    document.getElementById("oefeningdiv").style.display = "none";
}

// Private
function _loadinsert(){
    document.getElementById("summarydiv").style.display = "none";
    document.getElementById("oefeningdiv").style.display = "inline";
}

// CHECKBOXES LOGIC
// Public
function checkAlleOptionCheckboxes(functie){
    let alles_status = document.getElementById(functie+"_alles").checked;
    if (alles_status){
        _checkUnckeckAllOptionsVermenigvuldigingAndDeling(functie, true)
    } else {
        _checkUnckeckAllOptionsVermenigvuldigingAndDeling(functie, false)
    }
}

function checkAlleOptionsFalse(functie){
    let checked = document.getElementById(functie + "oefeninginput").checked;
    if(!checked){
        if(functie === "optelling" || functie === "verschil"){
            _uncheckTientalCheckboxes(functie);
        } else if(functie === "vermenigvuldiging" || functie === "deling"){
            _checkUnckeckAllOptionsVermenigvuldigingAndDeling(functie, false)
        }
    }
}

function checkOefening(functie, bool){
    document.getElementById(functie + "oefeninginput").checked = bool;
}

// Private
function _checkUnckeckAllOptionsVermenigvuldigingAndDeling(functie, bool){
    let checkboxes = document.getElementById(functie+"_checkboxes").getElementsByTagName("input");
    for (let i = 1, input; input = checkboxes[i++]; ) {
        // Set each input's value to bool.
        input.checked = bool;
    }
    document.getElementById(functie + "_alles").checked = bool;
    checkOefening(functie, bool);
}

function _uncheckTientalCheckboxes(functie){
    document.getElementById(functie + "eerstegetaltiental").checked = false;
    document.getElementById(functie + "tweedegetaltiental").checked = false;
}

// ERROR HANDLING
// Public
// Private
function _throwError(functie, tekst){
    document.getElementById(functie + "error").innerText = tekst;
}

function _clearError(functie){
    document.getElementById(functie + "error").innerText = "";
}

function _getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};


// VERBETERFUNCTION
// Public
function handleVerbeteren(){
    let uitkomst = 0;
    let allesjuist = true;
    for (let i = 0; i < oplossingen.length; i++){
        uitkomst = parseInt(document.getElementById("oplossing"+i).value);
        if(oplossingen[i] === uitkomst){
            document.getElementById("oplossing"+i).style.backgroundColor = "lightgreen";
        } else {
            document.getElementById("oplossing"+i).style.backgroundColor = "red";
            allesjuist = false;
        }
    }
    if(allesjuist){
        $('#buttondiv').append('<button onclick="handleStart()"> Nog eens! </button>');
    }
}
// Private

// URL FUNCTION
// Public
function handleUrl(){
    let aantal = document.getElementById("aantalOefeningenInput").value;
    let optellingtrue = document.getElementById("optellingoefeninginput").checked;
    let verschiltrue = document.getElementById("verschiloefeninginput").checked;
    let vermenigvuldigingtrue = document.getElementById("vermenigvuldigingoefeninginput").checked;
    let delingtrue = document.getElementById("delingoefeninginput").checked;
    let newUrl = "";
    let urlString = "?";
    if(urlString != ""){    // Clear all params
        newUrl = window.location.href.substring(0, (window.location.href.length - window.location.search.length));
    }
    
    if(aantal != 0){
        urlString += "aantal=" + aantal;
        if(optellingtrue){
            let functie = "optelling";
            let tempstring = _getUrlString(functie);
            if(tempstring.includes(functie)){
                urlString += tempstring;
            } else {
                _throwError(functie, tempstring);
            }
        }
        if(verschiltrue){
            let functie = "verschil";
            let tempstring = _getUrlString(functie);
            if(tempstring.includes(functie)){
                urlString += tempstring;
            } else {
                _throwError(functie, tempstring);
            }
        }
        if(vermenigvuldigingtrue){
            let functie = "vermenigvuldiging";
            let tempstring = _getUrlString(functie);
            if(tempstring.includes(functie)){
                urlString += tempstring;
            } else {
                _throwError(functie, tempstring);
            }
        }
        if(delingtrue){
            let functie = "deling";
            let tempstring = _getUrlString(functie);
            if(tempstring.includes(functie)){
                urlString += tempstring;
            } else {
                _throwError(functie, tempstring);
            }
        }
    } else {
        // foutmelding
    }

    console.log(urlString);

    //window.location.href = window.location.href + urlstring;
    document.getElementById("urlField").innerText = window.location.href + urlString;
}

// Private

function _getUrlString(functie){
    if(functie === "optelling" || functie === "verschil"){
        return _getUrlStringOptellingOrVerschil(functie);
    } else if(functie === "vermenigvuldiging" || functie === "deling"){
        return _getUrlStringVermenigvuldigingOrDeling(functie);
    }
}

function _getUrlStringOptellingOrVerschil(functie){
    let minimum = document.getElementById(functie + "minimum").value;
    let maximum = document.getElementById(functie + "maximum").value;
    let aantalparams = document.getElementById(functie + "aantalparams").value;
    return "&" + functie + "=" + minimum + "-" + maximum + "-" + aantalparams;
}

function _getUrlStringVermenigvuldigingOrDeling(functie){
    let tafelalles = document.getElementById(functie + "_alles").checked;
    if(tafelalles){
        return "&"+ functie + "=" + "alles";
    } else {
        let tafelstring = "";
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
        if(!tafel0 && !tafel1 && !tafel2 && !tafel3 && !tafel4 && !tafel5 && !tafel6 && !tafel7 && !tafel8 && !tafel9 && !tafel10){
            return "Er werden geen tafels aangeduid bij de " + functie + ".";
        } else {
            if(tafel0){
                tafelstring += "0";
            }
            if(tafel1 && tafelstring === ""){
                tafelstring += "1";
            } else if(tafel1 && tafelstring !== ""){tafelstring += "-1"}
            if(tafel2 && tafelstring === ""){
                tafelstring += "2";
            } else if(tafel2 && tafelstring !== ""){tafelstring += "-2"}
            if(tafel3 && tafelstring === ""){
                tafelstring += "3";
            } else if(tafel3 && tafelstring !== ""){tafelstring += "-3"}
            if(tafel4 && tafelstring === ""){
                tafelstring += "4";
            } else if(tafel4 && tafelstring !== ""){tafelstring += "-4"}
            if(tafel5 && tafelstring === ""){
                tafelstring += "5";
            } else if(tafel5 && tafelstring !== ""){tafelstring += "-5"}
            if(tafel6 && tafelstring === ""){
                tafelstring += "6";
            } else if(tafel6 && tafelstring !== ""){tafelstring += "-6"}
            if(tafel7 && tafelstring === ""){
                tafelstring += "7";
            } else if(tafel7 && tafelstring !== ""){tafelstring += "-7"}
            if(tafel8 && tafelstring === ""){
                tafelstring += "8";
            } else if(tafel8 && tafelstring !== ""){tafelstring += "-8"}
            if(tafel9 && tafelstring === ""){
                tafelstring += "9";
            } else if(tafel9 && tafelstring !== ""){tafelstring += "-9"}
            if(tafel10 && tafelstring === ""){
                tafelstring += "10";
            } else if(tafel10 && tafelstring !== ""){tafelstring += "-10"}
            return "&" + functie + "=" + tafelstring;
        }
    }
}

// CREATE EXERCISES
// Public
function handleStart(){
    // Clear lijst met oplossingen
    oplossingen = [];
    // Clear werkblad
    $('#insertdiv').html('');
    // Remove "Nog eens!"-knop
    $('#buttondiv').html('<button onclick="loadsummary()"> Menu </button><button onclick="handleVerbeteren()"> Verbeteren </button>');
    let aantal = document.getElementById("aantalOefeningenInput").value;
    let optellingtrue = document.getElementById("optellingoefeninginput").checked;
    let verschiltrue = document.getElementById("verschiloefeninginput").checked;
    let vermenigvuldigingtrue = document.getElementById("vermenigvuldigingoefeninginput").checked;
    let delingtrue =document.getElementById("delingoefeninginput").checked;
    _getOefeningen(optellingtrue, verschiltrue, vermenigvuldigingtrue, delingtrue, aantal);
};

//Private
function _getOefeningen(optellingtrue, verschiltrue, vermenigvuldigingtrue, delingtrue, aantal){
    // A = optelling, B = verschil, C = vermenigvuldiging, D = deling
    if(optellingtrue && verschiltrue && vermenigvuldigingtrue && delingtrue){
        _getOptellingOefOrVerschilOefOrVermenigvuldigingOefOrDelingOef(aantal);  //x A B C D
    } else if (optellingtrue && verschiltrue && vermenigvuldigingtrue){
        _getOptellingOefOrVerschilOefOrVermenigvuldigingOef(aantal);             //x A B C
    } else if (optellingtrue && verschiltrue && delingtrue){ 
        _getOptellingOefOrVerschilOefOrDelingOef(aantal);                        //x A B   D
    } else if (optellingtrue && vermenigvuldigingtrue && delingtrue){ 
        _getOptellingOefOrVermenigvuldigingOefOrDelingOef(aantal);               //x A   C D
    } else if (verschiltrue && vermenigvuldigingtrue && delingtrue){
        _getVerschilOefOrVermenigvuldigingOefOrDelingOef();                      //x   B C D
    } else if (optellingtrue && verschiltrue){
        _getOptellingOefOrVerschilOef(aantal);                                   //x A B
    } else if (optellingtrue && vermenigvuldigingtrue){
        _getOptellingOefOrVermenigvuldigingOef(aantal);                          //x A   C
    } else if (optellingtrue && delingtrue){
        _getOptellingOefOrDelingOef(aantal);                                     //x A     D
    } else if (verschiltrue && vermenigvuldigingtrue){
        _getVerschilOefOrVermenigvuldigingOef(aantal);                           //x   B C
    } else if (verschiltrue && delingtrue){
        _getVerschilOefOrDelingOef(aantal);                                      //x   B   D
    } else if (vermenigvuldigingtrue && delingtrue){
        _getVermenigvuldigingOefOrDelingOef(aantal);                             //x     C D
    } else if (optellingtrue){
        _getOptellingOef(aantal);                                                //x A
    } else if (verschiltrue){
        _getVerschilOef(aantal);                                                 //x   B
    } else if (vermenigvuldigingtrue){
        _getVermenigvuldigingOef(aantal);                                        //x     C
    } else if (delingtrue){
        _getDelingOef(aantal);                                                   //x       D
    }
}

function _getOptellingOefOrVerschilOefOrVermenigvuldigingOefOrDelingOef(aantal){ // A B C D
    if(_checkAllOk("optelling") && _checkAllOk("verschil") && _checkAllOk("vermenigvuldiging") && _checkAllOk("deling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 4); // 1 = optelling, 2 = verschil, 3 = vermenigvuldiging 4 = deling
            if(soort === 1){
                oplossingen.push(_getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(_getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if (soort === 3) {
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            } else if (soort === 4) {
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function _getOptellingOefOrVerschilOefOrVermenigvuldigingOef(aantal){            // A B C
    if(_checkAllOk("optelling") && _checkAllOk("verschil") && _checkAllOk("vermenigvuldiging")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 3); // 1 = optelling, 2 = verschil, 3 = vermenigvuldiging
            if(soort === 1){
                oplossingen.push(_getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(_getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if (soort === 3) {
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            }
        }
    }
}

function _getOptellingOefOrVerschilOefOrDelingOef(aantal){                       // A B D
    if(_checkAllOk("optelling") && _checkAllOk("verschil") && _checkAllOk("deling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 3); // 1 = optelling, 2 = verschil, 3 = deling
            if(soort === 1){
                oplossingen.push(_getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(_getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if (soort === 3) {
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function _getOptellingOefOrVermenigvuldigingOefOrDelingOef(aantal){              // A C D
    if(_checkAllOk("optelling") && _checkAllOk("vermenigvuldiging") && _checkAllOk("deling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 3); // 1 = optelling, 2 = vermenigvuldiging, 3 = deling
            if(soort === 1){
                oplossingen.push(_getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            } else if (soort === 3) {
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function _getVerschilOefOrVermenigvuldigingOefOrDelingOef(aantal){              // B C D
    if(_checkAllOk("verschil") && _checkAllOk("vermenigvuldiging") && _checkAllOk("deling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 3); // 1 = verschil, 2 = vermenigvuldiging, 3 = deling
            if(soort === 1){
                oplossingen.push(_getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if(soort === 2){
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            } else if (soort === 3) {
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function _getOptellingOefOrVerschilOef(aantal){                                  // A B
    if(_checkAllOk("optelling") && _checkAllOk("verschil")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 2); // 1 = optelling, 2 = verschil
            if(soort === 1){
                oplossingen.push(_getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(_getVerschil(i)); // sla oplossing op & maak verschil aan
            }
        }
    }
}

function _getOptellingOefOrVermenigvuldigingOef(aantal){                         // A C
    if(_checkAllOk("optelling") && _checkAllOk("vermenigvuldiging")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 2); // 1 = optelling, 2 = vermenigvuldiging
            if(soort === 1){
                oplossingen.push(_getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            }
        }
    }
}

function _getOptellingOefOrDelingOef(aantal){                                    // A D
    if(_checkAllOk("optelling") && _checkAllOk("deling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 2); // 1 = optelling, 2 = deling
            if(soort === 1){
                oplossingen.push(_getOptelling(i)); // sla oplossing op & maak optelling aan
            } else if(soort === 2){
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function _getVerschilOefOrVermenigvuldigingOef(aantal){                          // B C
    if(_checkAllOk("verschil") && _checkAllOk("vermenigvuldiging")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 2); // 1 = verschil, 2 = vermenigvuldiging
            if(soort === 1){
                oplossingen.push(_getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if(soort === 2){
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            }
        }
    }
}

function _getVerschilOefOrDelingOef(aantal){                                     // B D
    if(_checkAllOk("verschil") && _checkAllOk("deling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 2); // 1 = verschil, 2 = deling
            if(soort === 1){
                oplossingen.push(_getVerschil(i)); // sla oplossing op & maak verschil aan
            } else if(soort === 2){
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function _getVermenigvuldigingOefOrDelingOef(aantal){                            // C D
    if(_checkAllOk("vermenigvuldiging") && _checkAllOk("deling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            let soort = _getRndInteger(1, 2); // 1 = vermenigvuldiging, 2 = deling
            if(soort === 1){
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
            } else if(soort === 2){
                oplossingen.push(_getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
            }
        }
    }
}

function _getOptellingOef(aantal){                                               // A
    if(_checkAllOk("optelling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            oplossingen.push(_getOptelling(i)); // sla oplossing op & maak optelling aan
        }
    }
}

function _getVerschilOef(aantal){                                                // B
    if(_checkAllOk("verschil")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            oplossingen.push(_getVerschil(i)); // sla oplossing op & maak verschil aan
        }
    }
}

function _getVermenigvuldigingOef(aantal){                                          // C
    if(_checkAllOk("vermenigvuldiging")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            oplossingen.push(_getVermenigvuldigingOrDeling(i, "vermenigvuldiging")); // sla oplossing op & maak vermenigvuldiging aan
        }
    }
}

function _getDelingOef(aantal){                                                     // D
    if(_checkAllOk("deling")){
        _loadinsert();
        for(let i = 0; i < aantal; i++){
            oplossingen.push(_getVermenigvuldigingOrDeling(i, "deling")); // sla oplossing op & maak deling aan
        }
    }
}

function _checkAllOk(functie){
    if (functie === "optelling" || functie === "verschil"){
        if(_checkInputOk(functie) && _checkParamsOk(functie)){
            return true;
        } else {
            return false;
        }
    } else if(functie === "vermenigvuldiging" || functie === "deling"){
        if(_checkInputOk(functie)){
            return true;
        } else {
            return false;
        }
    }
}

function _checkInputOk(functie){
    if(functie === "optelling" || functie === "verschil"){
        let param1 = document.getElementById(functie + "minimum").value;
        let param2 = document.getElementById(functie + "maximum").value;
        let param3 = document.getElementById(functie + "aantalparams").value;
        if(param1 === "" || param2 === "" || param3 === ""){
            _throwError(functie, "Niet alle nodige gegevens zijn ingevuld.");
            //document.getElementById(functie + "error").innerText = "Niet alle nodige gegevens zijn ingevuld.";
            return false;
        } else {
            _clearError(functie);
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
            _clearError(functie);
            return true;
        } else {       
            _throwError(functie, "Er werden geen tafels aangeduid.");  
            return false;
        }
    }
}

function _checkParamsOk(functie){
    // We ondersteunen 2 tot en met 5 params.
    let aantalparams = document.getElementById(functie + "aantalparams").value;
    if(aantalparams >= 2 && aantalparams <= 5){ // meer of gelijk aan 2 params, minder of gelijk aan 5 params       
        // meer dan 1 en minder dan 6 params
        _clearError(functie);
        return true;
    } else if(aantalparams < 2){ // functie minder dan 2 params
        let tekst = "Een " + functie + " moet minstens 2 parameters bevatten!";
        _throwError(functie, tekst);
        return false;
        //document.getElementById(functie + "error").innerText = "Een " + functie + " moet minstens 2 parameters bevatten!";
    } else if(aantalparams > 5){  // functie meer dan 5 params
        _throwError(functie, "We ondersteunen enkel oefeningen tot en met 5 parameters.");
        return false;
        //document.getElementById(functie + "error").innerText = "We ondersteunen enkel oefeningen tot en met 5 parameters.";
    }
}

// EXERCISES
// Optelling
function _getOptelling(index){
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
                    param1 = _getRndInteger(0, 10) * 10;
                } else {
                    param1 = _getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = _getRndInteger(0, 10) * 10;
                } else {
                    param2 = _getRndInteger(minimum, maximum);
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
                    param1 = _getRndInteger(0, 10) * 10;
                } else {
                    param1 = _getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = _getRndInteger(0, 10) * 10;
                } else {
                    param2 = _getRndInteger(minimum, maximum);
                }
                param3 = _getRndInteger(minimum, maximum);
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
                    param1 = _getRndInteger(0, 10) * 10;
                } else {
                    param1 = _getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = _getRndInteger(0, 10) * 10;
                } else {
                    param2 = _getRndInteger(minimum, maximum);
                }
                param3 = _getRndInteger(minimum, maximum);
                param4 = _getRndInteger(minimum, maximum);
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
                    param1 = _getRndInteger(0, 10) * 10;
                } else {
                    param1 = _getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = _getRndInteger(0, 10) * 10;
                } else {
                    param2 = _getRndInteger(minimum, maximum);
                }
                param3 = _getRndInteger(minimum, maximum);
                param4 = _getRndInteger(minimum, maximum);
                param5 = _getRndInteger(minimum, maximum);
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
        _throwError("optelling", "Het minimum kan niet groter zijn dan het maximum. Voorbeeld: Optelling met uitkomst tussen 0 en 100 met 2 parameters: 46 + 7 = 53")
        loadsummary();
    }
}

// Verschil
function _getVerschil(index){
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
                    param1 = _getRndInteger(0, 10) * 10;
                } else {
                    param1 = _getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = _getRndInteger(0, 10) * 10;
                } else {
                    param2 = _getRndInteger(minimum, maximum);
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
                    param1 = _getRndInteger(0, 10) * 10;
                } else {
                    param1 = _getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = _getRndInteger(0, 10) * 10;
                } else {
                    param2 = _getRndInteger(minimum, maximum);
                }
                param3 = _getRndInteger(minimum, maximum);
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
                    param1 = _getRndInteger(0, 10) * 10;
                } else {
                    param1 = _getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = _getRndInteger(0, 10) * 10;
                } else {
                    param2 = _getRndInteger(minimum, maximum);
                }
                param3 = _getRndInteger(minimum, maximum);
                param4 = _getRndInteger(minimum, maximum);
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
                    param1 = _getRndInteger(0, 10) * 10;
                } else {
                    param1 = _getRndInteger(minimum, maximum);
                }
                if(tweedegetaltiental === true){
                    param2 = _getRndInteger(0, 10) * 10;
                } else {
                    param2 = _getRndInteger(minimum, maximum);
                }
                param3 = _getRndInteger(minimum, maximum);
                param4 = _getRndInteger(minimum, maximum);
                param5 = _getRndInteger(minimum, maximum);
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
        _throwError("verschil", "Het minimum kan niet groter zijn dan het maximum. Voorbeeld: Verschil met uitkomst tussen 0 en 100 met 2 parameters: 85 - 63 = 22")
        loadsummary();
    }
}

// Vermenigvuldiging OR Deling
function _getVermenigvuldigingOrDeling(index, functie){
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
    param2 = _getParam2(tafelalles, tafel0, tafel1, tafel2, tafel3, tafel4, tafel5, tafel6, tafel7, tafel8, tafel9, tafel10);
    if(functie === "vermenigvuldiging"){
        param1 = _getRndInteger(0, 10);
    } else if(functie === "deling"){
        param1 = _getMeervoudVan(param2);
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

function _getParam2(tafelalles, tafel0, tafel1, tafel2, tafel3, tafel4, tafel5, tafel6, tafel7, tafel8, tafel9, tafel10){
    let param2 = 0;
    if(tafelalles){
        param2 = _getRndInteger(0, 10);
    } else {
        var list = [];
        if(tafel0){
            list.push("0");
        }
        if(tafel1){
            list.push("1");
        }
        if(tafel2){
            list.push("2");
        }
        if(tafel3){
            list.push("3");
        }
        if(tafel4){
            list.push("4");
        }
        if(tafel5){
            list.push("5");
        }
        if(tafel6){
            list.push("6");
        }
        if(tafel7){
            list.push("7");
        }
        if(tafel8){
            list.push("8");
        }
        if(tafel9){
            list.push("9");
        }
        if(tafel10){
            list.push("10");
        }
        param2 =  _getParamOption(list);
    }
    return param2;
}

function _getParamOption(list){
    let param2 = 0;
    if(list.length === 10){
        param2 = _getRandomParam(10, list);
    } else if(list.length === 9){
        param2 = _getRandomParam(9, list);
    } else if(list.length === 8){
        param2 = _getRandomParam(8, list);
    } else if(list.length === 7){
        param2 = _getRandomParam(7, list);
    } else if(list.length === 6){
        param2 = _getRandomParam(6, list);
    } else if(list.length === 5){
        param2 = _getRandomParam(5, list);
    } else if(list.length === 4){
        param2 = _getRandomParam(4, list);
    } else if(list.length === 3){
        param2 = _getRandomParam(3, list);
    } else if(list.length === 2){
        param2 = _getRandomParam(2, list);
    } else if(list.length === 1){
        param2 = _getRandomParam(1, list);
    }
    return param2;
}

function _getMeervoudVan(getal){
    let meervoud = _getRndInteger(0, 10) * getal;
    return meervoud;
}

function _getRandomParam(aantal, list){
    let randomgetal = _getRndInteger(0, aantal-1);
    return list[randomgetal];
}