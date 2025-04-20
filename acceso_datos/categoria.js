const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Categoria{
    constructor(){
    this.config = configuracion;
    }
    async traerCategoria(){
            try{
                const connection = await mysql.createConnection(this.config);
                const[rows,fields] = await connection.execute("SELECT * FROM categoria;");
                await connection.end();
                return rows;
            }catch (error){
                console.error("Error al traer las categorias",error);
                throw error;
            }
        }
}

module.exports = Categoria