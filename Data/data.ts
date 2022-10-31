import { Hash, randomBytes } from "crypto";
import { type } from "os";

import rand from "seedrandom"

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
        let gen = rand(seed);
        this.nadwozie = {
            kolor: { wartosc: gen() > 0.5 ? 'bialy' : 'czerwony', priorytet: 1 },
            czyMaKimatyzacje: { wartosc: gen() > 0.5, priorytet: 1 },
            czyMaradio: { wartosc: gen() > 0.5, priorytet: 1 }
        };
        this.podwozie = {
            napedPrzod: { wartosc: true, priorytet: 1 },
            napedTyl: { wartosc: false, priorytet: 1 },
            przeswit: { wartosc: 10 + gen() * 50, min: 10, max: 60, priorytet: 1 },
            rozmiarKol: { wartosc: 20 + gen() * 20, min: 20, max: 40, priorytet: 1 },
            skretnaTylnaOs: { wartosc: gen() > 0.5, priorytet: 1 },
        };

        let momentSily: Zakres = { min: 50, max: 1000, wartosc: gen() * 950 + 50, priorytet: 1 }
        let moc: Zakres = { min: 50, max: 1000, wartosc: gen() * 950 + 50, priorytet: 1 }
        if (gen() > 0.5) {
            let pojemnoscBaterii: Zakres = { min: 10, max: 100, wartosc: gen() * 90 + 10, priorytet: 1 }
            let elektryczny = new SilnikElektryczny(50, pojemnoscBaterii, momentSily, moc)
            this.silnik = elektryczny;
        }
        else {
            let pojemnosc: Zakres = { min: 50, max: 6000, wartosc: gen() * 5050 + 50, priorytet: 1 }
            this.silnik = new SilnikSpalinowy(pojemnosc, gen() > 0.5 ? 'benzyna' : 'ropa', momentSily, moc)
        }
        this.cena = { min: 10, max: 10000000, wartosc: 30000, priorytet: 1 }

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
