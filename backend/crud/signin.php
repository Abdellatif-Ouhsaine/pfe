<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign-in</title>

</head>
<body>
    <div class="login-container">
        <form action="" method="post">
            <label for="nom">Nom</label>
            <input type="text" id="nom" name="nom">
            <label for="prenom">Prenom</label>
            <input type="text" id="prenom" name="prenom">
            <label for="login">Login</label>
            <input type="text" id="login" name="login">
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <button type="submit" class="btn btn-success" name="submit">Submit</button>
            
        </form>
    </div>
</body>
<?php 
    include("connexion.php");
    if(isset($_POST['submit'])) {
        $login = $_POST['login'];
        $pass = $_POST['password'];
        $sql = "INSERT INTO prof (login, password) VALUES ('$login', '$pass')";
        mysqli_query($conn,$sql);
        mysqli_close($conn);
    }
?>