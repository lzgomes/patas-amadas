let animals = []; // Array para armazenar os animais

// Função para carregar os dados dos animais do arquivo JSON
async function fetchAnimals() {
    const response = await fetch('animais.json');
    const data = await response.json();
    return data.animals;
}

// Função para carregar os animais na página principal
async function loadAnimals() {
    animals = await fetchAnimals(); // Carrega os animais do JSON
    const animalContainer = document.getElementById('animal-container');
    animalContainer.innerHTML = ''; // Limpa os animais anteriores

    animals.forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.className = 'animal-card';
        animalCard.innerHTML = `
            <h3>${animal.nome}</h3>
            <img src="${animal.imagem || 'default-image.jpg'}" alt="${animal.nome}">
            <p>Espécie: ${animal.especie}</p>
            <p>Sexo: ${animal.sexo}</p>
            <p>Estado: ${animal.estado}</p>
            <a href="animal.html?id=${animal.id}">Ver detalhes</a>
        `;
        animalContainer.appendChild(animalCard);
    });
}

// Função para exibir os animais (pode ser usada para mostrar animais filtrados)
function displayAnimals(animalsList) {
    const animalContainer = document.getElementById('animal-container');
    animalContainer.innerHTML = ''; // Limpa os animais anteriores

    animalsList.forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.className = 'animal-card';
        animalCard.innerHTML = `
            <h3>${animal.nome}</h3>
            <img src="${animal.imagem || 'default-image.jpg'}" alt="${animal.nome}">
            <p>Espécie: ${animal.especie}</p>
            <p>Sexo: ${animal.sexo}</p>
            <p>Estado: ${animal.estado}</p>
            <a href="animal.html?id=${animal.id}">Ver detalhes</a>
        `;
        animalContainer.appendChild(animalCard);
    });
}

// Função para filtrar os animais com base nos critérios de busca
function filterAnimals(event) {
    event.preventDefault();

    const estado = document.getElementById('buscar-estado').value.trim();
    const cidade = document.getElementById('buscar-cidade').value.trim();
    const especie = document.getElementById('buscar-especie').value.trim().toLowerCase();

    const filteredAnimals = animals.filter(animal => {
        const verificaEstado = estado === '' || animal.estado.toLowerCase() === estado.toLowerCase();
        const verificaCidade = cidade === '' || animal.cidade.toLowerCase() === cidade.toLowerCase();
        const verificaEspecie = especie === '' || animal.especie.toLowerCase() === especie;

        return verificaEstado && verificaCidade && verificaEspecie;
    });

    displayAnimals(filteredAnimals); // Exibe os animais filtrados
}

// Função para resetar os campos de busca
function resetSearchFields() {
    document.getElementById('buscar-estado').value = '';
    document.getElementById('buscar-cidade').value = '';
    document.getElementById('buscar-especie').value = '';
    loadAnimals(); 
}

// Função para lidar com o registro de um novo animal
document.getElementById("registrar-formulario")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const responsavelNome = document.getElementById("responsavel-nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const especie = document.getElementById("especie").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const estado = document.getElementById("estado").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const sexo = document.getElementById("sexo").value.trim(); // Novo campo para sexo

    // Criar um novo objeto de animal
    const newAnimal = {
        id: new Date().getTime(), // Gerar um ID único usando timestamp
        nome,
        especie,
        cidade,
        estado,
        descricao,
        email, // Adiciona o e-mail ao objeto animal
        sexo, // Adiciona sexo ao objeto
        imagem: "", // Pode ser preenchido depois
    };

    // Adiciona o novo animal ao array
    animals.push(newAnimal);

    // Exibir mensagem de sucesso
    const respostaMensagem = document.getElementById("resposta-mensagem");
    respostaMensagem.textContent = "Tudo certo! Nós entraremos em contato para finalizar o cadastro.";
    respostaMensagem.style.display = "block";

    // Limpa o formulário
    document.getElementById("registrar-formulario").reset();
});

// Função para carregar os detalhes do animal na página de detalhes
async function loadAnimalDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    animals = await fetchAnimals(); // Carrega os animais do JSON
    const animal = animals.find(animal => animal.id == id); // Encontra o animal pelo ID

    if (animal) {
        document.getElementById("animal-nome").textContent = animal.nome;
        document.getElementById("animal-especie").textContent = `${animal.especie}`;
        document.getElementById("animal-sexo").textContent = `${animal.sexo}`;
        document.getElementById("animal-cidade").textContent = `${animal.cidade}`;
        document.getElementById("animal-estado").textContent = `${animal.estado}`;
        document.getElementById("animal-descricao").textContent = animal.descricao;
        document.getElementById("animal-imagem").src = animal.imagem || "default-image.jpg";
        document.getElementById("responsavel-email").textContent = animal.email || "Não disponível";
    }
}

// Adiciona os listeners para busca e reset de campos
document.getElementById('formulario-busca')?.addEventListener('submit', filterAnimals);
document.getElementById('reset-button')?.addEventListener('click', resetSearchFields);

// Chama a função de carregamento de animais na página inicial
if (document.getElementById('animal-container')) {
    loadAnimals();
}

// Chama a função de carregamento de detalhes na página do animal
if (document.getElementById('animal-detalhes')) {
    loadAnimalDetails();
}
