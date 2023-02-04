<?php

    include 'config.php';
    session_start();

    if(isset($_POST['submit']))
    {
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $pass = mysqli_real_escape_string($conn, $_POST['password']);
        $select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE email = '$email' AND password = '$pass'") or die('query failed');

        if(mysqli_num_rows($select) > 0)
        {
            $row = mysqli_fetch_assoc($select);
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user_name'] = $row['name'];
            header('location:cart.php');
        }else{
            $message[] = 'Senha ou email incorreto!';
        }
    }
?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - OUV Trajes</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/font.css">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
</head>
<body class="regs-log">


    <?php

        if(isset($message))
        {
            foreach($message as $message)
            {
                echo '<div class="message" onclick="this.remove();">'.$message.'</div>';
            }
        }

    ?>


    <div class="form-container form">
        <form action="" method="post">
            <h3>Login</h3>
            <input type="email" name="email" placeholder="Email" required class="box">
            <input type="password" name="password" placeholder="Senha" required class="box">
            <input type="submit" name="submit" class="btn" value="Entrar">
            <p>Não tem uma conta? Registre-se<a href="registro.php">aqui!</a></p>
        </form>
    </div>
</body>
</html>