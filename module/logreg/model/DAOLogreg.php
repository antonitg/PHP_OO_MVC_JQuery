<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/cars/FW_PHP_OO_MVC_JQuery/';
include($path . "model/connect.php");
class DAOLogreg
{
    function register ($pass,$secret,$fullname,$username,$email){
        $pwd_peppered = hash_hmac("sha256", $pass, $secret);
        $pwd_hashed = password_hash($pwd_peppered, PASSWORD_DEFAULT);
        $conexion = connect::con();
        $sql = "INSERT INTO `users` (`fullname`, `username`, `email`, `passwd`) VALUES ('{$fullname}', '{$username}', '{$email}', '{$pwd_hashed}')";
        $res = mysqli_query($conexion, $sql);
        return $res;
    }
    function load_autocomplete($keyword,$condition,$brand)
    {
        $sql = "SELECT model FROM cars 
                WHERE model LIKE '%{$keyword}%' AND carcondition LIKE '{$condition}' AND brand LIKE '{$brand}'";
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            $resArray[] = $row;
        }
        return $resArray;
    }
}
