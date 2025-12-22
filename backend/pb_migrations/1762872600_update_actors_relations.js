/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vs4qyb57rtxnz0e")

  // Remove old fields
  collection.schema.removeField("zu8f0ext")
  collection.schema.removeField("7ugctthc")

  // Add updated movie_id field to allow multiple selections
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zu8f0ext",
    "name": "movie_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "u1cu5ohmapzzq0z",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "titulo"
      ]
    }
  }))

  // Add updated serie_id field to allow multiple selections
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7ugctthc",
    "name": "serie_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bknurxaibql295z",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "titulo"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vs4qyb57rtxnz0e")

  // Revert movie_id field back to single selection
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zu8f0ext",
    "name": "movie_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "u1cu5ohmapzzq0z",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "titulo"
      ]
    }
  }))

  // Revert serie_id field back to single selection
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7ugctthc",
    "name": "serie_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bknurxaibql295z",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "titulo"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
