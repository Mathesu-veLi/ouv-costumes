<?php

include 'config.php';
session_start();

function send_whatsapp($message = "Test")
{
    $phone = "+557197044006";
    $apikey = "2078976";

    $url = 'https://api.callmebot.com/whatsapp.php?source=php&phone=' . $phone . '&text=' . urlencode($message) . '&apikey=' . $apikey;

    if ($ch = curl_init($url)) {
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $html = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return (int) $status;
    } else {
        return false;
    }
}
$user_id = $_SESSION['user_id'];
$user_name = $_SESSION['user_name'];
if (isset($_GET['pay'])) {
    if (!isset($user_id)) {
        header('location:login.php');
    } else {
        $cart_query = mysqli_query($conn, "SELECT * FROM `cart` WHERE user_id = '$user_id'") or die('query failed');
        $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE id = '$user_id'") or die('query failed');
        $row = mysqli_fetch_assoc($select);
        $items = '';
        $grand_total = 0;
        if (mysqli_num_rows($cart_query) > 0) {
            while ($fetch_cart = mysqli_fetch_assoc($cart_query)) {
                $items .= "{$fetch_cart['name']} ({$fetch_cart['quantity']})  ";
                $grand_total += $fetch_cart['price'] * $fetch_cart['quantity'];
                mysqli_query($conn, "DELETE FROM `cart` WHERE id = {$fetch_cart['id']}") or die('query failed');
            }
            mysqli_query($conn, "INSERT INTO `orders` (user_id, user_name, items) VALUES ('$user_id', '$user_name', '$items')") or die('query failed');
            $grand_total = 'R$' . number_format($grand_total, 2);
            send_whatsapp("Nova compra na OUV-Shop!\nO usuário {$user_name} acaba de comprar {$items}\nO preço total foi de {$grand_total}\nO endereço de {$user_name} é:\nCEP: {$row['cep']}\nEstado: {$row['estado']}\nCidade: {$row['cidade']}\nRua: {$row['rua']}\nNúmero: {$row['numero']}\nComplemento: {$row['complemento']}");
        }
    }
}

if (isset($_GET['logout'])) {
    unset($user_id);
    session_destroy();
}

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <script src="https://kit.fontawesome.com/0a970faf9c.js" crossorigin="anonymous"></script>
    <title>OUV Trajes</title>
</head>

<body id="index">
    <header>
        <nav class="navbar">
            <div class="hamb">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <a href="" class="logo"><img src="img/logo.png" alt="logo" width="180"></a>
            <ul class="nav-menu" style="width: 100%; justify-content: center;">
                <li class="nav-item"><a href="index.php" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="comprar.php" class="nav-link">Comprar</a></li>
                <li class="nav-item"><a href="contato.php" class="nav-link">Contato</a></li>
                <?php if (isset($user_id)) {

                    $user_name = $_SESSION['user_name'];
                    echo '
                            <li class="dropdown">
                                <p style="color: white">' . $user_name . '&nbsp&nbsp<i class="fas fa-chevron-down"></i></p>
                                <ul>
                                    <li><a href="index.php?logout">Logout</a></li>
                                </ul>
                            </li>
                            ';
                } ?>
            </ul>
            <a href="cart.php"><img src="img/shopping-cart-white.png" class="cart-img" alt="Carrinho" width="50"></a>
        </nav>
    </header>
    <div class="banner"><img src="img/banner.png" alt=""></div>
    <div class="sobre">
        <div class="text">
            <h1>Sobre a nossa empresa</h1>
            <p>Especializada em camisas de futebol e artigos esportivos, a loja virtual surgiu em 2022 na cidade de Salvador(BA) e reúne uniformes completos dos mais variados clubes brasileiros, internacionais e seleções - dos mais consagrados aos menos conhecidos. Com a maior variedade em camisas de times de futebol no mercado nacional, a OUV trabalha em parceria com as principais marcas esportivas para comercializar somente produtos originais e com garantia de qualidade. Além disso, a loja possui certificados de segurança que oferecem ao cliente um ambiente de compra confiável.
            </p>
        </div>
        <div class="img"><img src="img/camisas-img.png" alt=""></div>
    </div>
    <div class="exemplos">
        <h1>O que ofereçemos</h1>
        <p>Camisas de alta qualidade</p>
        <img src="img/camisas-alta-qualidade.png" alt="">
    </div>
        <center><h1 id="depoimentos" style="color: white">Depoimentos</h1></center>
    <div class="depoimentos">
        
        <span>
            <p>Comprei pro meu filho e ele adorou!</p>
            <p>Cristiane Alves, 42</p>
        </span>
        <span>
            <p>As camisas são lindas! Comprei 2 para usar com meu namorado!</p>
            <p>Lorena Carvalho, 24</p>
        </span>
        <span>
            <p>O tecido delas é ótimo</p>
            <p>Fernando Moares, 20</p>
        </span>
    </div>
    <div class="colecaocompleta">
        <h1>Coleção completa</h1>
        <img src="img/colecao-completa.png" alt="">
    </div>
    <footer>
        <div>
            <h1>Endereço</h1>
            <p>Rua Armando Novais Silveira, 6 - Salvador - BA</p>
        </div>
        <div>
            <h1>E-mail</h1>
            <p>joaquimgameplays@gmail.com</p>
        </div>
        <div>
            <h1>Telefone</h1>
            <p>(71) 99704-4006</p>
        </div>
    </footer>
    <script src="mobile-menu.js"></script>
</body>

</html>