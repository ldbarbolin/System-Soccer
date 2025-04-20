const Jugador = require("../acceso_datos/jugador");

class GestorJugador{

    async traerJugador(){
        const jugador = new Jugador();
        const datosJugador = await jugador.traerJugador();
        return datosJugador;
    }

    async registrarJugador(
        id_persona,
        dorsal,
        posicion,
        estadoJ,
        goles,
        asistencias,
        autogoles,
        tarjetas_amarillas,
        tarjetas_rojas,
        equipo,
    ){
        try{
            const jugador = new Jugador();
            const datoJ = await jugador.registrarJugador(
                id_persona,
                dorsal,
                posicion,
                estadoJ,
                goles,
                asistencias,
                autogoles,
                tarjetas_amarillas,
                tarjetas_rojas,
                equipo,
            );
            return datoJ;
        }catch(error){
            console.error("Error al registrar Jugador:",error);
            throw error;
        }
    }
}


module.exports = GestorJugador;