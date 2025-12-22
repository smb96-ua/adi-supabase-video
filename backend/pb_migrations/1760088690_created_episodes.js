/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dxhy0o5h1omfvwt",
    "created": "2025-10-10 09:31:30.221Z",
    "updated": "2025-10-10 09:31:30.221Z",
    "name": "episodes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5gv978fw",
        "name": "season_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "lr3bmdt4c1ksb4i",
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
        "id": "onnfcq30",
        "name": "numero_episodio",
        "type": "number",
        "required": true,
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
        "id": "letofhr9",
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
        "id": "k6yf0qwt",
        "name": "descripcion",
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
        "id": "65yajeiq",
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
        "id": "ujlqomkw",
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
        "id": "dyecqktv",
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
        "id": "ejpz0vhe",
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
        "id": "spibtt1p",
        "name": "poster",
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
  const collection = dao.findCollectionByNameOrId("dxhy0o5h1omfvwt");

  return dao.deleteCollection(collection);
})
