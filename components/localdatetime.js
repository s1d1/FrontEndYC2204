window.watIsDeTijd = function() {

    let hLDT = new Date();
    let hDag = hLDT.getDate();
    let hMaand = hLDT.getMonth()+1;
    let hJaar = hLDT.getFullYear();

    let hUur = hLDT.getHours();
    let hMinuut = hLDT.getMinutes();
    let hSeconde = hLDT.getSeconds();

    console.log(hDag);
    console.log(hMaand);
    console.log(hJaar);
    console.log(hUur + ":" + hMinuut + ":" + hSeconde);

    let isoTijd = hLDT.toISOString();

    console.log("ISO-geformatteerd: " + isoTijd);

    let postTijd = isoTijd.slice(0, 23);

    console.log("Geformatteerd voor backend: " + postTijd);

}

window.postTijd = function () {
    watIsDeTijd()

}
