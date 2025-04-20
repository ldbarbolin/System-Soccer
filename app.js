const express = require('express');
const app = express();
const configuraciones = require("./config");
const conexionbd = require("././acceso_datos/configuracionGlobal")
const port = 3000;
const rutaAdministrador = require("./presentacion/rutas/rutaAdministrador");
const rutaArbitro = require("./presentacion/rutas/rutaArbitro");
const GestorUsuario = require('./logica_negocio/gestor_usuario');

//aplica las configuraciones
configuraciones(app);

function establecerCookie(res, name, value, options = {}){
    const defaultOptions = {
        httpOnly: true,
    };

    res.cookie(name,value, { ...defaultOptions, ...options });
}

function verificarSesion(req, res, next){
    if(req.cookies["idUsuario"]){
        //Si la sesion existe permite el acceso a la ruta
        next();
    }else{
        //Si no existe sesion redirecciona a la pagina de ingreso
        res.redirect("/ingreso")
    }
}

function redirigirUsuario(res, tipoUsuario){
    if (tipoUsuario === "AD"){
        res.redirect("/Administrador");
    }else if(tipoUsuario === "AR"){
        res.redirect("/Arbitro");
    }
}

//rutas principal
app.get('/', (req, res) => {
  res.redirect("ingreso");
});

app.get("/ingreso", async (req, res) =>{
    const idUsuario = req.cookies["idUsuario"];
    if(typeof idUsuario != "undefined"){
        const gestorUsuario = new GestorUsuario();
        const tipoUsuario = await gestorUsuario.
        obtenerTipoUsuarioPorId(idUsuario);
        redirigirUsuario(res, tipoUsuario);
    }else{
        res.render("sistema/ingreso.ejs");
    }
});

app.post("/ingreso", async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
    const gestorUsuario = new GestorUsuario();
    const usuario = await gestorUsuario.validarUsuario(nombreUsuario, contrasena);
  
    if (usuario) {
      establecerCookie(res, "nombreUsuario", usuario.nombreUsuario);
      establecerCookie(res, "idUsuario", usuario.idUsuario);
      establecerCookie(res, "nombreImgUsuario", usuario.genero);
      redirigirUsuario(res, usuario.tipoUsuario);
    } else {
      res.render("sistema/ingreso.ejs", { mensaje: true });
    }
  });

app.get("/cerrar_sesion", (req, res) => {
    // Elimina las cookies asociadas con el usuario
    res.clearCookie("nombreUsuario");
    res.clearCookie("idUsuario");
    res.clearCookie("nombreImgUsuario");
    res.redirect("/ingreso");
    });

app.use('/administrador',verificarSesion,rutaAdministrador);
app.use('/arbitro',verificarSesion,rutaArbitro);

app.listen(port, ()=>{
    console.log("Servidor inicializado en el puerto", port)
});