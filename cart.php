<?php


include 'config.php';
session_start();

$user_id = $_SESSION['user_id'];
$user_name = $_SESSION['user_name'];


if (!isset($user_id)) {
    header('location:login.php');
};

if (isset($_POST['update_cart'])) {
    $update_quantity = $_POST['cart_quantity'];
    $update_id = $_POST['cart_id'];
    mysqli_query($conn, "UPDATE `cart` SET quantity = '$update_quantity' WHERE id = '$update_id'") or die('query failed');
    $message[] = 'Carrinho atualizado com sucesso';
}

if (isset($_GET['remove'])) {
    $remove_id = $_GET['remove'];
    mysqli_query($conn, "DELETE FROM `cart` WHERE id = $remove_id") or die('query failed');
    header('locate:cart.php');
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
    <title>Carrinho - OUV Shop</title>
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
    <?php
    if (isset($message)) {
        foreach ($message as $message) {
            echo '<div class="message" onclick="this.remove();">' . $message . '</div>';
        }
    }
    ?>
    <center>
        <h1 style="margin: 20px">Carrinho</h1>
    </center>

    <div class="shopping-cart">
        <div class="cart mobile">
            <?php

            $cart_query = mysqli_query($conn, "SELECT * FROM `cart` WHERE user_id = '$user_id'") or die('query failed');
            $grand_total = 0;
            if (mysqli_num_rows($cart_query) > 0) {
                while ($fetch_cart = mysqli_fetch_assoc($cart_query)) {
            ?>
                    <div style="padding: 10px; border: 1px solid rgb(100, 100, 100, 0.3
                    );">
                        <center>
                            <div>
                                <p class="name"><?php echo $fetch_cart['name'] ?></p>
                                <img src="products-img/<?php echo $fetch_cart['image'] ?>" width="140" alt="">
                                <p>R$<?php echo $sub_total_visible = number_format($fetch_cart['price'] * $fetch_cart['quantity']) ?></p>
                            </div>
                            <form action="" method="post" class="quant">
                                <input type="hidden" name="cart_id" value="<?php echo $fetch_cart['id']; ?>">
                                <input type="number" min="1" name="cart_quantity" value="<?php echo $fetch_cart['quantity']; ?>">
                                <input type="submit" name="update_cart" value="Atualizar">
                            </form>
                            <hr>
                            <a href="cart.php?remove=<?php echo $fetch_cart['id']; ?>" class="remove" onclick="return confirm('Você tem certeza que deseja remover <?php echo $fetch_cart['name'] ?> do carrinho?')">Remover</a>
                        </center>
                    </div>

                    <?php $sub_total = $fetch_cart['price'] * $fetch_cart['quantity'] ?>
            <?php
                    $grand_total += $sub_total;
                }
            } else {
                echo '<tr style="display: flex; justify-content: center;"><td style="padding:20px;">Nenhum item adicionado ao carrinho</td></tr>';
            }

            ?>
            <hr>
            <div class="table-bottom">
                <p colspan="4">Preço total: </p>
                <p>R$<?php echo number_format($grand_total); ?></p>
            </div>
        </div>

        <div class="cart pc">
            <table>
                <tbody>
                    <?php

                    $cart_query = mysqli_query($conn, "SELECT * FROM `cart` WHERE user_id = '$user_id'") or die('query failed');
                    $grand_total = 0;
                    $products_name = " ";
                    if (mysqli_num_rows($cart_query) > 0) {
                        while ($fetch_cart = mysqli_fetch_assoc($cart_query)) {
                            $products_name .= $fetch_cart['name']." ";
                    ?>
                            <div>
                                <tr>

                                    <td class="click" onclick="window.location = 'produtos/<?php echo $fetch_cart['file'] ?>'"><img src="products-img/<?php echo $fetch_cart['image'] ?>" width="150" alt=""></td>
                                    <td class="click name" onclick="window.location = 'produtos/<?php echo $fetch_cart['file'] ?>'"><?php echo $fetch_cart['name'] ?></td>
                                    <td>
                                        <form action="" method="post" class="quant">
                                            <input type="hidden" name="cart_id" value="<?php echo $fetch_cart['id']; ?>">
                                            <input type="number" min="1" name="cart_quantity" value="<?php echo $fetch_cart['quantity']; ?>">
                                            <input type="submit" name="update_cart" value="Atualizar">
                                        </form>
                                    </td>
                                    <td>R$<?php echo $sub_total_visible = number_format($fetch_cart['price'] * $fetch_cart['quantity'],2) ?></td>
                                    <td><a href="cart.php?remove=<?php echo $fetch_cart['id']; ?>" class="remove" onclick="return confirm('Você tem certeza que deseja remover <?php echo $fetch_cart['name'] ?> do carrinho?')">Remover</a></td>
                                    <?php $sub_total = $fetch_cart['price'] * $fetch_cart['quantity'] ?>
                                </tr>
                            </div>

                    <?php
                            $grand_total += $sub_total;
                        }
                    } else {
                        echo '<tr style="display: flex; justify-content: center;"><td style="padding:20px;">Nenhum item adicionado ao carrinho</td></tr>';
                    }
                    ?>
                    <div class="table-bottom">
                        <td colspan="4">Preço total: </td>
                        <td>R$<?php echo number_format($grand_total,2); ?></td>
                    </div>
                </tbody>
            </table>
        </div>

        <?php
        
        if (mysqli_num_rows($cart_query) > 0) {
            $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE id = '$user_id'") or die('query failed');
            $row = mysqli_fetch_assoc($select);
            echo '<hr style="margin: 20px 0;">';
            if(empty($row['cep']))
            {
                echo '<div class="box-checkout"><a class="checkout" href="address.php">Finalizar Compra</a></div>';
            }else
            {
                echo '<div class="box-checkout"><a class="checkout" onclick="newaddress()">Finalizar Compra</a></div>';
            }
        }
        ?>

    </div>
    <script src="mobile-menu.js"></script>
    <script>
        function newaddress()
        {
            var confir = confirm("Você tem um endereço cadastrado, cujo o cep é <?php echo $row['cep']?>\nAperte OK para usar este endereço ou aperte Cancel para cadastrar um novo")
            if (confir == true)
            {
                location.href = 'mercado-pago/index.php'
            } else
            {
                location.href = 'address.php'
            }
        }
    </script>
</body>

</html>