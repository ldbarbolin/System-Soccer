const Persona = require("../acceso_datos/persona");

class GestorPersona{
    async registrarPersona(
        nombre,
        ci,
        fecha_nacimiento,
        apellido_paterno,
        apellido_materno,
        telefono,
        genero,
        correo,
    ){
        try{
            const persona = new Persona();
            const datosPersona = await persona.registrarPersona(
                nombre,
                ci,
                fecha_nacimiento,
                apellido_paterno,
                apellido_materno,
                telefono,
                genero,
                correo,
            );
            return datosPersona;
        }catch (error){
            console.error("Error al registrar Persona:",error);
            throw error;
        }
    }
}

module.exports = GestorPersona;