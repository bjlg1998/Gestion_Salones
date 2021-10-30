<?php
require_once('conexion.php');
    class agenda_model{
        public function __CONSTRUCT()
        {
            $this->con = new connection();
            $this->bdh = $this->con->pdo();
        }
        public function listar_combos(){
            $datos = null;
            $salones = $this->listar_combo_salon();
            $cursos = $this->listar_combo_curso();
            $profesores = $this->listar_combo_profesor();
            $alumnos = $this->listar_combo_alumno();
            $datos['salon'][] = $salones;
            $datos['curso'][] = $cursos;
            $datos['profesor'][] = $profesores;
            // $datos['alumno'][] = $alumnos;
            return $datos;
        }
        public function listar_combo_salon(){
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
                $this->con->capturar_error_pdo($e,'listar_combos',$sql);
            }
            return $datos;
        }
        public function listar_combo_profesor(){
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
                $this->con->capturar_error_pdo($e,'listar_combos',$sql);
            }
            return $datos;
        }
        public function listar_combo_alumno(){
            $datos = null;
            $sql = "SELECT id_alumno, nombre, grado FROM alumnos ";
            $stmt = $this->bdh->prepare($sql);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            try{
                $stmt->execute();
                while($rows = $stmt->fetch()){
                  $datos[] = $rows;
                }
                $stmt = null;
            }catch(PDOException $e){
                $this->con->capturar_error_pdo($e,'listar_combos',$sql);
            }
            return $datos;
        }
        public function listar_combo_curso(){
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
                $this->con->capturar_error_pdo($e,'listar_combos',$sql);
            }
            return $datos;
        }
        public function guardar_agenda($salon, $curso, $profesor, $fecha, $alumno)
        {
            $sql = "INSERT INTO agenda_colegio (fecha_registro, fecha_asignacion, id_profesor, id_salon, id_curso, estado) VALUES (now(), :fecha, :profesor, :salon, :curso, 1)";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':salon',$salon,PDO::PARAM_STR);
            $stmt->bindParam(':profesor',$profesor,PDO::PARAM_STR);
            $stmt->bindParam(':curso',$curso,PDO::PARAM_STR);
            $stmt->bindParam(':fecha',$fecha,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
        }
        // public function editar_salon($edificio,  $fecha, $descripcion, $id_salon)
        // {
        //     $sql = "UPDATE salon SET edificio = :edificio , descripcion = :descripcion, fecha_registro = :fecha WHERE id_salon = :id_salon";
        //     $stmt = $this->bdh->prepare($sql);
        //     $stmt->bindParam(':edificio',    $edificio,   PDO::PARAM_STR);
        //     $stmt->bindParam(':id_salon',    $id_salon,   PDO::PARAM_INT);
        //     $stmt->bindParam(':descripcion', $descripcion,PDO::PARAM_STR);
        //     $stmt->bindParam(':fecha',       $fecha,      PDO::PARAM_STR);
        //     $stmt->execute();
        //     if ($stmt->rowcount()>0) {
        //         return 1;
        //     }else{
        //         return 0;
        //     }
            
        // }
        public function listar_agenda()
        {
            $datos = null;
            $sql = "SELECT 
                        agenda.id_agenda,
                        salon.descripcion AS salon,
                        curso.nombre      AS curso,
                        profesor.nombre   AS profesor,
                        agenda.fecha_asignacion AS fecha
                    FROM agenda_colegio     AS agenda
                        INNER JOIN salon    AS salon    ON (salon.id_salon = agenda.id_salon)
                        INNER JOIN curso    AS curso    ON (curso.id_curso = agenda.id_curso)
                        INNER JOIN profesor AS profesor ON (profesor.id_profesor = agenda.id_profesor)
                    WHERE 
                        agenda.estado = 1
                    ORDER BY agenda.fecha_asignacion ASC";
            $stmt = $this->bdh->prepare($sql);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            try{
                $stmt->execute();
                while($rows = $stmt->fetch()){
                  $datos[] = $rows;
                }
                $stmt = null;
            }catch(PDOException $e){
                $this->con->capturar_error_pdo($e,'listar_agenda',$sql);
            }
            return $datos;
            
        }
        public function eliminar_agenda($id_agenda)
        {
            $sql = "UPDATE agenda_colegio SET estado = 0 WHERE id_agenda = :id_agenda AND estado = 1";
            $stmt = $this->bdh->prepare($sql);
            $stmt->bindParam(':id_agenda', $id_agenda,PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowcount()>0) {
                return 1;
            }else{
                return 0;
            }
            
        }
    }
