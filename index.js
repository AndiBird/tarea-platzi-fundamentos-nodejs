const fs = require('fs');

//Bienvenida
console.log('Hola, soy una aplicación desde CLI para crear y gestionar tus tareas del día.');
console.log('Dime si:\n1. quieres crear una tarea.\n2. Quieres ver las tareas creadas.\n3. Quieres eliminar las tareas creadas.\n4. Quieres modificar una tarea (node index.js 4 "task" "newTask").\n5. Quieres borrar una tarea (node index.js taskToDelete).');
console.log('----------------------------');

// Obtener los argumentos de la línea de comandos
const args = process.argv.slice(2);

// Verificar si se proporcionó algún argumento
if(args.length === 0) {
    console.error('No se proporcionaron argumentos. Por favor, proporciona algún argumento.');
    process.exit(1);
}

// Obtener el primer argumento
const action = args[0];

// Realizar la acción correspondiente
switch (action) {
    case '1':
        console.log('Realizando la acción 1...');
        // Lógica para la acción 1
        // Adicionar tarea
        const tarea = args[1]; // Obtén la tarea del segundo argumento
        if (!tarea) {
            console.error('No se proporcionó una tarea. Por favor, crea una tarea.');
            process.exit(1);
        }
        fs.appendFile('tareas.txt', tarea + '\n', (err) => {
            if(err) {
                console.error('Error al guardar la tarea', err);
            } else {
                console.log('Tarea guardada exitosamente.');
            }
        });
        break;
    case '2':
        console.log('Realizando la acción 2');
        // Lógica para la acción 2
        // Listar tareas
        fs.readFile('tareas.txt', 'utf8', (err, data) => {
            if(err){
                console.error('Error al leer las tareas:', err);
            } else {
                console.log('Tareas:');
                console.log(data);
            }
        });
        break;
    case '3':
        console.log('Realizando la acción 3.')
        // Lógica para la acción 3.
        // Eliminar tareas
        fs.unlink('tareas.txt', (err) => {
            if(err) {
                console.error('Error al eliminar las tareas:', err);
            } else {
                console.log('Tareas eliminadas exitosamente.');
            }
        });
        break;
    case '4':
        console.log('Realizando la acción 4.');
        // Lógica para la acción 4
        // Actualizar tareas
        const tareaActual = args[1]; // Obtener la tarea actual del segundo agrumento
        const tareaNueva = args[2]; // Obtener la nueva tarea del tercer argumento
        if (!tareaActual || !tareaNueva) {
            console.error('No se proporcionaron las tareas. Por favor, proporciona las tareas válidas.');
            process.exit(1);
        }
        fs.readFile('tareas.txt', 'utf8', (err, data) => {
            if(err) {
                console.error('Error al leer las tareas: ', err);
            } else {
                const tareas = data.split('\n');
                const index = tareas.indexOf(tareaActual);
                if (index === -1) {
                    console.error('La tarea a actualizar no existe. Por favor, proporciona una tarea existente.');
                    process.exit(1);
                }
                tareas[index] = tareaNueva;
                fs.writeFile('tareas.txt', tareas.join('\n'), (err) => {
                    if (err) {
                        console.error('Error al actualizar la tarea: ', err);
                    } else {
                        console.log('Tarea actualizada exitosamente.');
                    }
                    
                })
            }
        });
        break;
    case '5':
        console.log('Realizando la tarea 5.');
        // Lógca de la acción 5.
        // Borrar una tarea seleccionada
        const tareaABorrar = args[1]; // Obtener la tarea a borrar del segundo argumento.
        //Validar si no viene vacío el argumento
        if (!tareaABorrar) {
            console.error('Por favor indique una tarea que desee borrar.');
            process.exit(1);
        }
        fs.readFile('tareas.txt', 'utf8', (err,data) => {
            if (err) {
                console.error('Error al leer las tareas: ', err);
            } else {
                const tareas = data.split('\n');
                const index = tareas.indexOf(tareaABorrar);
                if (index === -1) {
                    console.error('La tarea a borrar no existe. Por favor, proporciona una tarea existente.');
                    process.exit(1);
                }
                tareas.splice(index, 1);
                fs.writeFile('tareas.txt', tareas.join('\n'), (err) => {
                    if (err) {
                        console.error('Error al borrar la tarea: ', err);
                    } else {
                        console.log('Tarea borrada exitosamente.');
                    }
                });
            }
        });
        break;
    default:
        console.error('Acción no válida. Por favor, proporciona una acción válida.');
        break;
}