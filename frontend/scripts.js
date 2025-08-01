const usrInput = document.getElementById("user-input");
const btn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");

btn.addEventListener("click", function () {
  const val = usrInput.value;
  fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userInput: val }),
  })
    .then((response) => response.json())
    .then((data) => {
      resultContainer.innerHTML = `<p>${data.text}</p>`;
    })
    .catch((error) => {
      console.error("Error:", error);
      resultContainer.innerHTML = `<p>Error fetching response. Please try again.</p>`;
    });
});