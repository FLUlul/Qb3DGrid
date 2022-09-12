<?php

include 'dump.php';

// create a file json
function populate(string $file, int $quantity) {

    $i = 0;

    while ($i < $quantity) {

        if (!file_exists($file)) {
            $data = file_get_contents($file);
            $data = json_decode($data, true);
        }

        $position = (object)[
            "x" => $i,
            "y" => 0,
            "z" => 0
        ];


        $data[] = $position;

        if ($i > 0) {
            dump($data);
        }

        $data = json_encode($data, JSON_PRETTY_PRINT);

        file_put_contents($file, $data);
        $i++;
        if ($i > 1) {

            dump($i);
        }
        echo 'ok' . '<br>';
    }
}

populate('test.json', 40);