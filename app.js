document.getElementById('startButton').addEventListener('click', startConversion);
document.getElementById('cancelButton').addEventListener('click', cancelAll);

let fileConversionPromises = [];
let totalFiles = 0;
let completedFiles = 0;

function startConversion() {
    const fileInput = document.getElementById('fileInput');
    const format = document.getElementById('formatSelect').value;
    const files = fileInput.files;

    if (files.length === 0) {
        alert('No files selected');
        return;
    }

    totalFiles = files.length;
    completedFiles = 0;

    updateProgressBar();

    Array.from(files).forEach(file => {
        const promise = convertFile(file, format);
        fileConversionPromises.push(promise);
        promise
            .then(() => {
                completedFiles++;
                updateProgressBar();
                updateStatus(file.name, 'Completed');
            })
            .catch(err => {
                console.error(err);
                updateStatus(file.name, 'Failed');
            });
    });
}

function convertFile(file, format) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            // Simulate file conversion delay
            setTimeout(() => {
                // Replace with actual conversion logic
                console.log(`Converting ${file.name} to ${format}`);
                resolve();
            }, Math.random() * 3000);
        };

        reader.onerror = () => reject('File read error');

        reader.readAsArrayBuffer(file); // Simulate file processing
    });
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar').children[0];
    const progress = (completedFiles / totalFiles) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateStatus(fileName, status) {
    const statusDiv = document.getElementById('status');
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('file-status');
    statusMessage.innerHTML = `<span>${fileName}</span> ${status}`;
    statusDiv.appendChild(statusMessage);
}

function cancelAll() {
    fileConversionPromises.forEach(p => p.cancel && p.cancel());
    document.getElementById('progress-bar').children[0].style.width = '0%';
    document.getElementById('status').innerHTML = 'All conversions cancelled';
}
