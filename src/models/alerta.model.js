let alertas = [
    {
        id: 1,
        id_medidor: 1,
        tipo: "Consumo alto",
        mensaje: "Se detectó un consumo superior al promedio",
        estado: "activa"
    },
    {
        id: 2,
        id_medidor: 2,
        tipo: "Posible fuga",
        mensaje: "Se detectó un consumo continuo",
        estado: "activa"
    }
];
 
module.exports = alertas;