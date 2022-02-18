const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');

let db = null;

class Pacientes {
  collection = null;
  constructor() {

    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Pacientes');
        if (process.env.MIGRATE === 'true') {
        }
      })
      .catch((err) => { console.error(err) });
  }

  async new(nombres, apellidos, identidad, telefono, email) {
    const newPaciente = {
      nombres,
      apellidos,
      identidad,
      telefono,
      email
    };
    const rslt = await this.collection.insertOne(newPaciente);
    return rslt;
  }

  async getAll() {
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }

  async getById(id) {
    const _id = ObjectId(id);
    const filter = { _id };
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
  }

  async updateOne(id, nombres, apellidos, identidad, telefono, email) {
    const filter = { _id: new ObjectId(id) };
    const updateCmd = {
      '$set': {
        nombres,
        apellidos,
        identidad,
        telefono,
        email
      }
    };
    const rslt = await this.collection.updateOne(filter, updateCmd);
  };

  async deleteOne(id) {
    const _id = ObjectId(id);
    const filter = { _id };
    const myDocs = await this.collection.deleteOne(filter);
    return myDocs;
  }
}

module.exports = Pacientes;