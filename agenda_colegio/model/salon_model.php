<?php
require_once('conexion.php');
    class salon_model{
        public function __CONSTRUCT()
        {
            $this->con = new connection();
            $this->bdh = $this->con->pdo();
        }
        public function guardar_salon($edificio, $fecha, $descripcion)
        {
            $sql = "INSERT INTO salon (edificio, descripcion, estado, fecha_registro) VALUES (:edificio, :descripcion, 1, :fecha)";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':edificio',$edificio,PDO::PARAM_STR);
            $stmt->bindParam(':fecha',$fecha,PDO::PARAM_STR);
            $stmt->bindParam(':descripcion',$descripcion,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
        public function editar_salon($edificio,  $fecha, $descripcion, $id_salon)
        {
            $sql = "UPDATE salon SET edificio = :edificio , descripcion = :descripcion, fecha_registro = :fecha WHERE id_salon = :id_salon";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':edificio',    $edificio,   PDO::PARAM_STR);
            $stmt->bindParam(':id_salon',    $id_salon,   PDO::PARAM_INT);
            $stmt->bindParam(':descripcion', $descripcion,PDO::PARAM_STR);
            $stmt->bindParam(':fecha',       $fecha,      PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
        public function listar_salon()
        {
            $datos = null;
            $sql = "SELECT id_salon, edificio, descripcion, fecha_registro FROM salon WHERE estado = 1";
            $stmt = $this->bdh->prepare($sql);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            try{
                $stmt->execute();
                while($rows = $stmt->fetch()){
                  $datos[] = $rows;
                }
                $stmt = null;
            }catch(PDOException $e){
                $this->con->capturar_error_pdo($e,'listar_salon',$sql);
            }
            return $datos;
            
        }
        public function eliminar_salon($id_salon)
        {
            $sql = "UPDATE salon SET estado = 0 WHERE id_salon = :id_salon AND estado = 1";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':id_salon', $id_salon,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
    }
?>