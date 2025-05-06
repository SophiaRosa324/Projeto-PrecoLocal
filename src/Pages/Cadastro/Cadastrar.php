<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Lê os dados JSON do corpo da requisição
$data = json_decode(file_get_contents("php://input"));

// Verifica se os dados estão presentes
if (
    !isset($data->nome) || empty($data->nome) ||
    !isset($data->email) || empty($data->email) ||
    !isset($data->password) || empty($data->password)
) {
    echo json_encode(["status" => "error", "message" => "Dados inválidos."]);
    exit;
}

try {
    
    $db = new PDO("sqlite:../../../usuarios.db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepara e executa a inserção com senha criptografada
    $stmt = $db->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)");
    $stmt->bindParam(':nome', $data->nome);
    $stmt->bindParam(':email', $data->email);
    $senhaCriptografada = password_hash($data->password, PASSWORD_DEFAULT);
    $stmt->bindParam(':senha', $senhaCriptografada);

    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Usuário cadastrado com sucesso."]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Erro ao cadastrar: " . $e->getMessage()]);
}
