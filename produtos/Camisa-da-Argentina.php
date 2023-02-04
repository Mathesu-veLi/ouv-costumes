<?php

    include '../config.php';
    session_start();

    $user_id = $_SESSION['user_id'];
    
    if(isset($_POST['add_to_cart']))
    {   
        $product_name = $_POST['product_name'];
        $product_price = $_POST['product_price'];
        $product_image = $_POST['product_image'];
        $product_file = $_POST['product_file'];
        $product_quantity = $_POST['product_quantity'];
        

        $select_cart = mysqli_query($conn, "SELECT * FROM `cart` WHERE name = '$product_name' AND user_id = '$user_id'") or die ('query failed');

        if(!isset($user_id))
        {
            header('location: ../login.php');
        }

        
        if(mysqli_num_rows($select_cart) > 0)
        {
            $message[] = 'Produto já adicionado ao carrinho!';
        }else
        {
            mysqli_query($conn, "INSERT INTO `cart` (user_id, name, price, image, file, quantity) VALUES ('$user_id', '$product_name', '$product_price', '$product_image', '$product_file', '$product_quantity')") or die('query failed');
            $message[] = 'Produto adicionado ao carrinho!';
        }
    };

?>

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/style.css">
        <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon">
        <title>Camisa da Argentina - OUV Shop</title>
    </head>
    <body class="produto-back">
    <header>
        <nav class="navbar">
            <div class="hamb">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <a href="" class="logo"><img src="../img/logo.png" alt="logo" width="180"></a>
            <ul class="nav-menu" style="width: 100%; justify-content: center;">
                <li class="nav-item"><a href="../index.php" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="../comprar.php" class="nav-link">Comprar</a></li>
                <li class="nav-item"><a href="../contato.php" class="nav-link">Contato</a></li>
                <?php if (isset($user_id)) {

                    $user_name = $_SESSION['user_name'];
                    echo '
                            <li class="dropdown">
                                <p style="color: white">' . $user_name . '&nbsp&nbsp<i class="fas fa-chevron-down"></i></p>
                                <ul>
                                    <li><a href="../index.php?logout">Logout</a></li>
                                </ul>
                            </li>
                            ';
                } ?>
            </ul>
            <a href="cart.php"><img src="../img/shopping-cart-white.png" alt="Carrinho" width="50"></a>
        </nav>
    </header>
        <?php

            if(isset($message))
            {
                foreach($message as $message)
                {
                    echo '<div class="message" onclick="this.remove();">'.$message.'</div>';
                }
            }

        ?>
        <div class="nav-pages">
                        <ol>
                            <li><a href="../index.html">Inicio</a></li>
                            <li><a href="../comprar.html">Comprar</a></li>
                            <li>Camisa da Argentina</li>
                        </ol>
        </div>
        <main>
            <form action="" method="post">
                <center class="title"><h2>Camisa da Argentina</h2></center>
                <div class="produto">
                    <center class="mobile">
                        <div class="mobile-img"><img src="https://static1.s123-cdn-static-a.com/uploads/7229753/400_639c10fbe322c.jpg" alt="Camisa da Argentina"></div>
                        <div class="inf">
                            <p>• Camisa 100% poliéster;</p>
                            <p>• Logotipo da marca bordado;</p>
                            <p>• Logotipo da equipe bordado;</p>
                            <p>• Tecnologia anti-suor</p>
                            <p>• Corte padrão para um toque descontraído e tranquilo.</p>
                            <p>• Lavável à máquina</p>
                            <p>• Importado</p>
                            <div class="precog">
                                <h3>R$146</h3>
                                <h3><small><del>R$399</del></small></h3>
                                <h3 class="precopromo"><small>(-51.33%)</small></h3>
                                <br>
                                <br>
                                <h2 class="marca">Marca: Adidas</h2>
                            </div>
                        </div>
                    </center>
                    <img class="pc" src="https://static1.s123-cdn-static-a.com/uploads/7229753/400_639c10fbe322c.jpg" alt="Camisa da Argentina">
                    <div class="inf pc">
                        <p>• Camisa 100% poliéster;</p>
                        <p>• Logotipo da marca bordado;</p>
                        <p>• Logotipo da equipe bordado;</p>
                        <p>• Tecnologia anti-suor;</p>
                        <p>• Corte padrão para um toque descontraído e tranquilo;</p>
                        <p>• Lavável à máquina;</p>
                        <p>• Importado;</p>
                        <div class="precog">
                            <h3>R$146.00</h3>
                            <h3><small><del>R$399.00</del></small></h3>
                            <h3 class="precopromo"><small>(-51.33%)</small></h3>
                            <br>
                            <br>
                            <h2 class="marca">Marca: Adidas</h2>
                        </div>
                    </div>
                </div>
                
                <div class="car-quant">
                    <center style="width: 100%;"><input type="submit" name="add_to_cart" class="submitBtn" style="width: 22%;" value="Adicionar ao carrinho">
                    <input type="number" name="product_quantity" min="1" value="1" style="padding: 10px; margin-left: 15px;"></center>
                </div>
                <input type="hidden" name="product_image" value="camisa-da-argentina.jpg">
                <input type="hidden" name="product_name" value="Camisa da Argentina">
                <input type="hidden" name="product_price" value="146">
                <input type="hidden" name="product_file" value="Camisa-da-Argentina.php">
            </form>
        </main>
        <script src="../mobile-menu.js"></script>
    </body>
</html>