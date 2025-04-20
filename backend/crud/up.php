<?php 
  include("connexion.php");
  
  if(isset($_POST['update'])){
    $ID = $_POST['id'] ;
    $name = $_POST['name'];
    $prenom = $_POST['Prenom'];
    $cin = $_POST['Cin'];

    $sql = "UPDATE etudient SET nom='$name' ,prenom='$prenom' ,CIN='$cin' where id=$ID";
    mysqli_query($conn,$sql);
    header("location: liste.php");
    mysqli_close($conn);
  }
   
?>