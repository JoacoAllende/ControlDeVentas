export class Factura {

    constructor(nro_cae, fecha_emision, cbte_tipo, pto_venta, nro_comprobante, imp_total, doc_tipo, doc_nro){
        this.nro_cae = nro_cae;
        this.fecha_emision = fecha_emision;
        this.cbte_tipo = cbte_tipo;
        this.pto_venta = pto_venta;
        this.nro_comprobante = nro_comprobante;
        this.imp_total = imp_total;
        this.doc_tipo = doc_tipo;
        this.doc_nro = doc_nro;
    }

    nro_cae: number;
    fecha_emision: Date;
    cbte_tipo: string;
    pto_venta: number;
    nro_comprobante: number;
    imp_total: number;
    doc_tipo: string;
    doc_nro: number;

}