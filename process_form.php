<?php
// 1. Загрузка автозагрузчика Composer и Dotenv
require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// 2. Подгружаем .env и проверяем обязательные переменные
Dotenv::createImmutable(__DIR__)->load();                                   
Dotenv::createImmutable(__DIR__)->required(['DB_HOST','DB_NAME','DB_USER','DB_PASS'])->notEmpty();

$host    = $_ENV['DB_HOST'];
$db      = $_ENV['DB_NAME'];
$user    = $_ENV['DB_USER'];
$pass    = $_ENV['DB_PASS'];
$charset = 'utf8mb4';

// 3. Настройка DSN и опций PDO
$dsn = "mysql:host={$host};dbname={$db};charset={$charset}";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    // 4. Подключаемся к базе данных
    $pdo = new PDO($dsn, $user, $pass, $options);

    // 5. Проверка метода запроса: только POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        exit('Метод не разрешён');
    }

    // 6. Считываем данные из формы
    $name    = trim($_POST['name']    ?? '');
    $email   = trim($_POST['email']   ?? '');
    $mess    = trim($_POST['phone']   ?? '');
    $comment = trim($_POST['message'] ?? '');

    // 7. Валидация: все поля обязательны
    if ($name === '' || $email === '' || $mess === '' || $comment === '') {
        exit('Ошибка: заполните все поля формы.');
    }

    // 8. Подготовленный INSERT в таблицу contacts
    $sql = "INSERT INTO contacts (name, email, messenger, task_description)
            VALUES (:name, :email, :messenger, :description)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name'        => $name,
        ':email'       => $email,
        ':messenger'   => $mess,
        ':description' => $comment,
    ]);

    echo 'Спасибо! Ваша заявка принята.';
} catch (PDOException $e) {
    exit('Ошибка работы с базой: ' . htmlspecialchars($e->getMessage()));
}
