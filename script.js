function estimateCost() {
  const area = parseFloat(document.getElementById('area').value);
  const ratePerSqft = 1650; // Tamil Nadu SOR-based example rate
  const total = area * ratePerSqft;
  document.getElementById('output').innerText = `Estimated Cost: ₹${total.toLocaleString()}`;
}