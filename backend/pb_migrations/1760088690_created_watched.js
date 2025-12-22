/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ui6muxc7wj59e60",
    "created": "2025-10-10 09:31:30.519Z",
    "updated": "2025-10-10 09:31:30.519Z",
    "name": "watched",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8jctmeyp",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "mt3hwwun",
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
        "id": "wyl1ub1y",
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
      },
      {
        "system": false,
        "id": "af3jdoxj",
        "name": "watched",
        "type": "bool",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "b2l7sifk",
        "name": "fecha_visto",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "zgaepeh2",
        "name": "progreso",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && user_id = @request.auth.id",
    "viewRule": "@request.auth.id != \"\" && user_id = @request.auth.id",
    "createRule": "@request.auth.id != \"\" && user_id = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && user_id = @request.auth.id",
    "deleteRule": "@request.auth.id != \"\" && user_id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ui6muxc7wj59e60");

  return dao.deleteCollection(collection);
})
