<?php
require_once('../model/agenda_model.php');
$agenda = new agenda_model();
switch ($_POST['accion']) {
    case 'guardar_agenda':
        echo json_encode($agenda->guardar_agenda($_POST['salon'], $_POST['curso'], $_POST['profesor'], $_POST['fecha'], $_POST['alumno']));
        break;
    case 'editar_agenda':
        // echo json_encode($agenda->editar_agenda($_POST['edificio_agenda'], $_POST['fecha_agenda'], $_POST['descripcion_agenda'],$_POST['id_agenda']));
        break;
    case 'eliminar_agenda':
        echo json_encode($agenda->eliminar_agenda($_POST['id_agenda']));
        break;
    case 'listar_agenda':
        echo json_encode($agenda->listar_agenda());
        break;
    case 'listar_combos':
        echo json_encode($agenda->listar_combos());
        break;
}

?>