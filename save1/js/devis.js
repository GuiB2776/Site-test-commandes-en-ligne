// Sélection des éléments
const form = document.getElementById('quote-form');
const tableBody = document.querySelector('#items-table tbody');
const addItemBtn = document.getElementById('add-item');
const clearAllBtn = document.getElementById('clear-all');
const downloadBtn = document.getElementById('download-quote');
const quoteContainer = document.getElementById('quote-container');

const quoteNumberInput = document.getElementById('quote-number');
const quoteDateInput = document.getElementById('quote-date');
const quoteValidityInput = document.getElementById('quote-validity');
const quoteTitleInput = document.getElementById('quote-title');
const clientNameInput = document.getElementById('client-name');
const clientAddressInput = document.getElementById('client-address');
const clientContactInput = document.getElementById('client-contact');
const taxRateInput = document.getElementById('tax-rate');
const paymentTermsInput = document.getElementById('payment-terms');
const penaltyTermsInput = document.getElementById('penalty-terms');
const discountTermsInput = document.getElementById('discount-terms');
const deliveryTimeInput = document.getElementById('delivery-time');
const executionInput = document.getElementById('execution');
const generalTermsInput = document.getElementById('general-terms');
const otherClausesInput = document.getElementById('other-clauses');
const bankNameInput = document.getElementById('bank-name');
const ibanInput = document.getElementById('iban');
const bicInput = document.getElementById('bic');
const quotePlaceInput = document.getElementById('quote-place');
const quoteSignDateInput = document.getElementById('quote-sign-date');

// Defaults and stored merge
const defaults = {
  number: '', date: '', validity: '', title: '',
  client: { name:'', address:'', contact:'' },
  items: [], taxRate: parseFloat(taxRateInput.value) || 0,
  paymentTerms:'', penaltyTerms:'', discountTerms:'',
  deliveryTime:'', execution:'', generalTerms:'', otherClauses:'',
  bank: { name:'', iban:'', bic:'' },
  signature: { place:'', date:'' }
};
const storedRaw = JSON.parse(localStorage.getItem('quote'));
const stored = storedRaw && typeof storedRaw === 'object' ? storedRaw : {};
const quote = {
  ...defaults,
  ...stored,
  client: { ...defaults.client, ...(stored.client || {}) },
  bank: { ...defaults.bank, ...(stored.bank || {}) },
  signature: { ...defaults.signature, ...(stored.signature || {}) },
  items: Array.isArray(stored.items) ? stored.items : defaults.items,
  taxRate: typeof stored.taxRate === 'number' ? stored.taxRate : defaults.taxRate
};

function saveQuote() {
  localStorage.setItem('quote', JSON.stringify(quote));
}
function formatPrice(val) {
  return parseFloat(val).toFixed(2);
}
function updateTotals() {
  const totalHT = quote.items.reduce((sum,i) => sum + i.qty * i.price, 0);
  const tax = totalHT * quote.taxRate / 100;
  const totalTTC = totalHT + tax;
  document.getElementById('total-ht').textContent = formatPrice(totalHT);
  document.getElementById('tax-amount').textContent = formatPrice(tax);
  document.getElementById('tax-rate-display').textContent = quote.taxRate.toFixed(2) + '%';
  document.getElementById('quote-total-ttc').textContent = formatPrice(totalTTC);
}
function renderItems() {
  tableBody.innerHTML = '';
  quote.items.forEach((item, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="text" value="${item.desc}" data-index="${idx}" data-field="desc"></td>
      <td><input type="number" min="0" value="${item.qty}" data-index="${idx}" data-field="qty"></td>
      <td><input type="number" min="0" step="0.01" value="${item.price}" data-index="${idx}" data-field="price"></td>
      <td>€ ${formatPrice(item.qty * item.price)}</td>
      <td><button type="button" data-index="${idx}" class="delete-item">&times;</button></td>
    `;
    tableBody.appendChild(row);
  });
  updateTotals();
  saveQuote();
}
addItemBtn.addEventListener('click', () => { quote.items.push({ desc:'', qty:0, price:0 }); renderItems(); });
tableBody.addEventListener('input', e => {
  const idx = e.target.dataset.index; 
  const field = e.target.dataset.field;
  quote.items[idx][field] = field==='desc' ? e.target.value : parseFloat(e.target.value)||0;
  renderItems();
});
tableBody.addEventListener('click', e => {
  if(e.target.classList.contains('delete-item')){
    quote.items.splice(e.target.dataset.index,1);
    renderItems();
  }
});
[
  [quoteNumberInput, v=>quote.number=v],
  [quoteDateInput, v=>quote.date=v],
  [quoteValidityInput, v=>quote.validity=v],
  [quoteTitleInput, v=>quote.title=v],
  [clientNameInput, v=>quote.client.name=v],
  [clientAddressInput, v=>quote.client.address=v],
  [clientContactInput, v=>quote.client.contact=v],
  [paymentTermsInput, v=>quote.paymentTerms=v],
  [penaltyTermsInput, v=>quote.penaltyTerms=v],
  [discountTermsInput, v=>quote.discountTerms=v],
  [deliveryTimeInput, v=>quote.deliveryTime=v],
  [executionInput, v=>quote.execution=v],
  [generalTermsInput, v=>quote.generalTerms=v],
  [otherClausesInput, v=>quote.otherClauses=v],
  [bankNameInput, v=>quote.bank.name=v],
  [ibanInput, v=>quote.bank.iban=v],
  [bicInput, v=>quote.bank.bic=v],
  [quotePlaceInput, v=>quote.signature.place=v],
  [quoteSignDateInput, v=>quote.signature.date=v],
].forEach(([el, setter]) => {
  el.value = (el.id in quote) ? quote[el.id] : el.value;
  el.addEventListener('input', e => { setter(e.target.value); saveQuote(); });
});
taxRateInput.addEventListener('input', e=>{ quote.taxRate=parseFloat(e.target.value)||0; saveQuote(); updateTotals(); });
form.addEventListener('submit', e=>{ e.preventDefault(); alert(`Devis enregistré :\nN° ${quote.number}\nClient : ${quote.client.name}\nTotal TTC : €${document.getElementById('quote-total-ttc').textContent}`); });
clearAllBtn.addEventListener('click', ()=>{ if(confirm('Effacer toutes les données ?')){ localStorage.removeItem('quote'); location.reload(); } });
downloadBtn.addEventListener('click', async () => {
  const companyInfoHTML = document.querySelector('.company-info').outerHTML;
  const pdfDiv = document.createElement('div'); pdfDiv.id = 'pdf-container';
  const sec1 = document.createElement('section'); sec1.className='pdf-page';
  const cols = `
    <div class="two-columns">
      <div>
        <p><strong>Numéro :</strong> ${quote.number}</p>
        <p><strong>Date :</strong> ${quote.date}</p>
        <p><strong>Validité :</strong> ${quote.validity}</p>
      </div>
      <div>
        <p><strong>Objet :</strong> ${quote.title}</p>
        <p><strong>Client :</strong> ${quote.client.name}</p>
        <p><strong>Adresse :</strong> ${quote.client.address}</p>
        <p><strong>Contact :</strong> ${quote.client.contact}</p>
      </div>
    </div>`;
  const rows = quote.items.filter(i=>i.desc.trim()&&i.qty>0&&i.price>0).map(i=>`
    <tr><td>${i.desc}</td><td>${i.qty}</td><td>€ ${formatPrice(i.price)}</td><td>€ ${formatPrice(i.qty*i.price)}</td></tr>`).join('');
  sec1.innerHTML = `
    ${companyInfoHTML}
    ${cols}
    <h3>Prestations</h3>
    <table style="width:100%;border-collapse:collapse">
      <thead><tr><th>Description</th><th>Qté</th><th>PU</th><th>Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p><strong>Total HT :</strong> €${document.getElementById('total-ht').textContent}</p>
    <p><strong>TVA (${quote.taxRate.toFixed(2)}%) :</strong> €${document.getElementById('tax-amount').textContent}</p>
    <p><strong>Total TTC :</strong> €${document.getElementById('quote-total-ttc').textContent}</p>`;
  pdfDiv.appendChild(sec1);

  const sec2 = document.createElement('section'); sec2.className='pdf-page';
  sec2.innerHTML = `
    <h3>Modalités financières</h3>
    <p><strong>Conditions :</strong> ${quote.paymentTerms}</p>
    <p><strong>Pénalités :</strong> ${quote.penaltyTerms}</p>
    <p><strong>Escompte :</strong> ${quote.discountTerms}</p>
    <h3>Modalités pratiques</h3>
    <p><strong>Délai :</strong> ${quote.deliveryTime}</p>
    <p><strong>Lieu :</strong> ${quote.execution}</p>
    <h3>Mentions légales</h3>
    <p>${quote.generalTerms.replace(/\n/g,'<br>')}</p>
    <p>${quote.otherClauses.replace(/\n/g,'<br>')}</p>`;
  pdfDiv.appendChild(sec2);

  const sec3 = document.createElement('section'); sec3.className='pdf-page';
  sec3.innerHTML = `
    <h3>Coordonnées bancaires</h3>
    <p><strong>Banque :</strong> ${quote.bank.name}</p>
    <p><strong>IBAN :</strong> ${quote.bank.iban}</p>
    <p><strong>BIC :</strong> ${quote.bank.bic}</p>
    <h3>Signature</h3>
    <p><strong>Lieu :</strong> ${quote.signature.place}</p>
    <p><strong>Date :</strong> ${quote.signature.date}</p>
    <p>Bon pour accord</p>`;
  pdfDiv.appendChild(sec3);

  document.body.appendChild(pdfDiv);
  const doc = new jspdf.jsPDF('p','pt','a4');
  const pages = pdfDiv.querySelectorAll('section.pdf-page');
  const w = doc.internal.pageSize.getWidth(), h = doc.internal.pageSize.getHeight();
  for(let i=0; i<pages.length; i++){
    if(i>0) doc.addPage();
    const canvas = await html2canvas(pages[i], { scale:2 });
    const img = canvas.toDataURL('image/png'), imgH = canvas.height * w / canvas.width;
    doc.addImage(img,'PNG',0,0,w,imgH);
    doc.setFontSize(10);
    doc.text(`Page ${i+1} / ${pages.length}`, w-60, h-10);
  }
  doc.save(`Devis_${quote.number || 'sans-numero'}.pdf`);
  document.body.removeChild(pdfDiv);
});

// Initialisation
renderItems();
updateTotals();
quoteNumberInput.value = quote.number;
quoteDateInput.value = quote.date;
quoteValidityInput.value = quote.validity;
quoteTitleInput.value = quote.title;
clientNameInput.value = quote.client.name;
clientAddressInput.value = quote.client.address;
clientContactInput.value = quote.client.contact;
taxRateInput.value = quote.taxRate;
paymentTermsInput.value = quote.paymentTerms;
penaltyTermsInput.value = quote.penaltyTerms;
discountTermsInput.value = quote.discountTerms;
deliveryTimeInput.value = quote.deliveryTime;
executionInput.value = quote.execution;
generalTermsInput.value = quote.generalTerms;
otherClausesInput.value = quote.otherClauses;
bankNameInput.value = quote.bank.name;
ibanInput.value = quote.bank.iban;
bicInput.value = quote.bank.bic;
quotePlaceInput.value = quote.signature.place;
quoteSignDateInput.value = quote.signature.date;
