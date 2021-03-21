<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/cars/FW_PHP_OO_MVC_JQuery/';
include($path . "module/shop/model/DAOShop.php");
switch ($_GET['op']) {
    case 'search';
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->search($_GET['keyword']);
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
    case 'getpagination';
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->pagination($_GET['keyword'], $_GET['brand'], $_GET['condition'], $_GET['minprice'], $_GET['maxprice'], $_GET['showing'], $_GET['page']);
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
    case 'filter';
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->filter($_GET['keyword'], $_GET['brand'], $_GET['condition'], $_GET['minprice'], $_GET['maxprice'], $_GET['showing'], $_GET['page'],$_GET['user']);
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

    case 'search_brand';
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->search_brand($_GET['brand']);
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
    case 'load_filters';
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->load_filters();
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
    case 'details';
        try {
            $daoshop = new DAOShop();
            $daoshop->addview($_GET['id']);
            $rdo = $daoshop->details($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("no arriba al daouser");
            exit;
        }
        if (!$rdo) {
            echo json_encode("entra al daouser pero acaba mal");
            exit;
        } else {
            echo json_encode($rdo);
            exit;
        }
        break;
    case 'getmap';
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->getmap($_GET['lat'], $_GET['lon']);
        } catch (Exception $e) {
            echo json_encode("no arriba al daouser");
            exit;
        }
        if (!$rdo) {
            echo json_encode("entra al daouser pero acaba mal");
            exit;
        } else {
            echo json_encode($rdo);
            exit;
        }
        break;
    case 'fav';
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->fav($_GET['user'], $_GET['id']);
        } catch (Exception $e) {
            echo json_encode("no arriba al daouser");
            exit;
        }
        if (!$rdo) {
            echo json_encode("entra al daouser pero acaba mal");
            exit;
        } else {
            echo json_encode($rdo);
            exit;
        }
        break;
        case 'unfav';
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->unfav($_GET['user'], $_GET['id']);
        } catch (Exception $e) {
            echo json_encode("no arriba al daouser");
            exit;
        }
        if (!$rdo) {
            echo json_encode("entra al daouser pero acaba mal");
            exit;
        } else {
            echo json_encode($rdo);
            exit;
        }
        break;
    default;

        break;
}
