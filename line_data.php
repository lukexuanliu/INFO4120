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

    $final_data = array();

    /*the three BSSID we wish to show in the signal strenght line graph*/
    $BSSID1 = "9c:1c:12:e0:dd:d0";
    $BSSID2 = "9c:1c:12:e0:dc:12";
    $BSSID3 = "9c:1c:12:e0:dc:11";
    /*the three BSSID we wish to show in the signal strenght line graph*/


    $result_1 = mysql_query("SELECT * FROM wifi WHERE BSSID = '$BSSID1' ORDER BY id desc LIMIT 20",$con);

    $data1 = array();

    while($row = mysql_fetch_assoc($result_1)){
      $data1[] = $row;
    }

    $final_data[] = $data1;

    $result_2 = mysql_query("SELECT * FROM wifi WHERE BSSID = '$BSSID2' ORDER BY id desc LIMIT 20",$con);

    $data2 = array();

    while($row = mysql_fetch_assoc($result_2)){
      $data2[] = $row;
    }

    $final_data[] = $data2;

    ///
    $result_3 = mysql_query("SELECT * FROM wifi WHERE BSSID = '$BSSID3' ORDER BY id desc LIMIT 20",$con);

    $data3 = array();

    while($row = mysql_fetch_assoc($result_3)){
      $data3[] = $row;
    }

    $final_data[] = $data3;
    //

    print json_encode($final_data);
  }else{
    print 'error';
  }

      mysql_close($con);


?>