<?php 
session_start();
   include("connexion.php"); 
  include("head.php");
  if(!$_SESSION['id']){
       header("location:login.php");
       exit();
   } 
  $ID  = $_GET['id'] ;
  $sql = "SELECT * FROM etudient where id=$ID";
  $ras = mysqli_query($conn,$sql);
  if(mysqli_num_rows($ras)>0){
    $row = $ras->fetch_assoc();
    $nom = $row['nom'];
    $PRENOM = $row['prenom'];
    $CIN = $row['CIN'];
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
  <div class="form-container">
    <form action="up.php" method="post" >
        <input type="text" value="<?php echo $ID ?>" name="id" readonly>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" value="<?php echo $nom ?>" >
        <label for="Prenom">Prenom</label>
        <input type="text" name="Prenom" id="Prenom" value="<?php echo $PRENOM ?>" >
        <label for="Cin">Cin</label>
        <input type="text" name="Cin" id="Cin" value="<?php echo $CIN ?>" >
        <button name="update">UPDATE</button>
        <button ><a href="liste.php">Affiche les etudients</a></button>
    </form>
</div>
</body>
</html>
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
        .form-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
        }
        .form-container input,
        .form-container label,
        .form-container button,
        .form-container a {
            display: block;
            width: calc(100% - 20px);
            margin: 10px auto;
        }
        .form-container input {
            padding: 10px;
            border: 1px solid #ced4da;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1rem;
        }
        .form-container button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 20px;
        }
        .btn-success {
            background: #28a745;
            color: white;
            transition: background 0.3s ease;
        }
        .btn-success:hover {
            background: #218838;
        }
        .btn-secondary {
            background: #6c757d;
            color: white;
            text-decoration: none;
            transition: background 0.3s ease;
        }
        .btn-secondary:hover {
            background: #5a6268;
        }
    </style>