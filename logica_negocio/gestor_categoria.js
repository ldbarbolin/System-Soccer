const Categoria = require("../acceso_datos/categoria");

class GestorCategoria{

    async traerCategoria(){
        const categoria = new Categoria();
        const datosCategoria = await categoria.traerCategoria();
        return datosCategoria;
    }
}


module.exports = GestorCategoria;