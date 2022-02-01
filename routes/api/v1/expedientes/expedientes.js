const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) => {
  res.status(200).json(
    {
      endpoint: 'Expedientes',
      updates: new Date(2022, 0, 19, 18, 41, 00)
    }
  );
}); //GET /

router.get('/all', async (req, res) => {
  try {
    const rows = await expedienteModel.getAll();
    res.status(200).json({ status: 'ok', expedientes: rows });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});
// /byid/1;
router.get('/byid/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const row = await expedienteModel.getById(parseInt(id));
    res.status(200).json({ status: 'ok', expediente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

router.get('/byagegender/:age/:gender', async (req, res) => {
  try {
    const { age, gender } = req.params;
    const row = {}; // await expedienteModel.getById(parseInt(id));
    res.status(200).json({ status: 'ok', expediente: row });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

router.post('/new', async (req, res) => {
  const { identidad, fecha, descripcion, observacion, registro, ultimaactualizacion } = req.body;
  try {
    rslt = await expedienteModel.new(identidad, fecha, descripcion, observacion, registro, ultimaactualizacion);
    res.status(200).json(
      {
        status: 'ok',
        result: rslt
      });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(
      {
        status: 'failed',
        result: {}
      });
  }
}); //POST /new


//router.put();
router.put('/update/:id', async (req, res) => {
  try {
    const { identidad, fecha, descripcion, observacion, registro, ultimaactualizacion } = req.body;
    const { id } = req.params;
    const result = await expedienteModel.updateOne(id, identidad, fecha, descripcion, observacion, registro, ultimaactualizacion);
    res.status(200).json({
      status: 'ok',
      result
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

//router.delete();
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await expedienteModel.deleteOne(id);
    res.status(200).json({
      status: 'ok',
      result
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});


module.exports = router;