
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = 3000;

app.use( bodyParser.json() );

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// RUTAS 

app.get('/empleados', db.getEmpleados);
app.get('/empleado/:id', db.getEmpleadoById);
app.post('/empleado', db.guardarEmpleado);
app.put('/empleado/:id', db.actualizarEmpleado);
app.delete('/empleado/:id', db.borrarEmpleado);

// PUERTO QUE ESCUCHA

app.listen( port, () => {
    console.log(" API REST Corriendo en el Puerto : ", port);
})

app.get('/', (req, res) => {
    res.json({
        info : "API REST CORRIENDO EN EXPRESS CON NODE Y POSTGRES"
    })
})