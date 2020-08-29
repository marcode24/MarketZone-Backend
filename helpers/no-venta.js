const Venta = require('../models/venta');

const getNoVenta = async() => {
    let ventas = [];
    ventas = await Venta.find();
    if (ventas.length < 1) {
        return 1;
    } else {
        const { noVenta: no } = ventas[0];
        let numeroMayor = no;
        for (let i = 0; i < ventas.length; i++) {
            const { noVenta } = ventas[i];
            if (noVenta > numeroMayor) {
                const { noVenta: mayor } = ventas[i];
                numeroMayor = mayor;
            }
        }
        return numeroMayor + 1;
    }
};

module.exports = {
    getNoVenta
};