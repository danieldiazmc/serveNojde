

const confPath = {
    "/pets": {
      "get": {
        "description": "Returns all pets from the system that the user has access to",
        "responses": {
          "200": {          
            "description": "A list of pets.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/pet"
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return confPath;