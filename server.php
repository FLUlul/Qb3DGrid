<?php

// error_reporting(0);

include 'dump.php';
$rows = file_get_contents('data.json');
$rows = json_decode($rows, true);

$start = microtime(true);

$data = [];
for ($i=0; $i < count($rows); $i++) {
    $file      = fopen('three.json', 'r+');
    $newData   = stream_get_contents($file);
    $newData   = json_decode($newData, true);
    $newData[] = $rows[$i];
    $newData   = json_encode($newData, JSON_PRETTY_PRINT);

    rewind($file);
    ftruncate($file);
    fwrite($file, $newData);
    fclose($file);
    usleep(500);

    ob_implicit_flush(1);
    ob_start();
    ob_get_clean();
    echo time() . ' Iterazione n.' . $i.  '<br>' . "\n\r";
    ob_flush();
}

$end = microtime(true) - $start;

echo '<br><br>Tempo impiegato ' . $end;

function printAll(array $array, int &$index = 0) {

    $length = count($array);
    if ($index < $length) {
        echo $array[$index] . '<br>';
        $index++;
        if ($index == 5) {
          dump($array[$index]);
        }
        printAll($array, $index);
    }
}
printAll([1,2,3,4]);
?>