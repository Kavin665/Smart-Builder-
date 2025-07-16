// script.js

// Dark mode toggle
document.getElementById('dark-mode-toggle').onclick = () => {
  document.documentElement.classList.toggle('dark');
};

// BOQ Logic
const boqBody = document.getElementById('boq-body');
const grandTotalEl = document.getElementById('grand-total');
let categories = []; // Track category names

// Add Category
document.getElementById('add-category').onclick = () => {
  const catName = prompt('Enter category name:');
  if (!catName) return;
  categories.push(catName);
  const catRow = document.createElement('tr');
  catRow.className = 'category-row';
  catRow.innerHTML = `
    <td class="px-3 py-2" colspan="8">${catName}</td>
  `;
  boqBody.appendChild(catRow);
};

// Add Item Row under last category
function addItemRow() {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td data-label="Category" class="px-3 py-2">${categories.slice(-1)[0] || '-'}</td>
    <td data-label="Description" class="px-3 py-2"><input class="w-full border p-1 desc" placeholder="Item"/></td>
    <td data-label="Qty" class="px-3 py-2"><input type="number" value="0" class="border p-1 qty"/></td>
    <td data-label="Unit" class="px-3 py-2">
      <select class="border p-1 unit">
        <option>cum</option><option>sqm</option><option>nos</option>
      </select>
    </td>
    <td data-label="Rate" class="px-3 py-2"><input type="number" value="0" class="border p-1 rate"/></td>
    <td data-label="Tax" class="px-3 py-2"><input type="number" value="0" class="border p-1 tax"/></td>
    <td data-label="Total" class="px-3 py-2">₹<span class="total">0.00</span></td>
    <td data-label="Remove" class="px-3 py-2"><button class="text-red-600 remove">✕</button></td>
  `;
  boqBody.appendChild(row);

  // Inputs
  const qty    = row.querySelector('.qty');
  const rate   = row.querySelector('.rate');
  const tax    = row.querySelector('.tax');
  const totalE = row.querySelector('.total');
  const remove = row.querySelector('.remove');

  // Update row total
  function updateRow() {
    const q = parseFloat(qty.value) || 0;
    const r = parseFloat(rate.value) || 0;
    const t = parseFloat(tax.value) || 0;
    const subtotal = q * r;
    const total = subtotal + (subtotal * t/100);
    totalE.textContent = total.toFixed(2);
    updateGrand();
  }
  qty.oninput = rate.oninput = tax.oninput = updateRow;
  remove.onclick = () => { row.remove(); updateGrand(); };

  // Fire initial calc
  updateRow();
}

// Grand total
function updateGrand() {
  let sum = 0;
  boqBody.querySelectorAll('.total').forEach(el => {
    sum += parseFloat(el.textContent) || 0;
  });
  grandTotalEl.textContent = sum.toFixed(2);
}

// Export PDF
document.getElementById('export-pdf').onclick = () => {
  html2canvas(document.getElementById('boq-container')).then(canvas => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p','mm','a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10,10,190,0);
    pdf.save('BOQ.pdf');
  });
};

// Export Excel
document.getElementById('export-xlsx').onclick = () => {
  const wb = XLSX.utils.table_to_book(document.querySelector('table'), {sheet: "BOQ"});
  XLSX.writeFile(wb, 'BOQ.xlsx');
};

// Double-click on last category row to add item
boqBody.ondblclick = (e) => {
  if (e.target.closest('.category-row')) addItemRow();
};