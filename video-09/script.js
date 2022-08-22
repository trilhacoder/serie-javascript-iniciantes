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
        this.carregarProdutos()
    }

    carregarProdutos() {
        limparMensagemDeErro()
        fetch("https://62f69d13612c13062b5210ea.mockapi.io/api/produtos")
            .then(function(response) {
                if (!response.ok) {
                    throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
                }
                return response.json()
            })
            .then(function(produtos) {
                console.log(produtos)
                produtos.forEach(function(produto) {
                    insereProdutoNaTabela(produto)
                })
            })
            .catch(function(error) {
                exibeMensagemDeErro(error)                
            })
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

let registrar = document.querySelector("#registrar")

registrar.addEventListener("click", function(event) {
    event.preventDefault();

    let produto = document.querySelector("#produto")
    let quantidade = document.querySelector("#quantidade")
    let precoUnitario = document.querySelector("#preco-unitario")

    console.log(produto.value)
    console.log(quantidade.value)
    console.log(precoUnitario.value)

    limparMensagemDeErro()

    fetch("https://62f69d13612c13062b5210ea.mockapi.io/api/produtos", {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	    produto_comprado: produto.value,
	    quantidade_comprada: quantidade.value,
	    preco_unitario: precoUnitario.value
	  })
	})
	.then(function(response) {
        if (!response.ok) {
            throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
        }
		return response.json()
	})
	.then(function(produto) {
	    insereProdutoNaTabela(produto)
	})
    .catch(function(error) {
        exibeMensagemDeErro(error)
    })

    
})

function limparMensagemDeErro() {
    let mensagem = document.querySelector("#mensagemErro")
    mensagem.textContent = ""
    mensagem.style.display = "none"
}

function exibeMensagemDeErro(error) {
    let mensagem = document.querySelector("#mensagemErro")
    mensagem.textContent = "Ocorreu um erro: " + error
    mensagem.style.display = "block"
    console.log("Ocorreu um erro: " + error)
}

function insereProdutoNaTabela(produto) {
    let itemDeCompra = new ItemDeCompra(
        produto.produto_comprado, 
        produto.quantidade_comprada, 
        produto.preco_unitario)

    compra.registraItemDeCompra(itemDeCompra)    
    
    let tBodyTabela = document.querySelector("#tabela tbody")

    let tr = document.createElement("tr")
    tr.setAttribute("id", produto.id)
    
    let tdProduto = document.createElement("td")
    tdProduto.textContent = itemDeCompra.produtoComprado
    
    let tdQuantidade = document.createElement("td")
    tdQuantidade.textContent = itemDeCompra.quantidadeComprada
    
    let tdPrecoUnitario = document.createElement("td")
    tdPrecoUnitario.textContent = itemDeCompra.precoUnitario

    let tdPrecoTotalDoItem = document.createElement("td")
    tdPrecoTotalDoItem.textContent = itemDeCompra.calcularPrecoTotalDoItem()

    tr.appendChild(tdProduto)
    tr.appendChild(tdQuantidade)
    tr.appendChild(tdPrecoUnitario)
    tr.appendChild(tdPrecoTotalDoItem)

    tBodyTabela.appendChild(tr)

    let valorTotalDaCompra = document.querySelector("#valorTotalDaCompra")
    valorTotalDaCompra.textContent = compra.valorTotalDaCompra

    let desconto = document.querySelector("#desconto")
    console.log("calculando desconto  ...: ")
    console.log(desconto)

    let formaDePagamento = document.querySelector("#formaDePagamento")
    
    compra.formaDePagamento = formaDePagamento.value
    
    if (formaDePagamento.value == "debito" || formaDePagamento.value == "dinheiro") {
        console.log("calculando desconto  ...")
        let novoDesconto = compra.calcularDescontroDaCompra()
        let descontoAtual = document.querySelector("#desconto")
        descontoAtual.textContent = novoDesconto
    }

    let totalAPagar = document.querySelector("#totalAPagar")
    console.log("#totalapagar:"  + compra.totalAPagar())
    totalAPagar.textContent = compra.totalAPagar()

    let troco = document.querySelector("#troco")
    troco.textContent = compra.troco()    
}

let formaDePagamento = document.querySelector("#formaDePagamento")

formaDePagamento.addEventListener("change", function(event) {
    console.log(event.target.value)

    compra.formaDePagamento = formaDePagamento.value

    if (event.target.value == "credito") {
        let desconto = document.querySelector("#desconto")
        desconto.textContent = "0.0"
    } else {
        let descontoRecalculado = compra.calcularDescontroDaCompra()
        let desconto = document.querySelector("#desconto")
        desconto.textContent = descontoRecalculado
    }
    
    let totalAPagar = document.querySelector("#totalAPagar")
    totalAPagar.textContent = compra.totalAPagar()

})

// let finalizarCompra = document.querySelector("#finalizarCompra")
// finalizarCompra.addEventListener("click", function(event) {
//     event.preventDefault()

//     console.log("finalizarCompra...")

//     let trsDaTabela = document.querySelectorAll("#tabela tbody tr")

//     console.log(trsDaTabela)

//     trsDaTabela.forEach(function(trDaTabela) {
//         console.log(trDaTabela.id)
//         fetch("https://62f69d13612c13062b5210ea.mockapi.io/api/produtos/" + trDaTabela.id, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             })
//             .then(function(response) {
//                 return response.json()
//             })
//             .then(function(produto) {
//                 console.log(produto)
//             })
//     }) 

// })

let valorDoPagamento = document.querySelector("#valorDoPagamento")
valorDoPagamento.addEventListener("keyup", function(event) {
    compra.valorDoPagamento = event.target.value
    console.log(event.target.value)
    let troco = document.querySelector("#troco")
    troco.textContent = compra.troco()
})

console.log("Forma De Pagamento: " + compra.formaDePagamento)
console.log("Desconto: " + compra.calcularDescontroDaCompra())
console.log("Total A Pagar: " + compra.totalAPagar())
console.log("Valor Do Pagamento: " + compra.valorDoPagamento)
console.log("Troco: " + compra.troco())

compra.imprimeNotaFiscal()