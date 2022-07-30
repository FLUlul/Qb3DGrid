<?php

ini_set('xdebug.var_display_max_depth', -1);
ini_set('xdebug.var_display_max_children', -1);
ini_set('xdebug.var_display_max_data', -1);

$data = file_get_contents('data.json');
$data = json_decode($data, true);

for ($i=0; $i < count($data); $i++) {
    $newData   = file_get_contents('three.json');
    $newData   = json_decode($newData, true);
    $newData[] = $data[$i];
    $newData   = json_encode($newData, JSON_PRETTY_PRINT);
    file_put_contents('three.json', $newData);
    usleep(5000);
    echo time() . ' Iterazione n.' . $i.  '<br>';
}