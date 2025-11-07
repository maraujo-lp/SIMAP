document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    let valido = true;
    
   
    const getVal = (id) => document.getElementById(id).value.trim();
    const setErro = (id, msg) => {
        document.getElementById(id).textContent = msg;
    };

    
    const nomeChefe = getVal('nomeChefe');
    if (nomeChefe === '') { setErro('erroNome', 'O nome do responsável é obrigatório.'); valido = false; } else { setErro('erroNome', ''); }

    const endereco = getVal('endereco');
    if (endereco === '') { setErro('erroEndereco', 'O endereço é obrigatório para o mapa.'); valido = false; } else { setErro('erroEndereco', ''); }

    const rendaInput = getVal('renda');
    const renda = parseInt(rendaInput);
    if (isNaN(renda) || renda < 0) { setErro('erroRenda', 'Renda inválida. Use apenas números positivos.'); valido = false; } else if (renda < 500) { setErro('erroRenda', 'Renda muito baixa: ALTA VULNERABILIDADE detectada.'); } else { setErro('erroRenda', ''); }
    
    const escolaridadeElemento = document.getElementById('escolaridade');
    const escolaridade = getVal('escolaridade');
    if (escolaridade === '') { setErro('erroEscolaridade', 'Selecione a escolaridade.'); valido = false; } else { setErro('erroEscolaridade', ''); }

    const saneamento = getVal('saneamento');
    if (saneamento === '') { setErro('erroSaneamento', 'Informe o acesso a saneamento.'); valido = false; } else { setErro('erroSaneamento', ''); }

    // Se tudo estiver válido salva em LocalStorage
    if (valido) {
        let familias = JSON.parse(localStorage.getItem('familiasSIMAP')) || [];
        
        const novaFamilia = {
            id: familias.length + 1,
            nome: nomeChefe,
            endereco: endereco,
            renda: renda,
            saneamento: saneamento === 'sim' ? 'Sim' : 'Não',
            escolaridade: escolaridadeElemento.options[escolaridadeElemento.selectedIndex].text,
            
            status: renda < 500 || saneamento === 'nao' ? 'ALTO' : 'Baixo'
        };

        familias.push(novaFamilia);
        localStorage.setItem('familiasSIMAP', JSON.stringify(familias));

        alert('Família cadastrada com sucesso! Dados prontos. Visite o Dashboard para visualizar.');
        document.getElementById('formCadastro').reset();
    }
});