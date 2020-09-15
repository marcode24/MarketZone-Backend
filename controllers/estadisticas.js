const { response } = require('express');
const { getTotalVentas, getProductosVendidos } = require('../helpers/mis-estadisticas');
const { getGananciaNeta } = require('../helpers/ganancia');

const getEstadisticas = async(req, res = response) => {
    try {
        const { total, pagadas, canceladas } = await getTotalVentas();
        const productosTop3 = await getProductosVendidos();
        const gananciaNeta = await getGananciaNeta();
        res.status(200).json({
            ok: true,
            total,
            pagadas,
            canceladas,
            productosTop3,
            gananciaNeta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getEstadisticas
};