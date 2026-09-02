const Prancha = require("../src/prancha");

describe("Prancha de Surf", () => {
    test("Deve criar uma prancha com os atributos corretos", () => {
        // Arrange & Act
        const prancha = new Prancha("Rip Curl", 6.2, "shortboard", 85, 2500);

        // Assert
        expect(prancha.marca).toBe("Rip Curl");
        expect(prancha.tamanho).toBe(6.2);
        expect(prancha.tipo).toBe("shortboard");
        expect(prancha.pesoMaximo).toBe(85);
        expect(prancha.preco).toBe(2500);
        expect(prancha.emUso).toBe(false);
    });

    test("Deve alugar uma prancha disponível", () => {
        // Arrange
        const prancha = new Prancha("Channel Islands", 6.0, "shortboard", 80, 3000);

        // Act
        prancha.alugar();

        // Assert
        expect(prancha.emUso).toBe(true);
    });

    test("Deve lançar erro ao tentar alugar prancha já alugada", () => {
        // Arrange
        const prancha = new Prancha("Lost", 5.10, "shortboard", 75, 2800);
        prancha.alugar();

        // Act & Assert
        expect(() => prancha.alugar()).toThrow("Prancha já está alugada");
    });

    test("Deve devolver uma prancha alugada", () => {
        // Arrange
        const prancha = new Prancha("Firewire", 6.4, "funboard", 90, 3200);
        prancha.alugar();

        // Act
        prancha.devolver();

        // Assert
        expect(prancha.emUso).toBe(false);
    });

    test("Deve lançar erro ao devolver prancha que não está alugada", () => {
        // Arrange
        const prancha = new Prancha("JS Industries", 6.2, "shortboard", 82, 2900);

        // Act & Assert
        expect(() => prancha.devolver()).toThrow("Prancha não está alugada");
    });

    test("Deve retornar true quando surfista tem peso suportado", () => {
        // Arrange
        const prancha = new Prancha("Pyzel", 6.0, "shortboard", 85, 3100);

        // Act
        const resultado = prancha.suportaSurfista(80);

        // Assert
        expect(resultado).toBe(true);
    });

    test("Deve retornar false quando surfista excede o peso máximo", () => {
        // Arrange
        const prancha = new Prancha("Pyzel", 6.0, "shortboard", 85, 3100);

        // Act
        const resultado = prancha.suportaSurfista(100);

        // Assert
        expect(resultado).toBe(false);
    });

    test("Deve lançar erro ao verificar suporte com peso inválido", () => {
        // Arrange
        const prancha = new Prancha("Pyzel", 6.0, "shortboard", 85, 3100);

        // Act & Assert
        expect(() => prancha.suportaSurfista(0)).toThrow("Peso deve ser maior que zero");
    });

    test("Deve calcular preço de aluguel corretamente", () => {
        // Arrange
        const prancha = new Prancha("Al Merrick", 6.1, "shortboard", 80, 2000);

        // Act
        const preco = prancha.calcularPrecoAluguel(5);

        // Assert
        expect(preco).toBe(1000);
    });

    test("Deve lançar erro ao calcular aluguel com dias inválidos", () => {
        // Arrange
        const prancha = new Prancha("Al Merrick", 6.1, "shortboard", 80, 2000);

        // Act & Assert
        expect(() => prancha.calcularPrecoAluguel(0)).toThrow("Dias deve ser maior que zero");
    });

    test("Deve aplicar desconto corretamente no preço", () => {
        // Arrange
        const prancha = new Prancha("DHD", 6.3, "shortboard", 85, 2000);

        // Act
        const novoPreco = prancha.aplicarDesconto(20);

        // Assert
        expect(novoPreco).toBe(1600);
        expect(prancha.preco).toBe(1600);
    });

    test("Deve lançar erro ao aplicar desconto inválido", () => {
        // Arrange
        const prancha = new Prancha("DHD", 6.3, "shortboard", 85, 2000);

        // Act & Assert
        expect(() => prancha.aplicarDesconto(150)).toThrow("Percentual deve estar entre 0 e 100");
        expect(() => prancha.aplicarDesconto(-10)).toThrow("Percentual deve estar entre 0 e 100");
    });

    test("Deve retornar informações da prancha formatadas", () => {
        // Arrange
        const prancha = new Prancha("Hayden Shapes", 5.11, "shortboard", 78, 3500);

        // Act
        const info = prancha.obterInfo();

        // Assert
        expect(info).toBe("Hayden Shapes 5.11ft, Tipo: shortboard, Preço: R$3500");
    });
});