const getAllPerson = {
  tags: ["Data"],
  description: "Get all ¨Person¨s  in the database",

  responses: {
    200: {
      description:
        "Here are your flowers !.Returns an array with the properties below, and a counts of his children",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              lastname: {
                type: "string",
              },
              gender: {
                type: "enum",
              },
              married: {
                type: "boolean",
              },
              age: {
                type: "number",
              },
            },
          },
        },
      },
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};

const getPerson = {
  tags: ["Data"],
  description: "returns a single person",

  parameters: [
    {
      name: "personid",
      in: "path",
      type: "string",
    },
  ],

  responses: {
    200: {
      description: "returns the person that you put in id",
      content: {
        "application/json": {
            schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              lastname: {
                type: "string",
              },
              gender: {
                type: "enum",
              },
              married: {
                type: "boolean",
              },
              age: {
                type: "number",
              },
              childern: {
                type: "object",
              },
            },
          },
        },
      },
    },
    403: {
      description: "you need to include the person's id",
    },

    404: {
      description: "user not found",
    },

    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};

const createPerson = {
  tags: ["Data"],
  description: "create a single person with the data given as json format",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              require: true,
            },
            name: {
              type: "string",
            },
            lastname: {
              type: "string",
            },
            gender: {
              type: "enum",
              require: true,
            },
            married: {
              type: "boolean",
            },
            age: {
              type: "number",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "returns the person that you create",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              lastname: {
                type: "string",
              },
              gender: {
                type: "enum",
              },
              married: {
                type: "boolean",
              },
              age: {
                type: "number",
              },
            },
          },
        },
      },
    },
    409: {
      description:
        "the id that you want to use is already in use :( , or your name must contain at least 20 characters, or the property 'gender' must be one of the following values : [ 'Male', 'Famale', 'Other']",
    },
    403: {
      description: "is necesary that you include gender and id attribute",
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};

const updatePerson = {
  tags: ["Data"],
  description: "updates a single person with the data given as json format",
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              require: true,
            },
            toUpdate: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              lastname: {
                type: "string",
              },
              gender: {
                type: "enum",
              },
              married: {
                type: "boolean",
              },
              age: {
                type: "number",
              },
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "returns the person that you already update",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              lastname: {
                type: "string",
              },
              gender: {
                type: "enum",
              },
              married: {
                type: "boolean",
              },
              age: {
                type: "number",
              },
            },
          },
        },
      },
    },
    409: {
      description: "there isn't anyone with this key",
    },
    403: {
      description: "the person's ID is required",
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};

const deletePerson = {
  tags: ["Data"],
  description: "deletes a single person with the given id",

  parameters: [
    {
      name: "personid",
      in: "path",
      type: "string",
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              require: true,
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "it simply print a message with 'successfull delete' ",
    },

    409: {
      description: "there isn't anyone with this key",
    },
    403: {
      description: "the person's ID is required",
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};
module.exports = {
  getAllPerson,
  getPerson,
  createPerson,
  deletePerson,
  updatePerson,
};
