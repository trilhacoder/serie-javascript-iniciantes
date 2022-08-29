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
        fetch(baseUrl + "/api/produtos")
            .then(function(response) {
                if (!response.ok) {
                    throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
                }
                return response.json()
            })
            .then(function(produtos) {
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
        let tagNotaFiscal = document.querySelector("#notaFiscal")

        tagNotaFiscal.textContent = ""

        let tagParagrafo = document.createElement("p")
        tagParagrafo.textContent = "### Nota fiscal da compra ###"
        tagNotaFiscal.appendChild(tagParagrafo)

        this.itensDeCompra.forEach((itemDeCompra) => {  
            tagParagrafo = document.createElement("p")          
            tagParagrafo.textContent = "=> Produto Comprado: " + itemDeCompra.produtoComprado
            tagNotaFiscal.appendChild(tagParagrafo)

            tagParagrafo = document.createElement("p")
            tagParagrafo.textContent = "Quantidade Comprada: " + itemDeCompra.quantidadeComprada
            tagNotaFiscal.appendChild(tagParagrafo)

            tagParagrafo = document.createElement("p")
            tagParagrafo.textContent = "Preço Unitário: " + itemDeCompra.precoUnitario
            tagNotaFiscal.appendChild(tagParagrafo)

            tagParagrafo = document.createElement("p")
            tagParagrafo.textContent = "Preço Total Do Item: " + itemDeCompra.precoUnitario * itemDeCompra.quantidadeComprada
            tagNotaFiscal.appendChild(tagParagrafo)

            tagParagrafo = document.createElement("p")
            tagParagrafo.textContent = "Valor Total Da Compra: " + this.valorTotalDaCompra
            tagNotaFiscal.appendChild(tagParagrafo)
        })
        tagParagrafo = document.createElement("p")
        tagParagrafo.textContent = "Forma De Pagamento: " + this.formaDePagamento
        tagNotaFiscal.appendChild(tagParagrafo)

        tagParagrafo = document.createElement("p")
        tagParagrafo.textContent = "Desconto: " + this.calcularDescontroDaCompra()
        tagNotaFiscal.appendChild(tagParagrafo)

        tagParagrafo = document.createElement("p")
        tagParagrafo.textContent = "Total A Pagar: " + this.totalAPagar()
        tagNotaFiscal.appendChild(tagParagrafo)

        tagParagrafo = document.createElement("p")
        tagParagrafo.textContent = "Valor Do Pagamento: " + this.valorDoPagamento
        tagNotaFiscal.appendChild(tagParagrafo)

        tagParagrafo = document.createElement("p")
        tagParagrafo.textContent = "Troco: " + this.troco()
        tagNotaFiscal.appendChild(tagParagrafo)
    }
}