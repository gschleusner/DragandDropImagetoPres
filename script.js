let images = [];

document.getElementById('drop-area').addEventListener('dragover', (event) => {
    event.preventDefault();
});

document.getElementById('drop-area').addEventListener('drop', (event) => {
    event.preventDefault();
    let files = event.dataTransfer.files;
    let previewArea = document.getElementById('preview-area');
    for (let i = 0; i < files.length; i++) {
        if (files[i].type.startsWith('image/')) {
            let url = URL.createObjectURL(files[i]);
            images.push({
                name: files[i].name,
                url: url
            });
            let img = document.createElement('img');
            img.src = url;
            img.style.width = '300px'; // Set a fixed width for the preview images
            img.style.height = 'auto';
            img.style.margin = '10px';
            previewArea.appendChild(img); // Add the preview image to the preview area
        }
    }
});


document.getElementById('download-btn').addEventListener('click', () => {
    let pptx = new PptxGenJS();
    images.forEach((image) => {
        let slide = pptx.addSlide();
        slide.addImage({ path: image.url, x: 1, y: 1, w: 8, h: 6 });
    });
    pptx.writeFile({ fileName: 'Images.pptx' });
});
