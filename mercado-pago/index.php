<?php
include '../config.php';
session_start();

$user_id = $_SESSION['user_id'];
if (!isset($user_id)) {
    header('location:../login.php');
};

require_once 'vendor/autoload.php';

MercadoPago\SDK::setAccessToken("TEST-2745555273761282-012820-98b37a0eede4538acf8e3688eb7c7574-1257000430");
$preference = new MercadoPago\Preference();

$cart_query = mysqli_query($conn, "SELECT * FROM `cart` WHERE user_id = '$user_id'") or die('query failed');

$items = array();
$x = 1;

if (mysqli_num_rows($cart_query) > 0) {
    while ($fetch_cart = mysqli_fetch_assoc($cart_query)) {
        ${"item$x"} = new MercadoPago\Item;
        ${"item$x"}->title = $fetch_cart['name'];
        ${"item$x"}->quantity = $fetch_cart['quantity'];
        ${"item$x"}->unit_price = $fetch_cart['price'];
        array_push($items, ${"item$x"});
        $x += 1;
    }
}

$preference->items = $items;

$preference->back_urls = array(
    "success" => 'http://localhost/OUV-Trajes/index.php?pay',
    "failure" => '',
    "pending" => ''
);

$preference->save();

$link = $preference->init_point;
header('location: ' . $link);
