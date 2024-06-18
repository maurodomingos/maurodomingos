<?php
$username = $_POST['username'];
$password = $_POST['password'];
$age = $_POST['age'];

if ($age < 15) {
    echo "Você deve ter 15 anos ou mais para jogar.";
} else {
    echo "<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Jogo da Cobra</title>
        <link rel='stylesheet' href='style.css'>
    </head>
    <body>
        <div class='container'>
            <h1>Bem-vindo ao Jogo da Burla</h1>
            <p>Nome de usuário: $username</p>
            <div id='game-container'>
                <canvas id='gameCanvas'></canvas>
                <p id='score'>Pontuação: 0</p>
                <button id='startBtn'>Iniciar Jogo</button>
            </div>
        </div>
        <script src='script.js'></script>
    </body>
    </html>";
}
?>