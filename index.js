(() => {
    let regras = JSON.parse(localStorage.getItem('regras')) || [];
    let variaveis = JSON.parse(localStorage.getItem('variaveis')) || [];

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
                .removeEventListener('change', preenchevalor);
            if (evente.target.textContent === 'Perguntas') {

                preenchePergunta();

                document.getElementById('buttopergunta')
                    .addEventListener('click', adicionaperg);

            }
            if (evente.target.textContent === 'Regras') {
                document.getElementById('regvariavel')
                    .addEventListener('change', preenchevalor);
                document.getElementById("regrasform").addEventListener("submit", adicionarCondicao)
                document.getElementById("adicionaregra").addEventListener("click", adicionarRegra)

                preencheregra();
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
                    name: data.get('formname'), tipo: data.get('Tipo'), valores: [], pergunta: ''
                });
                atualizaCache()
                formvar.reset();

                preencheVariaveis();
            }
        });

    function preencheVariaveis() {
        const list = document.getElementById('variavelist');
        list.innerHTML = '';
        for (const variavel of variaveis) {
            const item = document.createElement('li');
            item.innerHTML = variavel?.name;
            item.addEventListener('click', () => {
                const teste = document.querySelector('#index');
                teste.value = variavel?.name;
                formvar.style.display = 'none';
                valoresform.style.display = 'flex';
                preencherValores();
            });
            list.appendChild(item);

        }

    }

    /*
        document.getElementById('buttonvalordelete')
            .addEventListener('click', () => {
                // const valorApagar = document.getElementById('valores').value;

                for (const variavel of variaveis) {
                    const item = document.createElement('li');
                    item.innerHTML = variavel?.name;
                       const apagar = item.addEventListener('click', (variavelclick) => {
                           const target = document.querySelector('#index').value;
                           variaveis = variaveis.map((item) => {
                               if (target === item?.name) {
                                   const novosValores = item.valores.filter(valor => valor !== valorApagar);
                                   return {
                                       ...item, valores: novosValores
                                   };
                               }
                               return item;
                           });
                           preencherValores();
                       });
                }

            });*/

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

    function preencherValores() {
        const target = document.querySelector('#index').value;
        const find = variaveis.find((item) => item?.name === target);
        if (find) {
            const list = document.getElementById('valores');
            list.innerHTML = '';
            for (const item of find.valores) {
                const li = document.createElement('li');
                li.innerHTML = item;
                list.appendChild(li);

            }
        }

    }

    function preenchevalor(e) {
        const target = e.target.value;
        const {
            valores = [], tipo = ''
        } = variaveis.find(({name}) => (name === target)) || {};
        const regravalor = document.getElementById('regvalores');
        regravalor.innerHTML = `<option value selected>Desconhecido</option>`;
        if (tipo === '1') {
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
            const li = document.createElement('li');
            li.innerHTML = item?.name;
            li.addEventListener('click', () => {
                document.querySelector('#index2').value = item?.name;
                if (item?.pergunta) {
                    document.querySelector('#exibirperg').textContent = item?.pergunta;
                    const icon = document.createElement("i")
                    icon.classList.add('fa-solid')
                    icon.classList.add('fa-trash')
                    icon.setAttribute('role', 'button')
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

    function preencheregra() {
        const regravariavel = document.getElementById('regvariavel');
        regravariavel.innerHTML = `<option value selected>Selecione Uma Variavel</option>`;
        for (const item of variaveis) {
            const option = document.createElement('option');
            option.value = item?.name;
            option.textContent = item?.name;
            regravariavel.appendChild(option);
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
                document.querySelector("#regrasform").reset()
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
        const regrasform = document.getElementById('regrasform');
        const data = new FormData(regrasform);
        const regraSelecionada = Number(document.querySelector("#regraselecionada").value)
        regras = regras.map((value, index) => {
            if ((index) === regraSelecionada) {
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
        regrasform.reset()
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
                    <h2 class="accordion-header">
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

})();


