<?php
$key= $_GET["sk"];
$s="localhost";
$u="root";
$p="";
$d= "marketplace";
$conn=mysqli_connect($s,$u,$p,$d);
$query="select * from job_list where buyer_uname like '%key%'";

$rs=mysqli_query($conn,$query);
$output='';

?>


<table>
    <?php
    if(mysqli_num_rows($rs)>0)
    {
        $output .='<h4 align="center">Search Result </h4>';
        $output .='<div class="table-responsive">
                    <table class="table table bordered">
                    <thead>
                    <th>Sl#</th> 
                    <th> Name</th>
                    <th>Category id</th>
                    <th> Price</th>
                    <th> Quantity</th>
                    <th>Expired Date</th>
                    <th></th>
                    
                </thead>';

        while ($row=mysqli_fetch_assoc($rs))
        { 
           $output .='<tr>
						<td>'.$row["id"].'</td>
						<td>'.$row["buyer_uname"].'</td>
						<td>'.$row["buyer_email"].'</td>
						<td>'.$row["job_desc"].'</td>
						<td>'.$row["job_date"].'</td>
						<td>'.$row["salary"].'</td>
						<td><a href="editproduct.php?id='.$row["p_id"].'" class="btn btn-success">Edit</a></td>
						<td><a href="../controllers/ProductController.php?delete_id='.$row["p_id"].'"class="btn btn-danger">Delete</a></td>
					</tr>';
        }
        echo $output;
    }
    else
    {
        echo'Data Not Found';
    }
   ?>