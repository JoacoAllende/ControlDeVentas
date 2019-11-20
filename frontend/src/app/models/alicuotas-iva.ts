import { AlicuotaIva } from './alicuota-iva';

export class AlicuotasIva {

    constructor() {
        this.Iva = [];
        this.Iva.push(new AlicuotaIva(3));
        this.Iva.push(new AlicuotaIva(4));
        this.Iva.push(new AlicuotaIva(5));
        this.Iva.push(new AlicuotaIva(6));
        this.Iva.push(new AlicuotaIva(8));
        this.Iva.push(new AlicuotaIva(9));
    }

    Iva: AlicuotaIva[]; 
}
