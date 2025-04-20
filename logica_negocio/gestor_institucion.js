const Institucion = require("../acceso_datos/institucion");

class GestorInstitucion{

    async traerInstitucion(){
        const institucion = new Institucion();
        const nombreInstitucion = await institucion.traerInstitucion();
        return nombreInstitucion;
    }

    async ListaInstitucion(){
        const institucion = new Institucion();
        const listaI = await institucion.ListaInstitucion();
        return listaI;
    }
}


module.exports = GestorInstitucion;