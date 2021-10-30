<?php
require_once('../model/curso_model.php');
$curso = new curso_model();
switch ($_POST['accion']) {
    case 'guardar_curso':
        echo json_encode($curso->guardar_curso($_POST['nombre_curso']));
        break;
    case 'editar_curso':
        echo json_encode($curso->editar_curso($_POST['nombre_curso'],$_POST['id_curso']));
        break;
    case 'eliminar_curso':
        echo json_encode($curso->eliminar_curso($_POST['id_curso']));
        break;
    case 'listar_curso':
        echo json_encode($curso->listar_curso());
        break;
}

?>