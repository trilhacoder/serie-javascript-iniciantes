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

class Compra {    
    constructor() {
        this.valorTotalDaCompra = 0
        this.formaDePagamento = ""
        this.valorDoPagamento = 0
        this.itensDeCompra = []
    }

    registraItemDeCompra(itemDeCompra) {
        let precoTotalDoItem = itemDeCompra.calcularPrecoTotalDoItem()
        this.valorTotalDaCompra = this.valorTotalDaCompra + precoTotalDoItem

        console.log("Produto Comprado: " + itemDeCompra.produtoComprado)
        console.log("Quantidade Comprada: " + itemDeCompra.quantidadeComprada)
        console.log("Preço Unitário: " + itemDeCompra.precoUnitario)
        console.log("Preço Total Do Item: " + precoTotalDoItem)
        console.log("Valor Total Da Compra: " + this.valorTotalDaCompra)

        this.itensDeCompra.push(itemDeCompra)

        
    }

    calcularDescontroDaCompra() {
        const taxaDeDesconto = 0.05
        let desconto = 0
        if (this.formaDePagamento == "dinheiro" || this.formaDePagamento == "debito") {
            desconto = taxaDeDesconto * this.valorTotalDaCompra
        }
        return desconto
    }

    totalAPagar() {
        return this.valorTotalDaCompra - this.calcularDescontroDaCompra()
    }

    troco() {
        return this.valorDoPagamento - this.totalAPagar()
    }

    imprimeNotaFiscal() {
        console.log("### Nota fiscal da compra ###")

        this.itensDeCompra.forEach(function(itemDeCompra) {
            console.log("Produto Comprado: " + itemDeCompra.produtoComprado)
            console.log("Quantidade Comprada: " + itemDeCompra.quantidadeComprada)
            console.log("Preço Unitário: " + itemDeCompra.precoUnitario)
            console.log("Preço Total Do Item: " + itemDeCompra.precoUnitario * itemDeCompra.quantidadeComprada)
            console.log("Valor Total Da Compra: " + itemDeCompra)
        })
        
        console.log("Forma De Pagamento: " + this.formaDePagamento)
        console.log("Desconto: " + this.calcularDescontroDaCompra())
        console.log("Total A Pagar: " + this.totalAPagar())
        console.log("Valor Do Pagamento: " + this.valorDoPagamento)
        console.log("Troco: " + this.troco())
    }
}

let compra = new Compra()

let itemDeCompra1 = new ItemDeCompra("Caderno", 5, 10.5)
let itemDeCompra2 = new ItemDeCompra("Caneta", 3, 2.5)

compra.registraItemDeCompra(itemDeCompra1)
compra.registraItemDeCompra(itemDeCompra2)

compra.formaDePagamento = "debito"
compra.valorDoPagamento = 100.0

console.log("Forma De Pagamento: " + compra.formaDePagamento)
console.log("Desconto: " + compra.calcularDescontroDaCompra())
console.log("Total A Pagar: " + compra.totalAPagar())
console.log("Valor Do Pagamento: " + compra.valorDoPagamento)
console.log("Troco: " + compra.troco())

compra.imprimeNotaFiscal()