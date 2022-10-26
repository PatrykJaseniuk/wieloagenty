import { type } from "os";

export class Samochod {
    nazwa: string;
    parametry: Parametry;

    constructor(nazwa: string) {
        this.nazwa = nazwa;
        this.parametry = new Parametry();
    }
}

export class Parametry {
    silnik: SilnikBazowy
    nadwozie: {
        kolor: "czarny" | "bialy" | "czerwony";
        czyMaKimatyzacje: boolean;
        czyMaradio: boolean;
    };
    podwozie: {
        przeswit: zakres;
        napedPrzod: boolean;
        napedTyl: boolean;
        rozmiarKol: zakres;
        skretnaTylnaOs: boolean;
    };
    cena: zakres;

    constructor() {
        this.nadwozie = {
            kolor: 'czarny',
            czyMaKimatyzacje: false,
            czyMaradio: true
        };
        this.podwozie = {
            napedPrzod: true,
            napedTyl: false,
            przeswit: { wartosc: 15, min: 10, max: 60 },
            rozmiarKol: { wartosc: 25, min: 20, max: 30 },
            skretnaTylnaOs: false,
        };
        this.silnik = new SilnikElektryczny(100, 100, 100, 100);
        this.cena = { min: 10, max: 10000000, wartosc: 30000 }
    }
}

interface zakres {
    wartosc: number;
    min: number,
    max: number,
}

class SilnikBazowy {
    moc: zakres;
    momentSily: zakres;
    nazwa: string;

    constructor(moc: number, momentSily: number, nazwa: string) {
        this.moc = { max: 2000, min: 20, wartosc: 100 };
        this.momentSily = { max: 1000, min: 20, wartosc: 100 };
        this.nazwa = nazwa
    }
}

export class SilnikSpalinowy extends SilnikBazowy {
    pojemnosc: zakres;
    rodzajPaliwa: 'benzyna' | 'ropa' | 'wodor'

    constructor(pojemnosc: number, rodzajPaliwa: 'benzyna' | 'ropa' | 'wodor', momentSily: number, moc: number) {
        super(moc, momentSily, 'spalinowy');
        this.pojemnosc = { max: 10000, min: 50, wartosc: pojemnosc };
        this.rodzajPaliwa = rodzajPaliwa;
    };
}

export class SilnikElektryczny extends SilnikBazowy {
    napiecie: zakres;
    pojemnoscBaterii: zakres;

    constructor(napiecie: number, pojemnoscBaterii: number, momentSily: number, moc: number) {
        super(moc, momentSily, 'elektryczny');
        this.napiecie = { max: 1500, min: 5, wartosc: 500 };
        this.pojemnoscBaterii = { max: 100, min: 1, wartosc: 20 };
    }
};
