const getAllChild = {
  tags: ["Data"],
  description: "Get all ¨Child¨s  in the database",

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
              personID: {
                type: "string",
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

const getChild = {
  tags: ["Data"],
  description: "returns a single Child",

  parameters: [
    {
      name: "childid",
      in: "path",
      type: "string",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          properties: {
            id: {
              type: "string",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "returns the Child that you put in id",
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
              personID: {
                type: "string",
              },
            },
          },
        },
      },
    },

    403: {
      description: "you need to include the person's id",
    },

    409: {
      description: "child not found",
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};

const createChild = {
  tags: ["Data"],
  description:
    "create a single Child with the data given as json format, the personID associated with this child is in the parameters",
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
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "returns the Child that you create",
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
              personID: {
                type: "string",
              },
            },
          },
        },
      },
    },
    409: {
      description:
        "the id that you want to use is already in use :( , or your name must contain at least 20 characters",
    },
    403: {
      description: "is necesary that you include id attribute",
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};

const deleteChild = {
  tags: ["Data"],
  description: "deletes a single Child with the given id",

  parameters: [
    {
      name: "childid",
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
      description: "the Child's ID is required",
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};
module.exports = {
  getAllChild,
  getChild,
  createChild,
  deleteChild,
};
