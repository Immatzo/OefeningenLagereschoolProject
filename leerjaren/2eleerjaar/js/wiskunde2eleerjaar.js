var oplossingen = [];
function handleStart(){
    oplossingen = [];
    $('#insertdiv').html('');
    let aantal = document.getElementById("aantalOefeningenInput").value;
    let optellentrue = document.getElementById("optellingoefeninginput").checked;
    let verschiltrue = document.getElementById("verschiloefeninginput").checked;

    if (optellentrue === true && verschiltrue === true){
        for(let i = 0; i < aantal; i++){
            let soort = getRndInteger(1, 2); // 1 = optelling, 2 = verschil
            if(soort === 1){
                oplossingen.push(getOptelling(i));
            } else if(soort === 2){
                oplossingen.push(getVerschil(i));
            }
        }
    } else if (optellentrue === true){
        for(let i = 0; i < aantal; i++){
            oplossingen.push(getOptelling(i));
        }
    } else if (verschiltrue === true){
        for(let i = 0; i < aantal; i++){
            oplossingen.push(getVerschil(i));
        }
    }
    hide("summary");
    oplossingen.forEach(element => console.log(element));
    console.log("uitgevoerd");
};

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