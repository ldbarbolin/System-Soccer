const express = require('express');
const router = express.Router();
const GestorEquipo = require("../../logica_negocio/gestor_equipo");
const GestorPersona = require("../../logica_negocio/gestor_persona")
const GestorJugador = require("../../logica_negocio/gestor_jugador");
const GestorCategoria = require('../../logica_negocio/gestor_categoria');
const GestorInstitucion = require("../../logica_negocio/gestor_institucion")
const  GestorTipoCompeticion = require("../../logica_negocio/gestor_tipoCompeticion")
const GestorModalidad = require("../../logica_negocio/gestor_modalidad")
const GestorEvento = require("../../logica_negocio/gestor_Evento")

router.get("/",async (req, res) => {

    //console.log("Cookies recibidas:", req.cookies);

    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_Evento = new GestorEvento();
    const datosEvento = await gestor_Evento.traerEventos();

    res.render("vista_Admin/secciones_Admin/inicio_Admin.ejs",{
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        datosEvento: datosEvento,
    });
});

router.get("/Inicio", async (req, res) =>{
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_Evento = new GestorEvento();
    const datosEvento = await gestor_Evento.traerEventos();

    res.render("vista_Admin/secciones_Admin/inicio_Admin", {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        datosEvento: datosEvento,
    });
})

router.get("/Institucion", async (req, res) =>{
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_institucion = new GestorInstitucion();
    const listaI = await gestor_institucion.ListaInstitucion();

    res.render("vista_Admin/secciones_Admin/insti_Admin", {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        listaI: listaI,
    });
})

router.get("/Equipo", async (req, res) =>{
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_equipo = new GestorEquipo();
    const listaEquipos = await gestor_equipo.traerListaEquipos();

    //console.log("lista de equipos:", listaEquipos);

    res.render("vista_Admin/secciones_Admin/equipo_Admin", {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        listaEquipos: listaEquipos,
    });
})

router.get("/Jugador", async (req, res) =>{
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_jugador = new GestorJugador();
    const datosJugador = await gestor_jugador.traerJugador();

    res.render("vista_Admin/secciones_Admin/jugador_Admin", {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        datosJugador: datosJugador,
    });
})

router.get("/Arbitro", async (req, res) =>{
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    res.render("vista_Admin/secciones_Admin/arbitro_Admin", {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
    });
})

router.get("/crear_Evento", async (req, res) =>{
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_tipoCompeticion = new GestorTipoCompeticion();
    const tCompeticion = await gestor_tipoCompeticion.traerTipoCompeticion();

    const gestor_modalidad = new GestorModalidad();
    const dModalidad = await gestor_modalidad.traerModalidad();

    const gestor_categoria = new GestorCategoria();
    const datosCategoria = await gestor_categoria.traerCategoria();

    res.render("vista_Admin/secciones_Admin/crear_Evento", {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        tCompeticion: tCompeticion,
        dModalidad: dModalidad,
        datosCategoria: datosCategoria,
    });
})

router.get("/crear_Equipo", async (req, res) =>{
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_categoria = new GestorCategoria();
    const datosCategoria = await gestor_categoria.traerCategoria();

    const gestor_institucion = new GestorInstitucion();
    const nombreInstitucion = await gestor_institucion.traerInstitucion();

    res.render("vista_Admin/secciones_Admin/crear_Equipo", {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        datosCategoria: datosCategoria,
        nombreInstitucion: nombreInstitucion,
    });
})

router.get("/crear_Jugador", async (req, res) =>{
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_equipo = new GestorEquipo();
    const datosEquipo = await gestor_equipo.traerEquipo();

    //console.log("datos de equipo:", datosEquipo);

    res.render("vista_Admin/secciones_Admin/crear_Jugador", {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        datosEquipo: datosEquipo,
    });
})

router.get("/teams/:id", async (req, res) =>{
    const id_Evento = req.params.id;
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_Evento = new GestorEvento();
    const eEvento = await gestor_Evento.equiposEvento(id_Evento);
    res.render("vista_Admin/secciones_Admin/detallesEvento", {
        id_Evento: id_Evento,
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        eEvento: eEvento,
    });
})

router.get("/clasificaciones/:id", async (req, res) =>{
    const id_Evento = req.params.id;
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_Evento = new GestorEvento();
    const tablaC = await gestor_Evento.clasificaciones(id_Evento);

    res.render("vista_Admin/secciones_Admin/clasificaciones", {
        id_Evento: id_Evento,
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        tablaC: tablaC,
    });
})

router.get("/equipoEvento/:id", async (req, res) =>{
    const id_Evento = req.params.id;
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_equipo = new GestorEquipo();
    const datosEquipo = await gestor_equipo.traerEquipo();

    res.render("vista_Admin/secciones_Admin/equipoEvento", {
        id_Evento: id_Evento,
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
        datosEquipo: datosEquipo,
    });
})

router.post("/crear_Jugador",async(req,res)=>{
    const nombre = req.body.nombre;
    const ci = req.body.ci;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const telefono = req.body.telefono;
    const genero = req.body.genero;
    const correo = req.body.correo;

    //datos para Jugador

    const dorsal = req.body.dorsal;
    const posicion = req.body.posicion;
    const estadoJ = "ACT"
    const goles = 0;
    const asistencias = 0;
    const autogoles = 0;
    const tarjetas_amarillas = 0;
    const tarjetas_rojas = 0;
    const equipo = req.body.equipo;

    const gestor_persona = new GestorPersona();
    const id_persona = await gestor_persona.registrarPersona(
        nombre,
        ci,
        fecha_nacimiento,
        apellido_paterno,
        apellido_materno,
        telefono,
        genero,
        correo,
    );
    const gestor_jugador = new GestorJugador();
    const datoJ = await gestor_jugador.registrarJugador(
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
    if(datoJ){
        console.log("Jugador registrador exitosamente")
        res.redirect("/administrador/Jugador");
    }else{
        let msj = "Ocurrio un error al registrar al jugador";
        res.send(JSON.stringify(msj));
    }
});

router.post("/crear_Equipo", async(req,res)=>{
    const institucion = req.body.institucion;
    const categoria = req.body.categoria;
    const genero = req.body.genero;

    const gestor_equipo = new GestorEquipo();
    const datoE = await gestor_equipo.registrarEquipo(
        institucion,
        categoria,
        genero,
    );
    console.log("datos de equipo", datoE);

    if(datoE){
        console.log("Equipo registrador exitosamente")
        res.redirect("/administrador/Equipo");
    }else{
        let msj = "Ocurrio un error al registrar el equipo";
        res.send(JSON.stringify(msj));
    }
});

router.post("/crear_Evento", async(req,res)=>{
    const nombre = req.body.nombre;
    const temporada = req.body.temporada;
    const genero = req.body.genero;
    const nGrupos = req.body.nGrupos;
    const fechaInicio = req.body.fechaInicio;
    const fechaFinal = req.body.fechaFinal;
    const consolacion = req.body.consolacion;
    const tipoEvento = req.body.tipoEvento;
    const categoria = req.body.categoria;
    const modalidad = req.body.modalidad;
    const tipoCompeticion = req.body.tipoCompeticion;
    const nVueltas = req.body.nVueltas;



    const gestor_Evento = new GestorEvento();
    const regEvento = await gestor_Evento.registrarEvento(
        nombre,
        temporada,
        genero,
        nGrupos,
        fechaInicio,
        fechaFinal,
        consolacion,
        tipoEvento,
        categoria,
        modalidad,
        tipoCompeticion,
        nVueltas,
    );
    console.log("datos del nuevo evento", regEvento);

    if(regEvento){
        console.log("Evento registrado Exitosamente")
        res.redirect("/administrador/Inicio");
    }else{
        let msj = "Ocurrio un error al registrar el equipo";
        res.send(JSON.stringify(msj));
    }
});

router.post("/nequipoEvento", async(req,res)=>{
    const id_Evento = req.body.idEvento;
    const institucion = req.body.institucion;
    const POS = 0;
    const PJ = 0;
    const PG = 0;
    const PE = 0;
    const PP = 0;
    const GF = 0;
    const GC = 0;
    const DG = 0;
    const PTS = 0;

    const gestor_Evento = new GestorEvento();
    const nEquipo = await gestor_Evento.equipoNuevo(
        institucion,
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
    console.log("datos de nuevo", nEquipo);

    if(nEquipo){
        console.log("Equipo registrador exitosamente")
        res.redirect("/administrador/Inicio");
    }else{
        let msj = "Ocurrio un error al registrar el equipo";
        res.send(JSON.stringify(msj));
    }
});


module.exports = router;