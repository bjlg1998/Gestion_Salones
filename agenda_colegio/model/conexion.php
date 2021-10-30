<?php
    class connection{
        public $host = 'localhost';
        public $dbname = 'agenda_colegio';
        public $username = 'root';
        public $password = '';
        public function pdo()
        {
            try {
                $db = new PDO('mysql:host=localhost;dbname=agenda_colegio', 'root', '');
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                if ($db) {
                    return $db;
                }
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }
    }
?>