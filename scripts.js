
// Seleciona os elementos do HTML uma única vez
const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // Valor em Real
const currencyValueConverted = document.querySelector(".currency-value"); // Valor convertido
const currencyName = document.getElementById("currency-name");
const currencyImage = document.querySelector(".currency-img");

// --- Central de Informações das Moedas ---
// Todas as informações ficam em um só lugar. Adicionar uma nova moeda é muito fácil!
const currencies = {
    real: {
        name: "Real",
        locale: "pt-BR",
        symbol: "BRL",
        image: "./assets/Real.png"
    },
    dolar: {
        name: "Dólar",
        rate: 5.36, // 1 Dólar vale 5.36 Reais
        locale: "en-US",
        symbol: "USD",
        image: "./assets/Dolar.png"
    },
    euro: {
        name: "Euro",
        rate: 6.26,
        locale: "de-DE",
        symbol: "EUR",
        image: "./assets/Euro.png"
    },
    guarani: {
        name: "Guarani",
        rate: 0.00072, // 1 Guarani vale 0.00072 Reais
        locale: "es-PY",
        symbol: "PYG",
        image: "./assets/Guarani.png"
    },
    peso: {
        name: "Peso",
        rate: 0.0040, // 1 Peso vale 0.0040 Reais
        locale: "es-AR",
        symbol: "ARS",
        image: "./assets/Peso.png"
    },
    bitcoin: {
        name: "Bitcoin",
        rate: 608409.02, // 1 Bitcoin vale 608409.02 Reais
        locale: "XBT",
        symbol: "BTC",
        image: "./assets/Bitcoin.png"
    }
};

// Função para formatar valores
function formatCurrency(value, locale, currencySymbol) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencySymbol,
    }).format(value);
}

// Função principal de conversão
function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value) || 0;
    const selectedCurrencyKey = currencySelect.value;
    const targetCurrency = currencies[selectedCurrencyKey];

    // Formata e exibe o valor em Real (o valor que está sendo convertido)
    currencyValueToConvert.innerHTML = formatCurrency(inputCurrencyValue, currencies.real.locale, currencies.real.symbol);

    // Calcula, formata e exibe o valor convertido
    const convertedValue = inputCurrencyValue / targetCurrency.rate;
    currencyValueConverted.innerHTML = formatCurrency(convertedValue, targetCurrency.locale, targetCurrency.symbol);
}

// Função que troca a imagem e o nome da moeda
function changeCurrency() {
    const selectedCurrencyKey = currencySelect.value;
    const newCurrency = currencies[selectedCurrencyKey];

    currencyName.innerHTML = newCurrency.name;
    currencyImage.src = newCurrency.image;

    // Converte os valores automaticamente ao trocar a moeda
    convertValues();
}

// Adiciona os "escutadores" de eventos
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

// Chama a função para garantir que a tela inicie com a formatação correta
changeCurrency();