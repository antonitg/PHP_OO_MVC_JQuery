<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/cars/';
include($path . "module/hello/model/DAOHome.php");
switch ($_GET['op']) {
    case 'rand_prod';
        try {
            $daohome = new DAOHome();
            $rdo = $daohome->rand_prod();
        } catch (Exception $e) {
            echo json_encode("no arriba al daouser");
            exit;
        }
        if (!$rdo) {
            //echo "<script>alert('Acaba en el segon try');</script>";
            echo json_encode("entra al daouser pero acaba mal");
            exit;
        } else {
            echo json_encode($rdo);
            //echo json_encode("error");
            exit;
        }
        break;
    case 'cat';
        try {
            $daohome = new DAOHome();
            $rdo = $daohome->categories();
        } catch (Exception $e) {
            echo json_encode("no arriba al daouser");
            exit;
        }
        if (!$rdo) {
            //echo "<script>alert('Acaba en el segon try');</script>";
            echo json_encode("entra al daouser pero acaba mal");
            exit;
        } else {
            echo json_encode($rdo);
            //echo json_encode("error");
            exit;
        }
        break;
    default;
        include("view/inc/error404.php");
        break;
}









?>