var valorTotalDaCompra = 0;

var produtoComprado = "Caderno"
var quantidadeComprada = 5
var precoUnitario = 10.5
var precoTotalDoItem = quantidadeComprada * precoUnitario
valorTotalDaCompra = valorTotalDaCompra + precoTotalDoItem

console.log("Produto Comprado: " + produtoComprado)
console.log("Quantidade Comprada: " + quantidadeComprada)
console.log("Preço Unitário: " + precoUnitario)
console.log("Preço Total Do Item: " + precoTotalDoItem)
console.log("Valor Total Da Compra: " + valorTotalDaCompra)

produtoComprado = "Caneta"
quantidadeComprada = 3
precoUnitario = 2.5
precoTotalDoItem = quantidadeComprada * precoUnitario
valorTotalDaCompra = valorTotalDaCompra + precoTotalDoItem

console.log("Produto Comprado: " + produtoComprado)
console.log("Quantidade Comprada: " + quantidadeComprada)
console.log("Preço Unitário: " + precoUnitario)
console.log("Preço Total Do Item: " + precoTotalDoItem)
console.log("Valor Total Da Compra: " + valorTotalDaCompra)

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