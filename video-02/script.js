var valorTotalDaCompra = 0;

function registraItemDeCompra(produtoComprado, quantidadeComprada, precoUnitario) {
    var precoTotalDoItem = quantidadeComprada * precoUnitario
    valorTotalDaCompra = valorTotalDaCompra + precoTotalDoItem

    console.log("Produto Comprado: " + produtoComprado)
    console.log("Quantidade Comprada: " + quantidadeComprada)
    console.log("Preço Unitário: " + precoUnitario)
    console.log("Preço Total Do Item: " + precoTotalDoItem)
    console.log("Valor Total Da Compra: " + valorTotalDaCompra)
}

registraItemDeCompra("Caderno", 5, 10.5)
registraItemDeCompra("Caneta", 3, 2.5)
registraItemDeCompra("Lápis", 2, 1.2)
registraItemDeCompra("Borracha", 4, 1.3)

var formaDePagamento = "dinheiro"
var desconto = 0.05 * valorTotalDaCompra
var totalAPagar = valorTotalDaCompra - desconto
var valorDoPagamento = 100.0
var troco = valorDoPagamento - totalAPagar

console.log("Forma De Pagamento: " + formaDePagamento)
console.log("Desconto: " + desconto)
console.log("Total A Pagar: " + totalAPagar)
console.log("Valor Do Pagamento: " + valorDoPagamento)
console.log("Troco: " + troco)