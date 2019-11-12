export class FacturaLocal {

    constructor(id_venta, nro_cae, fecha_emision, cbte_tipo, pto_venta, nro_comprobante, id_cliente, imp_total){
        this.id_venta = id_venta;
        this.nro_cae = nro_cae;
        this.fecha_emision = fecha_emision;
        this.cbte_tipo = cbte_tipo;
        this.pto_venta = pto_venta;
        this.nro_comprobante = nro_comprobante;
        this.id_cliente = id_cliente;
        this.imp_total = imp_total;
    }

    id_venta: number;
    nro_cae : number;
    fecha_emision : Date;
    cbte_tipo: number;
    pto_venta: number;
    nro_comprobante: number;
    id_cliente: number;
    imp_total: number;
}