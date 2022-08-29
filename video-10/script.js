const baseUrl = "https://62f69d13612c13062b5210ea.mockapi.io"

let compra = new Compra()

let formulario = document.querySelector("#formulario")
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    let form = event.target

    if (!formValido(form)) {
        return
    }

    limparMensagemDeErro(form)

    fetch(baseUrl + "/api/produtos", {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	    produto_comprado: form.produto.value,
	    quantidade_comprada: form.quantidade.value,
	    preco_unitario: form.precoUnitario.value
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
        form.reset()
	})
    .catch(function(error) {
        exibeMensagemDeErro(error)
    })
})

let formaDePagamento = document.querySelector("#formaDePagamento")
formaDePagamento.addEventListener("change", function(event) {
    atualizaDesconto(compra, event.target.value)    
    atualizaTotalAPagar(compra)
    atualizaTroco(compra)
})

let valorDoPagamento = document.querySelector("#valorDoPagamento")
valorDoPagamento.addEventListener("keyup", function(event) {    
    atualizaTroco(compra, event.target.value)
})

let imprimirNotaFiscal = document.querySelector("#imprimirNotaFiscal")
imprimirNotaFiscal.addEventListener("click", function(event) {
    event.preventDefault();
    compra.imprimeNotaFiscal()
    window.print()
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
    
    atualizaValorTotalDaCompra(compra)
    atualizaFormaDePagamento(compra)
    atualizaDesconto(compra)
    atualizaTotalAPagar(compra)
    atualizaTroco(compra)
}

function atualizaFormaDePagamento(compra) {
    let formaDePagamento = document.querySelector("#formaDePagamento")    
    compra.formaDePagamento = formaDePagamento.value
}

function atualizaValorTotalDaCompra(compra) {
    let valorTotalDaCompra = document.querySelector("#valorTotalDaCompra")
    valorTotalDaCompra.textContent = compra.valorTotalDaCompra
}

function atualizaDesconto(compra, formaDePagamento) {
    if (formaDePagamento != undefined) {
        compra.formaDePagamento = formaDePagamento
    }
    if (formaDePagamento == "credito") {
        let desconto = document.querySelector("#desconto")
        desconto.textContent = "0.0"
    } else {
        let descontoRecalculado = compra.calcularDescontroDaCompra()
        let desconto = document.querySelector("#desconto")
        desconto.textContent = descontoRecalculado
    }
}

function atualizaTotalAPagar(compra) {
    let totalAPagar = document.querySelector("#totalAPagar")
    totalAPagar.textContent = compra.totalAPagar()
}

function atualizaTroco(compra, novoTroco) {
    if (novoTroco != undefined) {
        compra.valorDoPagamento = novoTroco
    }
    let troco = document.querySelector("#troco")
    troco.textContent = compra.troco()
}

function formValido(form) {
    let formValido = true
    if (form.produto.value == "") {
        exibeMensagemDeErro("Campo produto é obrigatório")
        formValido = false
    }
    if (form.quantidade.value == "") {
        exibeMensagemDeErro("Campo quantidade é obrigatório")
        formValido = false
    }
    if (form.precoUnitario.value == "") {
        exibeMensagemDeErro("Campo preço unitário é obrigatório")
        formValido = false
    }
    return formValido
}