const cepInput = document.querySelector("#cep");
const estadoInput = document.querySelector("#estado");
const cidadeInput = document.querySelector("#cidade");
const bairroInput = document.querySelector("#bairro");
const logradouroInput = document.querySelector("#logradouro");
const numeroInput = document.querySelector("#numero");
const complementoInput = document.querySelector("#complemento");

const btnBuscar = document.querySelector("#btn-buscar");

async function buscarCEP() {
    try {
        // Remove tudo que não for número
        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            alert("Digite um CEP válido com 8 números.");
            return;
        }

        const response = await fetch(
            `https://cep.awesomeapi.com.br/json/${cep}`
        );

        if (!response.ok) {
            throw new Error("CEP não encontrado.");
        }

        const data = await response.json();

        estadoInput.value = data.state || "";
        cidadeInput.value = data.city || "";
        bairroInput.value = data.district || "";
        logradouroInput.value = data.address || "";
        complementoInput.value = data.address_type || "";

    } catch (error) {
        alert(error.message);

        estadoInput.value = "";
        cidadeInput.value = "";
        bairroInput.value = "";
        logradouroInput.value = "";
        complementoInput.value = "";
    }
}

btnBuscar.addEventListener("click", buscarCEP);