
const Pool = require('pg').Pool

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'db_empleados_brm',
    password : 'postgres',
    port : 5432
});

const getEmpleados = ( request, response ) => {

    pool.query('SELECT * FROM empleados ORDER BY id_empleado ASC', ( error, results ) => {
        if ( error ) {
            response.status(200).send({
                message : 'Error al Guardar la Petición'
            });
            throw error;
        }           

        response.status(200).json(results.rows);

    } );

}

const getEmpleadoById = ( request, response ) => {

    const id = parseInt( request.params.id );

    pool.query('SELECT * FROM empleados WHERE id_empleado = $1', [id], ( error, results ) => {
        if ( error ) {
            response.status(200).send({
                message : 'Error al Guardar la Petición'
            });
            throw error;
        }   

        response.status(200).json(results.rows);

    })

}

const guardarEmpleado = ( request, response ) => {
    
    const {
        brm,
        nombre,
        foto,
        puesto
    } = request.body

    pool.query('INSERT INTO empleados ( brm, nombre, foto, puesto ) VALUES ( $1, $2, $3, $4 ) RETURNING id_empleado', 
                [ brm, nombre, foto, puesto], ( error, results ) => {
        if ( error ) {
            response.status(200).send({
                message : 'Error al Guardar la Petición'
            });
            throw error;
        }  

          // Accedemos la primera row insertada
         const id = results.rows[0].id_empleado;
         response.status(201).send( {
            estatus : 201, 
            message : `Empleado Guardado con el ID : ${id} `
        });

    })

}

const actualizarEmpleado = ( request, response ) => {

    const id = parseInt(request.params.id);

    const {
        brm,
        nombre,
        foto,
        puesto
    } = request.body

    pool.query( 'UPDATE empleados SET brm = $1, nombre = $2, foto = $3, puesto = $4 WHERE id_empleado = $5', 
                [ brm, nombre, foto, puesto, id ], ( error, results ) => {
        if ( error ) {
            response.status(200).send({
                message : 'Error al Guardar la Petición'
            });
            throw error;
        } 

            response.status(200).send( {
                estatus : 200, 
                message : `Empleado Modificado con el ID : ${id} `
            });

    })

}

const borrarEmpleado = ( request, response ) => {

    const id = parseInt(request.params.id);

    pool.query('DELETE FROM empleados WHERE id_empleado = $1', [id], ( error, results ) => {
        if ( error ) {
            response.status(200).send({
                message : 'Error al Guardar la Petición'
            });
            throw error;
        }
        
        response.status(200).send( {
            estatus : 200, 
            message : `Empleado Eliminado con el ID : ${id} `
        });

    })

}

module.exports = {
    getEmpleados,
    getEmpleadoById,
    guardarEmpleado,
    actualizarEmpleado,
    borrarEmpleado
}