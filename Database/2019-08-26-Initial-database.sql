DROP DATABASE IF EXISTS controlVentas;
CREATE DATABASE controlVentas;

USE controlVentas

CREATE TABLE cbte_tipo (
    id INT(3) PRIMARY KEY,
    descripcion VARCHAR(10) NOT NULL
);

CREATE TABLE doc_tipo (
    id INT(3) PRIMARY KEY,
    descripcion VARCHAR(12) NOT NULL
);

CREATE TABLE alicuota (
    id INT PRIMARY KEY,
    valor NUMERIC (3,1) NOT NULL
);

CREATE TABLE cliente (
    id INT(4) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    doc_tipo INT(2) NOT NULL,
    doc_nro BIGINT(14) NOT NULL UNIQUE,
    telefono VARCHAR(18) NULL,
    cliente_responsable_inscripto BOOLEAN,
    responsable_inscripto BOOLEAN DEFAULT true,
    FOREIGN KEY(doc_tipo) REFERENCES doc_tipo(id)
);

CREATE TABLE producto (
    id INT(4) AUTO_INCREMENT PRIMARY KEY,
    codigo BIGINT(13) UNIQUE,
    descripcion VARCHAR(80) NOT NULL,
    precio NUMERIC(7,2) NOT NULL,
    id_alicuota INT(1) NOT NULL,
    FOREIGN KEY(id_alicuota) REFERENCES alicuota(id)
);

CREATE TABLE venta (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT(4) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(7,2) NOT NULL,
    facturado BOOLEAN DEFAULT false,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE detalle_venta (
    id_venta INT(6),
    id_detalle INT(3),
    id_producto INT(4) NOT NULL,
    cantidad INT(3) NOT NULL,
    precio_detalle NUMERIC(7,2) NOT NULL,
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
    imp_total NUMERIC(7,2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (cbte_tipo) REFERENCES cbte_tipo(id)
);

CREATE TABLE usuario (
    id INT(2) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL
);