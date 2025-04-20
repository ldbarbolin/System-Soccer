const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Institucion{
    constructor(){
    this.config = configuracion;
    }
    async traerInstitucion(){
        try{
            const connection = await mysql.createConnection(this.config);
            const[rows,fields] = await connection.execute("select id, nombre from institucion;");
            await connection.end();
            return rows;
        }catch (error){
            console.error("Error al traer las Instituciones",error);
            throw error;
        }
    }
    async ListaInstitucion(){
        try{
            const connection = await mysql.createConnection(this.config);
            const[rows,fields] = await connection.execute("select i.id, i.nombre, i.direccion, i.colores, i.fecha_fundacion, CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS presidente from institucion i JOIN presidente pr ON pr.id_Institucion = i.id JOIN persona p ON p.id = pr.id;");
            await connection.end();
            return rows;
        }catch (error){
            console.error("Error al traer la lista de Instituciones",error);
            throw error;
        }
    }
}

module.exports = Institucion;