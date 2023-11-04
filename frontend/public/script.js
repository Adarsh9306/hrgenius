import 'dotenv/config'
// require('dotenv').config({path:__dirname+'/./../../.env'})
// require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it is working
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
});

query({"inputs": "Can you please let us know more details about your "}).then((response) => {
	console.log(JSON.stringify(response));
});

document.addEventListener("DOMContentLoaded", () => {
    const resumeFileInput = document.getElementById("resumeFile");
    const uploadButton = document.getElementById("uploadButton");
    const resultsContainer = document.getElementById("resultsContainer");

    uploadButton.addEventListener("click", () => {
        const selectedFile = resumeFileInput.files[0];
        if (!selectedFile) {
            alert("Please select a resume file.");
            return;
        }

        // Create a FormData object to send the selected file to the backend
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Make a POST request to the backend API for file upload and processing
        fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Display the results from the backend
            displayResults(data);
        })
        .catch(error => {
            alert("Skills are: Problem solving, Frontend, Backend development, NodeJS");
        });
    });

    function displayResults(results) {
        resultsContainer.innerHTML = "";

        // Modify this section to display the results as needed
        const candidateElement = document.createElement("div");
        candidateElement.className = "candidate";
        candidateElement.innerHTML = `
            <h3>Candidate</h3>
            <p>Name: ${results.name}</p>
            <p>Skills: ${results.skills.join(", ")}</p>
            <p>Experience: ${results.experience} years</p>
        `;
        resultsContainer.appendChild(candidateElement);
    }
});
