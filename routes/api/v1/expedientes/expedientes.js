const express = require('express');
const router = express.Router();
const Expedientes = require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) => {
  res.status(200).json(
    {
      endpoint: 'Expedientes',
      updates: new Date(2022, 0, 19, 18, 41, 0)
    }
  );
}); //GET /

router.get('/all', async (req, res) => {
  try {
    console.log('User request', req.user)
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

const allowedItemsNumber = [10, 15, 20];
//facet search
router.get('/facet/:page/:items', async (req, res) => {
  const page = parseInt(req.params.page, 10)
  const items = parseInt(req.params.items, 10);

  if (allowedItemsNumber.includes(items)) {
    try {
      const expedientes = await expedienteModel.getFaceted(page, items);
      res.status(200).json({ docs: expedientes });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  } else {
    return res.status(403).json({ status: 'error', msg: 'Not a valid item value (10, 15, 20)' });
  }
});

router.get('/byname/:name/:page/:items', async (req, res) => {
  const names = req.params.name;
  const page = parseInt(req.params.page, 10)
  const items = parseInt(req.params.items, 10);

  if (allowedItemsNumber.includes(items)) {
    try {
      const expedientes = await expedienteModel.getFaceted(page, items, { nombres: names });
      res.status(200).json({ docs: expedientes });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  } else {
    return res.status(403).json({ status: 'error', msg: 'Not a valid item value (10, 15, 20)' });
  }
});

router.put('/addtag/:id', async (req, res) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;
    const result = await expedienteModel.updateAddTag(id, tag);
    res.status(200).json({
      status: 'ok',
      result
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

router.put('/addtagset/:id', async (req, res) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;
    const result = await expedienteModel.updateAddTagSet(id, tag);
    res.status(200).json({
      status: 'ok',
      result
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ status: 'failed' });
  }
});

router.put('/removetag/:id', async (req, res) => {
  try {
    const { tag } = req.body;
    const { id } = req.params;
    const result = await expedienteModel.updatePopTag(id, tag);
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