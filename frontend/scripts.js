// const usrInput = document.getElementById("user-input");
// const btn = document.getElementById("submit-btn");
// const resultContainer = document.getElementById("result-container");

// btn.addEventListener("click", function () {
//   const val = usrInput.value;
//   fetch("/api/ask", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ userInput: val }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       resultContainer.innerHTML = `<p>${data.text}</p>`;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       resultContainer.innerHTML = `<p>Error fetching response. Please try again.</p>`;
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const usrInput = document.getElementById("user-input");
  const resultContainer = document.getElementById("result-container");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputValue = usrInput.value.trim();
    if (!inputValue) return;

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usrInput: inputValue }),
      });

      const data = await response.json();
      if (data.text) {
        resultContainer.innerHTML = `<p>${data.text}</p>`;
      } else if (data.message) {
        resultContainer.innerHTML = `<p>${data.message}</p>`;
      } else {
        resultContainer.innerHTML = `<p>No response from API.</p>`;
      }
    } catch (error) {
      resultContainer.innerHTML = `<p>Error fetching response. Please try again.</p>`;
    }
  });
});
