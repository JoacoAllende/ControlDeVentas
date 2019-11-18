INSERT INTO alicuota (id, valor) VALUES
(3, 0),
(4, 10.5),
(5, 21),
(6, 27),
(8, 5),
(9, 2.5);

INSERT INTO producto (codigo, descripcion, precio) VALUES 
('791866001362','Mayonesa Natura 125 gr.', 32, 21),
('791331001364','Mayonesa Natura 2900 gr.', 229.9, 21),
('559186600136','Mayonesa Natura 7 gr.', 3.45, 21),
('779186600134','Mayonesa Natura 250 gr.', 55, 21),
('779186600155','Mayonesa Natura 1000 gr.', 172.23, 21),
('724186600364','Mayonesa Hellmans 118 gr.', 37, 21),
('724186643124','Mayonesa Hellmans 237 gr.', 59.28, 21),
('724114501364','Mayonesa Hellmans 950 gr.', 181.23, 21),
('714186001364','Mayonesa Hellmans 350 gr.', 98, 21),
('565186001364','Mayonesa Hellmans 8 gr.', 2.98, 21),
('711166001364','Mayonesa Fanacoa 2755 gr.', 291, 21),
('884866001364','Mayonesa Fanacoa 237 gr.', 43.25, 21),
('711222001364','Mayonesa Fanacoa 475 gr.', 70.27, 21),
('141222001364','Mostaza Natura 250 gr.', 52.33, 21),
('714661200136','Mostaza Natura 3000 gr.', 280.27, 21),
('733322200134','Mostaza Natura 1000 gr.', 89.11, 21),
('733322278764','Mostaza Dijon 850 gr.', 325.11, 21),
('733322244364','Mostaza Dijon 215 gr.', 114.8, 21),
('733322244398','Mostaza Heinz 566 gr.', 314.99, 21),
('733322244383','Mostaza Heinz 396 gr.', 219.99, 21),
('733322444331','Mostaza Heinz 200 gr.', 75.8, 21);

INSERT INTO cbte_tipo (id, descripcion) VALUES (6, 'Factura B');
INSERT INTO cbte_tipo (id, descripcion) VALUES (11, 'Factura C');

INSERT INTO doc_tipo (id, descripcion) VALUES (80, 'CUIT');
INSERT INTO doc_tipo (id, descripcion) VALUES (86, 'CUIL');
INSERT INTO doc_tipo (id, descripcion) VALUES (96, 'DNI');
INSERT INTO doc_tipo (id, descripcion) VALUES (99, 'Doc. (Otro)');

INSERT INTO cliente (nombre, doc_tipo, doc_nro) VALUES ('Consumidor final', 99, 0);
INSERT INTO cliente (nombre, doc_tipo, doc_nro) VALUES ('Fernando Allende', 80, 20161379671);