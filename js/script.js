const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el)
let quantidaPizza = 1;
let pizzaCode = 0;
let carrinhoPizza = [];

//primeiro vou lista as pizzas utilizando o map
pizzaJson.map((item, index) => {
    //vou "clonar" o modelo que crei la no html que tem a classe pizza-item, irei preencher e jogar na tela
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    //preenchendo as informações e adicionando o index em cada pizza, de modo que facilitara o acesso as informações
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item-img img').src = item.img;
    pizzaItem.querySelector('.pizza-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item-name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item-description').innerHTML = item.description




    //abrindo a modal
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        //estou saindo do elemento 'a' e acessando o elemento mais proximo, o pizza-item
        //logo acesso ao data key do item clicado
        let key = e.target.closest('.pizza-item').getAttribute('data-key')

        //recebendo o id da pizza selecionada
        pizzaCode = key;

        //Toda vez que eu clicar em alguma pizza a quantidade é resetada para 1
        c('.cart-item-qt').innerHTML = quantidaPizza;




        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo-modal h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo-modal .descricaoPizza-modal').innerHTML = pizzaJson[key].description;
        c('.precoFixoPizza').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        //removendo a classe '.selecionado 
        c('.pizzaInfo-tamanho.selecionado').classList.remove('selecionado')

        //preenchendo informações dos tamanhos das pizzas
        cs('.pizzaInfo-tamanho').forEach((size, sizeIndex) => {
            // aqui digo que o tamanho na posição 2 do array sempre vai estar selecionado
            if (sizeIndex == 2) {
                size.classList.add('selecionado')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        })

        //adicionando a classe aberto, para aparecer a modal
        setTimeout(() => {
            const modal = c('.area-modal')
            modal.classList.add("aberto");

        }, 200)
    })



    //preencher a informações em pizza-item
    document.querySelector('.pizza-area').append(pizzaItem)


})


//Modal

//function de fechar a modal
function fecharModal(btn) {
    setTimeout(() => {
        const closeModal = c('.area-modal')
        closeModal.classList.remove("aberto")
        //reseto a quantida da pizza para toda vez que eu fecha, a quantidade volta a ser 1
        quantidaPizza = 1;
    }, 250)
}

//adicionando a function de fechar a modal para os btn version desktop e mobile
cs('.btn-cancelar, .btn-cancelar-mobile').forEach((item) => {
    item.addEventListener('click', fecharModal);
})

// functiosn para definir a quantidade de pizza
c('.cart-item-qtmais').addEventListener('click', () => {

    quantidaPizza++
    c('.cart-item-qt').innerHTML = quantidaPizza;


})





c('.cart-item-qtmenos').addEventListener('click', () => {
    //condicao para evita a quantidade ser menor que 1
    if (quantidaPizza > 1) {
        quantidaPizza--
        c('.cart-item-qt').innerHTML = quantidaPizza;

        c('.precoFixoPizza').innerHTML = `R$ ${valorTotal.toFixed(2)}`
    }
})



//seleção do btn tamanho das pizzas
//add um evento de click no itens do array, removo a classe 'selecionado' e no que eu clicar 
//eu adiciono

cs('.pizzaInfo-tamanho').forEach((size, sizeIndex) => {


    size.addEventListener('click', (e) => {
        c('.pizzaInfo-tamanho.selecionado').classList.remove('selecionado')
        size.classList.add('selecionado')
    })
})


c('.btn-add-carrinho-modal').addEventListener('click', () => {

    //pizza selecionada

    //tamanho
    let size = Number(c('.pizzaInfo-tamanho.selecionado').getAttribute('data-key'))

    //Pizza de tamanho igual devem esta juntas

    //vai identificar qual é a pizza, pelo id e o tamanho, da pizza que add ao carrinho
    let identificador = pizzaCode + "@" + size;

    //findIndex percorre o array, acha o item que atenda a condição, caso contrario retornar -1
    let key = carrinhoPizza.findIndex((item) => item.identificador == identificador)

    if (key > -1) {
        carrinhoPizza[key].qt += quantidaPizza
    } else {
        carrinhoPizza.push({
            identificador,
            id: pizzaCode,
            size,
            qt: quantidaPizza


        })
    }
    atualizarCarrinho()
    fecharModal();
    //quantidade de pizza 
})

c('.menu-openner').addEventListener('click', () => {
   if(carrinhoPizza.length > 0){
    c('.pizza-area').style.display = 'none'
    c('main').style.display = 'none'
    c('aside').style.display = 'block'
    c('aside').style.width = '100%'
   }

    console.log(c('main').style);
})

c('.fechar-carrinho').addEventListener('click', () => {
    c('aside').style.display = 'none'
    c('.pizza-area').style.display = 'flex'
    c('main').style.display = 'block'
})

function atualizarCarrinho() {

    c('.menu-openner span').innerHTML = carrinhoPizza.length;

    if (carrinhoPizza.length > 0) {
        c('aside').classList.add("aberto");
        c('.carrinhoItem').innerHTML = '';

        let subtotal = 0
        let desconto = 0;
        let total = 0;

        for (let i in carrinhoPizza) {

            let pizzaItem = pizzaJson.find((item) => item.id == carrinhoPizza[i].id)


            subtotal += pizzaItem.price * carrinhoPizza[i].qt









            let carrinhoItem = c('.models .pizza-cart').cloneNode(true);

            let pizzaSizeName = carrinhoPizza[i].size

            switch (carrinhoPizza[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break
                case 1:
                    pizzaSizeName = 'M'
                    break
                case 2:
                    pizzaSizeName = 'G'
                    break
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            carrinhoItem.querySelector('img').src = pizzaItem.img
            carrinhoItem.querySelector('.cart-item-nome').innerHTML = pizzaName
            carrinhoItem.querySelector('.cart-item-qt2').innerHTML = carrinhoPizza[i].qt

            carrinhoItem.querySelector('.cart-item-qtmenos2').addEventListener('click', () => {

                if (carrinhoPizza[i].qt > 1) {
                    carrinhoPizza[i].qt--;
                } else {
                    carrinhoPizza.splice(i, 1)
                }
                atualizarCarrinho()

            })
            carrinhoItem.querySelector('.cart-item-qtmais2').addEventListener('click', () => {
                carrinhoPizza[i].qt++
                atualizarCarrinho()
            })


            c('.carrinhoItem').append(carrinhoItem)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto;

        c('.subTotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`


    } else {
        c('aside').classList.remove('aberto')
        c('aside').style.display = 'none'
        c('.pizza-area').style.display = 'flex'
        c('main').style.display = 'block'
    }
}

