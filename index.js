(() => {
    let regras = JSON.parse(localStorage.getItem('regras')) || [];
    let variaveis = JSON.parse(localStorage.getItem('variaveis')) || [];
    let respostas = [];

    function atualizaCache() {
        localStorage.setItem("variaveis", JSON.stringify(variaveis))
        localStorage.setItem("regras", JSON.stringify(regras))
    }

    const valoresform = document.getElementById('valoresform');
    const formvar = document.getElementById('formvar');
    const formperg = document.getElementById('perguntasform');
    const adicionaperg = (e) => {
        const target = document.getElementById('index2').value;
        const data = new FormData(formperg);
        const pergunta = data.get('perguntaform');

        if (target !== '' && pergunta !== '') {
            variaveis = variaveis.map((item) => {
                if (target === item?.name) {
                    formperg.reset();
                    return {
                        ...item, pergunta
                    };
                }
                return item;
            });
            atualizaCache()

        } else if (target === '') {
            alert('Selecione uma variavel');
        }

        preenchePergunta();
        e.preventDefault();
        e.stopPropagation();
    };
    for (const item of document.querySelectorAll('.list li')) {
        item.addEventListener('click', (evente) => {
            for (const section of document.querySelectorAll('.main section')) {
                section.style.display = 'none';
            }
            document.getElementById(evente.target.textContent).style.display = 'block';
            document.getElementById('buttopergunta')
                .removeEventListener('click', adicionaperg);
            document.getElementById('regvariavel')
                .removeEventListener('change', preenchevalor("regvalores"));
            if (evente.target.textContent === 'Perguntas') {

                preenchePergunta();

                document.getElementById('buttopergunta')
                    .addEventListener('click', adicionaperg);

            }
            if (evente.target.textContent === 'Regras') {
                document.getElementById('regvariavel')
                    .addEventListener('change', preenchevalor("regvalores"));
                document.getElementById('entaovariavel')
                    .addEventListener('change', preenchevalor("entaovalores"));
                document.getElementById("condicaoForm")
                    .addEventListener("submit", adicionarCondicao)
                document.getElementById("entaoform")
                    .addEventListener("submit", adicionarEntao)
                document.getElementById("adicionaregra").addEventListener("click", adicionarRegra)
                preencheCondicoesEEntao();
                preencheListaDeRegras()

            }
            if (evente.target.textContent === 'Variaveis') {
                preencheVariaveis()
            }


        });
    }

    document.getElementById('buttonsalvar')
        .addEventListener('click', () => {
            const data = new FormData(formvar);
            if (data.get('formname') === '') {
                alert('Preencha um valor');
            } else {
                variaveis.push({
                    name: data.get('formname'),
                    tipo: data.get('Tipo'),
                    valores: [],
                    pergunta: '',
                    objetivo: document.getElementById("objetivo").checked
                });
                atualizaCache()
                formvar.reset();

                preencheVariaveis();
            }
        });

    document.querySelector("#executa").onclick = e => {
        localStorage.setItem("indexExecucao", "0")
        respostas = [];
        const variaveisUtilizadasNaExecucao = variaveis.filter((itVar) => {
            if (itVar?.objetivo) {
                return false
            }
            return regras.some(({
                                    se, entao
                                }) => (se.some((itSe) => itSe.variavel === itVar.name) || entao.some((itEntao) => itEntao.variavel === itVar.name)))
        })
        const listaDeExecucao = document.getElementById("listaDeExecucao")
        listaDeExecucao.innerHTML = geraListaDeExecucao(variaveisUtilizadasNaExecucao)
        const avancarBTN = document.getElementById("avancar")
        const perguntas = document.querySelectorAll(".carousel-item")
        avancarBTN.onclick = e => {
            const indexExecucao = Number(localStorage.getItem("indexExecucao"))
            //Object.values($0.selectedOptions).map(({value})=>value)
            const respostaAtual = document.getElementById("respostas-" + indexExecucao).value
            const execucaoVariavel = document.getElementById("execucaoVariavel-" + indexExecucao).value
            respostas = [...respostas, {variavel: execucaoVariavel, resposta: respostaAtual}]
            for (const perguntaParaRemoverStatus of perguntas) {
                perguntaParaRemoverStatus.classList.remove("active")
            }
            console.log({indexExecucao, length: perguntas.length, perguntas})
            if ((indexExecucao + 1) === perguntas.length) {
                console.log("ultima pagina: resultado", {respostas})
            } else {
                perguntas[indexExecucao + 1].classList.add("active")
                localStorage.setItem("indexExecucao", String(indexExecucao + 1))
            }
        }

    }

    function preencheVariaveis() {
        const list = document.getElementById('variavelist');
        list.innerHTML = '';
        for (const variavel of variaveis) {
            const item = document.createElement('li');
            const itemBTN = document.createElement('button')
            itemBTN.style.background = 'transparent'
            itemBTN.style.border = 'none'
            itemBTN.textContent = variavel?.name;
            itemBTN.addEventListener('click', () => {
                const teste = document.querySelector('#index');
                teste.value = variavel?.name;
                formvar.style.display = 'none';
                valoresform.style.display = 'flex';
                preencherValores();
            });
            const icon = deleteIcon()
            icon.classList.add('ms-2')
            icon.onclick = e => {
                variaveis = variaveis.filter(({name}) => name !== variavel?.name)
                regras = regras.filter(({se, entao}) => {
                    const seCheck = se.some(({variavel: variavelSe}) => variavelSe === variavel?.name)
                    const entaoCheck = entao.some(({variavel: variavelEntao}) => variavelEntao === variavel?.name)
                    return !(seCheck || entaoCheck);
                })
                atualizaCache()
                preencheVariaveis()
                e.preventDefault()
            }
            item.appendChild(icon)
            item.appendChild(itemBTN)
            list.appendChild(item);
        }

    }

    document.getElementById('buttonvalor')
        .addEventListener('click', () => {
            const data = new FormData(valoresform);
            const target = document.querySelector('#index').value;

            if (data.get('formvalor') === '') {
                alert('Preencha um valor');
            } else {
                variaveis = variaveis.map((item) => {
                    if (target === item?.name) {
                        return {
                            ...item, valores: [...item.valores, data.get('formvalor')]
                        };
                    }
                    return item;
                });
                atualizaCache()
                valoresform.reset();
                preencherValores();
            }
        });

    document.getElementById('buttonfinalizar')
        .addEventListener('click', () => {

            valoresform.style.display = 'none';
            formvar.style.display = 'flex';

            const list = document.getElementById('valores');
            list.innerHTML = '';

        });

    function deleteIcon() {
        const icon = document.createElement("i")
        icon.classList.add('fa-solid')
        icon.classList.add('fa-trash')
        icon.classList.add('text-danger')
        icon.setAttribute('role', 'button')
        return icon
    }

    function preencherValores() {
        const target = document.querySelector('#index').value;
        const find = variaveis.find((item) => item?.name === target);
        if (find) {
            const list = document.getElementById('valores');
            list.innerHTML = '';
            for (const item of find.valores) {
                const li = document.createElement('li');
                li.innerHTML = item;
                const icon = deleteIcon()
                icon.classList.add('ms-2')
                icon.onclick = e => {
                    variaveis = variaveis.map((it, index) => {
                        if (it?.name === target) {
                            return {
                                ...it, valores: it.valores.filter((value) => value !== item)
                            }
                        }
                        return it;
                    })
                    regras = regras.filter(({se, entao}) => {
                        const seCheck = se.some(({valor: valorSe}) => valorSe === item)
                        const entaoCheck = entao.some(({valor: valorEntao}) => valorEntao === item)
                        return !(seCheck || entaoCheck);
                    })
                    atualizaCache()
                    preencherValores()
                    e.preventDefault()
                }
                li.appendChild(icon)
                list.appendChild(li);

            }
        }

    }

    const preenchevalor = (targetNode) => function (e) {
        const target = e.target.value;
        const {
            valores = [], tipo = '', objetivo = false
        } = variaveis.find(({name}) => (name === target)) || {};
        const regravalor = document.getElementById(targetNode);
        regravalor.innerHTML = `<option value selected>Desconhecido</option>`;
        if (tipo === '1' || objetivo) {
            for (const valor of valores) {
                const option = document.createElement('option');
                option.value = valor;
                option.textContent = valor;
                regravalor.appendChild(option);
            }

        } else if (tipo === '2') {
            regravalor.innerHTML = `
      <option value selected>Desconhecido</option>
      <option value="1" >Sim</option>
      <option value="2" >Nao</option>
      `;
        } else if (tipo === '3') {
            regravalor.innerHTML = `
      <option value selected>Desconhecido</option>
      <option value="1" >0</option>
      <option value="2" >1</option>
      `;
        }
    }

    function preenchePergunta() {
        const list = document.getElementById('perguntalist');
        list.innerHTML = '';
        for (const item of variaveis) {
            if (!item?.objetivo) {
                const li = document.createElement('li');
                li.innerHTML = item?.name;
                li.addEventListener('click', () => {
                    document.querySelector('#index2').value = item?.name;
                    if (item?.pergunta) {
                        document.querySelector('#exibirperg').textContent = item?.pergunta;
                        const icon = deleteIcon()
                        icon.classList.add('ms-2')
                        icon.addEventListener('click', e => {
                            variaveis = variaveis.map((variavel) => {
                                if (variavel.name === item?.name) {
                                    return {...variavel, pergunta: ""}
                                }
                                return variavel
                            })
                            atualizaCache()
                            document.querySelector('#exibirperg').innerHTML = ""
                            e.preventDefault()
                        })
                        document.querySelector('#exibirperg').appendChild(icon)
                    }
                });
                list.appendChild(li);
            }

        }

    }

    function preencheCondicoesEEntao() {
        const regravariavel = document.getElementById('regvariavel');
        regravariavel.innerHTML = `<option value selected>Selecione Uma Variavel</option>`;
        for (const item of variaveis) {
            const option = document.createElement('option');
            option.value = item?.name;
            option.textContent = item?.name;
            regravariavel.appendChild(option);
        }
        const entaovariavel = document.getElementById('entaovariavel');
        entaovariavel.innerHTML = `<option value selected>Selecione Uma Variável</option>`;
        for (const item of variaveis) {
            if (item?.objetivo) {
                const option = document.createElement('option');
                option.value = item?.name;
                option.textContent = item?.name;
                entaovariavel.appendChild(option);
            }
        }
    }

    function preencheListaDeRegras() {
        const listaDeRegras = document.getElementById("listaDeRegras")
        listaDeRegras.innerHTML = ''
        const accordionFlushExample = document.createElement("div")
        accordionFlushExample.classList.add("accordion")
        accordionFlushExample.classList.add("accordion-flush")
        accordionFlushExample.id = "accordionFlushExample"
        accordionFlushExample.innerHTML = geraTabelaDeRegras(regras)
        listaDeRegras.appendChild(accordionFlushExample)

        const listaDeRegrasCollapsed = document.querySelectorAll(".collapsed")
        for (let i = 0; i < listaDeRegrasCollapsed.length; i++) {
            listaDeRegrasCollapsed[i].onclick = e => {
                document.querySelector("#regraselecionada").value = i;
                document.querySelector("#condicaoForm").reset()
                e.preventDefault()
            }
        }
        const regrasBTN = document.querySelectorAll(".regra")
        for (let i = 0; i < regrasBTN.length; i++) {
            regrasBTN[i].onclick = e => {
                regras = regras.filter((value, index,) => index !== i)
                atualizaCache()
                preencheCondicoesEEntao();
                preencheListaDeRegras()
                e.preventDefault()
            }
        }

    }

    function adicionarRegra(e) {
        regras = [...regras, {se: [], entao: []}]
        atualizaCache()
        preencheListaDeRegras()
        e.preventDefault()
    }

    function adicionarCondicao(e) {
        const condicaoForm = document.getElementById('condicaoForm');
        const data = new FormData(condicaoForm);
        regras = regras.map((value, index) => {
            if ((index) === regraSelecionada()) {
                return {
                    ...value, se: [...value.se, {
                        variavel: data.get('regvariavel'),
                        operador: data.get('regoperador'),
                        valor: data.get('regvalores')
                    }]
                };
            } else {
                return value;
            }
        })
        condicaoForm.reset()
        atualizaCache()
        preencheListaDeRegras()
        e.preventDefault()
        return false
    }

    function regraSelecionada() {
        return Number(document.querySelector("#regraselecionada").value)
    }

    function adicionarEntao(e) {
        const entaoform = document.getElementById('entaoform');
        const data = new FormData(entaoform);
        regras = regras.map((value, index) => {
            if ((index) === regraSelecionada()) {
                return {
                    ...value, entao: [...value.entao, {
                        variavel: data.get('entaovariavel'),
                        operador: data.get('entaooperador'),
                        valor: data.get('entaovalores')
                    }]
                };
            } else {
                return value;
            }
        })
        entaoform.reset()
        atualizaCache()
        preencheListaDeRegras()
        e.preventDefault()
        return false
    }

    function geraTabelaDeRegras(regras = []) {
        if (!Array.isArray(regras) || (Array.isArray(regras) && !regras.length)) {
            return ""
        }

        function geraLinhaDaTabelaSE(linhas = []) {
            if (!Array.isArray(linhas) || (Array.isArray(linhas) && !linhas.length)) {
                return ""
            }
            return linhas.reduce(function cb(previousValue, {variavel, operador, valor}, currentIndex) {
                return previousValue.concat(`<tr>
                           <th scope="row">${currentIndex + 1}</th>
                            <td>${variavel}</td>
                            <td>${operador}</td>
                            <td>${valor}</td>
                         </tr>`)
            }, '')
        }

        function geraLinhaDaTabelaENTAO(linhas = []) {
            if (!Array.isArray(linhas) || (Array.isArray(linhas) && !linhas.length)) {
                return ""
            }
            return linhas.reduce(function cb(previousValue, {variavel, valor}, currentIndex) {
                return previousValue.concat(`<tr>
                            <th scope="row">${currentIndex + 1}</th>
                            <td>${variavel}</td>
                            <td>${valor}</td>
                         </tr>`)
            }, '')
        }

        return regras.reduce(function (previousValue, {se, entao}, currentIndex) {
            return previousValue.concat(`<div class="accordion-item">
                    <h2 class="accordion-header d-flex align-items-center ">
                     <i class="fa-solid fa-trash regra me-2 text-danger" role="button"></i> 
                        <button
                            aria-controls="flush-collapseOne-${currentIndex + 1}"
                            aria-expanded="false"
                            class="accordion-button collapsed"
                            data-bs-target="#flush-collapseOne-${currentIndex + 1}"
                            data-bs-toggle="collapse"
                            type="button"
                        >
                          Regra ${currentIndex + 1}
                        </button>
                    </h2>
                    <div class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample"
                         id="flush-collapseOne-${currentIndex + 1}">
                        <div class="accordion-body">
                        <h3  class="h3">Se</h3>
                         <table class="table table-dark  table-striped rounded table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Variavel</th>
                                    <th scope="col">Operador</th>
                                    <th scope="col">Valor</th>
                                    </tr>
                            </thead>
                            <tbody>
                                ${geraLinhaDaTabelaSE(se)}
                            </tbody>
                         </table>       
                         <h3 class="h3">então</h3>      
                         <table class="table table-dark  table-striped rounded table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Variavel</th>
                                    <th scope="col">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${geraLinhaDaTabelaENTAO(entao)}
                            </tbody>
                         </table>
                        </div>
                    </div>
                </div>`)
        }, '')

    }

    function geraSelectDeResposta(valores = [], tipo, index) {
        const options = String(tipo) === '1' ? valores.reduce((previousValue, currentValue, currentIndex, array) => (previousValue.concat(`
                   <option value="${currentValue}">${currentValue}</option>
            `)), '') : `
           <option value="1">sim</option>
           <option value="2">nao</option>
        `
        return `
                <select id="respostas-${index}" name="respostas" class="form-select" ${String(tipo) === '1' ? 'multiple' : ''}>
                   ${options}
                </select>
        `
    }

    function geraListaDeExecucao(variaveisDeExecucao = []) {
        if (!Array.isArray(variaveisDeExecucao) || (Array.isArray(variaveisDeExecucao) && !variaveisDeExecucao.length)) {
            return ""
        }
        return variaveisDeExecucao.reduce(function (previousValue, {pergunta, name, valores, tipo}, currentIndex) {
            return previousValue.concat(`
            <div class="carousel-item ${currentIndex === 0 ? 'active' : ''}">
                <h2 class="h3 mb-4 text-capitalize">${pergunta.replaceAll("?", " ")}?</h2>
                <input type="hidden" name="execucaoVariavel-${currentIndex}" id="execucaoVariavel-${currentIndex}" value="${name}" >
                ${geraSelectDeResposta(valores, tipo, currentIndex)}
            </div>
            `)
        }, '')
    }

})();

