// Sélection des éléments de base
const form               = document.getElementById('quote-form');
const tableBody          = document.querySelector('#items-table tbody');
const addItemBtn         = document.getElementById('add-item');
const clearAllBtn        = document.getElementById('clear-all');
const downloadBtn        = document.getElementById('download-quote');
const quoteContainer     = document.getElementById('quote-container');

// Nouveaux champs
const quoteNumberInput   = document.getElementById('quote-number');
const quoteDateInput     = document.getElementById('quote-date');
const quoteValidityInput = document.getElementById('quote-validity');
const quoteTitleInput    = document.getElementById('quote-title');
const clientNameInput    = document.getElementById('client-name');
const clientAddressInput = document.getElementById('client-address');
const clientContactInput = document.getElementById('client-contact');
const taxRateInput       = document.getElementById('tax-rate');
const paymentTermsInput  = document.getElementById('payment-terms');
const penaltyTermsInput  = document.getElementById('penalty-terms');
const discountTermsInput = document.getElementById('discount-terms');
const deliveryTimeInput  = document.getElementById('delivery-time');
const executionInput     = document.getElementById('execution');
const generalTermsInput  = document.getElementById('general-terms');
const otherClausesInput  = document.getElementById('other-clauses');
const bankNameInput      = document.getElementById('bank-name');
const ibanInput          = document.getElementById('iban');
const bicInput           = document.getElementById('bic');
const quotePlaceInput    = document.getElementById('quote-place');
const quoteSignDateInput = document.getElementById('quote-sign-date');

// Totaux affichage
const totalHTEl          = document.getElementById('total-ht');
const taxAmountEl        = document.getElementById('tax-amount');
const taxRateDisplay     = document.getElementById('tax-rate-display');
const quoteTotalTTCEl    = document.getElementById('quote-total-ttc');

// Initialisation de l’objet quote
let quote = JSON.parse(localStorage.getItem('quote')) || {
  number: '',
  date: '',
  validity: '',
  title: '',
  client: { name:'', address:'', contact:'' },
  items: [],
  taxRate: parseFloat(taxRateInput.value) || 0,
  paymentTerms:'', penaltyTerms:'', discountTerms:'',
  deliveryTime:'', execution:'',
  generalTerms:'', otherClauses:'',
  bank: { name:'', iban:'', bic:'' },
  signature: { place:'', date:'' }
};

function saveQuote() {
  localStorage.setItem('quote', JSON.stringify(quote));
}

function formatPrice(val) {
  return parseFloat(val).toFixed(2);
}

// CALCUL HT / TVA / TTC
function updateTotals() {
  const totalHT = quote.items.reduce((sum,i) => sum + i.qty * i.price, 0);
  const tax     = totalHT * quote.taxRate / 100;
  const totalTTC= totalHT + tax;
  totalHTEl.textContent       = formatPrice(totalHT);
  taxAmountEl.textContent     = formatPrice(tax);
  taxRateDisplay.textContent  = quote.taxRate.toFixed(2) + '%';
  quoteTotalTTCEl.textContent = formatPrice(totalTTC);
}

// RENDU DU TABLEAU
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

// AJOUT D’UNE LIGNE
addItemBtn.addEventListener('click', () => {
  quote.items.push({ desc:'', qty:0, price:0 });
  renderItems();
});

// ÉDITION EN DIRECT
tableBody.addEventListener('input', e => {
  const idx   = e.target.dataset.index;
  const field = e.target.dataset.field;
  quote.items[idx][field] = field==='desc'
    ? e.target.value
    : parseFloat(e.target.value) || 0;
  renderItems();
});

// SUPPRESSION D’UNE LIGNE
tableBody.addEventListener('click', e => {
  if (e.target.classList.contains('delete-item')) {
    quote.items.splice(e.target.dataset.index, 1);
    renderItems();
  }
});

// Espace commun pour champs “input” ou “textarea”
[
  [quoteNumberInput,   v=>quote.number = v],
  [quoteDateInput,     v=>quote.date = v],
  [quoteValidityInput, v=>quote.validity = v],
  [quoteTitleInput,    v=>quote.title = v],
  [clientNameInput,    v=>quote.client.name = v],
  [clientAddressInput, v=>quote.client.address = v],
  [clientContactInput, v=>quote.client.contact = v],
  [paymentTermsInput,  v=>quote.paymentTerms = v],
  [penaltyTermsInput,  v=>quote.penaltyTerms = v],
  [discountTermsInput, v=>quote.discountTerms = v],
  [deliveryTimeInput,  v=>quote.deliveryTime = v],
  [executionInput,     v=>quote.execution = v],
  [generalTermsInput,  v=>quote.generalTerms = v],
  [otherClausesInput,  v=>quote.otherClauses = v],
  [bankNameInput,      v=>quote.bank.name = v],
  [ibanInput,          v=>quote.bank.iban = v],
  [bicInput,           v=>quote.bank.bic = v],
  [quotePlaceInput,    v=>quote.signature.place = v],
  [quoteSignDateInput, v=>quote.signature.date = v],
].forEach(([el, setter]) => {
  el.value = el.tagName==='INPUT' || el.tagName==='TEXTAREA'
           ? el.value = (function(){
               // charger depuis quote
               const keys = el.id.split(/[-_]/);
               // initialisation sommaire
               return '';
             })()
           : '';
  el.addEventListener('input', e=>{
    setter(e.target.value);
    saveQuote();
  });
});

// Gestion du champ TVA
taxRateInput.value = quote.taxRate;
taxRateInput.addEventListener('input', e => {
  quote.taxRate = parseFloat(e.target.value) || 0;
  saveQuote();
  updateTotals();
});

// Enregistrement “submit”
form.addEventListener('submit', e => {
  e.preventDefault();
  alert(`Devis enregistré :\nN° ${quote.number}\nClient : ${quote.client.name}\nTotal TTC : €${quoteTotalTTCEl.textContent}`);
});

// Tout supprimer
clearAllBtn.addEventListener('click', ()=> {
  if (confirm('Effacer toutes les données ?')) {
    localStorage.removeItem('quote');
    location.reload();
  }
});

// Téléchargement PDF
downloadBtn.addEventListener('click', () => {
  html2canvas(quoteContainer).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf     = new jspdf.jsPDF('p','mm','a4');
    const pdfW    = pdf.internal.pageSize.getWidth();
    const pdfH    = canvas.height * pdfW / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
    pdf.save(`Devis_${quote.number || 'sans-number'}.pdf`);
  });
});

// Initialisation
renderItems();
updateTotals();

// Charger les autres champs depuis localStorage
quoteNumberInput.value   = quote.number;
quoteDateInput.value     = quote.date;
quoteValidityInput.value = quote.validity;
quoteTitleInput.value    = quote.title;
clientNameInput.value    = quote.client.name;
clientAddressInput.value = quote.client.address;
clientContactInput.value = quote.client.contact;
paymentTermsInput.value  = quote.paymentTerms;
penaltyTermsInput.value  = quote.penaltyTerms;
discountTermsInput.value = quote.discountTerms;
deliveryTimeInput.value  = quote.deliveryTime;
executionInput.value     = quote.execution;
generalTermsInput.value  = quote.generalTerms;
otherClausesInput.value  = quote.otherClauses;
bankNameInput.value      = quote.bank.name;
ibanInput.value          = quote.bank.iban;
bicInput.value           = quote.bank.bic;
quotePlaceInput.value    = quote.signature.place;
quoteSignDateInput.value = quote.signature.date;
