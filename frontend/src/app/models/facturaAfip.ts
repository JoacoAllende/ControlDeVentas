import { AlicuotaIva } from './alicuota-iva';
import { AlicuotasIva } from './alicuotas-iva';

export class FacturaAfip {

    constructor(cbteTipo, docTipo, docNro, impTotal, impNeto, impIva, alicuotasIva){
        this.cbteTipo = cbteTipo;
        this.docTipo = docTipo;
        this.docNro = docNro;
        this.impTotal = impTotal;
        this.impNeto = impNeto;
        this.impIva = impIva;
        this.alicuotasIva = alicuotasIva;
    }

    cbteTipo : number;
    docTipo : number;
    docNro : number;
    impTotal : number;
    impNeto : number;
    impIva : number;
    alicuotasIva: AlicuotasIva; 
}
