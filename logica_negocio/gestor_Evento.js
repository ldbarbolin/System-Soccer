const Evento = require("../acceso_datos/evento");

class GestorEvento{

    async traerEventos(){
        const evento = new Evento();
        const datosEvento = await evento.traerEventos();
        return datosEvento;
    }

    async equiposEvento(id_Evento){
        const evento = new Evento();
        const eEvento = await evento.equiposEvento(id_Evento);
        return eEvento;
    }

    async clasificaciones(id_Evento){
        const evento = new Evento();
        const tablaC = await evento.clasificaciones(id_Evento);
        return tablaC;
    }

    async registrarEvento(
        nombre,
        temporada,
        genero,
        n_Grupos,
        fecha_Inicio,
        fecha_Final,
        consolacion,
        id_tipoEvento,
        id_Categoria,
        id_Modalidad,
        id_tipoCompeticion,
        id_nVueltas,
    ){
        try{
            const evento = new Evento();
            const regEvento = await evento.registrarEvento(
                nombre,
                temporada,
                genero,
                n_Grupos,
                fecha_Inicio,
                fecha_Final,
                consolacion,
                id_tipoEvento,
                id_Categoria,
                id_Modalidad,
                id_tipoCompeticion,
                id_nVueltas,
            );
            return regEvento;
        }catch(error){
            console.error("Error al registrar nuevo Evento:",error);
            throw error;
        }
    }

    async equipoNuevo(
        id_Equipo,
        POS,
        PJ,
        PG,
        PE,
        PP,
        GF,
        GC,
        DG,
        PTS,
        id_Evento,
    ){
        try{
            const evento = new Evento();
            const nEquipo = await evento.equipoNuevo(
                id_Equipo,
                POS,
                PJ,
                PG,
                PE,
                PP,
                GF,
                GC,
                DG,
                PTS,
                id_Evento,
            );
            return nEquipo;
        }catch(error){
            console.error("Error al registrar nuevo equipo al evento:",error);
            throw error;
        }
    }

}

module.exports = GestorEvento;