document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === '123' && password === 'senhaFacil') {
            // Login bem-sucedido, redirecione para a página principal
            window.location.href = 'todolist.html';
        } else {
            // Exiba uma mensagem de erro
            errorMessage.textContent = 'ID ou senha incorretos. Tente novamente.';
        }
    });
});
