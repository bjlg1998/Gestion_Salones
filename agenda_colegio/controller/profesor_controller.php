<?php
require_once('../model/profesor_model.php');
$profesor = new profesor_model();
switch ($_POST['accion']) {
    case 'guardar_profesor':
        echo json_encode($profesor->guardar_profesor($_POST['nombre_profesor'], $_POST['especialidad']));
        break;
    case 'editar_profesor':
        echo json_encode($profesor->editar_profesor($_POST['nombre_profesor'], $_POST['especialidad'], $_POST['id_profesor']));
        break;
    case 'eliminar_profesor':
        echo json_encode($profesor->eliminar_profesor($_POST['id_profesor']));
        break;
    case 'listar_profesor':
        echo json_encode($profesor->listar_profesor());
        break;
}

?>