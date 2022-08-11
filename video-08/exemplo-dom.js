let botao = document.querySelector("button")

botao.addEventListener("click", function() {
  let li = document.createElement("li")
  
  let input = document.querySelector("input")
	li.textContent = input.value

	let ul = document.querySelector("ul")
  ul.appendChild(li)
})