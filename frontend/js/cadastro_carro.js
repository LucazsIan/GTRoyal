const imageInput = document.getElementById('imagem');
const selectBtn = document.getElementById('selectImageBtn');
const changeBtn = document.getElementById('changeImageBtn');
const deleteBtn = document.getElementById('deleteImageBtn');
const uploadContainer = document.getElementById('uploadContainer');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const preview = document.getElementById('preview');

// Abrir seletor de arquivo
selectBtn.addEventListener('click', () => imageInput.click());
changeBtn.addEventListener('click', () => imageInput.click());

// Atualizar preview e mostrar imagem
imageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            uploadContainer.classList.add('d-none');
            imagePreviewContainer.classList.remove('d-none');
        }
        reader.readAsDataURL(file);
    }
});

// Deletar imagem e voltar ao botão de upload
deleteBtn.addEventListener('click', () => {
    preview.src = "";
    imageInput.value = ""; // limpa o input
    imagePreviewContainer.classList.add('d-none');
    uploadContainer.classList.remove('d-none');
});