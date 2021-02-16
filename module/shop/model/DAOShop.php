<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/cars/FW_PHP_OO_MVC_JQuery/';
include($path . "model/connect.php");

class DAOShop
{

    function load_filters()
    {
        $sql = "SELECT brand,count(brand) AS num FROM cars\n"

            . "GROUP BY brand\n"

            . "ORDER BY count(brand) DESC";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $resArray[] = $row;
        }
        return $resArray;
    }
    function details($registration)
    {
        $sql = "SELECT i.src AS srcimg,c.* FROM cars c
            RIGHT JOIN img i
            ON c.registration=i.id
            WHERE registration='$registration'";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        $result = $res->fetch_assoc();
        return $result;
    }

    function getmap($lat, $lon)
    {
        $sql = "SELECT price,carcondition,brand,model,src,lat,lon,registration,ABS(ABS({$lat} - lat)) + ABS(ABS({$lon} - lon)) AS diftotal from cars c
                    LEFT JOIN img i
                    ON i.id=c.registration
                    ORDER BY diftotal 
                    LIMIT 5";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $resArray[] = $row;
        }
        return $resArray;
    }
    function search($keyword)
    {
        $sql = "SELECT * FROM `cars` WHERE `brand` LIKE '%{$keyword}%' OR `model` LIKE '%{$keyword}%' OR `category` LIKE '%{$keyword}%'";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $resArray[] = $row;
        }
        return $resArray;
    }

    function filter($keyword, $brand, $condition, $minprice, $maxprice,$showing,$page)
    {
        if ($minprice == "null") {
            $minprice = 100;
        }
        if ($maxprice == "null") {
            $maxprice = 99999999;
        }

        $from = $showing*($page-1);
        
        $sql = "SELECT * FROM `cars`
        WHERE `brand` LIKE '{$brand}' AND `carcondition` LIKE '{$condition}' AND `category` LIKE '%{$keyword}%' AND `price` BETWEEN '{$minprice}' AND '{$maxprice}' 
        LIMIT {$from},{$showing}";
        // $sql = "SELECT * FROM `cars`
        // WHERE `brand` LIKE '{$brand}' AND `carcondition` LIKE '{$condition}' AND `category` LIKE '%{$keyword}%' AND `price` BETWEEN '{$minprice}' AND '{$maxprice}'";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $resArray[] = $row;
        }

        return $resArray;
    }
    function pagination($keyword, $brand, $condition, $minprice, $maxprice,$showing,$page)
    {
        if ($minprice == "null") {
            $minprice = 100;
        }
        if ($maxprice == "null") {
            $maxprice = 99999999;
        }

        // $from = $showing*($page-1);
        
        // $sql = "SELECT * FROM `cars`
        // WHERE `brand` LIKE '{$brand}' AND `carcondition` LIKE '{$condition}' AND `category` LIKE '%{$keyword}%' AND `price` BETWEEN '{$minprice}' AND '{$maxprice}' 
        // LIMIT {$from},{$showing}";
        $sql = "SELECT * FROM `cars`
        WHERE `brand` LIKE '{$brand}' AND `carcondition` LIKE '{$condition}' AND `category` LIKE '%{$keyword}%' AND `price` BETWEEN '{$minprice}' AND '{$maxprice}'";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $resArray[] = $row;
        }

        return $resArray;
    }
        
    
    function search_brand($keyword)
    {
        $sql = "SELECT * FROM `cars` WHERE `brand` LIKE '{$keyword}'";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $resArray[] = $row;
        }
        return $resArray;
    }



    function check_key($value)
    {
        $sql = "SELECT Registration FROM cars";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        foreach ($res as $existentkey) {
            if ($existentkey["Registration"] == $value) {
                return false;
            }
        }
        return true;
    }
}
