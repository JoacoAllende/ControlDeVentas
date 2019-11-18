INSERT INTO alicuota (id, valor) VALUES
(3, 0),
(4, 10.5),
(5, 21),
(6, 27),
(8, 5),
(9, 2.5);

INSERT INTO producto (codigo, descripcion, precio, id_alicuota) VALUES 
(7918660013621,'Mayonesa Natura 125 gr.', 32, 5),
(7913310013642,'Mayonesa Natura 2900 gr.', 229.9, 5),
(5591866001363,'Mayonesa Natura 7 gr.', 3.45, 5),
(7791866001344,'Mayonesa Natura 250 gr.', 55, 5),
(7791866001555,'Mayonesa Natura 1000 gr.', 172.23, 5),
(7241866003646,'Mayonesa Hellmans 118 gr.', 37, 5),
(7241866431247,'Mayonesa Hellmans 237 gr.', 59.28, 5),
(7241145013648,'Mayonesa Hellmans 950 gr.', 181.23, 5),
(7141860013649,'Mayonesa Hellmans 350 gr.', 98, 5),
(5651860013640,'Mayonesa Hellmans 8 gr.', 2.98, 5),
(7111660013641,'Mayonesa Fanacoa 2755 gr.', 291, 5),
(8848660013642,'Mayonesa Fanacoa 237 gr.', 43.25, 5),
(7112220013643,'Mayonesa Fanacoa 475 gr.', 70.27, 5),
(1412220013644,'Mostaza Natura 250 gr.', 52.33, 5),
(7146612001365,'Mostaza Natura 3000 gr.', 280.27, 5),
(7333222001346,'Mostaza Natura 1000 gr.', 89.11, 5),
(7333222787647,'Mostaza Dijon 850 gr.', 325.11, 5),
(7333222443648,'Mostaza Dijon 215 gr.', 114.8, 5),
(7333222443989,'Mostaza Heinz 566 gr.', 314.99, 5),
(7333222443830,'Mostaza Heinz 396 gr.', 219.99, 5),
(7333224443311,'Mostaza Heinz 200 gr.', 75.8, 5);

INSERT INTO cbte_tipo (id, descripcion) VALUES (6, 'Factura B');
INSERT INTO cbte_tipo (id, descripcion) VALUES (11, 'Factura C');

INSERT INTO doc_tipo (id, descripcion) VALUES (80, 'CUIT');
INSERT INTO doc_tipo (id, descripcion) VALUES (86, 'CUIL');
INSERT INTO doc_tipo (id, descripcion) VALUES (96, 'DNI');
INSERT INTO doc_tipo (id, descripcion) VALUES (99, 'Doc. (Otro)');

INSERT INTO cliente (nombre, doc_tipo, doc_nro) VALUES ('Consumidor final', 99, 0);
INSERT INTO cliente (nombre, doc_tipo, doc_nro) VALUES ('Fernando Allende', 80, 20161379671);
INSERT INTO cliente (nombre, doc_tipo, doc_nro) VALUES ('Claudia Gentil', 96, 17404217);