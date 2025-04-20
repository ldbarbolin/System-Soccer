const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Equipo{
    constructor(){
        this.config = configuracion;
    }
    async traerEquipo(){
        try{
            const connection = await mysql.createConnection(this.config);
            const[rows,fields] = await connection.execute("SELECT e.id AS id_equipo, i.nombre AS nombre_equipo, c.nombre AS categoria, e.genero FROM equipo e INNER JOIN institucion i ON e.id_Institucion = i.id INNER JOIN categoria c ON c.id = e.id_Categoria;");
            await connection.end();
            return rows;
        }catch (error){
            console.error("Error al traer los equipos",error);
            throw error;
        }
    }
    async traerEquipoGC(id_Categoria,genero){
        try{
            const connection = await mysql.createConnection(this.config);
            const[rows,fields] = await connection.execute("SELECT e.id AS idEquipo, i.nombre AS nombreEquipo FROM  equipo e JOIN institucion i ON e.id_Institucion = i.id WHERE e.id_Categoria = ? AND e.genero = '?';");
            await connection.end();
            return rows;
        }catch (error){
            console.error("Error al traer los equipos",error);
            throw error;
        }
    }

    async traerListaEquipos(){
        try{
            const connection = await mysql.createConnection(this.config);
            const[rows,fields] = await connection.execute("SELECT e.id AS id, i.nombre AS equipo, c.nombre AS categoria, e.genero AS genero, i.colores, i.fecha_fundacion AS fecha_fundacion, CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS presidente FROM  equipo e INNER JOIN institucion i ON e.id_Institucion = i.id INNER JOIN categoria c ON e.id_Categoria = c.id INNER JOIN presidente pr ON i.id = pr.id_Institucion INNER JOIN persona p ON pr.id = p.id;");
            await connection.end();
            return rows;
        }catch (error){
            console.error("Error al traer la lista de equipos",error);
            throw error;
        }
    }
    
    async registrarEquipo(
        id_Institucion,
        id_Categoria,
        genero,
        ){
        try{
            const connection = await mysql.createConnection(this.config);
            const query=`INSERT INTO equipo(id_Institucion, id_Categoria, genero)VALUES(?, ?, ?)`;
            await connection.query(query,[
                id_Institucion,
                id_Categoria,
                genero,
            ]);
            await connection.end();
            return true;
        }catch(error){
            console.error("Error al registrar jugador: ", error);
            throw error;
        }
    }

}

module.exports = Equipo;