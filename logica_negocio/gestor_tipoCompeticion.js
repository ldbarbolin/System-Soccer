const TipoCompeticion = require("../acceso_datos/tipoCompeticion");

class GestorTipoCompeticion{

    async traerTipoCompeticion(){
        const tipoCompeticion = new TipoCompeticion();
        const tCompeticion= await tipoCompeticion.traerTipoCompeticion();
        return tCompeticion;
    }
}


module.exports = GestorTipoCompeticion;