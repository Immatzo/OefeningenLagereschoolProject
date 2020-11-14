function handleStart(){
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
    console.log("uitgevoerd")
};

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
    if(aantalparams === 2){
        do {
            param1 = getRndInteger(minimum, maximum);
            param2 = getRndInteger(minimum, maximum);
            uitkomst = param1 + param2;
        } while(uitkomst < minimum || uitkomst > maximum);
        console.log(param1 + " + " + param2 + " = " + uitkomst);
    } else if(aantalparams === 3){
        let param3 = 0;
        do{
            param1 = getRndInteger(minimum, maximum);
            param2 = getRndInteger(minimum, maximum);
            param3 = getRndInteger(minimum, maximum);
            uitkomst = param1 + param2 + param3;
        } while(uitkomst < minimum || uitkomst > maximum);
        console.log(param1 + " + " + param2 + " + " + param3 + " = " + uitkomst);
    }
}

function getVerschil(){
    console.log("verschil");
    let minimum = document.getElementById("verschilminimum").value;
    let maximum = document.getElementById("verschilmaximum").value;
    let aantalparams = document.getElementById("verschilaantalparams").value;
    let eerstegetaltiental = document.getElementById("verschileerstegetaltiental").checked;
    let tweedegetaltiental = document.getElementById("verschiltweedegetaltiental").checked;
    
}