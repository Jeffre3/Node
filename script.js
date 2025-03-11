document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("uploadForm");
    const fileList = document.getElementById("fileList");
    const uploadStatus = document.getElementById("uploadStatus");

    // Handle file upload
    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(uploadForm);
        uploadStatus.textContent = "Uploading...";

        try {
            const response = await fetch("/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                uploadStatus.textContent = "File uploaded successfully!";
                fetchFileList(); // Refresh the file list
            } else {
                uploadStatus.textContent = "Error: " + result.error;
            }
        } catch (error) {
            uploadStatus.textContent = "Upload failed. Try again.";
        }
    });

    // Fetch and display uploaded files
    async function fetchFileList() {
        const response = await fetch("/files");
        const files = await response.json();

        fileList.innerHTML = "";
        files.forEach((file) => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="/uploads/${file}" target="_blank">${file}</a>`;
            fileList.appendChild(li);
        });
    }

    fetchFileList(); // Load files on page load
});
