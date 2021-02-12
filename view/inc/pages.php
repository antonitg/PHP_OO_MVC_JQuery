<?php
if (isset($_GET['page'])){
	switch($_GET['page']){
		case "controller_user";
			include("module/cars/controller/".$_GET['page'].".php");
			break;
		case "aboutus";
			include("module/aboutus/view/".$_GET['page'].".html");
			break;
		case "404";
			include("view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include("view/inc/error".$_GET['page'].".php");
			break;
		case "shop";
			include("module/shop/view/".$_GET['page'].".html");
		break;
        default;
        include("module/hello/view".$_GET['page'].".html");
			break;
    }
} else {
    include("module/hello/view/hello.html");
}
?>