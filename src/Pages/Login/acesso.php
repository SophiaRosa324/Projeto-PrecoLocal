
<?php
// Se for uma requisição OPTIONS (preflight), finalize aqui:


// Incluir arquivos da JWT manualmente
require_once __DIR__ . '/../../../jwt/JWTExceptionWithPayloadInterface.php';
require_once __DIR__ . '/../../../jwt/JWT.php';
require_once __DIR__ . '/../../../jwt/Key.php';
require_once __DIR__ . '/../../../jwt/ExpiredException.php';
require_once __DIR__ . '/../../../jwt/SignatureInvalidException.php';
require_once __DIR__ . '/../../../jwt/BeforeValidException.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Configurações de headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Verifica se o método é POST
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método não permitido."]);
    exit;
}

// Chave secreta do JWT
$SECRET_KEY = "chave";


try {
    $db = new PDO("sqlite:" . __DIR__ . "/../../../usuarios.db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erro ao conectar ao banco de dados: " . $e->getMessage()]);
    exit;
}

// Lê os dados da requisição
$data = json_decode(file_get_contents("php://input"));

// Validação básica
if (
    !isset($data->email) || !filter_var($data->email, FILTER_VALIDATE_EMAIL) ||
    !isset($data->password) || strlen($data->password) < 4
) {
    echo json_encode(["success" => false, "message" => "Dados inválidos."]);
    exit;
}

try {
    // Conecta ao banco de dados SQLite
    $db = new PDO("sqlite:" . __DIR__ . "/../../../usuarios.db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta 
    $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica credenciais
    if ($user && password_verify($data->password, $user['password'])) {
        $payload = [
            "name" => $user["nome"],
            "email" => $user["email"],
            "iat" => time(),
            "exp" => time() + (60 * 60) // expira em 1 hora
        ];

        // Cria o JWT com algoritmo definido
        $jwt = JWT::encode($payload, $SECRET_KEY, 'HS256');
        
        $stmt = $db->prepare("UPDATE usuarios SET token = :token WHERE email = :email");
        $stmt->bindParam(":token", $jwt);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();

        // Retorna o token
        echo json_encode([
            "success" => true,
            "token" => $jwt,
            "message" => "Login realizado com sucesso."
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Credenciais inválidas."]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erro no servidor: " . $e->getMessage()]);
}
?>
