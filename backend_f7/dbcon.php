<?php

require __DIR__ . '/vendor/autoload.php';

use Kreait\Firebase\Factory;

$factory = (new Factory)
    ->withServiceAccount('nakain-b5664-firebase-adminsdk-kn3kh-e1639d74a2.json')
    ->withDatabaseUri('https://nakain-b5664-default-rtdb.asia-southeast1.firebasedatabase.app/');

$database = $factory->createDatabase();
