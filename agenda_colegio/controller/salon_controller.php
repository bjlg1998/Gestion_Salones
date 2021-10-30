<?php
require_once('../model/salon_model.php');
$salon = new salon_model();
switch ($_POST['accion']) {
    case 'guardar_salon':
        echo json_encode($salon->guardar_salon($_POST['edificio_salon'], $_POST['fecha_salon'], $_POST['descripcion_salon']));
        break;
    case 'editar_salon':
        echo json_encode($salon->editar_salon($_POST['edificio_salon'], $_POST['fecha_salon'], $_POST['descripcion_salon'],$_POST['id_salon']));
        break;
    case 'eliminar_salon':
        echo json_encode($salon->eliminar_salon($_POST['id_salon']));
        break;
    case 'listar_salon':
        echo json_encode($salon->listar_salon());
        break;
}

?>