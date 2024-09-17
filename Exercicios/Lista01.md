# Lista 01

### Exercícios de JavaScript Básico

#### 1. Soma de Dois Números
Escreva uma função chamada `somar` que receba dois números como parâmetros e retorne a soma deles.

```javascript
function somar(num1, num2) {
  // Sua lógica aqui
}

console.log(somar(5, 7)); // Saída esperada: 12
```

#### 2. Verificação de Par ou Ímpar
Crie uma função chamada `parOuImpar` que receba um número e retorne `"par"` se o número for par, ou `"ímpar"` se o número for ímpar.

```javascript
function parOuImpar(numero) {
  // Sua lógica aqui
}

console.log(parOuImpar(4)); // Saída esperada: "par"
console.log(parOuImpar(7)); // Saída esperada: "ímpar"
```

#### 3. Contagem Regressiva
Escreva um loop que faça a contagem regressiva de 10 até 1, imprimindo cada número no console.

```javascript
// Sua lógica aqui
```

#### 4. Função de Saudação Personalizada
Escreva uma função `saudar` que receba um nome como parâmetro e exiba uma mensagem de saudação no console.

```javascript
function saudar(nome) {
  // Sua lógica aqui
}

saudar("João"); // Saída esperada: "Olá, João!"
```

---

### Exercícios com Arrays

#### 5. Números Pares em um Array
Crie uma função `encontrarPares` que receba um array de números e retorne um novo array contendo apenas os números pares.

```javascript
function encontrarPares(numeros) {
  // Sua lógica aqui
}

console.log(encontrarPares([1, 2, 3, 4, 5, 6])); // Saída esperada: [2, 4, 6]
```

#### 6. Soma dos Elementos do Array
Escreva uma função chamada `somarElementos` que receba um array de números e retorne a soma de todos os elementos.

```javascript
function somarElementos(arr) {
  // Sua lógica aqui
}

console.log(somarElementos([1, 2, 3, 4])); // Saída esperada: 10
```

#### 7. Multiplicar por Dois
Escreva uma função chamada `multiplicarPorDois` que receba um array de números e retorne um novo array onde cada número é multiplicado por 2.

```javascript
function multiplicarPorDois(arr) {
  // Sua lógica aqui
}

console.log(multiplicarPorDois([1, 2, 3])); // Saída esperada: [2, 4, 6]
```

#### 8. Remover Números Menores que 10
Crie uma função `removerMenoresQueDez` que receba um array de números e retorne um novo array sem os números menores que 10.

```javascript
function removerMenoresQueDez(arr) {
  // Sua lógica aqui
}

console.log(removerMenoresQueDez([3, 15, 8, 22, 5])); // Saída esperada: [15, 22]
```

---

### Exercícios com Objetos

#### 9. Objeto Pessoa
Crie um objeto chamado `pessoa` que tenha as propriedades `nome`, `idade` e `profissao`. Adicione um método chamado `apresentar` que retorne uma string dizendo "Olá, meu nome é [nome], eu tenho [idade] anos e sou [profissão]".

```javascript
let pessoa = {
  nome: "Maria",
  idade: 30,
  profissao: "Engenheira",
  apresentar: function() {
    // Sua lógica aqui
  }
};

console.log(pessoa.apresentar()); 
// Saída esperada: "Olá, meu nome é Maria, eu tenho 30 anos e sou Engenheira."
```

#### 10. Verificar Propriedade no Objeto
Escreva uma função chamada `verificarPropriedade` que receba um objeto e uma string representando uma propriedade. A função deve retornar `true` se o objeto tiver essa propriedade e `false` caso contrário.

```javascript
function verificarPropriedade(obj, propriedade) {
  // Sua lógica aqui
}

const carro = { marca: "Ford", modelo: "Fiesta" };

console.log(verificarPropriedade(carro, "modelo")); // Saída esperada: true
console.log(verificarPropriedade(carro, "ano")); // Saída esperada: false
```

#### 11. Adicionar Propriedade ao Objeto
Crie uma função `adicionarPropriedade` que receba um objeto, uma chave e um valor, e adicione essa chave e valor ao objeto.

```javascript
function adicionarPropriedade(obj, chave, valor) {
  // Sua lógica aqui
}

let livro = {
  titulo: "O Senhor dos Anéis",
  autor: "J.R.R. Tolkien"
};

adicionarPropriedade(livro, "ano", 1954);

console.log(livro);
// Saída esperada: { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954 }
```

#### 12. Contar Propriedades de um Objeto
Crie uma função `contarPropriedades` que receba um objeto e retorne o número de propriedades que ele possui.

```javascript
function contarPropriedades(obj) {
  // Sua lógica aqui
}

let pessoa2 = {
  nome: "Carlos",
  idade: 28,
  cidade: "São Paulo"
};

console.log(contarPropriedades(pessoa2)); // Saída esperada: 3
```
