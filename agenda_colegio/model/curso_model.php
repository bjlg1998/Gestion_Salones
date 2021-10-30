<?php
require_once('conexion.php');
    class curso_model{
        public function __CONSTRUCT()
        {
            $this->con = new connection();
            $this->bdh = $this->con->pdo();
        }
        public function guardar_curso($nombre)
        {
            $sql = "INSERT INTO curso (nombre, estado) VALUES (:nombre, 1)";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':nombre',$nombre,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
        public function editar_curso($nombre, $id_curso)
        {
            $sql = "UPDATE curso SET nombre = :nombre WHERE id_curso = :id_curso";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':nombre',    $nombre,     PDO::PARAM_STR);
            $stmt->bindParam(':id_curso',  $id_curso,   PDO::PARAM_INT);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
        public function listar_curso()
        {
            $datos = null;
            $sql = "SELECT id_curso, nombre FROM curso WHERE estado = 1";
            $stmt = $this->bdh->prepare($sql);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            try{
                $stmt->execute();
                while($rows = $stmt->fetch()){
                  $datos[] = $rows;
                }
                $stmt = null;
            }catch(PDOException $e){
            $this->con->capturar_error_pdo($e,'listar_curso',$sql);
            }
            return $datos;
            
        }
        public function eliminar_curso($id_curso)
        {
            $sql = "UPDATE curso SET estado = 0 WHERE id_curso = :id_curso AND estado = 1";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':id_curso', $id_curso,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
    }
?>