<?php 
    session_start();
    include("head.php");
    if(!$_SESSION['id']){
       header("location:login.php");
       exit();
   }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login page</title>
   
</head>
<body>
    <form action="" method="post" >
        <label for="name">Name</label><br>
        <input type="text" name="name" id="name" >
        <label for="Prenom">Prenom</label><br>
        <input type="text" name="Prenom" id="Prenom" >
        <label for="Cin">Cin</label><br>
        <input type="text" name="Cin" id="Cin" >
        <button name="upload">Envoyer</button>
        <button ><a href="liste.php">Affiche les etudients</a></button>
    </form>
</body>
</html>
<?php 
  include("connexion.php");
  
  if(isset($_POST['upload'])){
    $name = $_POST['name'];
    $prenom = $_POST['Prenom'];
    $cin = $_POST['Cin'];

    $sql = "INSERT INTO etudient (nom,prenom,CIN) VALUES ('$name','$prenom','$cin')";
    mysqli_query($conn,$sql);
    header('location: ajouter1.php');
    mysqli_close($conn);
   
  }
   
?>

<style>
 form {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            box-sizing: border-box;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }

        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        input[type="text"]:focus {
            border-color: #007bff;
            outline: none;
        }

        button {
            background-color: #007C86;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
            margin-right: 10px;
        }

        button a {
            color: white;
            text-decoration: none;
        }

        button:hover {
            background-color: #0056b3;
        }

        button:last-child {
            background-color: #6c757d;
        }

        button:last-child:hover {
            background-color: #5a6268;
        }

        button:last-child a {
            color: white;
        }
</style>