let images = [];

document.getElementById('drop-area').addEventListener('dragover', (event) => {
    event.preventDefault();
});

document.getElementById('drop-area').addEventListener('drop', (event) => {
    event.preventDefault();
    let files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        if (files[i].type.startsWith('image/')) {
            let url = URL.createObjectURL(files[i]);
            images.push({
                name: files[i].name,
                url: url
            });
        }
    }
});

document.getElementById('download-btn').addEventListener('click', () => {
    let zip = new JSZip();
    images.forEach((image, index) => {
        fetch(image.url)
            .then(response => response.blob())
            .then(blob => {
                zip.file(image.name, blob);
                zip.file(`metadata_${index}.json`, JSON.stringify({
                    name: image.name,
                    url: image.url
                }));
                if (index === images.length - 1) {
                    zip.generateAsync({type: "blob"})
                        .then(content => {
                            let a = document.createElement('a');
                            a.href = URL.createObjectURL(content);
                            a.download = "images.zip";
                            a.click();
                        });
                }
            });
    });
});
