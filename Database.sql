/* PERSONA*/
CREATE TABLE IF NOT EXISTS persona(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ci VARCHAR(50) NOT NULL UNIQUE,
	fecha_nacimiento DATE,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    genero CHAR(2) NOT NULL,
    correo VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

/*TipoUsuario*/
CREATE TABLE IF NOT EXISTS tipoUsuario(
    id INT PRIMARY KEY,
    tipo VARCHAR(10)
) ENGINE = InnoDB;

/* USUARIO*/
CREATE TABLE IF NOT EXISTS usuario(
    id INT PRIMARY KEY,
    id_tipo_usuario INT NOT NULL,
    nombreUsuario VARCHAR(15),
    contrasena VARCHAR(255),
    estadoU CHAR (3),
    FOREIGN KEY(id_tipo_usuario) REFERENCES tipoUsuario(id),
    FOREIGN KEY(id) REFERENCES persona(id)
) ENGINE = InnoDB;

/*Arbitro*/
CREATE TABLE IF NOT EXISTS arbitro(
    id INT PRIMARY KEY,
    FOREIGN KEY(id) REFERENCES persona(id)
) ENGINE = InnoDB; 


/*Categoria*/
CREATE TABLE IF NOT EXISTS categoria(
    id INT PRIMARY KEY,
	nombre VARCHAR(20),
	limite_edad VARCHAR (8)
) ENGINE = InnoDB; 

/*Institución*/
CREATE TABLE IF NOT EXISTS institucion(
    id INT PRIMARY KEY,
	nombre VARCHAR(45),
	direccion VARCHAR(30),
	escudo CHAR(35),
	colores VARCHAR(45) NOT NULL,
	fecha_fundacion DATE NOT NULL
) ENGINE = InnoDB;

/*Presidente*/
CREATE TABLE IF NOT EXISTS presidente(
    id INT PRIMARY KEY,
	id_Institucion INT NOT NULL,
    FOREIGN KEY(id) REFERENCES persona(id),
	FOREIGN KEY(id_Institucion) REFERENCES institucion(id)
) ENGINE = InnoDB; 

/*Equipo*/
CREATE TABLE IF NOT EXISTS equipo(
    id INT PRIMARY KEY,
	id_Categoria INT NOT NULL,
	genero CHAR(1),
	id_Institucion INT NOT NULL,
	FOREIGN KEY(id_Institucion) REFERENCES institucion(id),
    FOREIGN KEY(id_Categoria) REFERENCES categoria(id)
) ENGINE = InnoDB;

/*Jugador*/
CREATE TABLE IF NOT EXISTS jugador(
    id INT PRIMARY KEY,
	dorsal INT NOT NULL,
	posicion VARCHAR(15),
	estadoJ CHAR(3),
	goles INT NOT NULL,
	asistencias INT NOT NULL,
	autogoles INT NOT NULL,
	tarjetasAmarillas INT NOT NULL,
	tarjetasRojas INT NOT NULL,
	id_Equipo INT NOT NULL,
    FOREIGN KEY(id) REFERENCES persona(id),
	FOREIGN KEY(id_Equipo) REFERENCES equipo(id)
) ENGINE = InnoDB;

/*Transferencia*/
CREATE TABLE IF NOT EXISTS transferencia(
    id INT PRIMARY KEY,
	equipo_Origen VARCHAR(20),
	equipo_Destino VARCHAR(20),
	id_Presidente INT NOT NULL,
	id_Jugador INT NOT NULL,
    FOREIGN KEY(id_Presidente) REFERENCES presidente(id),
	FOREIGN KEY(id_Jugador) REFERENCES jugador(id)
) ENGINE = InnoDB;

/*Contrato*/
CREATE TABLE IF NOT EXISTS contrato(
    id INT PRIMARY KEY,
	fecha_Ingreso DATE,
	fecha_Salida DATE,
	id_Equipo INT NOT NULL,
	id_Jugador INT NOT NULL,
    FOREIGN KEY(id_Equipo) REFERENCES equipo(id),
	FOREIGN KEY(id_Jugador) REFERENCES jugador(id)
) ENGINE = InnoDB;

/*TipoEvento*/
CREATE TABLE IF NOT EXISTS tipoEvento(
    id INT PRIMARY KEY,
    tipo VARCHAR(15)
) ENGINE = InnoDB;

/*Modalidad*/
CREATE TABLE IF NOT EXISTS modalidad(
    id INT PRIMARY KEY,
    tipo VARCHAR(15)
) ENGINE = InnoDB;

/*TipoCompeticion*/
CREATE TABLE IF NOT EXISTS tipoCompeticion(
    id INT PRIMARY KEY,
    tipo VARCHAR(15)
) ENGINE = InnoDB;

/*nVueltas*/
CREATE TABLE IF NOT EXISTS nVueltas(
    id INT PRIMARY KEY,
    tipo VARCHAR(15)
) ENGINE = InnoDB;

/*Evento*/
CREATE TABLE IF NOT EXISTS evento(
    id INT PRIMARY KEY,
	nombre VARCHAR(45),
	temporada VARCHAR(15),
	genero CHAR(2) NOT NULL,
	n_Grupos VARCHAR(10),
	fecha_Inicio DATE,
	fecha_Final DATE,
	consolacion VARCHAR(20),
	id_tipoEvento INT NOT NULL,
	id_Categoria INT NOT NULL,
	id_Modalidad INT NOT NULL,
	id_tipoCompeticion INT NOT NULL,
	id_nVueltas INT NOT NULL,
    FOREIGN KEY(id_tipoEvento) REFERENCES tipoEvento(id),
	FOREIGN KEY(id_Categoria) REFERENCES categoria(id),
	FOREIGN KEY(id_Modalidad) REFERENCES modalidad(id),
	FOREIGN KEY(id_tipoCompeticion) REFERENCES tipoCompeticion(id),
	FOREIGN KEY(id_nVueltas) REFERENCES nVueltas(id)
) ENGINE = InnoDB; 

/*Municipio*/
CREATE TABLE IF NOT EXISTS municipio(
    id INT PRIMARY KEY,
    nombre VARCHAR(25),
	distrito VARCHAR(15)
) ENGINE = InnoDB;

/*Cancha*/
CREATE TABLE IF NOT EXISTS cancha(
    id INT PRIMARY KEY,
    nombre VARCHAR(30),
	id_Municipio INT NOT NULL,
    FOREIGN KEY(id_Municipio) REFERENCES municipio(id)
) ENGINE = InnoDB;

/*estadoP*/
CREATE TABLE IF NOT EXISTS estadoP(
    id INT PRIMARY KEY,
    tipo VARCHAR(15)
) ENGINE = InnoDB;

/*Fixture*/
CREATE TABLE IF NOT EXISTS fixture(
    id INT PRIMARY KEY,
	jornadas INT NOT NULL,
	FOREIGN KEY(id) REFERENCES evento(id)
) ENGINE = InnoDB;

/*Partido*/
CREATE TABLE IF NOT EXISTS partido(
    id INT PRIMARY KEY,
    equipo_Local VARCHAR(20),
	gol_Local INT NOT NULL,
	gol_Visitante INT NOT NULL,
	equipo_Visitante VARCHAR(20),
	jornada INT NOT NULL,
	fechaHora DATETIME NOT NULL,
	grupoRonda CHAR(1),
	id_estadoP INT NOT NULL,
	id_Cancha INT NOT NULL,
	id_Arbitro INT NOT NULL,
	id_Fixture INT NOT NULL,
    FOREIGN KEY(id_estadoP) REFERENCES estadoP(id),
	FOREIGN KEY(id_Cancha) REFERENCES cancha(id),
	FOREIGN KEY(id_Arbitro) REFERENCES arbitro(id),
	FOREIGN KEY(id_Fixture) REFERENCES fixture(id)
) ENGINE = InnoDB;

/*TipoSuceso*/
CREATE TABLE IF NOT EXISTS tipoSuceso(
    id INT PRIMARY KEY,
    tipo VARCHAR(15)
) ENGINE = InnoDB;

/*SucesoPartido*/
CREATE TABLE IF NOT EXISTS detallePartido(
    id INT PRIMARY KEY,
	minuto INT NOT NULL,
	id_tipoSuceso INT NOT NULL,
	id_Jugador INT NOT NULL,
	id_Partido INT NOT NULL,
	id_Equipo INT NOT NULL,
	FOREIGN KEY(id_tipoSuceso) REFERENCES tipoSuceso(id),
    FOREIGN KEY(id_Jugador) REFERENCES jugador(id),
	FOREIGN KEY(id_Equipo) REFERENCES equipo(id),
	FOREIGN KEY(id_Partido) REFERENCES partido(id)
) ENGINE = InnoDB;

/*TablaPosiciones*/
CREATE TABLE IF NOT EXISTS TablaPosiciones(
    id INT PRIMARY KEY,
	id_Equipo INT NOT NULL,
	POS INT NOT NULL,
	PJ INT NOT NULL,
	PG INT NOT NULL,
	PE INT NOT NULL,
	PP INT NOT NULL,
	GF INT NOT NULL,
	PC INT NOT NULL,
	DG INT NOT NULL,
	PTS INT NOT NULL,
	id_Evento INT NOT NULL,
	FOREIGN KEY(id_Equipo) REFERENCES equipo(id),
	FOREIGN KEY(id_Evento) REFERENCES evento(id)
) ENGINE = InnoDB;



/* Ejemplo de datos para la Champions League 2024-2025 */
/*Personas Jugadores*/
INSERT INTO persona (nombre, ci, fecha_nacimiento, apellido_paterno, apellido_materno, telefono, genero, correo)
VALUES
('Francisco', '12345696S', '2006-02-14', 'Peña', 'Luna', '789321654', 'M', 'francisco.pena@mail.com'),
('Samuel', '12345697T', '2006-06-27', 'Blanco', 'Chávez', '123789456', 'M', 'samuel.blanco@mail.com'),
('Raúl', '12345698U', '2006-04-10', 'Vega', 'Figueroa', '321987654', 'M', 'raul.vega@mail.com'),
('Fernando', '12345699V', '2006-12-20', 'Herrera', 'Arroyo', '852147963', 'M', 'fernando.herrera@mail.com'),
('John', '111111', '1980-05-20', 'Doe', 'Smith', '123456789', 'M', 'john.doe@example.com'),
('Jane', '222222', '1985-07-15', 'Doe', 'Brown', '987654321', 'F', 'jane.doe@example.com'),
('Mark', '333333', '1990-01-10', 'Taylor', 'Johnson', '123123123', 'M', 'mark.taylor@example.com'),
('David', '9780946', '1985-07-15', 'Barbolin', 'Mendoza', '65935588', 'M', 'david.bar@example.com');

/* Tipo de Usuario */
INSERT INTO tipoUsuario (id, tipo) VALUES
(1, 'AD'),
(2, 'AR');

/* Usuarios */
INSERT INTO usuario (id, id_tipo_usuario, nombreUsuario, contrasena, estadoU) VALUES
(8, 1, 'David_Barbolin', 'password', 'ACT'),
(6, 2, 'Jane_Doe', 'password', 'ACT');

/* Árbitros */
INSERT INTO arbitro (id) VALUES
(6);

/* Categorías */
INSERT INTO categoria (id, nombre, limite_edad) VALUES
(1, 'Prebenjamines', '5 a 7'),
(2, 'Benjamines', '8 a 9'),
(3, 'Alevines', '10 a 11'),
(4, 'Infantiles', '12 a 13'),
(5, 'Cadetes', '14 a 15'),
(6, 'Juveniles', '16 a 18');

/* Instituciones */
INSERT INTO institucion (id, nombre, direccion, escudo, colores, fecha_fundacion) VALUES
(1, 'Real Madrid', 'Madrid, España', 'escudo1.png', 'Blanco', '1902-03-06'),
(2, 'Manchester City', 'Manchester, Inglaterra', 'escudo2.png', 'Celeste', '1880-11-13'),
(3, 'FC Barcelona', 'Barcelona, España', 'escudo3.png', 'Azul y grana', '1899-11-29'),
(4, 'Bayern Munich', 'Múnich, Alemania', 'escudo4.png', 'Rojo y blanco', '1900-02-27');

/* Presidentes */
INSERT INTO presidente (id, id_Institucion) VALUES
(3, 1),
(4, 2);
(5, 3),
(7, 4);

/* Equipos */
INSERT INTO equipo (id_Categoria, genero, id_Institucion) VALUES
(1, "M", 1), 
(2, "M", 2), 
(3, "M", 3), 
(4, "M", 4); 

/* Jugadores */
INSERT INTO jugador (id, dorsal, posicion, estadoJ, goles, asistencias, autogoles, tarjetasAmarillas, tarjetasRojas, id_Equipo)
VALUES
(1, 9, 'Delantero', 'ACT', 0, 0, 0, 0, 0, 1),
(2, 9, 'Delantero', 'ACT', 0, 0, 0, 0, 0, 2);


/*TipoEvento*/
INSERT INTO tipoEvento(id, tipo)VALUES
(1, 'Liga'),
(2, 'Campeonato');

/*Modalidad*/
INSERT INTO modalidad(id, tipo)VALUES
(1, 'Futbol 5'),
(2, 'Futbol 6'),
(3, 'Futbol 7'),
(4, 'Futbol 8'),
(5, 'Futbol 9'),
(6, 'Futbol 10'),
(7, 'Futbol 11'),
(8, 'Futbol Sala'),
(9, 'Futbol Playa');

/*TipoCompeticion*/
INSERT INTO tipoCompeticion(id, tipo)VALUES
(1,'Liga'),
(2,'Liga y playoffs'),
(3,'Grupos y eliminatorias'),
(4,'Eliminatorias'),
(5,'Circuito');

/*nVueltas*/
INSERT INTO nVueltas(id, tipo)VALUES
(1,'Solo ida'),
(2,'ida y Vuelta'),
(3,'3 Vueltas');


/*Municipio*/
INSERT INTO municipio(id, nombre, distrito)VALUES
(1,'Santa Cruz',1),
(2,'La guardia',2),
(3,'Cotoca',3),
(4,'Warnes',2),
(5,'Porongo',1);

/*Cancha*/
INSERT INTO cancha(id, nombre, id_Municipio) VALUES
(1,'Tahuichi',1),
(2,'Municipal la guardia',2),
(3,'Cancha Cotoca',3),
(4,'Municipal Warnes',4),
(5,'Municipal Porongo',5);

/*estadoP*/
INSERT INTO estadoP(id, tipo)VALUES
(1,'Por disputarse'),
(2,'En curso'),
(3,'Finalizado'),
(4,'Suspendido'),
(5,'Retrasado');
/*tablaPosicones*/
INSERT INTO `tablaposiciones` (`id`, `id_Equipo`, `POS`, `PJ`, `PG`, `PE`, `PP`, `GF`, `PC`, `DG`, `PTS`, `id_Evento`) VALUES 
('1', '3', '1', '0', '0', '0', '0', '0', '0', '0', '0', '1'), 
('2', '2', '2', '0', '0', '0', '0', '0', '0', '0', '0', '1');




/*Consultas*/
select tp.id_Equipo AS id_Equipo, i.nombre AS equipo, e.genero, i.colores, i.direccion from tablaposiciones tp JOIN institucion i ON i.id = tp.id_Equipo JOIN equipo e ON e.id_Institucion = i.id WHERE tp.id_Evento = 1