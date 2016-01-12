<?php
require_once "functions.php";
require_once "../composer/vendor/autoload.php";
use \WideImage\WideImage as WideImage;

//Статус и сообщение
$data['status'] = 'ok';
$data['message'] = 'Все получилось!';

//Получение данных изи формы
$main_image = $_FILES['img1'];
$watermark = $_FILES['img2'];
$pos_x = $_POST['positionX'];
$pos_y = $_POST['positionY'];
$opacity = $_POST['opacity'];

//Получаем тип файла
$main_image_type = getTypeOfFile($main_image['type']);
$watermark_type = getTypeOfFile($watermark['type']);

//Задаем индекс файла
$img_index = date("U") . "-" . mt_rand(0, 1000);

//Ограничения
$max_resolution = 4000; //px
$formats = array('jpeg', 'png', 'bmp');

//Проверки

//Проверка типа
if ($main_image_type !== 'image' && $watermark_type !== 'image') {
    $data['status'] = 'error';
    $data['message'] = 'Выберите изображения!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
} elseif ($watermark_type !== 'image') {
    $data['status'] = 'error';
    $data['message'] = 'Выберите изображение водяного знака!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
} elseif ($main_image_type !== 'image') {
    $data['status'] = 'error';
    $data['message'] = 'Выберите главное изображение!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
} else {
    //Получаем формат  файла
    $main_image_format = getExtension($main_image['type'], '/');
    $watermark_format = getExtension($watermark['type'], '/');
}

//Проверка формата
$main_image_valid = array_search($main_image_format, $formats);
$watermark_valid = array_search($watermark_format, $formats);

if ($main_image_valid === false && $watermark_valid === false) {
    $data['status'] = 'error';
    $data['message'] = 'Неверный формат изображений!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
} elseif ($watermark_valid === false) {
    $data['status'] = 'error';
    $data['message'] = 'Неверный формат водяного знака!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
} elseif ($main_image_valid === false) {
    $data['status'] = 'error';
    $data['message'] = 'Неверный формат главного изображения!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
} else {
    //Получаем размер изображений
    $main_image_size = getimagesize($main_image['tmp_name']);
    $watermark_size = getimagesize($watermark['tmp_name']);
}

//Проверка размера фзображения
$main_image_valid = $main_image_size[0] > $max_resolution || $main_image_size[1] > $max_resolution;
$watermark_valid = $watermark_size[0] > $max_resolution || $watermark_size[1] > $max_resolution;

if ($main_image_valid && $watermark_valid) {
    $data['status'] = 'error';
    $data['message'] = 'Слишком большие изображения!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
} elseif ($watermark_valid) {
    $data['status'] = 'error';
    $data['message'] = 'Слишком большой водяной знак!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
} elseif ($main_image_valid) {
    $data['status'] = 'error';
    $data['message'] = 'Слишком большое главное изображение!';

    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

if ($data['status'] == 'ok') {
    //Переименование и перемещение изображений
    $main_image_format = getExtension($main_image['name'], '.');
    $main_image_name = 'main_image-' . $img_index . '.' . $main_image_format;
    $main_image_src_loc = 'img/watermark/' . $main_image_name;
    $main_image_src = __DIR__ . '/../' . $main_image_src_loc;

    move_uploaded_file($main_image['tmp_name'], $main_image_src);

    $watermark_format = getExtension($watermark['name'], '.');
    $watermark_name = 'watermark-' . $img_index . '.' . $watermark_format;
    $watermark_src_loc = 'img/watermark/' . $watermark_name;
    $watermark_src = __DIR__ . '/../' . $watermark_src_loc;

    move_uploaded_file($watermark['tmp_name'], $watermark_src);

    //Путь записи результтата
    $result_src_loc = 'img/watermark/result-' . $img_index . '.jpg';
    $result_src = __DIR__ . '/../' . $result_src_loc;

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
}

header('Content-Type: application/json');
echo json_encode($data);
exit;