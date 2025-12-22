/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ixgyaukox00nbf4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ixgyaukox00nbf4",
    "created": "2025-10-10 09:15:36.037Z",
    "updated": "2025-10-10 09:15:36.037Z",
    "name": "series",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kk9tmoh7",
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
        "id": "z7vntfpt",
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
        "id": "a2w8o1k8",
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
        "id": "xfbxcem7",
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
        "id": "9kqrg1hn",
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
        "id": "0wyjlvau",
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
        "id": "hm3goaur",
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
        "id": "kyz9kmr4",
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
        "id": "wka39rls",
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
})
