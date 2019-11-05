export class Factura {

    constructor(cbteTipo, docTipo, docNro, impTotal, impNeto){
        this.cbteTipo = cbteTipo;
        this.docTipo = docTipo;
        this.docNro = docNro;
        this.impTotal = impTotal;
        this.impNeto = impNeto;
    }

    cbteTipo : number;
    docTipo : number;
    docNro : number;
    impTotal : number;
    impNeto : number;
}
