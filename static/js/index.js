let textoInicial = document.querySelector('#text-inicial')
let texto1 = document.querySelector('#text-1')
let texto2 = document.querySelector('#text-2')
let texto3 = document.querySelector('#text-3')
let texto4 = document.querySelector('#text-4')
let anterior = document.querySelector('#btn-anterior')
let proximo = document.querySelector('#btn-proximo')

// link img marvel
const linksMarvel = document.querySelectorAll('.link-lista-marvel')
// img marvel
const imgsMarvel = document.querySelectorAll('.img')
// div img marvel
const divHeroesMarvel = document.querySelector('#heroes-marvel')
// link img dc
const linksDc = document.querySelectorAll('.link-dc')
// img dc
const imgsDc = document.querySelectorAll('.img-dc')
// div img dc
const divHeroesDc = document.querySelector('#heroes-dc')
// comtainer btn next index page
const conteinerBtn = document.querySelector('#container-btn')
// div text index page
const divText = document.querySelector('#text')
// background-color img heroes
let corFundo = '#252934'
let corFundoIndex = 'rgba(0, 0, 0, 0.678)'

// função para verificar se têm alguma imagem em display
let boolImagemNone = () => {
    
    let imagemNone = true
    
    imgsMarvel.forEach(element => {
        
        if(element.style.display != 'none'){
     
            imagemNone = false
        }
    })
    
    imgsDc.forEach(element => {
     
        if(element.style.display != 'none'){
     
            imagemNone = false
        }
    })
    
    return imagemNone
};

// varrer todos os links e verificar e mostrar imagem correspondente ao id
linksDc.forEach(element => {
    element.addEventListener('click', () => {
        imgsDc.forEach(element2 => {
            if(element.attributes.value.nodeValue == element2.attributes.value.nodeValue){
                
                if(element2.style.display == 'none'){
                    
                    element2.style.display = 'block'
                    divHeroesDc.style.display = 'flex'
                    divText.style.display = 'none'
                    textoInicial.style.backgroundColor = corFundo
                    conteinerBtn.style.display = 'none'
                
                }else{
                    
                    element2.style.display = 'none' 
                    divHeroesDc.style.display = 'none'
                    console.log(boolImagemNone())
                    
                    if(boolImagemNone()){
                    
                        divText.style.display = 'flex'
                        textoInicial.style.backgroundColor = corFundoIndex
                        conteinerBtn.style.display = 'flex'
                    }   
                }
            
            }else{
               
                element2.style.display = 'none'
            }
        });
    })
});

linksMarvel.forEach(element => {
    element.addEventListener('click', () => {
        imgsMarvel.forEach(element2 => {
            if(element.attributes.value.nodeValue == element2.attributes.value.nodeValue){
                
                if(element2.style.display == 'none'){
                    
                    element2.style.display = 'block'
                    divHeroesMarvel.style.display = 'flex'
                    divText.style.display = 'none'
                    textoInicial.style.backgroundColor = corFundo
                    conteinerBtn.style.display = 'none'
                
                }else{
                    
                    element2.style.display = 'none' 
                    divHeroesMarvel.style.display = 'none'
                   
                    if(boolImagemNone()){
                        divText.style.display = 'flex'
                        textoInicial.style.backgroundColor = corFundoIndex
                        conteinerBtn.style.display = 'flex'
                    }   
                }
            
            }else{
                
                element2.style.display = 'none'
            }
        });
    })
});


// inicio funcao troca de texto 
anterior.addEventListener('click', () => {
    if (page == 2) {
        anterior.style.display = 'none'
        texto2.style.display = 'none'
        texto1.style.display = 'block'
        page -= 1
    }

    else if (page == 3) {
        texto3.style.display = 'none'
        texto2.style.display = 'block'
        page -= 1
    }

    else if (page == 4) {
        texto4.style.display = 'none'
        texto3.style.display = 'block'
        proximo.style.display = 'block'
        page -= 1
    }

})

let page = 1

proximo.addEventListener('click', () => {
    console.log('teste')
    if (page == 1) {
        anterior.style.display = 'block'
        texto1.style.display = 'none'
        texto2.style.display = 'block'
        page += 1
    }

    else if (page == 2) {
        texto2.style.display = 'none'
        texto3.style.display = 'block'
        page += 1
    }

    else if (page == 3) {
        texto3.style.display = 'none'
        texto4.style.display = 'block'
        proximo.style.display = "none"
        page += 1
    }

})

// Fim funcao troca de texto 

const fechar = document.querySelector("#fechar-open")

fechar.addEventListener("click", ()=> {
    document.querySelector("#text-open").style.display = "none"
})