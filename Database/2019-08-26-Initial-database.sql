CREATE TABLE cliente (
    id INT(4) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    doc_tipo INT(2) NOT NULL,
    doc_nro BIGINT(14) NOT NULL,
    telefono VARCHAR(18) NULL
);

CREATE TABLE producto (
    id INT(4) AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(12) UNIQUE,
    descripcion VARCHAR(80) NOT NULL,
    precio NUMERIC(5,2) NOT NULL
);

CREATE TABLE venta (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT(4) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(5,2) NOT NULL,
    facturado BOOLEAN DEFAULT false,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE detalle_venta (
    id_venta INT(6),
    id_detalle INT(3),
    id_producto INT(4) NOT NULL,
    cantidad INT(3) NOT NULL,
    precio_detalle NUMERIC(5,2) NOT NULL,
    PRIMARY KEY (id_venta, id_detalle),
    FOREIGN KEY (id_venta) REFERENCES venta(id),
    FOREIGN KEY (id_producto) REFERENCES producto(id)
);

CREATE TABLE factura (
    id_venta INT(6) PRIMARY KEY,
    nro_cae BIGINT(16) UNIQUE,
    fecha_emision DATE NOT NULL,
    cbte_tipo INT(3) NOT NULL,
    pto_venta INT(2) NOT NULL,
    nro_comprobante INT(6) UNIQUE,
    id_cliente INT(4) NOT NULL,
    imp_total NUMERIC(5,2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);