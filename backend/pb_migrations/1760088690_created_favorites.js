/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fnvwjlzb12uzmm3",
    "created": "2025-10-10 09:31:30.567Z",
    "updated": "2025-10-10 09:31:30.567Z",
    "name": "favorites",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "07d0facv",
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
        "id": "nsk3pjp4",
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
        "id": "dbsuedd6",
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
  const collection = dao.findCollectionByNameOrId("fnvwjlzb12uzmm3");

  return dao.deleteCollection(collection);
})
