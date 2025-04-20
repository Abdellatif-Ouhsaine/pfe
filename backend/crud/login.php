<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>

</head>
<body>
    <div class="login-container">
        <form action="" method="post">
            <label for="login">Login</label>
            <input type="text" id="login" name="login">
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <button type="submit" class="btn btn-success" name="submit">Submit</button>
            <button class="btn btn-warning"><a href="signin.php">Sign in</a></button>
        </form>
    </div>
</body>
</html>
<?php 
  session_start();
  include("connexion.php");
  if(isset($_POST['submit'])){
    $login = $_POST['login'];
    $pass = $_POST['password'];

    $sql = "SELECT * from prof where login='$login' and password='$pass'";
    $res = mysqli_query($conn,$sql);

    if($res->num_rows >0){
        while($row=$res->fetch_assoc()){
            $_SESSION['id'] = $row['idp'];
            header("location:ajouter1.php");
            exit();
        }
    }else{
        echo "<script>alert('error in password or login')</script>";
    }
  }
  
?> 
<style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            font-family: Arial, sans-serif;
        }
        .login-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
        }
        .login-container label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
            color: #495057;
        }
        .login-container input {
            width: calc(100% - 20px);
            padding: 0.5rem;
            margin-bottom: 1rem;
            border: 1px solid #ced4da;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1rem;
        }
        .login-container .btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
        }
        .btn-success {
            background: #28a745;
            color: white;
            margin-right: 1rem;
            transition: background 0.3s ease;
        }
        .btn-success:hover {
            background: #218838;
        }
        .btn-warning {
            background: #ffc107;
            transition: background 0.3s ease;
        }
        .btn-warning:hover {
            background: #e0a800;
        }
        .btn-warning a {
            text-decoration: none;
            color: black;
        }
        .btn-warning a:hover {
            color: white;
        }
    </style>