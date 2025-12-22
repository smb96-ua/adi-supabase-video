/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lr3bmdt4c1ksb4i",
    "created": "2025-10-10 09:31:30.115Z",
    "updated": "2025-10-10 09:31:30.115Z",
    "name": "seasons",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vdt67inl",
        "name": "serie_id",
        "type": "relation",
        "required": true,
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
      },
      {
        "system": false,
        "id": "ri9sk0y5",
        "name": "numero_temporada",
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
        "id": "hfscpxdj",
        "name": "titulo",
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
        "id": "fgqjcdy5",
        "name": "descripcion",
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
        "id": "jnpjqjoj",
        "name": "anio",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "zdmlplat",
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
  const collection = dao.findCollectionByNameOrId("lr3bmdt4c1ksb4i");

  return dao.deleteCollection(collection);
})
