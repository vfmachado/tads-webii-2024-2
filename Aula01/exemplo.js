console.log("OI DO NODE");
const pessoa = {
    name: "vini",
    hobby: "programar"
};

pessoa.name = 'manu';

const mostraPessoa = (pessoa) => `Olá, meu nome é ${pessoa.name} e eu gosto de ${pessoa.hobby}`;

console.log(mostraPessoa(pessoa));