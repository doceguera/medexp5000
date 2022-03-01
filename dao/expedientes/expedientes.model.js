const ObjectId = require('mongodb').ObjectId;
const getDb = require('../db');

let db = null;
class Expedientes {
  collection = null;
  constructor() {
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Expedientes');
        if (process.env.MIGRATE === 'true') {
        
        }
      })
      .catch((err) => { console.error(err) });
  }

  async newFiles(identidad, fecha, descripcion, observacion, registro, ultimaactualizacion) {
    const newFiles = {
      identidad, 
      fecha, 
      descripcion, 
      observacion, 
      registro, 
      ultimaactualizacion
    };
    const rslt = await this.collection.insertOne(newFiles);
    return rslt;
  }

  async getAll() {
    const cursor = await this.collection.find({});
    const files = await cursor.toArray();
    return files;
  }

  async getById(id) {
    const _id = ObjectId(id);
    const filter = { _id };
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
  }

  async updateOne(id, identidad, fecha, descripcion, observacion, registro, ultimaactualizacion) {
    const filter = { _id: new ObjectId(id) };
    const updateCmd = {
      '$set': {
        identidad, 
        fecha, 
        descripcion, 
        observacion, 
        registro, 
        ultimaactualizacion
      }
    };
    const rslt = await this.collection.updateOne(filter, updateCmd);
  }

  async deleteOne(id) {
    const _id = ObjectId(id);
    const filter = { _id };
    const myDocs = await this.collection.deleteOne(filter);
    return myDocs;
  }
}

module.exports = Expedientes;