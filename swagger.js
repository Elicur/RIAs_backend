const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Documentación',
    description: 'Documentación de la API generada automáticamente',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Hospital: {
      id: 1,
      nombre: "Hospital Central",
      direccion: "Av. Principal 123",
    },
    Usuario: {
      id: 1,
      email: "user@example.com",
      password: "password123",
      role: "USER",
      telefono: "123456789",
      enabled: true
    },
    RegisterUser: {
      email: "user@example.com",
      password: "password123",
      role: "USER",
      telefono: "123456789",
    },
    Login: {
      email: "user@example.com",
      password: "password123",
    },
    ChangePassword: {
      id: 1,
      oldPassword: "password123",
      newPassword: "newpassword123",
    },
    ForgotPassword: {
      email: "user@example.com",
    },
    EnableDisableUser: {
      id: 1,
    },
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Tu archivo principal de la aplicación
});
