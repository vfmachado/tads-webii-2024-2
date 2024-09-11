let promessa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promessa resolvida');
    }, 2000);
});
async function minhaFuncao() {
    console.log("INICIO");
    const result = await promessa;
    console.log(result);
    console.log("FIM");
}
minhaFuncao();
