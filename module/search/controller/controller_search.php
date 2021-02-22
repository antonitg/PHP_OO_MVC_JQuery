<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/cars/FW_PHP_OO_MVC_JQuery/';
include($path . "module/search/model/DAOSearch.php");
switch ($_GET['op']) {
    case 'load_brands';
        try {
            $daosearch = new DAOSearch();
            $rdo = $daosearch->load_brands($_GET['condition']);
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
    case 'load_autocomplete';
        try {
            $daosearch = new DAOSearch();
            $rdo = $daosearch->load_autocomplete($_GET['keyword'],$_GET['condition'],$_GET['brand']);
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

        break;
}
