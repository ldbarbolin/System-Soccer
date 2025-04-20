const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Jugador{
    constructor(){
        this.config = configuracion;
    }
        async traerJugador(){
            try{
                const connection = await mysql.createConnection(this.config);
                const[rows,fields] = await connection.execute("SELECT p.nombre AS jugador, j.estadoJ, j.dorsal,e.nombre AS equipo, j.goles, j.asistencias, j.autogoles, j.tarjetasAmarillas AS tarjetas_amarillas, j.tarjetasRojas AS tarjetas_rojas FROM jugador j INNER JOIN  persona p ON j.id = p.id INNER JOIN institucion e ON j.id_Equipo = e.id ORDER BY p.id ASC;");
                await connection.end();
                return rows;
            }catch(error){
                console.error("Error al traer los jugadores",error);
                throw error;
            }
        }
        async registrarJugador(
            id_persona,
            dorsal,
            posicion,
            estadoJ,
            goles,
            asistencias,
            autogoles,
            tarjetas_amarillas,
            tarjetas_rojas,
            equipo
        ){
            try{
                const connection = await mysql.createConnection(this.config);
                const query=`INSERT INTO jugador (id, dorsal, posicion, estadoJ, goles, asistencias, autogoles, tarjetasAmarillas, tarjetasRojas, id_Equipo)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                await connection.query(query,[
                    id_persona,
                    dorsal,
                    posicion,
                    estadoJ,
                    goles,
                    asistencias,
                    autogoles,
                    tarjetas_amarillas,
                    tarjetas_rojas,
                    equipo
                ]);
                await connection.end();
                return true;
            }catch(error){
                console.error("Error al registrar jugador: ", error);
            throw error;
            }

        }
    }
module.exports = Jugador;