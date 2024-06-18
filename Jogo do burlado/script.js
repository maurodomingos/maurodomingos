document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const authContainer = document.getElementById('auth-container');
    const gameContainer = document.getElementById('game-container');
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const scoreDisplay = document.getElementById('score');
    const shareBtn = document.getElementById('shareBtn');
 
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
 
    let snake, direction, food, score, level, backgroundColor;
    let obstacles = [];
 
    // Show register form
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
loginForm.style.display = 'none';
registerForm.style.display = 'block';
    });
 
    // Show login form
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
registerForm.style.display = 'none';
loginForm.style.display = 'block';
    });
 
    // Register user
    registerBtn.addEventListener('click', () => {
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const age = document.getElementById('reg-age').value;
 
        if (age < 15) {
            alert('Você deve ter 15 anos ou mais para se registrar.');
            return;
        }
 
        if (localStorage.getItem(username)) {
            alert('Usuário já existe.');
        } else {
            const user = { password, age };
            localStorage.setItem(username, JSON.stringify(user));
            alert('Registro Bem-Sucedido! Por favor, Faça o Login.');
registerForm.style.display = 'none';
loginForm.style.display = 'block';
        }
    });
 
    // Login user
    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
 
        const user = JSON.parse(localStorage.getItem(username));
 
        if (user && user.password === password) {
            alert('Login bem-sucedido!');
authContainer.style.display = 'none';
gameContainer.style.display = 'block';
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });
 
    startBtn.addEventListener('click', startGame);
    shareBtn.addEventListener('click', shareOnSocialMedia);
 
    function startGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'RIGHT';
        score = 0;
        level = 1;
        backgroundColor = 'white';
        scoreDisplay.textContent = 'Pontuação: ' + score;
        placeFood();
        placeObstacles();
        document.addEventListener('keydown', changeDirection);
        gameLoop();
    }
 
    function gameLoop() {
        setTimeout(() => {
            clearCanvas();
            moveSnake();
            drawSnake();
            drawFood();
            drawObstacles();
            if (checkGameOver()) {
                alert('Game Over! Sua pontuação foi: ' + score);
                resetGame();
                return;
            }
            checkLevel();
            gameLoop();
        }, 100);
    }
 
    function clearCanvas() {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
 
    function drawSnake() {
        context.fillStyle = 'green';
        snake.forEach(part => {
            context.fillRect(part.x * 20, part.y * 20, 20, 20);
        });
    }
 
    function moveSnake() {
        const head = { ...snake[0] };
        switch (direction) {
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
                head.x += 1;
                break;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreDisplay.textContent = 'Pontuação: ' + score;
            placeFood();
        } else {
            snake.pop();
        }
    }
 
    function changeDirection(event) {
        const keyPressed = event.keyCode;
        switch (keyPressed) {
            case 37: // Left
                if (direction !== 'RIGHT') direction = 'LEFT';
                break;
            case 38: // Up
                if (direction !== 'DOWN') direction = 'UP';
                break;
            case 39: // Right
                if (direction !== 'LEFT') direction = 'RIGHT';
                break;
            case 40: // Down
                if (direction !== 'UP') direction = 'DOWN';
                break;
        }
    }
 
    function placeFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / 20)),
            y: Math.floor(Math.random() * (canvas.height / 20))
        };
    }
 
    function drawFood() {
        context.fillStyle = 'red';
        context.fillRect(food.x * 20, food.y * 20, 20, 20);
    }
 
    function placeObstacles() {
        obstacles = [];
        if (level > 1) {
            for (let i = 0; i < level * 5; i++) {
                obstacles.push({
                    x: Math.floor(Math.random() * (canvas.width / 20)),
                    y: Math.floor(Math.random() * (canvas.height / 20))
                });
            }
        }
    }
 
    function drawObstacles() {
        context.fillStyle = 'brown';
        obstacles.forEach(obstacle => {
            context.fillRect(obstacle.x * 20, obstacle.y * 20, 20, 20);
        });
    }
 
    function checkGameOver() {
        const head = snake[0];
        if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20) {
            return true;
        }
 
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
 
        for (let obstacle of obstacles) {
            if (head.x === obstacle.x && head.y === obstacle.y) {
                return true;
            }
        }
 
        return false;
    }
 
    function checkLevel() {
        if (score >= 100 && level === 1) {
            level = 2;
            backgroundColor = 'darkgray';
            alert('Parabéns! Você avançou para o Nível 2.');
            placeObstacles();
        } else if (score >= 300 && level === 2) {
            level = 3;
            backgroundColor = 'black';
            alert('Parabéns! Você avançou para o Nível 3.');
            placeObstacles();
        } else if (score >= 500 && level === 3) {
            level = 4;
            backgroundColor = 'blue';
            alert('Parabéns! Você avançou para o Nível 4 .');
            placeObstacles();
        } else if (score >= 700 && level === 4) {
            level = 5;
            backgroundColor = 'green';
            alert('Parabéns! Você completou todos os níveis.');
            placeObstacles();
        }
    }
 
    function resetGame() {
        snake.unshift(head);
        snoke= [{ x: 20, y: 300 }];
        direction = 'Black';
        score = 0;
        level = 1;
        backgroundColor = 'white';
        scoreDisplay.textContent = 'Pontuação: ' + score;
gameContainer.style.display = 'none';
authContainer.style.display = 'block';
    }
 
    function shareOnSocialMedia() {
        // Simulação de compartilhamento
        const shareMessage = `Acabei de marcar ${score} pontos no jogo da Burla! Venha jogar também.`;
        alert(`Compartilhando nas redes sociais:\n${shareMessage}`);
    }
});