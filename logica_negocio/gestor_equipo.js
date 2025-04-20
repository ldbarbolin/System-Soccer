const Equipo = require("../acceso_datos/equipo");

class GestorEquipo{

    async traerEquipo(){
        const equipo = new Equipo();
        const datosEquipo = await equipo.traerEquipo();
        return datosEquipo;
    }

    async traerEquipoGC(id_Categoria,genero){
        const equipo = new Equipo();
        const equipoGC = await equipo.traerEquipoGC();
        return equipoGC;
    }

    async traerListaEquipos(){
        const equipo = new Equipo();
        const listaEquipos = await equipo.traerListaEquipos();
        return listaEquipos;
    }

    async registrarEquipo(
        id_Institucion,
        id_Categoria,
        genero,
    ){
        try{
            const equipo = new Equipo();
            const datoE = await equipo.registrarEquipo(
                id_Institucion,
                id_Categoria,
                genero,
            );
            return datoE;
        }catch(error){
            console.error("Error al registrar Equipo:",error);
            throw error;
        }
    }
}


module.exports = GestorEquipo;