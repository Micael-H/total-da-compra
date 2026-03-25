let opcao = 0;

function select(n) {
  opcao = n;
  [1, 2, 3].forEach(i => {
    document.getElementById('opt' + i).classList.remove('selected');
  });
  document.getElementById('opt' + n).classList.add('selected');
}

function formatVal(el) {
  let v = el.value.replace(/\D/g, '');
  if (!v) {
    el.value = '';
    return;
  }
  let num = parseInt(v) / 100;
  el.value = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function parseVal() {
  let raw = document.getElementById('valor').value
    .replace(/[R$\s.]/g, '')
    .replace(',', '.');
  return parseFloat(raw);
}

function fmt(n) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcular() {
  const err = document.getElementById('err');
  const res = document.getElementById('result');
  const v = parseVal();

  if (!v || v <= 0 || isNaN(v)) {
    err.style.display = 'block';
    res.style.display = 'none';
    return;
  }
  err.style.display = 'none';

  if (opcao === 0) {
    alert('Selecione uma forma de pagamento.');
    return;
  }

  const descontos = [0, 0.10, 0.05, 0];
  const labels = ['', 'Desconto (10% — Pix/Dinheiro)', 'Desconto (5% — Débito)', ''];

  const desc = v * descontos[opcao];
  const total = v - desc;

  document.getElementById('r-original').textContent = fmt(v);

  const descRow = document.getElementById('r-desc-row');
  if (desc > 0) {
    descRow.style.display = 'flex';
    document.getElementById('r-desc-label').textContent = labels[opcao];
    document.getElementById('r-desc').textContent = '− ' + fmt(desc);
  } else {
    descRow.style.display = 'none';
  }

  document.getElementById('r-total').textContent = fmt(total);
  res.style.display = 'block';
}