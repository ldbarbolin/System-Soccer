const express = require('express');
const router = express.Router();

router.get("/",(req, res) => {
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    res.render("vista_Arbitro/index.ejs",{
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
    });
});

module.exports = router;