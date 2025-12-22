/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vs4qyb57rtxnz0e",
    "created": "2025-10-10 09:31:30.414Z",
    "updated": "2025-10-10 09:31:30.414Z",
    "name": "actors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jevqvsoo",
        "name": "nombre",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 200,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hp5a6kcl",
        "name": "personaje",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 200,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "m24c6uc4",
        "name": "foto",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "ewtpowfl",
        "name": "biografia",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 2000,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mdckgjtm",
        "name": "fecha_nacimiento",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "dr5o2hxn",
        "name": "nacionalidad",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vs4qyb57rtxnz0e");

  return dao.deleteCollection(collection);
})
