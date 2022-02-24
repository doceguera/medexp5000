require('dotenv').config();
const getDb = require('../dao/mongodb');
console.log(process.env.MONGOURI)
const names = [
    'FULANITO',
    'MENGANITO',
    'SUTANITO',
    'VIOLET',
    'MANCHAS',
    'BLANCO',
    'COPO',
    'MADRE',
    'GERMAN',
    'OCEGUERA'
];

const surnames = [
    'PEÑA',
    'NIETO',
    'HERNANDEZ',
    'ORTEGA',
    'BERGOGLIO',
    'MEDINA',
    'GONZALES',
    'NOLASCO',
    'JIMENA',
    'FRIJUMA'
]

const pacientes = 50;
const pacientesArra = [];


for(var i = 0; i < pacientes; i++ ){
    const anio = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20): 
                    2000 + Math.floor(Math.random() * 23);
    const nombres =  names[Math.floor(Math.random() * 8)];
    const apellidos = surnames[Math.floor(Math.random() * 8)];
    const secuencia = String(Math.ceil(Math.random() * 9999)).padStart(5,'0');
    const email = (`${nombres}.${apellidos}@unmail.com`).toLocaleLowerCase();
    const telefono = `${(20000000 + Math.floor(Math.random() + 1000000))}`;
        const doc = {
        nombres,
        apellidos, 
        identidad:`0601${anio}${secuencia}`,
        telefono,
        email
    }
    pacientesArra.push(doc);
}

getDb().then(
    (db) => {
        const pacientes = db.collection('Pacientes');
        pacientes.insertMany(pacientesArra, (err, rslts) => {
            if(err){
                console.log(err);
                return;
            }
            console.log(rslts)
            return;
        })
    }
);





