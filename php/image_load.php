<?php
ini_set(('display_errors'),0);
require_once "functions.php";

//Статус и сообщение
$data['status'] = 'ok';
$data['message'] = 'Все получилось!';

//Сообщения
$messages = [
    'ru' => [
        'no' => 'Иизображение не выбрано или превышает допустимый размер!',
        'select' => 'Выберите изображение!',
        'format' => 'Неверный формат изображения!',
        'big' => 'Слишком большое изображение!',
    ],

    'eng' => [
        'no' => 'Image is not selected, or exceeds the permitted size!',
        'select' => 'Select the image!',
        'format' => 'Invalid image format!',
        'big' => 'Too large image!',
    ]
];


//Получение данных изи формы
$image = $_FILES['img'];
$lang= $_POST['Language'];


//Ограничения
$max_file_size = 5 * 1024 * 1024; //Максимальный размер файла в байтах
$max_resolution = 4000; //Максимальный размер файла в пикселях
$formats = array('jpeg', 'png', 'bmp'); //Разрешенные форматы изображений

//Получаем размер файлов в байтах
$mage_size = $image['size'];

//Проверки
//Проверка размера файла
$image_valid = $mage_size === 0 || $mage_size > $max_file_size;

if ($image_valid) {
    http_response_code(500);
    echo $messages[$lang]['no'];
    exit;
} else {
    //Получаем тип файла
    $image_type = getTypeOfFile($image['type']);
}

//Проверка типа
if ($image_type !== 'image') {
    http_response_code(500);
    echo $messages[$lang]['select'];
    exit;
} else {
    //Получаем формат  файла
    $image_format = getExtension($image['type'], '/');
}

//Проверка формата
$image_valid = array_search($image_format, $formats);

if ($image_valid === false) {
    http_response_code(500);
    echo $messages[$lang]['format'];
    exit;
} else {
    //Получаем размер изображений в пикселях
    $image_resolution = getimagesize($image['tmp_name']);
}

//Проверка размера фзображения
$image_valid = $image_resolution[0] > $max_resolution || $image_resolution[1] > $max_resolution;

if ($image_valid) {
    http_response_code(500);
    echo $messages[$lang]['big'];
    exit;
} else {
    //Задаем индекс файла
    $img_index = date("U") . "-" . mt_rand(0, 1000);
}

if ($data['status'] == 'ok') {
    //Путь записи результтата
    $result_dir_loc = 'img/watermark/';
    $result_dir = __DIR__ . '/../' . $result_dir_loc;

    //Проверяем наличие папки
    if (!file_exists($result_dir)) {
        mkdir($result_dir, 755); //Создание папки
    }

    //Переименование и перемещение изображений
    $image_format = getExtension($image['name'], '.');
    $image_name = 'image-' . $img_index . '.' . $image_format;
    $image_src_loc = $result_dir_loc . $image_name;
    $image_src = __DIR__ . '/../' . $image_src_loc;

    move_uploaded_file($image['tmp_name'], $image_src);

    //Заись пути для ответа
    $data['result'] = $image_src_loc;
    $data['filename'] = $image_name;
}

header('Content-Type: application/json');
echo json_encode($data);
exit;