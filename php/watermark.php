<?php
require_once "functions.php";
require_once "../composer/vendor/autoload.php";
use \WideImage\WideImage as WideImage;

//Получение данных изи формы
$main_image = $_FILES['main-image'];
$watermark = $_FILES['watermark'];
$pos_x = $_POST['pos_x'];
$pos_y = $_POST['pos_y'];
$opacity = $_POST['opacity'] * 100;
$type = $_POST['type'];
$img_index = date("U") . "-" . mt_rand(0, 1000);

//Переименование и перемещение изображений
$main_image_type = getExtension($main_image['name']);
$main_image_name = 'main_image-' . $img_index . "." . $main_image_type;
$main_image_src_loc = 'img/watermark/' . $main_image_name;
$main_image_src = __DIR__ . '/../' . $main_image_src_loc;

move_uploaded_file($main_image['tmp_name'], $main_image_src);

$watermark_type = getExtension($watermark['name']);
$watermark_name = 'watermark-' . $img_index . "." . $watermark_type;
$watermark_src_loc = 'img/watermark/' . $watermark_name;
$watermark_src = __DIR__ . '/../' . $watermark_src_loc;

move_uploaded_file($watermark['tmp_name'], $watermark_src);

//Путь записи результтата
$result_src_loc = 'img/watermark/result-' . $img_index . ".jpg";
$result_src = __DIR__ . '/../'.$result_src_loc;

//Заись пути для ответа
$data['result'] = $result_src_loc;

//Склеивание изображений
$main_image = WideImage::loadFromFile($main_image_src);
$main_image_width = $main_image->getWidth();
$main_image_height = $main_image->getHeight();

$watermark = WideImage::loadFromFile($watermark_src);
$watermark_width = $watermark->getWidth();
$watermark_height = $watermark->getHeight();

//Масштабирование ватермарка
if ($main_image_width / $watermark_width < 1) {
    $watermark = $watermark->resize($main_image_width);
    $watermark_height = $watermark->getHeight();
}

if ($main_image_height / $watermark_height < 1) {
    $watermark = $watermark->resize(null, $main_image_height);
}

//Замощение ватермарка
if ($type == 'tile') {
    $margin_x = $_POST['$margin_x'];
    $margin_y = $_POST['$margin_y'];

    $watermark_width += $watermark_width * $margin_x;
    $watermark_height += $watermark_height * $margin_y;

    $ratio_x = ceil($main_image_width / $watermark_width);
    $ratio_y = ceil($main_image_height / $watermark_height);

    if ($pos_x > $margin_x) {
        $pos_x -= $watermark_width;
        $ratio_x++;
    }

    if ($pos_y > $margin_y) {
        $pos_y -= $watermark_height;
        $ratio_y++;
    }

    for ($i = 0; $i < $ratio_y; $i++) {
        for ($j = 0; $j < $ratio_x; $j++) {
            $x = $pos_x + $watermark_width * $j;
            $y = $pos_y + $watermark_height * $i;

            $main_image = $main_image->merge($watermark, $x, $y, $opacity);
        }
    }

    //Сохранение результата
    $main_image->saveToFile($result_src);
} else {
    //Сохранение результата
    $main_image->merge($watermark, $pos_x, $pos_y, $opacity)->saveToFile($result_src);
}

header('Content-Type: application/json');
echo json_encode($data);
exit;