//Fact check using Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
// Fetch your API_KEY
const API_KEY = "AIzaSyCCiDZhm3JvYF_KPD7Q_7l7abihnX9P2MQ";
// Access API key 
const genAI = new GoogleGenerativeAI(API_KEY);
document.addEventListener('DOMContentLoaded', function () {
    var searchQuery = "";
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    function handleSearchFormSubmission(event) {
        event.preventDefault();
        searchQuery = searchInput.value;
        console.log("Search Query:", searchQuery);
        runFactCheck();
    }

    async function runFactCheck() {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            console.log("Model initialized:", model);

            // const paragraph = "Raju has 3 brothers. he loves his siblings . he enjoys playing with them.he also has 2 sisters.";
            const statement = searchQuery;
            // const condition = "just refer the given paragraph and say if the given statement is True or false or Not sure and give a one line explanation ";
            const condition = "Answer in English only. Just say if the given statement is True or false According to the data available to you , and give a one line explanation ";
            // const prompt = condition + " .paragraph:" + paragraph + " Statement:" + statement;
            const prompt = condition  + " Statement:" + statement;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();

            console.log("Fact-check Result:", text);
            document.getElementById("display").innerHTML = text;
        } catch (error) {
            console.error("Error during fact-check:", error);
            document.getElementById("display").innerHTML = "Error during fact-check. Please check the console for details.";
        }
    }

    searchForm.addEventListener('submit', handleSearchFormSubmission);

});
