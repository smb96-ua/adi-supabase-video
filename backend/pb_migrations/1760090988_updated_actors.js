/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vs4qyb57rtxnz0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rgkxi3im",
    "name": "episode_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "dxhy0o5h1omfvwt",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "titulo"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vs4qyb57rtxnz0e")

  // remove
  collection.schema.removeField("rgkxi3im")

  return dao.saveCollection(collection)
})
