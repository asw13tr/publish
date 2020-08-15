<?php
header('Access-Control-Allow-Origin: *');
try {
     $db = new PDO("mysql:host=localhost;dbname=ozeldenemeler;charset=utf8", "root", "");
} catch ( PDOException $e ){
     print $e->getMessage();
}

$result = [
    'status' => false
];

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $do = $_REQUEST['do'];
    $query = $_REQUEST['query'];


    switch ($do) {

        case 'select':
            $query = $db->query($query, PDO::FETCH_OBJ);
            if ( $query->rowCount() ){
                $result = [
                    'status' => true,
                    'results' => $query->fetchAll()
                ];
            }
            break;

        case 'insert':
            $count = $db->prepare($query)->execute();
            if($count){
                $item = $db->query("SELECT * FROM vue_twits WHERE id={$db->lastInsertId()} LIMIT 1")->fetch();
                $result = [
                    'status' => true,
                    'result' => $item
                ];
            }
            break;


    }//switch


}

echo json_encode($result);

?>
