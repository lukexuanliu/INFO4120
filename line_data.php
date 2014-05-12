<?php
  if($_POST){
      
    #connect to mysql
    $host="db147d.pair.com";
    $username="dburbank_10";
    $password="xn3YV3fE";
      $con = mysql_connect('db147d.pair.com', 'dburbank_10', 'xn3YV3fE');
      mysql_select_db('dburbank_taids',$con);
    if (!$con){
      die('Could not connect: ' . mysql_error());
    }

    $BSSID1 = "9c:1c:12:e0:dd:d0";
    $result_1 = mysql_query("SELECT * FROM wifi WHERE BSSID = '$BSSID1' ORDER BY id desc",$con);

    $data = array();

    while($row = mysql_fetch_assoc($result_1)){
      $data[] = $row;
  }

    print json_encode($data);
  }else{
    print 'error';
  }

      mysql_close($con);


?>