const BASE_URL = `http://localhost:1337`;

async function carregarDados(colecao) {
    const resposta = await fetch(BASE_URL + colecao);
    const dados = await resposta.json();
    return dados;
}

async function buscarProdutos() {
    const produtos = await carregarDados("/products")
    return produtos;
    
}

async function buscarMarca() {
    const marcas = await carregarDados("/brands")
    return marcas;
    
}

async function buscarProdutoEspecificos(chave, valor) {
    const produtosPromocao = await carregarDados(`/products?${chave}=${valor}`)
    return produtosPromocao;
}

async function buscarCategorias() {
    const categorias = await carregarDados("/categories");
    return categorias;
}

async function buscarProdutosporCategoria(categoria) {
    const categorias = await carregarDados(`/categories?slug=${categoria}`);
    return categorias[0].products;
    
}

async function incluirProdutosPromocao() {
    const produtos = await buscarProdutoEspecificos("promotion", "true"),
    containerPromocao = document.querySelector(".featured__container");
    for(const produto of produtos){
        const { name, price, image} = produto,
        preco = price.toLocaleString("pt-br", { style: "currency", currency: "BRL"})
        containerPromocao.innerHTML +=`
        <article class="juice">
            <div class="juice__sale">Promoção</div>
            <img src="${BASE_URL}${image.url}" alt="" class="juice__img" />
            <span class="juice__name">${name}</span>
            <span class="juice__price">${preco}</span>
            <a href="#" class="button-light"
              >Adicionar ao carrinho <i class="bx bx-right-arrow-alt button-icon"></i
            ></a>
          </article>
        `
    }
}

async function incluirProdutosPincel() {
    const produtos = await buscarProdutosporCategoria("pincel"),
    containerKits = document.querySelector(".tropicais__container");
    for(const produto of produtos){
      const { name, price, image} = produto,
      preco = price.toLocaleString("pt-br", { style: "currency", currency: "BRL"})
        containerKits.innerHTML +=`
        <article class="juice">
            <img src="${BASE_URL}${image.url}" alt="" class="juice__img" />
            <span class="juice__name">${name}</span>
            <span class="juice__price">${preco}</span>
            <a href="#" class="button-light">
              Adicionar ao carrinho
              <i class="bx bx-right-arrow-alt button-icon"></i>
            </a>
          </article>
        `
    }
}

async function incluirMarcas() {
    const marcas = await buscarMarca(),
    containerMarcas = document.querySelector(".new__container");
    for(const marca of marcas){
        const { name } = marca
        containerMarcas.innerHTML +=`
        <div class="new__juice-card">
        <h3 class="new__title">${name}</h3>
        <div class="new__juice-overlay">
          <a href="#" class="button">Venha conhecer essa Marca</a>
        </div>
      </div>
        `
    }
}

async function incluirTodosProdutos(){
    const produtos = await buscarProdutos(),
    containerProdutos = document.querySelector(".featured__containerr");
    for(const produto of produtos){
        const { name, price, image} = produto,
        preco = price.toLocaleString("pt-br", { style: "currency", currency: "BRL"})
        containerProdutos.innerHTML +=`
        <article class="juice">
            <img src="${BASE_URL}${image.url}" alt="" class="juice__img" />
            <span class="juice__name">${name}</span>
            <span class="juice__price">${preco}</span>
            <a href="#" class="button-light"
              >Adicionar ao carrinho <i class="bx bx-right-arrow-alt button-icon"></i
            ></a>
          </article>
        `
    }
}

incluirProdutosPromocao();
incluirProdutosPincel();
incluirMarcas();
incluirTodosProdutos();