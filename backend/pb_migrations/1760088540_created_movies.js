/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "u1cu5ohmapzzq0z",
    "created": "2025-10-10 09:29:00.075Z",
    "updated": "2025-10-10 09:29:00.075Z",
    "name": "movies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kgy8ieic",
        "name": "titulo",
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
        "id": "efc1nu8z",
        "name": "descripcion",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 2000,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nl1fsovj",
        "name": "genero",
        "type": "text",
        "required": true,
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
        "id": "pxwdhogb",
        "name": "anio",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1900,
          "max": 2030,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "zh1ifob1",
        "name": "valoracion",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 10,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "fjhemo8u",
        "name": "duracion",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "kvjkpevy",
        "name": "director",
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
        "id": "rlyn7dr3",
        "name": "poster",
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
        "id": "rslmxzvd",
        "name": "trailer",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
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
  const collection = dao.findCollectionByNameOrId("u1cu5ohmapzzq0z");

  return dao.deleteCollection(collection);
})
