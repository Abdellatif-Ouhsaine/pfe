<?php 
  include("connexion.php");
  $ID  = $_GET['id'] ;
  $sql = "DELETE from etudient where id=$ID";
  mysqli_query($conn,$sql);
  header("location: liste.php");
  mysqli_close($conn);
?>
