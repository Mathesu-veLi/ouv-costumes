<?php

include 'config.php';
session_start();

$user_id = $_SESSION['user_id'];


if (!isset($user_id)) {
    header('location:login.php');
};

if (isset($_POST['checkout'])) {
    $cep = $_POST["CEP"];
    $estado = $_POST["Estado"];
    $cidade = $_POST["Cidade"];
    $bairro = $_POST["Bairro"];
    $rua = $_POST["Rua"];
    $numero = $_POST["Número"];
    $complemento = $_POST["Complemento"];
    mysqli_query($conn, "UPDATE `user_form` SET `cep` = '$cep', `estado` = '$estado', `cidade` = '$cidade', `bairro` = '$bairro', `rua` = '$rua', `numero` = '$numero', `complemento` = '$complemento' WHERE `user_form`.`id` = $user_id
") or die('query failed');
    header('location: http://192.168.100.6/Loja/mercado-pago/index.php');
}

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cadastro de endereços - OUV Shop</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
</head>

<body class="address-body" style="margin-bottom: 0; height: 100%;">
    <script src="https://sdk.mercadopago.com/js/v2"></script>
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

    <div class="address-div" style="display: flex; height: 100vh;">
        <div class="pay">
            <form method="POST" class="address-form form">
                <center>
                    <h2>Endereço</h2>
                </center>
                <div class="address">

                    <div style="width: 70%">
                        <label>CEP</label><br>
                        <input type="text" style="width: 100%" name="CEP" required />
                    </div>

                    <div style="width: 30%;">
                        <label>Estado</label><br>
                        <input type="text" style="width: 100%;" name="Estado" required />
                    </div>

                    <div style="width: 100%">
                        <label>Cidade</label><br>
                        <input type="text" name="Cidade" style="width: 100%" required />
                    </div>

                    <div style="width: 100%">
                        <label>Bairro</label><br>
                        <input type="text" name="Bairro" style="width: 100%" required />
                    </div>

                    <div style="width: 100%">
                        <label>Rua</label><br>
                        <input type="text" name="Rua" style="width: 100%" required />
                    </div>

                    <div style="width: 30%">
                        <label style="padding-left: 3px;">Número</label><br>
                        <input type="text" name="Número" id="num" style="width: 100%" required />
                    </div>

                    <div style="width: 70%;">
                        <label>Complemento</label><br>
                        <input type="text" name="Complemento" style="width: 100%" id="complemento" required />
                    </div>
                    <input type="submit" name="checkout" class="submitBtn">
                </div>


            </form>
        </div>

        <div class="products">
            <h2>Produtos</h2>
            <?php
            $cart_query = mysqli_query($conn, "SELECT * FROM `cart` WHERE user_id = '$user_id'") or die('query failed');
            $grand_total = 0;
            if (mysqli_num_rows($cart_query) > 0) {
                while ($fetch_cart = mysqli_fetch_assoc($cart_query)) {
            ?>
                    <div class="info">
                        <p><?php echo $fetch_cart['name']; ?> (<?php echo $fetch_cart['quantity'] ?>)</p>
                        <p>R$<?php echo $fetch_cart['price'] ?></p>
                    </div>
            <?php
                    $sub_total = $fetch_cart['price'] * $fetch_cart['quantity'];
                    $grand_total += $sub_total;
                }
            }
            ?>
            <div class="info">
                <p><b>Preço total:</b></p>
                <p>R$<?php echo number_format($grand_total, 2) ?></p>
            </div>
        </div>
    </div>

    <script>
        (function() {
            const CEP = document.querySelector("input[name=CEP]");
            CEP.addEventListener('blur', e => {
                const value = CEP.value.replace(/[^0-9]+/, '');
                const url = `https://viacep.com.br/ws/${value}/json/`;
                fetch(url)
                    .then(response => response.json())
                    .then(json => {
                        if (json.logradouro) {
                            document.querySelector('input[name=Rua]').value = json.logradouro;
                            document.querySelector('input[name=Bairro]').value = json.bairro;
                            document.querySelector('input[name=Cidade]').value = json.localidade;
                            document.querySelector('input[name=Estado]').value = json.uf;
                        }
                    });
            });
        })();
    </script>
    <script src="mobile-menu.js"></script>
</body>

</html>