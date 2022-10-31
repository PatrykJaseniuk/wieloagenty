import { AlignVerticalCenterOutlined, NatSharp } from "@mui/icons-material";
import { Z_ASCII } from "zlib";
import { Parametry, ParametryOgolne, Samochod, SamochodDopasowanie, SilnikElektryczny, SilnikSpalinowy, Zakres } from "../Data/data";

export function wyszukaj(parametryOgolne: ParametryOgolne): SamochodDopasowanie[] {
    let parametrySzczegolowe = generujParametrySzczegolowe(parametryOgolne)


    let sprzedawcy = tworzSprzedawcow(5)
    let kupcy = tworzKupcow(5, parametrySzczegolowe)

    pozyskiwanieOfert(kupcy, sprzedawcy) //side effect

    let samochody: SamochodDopasowanie[] = scalenieOfertUzyskanychPrzezKupcow(kupcy);


    return samochody;
}

export function generujParametrySzczegolowe(parametryOgolne: ParametryOgolne): Parametry {
    let parametrySzczegolowe = new Parametry('nazwa');

    let nad = parametrySzczegolowe.nadwozie;
    nad.kolor = parametryOgolne.kolor;
    nad.czyMaKimatyzacje.wartosc = parametryOgolne.komfort.wartosc > 2 ? true : false;
    nad.czyMaKimatyzacje.priorytet = parametryOgolne.komfort.priorytet;
    nad.czyMaradio.wartosc = parametryOgolne.komfort.wartosc > 2 ? true : false;
    nad.czyMaradio.priorytet = parametryOgolne.komfort.priorytet;

    let pod = parametrySzczegolowe.podwozie;
    pod.napedPrzod.wartosc = true;
    pod.napedPrzod.priorytet = parametryOgolne.manewrowalnosc.priorytet;
    pod.napedTyl.wartosc = false;
    pod.napedTyl.priorytet = parametryOgolne.przyspieszenie.priorytet;
    pod.przeswit.wartosc = parametryOgolne.uterenowienie.wartosc * 10;
    pod.przeswit.priorytet = parametryOgolne.uterenowienie.priorytet;
    pod.rozmiarKol.wartosc = parametryOgolne.uterenowienie.wartosc * 10;
    pod.rozmiarKol.priorytet = parametryOgolne.uterenowienie.priorytet;
    pod.skretnaTylnaOs.wartosc = true;
    pod.skretnaTylnaOs.priorytet = parametryOgolne.manewrowalnosc.priorytet;

    let wyznacznikTypuSilnika: number = 0;
    wyznacznikTypuSilnika += parametryOgolne.predkoscMaksymalna.priorytet * parametryOgolne.predkoscMaksymalna.wartosc;
    wyznacznikTypuSilnika += parametryOgolne.zasieg.wartosc * parametryOgolne.zasieg.priorytet;
    wyznacznikTypuSilnika -= parametryOgolne.przyspieszenie.wartosc * parametryOgolne.przyspieszenie.priorytet;

    let moc = {
        wartosc: parametryOgolne.predkoscMaksymalna.wartosc * 200,
        priorytet: parametryOgolne.predkoscMaksymalna.priorytet,
        max: 1000,
        min: 50
    }
    let momentSily: Zakres = {
        wartosc: parametryOgolne.przyspieszenie.wartosc * 150,
        priorytet: parametryOgolne.przyspieszenie.priorytet,
        max: 700,
        min: 100
    }

    if (wyznacznikTypuSilnika > 0) {
        let pojemnosc: Zakres = {
            wartosc: parametryOgolne.predkoscMaksymalna.wartosc * 1500,
            priorytet: parametryOgolne.predkoscMaksymalna.priorytet,
            max: 7000,
            min: 100
        }
        parametrySzczegolowe.silnik = new SilnikSpalinowy(pojemnosc, 'benzyna', momentSily, moc)
    }
    else {
        let pojemnoscBaterii: Zakres = {
            wartosc: parametryOgolne.zasieg.wartosc * 45 + 10,
            priorytet: parametryOgolne.zasieg.priorytet,
            max: 100,
            min: 10
        }

        parametrySzczegolowe.silnik = new SilnikElektryczny(500, pojemnoscBaterii, momentSily, moc);
    }
    return parametrySzczegolowe;
}

class Kupiec {
    oferty: SamochodDopasowanie[];
    wyszukiwaneParametry: Parametry;

    sprawdzOferty(sprzedawca: Sprzedawca) {
        let ofertySprzedawcy = sprzedawca.getOferty();
        let przefiltrowaneOferty = this.filtruj(ofertySprzedawcy);
        this.scalOferty(przefiltrowaneOferty);
    }

    filtruj(ofertySprzedawcy: Samochod[]): SamochodDopasowanie[] {

        let przefiltrowaneOferty: SamochodDopasowanie[];
        przefiltrowaneOferty = ofertySprzedawcy.map((samochod) => {
            let roznica: number = this.wyznaczRoznice(samochod.parametry, this.wyszukiwaneParametry);
            return { roznica: roznica, samochod: samochod }
        })

        return przefiltrowaneOferty
    }
    wyznaczRoznice(parametry: Parametry, wyszukiwaneParametry: Parametry): number {
        let roznica = 0;

        // let silnik = parametry.silnik;
        const isZakres = (ob: any): boolean => {
            let z = (ob as Zakres);
            if (z.max != undefined && z.min != undefined && z.priorytet != undefined && z.wartosc != undefined) {
                return true
            }
            else {
                return false
            }
        }

        // forma ogolna
        const roznicaDlaParametru = (parKey: string) => {
            Object.keys((parametry as any)[parKey]).forEach((key) => {
                let parametr = ((parametry as any)[parKey] as any)[key];
                let parametrSzukany = ((((wyszukiwaneParametry as any)[parKey]) as any)[key] as Zakres)
                if (parametrSzukany == undefined) {
                    return
                }
                if (isZakres(parametr) && isZakres(parametrSzukany)) {

                    let parametr = ((((parametry as any)[parKey]) as any)[key] as Zakres)
                    roznica += Math.abs(parametrSzukany.wartosc - parametr.wartosc) * parametrSzukany.priorytet;
                }
            })
        }

        // roznicaDlaParametru('silnik');
        // roznicaDlaParametru('nadwozie');
        // roznicaDlaParametru('podwozie');

        let sa = parametry.silnik;
        let sw = wyszukiwaneParametry.silnik;

        roznica += Math.abs(sa.moc.wartosc - sw.moc.wartosc) * sw.moc.priorytet
        roznica += Math.abs(sa.momentSily.wartosc - sw.momentSily.wartosc) * sw.momentSily.priorytet

        let pojemnocsBateriiA = 300;
        let pojemnoscBatriiP = 300;
        let pr = 1;
        if (sa instanceof SilnikElektryczny) {
            pojemnocsBateriiA = sa.pojemnoscBaterii.wartosc;
        }
        if (sw instanceof SilnikElektryczny) {
            pojemnoscBatriiP = sw.pojemnoscBaterii.wartosc;
            pr = sw.pojemnoscBaterii.priorytet;
        }

        roznica += Math.abs(pojemnocsBateriiA - pojemnoscBatriiP) * pr;

        let pa = parametry.podwozie;
        let pw = wyszukiwaneParametry.podwozie;

        roznica += Math.abs(pa.przeswit.wartosc - pw.przeswit.wartosc) * pw.przeswit.priorytet
        roznica += Math.abs(pa.rozmiarKol.wartosc - pw.rozmiarKol.wartosc) * pw.rozmiarKol.priorytet
        roznica += pa.napedPrzod == pw.napedPrzod ? 0 : 50 * pw.napedPrzod.priorytet;
        roznica += pa.napedTyl == pw.napedTyl ? 0 : 50 * pw.napedTyl.priorytet;
        roznica += pa.skretnaTylnaOs == pw.skretnaTylnaOs ? 0 : 50 * pw.skretnaTylnaOs.priorytet;

        let na = parametry.nadwozie;
        let nw = wyszukiwaneParametry.nadwozie;

        roznica += na.czyMaKimatyzacje.wartosc == nw.czyMaKimatyzacje.wartosc ? 0 : 50 * nw.czyMaKimatyzacje.priorytet;

        roznica += na.czyMaradio.wartosc == nw.czyMaradio.wartosc ? 0 : 50 * nw.czyMaradio.priorytet;
        roznica += na.kolor.wartosc == nw.kolor.wartosc ? 0 : 50 * nw.kolor.priorytet;


        return roznica;
    }


    private scalOferty(noweOferty: SamochodDopasowanie[]) {
        this.oferty = this.oferty.concat(noweOferty);
        noweOferty
    }


    constructor(wyszukiwaneParametry: Parametry) {
        this.oferty = [];
        this.wyszukiwaneParametry = wyszukiwaneParametry;
    }
}

class Sprzedawca {
    static i = 0;
    getOferty() {
        Sprzedawca.i = (Sprzedawca.i + 1) % this.posiadaneSamochody.length;
        return this.posiadaneSamochody.slice(Sprzedawca.i, Sprzedawca.i + 1);

    }
    posiadaneSamochody: Samochod[];

    constructor(samochodySprzedawcy: Samochod[]) {
        this.posiadaneSamochody = samochodySprzedawcy;
    }
}
function tworzSprzedawcow(iloscSprzedawcow: number): Sprzedawca[] {
    const samochodyNaSprzedawce = 5;
    let samochody: Samochod[] = generujLosowePojazdy(iloscSprzedawcow * samochodyNaSprzedawce);

    let sprzedawcy: Sprzedawca[] = [];
    for (let i = 0; i < iloscSprzedawcow; i++) {
        let samochodySprzedawcy = samochody.slice(i * samochodyNaSprzedawce, (i + 1) * samochodyNaSprzedawce)
        sprzedawcy[i] = new Sprzedawca(samochodySprzedawcy);
    }
    return sprzedawcy
}

function tworzKupcow(arg0: number, parametrySzczegolowe: Parametry): Kupiec[] {
    let kupcy: Kupiec[] = [];
    for (let i = 0; i < 5; i++) {
        kupcy[i] = new Kupiec(parametrySzczegolowe);
    }
    return kupcy;
}

function pozyskiwanieOfert(kupcy: Kupiec[], sprzedawcy: Sprzedawca[]) {
    kupcy.forEach((kupiec) => {
        sprzedawcy.forEach((sprzedawca) => {
            kupiec.sprawdzOferty(sprzedawca)
        })
    })
}

function scalenieOfertUzyskanychPrzezKupcow(kupcy: Kupiec[]): SamochodDopasowanie[] {
    let samochodyDopasowania: SamochodDopasowanie[] = [];

    kupcy.forEach((kupiec) => {
        let noweOferty = kupiec.oferty.filter((samochodDopasowanie) => {
            return !samochodyDopasowania.find((samochod) => {
                return samochodDopasowanie.samochod.nazwa == samochod.samochod.nazwa;
            })
        }
        )
        samochodyDopasowania = samochodyDopasowania.concat(noweOferty)
    })

    samochodyDopasowania.sort((s1, s2) => {
        return s1.roznica > s2.roznica ? 1 : -1
    })

    let samochody = samochodyDopasowania.slice(0, 10);
    return samochody;
}

function generujLosowePojazdy(iloscPojazdow: number): Samochod[] {
    let samochody: Samochod[] = []
    const marki: string[] = ['BMW', 'Mercedes', 'Nissan', 'Tesla', 'Porshe', 'VW', 'Subaru', 'Kia', 'Renault', 'Fiat', 'Ferarii', 'Lamborghini', 'Ford']
    const modele: string[] = ['Enzo', 'X', 'Y', 'Tuscon', 'Passat', '911', 'Navara', 'GLE', 'Impreza']


    for (let iMarki = 0, iModelu = 0, iPojazdu = 0; iPojazdu < iloscPojazdow; iPojazdu++, iModelu++) {
        if (iModelu >= modele.length) {
            iMarki++
            iModelu = 0;
        }
        samochody[iPojazdu] = new Samochod(`${marki[iMarki]} ${modele[iModelu]}`)
    }

    return samochody
}

