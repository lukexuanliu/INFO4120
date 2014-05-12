<?php

echo "Downloading files from ftp server <br />";

// define some variables
$local_file1 = 'sample.txt';
$local_file2 = 'samples.txt';
$local_file3 = 'training.txt';
$server_file1 = './indoor_localization_system/sample.txt';
$server_file2 = './indoor_localization_system/samples.txt';
$server_file3 = './indoor_localization_system/training.txt';

// set up basic connection
$ftp_server = 'kishou.pair.com';
$conn_id = ftp_connect($ftp_server);

// login with username and password
$ftp_user_name = 'dburbank_taid';
$ftp_user_pass = 'fYW6diBhoH9i';
$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);

// try to download $server_file and save to $local_file
if (ftp_get($conn_id, $local_file1, $server_file1, FTP_BINARY)) {
    echo "Successfully written to $local_file1 <br />";
} else {
    echo "There was a problem with $local_file1";
}

if (ftp_get($conn_id, $local_file2, $server_file2, FTP_BINARY)) {
    echo "Successfully written to $local_file2 <br />";
} else {
    echo "There was a problem with $local_file2";
}

if (ftp_get($conn_id, $local_file3, $server_file3, FTP_BINARY)) {
    echo "Successfully written to $local_file3 <br />";
} else {
    echo "There was a problem with $local_file3";
}

// close the connection
ftp_close($conn_id);

?>
