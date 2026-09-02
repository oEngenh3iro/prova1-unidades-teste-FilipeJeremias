class Prancha {
    constructor(marca, tamanho, tipo, pesoMaximo, preco) {
        this.marca = marca;
        this.tamanho = tamanho;
        this.tipo = tipo;
        this.pesoMaximo = pesoMaximo;
        this.preco = preco;
        this.emUso = false;
    }

    alugar() {
        if (this.emUso) {
            throw new Error("Prancha já está alugada");
        }
        this.emUso = true;
    }

    devolver() {
        if (!this.emUso) {
            throw new Error("Prancha não está alugada");
        }
        this.emUso = false;
    }

    suportaSurfista(peso) {
        if (peso <= 0) {
            throw new Error("Peso deve ser maior que zero");
        }
        return peso <= this.pesoMaximo;
    }

    calcularPrecoAluguel(dias) {
        if (dias <= 0) {
            throw new Error("Dias deve ser maior que zero");
        }
        return this.preco * 0.1 * dias;
    }

    aplicarDesconto(percentual) {
        if (percentual < 0 || percentual > 100) {
            throw new Error("Percentual deve estar entre 0 e 100");
        }
        this.preco = this.preco - (this.preco * percentual / 100);
        return this.preco;
    }

    obterInfo() {
        return `${this.marca} ${this.tamanho}ft, Tipo: ${this.tipo}, Preço: R$${this.preco}`;
    }
}

module.exports = Prancha;