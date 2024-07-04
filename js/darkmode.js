// Define o switch do dark-mode
const darkModeCheckbox = document.getElementById("dark-mode-checkbox");

// Define root como root do elemento HTML
const root = document.documentElement;

// Método toggle para funcionar como switch entre light-mode e dark-mode
function toggleDarkMode() {
    root.classList.toggle("dark-mode");
    const isDarkMode = root.classList.contains("dark-mode");
    updateImagePaths();
    updateHoverStyle();
}

// Função que confere se o navegador tem preferência pelo tema dark
function setInitialDarkMode() {
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkMode) {
        // Adiciona a classe .dark-mode ao root, buscando as variáveis correspondentes no CSS
        root.classList.add("dark-mode");
        darkModeCheckbox.checked = true;
    } else {
        // Se o navegador não tiver preferência por dark-mode, garante que seja exibido o light-mode
        root.classList.remove("dark-mode");
        darkModeCheckbox.checked = false;
    }
    const isDarkMode = root.classList.contains("dark-mode");
    updateImagePaths();
    updateHoverStyle();
}

function updateImagePaths() {
    // Seleciona todos os elementos com a classe img-lightdark
    const images = document.querySelectorAll(".js-image-lightdark");

    // Itera sobre cada imagem selecionada
    images.forEach((img) => {
        // Retorna se a classe dark-mode está presente no elemento raiz
        const isDarkMode = root.classList.contains("dark-mode");

        // Retorna o dataset filename do elemento
        const fileName = img.dataset.filename;

        // Define o caminho da imagem com base no modo ativo
        const imagePath = isDarkMode ? "./img/dark/" : "./img/light/";

        // Atualiza o src="" da imagem concatenando o caminho base
        img.src = imagePath + fileName;

        // Retorna o computed style do elemento
        const computedStyle = window.getComputedStyle(img);

        // Retorna a propriedade background-image do elemento
        const backgroundImage = computedStyle.getPropertyValue("background-image");

        // Se tiver uma background-image, atualiza o caminho
        if (backgroundImage !== "none") {
            img.style.backgroundImage = "url(" + imagePath + fileName + ")";
        }
    });
}

function updateHoverStyle() {
    const elements = document.querySelectorAll(".js-hover-lightdark");
	const isDarkMode = root.classList.contains("dark-mode");
    if (isDarkMode == true) {
        elements.forEach((element) => {
            element.classList.remove(".nav-hover-style-light");
            element.classList.add("nav-hover-style-dark");
        });
    } else {
        elements.forEach((element) => {
            element.classList.add(".nav-hover-style-light");
            element.classList.remove("nav-hover-style-dark");
        });
    }
}

// Inicializa o modo dark baseado na preferência do usuário
setInitialDarkMode();

// Adiciona event listener ao checkbox para alternar o modo
darkModeCheckbox.addEventListener('change', toggleDarkMode);
