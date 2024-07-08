// Define o switch do dark-mode
const darkModeCheckbox = document.getElementById("dark-mode-checkbox");

// Define root como root do elemento HTML
const root = document.documentElement;

// Método toggle para funcionar como switch entre light-mode e dark-mode
function toggleDarkMode() {
    root.classList.toggle("dark-mode");
    updateImagePaths();
    updateColorSchemeStyle();
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
    updateImagePaths();
    updateColorSchemeStyle();
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

function updateColorSchemeStyle() {
    // Seleciona todos os elementos que devem mudar de estilo de hover com base no tema
    const elements = document.querySelectorAll(".js-hover-lightdark");
    
    // Verifica se o modo escuro está ativo
    const isDarkMode = root.classList.contains("dark-mode");
    
    // Se o modo escuro estiver ativo
    if (isDarkMode) {
        elements.forEach((element) => {
            // Remove a classe de estilo de hover para o modo claro
            element.classList.remove("color-scheme-light");
            // Adiciona a classe de estilo de hover para o modo escuro
            element.classList.add("color-scheme-dark");
        });
    } else {
        // Se o modo claro estiver ativo
        elements.forEach((element) => {
            // Adiciona a classe de estilo de hover para o modo claro
            element.classList.add("color-scheme-light");
            // Remove a classe de estilo de hover para o modo escuro
            element.classList.remove("color-scheme-dark");
        });
    }
}


// Inicializa o modo dark baseado na preferência do usuário
setInitialDarkMode();

// Adiciona event listener ao checkbox para alternar o modo
darkModeCheckbox.addEventListener('change', toggleDarkMode);
