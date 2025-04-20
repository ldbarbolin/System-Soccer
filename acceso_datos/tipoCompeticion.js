const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class TipoCompeticion{
    constructor(){
    this.config = configuracion;
    }
    async traerTipoCompeticion(){
            try{
                const connection = await mysql.createConnection(this.config);
                const[rows,fields] = await connection.execute("SELECT * FROM tipoCompeticion;");
                await connection.end();
                return rows;
            }catch (error){
                console.error("Error al traer las categorias",error);
                throw error;
            }
        }
}

module.exports = TipoCompeticion;