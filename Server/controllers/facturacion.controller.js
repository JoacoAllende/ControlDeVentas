const facturaCtrl = {};
const Afip = require('@afipsdk/afip.js');
const mysqlConnection = require('../database');

facturaCtrl.createFacturaAfip = async (req, res) => {
    const afip = new Afip({ CUIT: 20379855068 });
    const factura = req.body;
    const docTipo = factura.docTipo;
    const docNro = factura.docNro;
    const cbteTipo = factura.cbteTipo;
    const impTotal = factura.impTotal;
    const impNeto = factura.impNeto;
    const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    let data = {
        'CantReg': 1,  // Cantidad de comprobantes a registrar
        'PtoVta': 1,  // Punto de venta
        'CbteTipo': cbteTipo,  // Tipo de comprobante (ver tipos disponibles) 
        'Concepto': 1,  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
        'DocTipo': docTipo, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
        'DocNro': docNro,  // Número de documento del comprador (0 consumidor final)
        'CbteDesde': 1,  // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
        'CbteHasta': 1,  // Número de comprobante o numero del último comprobante en caso de ser mas de uno
        'CbteFch': parseInt(fecha.replace(/-/g, '')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
        'ImpTotal': impTotal, // Importe total del comprobante
        'ImpTotConc': 0,   // Importe neto no gravado
        'ImpNeto': impNeto, // Importe neto gravado
        'ImpOpEx': 0,   // Importe exento de IVA
        'ImpIVA': 0,  //Importe total de IVA
        'ImpTrib': 0,   //Importe total de tributos
        'MonId': 'PES', //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
        'MonCotiz': 1,     // Cotización de la moneda usada (1 para pesos argentinos)  
        // 'Iva' 		: [ // (Opcional) Alícuotas asociadas al comprobante
        //     {
        //         'Id' 		: 5, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
        //         'BaseImp' 	: 100, // Base imponible
        //         'Importe' 	: 21 // Importe 
        //     }
        // ],
    };
    const resFactura = await afip.ElectronicBilling.createNextVoucher(data);
    res.json(resFactura);
}

facturaCtrl.createFacturaLocal = async (req, res) => {
    const factura = req.body;
    const query = "INSERT INTO factura (id_venta, nro_cae, fecha_emision, cbte_tipo, pto_venta, nro_comprobante, id_cliente) VALUES (" + factura.id_venta + ", " + 
                    factura.nro_cae + ", '" + factura.fecha_emision + "', " + factura.cbte_tipo + ", " + factura.pto_venta + ", " + factura.nro_comprobante + ", " + 
                    factura.id_cliente + ");";
    mysqlConnection.query(query, (err) => {
        if (!err){
            res.json({'status' : 'created'});
        }
    })
}

module.exports = facturaCtrl;