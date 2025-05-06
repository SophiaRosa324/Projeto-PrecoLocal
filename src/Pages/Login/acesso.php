<?php
// Incluir arquivos da JWT manualmente
require_once __DIR__ . '/../../../jwt/JWTExceptionWithPayloadInterface.php';
require_once __DIR__ . '/../../../jwt/JWT.php';
require_once __DIR__ . '/../../../jwt/Key.php';
require_once __DIR__ . '/../../../jwt/ExpiredException.php';
require_once __DIR__ . '/../../../jwt/SignatureInvalidException.php';
require_once __DIR__ . '/../../../jwt/BeforeValidException.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$SECRET_KEY = "chave"; 

$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->email) || empty($data->email) ||
    !isset($data->password) || empty($data->password)
) {
    echo json_encode(["success" => false, "message" => "Dados inválidos."]);
    exit;
}

try {
    // Conecta ao banco de dados SQLite
    $db = new PDO("sqlite:../../../usuarios.db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verifica se o e-mail existe no banco de dados
    $stmt = $db->prepare("SELECT * FROM usuarios WHERE email = :email");
    $stmt->bindParam(":email", $data->email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verifica se as credenciais estão corretas
    if ($user && password_verify($data->password, $user['password'])) {

        // Geração do token JWT
        $payload = [
            "email" => $user["email"],
            "iat" => time(),
            "exp" => time() + (60 * 60) // 1 hora
        ];

        // Criação do JWT
        $jwt = JWT::encode($payload, $SECRET_KEY);

        // Atualiza o banco de dados com o token (opcional)
        $stmt = $db->prepare("UPDATE usuarios SET token = :token WHERE email = :email");
        $stmt->bindParam(":token", $jwt);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();

        // Retorna a resposta com o token
        echo json_encode([
            "success" => true,
            "token" => $jwt,
            "message" => "Login realizado com sucesso."
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "E-mail ou senha inválidos."]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erro no servidor: " . $e->getMessage()]);
}
?>
