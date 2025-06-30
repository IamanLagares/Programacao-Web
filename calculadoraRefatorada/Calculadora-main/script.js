const visor = document.getElementById('resultado');


function insert(valor) {
    const atual = visor.textContent;
    const ultimo = atual.slice(-1);

    
    if ("+-*/.".includes(ultimo) && "+-*/.".includes(valor)) return;

   
    if (atual === "" && valor === ".") return;

  
    if (valor === "." && atual.match(/(\d*\.\d*)$/)) return;

    visor.textContent += valor;
}

function clean() {
    visor.textContent = "";
}


function back() {
    visor.textContent = visor.textContent.slice(0, -1);
}


function calcular() {
    const expressao = visor.textContent.trim();

    if (!expressao) {
        visor.textContent = "Nada...";
        return;
    }

    try {
        //operador inválido
        if (/^[*/.]/.test(expressao)) throw new Error("Expressão inválida");

        const resultado = Function(`"use strict"; return (${expressao})`)();

        if (resultado === Infinity || resultado === -Infinity) {
            visor.textContent = "Divisão por 0";
            return;
        }

        if (isNaN(resultado) || typeof resultado !== "number") {
            visor.textContent = "Erro";
            return;
        }

        visor.textContent = resultado;
    } catch (erro) {
        visor.textContent = "Erro";
        console.error("Erro ao calcular:", erro.message);
    }
}
