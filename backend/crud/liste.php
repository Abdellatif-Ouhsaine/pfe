<?php session_start();
  include("connexion.php");
  include("head.php"); 
    if(!$_SESSION['id']){
       header("location:login.php");
       exit();
   }
  $sql = "SELECT * FROM etudient";
  $res = mysqli_query($conn,$sql);
  
  ?>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
<div class="table-container">
    <form action="" method="get">
    <table >
        <thead>
            <td>id</td>
            <td>nom</td>
            <td>prenom</td>
            <td>cin</td>
            <td>action</td>
        </thead>
        <tbody>
            <?php if(mysqli_num_rows($res)> 0 ) {
                  while($row = $res->fetch_assoc()){
                    echo "<tr>
                       <td>".$row['id']."</td>
                    
                       <td>".$row['nom']."</td>
                   
                       <td>".$row['prenom']."</td>
                    
                       <td>".$row['CIN']."</td>
                       <td><button class='btn btn-outline-danger'><a href='delete.php? id=$row[id]'>DELETE</a></button><button class='btn btn-outline-info'><a href='update.php? id=$row[id]'>UPDATE</a></button></td>
                       
                    </tr>";
                  };
                };?>
        </tbody>
    </table>
    </form>
    </div>
  </body>
  </html>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        .table-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
            color: #333;
            font-weight: bold;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
        .btn {
            padding: 5px 10px;
            border: 1px solid transparent;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
        }
        .btn-outline-danger {
            border-color: #dc3545;
            color: #dc3545;
        }
        .btn-outline-danger:hover {
            background-color: #dc3545;
            color: white;
        }
        .btn-outline-info {
            border-color: #17a2b8;
            color: #17a2b8;
        }
        .btn-outline-info:hover {
            background-color: #17a2b8;
            color: white;
        }
        a{
          text-decoration:none;
          color:black;
        }
    </style>