<?php

// impostiamo l'header
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

// leggiamo il file riga per riga
$rows = [];
$data = file_get_contents('data.json');
$data = json_decode($data, true);
// foreach (file('data.txt') as $line) {
//     $rows[] = trim($line);
// }

foreach ($data as $line) {
    $rows[] = json_encode($line);
}
// invio del messaggio
echo "data: " . json_encode($rows) . "\n\n";