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
                preencheregra();

                document.getElementById('buttonregra')
                    .addEventListener('click', () => {

                    });
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
        console.log('preencheVariaveis', {variaveis})
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

    document.getElementById('buttonvalordelete')
        .addEventListener('click', () => {
            // const valorApagar = document.getElementById('valores').value;

            for (const variavel of variaveis) {
                const item = document.createElement('li');
                item.innerHTML = variavel?.name;
                /*   const apagar = item.addEventListener('click', (variavelclick) => {
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
                   });*/
            }

        });

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

    /*    function salvarregra(e) {
            const regrasform = document.getElementById('regrasform');
            const data = new FormData(regrasform);
            regras = [...regras, {
                variavel: data.get('regvariavel'), operador: data.get('regoperador'), valor: data.get('regvalores')
            }];
            atualizaCache()
        }*/

})();


