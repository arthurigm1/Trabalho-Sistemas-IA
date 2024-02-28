(() => {
  let variaveis = [];
  const valoresform = document.getElementById("valoresform")
  const formvar = document.getElementById("formvar")
  for (const item of document.querySelectorAll(".list li")) {
    item.addEventListener("click", (evente) => {
      for (const section of document.querySelectorAll(".main section")) {
        section.style.display = "none";
      }
      document.getElementById(evente.target.textContent).style.display = "block";
      if (evente.target.textContent === "Perguntas") {

        preenchePergunta()

        document.getElementById("buttopergunta").addEventListener("click" , (e) =>{
        const target = document.getElementById("index2").value
        })
      }

    })
  };

  document.getElementById("buttonsalvar").addEventListener("click", (evente) => {
    const data = new FormData(formvar);
    variaveis.push({ name: data.get("formname"), tipo: data.get("Tipo"), valores: [] , perguntas: ""})
    formvar.reset()

    encherVar();
  });
  function encherVar() {
    const list = document.getElementById("variavelist")
    list.innerHTML = "";
    for (const variavel of variaveis) {
      const item = document.createElement("li")
      item.innerHTML = variavel.name
      item.addEventListener("click", (variavelclick) => {

        const teste = document.querySelector("#index")
        teste.value = variavel.name

        formvar.style.display = "none";
        valoresform.style.display = "flex"

        preencherValores();
      })
      list.appendChild(item);

    }
  }
  document.getElementById("buttonvalor").addEventListener("click", (evente) => {
    const data = new FormData(valoresform);
    const target = document.querySelector("#index").value

    variaveis = variaveis.map((item) => {
      if (target === item.name) {
        return { ...item, valores: [...item.valores, data.get("formvalor")] }
      }
      return item;
    })
    valoresform.reset()
    preencherValores();
    console.log(variaveis)
  });

  document.getElementById("buttonfinalizar").addEventListener("click", (evente) => {

    valoresform.style.display = "none"
    formvar.style.display = "flex"

    const list = document.getElementById("valores")
    list.innerHTML = "";

  })

  function preencherValores() {
    const target = document.querySelector("#index").value
    const find = variaveis.find((item) => item.name === target)
    if (find) {
      const list = document.getElementById("valores")
      list.innerHTML = "";
      for (const item of find.valores) {
        const li = document.createElement("li");
        li.innerHTML = item
        list.appendChild(li)

      }
    }

  }

  function preenchePergunta() {
    const list = document.getElementById("perguntalist")
    list.innerHTML = ""

    for (const item of variaveis) {
      const li = document.createElement("li")
      li.innerHTML = item.name

      li.addEventListener("click", (evente) => {
        document.querySelector("#index2").value = item.name
      })
      list.appendChild(li)

    }

  }



})()


