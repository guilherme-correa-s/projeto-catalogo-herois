$(document).ready(function(){
    $('.carousel').carousel();
  });

function displayText() {
  setTimeout(()=>{
    const imagemAtiva = document.querySelector('.active')
    const idDivImg = '.class-'+(imagemAtiva.classList[1]).toString()  
    const displayDescicaoOff = document.querySelectorAll('.descricao')
    displayDescicaoOff.forEach((descricao) => {
      descricao.style.display = 'none'
    })
    document.querySelector(idDivImg).style.display = 'flex'
  }, 500)
}

const carrocelClass = document.querySelector('.carousel')

carrocelClass.addEventListener('click', () => {
  displayText()
})

window.onload = () => {
  displayText()
}