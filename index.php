<!doctype html>
<html><head><title>Cryptogram Solver</title>
<link rel="stylesheet" href="crypto.css" type="text/css">
</head><body>
<?php

$puzzles = json_decode(file_get_contents('grams.json'), true);

#echo json_last_error_msg() , "<br>";
#var_dump($puzzles);

$puzzle = $puzzles[ array_rand($puzzles) ];

#var_dump($puzzle);
#echo $puzzle['author'];

$pzlcode = '';

foreach ( preg_split('//', $puzzle['text']) as $c ) {
  if ( preg_match('/[A-Za-z]/', $c) ) {
    $pzlcode .= "<input placeholder=$c>";
  } else {
    $pzlcode .= $c;
  }
}

if ( !empty($puzzle['author']) ) {
  $pzlcode .= '<br>&mdash;';
  foreach ( preg_split('//', $puzzle['author']) as $c ) {
    if ( preg_match('/[A-Za-z]/', $c) ) {
      $pzlcode .= "<input placeholder=$c>";
    } else {
      $pzlcode .= $c;
    }
  }
}

echo $pzlcode;

?>
</body></html>
