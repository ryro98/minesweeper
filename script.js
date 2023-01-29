let t = [];
let szer = 0;
let wys = 0;
let bomby = 0;
let rem = 0;
let flagi = 0;
let started = false;

function postawbomby(ile, event) {
    while(ile > 0) {
        //y.x
        let yori = parseInt(event.target.id[1]);
        let xori = parseInt(event.target.id[3]);
        //y.xx
        if (event.target.id[2] === "." && event.target.id.length === 5) xori = parseInt(event.target.id[3] + event.target.id[4]);
        if (event.target.id[3] === ".") {
            //yy.xx
            if (event.target.id.length === 6) {
                yori = parseInt(event.target.id[1] + event.target.id[2]);
                xori = parseInt(event.target.id[4] + event.target.id[5]);
            }
            //yy.x
            else if (event.target.id.length === 5) {
                yori = parseInt(event.target.id[1] + event.target.id[2]);
                xori = parseInt(event.target.id[4]);
            }
        }
        let y = parseInt(Math.round(Math.random() * (wys - 1)));
        let x = parseInt(Math.round(Math.random() * (szer - 1)));
        if (t[y][x] != -1 && y != yori && x != xori) {
            t[y][x] = -1;
            sasiad(y,x);
            ile--;
        }
    }
}

function sasiad(y,x) {
    //lewo
    if (x > 0 && t[y][x-1] != -1) t[y][x-1] += 1;
    //prawo
    if (x < (szer - 1) && t[y][x+1] != -1) t[y][x+1] += 1;
    //góra
    if (y > 0 && t[y-1][x] != -1) t[y-1][x] += 1;
    //dół
    if (y < (wys - 1) && t[y+1][x] != -1) t[y+1][x] += 1;
    //góra lewo
    if (x > 0 && y > 0 && t[y-1][x-1] != -1) t[y-1][x-1] += 1;
    //góra prawo
    if (x < (szer - 1) && y > 0 && t[y-1][x+1] != -1) t[y-1][x+1] += 1;
    // dół lewo
    if (x > 0 && y < (wys - 1) && t[y+1][x-1] != -1) t[y+1][x-1] += 1;
    // dół prawo
    if (x < (szer - 1) && y < (wys - 1) && t[y+1][x+1] != -1) t[y+1][x+1] += 1;
}

function show() {
    let text = "<table>";
    for (let y = 0; y < wys; y++) {
        text += "<tr>";
        for (let x = 0; x < szer; x++) {
            if (t[y][x] === 0) {
                text += "<td id='k" + y + "." + x + "'></td>";
            }
            else if (t[y][x] === -1) {
                text += "<td class='bomb' id='k" + y + "." + x + "'>" + t[y][x] + "</td>";
            }
            else {
                text += "<td class='k" + t[y][x] + "' id='k" + y + "." + x + "'>" + t[y][x] + "</td>";
            }
        }
        text += "</tr>";
    }
    text += "</table>";
    document.getElementById("plansza").innerHTML = text;
}

function hide() {
    let pole = document.getElementById("plansza").getElementsByTagName("td");
    let y = 0;
    let z = 0;
    for (let x = 0; x < pole.length; x++) {
        if (x % szer === 0 && x != 0) {
            y++;
            z = 0;
        }
        pole[x].innerHTML += "<div class='zaslona' id='z" + y + "." + z + "'></div>";
        let zaslona = document.getElementById("z" + y + "." + z);
        zaslona.addEventListener("click", seek);
        zaslona.addEventListener("contextmenu", capture);
        pole[x].addEventListener("mousedown",dblclick);
        z++;
    };
}

function dblclick(event) {
    if (event.buttons === 1 && started === false) {
        postawbomby(bomby, event);
        show();
        hide();
        seek(event);
    }
    if (event.buttons === 3) {
        //y.x
        let yori = parseInt(event.target.id[1]);
        let xori = parseInt(event.target.id[3]);
        //y.xx
        if (event.target.id[2] === "." && event.target.id.length === 5) xori = parseInt(event.target.id[3] + event.target.id[4]);
        if (event.target.id[3] === ".") {
            //yy.xx
            if (event.target.id.length === 6) {
                yori = parseInt(event.target.id[1] + event.target.id[2]);
                xori = parseInt(event.target.id[4] + event.target.id[5]);
            }
            //yy.x
            else if (event.target.id.length === 5) {
                yori = parseInt(event.target.id[1] + event.target.id[2]);
                xori = parseInt(event.target.id[4]);
            }
        }
        let sprflaga = 0;
        if (t[yori][xori] != -1 && t[yori][xori] != 0) {
            //lewo
            if (xori > 0 && document.getElementById("z" + yori + "." + parseInt(xori-1)).style.backgroundImage === 'url("./jpg/flaga.jpg")') sprflaga++;
            //prawo
            if (xori < szer-1 && document.getElementById("z" + yori + "." + parseInt(xori+1)).style.backgroundImage === 'url("./jpg/flaga.jpg")') sprflaga++;
            //góra
            if (yori > 0 && document.getElementById("z" + parseInt(yori-1) + "." + xori).style.backgroundImage === 'url("./jpg/flaga.jpg")') sprflaga++;
            //dół
            if (yori < wys-1 && document.getElementById("z" + parseInt(yori+1) + "." + xori).style.backgroundImage === 'url("./jpg/flaga.jpg")') sprflaga++;
            //góra lewo
            if (xori > 0 && yori > 0 && document.getElementById("z" + parseInt(yori-1) + "." + parseInt(xori-1)).style.backgroundImage === 'url("./jpg/flaga.jpg")') sprflaga++;
            //góra prawo
            if (xori < szer-1 && yori > 0 && document.getElementById("z" + parseInt(yori-1) + "." + parseInt(xori+1)).style.backgroundImage === 'url("./jpg/flaga.jpg")') sprflaga++;
            //dół lewo
            if (xori > 0 && yori < wys-1 && document.getElementById("z" + parseInt(yori+1) + "." + parseInt(xori-1)).style.backgroundImage === 'url("./jpg/flaga.jpg")') sprflaga++;
            //dół prawo
            if (xori < szer-1 && yori < wys-1 && document.getElementById("z" + parseInt(yori+1) + "." + parseInt(xori+1)).style.backgroundImage === 'url("./jpg/flaga.jpg")') sprflaga++;
            //check
            if (t[yori][xori] === sprflaga) seekdblclick(yori,xori);
        }
    }
}

function seekdblclick(yori,xori) {
    //lewo
    if (xori > 0 && document.getElementById(("z" + yori + "." + (xori-1))).style.visibility != "hidden" && document.getElementById(("z" + yori + "." + (xori-1))).style.backgroundImage != 'url("./jpg/flaga.jpg")') {
        document.getElementById("z" + yori + "." + (xori-1)).style.visibility = "hidden";
        if (t[yori][xori-1] === -1) lose(event);
        else {
            document.getElementById("wynik").innerHTML = --rem;
            if (t[yori][xori-1] === 0) seekzero("z" + yori + "." + (xori-1));
        }
    }
    //prawo
    if (xori < (szer - 1) && document.getElementById("z" + yori + "." + (xori+1)).style.visibility != "hidden" && document.getElementById("z" + yori + "." + (xori+1)).style.backgroundImage != 'url("./jpg/flaga.jpg")') {
        document.getElementById("z" + yori + "." + (xori+1)).style.visibility = "hidden";
        if (t[yori][xori+1] === -1) lose(event);
        else {
            document.getElementById("wynik").innerHTML = --rem;
            if (t[yori][xori+1] === 0) seekzero("z" + yori + "." + (xori+1));
        }
    }
    //góra
    if (yori > 0 && document.getElementById("z" + (yori-1) + "." + xori).style.visibility != "hidden" && document.getElementById("z" + (yori-1) + "." + xori).style.backgroundImage != 'url("./jpg/flaga.jpg")') {
        document.getElementById("z" + (yori-1) + "." + xori).style.visibility = "hidden";
        if (t[yori-1][xori] === -1) lose(event);
        else {
            document.getElementById("wynik").innerHTML = --rem;
            if (t[yori-1][xori] === 0) seekzero("z" + (yori-1) + "." + xori);
        }
    }
    //dół
    if (yori < (wys - 1) && document.getElementById("z" + (yori+1) + "." + xori).style.visibility != "hidden" && document.getElementById("z" + (yori+1) + "." + xori).style.backgroundImage != 'url("./jpg/flaga.jpg")') {
        document.getElementById("z" + (yori+1) + "." + xori).style.visibility = "hidden";
        if (t[yori+1][xori] === -1) lose(event);
        else {
            document.getElementById("wynik").innerHTML = --rem;
            if (t[yori+1][xori] === 0) seekzero("z" + (yori+1) + "." + xori);
        }
    }
    //góra lewo
    if (yori > 0 && xori > 0 && document.getElementById("z" + (yori-1) + "." + (xori-1)).style.visibility != "hidden" && document.getElementById("z" + (yori-1) + "." + (xori-1)).style.backgroundImage != 'url("./jpg/flaga.jpg")') {
        document.getElementById("z" + (yori-1) + "." + (xori-1)).style.visibility = "hidden";
        if (t[yori-1][xori-1] === -1) lose(event);
        else {
            document.getElementById("wynik").innerHTML = --rem;
            if (t[yori-1][xori-1] === 0) seekzero("z" + (yori-1) + "." + (xori-1));
        }
    }
    //góra prawo
    if (yori > 0 && xori < (szer - 1) && document.getElementById("z" + (yori-1) + "." + (xori+1)).style.visibility != "hidden" && document.getElementById("z" + (yori-1) + "." + (xori+1)).style.backgroundImage != 'url("./jpg/flaga.jpg")') {
        document.getElementById("z" + (yori-1) + "." + (xori+1)).style.visibility = "hidden";
        if (t[yori-1][xori+1] === -1) lose(event);
        else {
            document.getElementById("wynik").innerHTML = --rem;
            if (t[yori-1][xori-1] === 0) seekzero("z" + (yori-1) + "." + (xori+1));
        }
    }
    //dół lewo
    if (yori < (wys - 1) && xori > 0 && document.getElementById("z" + (yori+1) + "." + (xori-1)).style.visibility != "hidden" && document.getElementById("z" + (yori+1) + "." + (xori-1)).style.backgroundImage != 'url("./jpg/flaga.jpg")') {
        document.getElementById("z" + (yori+1) + "." + (xori-1)).style.visibility = "hidden";
        if (t[yori+1][xori-1] === -1) lose(event);
        else {
            document.getElementById("wynik").innerHTML = --rem;
            if (t[yori+1][xori-1] === 0) seekzero("z" + (yori+1) + "." + (xori-1));
        }
    }
    //dół prawo
    if (yori < (wys - 1) && xori < (szer - 1) && document.getElementById("z" + (yori+1) + "." + (xori+1)).style.visibility != "hidden" && document.getElementById("z" + (yori+1) + "." + (xori+1)).style.backgroundImage != 'url("./jpg/flaga.jpg")') {
        document.getElementById("z" + (yori+1) + "." + (xori+1)).style.visibility = "hidden";
        if (t[yori+1][xori+1] === -1) lose(event);
        else {
            document.getElementById("wynik").innerHTML = --rem;
            if (t[yori+1][xori+1] === 0) seekzero("z" + (yori+1) + "." + (xori+1));
        }
    }
    if (rem === 0) win();
}

function seek(event) {
    let zaslona = document.getElementById(event.target.id);
    if (zaslona != null && zaslona.style.visibility != "hidden") {
        zaslona.removeEventListener("click", seek);
        zaslona.removeEventListener("contextmenu", capture);
        for (let y = 0; y < wys; y++) {
            for (let x = 0; x < szer; x++) {
                let spr = "z" + y + "." + x;
                if (spr === event.target.id) {
                    let war = t[y][x];
                    if (war === -1) {
                        document.getElementById(event.target.id).style.backgroundImage = 'url("./jpg/bombadead.jpg")';
                        lose(event);
                    }
                    if (war != -1 && war != 0) {
                        document.getElementById("wynik").innerHTML = --rem;
                        zaslona.style.visibility = "hidden";
                        if (started === false) started = true;
                        if (rem === 0) win();
                    }
                    if (war === 0) {
                        document.getElementById("wynik").innerHTML = --rem;
                        zaslona.style.visibility = "hidden";
                        if (started === false) started = true;
                        if (rem === 0) win();
                        seekzero(spr);
                    }
                }
            }
        }
    }
}

function seekzero(spr) {
    if (rem === 0) win();
    //y.x
    let yori = parseInt(spr[1]);
    let xori = parseInt(spr[3]);
    //y.xx
    if (spr[2] === "." && spr.length === 5) xori = parseInt(spr[3] + spr[4]);
    if (spr[3] === ".") {
        //yy.xx
        if (spr.length === 6) {
            yori = parseInt(spr[1] + spr[2]);
            xori = parseInt(spr[4] + spr[5]);
        }
        //yy.x
        else if (spr.length === 5) {
            yori = parseInt(spr[1] + spr[2]);
            xori = parseInt(spr[4]);
        }
    }
    //lewo
    if (xori > 0 && t[yori][xori-1] != -1) {
        let y = parseInt(yori);
        let x = parseInt(xori - 1);
        let zaslona = document.getElementById("z" + y + '.' + x);
        if (zaslona.style.visibility != "hidden" && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")') seekzerocd(zaslona,y,x);
    }
    //prawo
    if (xori < (szer - 1) && t[yori][xori+1] != -1) {
        let y = parseInt(yori);
        let x = parseInt(xori + 1);
        let zaslona = document.getElementById("z" + y + '.' + x);
        if (zaslona.style.visibility != "hidden" && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")') seekzerocd(zaslona,y,x);
    }
    //góra
    if (yori > 0 && t[yori-1][xori] != -1) {
        let y = parseInt(yori - 1);
        let x = parseInt(xori);
        let zaslona = document.getElementById("z" + y + '.' + x);
        if (zaslona.style.visibility != "hidden" && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")') seekzerocd(zaslona,y,x);
    }
    //dół
    if (yori < wys - 1) {
        let y = parseInt(yori + 1);
        let x = parseInt(xori);
        let zaslona = document.getElementById("z" + y + '.' + x);
        if (zaslona.style.visibility != "hidden" && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")') seekzerocd(zaslona,y,x);
    }
    //góra lewo
    if (xori > 0 && yori > 0 && t[yori-1][xori-1] != -1) {
        let y = parseInt(yori - 1);
        let x = parseInt(xori - 1);
        let zaslona = document.getElementById("z" + y + '.' + x);
        if (zaslona.style.visibility != "hidden" && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")') seekzerocd(zaslona,y,x);
    }
    //góra prawo
    if (xori < (szer - 1) && yori > 0 && t[yori-1][xori+1] != -1) {
        let y = parseInt(yori - 1);
        let x = parseInt(xori + 1);
        let zaslona = document.getElementById("z" + y + '.' + x);
        if (zaslona.style.visibility != "hidden" && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")') seekzerocd(zaslona,y,x);
    }
    //dół lewo
    if (xori > 0 && yori < (wys - 1) && t[yori+1][xori-1] != -1) {
        let y = parseInt(yori + 1);
        let x = parseInt(xori - 1);
        let zaslona = document.getElementById("z" + y + '.' + x);
        if (zaslona.style.visibility != "hidden" && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")') seekzerocd(zaslona,y,x);
    }
    //dół prawo
    if (xori < (szer - 1) && yori < (wys - 1) && t[yori+1][xori+1] != -1) {
        let y = parseInt(yori + 1);
        let x = parseInt(xori + 1);
        let zaslona = document.getElementById("z" + y + '.' + x);
        if (zaslona.style.visibility != "hidden" && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")') seekzerocd(zaslona,y,x);
    }
    function seekzerocd(zaslona,y,x) {
        zaslona.style.visibility = "hidden";
        document.getElementById("wynik").innerHTML = --rem;
        if (t[y][x] === 0) {
            spr = "z" + y + '.' + x;
            seekzero(spr);
        }
    }
}

function capture(event) {
    if (started === true) {
        let zmiana = document.getElementById(event.target.id);
        if (zmiana != null && zmiana.style.backgroundImage === "") {
            if (flagi != 0) {
                zmiana.style.backgroundImage = 'url("./jpg/flaga.jpg")';
                event.target.removeEventListener("click",seek);
                document.getElementById("flagi").innerHTML = --flagi;
            }
            else alert("Brak flag.");
        } else if (zmiana != null && zmiana.style.backgroundImage === 'url("./jpg/flaga.jpg")') {
            zmiana.style.backgroundImage = 'url("./jpg/pytajnik.jpg")';
            event.target.addEventListener("click",seek);
            document.getElementById("flagi").innerHTML = ++flagi;
        } else if (zmiana != null && zmiana.style.backgroundImage === 'url("./jpg/pytajnik.jpg")') zmiana.style.backgroundImage = "";
    }
}

function start() {
    for (let p1 = 2; p1 > -1; p1--) {
        szer = parseInt(prompt("Wpisz ilość kolumn (od 10 do 30).\nLiczba prób: " + (p1 + 1)));
        if (szer >= 10 && szer <= 30) break;
        if (p1 === 0) {
            alert("Wykorzystano ilość prób.");
            return;
        }
    }
    for (let p2 = 2; p2 > -1; p2--) {
        wys = parseInt(prompt("Wpisz ilość wierszy (od 10 do 30).\nLiczba prób: " + (p2 + 1)));
        if (wys >= 10 && wys <= 30)  break;
        if (p2 === 0) {
            alert("Wykorzystano ilość prób.");
            return;
        }
    }
    for (let p3 = 2; p3 > -1; p3--) {
        bomby = parseInt(prompt("Wpisz ilość bomb (od 10 do " + parseInt((wys * szer / 3)) + ").\nLiczba prób: " + (p3 + 1)));
        if (bomby >= 10 && bomby <= parseInt((wys * szer / 3))) break;
        if (p3 === 0) {
            alert("Wykorzystano ilość prób.");
            return;
        }
    }
    rem = (wys * szer) - bomby;
    flagi = bomby;
    for (let y = 0; y < wys; y++) {
        t[y] = [];
        for (let x = 0; x < szer; x++) t[y][x] = 0;
    }
    started = false;
    document.getElementById("poczatek").disabled = true;
    document.getElementById("pudlo").style.visibility = "visible";
    document.getElementById("pudlo").style.width = parseInt((50 * szer) + (4 * szer) + 2);
    document.getElementById("pudlo").style.height = parseInt((50 * wys) + (4 * wys) + 2);
    document.getElementById("menu").style.visibility = "visible";
    document.getElementById("wynik").innerHTML = rem;
    document.getElementById("flagi").innerHTML = flagi;
    show();
    hide();
}

function restartgame() {
    t = [];
    alert("ok");
    rem = (wys * szer) - bomby;
    flagi = bomby;
    started = false;
    document.getElementById("pudlo").style.width = parseInt((50 * szer) + (4 * szer) + 2);
    document.getElementById("pudlo").style.height = parseInt((50 * wys) + (4 * wys) + 2);
    document.getElementById("plansza").innerHTML = '';
    document.getElementById("wynik").innerHTML = rem;
    document.getElementById("flagi").innerHTML = flagi;
    show();
    hide();
}

function win() {
    document.getElementById("poczatek").disabled = false;
    for (let y = 0; y < wys; y++) {
        for (let x = 0; x < szer; x++) {
            let zaslona = document.getElementById("z" + y + "." + x);
            zaslona.removeEventListener("click", seek);
            zaslona.removeEventListener("contextmenu", capture);
        }
    }
    theend();
}

function lose(event) {
    document.getElementById(event.target.id).style.backgroundColor = "red";
    document.getElementById("poczatek").disabled = false;
    for (let y = 0; y < wys; y++) {
        for (let x = 0; x < szer; x++) {
            let zaslona = document.getElementById("z" + y + "." + x);
            zaslona.removeEventListener("click", seek);
            zaslona.removeEventListener("contextmenu", capture);
            document.getElementById("plansza").getElementsByTagName("td")[x].removeEventListener("mousedown", dblclick);
            if (t[y][x] != -1 && zaslona.style.backgroundImage === 'url("./jpg/flaga.jpg")') zaslona.style.backgroundImage = 'url("./jpg/bombawrong.jpg")';
            if (t[y][x] === -1 && zaslona.style.backgroundImage != 'url("./jpg/flaga.jpg")' && zaslona.id != event.target.id) zaslona.style.visibility = "hidden";
            if (t[y][x] != -1 && zaslona.style.backgroundImage === 'url("./jpg/ pytajnik.jpg")') zaslona.style.backgroundImage = '';
            if (t[y][x] != -1 && zaslona.style.backgroundImage === '' && zaslona.style.visibility != "hidden") zaslona.style.opacity = "0.9";
        }
    }
    theend();
}

function theend() {
    document.getElementById("plansza").style.animationPlayState = "running";
    setTimeout(() => {document.getElementById("plansza").style.animationPlayState = "paused";}, 1500);
}

// 10x10 - 42
// 15x15 - 62
// 20x20 - 82
// 25x25 - 102