<?php
include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <title>OUV Loja</title>
</head>

<body>
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
            <a href="cart.php"><img src="img/shopping-cart-white.png" alt="Carrinho" width="50"></a>
        </nav>
    </header>
    <main>
        <div class="nw-clct">
            <center class="title">
                <h2>Nova Coleção</h2>
            </center>
            <div class="new-center">
                <div class="camisa">
                    <a href="produtos/Camisa-da-Argentina.php">
                        <div class="arg">
                            <div class="arg-camisa">
                                <img src="https://static1.s123-cdn-static-a.com/uploads/7229753/400_639c10fbe322c.jpg" alt="Camisa da Argentina">
                            </div>
                            <div class="new-title">
                                <h1>Camisa da Argentina</h1>
                                <div class="precos">
                                    <h2><small><del>R$399</del></small></h2>
                                    <h2>R$146</h2>
                                </div>
                            </div>
                            <br>
                            <p>• Camisa 100% poliéster; • Logotipo da marca bordado; • Logotipo da equipe bordado; • Tecnologia anti-...</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </main>
    <script src="mobile-menu.js"></script>
</body>

</html>