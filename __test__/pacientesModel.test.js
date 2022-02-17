const Pacientes = require('../../medexp5000/dao/pacientes/pacientes.model');
describe('Testing Pacientes Model', () => {
    let pacientesModel = undefined;
    let lastID = 0;
    beforeAll((done) => {
        pacientesModel = new Pacientes();
        setTimeout(() => {
            done();
        }, 3000);
    });

    it('pacientesModel Esta Definido', () => {
        return expect(pacientesModel).toBeDefined();
    });

    it('getAll devuelve un array', async () => {
        const arrPacientes = await pacientesModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });

    it('new guarde un dato', async () => {
        const resultado = await pacientesModel.new(
            'Sissy Rosario',
            'Oceguera Flores',
            '06012736882',
            '012394857',
            'ksajbd@lskdcsm.com'
        );
        lastID = resultado;
        return expect(resultado).toBeDefined();
    });

    it('obtener un dato', async () => {
        const resultado = await pacientesModel.getById(
            lastID
        );
        console.log(resultado);
        return expect(resultado.nombre
            ).toBe('Sissy Rosario');
    });

    it('eliminar un dato', async () => {
        const resultado = await pacientesModel.deleteOne(
            lastID
        );
        console.log(resultado);
        return expect(resultado).toBeDefined();
    });
}
)