require('dotenv').config();
const getDb = require('../dao/mongodb');

console.log(process.env.MONGOURI)

const descrip = [
    'Covid 19',
    'Dislocación de brazo',
    'Apendiciti',
    'Cancer',
    'Dolor de cabeza',
    'Dolor en el cuerpo',
    'Diarrea',
    'Calentura',
    'Ceguera',
    'Hemorragia'
];

const observa = [
    'Paciente de edad avanzada',
    'Paciente menor de edad',
    'Paciente en estado grave',
    'Paciente joven',
    'Paciente con sintomas graves',
    'Paciente con sintomas controlables',
    'Paciente ',
    'Paciente con urgencias de internar',
    'Paciente con sintomas leves',
    'Paciente con medicamento controlado'
]

const expedientes = 50;
const expedientesArra = [];

for (var i = 0; i < expedientes; i++) {
    const descripcion = descrip[Math.floor(Math.random() * 8)];
    const observacion = observa[Math.floor(Math.random() * 8)];
    const anio = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20) :
        2000 + Math.floor(Math.random() * 23);
    const secuencia = String(Math.ceil(Math.random() * 9999)).padStart(5, '0');

    const doc = {
        identidad: `0601${anio}${secuencia}`,
        fecha: "2022-02-27",
        descripcion,
        observacion,
        registro: i,
        ultimaactualizacion: "12-12-21"
    }
    expedientesArra.push(doc);
}

getDb().then(
    (db) => {
        const expedientes = db.collection('Expedientes');
        expedientes.insertMany(expedientesArra, (err, rslts) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rslts)
            return;
        })
    }
);





