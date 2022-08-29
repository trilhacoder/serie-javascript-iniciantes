class ItemDeCompra {
    constructor(produtoComprado, quantidadeComprada, precoUnitario) {
        this.produtoComprado = produtoComprado
        this.quantidadeComprada = quantidadeComprada
        this.precoUnitario = precoUnitario
    }

    calcularPrecoTotalDoItem() {
        return this.quantidadeComprada * this.precoUnitario
    }
}