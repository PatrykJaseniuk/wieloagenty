import { Parametry, Samochod } from "../Data/data";

export function wyszukaj(data: Parametry): Samochod[] {
    let samochody: Samochod[];
    samochody = [];
    samochody[1] = new Samochod('Porshe 911');
    samochody[0] = new Samochod('Ford Mustang')
    return samochody;
}

