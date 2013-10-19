var todo = angular.module('todo', []);


todo.config([ '$routeProvider', function($routeProvider){
    $routeProvider.when('/inicio', {
        templateUrl: 'partials/alta_tareas.html',
        controller: altaTareasController
    })
    .when('/historial', {
        templateUrl: 'partials/historial.html',
        controller: historialController
    })
    .when('/editar/:id', {
        templateUrl: 'partials/editar.html',
        controller: edicionController
    })
    .otherwise({
        redirectTo: '/inicio'
    });
}]);
/*
todo.config([ '$routeProvider' ], function( $routeProvider){

	$routeProvider.
		when('/')
})

*/