function limparDados() {
    if (confirm("ATENÇÃO: Deseja realmente APAGAR TODOS os dados de famílias cadastrados?")) {
        localStorage.removeItem('familiasSIMAP'); 
        carregarDados(); 
        alert("Todos os dados de famílias foram removidos com sucesso.");
    }
}


function carregarDados() {
    const dadosTabela = document.getElementById('dadosTabela');
    const stats = document.getElementById('stats');
    
  
    let familias = JSON.parse(localStorage.getItem('familiasSIMAP')) || [];
    dadosTabela.innerHTML = ''; 
    
    let altoRiscoCount = 0;

    if (familias.length === 0) {
        dadosTabela.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhuma família cadastrada ainda.</td></tr>';
        stats.textContent = 'Nenhuma família cadastrada.';
        return;
    }

    
    familias.forEach(familia => {
        const isVulneravel = familia.status === 'ALTO';
        if (isVulneravel) {
            altoRiscoCount++;
        }

        const row = dadosTabela.insertRow();
        if (isVulneravel) {
            row.classList.add('vulneravel');
        }

        row.insertCell().textContent = familia.id.toString().padStart(3, '0');
        row.insertCell().textContent = familia.nome;
        row.insertCell().textContent = 'R$ ' + familia.renda.toLocaleString('pt-BR');
        row.insertCell().textContent = familia.saneamento;
        row.insertCell().textContent = familia.escolaridade;
        row.insertCell().textContent = familia.status;
    });

    
    const porcentagemRisco = ((altoRiscoCount / familias.length) * 100).toFixed(0);
    stats.innerHTML = `
        🔴 **ATENÇÃO:** ${porcentagemRisco}% das ${familias.length} famílias cadastradas estão em **ALTO RISCO**.
        Ação Imediata Necessária!
    `;
}


document.addEventListener('DOMContentLoaded', carregarDados);