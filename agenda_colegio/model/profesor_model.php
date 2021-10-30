<?php
require_once('conexion.php');
    class profesor_model{
        public function __CONSTRUCT()
        {
            $this->con = new connection();
            $this->bdh = $this->con->pdo();
        }
        public function guardar_profesor($nombre, $especialidad)
        {
            $sql = "INSERT INTO profesor (nombre, especialidad, estado) VALUES (:nombre, :especialidad, 1)";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':nombre',$nombre,PDO::PARAM_STR);
            $stmt->bindParam(':especialidad',$especialidad,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
        public function editar_profesor($nombre, $especialidad, $id_profesor)
        {
            $sql = "UPDATE profesor SET nombre = :nombre, especialidad = :especialidad WHERE id_profesor = :id_profesor";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':nombre',    $nombre,     PDO::PARAM_STR);
            $stmt->bindParam(':id_profesor',  $id_profesor,   PDO::PARAM_INT);
            $stmt->bindParam(':especialidad',$especialidad,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
        public function listar_profesor()
        {
            $datos = null;
            $sql = "SELECT id_profesor, nombre, especialidad FROM profesor WHERE estado = 1";
            $stmt = $this->bdh->prepare($sql);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            try{
                $stmt->execute();
                while($rows = $stmt->fetch()){
                  $datos[] = $rows;
                }
                $stmt = null;
            }catch(PDOException $e){
            $this->con->capturar_error_pdo($e,'listar_profesor',$sql);
            }
            return $datos;
            
        }
        public function eliminar_profesor($id_profesor)
        {
            $sql = "UPDATE profesor SET estado = 0 WHERE id_profesor = :id_profesor AND estado = 1";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':id_profesor', $id_profesor,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
    }
?>