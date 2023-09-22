function tickerChanged() {
  console.log("Here");
  elem = document.getElementById("ticker");
  console.log(elem);
  document.title = "P/L - " + elem.value;
}

function formatValue(value) {
  return Math.abs(value) >= 1 ? "$" + value.toFixed(4) : "$" + value.toFixed(4);
}

function generateTables() {
  const amount = parseFloat(
    document.getElementById("amount").value.replace("$", "")
  );
  const quantity = parseFloat(document.getElementById("quantity").value);

  const total_amount = formatValue(quantity * amount);
  document.getElementById("total_amount").value = total_amount;

  const increments = [
    0.25, 0.5, 0.75, 1, 2, 2.5, 3, 4, 5, 9, 10, 15, 20, 25, 30,
  ];
  const decrements = [
    -0.25, -0.5, -0.75, -1, -2, -2.5, -3, -4, -5, -7.5, -9, -10, -12.5, -15,
    -20,
  ];

  const incrementTableBody = document.querySelector("#incrementTable tbody");
  const decrementTableBody = document.querySelector("#decrementTable tbody");

  // Clear previous data
  incrementTableBody.innerHTML = "";
  decrementTableBody.innerHTML = "";

  for (let percent of increments) {
    let newRow = incrementTableBody.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    let exitPrice = amount + (amount * percent) / 100;
    let profit = (exitPrice - amount) * quantity;

    cell1.textContent = percent + "%";
    cell2.textContent = formatValue(exitPrice);
    cell3.textContent = formatValue(profit);
  }

  for (let percent of decrements) {
    let newRow = decrementTableBody.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    let exitPrice = amount + (amount * percent) / 100;
    let loss = (exitPrice - amount) * quantity;

    cell1.textContent = percent + "%";
    cell2.textContent = formatValue(exitPrice);
    cell3.textContent = formatValue(loss);
  }
}
