const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Modalidad{
    constructor(){
    this.config = configuracion;
    }
    async traerModalidad(){
            try{
                const connection = await mysql.createConnection(this.config);
                const[rows,fields] = await connection.execute("SELECT * FROM modalidad;");
                await connection.end();
                return rows;
            }catch (error){
                console.error("Error al traer las modalidades",error);
                throw error;
            }
        }
}

module.exports = Modalidad;