let arrayTarefas = [];
// let user = sessionStorage.getItem("user");
function removeOneTask(evento) {
  let confirmado = confirm("Deseja remover?");
  if (!confirmado) {
    return;
  }
  const id = evento.target.id;
  arrayTarefas = arrayTarefas.filter(function filtrar(item) {
    return item.id !== id.split("-")[1];
  });
  localStorage.setItem(
    "hmassareli",
    JSON.stringify({ info: { senha: "123" }, tarefas: arrayTarefas })
  );
  atualizarDom(arrayTarefas);
}

function finalizarTarefa(evento) {
  const id = evento.target.id;
  const posicaoDaTarefaNoArray = arrayTarefas.findIndex(function encontrar(
    item
  ) {
    return item.id === id.split("-")[1];
  });
  arrayTarefas[posicaoDaTarefaNoArray].status = "done";
  localStorage.setItem(
    "hmassareli",
    JSON.stringify({ info: { senha: "123" }, tarefas: arrayTarefas })
  );
  atualizarDom(arrayTarefas);
}
function adicionar() {
  // puxar valor do input
  const input = document.getElementById("texto-tarefa");

  //pega o value do input
  const texto = input.value;

  if (!texto) {
    return;
  }

  const objTarefa = {
    id: Date.now().toString(), // cria um id para cada tarefa
    name: texto, // pode repetir
    status: "pending", //(tarefa pendente)
  };

  arrayTarefas.push(objTarefa);
  localStorage.setItem(
    "hmassareli",
    JSON.stringify({ info: { senha: "123" }, tarefas: arrayTarefas })
  );

  console.log(arrayTarefas);
  atualizarDom(arrayTarefas);
}

function handleClick(evento) {
  if (evento.target.nodeName === "BUTTON") {
    //verificar quem foi clicado, pra ver se chama a função de remover ou de finalizar
    if (evento.target.classList.contains("remover")) {
      removeOneTask(evento);
    } else if (evento.target.classList.contains("finalizar")) {
      finalizarTarefa(evento);
    }
  }
}

// executa o código de dentro somente quando a página estiver carregada (DOM na tela)
window.addEventListener("load", function () {
  // chave é no formato "user-senha"
  let chave = sessionStorage.getItem("credentials");
  let chaveDecodificada = window.atob(chave);
  // reparte no meio e pega só o user (antes do traço)
  let userLogado = chaveDecodificada.split("-")[0];
  let usuarioExiste = false;

  // verifica se o user existe no localStorage
  if (this.localStorage.getItem(userLogado) !== null) {
    usuarioExiste = true;
  } else {
    window.location.href = "index.html";
  }
  //pegando informações do localStorage
  let armazenamento = localStorage.getItem("hmassareli");
  if (armazenamento) {
    // se tiver tarefas no localStorage, transforma em objeto de verdade
    armazenamento = JSON.parse(armazenamento);

    // coloca as tarefas no arrayTarefas e logo atualiza o DOM
    arrayTarefas = armazenamento.tarefas;

    atualizarDom(arrayTarefas);
  }
  // pega a div que contém as tarefas
  const divTarefas = document.getElementById("tarefas");

  // pega o select de filtro
  const select = document.getElementById("select-filtro");

  //chama a função atualizar DOM sempre que o select for "mudado"
  select.addEventListener("change", function atualizar() {
    atualizarDom(arrayTarefas);
  });

  // chama a função de lidar com cliques sempre que alguém clicar na divTarefas
  divTarefas.addEventListener("click", handleClick);
});

function atualizarDom(arrayTarefas) {
  const selectFiltro = document.getElementById("select-filtro");
  let opcaoSelecionada = selectFiltro.value;
  let arrayFiltrado = [];

  if (opcaoSelecionada === "all") {
    arrayFiltrado = arrayTarefas;
  } else {
    arrayFiltrado = arrayTarefas.filter(function filtrar(item) {
      return item.status === opcaoSelecionada;
    });
  }
  // pega a div onde ficarão as tarefas
  const divTarefas = document.getElementById("tarefas");

  // esvazia a div, para que tenha só tarefas atualidas
  divTarefas.innerHTML = "";

  // percorre o array de tarefas filtradas
  for (let i = 0; i < arrayFiltrado.length; i++) {
    console.log(i);

    let divTarefa = document.createElement("div");
    divTarefa.className = arrayFiltrado[i].status + " divTarefa";
    divTarefa.setAttribute("id", arrayFiltrado[i].id);

    // coloca os botões e paragrafo dentro da divTarefa com seus respectivos ids e classes
    divTarefa.innerHTML = `<p>${arrayFiltrado[i].name}</p><button class="finalizar" id="finalizar-${arrayFiltrado[i].id}">finalizar</button><button class="remover" id="remover-${arrayFiltrado[i].id}">remover</button>`;

    divTarefas.appendChild(divTarefa);
  }
}