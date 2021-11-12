const createUser = {
  tags: ["Users"],
  description: "Create a new use in the system",
  operationId: "createUser",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "alfonse",
            },

            email: {
              type: "string",
              example: "alfonse.snow@email.com",
            },
            password: {
              type: "string",
              description: "unencrypted user's password",
              example: "!1234$#",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "User created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "algfonse",
              },

              email: {
                type: "string",
                example: "algfonse.snow@email.com",
              },
              password: {
                type: "string",
                example: "442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed",
              },

              createdAt: {
                type: "string",
                example: "2021-03-20T19:40:59.495Z",
              },
              updatedAt: {
                type: "string",
                example: "2021-03-20T21:23:10.879Z",
              },
              token: {
                type: "string",
                example: "asdhfuasdhfupoashfpuoahwfoh.wurfhuhz1234hfsp9dfy",
              },
            },
          },
        },
      },
    },
    401: {
      description:
        "it is caused when cast parameters, please use only string format in all fields required",
    },
    403: {
      description:
        "you need to include all parameter in the body , as json format",
    },
    409: {
      description: "the user that you want to use aready exist in the server",
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};

const loginUser = {
  tags: ["Users"],
  description: "send back a token for the specific user",
  operationId: "loginUser",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "alfonse.snow@email.com",
            },
            password: {
              type: "string",
              description: "unencrypted user's password",
              example: "!1234$#",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "User login successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
                example: "asdhfuasdhfupoashfpuoahwfoh.wurfhuhz1234hfsp9dfy",
              },
            },
          },
        },
      },
    },

    401: {
      description:
        "it is caused when cast parameters, please use only string format in all fields required",
    },
    403: {
      description:
        "you need to include all parameter in the body , as json format",
    },
    504: {
      description: "it is usually cause when the database is disconnected",
    },
    503: {
      description:
        "I simply include this for testing , but is probable that was an error in my code  I apologize",
    },
  },
};

module.exports = { createUser, loginUser };
