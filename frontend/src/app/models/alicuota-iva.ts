export class AlicuotaIva {

    constructor(id) {
        this.Id = id;
        this.BaseImp = 0;
        this.Importe = 0;
    }

    addDetalle(BaseImp, Importe){
        this.BaseImp += BaseImp;
        this.Importe += Importe;
        this.BaseImp = Number(BaseImp.toFixed(2));
        this.Importe = Number(Importe.toFixed(2));
    }

    Id: number;
    BaseImp: number;
    Importe: number;
}
