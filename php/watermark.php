<?php
ini_set(('display_errors'),0);
require_once "functions.php";
include('../abeautifulsite/SimpleImage.php');

use abeautifulsite\SimpleImage as SimpleImage;

//Статус и сообщение
$data['message'] = 'Все получилось!';

//file_put_contents('post.txt',print_r($_POST,true));

//Получение данных из формы
$main_image_src = $_POST['img1'];
$watermark_src = $_POST['img2'];
$pos_x = $_POST['positionX'];
$pos_y = $_POST['positionY'];
$opacity = $_POST['opacity'] / 100;
$watermark_mode = $_POST['mode'];
$lang= $_POST['Language'];

//Сообщения
$messages = [
    'ru' => [
        'small' => 'Слишком маленкий водяной знак!'
    ],

    'eng' => [
        'small' => 'Too small watermark!'
    ]
];


//Задаем индекс файла
$img_index = date("U") . "-" . mt_rand(0, 1000);

//Путь записи результтата
$result_dir_loc = 'img/watermark/';
$result_name = 'result-' . $img_index . '.jpg';
$result_src_loc = $result_dir_loc . $result_name;
$result_dir = __DIR__ . '/../' . $result_dir_loc;
$result_src = __DIR__ . '/../' . $result_src_loc;

//Проверяем наличие папки
if (!file_exists($result_dir)) {
    mkdir($result_dir, 755); //Создание папки
}

//Склеивание изображений
$main_image = new SimpleImage('../' . $main_image_src);
$main_image_width = $main_image->get_width();
$main_image_height = $main_image->get_height();

$watermark = new SimpleImage('../' . $watermark_src);
$watermark_width = $watermark->get_width();
$watermark_height = $watermark->get_height();

//Масштабирование ватермарка
if ($main_image_width / $watermark_width < 1) {
    $watermark = $watermark->fit_to_width($main_image_width);
    $watermark_height = $watermark->get_height();
}

if ($main_image_height / $watermark_height < 1) {
    $watermark = $watermark->fit_to_height($main_image_height);
    $watermark_width = $watermark->get_width();
}

//Замощение ватермарка
if ($watermark_mode == 'grid-mode') {
    //Ограничение по соотношению изображений
    $max_ratio = 100;

    $margin_x = $_POST['paddingLeft'];
    $margin_y = $_POST['paddingTop'];

    $watermark_width += $margin_x;
    $watermark_height += $margin_y;

    $ratio_x = ceil($main_image_width / $watermark_width);
    $ratio_y = ceil($main_image_height / $watermark_height);

    if($ratio_x > $max_ratio || $ratio_y > $max_ratio){
        http_response_code(500);
        echo $messages[$lang]['small'];
        exit;
    }

    if ($pos_x > $margin_x) {
        $pos_x = $pos_x % $watermark_width - $watermark_width;
        $ratio_x++;
    } else if ($pos_x < 0) {
        $pos_x = $pos_x % $watermark_width;
        $ratio_x++;
    }

    if ($pos_y > $margin_y) {
        $pos_y = $pos_y % $watermark_height - $watermark_height;
        $ratio_y++;
    } else if ($pos_y < 0) {
        $pos_y = $pos_y % $watermark_height;
        $ratio_y++;
    }

    for ($i = 0; $i < $ratio_y; $i++) {
        for ($j = 0; $j < $ratio_x; $j++) {
            $x = $pos_x + $watermark_width * $j;
            $y = $pos_y + $watermark_height * $i;

            $main_image = $main_image->overlay($watermark, 'top left', $opacity, $x, $y);
        }
    }

    //Сохранение результата
    $main_image->save($result_src);
} else {
    //Сохранение результата
    $file = $main_image->overlay($watermark, 'top left', $opacity, $pos_x, $pos_y)->save($result_src);
}

////Заись пути для ответа
$data['result'] = $result_src_loc;
$data['filename'] = $result_name;

header('Content-Type: application/json');

file_put_contents('server.txt',print_r($_POST,true));
echo json_encode($data);
exit;