/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bknurxaibql295z",
    "created": "2025-10-10 09:29:00.119Z",
    "updated": "2025-10-10 09:29:00.119Z",
    "name": "series",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vtfyvba7",
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
        "id": "dihbg2vy",
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
        "id": "4ajmxjxm",
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
        "id": "tjeutg6u",
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
        "id": "uonprljg",
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
        "id": "itmojzuc",
        "name": "creador",
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
        "id": "kgxrueqs",
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
        "id": "gje3feti",
        "name": "trailer",
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
        "id": "jg0u87nx",
        "name": "estado",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("bknurxaibql295z");

  return dao.deleteCollection(collection);
})
