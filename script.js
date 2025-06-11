document.addEventListener('DOMContentLoaded', () => {
  // References to key DOM elements
  const display = document.getElementById('display');
  const btn = document.querySelectorAll('.grid-item');
  const historyList = document.getElementById('historyList');

  // Function to add the evaluated expression and result to the history list
  function addToHistory(expression, result) {
    const li = document.createElement('li');
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li); // Add latest result to the top of the list
  }

  // Add click event listeners to all calculator buttons
  btn.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.dataset.value || button.textContent;
      const id = button.id;

      // Clear the display if 'C' is clicked
      if (value === 'C') {
        display.value = '';

      // Remove the last character if backspace is clicked
      } else if (id === 'backspace') {
        display.value = display.value.slice(0, -1);

      // Evaluate the expression when '=' is clicked
      } else if (value === '=') {
        try {
          // Replace visual operators with valid JavaScript operators
          const expression = display.value
            .replace(/x/g, '*')
            .replace(/÷/g, '/');

          const result = math.evaluate(expression); // Evaluate using math.js
          display.value = result; // Display the result
          addToHistory(expression, result); // Save to history

        } catch (error) {
          display.value = 'Error'; // Show error if evaluation fails
        }

      // Append button value to display for other inputs
      } else {
        display.value += value;
      }
    });
  });

  // Add keyboard input support
  document.addEventListener('keydown', e => {
    // Allow numbers and operators
    if (
      (e.key >= '0' && e.key <= '9') ||
      ['+', '-', '*', '/', '.', '(', ')'].includes(e.key)
    ) {
      e.preventDefault(); // Prevent default typing behavior
      display.value += e.key; // Add key to the display

    // Handle Enter key to evaluate expression
    } else if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission or other defaults
      try {
        const expression = display.value
          .replace(/x/g, '*')
          .replace(/÷/g, '/');

        const result = math.evaluate(expression);
        display.value = result;
        addToHistory(expression, result); // Save to history

      } catch (error) {
        display.value = 'Error'; // Show error if evaluation fails
      }
    }
  });
});
