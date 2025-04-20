const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Evento{
    constructor(){
        this.config = configuracion;
    }
    async traerEventos(){
        try{
            const connection = await mysql.createConnection(this.config);
            const[rows,fields] = await connection.execute("select e.id, e.nombre, d.tipo AS deporte, e.genero, e.n_Grupos, e.fecha_Inicio, e.fecha_Final, c.nombre AS categoria FROM evento e JOIN modalidad d ON d.id = e.id_Modalidad JOIN categoria c ON c.id = e.id_Categoria;");
            await connection.end();
            return rows;
        }catch(error){
            console.error("Error al traer los eventos",error);
            throw error;
        }
    }
        async equiposEvento(id_Evento){
            try{
                const connection = await mysql.createConnection(this.config);
                const[rows, fields] = await connection.execute("SELECT tp.id_Equipo AS idEquipo, i.nombre AS equipo, c.nombre AS categoria, e.genero AS genero, i.colores AS colores, i.direccion AS direccion FROM tablaposiciones tp JOIN equipo e ON e.id = tp.id_Equipo  JOIN institucion i ON i.id = e.id_Institucion JOIN categoria c ON c.id = e.id_Categoria WHERE tp.id_Evento = ?",[id_Evento]);
                await connection.end();
                return rows;
            }catch(error){
                console.error("Error al traer los equipos del evento",error);
                throw error;
            }
        }
        async clasificaciones(id_Evento){
            try{
                const connection = await mysql.createConnection(this.config);
                const[rows, fields] = await connection.execute("select i.nombre AS equipo, tp.POS, tp.PJ, tp.PG, tp.PE, tp.PP, tp.GF, tp.GC, tp.DG, tp.PTS FROM tablaposiciones tp JOIN equipo e ON e.id = tp.id_Equipo JOIN institucion i ON i.id = e.id_Institucion WHERE tp.id_Evento = ?",[id_Evento]);
                await connection.end();
                return rows;
            }catch(error){
                console.error("Error al traer la tabla de posiciones",error);
                throw error;
            }
        }        
    async registrarEvento(
        nombre,
        temporada,
        genero,
        n_Grupos,
        fecha_Inicio,
        fecha_Final,
        consolacion,
        id_tipoEvento,
        id_Categoria,
        id_Modalidad,
        id_tipoCompeticion,
        id_nVueltas,
    ){
        try{
            const connection = await mysql.createConnection(this.config);
            const query = `INSERT INTO evento (nombre,temporada,genero,n_Grupos,fecha_Inicio,fecha_Final,consolacion,id_tipoEvento, id_Categoria, id_Modalidad, id_tipoCompeticion, id_nVueltas)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
            await connection.query(query,[
                nombre,
                temporada,
                genero,
                n_Grupos,
                fecha_Inicio,
                fecha_Final,
                consolacion,
                id_tipoEvento,
                id_Categoria,
                id_Modalidad,
                id_tipoCompeticion,
                id_nVueltas,
            ]);
            await connection.end();
            return true;
        }catch(error){
            console.error("Error al registrar evento: ", error);
            throw error;
        }
    }

    async equipoNuevo(
        id_Equipo,
        POS,
        PJ,
        PG,
        PE,
        PP,
        GF,
        GC,
        DG,
        PTS,
        id_Evento,  
    ){
        try{
            const connection = await mysql.createConnection(this.config);
            const query = "INSERT INTO tablaposiciones(id_Equipo,POS,PJ,PG,PE,PP,GF,GC,DG,PTS,id_Evento)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            await connection.query(query,[
                id_Equipo,
                POS,
                PJ,
                PG,
                PE,
                PP,
                GF,
                GC,
                DG,
                PTS,
                id_Evento,
            ]);
            await connection.end();
            return true;
        }catch(error){
            console.error("Error al registrar nuevo equipo al evento: ", error);
            throw error;
        }
    }
}
module.exports = Evento;