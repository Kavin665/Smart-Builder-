document.querySelector("button").addEventListener("click", function () {
  const area = parseFloat(document.querySelector("input").value);
  if (!isNaN(area)) {
    const rate = 1800; // You can update this with Tamil Nadu SOR rate
    const estimate = area * rate;
    document.getElementById("result").textContent = `Estimated cost: ₹${estimate.toLocaleString()}`;
  } else {
    document.getElementById("result").textContent = "Please enter a valid number.";
  }
});