const Modalidad = require("../acceso_datos/modalidad");

class GestorModalidad{

    async traerModalidad(){
        const modalidad = new Modalidad();
        const dModalidad = await modalidad.traerModalidad();
        return dModalidad;
    }
}


module.exports = GestorModalidad;