const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Persona {
    constructor() { // Nota: "cosntructor" estaba mal escrito.
        this.config = configuracion;
    }

    async registrarPersona(
        nombre,
        ci,
        fecha_nacimiento,
        apellido_paterno,
        apellido_materno,
        telefono,
        genero,
        correo
    ) {
        try {
            const connection = await mysql.createConnection(this.config);
            const query = `
                INSERT INTO persona 
                (nombre, ci, fecha_nacimiento, apellido_paterno, apellido_materno, telefono, genero, correo) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            // Aquí pasamos los valores como un array para los placeholders "?".
            const [result] = await connection.query(query,[
                nombre,
                ci,
                fecha_nacimiento,
                apellido_paterno,
                apellido_materno,
                telefono,
                genero,
                correo
            ]);
            await connection.end();
            return result.insertId;
        } catch (error) {
            console.error("Error al registrar persona: ", error);
            throw error;
        }
    }
}

module.exports = Persona;
