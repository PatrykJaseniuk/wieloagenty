import { Hash, randomBytes } from "crypto";
import { type } from "os";

// import randrom "seedrandom"
// import Rand, { PRNG } from 'randeed';
// import gen from 'randeed'

export class ParametryOgolne {

    przyspieszenie: WartoscPriorytet
    predkoscMaksymalna: WartoscPriorytet
    zasieg: WartoscPriorytet
    uterenowienie: WartoscPriorytet
    manewrowalnosc: WartoscPriorytet
    kolor: { wartosc: 'czarny' | 'czerwony' | 'bialy', priorytet: number }
    komfort: WartoscPriorytet

    cena: Zakres;

    constructor() {
        this.przyspieszenie = { wartosc: 1, priorytet: 1 }
        this.predkoscMaksymalna = { wartosc: 1, priorytet: 1 }
        this.zasieg = { wartosc: 1, priorytet: 1 }
        this.uterenowienie = { wartosc: 1, priorytet: 1 }
        this.manewrowalnosc = { wartosc: 1, priorytet: 1 }
        this.kolor = { wartosc: 'bialy', priorytet: 1 }
        this.komfort = { wartosc: 1, priorytet: 1 }
        this.cena = { max: 10000000, min: 500, wartosc: 10000, priorytet: 1 }
    }
}

export interface WartoscPriorytet {
    wartosc: number;
    priorytet: number;
}

export interface SamochodDopasowanie {
    roznica: number,
    samochod: Samochod
}

export class Samochod {
    nazwa: string;
    parametry: Parametry;

    constructor(nazwa: string) {
        this.nazwa = nazwa;
        this.parametry = new Parametry(nazwa);
    }
}

export class Parametry {
    silnik: SilnikBazowy
    nadwozie: {
        kolor: { wartosc: "czarny" | "bialy" | "czerwony", priorytet: number };
        czyMaKimatyzacje: { wartosc: boolean, priorytet: number };
        czyMaradio: { wartosc: boolean, priorytet: number };
    };
    podwozie: {
        przeswit: Zakres;
        napedPrzod: { wartosc: boolean, priorytet: number };
        napedTyl: { wartosc: boolean, priorytet: number };
        rozmiarKol: Zakres;
        skretnaTylnaOs: { wartosc: boolean, priorytet: number };
    };
    cena: Zakres;

    constructor(seed: string) {
        let rand = random(seed);
        this.nadwozie = {
            kolor: { wartosc: rand > 0.5 ? 'bialy' : 'czerwony', priorytet: 1 },
            czyMaKimatyzacje: { wartosc: rand > 0.5, priorytet: 1 },
            czyMaradio: { wartosc: rand > 0.5, priorytet: 1 }
        };
        this.podwozie = {
            napedPrzod: { wartosc: true, priorytet: 1 },
            napedTyl: { wartosc: false, priorytet: 1 },
            przeswit: { wartosc: 10 + rand * 50, min: 10, max: 60, priorytet: 1 },
            rozmiarKol: { wartosc: 20 + rand * 20, min: 20, max: 40, priorytet: 1 },
            skretnaTylnaOs: { wartosc: rand > 0.5, priorytet: 1 },
        };

        let momentSily: Zakres = { min: 50, max: 1000, wartosc: rand * 950 + 50, priorytet: 1 }
        let moc: Zakres = { min: 50, max: 1000, wartosc: rand * 950 + 50, priorytet: 1 }
        if (rand > 0.5) {
            let pojemnoscBaterii: Zakres = { min: 10, max: 100, wartosc: rand * 90 + 10, priorytet: 1 }
            let elektryczny = new SilnikElektryczny(50, pojemnoscBaterii, momentSily, moc)
            this.silnik = elektryczny;
        }
        else {
            let pojemnosc: Zakres = { min: 50, max: 6000, wartosc: rand * 5050 + 50, priorytet: 1 }
            this.silnik = new SilnikSpalinowy(pojemnosc, rand > 0.5 ? 'benzyna' : 'ropa', momentSily, moc)
        }
        this.cena = { min: 10, max: 1000000, wartosc: rand * 1000000, priorytet: 1 }

        // this.nadwozie = {
        //     kolor: { wartosc: 'czerwony', priorytet: 1 },
        //     czyMaKimatyzacje: { wartosc: true, priorytet: 1 },
        //     czyMaradio: { wartosc: false, priorytet: 1 }
        // };
        // this.podwozie = {
        //     napedPrzod: { wartosc: true, priorytet: 1 },
        //     napedTyl: { wartosc: false, priorytet: 1 },
        //     przeswit: { wartosc: 15, min: 10, max: 60, priorytet: 1 },
        //     rozmiarKol: { wartosc: 25, min: 20, max: 30, priorytet: 1 },
        //     skretnaTylnaOs: { wartosc: false, priorytet: 1 },
        // };
        // this.silnik = new SilnikElektryczny(100, { wartosc: 1, max: 1, min: 1, priorytet: 1 }, { wartosc: 1, max: 1, min: 1, priorytet: 1 }, { wartosc: 1, max: 1, min: 1, priorytet: 1 });
        // this.cena = { min: 10, max: 10000000, wartosc: 30000, priorytet: 1 }
    }
}

export interface Zakres {
    wartosc: number;
    min: number,
    max: number,
    priorytet: number
}

class SilnikBazowy {
    moc: Zakres;
    momentSily: Zakres;
    nazwa: string;

    constructor(moc: Zakres, momentSily: Zakres, nazwa: string) {
        this.moc = moc;
        this.momentSily = momentSily;
        this.nazwa = nazwa
    }
}

export class SilnikSpalinowy extends SilnikBazowy {
    pojemnosc: Zakres;
    rodzajPaliwa: 'benzyna' | 'ropa' | 'wodor'

    constructor(pojemnosc: Zakres, rodzajPaliwa: 'benzyna' | 'ropa' | 'wodor', momentSily: Zakres, moc: Zakres) {
        super(moc, momentSily, 'spalinowy');
        this.pojemnosc = pojemnosc;
        this.rodzajPaliwa = rodzajPaliwa;
    };
}

export class SilnikElektryczny extends SilnikBazowy {
    napiecie: Zakres;
    pojemnoscBaterii: Zakres;

    constructor(napiecie: number, pojemnoscBaterii: Zakres, momentSily: Zakres, moc: Zakres) {
        super(moc, momentSily, 'elektryczny');
        this.napiecie = { max: 1500, min: 5, wartosc: 500, priorytet: 1 };
        this.pojemnoscBaterii = pojemnoscBaterii;
    }
};

function random(seed: string): number {
    return (mulberry32(cyrb128(seed)))();
}
function mulberry32(a: number) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function cyrb128(str: string) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return (h1 ^ h2 ^ h3 ^ h4) >>> 0;
}