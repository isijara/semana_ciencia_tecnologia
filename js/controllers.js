var getTodo = function() {

    var guardarObjetoEnLocalStorage = function(item, object) {
        localStorage.setItem(item, JSON.stringify(object) );
    };

    var obtenerObjetoDeLocalStorage = function(item) {
        var data = JSON.parse(localStorage.getItem(item));
        return  (typeof(data) == 'object' ) ? data : [] ;
    };

    return {
        getItem : obtenerObjetoDeLocalStorage,
        saveItem: guardarObjetoEnLocalStorage
    };

};


function altaTareasController( $scope ) {

    window.scope = $scope;
    var todo = new getTodo();

    $scope.tiposPrioridad = [{ nombre: 'Alta' }, { nombre: 'Media' }, { nombre: 'Baja' }];
    $scope.prioridad = 'Media';

    $scope.tareasAgregadas = todo.getItem('tareasAgregadas') || [] ;
    $scope.historial = todo.getItem('historial') || [] ;


    var tarea = function(nombre, prioridad){
        return {    nombre : nombre,
                    prioridad : prioridad
            };
    };


    $scope.agregarTarea = function() {
        if( $scope.tareaParaAgregar ) {
            $scope.tareasAgregadas.push(new tarea($scope.tareaParaAgregar, $scope.prioridad));
            $scope.tareaParaAgregar  = '';
            todo.saveItem('tareasAgregadas', $scope.tareasAgregadas);
        }

    };


    $scope.eliminarTarea = function(index) {
        $scope.tareasAgregadas.splice(index, 1);

        todo.saveItem('tareasAgregadas', $scope.tareasAgregadas);
    };


    $scope.terminarTarea = function(index) {
        var tareaTerminada = $scope.tareasAgregadas.splice(index, 1)[0];

        console.log(tareaTerminada);
        $scope.historial.push(tareaTerminada);
        todo.saveItem('historial', $scope.historial );
        todo.saveItem('tareasAgregadas', $scope.tareasAgregadas);
    };

}

function historialController( $scope ) {
    window.scope = $scope;
    var todo = new getTodo();
    console.log(todo);
    $scope.historial = todo.getItem('historial');

    todo.saveItem('historial', $scope.historial);



}

function edicionController($scope) {
    window.scope = $scope;
    var todo = new getTodo(),
        url = document.URL.split('/'),
        index = url[url.length-1];


    $scope.tareasAgregadas = todo.getItem('tareasAgregadas');
    var tarea = $scope.tareasAgregadas[index];

    $scope.tareaActualizar = tarea.nombre;
    $scope.prioridad = tarea.prioridad;




    $scope.actualizarTarea = function() {

        $scope.tareasAgregadas[index].nombre = $scope.tareaActualizar;
        $scope.tareasAgregadas[index].prioridad = $scope.prioridad;
        todo.saveItem('tareasAgregadas', $scope.tareasAgregadas);


    };

}