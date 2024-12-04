document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#output");

  // Initially show loading message
  tableBody.innerHTML = `
    <tr>
      <td colspan="2">Loading...</td>
    </tr>
  `;

  // Helper function to create a promise
  const createPromise = (name, delay) => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      setTimeout(() => {
        const endTime = performance.now();
        const timeTaken = ((endTime - startTime) / 1000).toFixed(3); // Time in seconds
        resolve({ name, timeTaken });
      }, delay);
    });
  };

  // Create three promises with random delays
  const promise1 = createPromise("Promise 1", Math.random() * 2000 + 1000);
  const promise2 = createPromise("Promise 2", Math.random() * 2000 + 1000);
  const promise3 = createPromise("Promise 3", Math.random() * 2000 + 1000);

  const promises = [promise1, promise2, promise3];

  // Wait for all promises to resolve
  const start = performance.now();
  Promise.all(promises).then((results) => {
    const end = performance.now();
    const totalTime = ((end - start) / 1000).toFixed(3); // Total time in seconds

    // Clear the loading row
    tableBody.innerHTML = "";

    // Populate rows with results
    results.forEach((result) => {
      const row = `
        <tr>
          <td>${result.name}</td>
          <td>${result.timeTaken} s</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

    // Add total row
    const totalRow = `
      <tr>
        <td>Total</td>
        <td>${totalTime} s</td>
      </tr>
    `;
    tableBody.innerHTML += totalRow;
  });
});
