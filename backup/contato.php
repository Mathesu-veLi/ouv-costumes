<?php
include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];
$user_name = $_SESSION['user_name'];
?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <title>OUV Trajes - Contato</title>
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
                <li class="nav-item"><a href="contato.php" class="nav-link">Contato</a></li>                <?php if (isset($user_id)) {

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
        <center class="title">
            <h2>Contato</h2>
        </center>

        <center class="contato">
            <p>Salvador, Bahia, Brasil</p>
            <p><a href="tel:+5571997044006">+55 71 99704-4006</a></p>
            <p><a href="mailto:joaquim8181@gmail.com">joaquim8181@gmail.com</a></p>
            <br>
            <form action="https://formsubmit.co/joaquim8181@gmail.com" method="POST" class="form-contact form">
                <input type="text" name="Nome" placeholder="Digite seu nome" required>
                <input type="email" name="E-mail" placeholder="Digite seu e-mail" required>

                <textarea name="Mensagem" cols="30" rows="10" placeholder="Digite sua mensagem" required></textarea>

                <button type="submit" class="env">Enviar</button>

                <input type="hidden" name="_subject" value="Nova mensagem, senhor Joaca">
                <input type="text" name="_honey" style="display: none;">
                <input type="hidden" name="_captcha" value="false">
                <input type="hidden" name="_next" value="ouv.netlify.app/contato.html">
            </form>
        </center>
    </main>
    <script src="mobile-menu.js"></script>
</body>

</html>