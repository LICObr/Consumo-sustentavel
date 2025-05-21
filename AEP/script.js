
let consumoEnergia = 0;
let consumoAgua = 0;

const ctxEnergia = document.getElementById('graficoEnergia').getContext('2d');
const ctxAgua = document.getElementById('graficoAgua').getContext('2d');

const graficoEnergia = new Chart(ctxEnergia, {
    type: 'bar',
    data: {
        labels: ['Mínimo (250 kWh)', 'Máximo (400 kWh)', 'Seu Consumo'],
        datasets: [{
            label: 'Consumo de Energia',
            data: [250, 400, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: { display: true, text: 'Consumo de Energia (kWh/mês)' }
        },
        scales: { y: { beginAtZero: true } }
    }
});

const graficoAgua = new Chart(ctxAgua, {
    type: 'bar',
    data: {
        labels: ['Mínimo (8.000 L)', 'Máximo (20.000 L)', 'Seu Consumo'],
        datasets: [{
            label: 'Consumo de Água',
            data: [8000, 20000, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: { display: true, text: 'Consumo de Água (Litros/mês)' }
        },
        scales: { y: { beginAtZero: true } }
    }
});

function atualizarGraficos() {
    graficoEnergia.data.datasets[0].data[2] = consumoEnergia;
    graficoEnergia.update();

    graficoAgua.data.datasets[0].data[2] = consumoAgua;
    graficoAgua.update();
}

function adicionarAparelho() {
    const aparelhosDiv = document.getElementById('aparelhos');
    const novoAparelho = document.createElement('div');
    novoAparelho.classList.add('aparelho', 'mb-3');
    novoAparelho.innerHTML = `
        <label class="form-label">Potência do aparelho (W):</label>
        <input type="number" class="form-control potencia mb-2" placeholder="Ex: 1000">
        <label class="form-label">Horas de uso por dia:</label>
        <input type="number" class="form-control horas mb-2" placeholder="Ex: 5">
        <button class="btn btn-outline-danger btn-sm" onclick="removerAparelho(this)">- Remover</button>
    `;
    aparelhosDiv.appendChild(novoAparelho);
}

function removerAparelho(botao) {
    botao.parentElement.remove();
}

function calcularEnergia() {
    const potencias = document.querySelectorAll('.potencia');
    const horas = document.querySelectorAll('.horas');
    let consumoTotal = 0;

    for (let i = 0; i < potencias.length; i++) {
        const p = parseFloat(potencias[i].value);
        const h = parseFloat(horas[i].value);
        if (!isNaN(p) && !isNaN(h)) {
            consumoTotal += (p * h) / 1000; 
        }
    }

    consumoEnergia = consumoTotal * 30;
    let resultado = `Consumo diário total: ${consumoTotal.toFixed(2)} kWh | Consumo mensal total: ${consumoEnergia.toFixed(2)} kWh.`;
    if (consumoEnergia > 400) {
        resultado += " Considere reduzir o uso ou trocar por equipamentos mais eficientes.";
    }
    document.getElementById('resultadoEnergia').textContent = resultado;

    atualizarGraficos();
}

function calcularAgua() {
    const tempo = parseFloat(document.getElementById('tempoAgua').value);
    const vazaoPadrao = 10;

    if (isNaN(tempo)) {
        document.getElementById('resultadoAgua').textContent = 'Por favor, informe o tempo de uso.';
        return;
    }

    consumoAgua = tempo * vazaoPadrao * 30;
    let resultado = `Consumo estimado: ${consumoAgua.toFixed(2)} litros por mês.`;
    if (consumoAgua > 20000) {
        resultado += " Tente reduzir o tempo de uso para economizar água.";
    }
    document.getElementById('resultadoAgua').textContent = resultado;

    atualizarGraficos();
}

const mensagens = [
    "Feche a torneira enquanto escova os dentes e economize até 12 litros de água por minuto!",
    "Troque lâmpadas incandescentes por LED: iluminam mais e consomem até 80% menos energia!",
    "Evite banhos longos: cada minuto a menos economiza cerca de 10 litros de água.",
    "Desligue aparelhos da tomada quando não estiverem em uso e evite o consumo fantasma!",
    "Reutilize água da chuva para regar plantas ou lavar calçadas e economize recursos.",
    "Ajuste a geladeira: temperaturas muito baixas gastam mais energia sem necessidade.",
    "Use balde ao invés de mangueira para lavar o carro: economiza até 300 litros de água!",
    "Aproveite a luz natural: abra cortinas e reduza o uso de lâmpadas durante o dia.",
    "Conserte vazamentos: uma torneira pingando pode desperdiçar mais de 40 litros por dia!",
    "Ao lavar roupas, utilize a máquina sempre cheia: menos ciclos, mais economia de água e energia!"
];

function mostrarMensagem() {
    const indice = Math.floor(Math.random() * mensagens.length);
    const mensagem = mensagens[indice];
    const dicaElemento = document.getElementById('mensagemDica');
    dicaElemento.textContent = mensagem;
    dicaElemento.classList.remove('d-none');
}

const originalCalcularEnergia = calcularEnergia;
calcularEnergia = function() {
    originalCalcularEnergia();
    mostrarMensagem();
};

const originalCalcularAgua = calcularAgua;
calcularAgua = function() {
    originalCalcularAgua();
    mostrarMensagem();
};
