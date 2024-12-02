const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emoji celebrando">';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emoji decepcionado">';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

  
    adicionaLinha();
    
    atualizaTabela();
    
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    
    const nomeAtividade = inputNomeAtividade.value.trim();
    const nota = parseFloat(inputNotaAtividade.value);

    
    if (nota < 0 || nota > 10 || isNaN(nota)) {
        alert("A nota deve estar entre 0 e 10.");
        inputNotaAtividade.value = ''; 
        return; 
    }

    if (atividades.includes(nomeAtividade)) {
        alert(`A atividade: ${nomeAtividade} já foi inserida.`);
    } else {
       
        const linha = document.createElement('tr');
        
        const tdNome = document.createElement('td');
        tdNome.textContent = nomeAtividade;
        
        const tdNota = document.createElement('td');
        tdNota.textContent = nota;
        
        const tdStatus = document.createElement('td');
        tdStatus.innerHTML = nota >= notaMinima ? imgAprovado : imgReprovado;
  
        linha.appendChild(tdNome);
        linha.appendChild(tdNota);
        linha.appendChild(tdStatus);

 
        const corpoTabela = document.querySelector('tbody');
        corpoTabela.appendChild(linha);

       
        atividades.push(nomeAtividade);
        notas.push(nota);
    }

   
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    
}

function atualizaMediaFinal() {
    const mediaFinal = calcularMedia();
    
    document.getElementById('media-final-valor').textContent = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calcularMedia() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}
