const form = document.getElementById("embed-form");
const input = document.getElementById("input-text");
const output = document.getElementById("output");
const status = document.getElementById("status");
const vectorLength = document.getElementById("vector-length");

function setStatus(message, isError = false) {
	status.textContent = message;
	status.classList.toggle("error", isError);
}

function renderVector(vector) {
	output.textContent = JSON.stringify(vector, null, 2);
	vectorLength.textContent = `${vector.length} values`;
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const text = input.value.trim();
	if (!text) {
		setStatus("Please enter some text.", true);
		return;
	}

	setStatus("Generating embedding...");
	output.textContent = "Waiting for response...";
	vectorLength.textContent = "0 values";

	try {
		const response = await fetch(`/embed?text=${encodeURIComponent(text)}`);
		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		const vector = await response.json();
		renderVector(vector);
		setStatus("Embedding ready.");
	} catch (error) {
		output.textContent = "Unable to load embedding.";
		setStatus(error instanceof Error ? error.message : "Something went wrong.", true);
	}
});
