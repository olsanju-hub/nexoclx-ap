const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const state = {
  query: '',
  category: 'Todas',
  type: 'Todos'
};

const data = {
  protocols: window.NEXO_PROTOCOLS || [],
  medications: window.NEXO_MEDICATIONS || [],
  calculators: window.NEXO_CALCULATORS || [],
  bibliography: window.NEXO_BIBLIOGRAPHY || []
};

const app = $('#app');

function medById(id) {
  return data.medications.find((med) => med.id === id);
}

function calcById(id) {
  return data.calculators.find((calc) => calc.id === id);
}

function bibById(id) {
  return data.bibliography.find((bib) => bib.id === id);
}

function normalize(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchableText(protocol) {
  const meds = protocol.meds.map((id) => medById(id)?.generic).join(' ');
  return normalize([
    protocol.title,
    protocol.category,
    protocol.focus,
    protocol.type,
    protocol.keywords.join(' '),
    protocol.synonyms.join(' '),
    meds
  ].join(' '));
}

function filterProtocols() {
  const q = normalize(state.query);
  return data.protocols.filter((protocol) => {
    const categoryOk = state.category === 'Todas' || protocol.category === state.category;
    const typeOk = state.type === 'Todos' || normalize(protocol.type) === normalize(state.type);
    const queryOk = !q || searchableText(protocol).includes(q);
    return categoryOk && typeOk && queryOk;
  });
}

function route() {
  const hash = location.hash.replace(/^#\/?/, '') || 'inicio';
  const [name, id] = hash.split('/');
  setActiveNav(name);
  if (name === 'protocolos' && id) return renderProtocol(id);
  if (name === 'protocolos') return renderProtocols();
  if (name === 'herramientas') return renderTools();
  if (name === 'bibliografia') return renderBibliography();
  return renderHome();
}

function setActiveNav(name) {
  $$('[data-route]').forEach((link) => {
    link.toggleAttribute('aria-current', link.dataset.route === name);
  });
}

function layout(title, subtitle, content) {
  app.innerHTML = `
    <section class="page-head">
      <div>
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ''}
      </div>
    </section>
    <p class="clinical-warning">NexoClx AP es una herramienta de apoyo clínico. No sustituye el juicio clínico, la valoración individual ni las guías oficiales vigentes.</p>
    ${content}
  `;
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

function protocolList(protocols) {
  if (!protocols.length) return '<p class="empty">No hay protocolos que coincidan con la búsqueda.</p>';
  return `<div class="protocol-list">${protocols.map((protocol) => `
    <a class="protocol-row" href="#/protocolos/${protocol.id}">
      <span>
        <strong>${protocol.title}</strong>
        <small>${protocol.category} · ${protocol.focus}</small>
      </span>
    </a>
  `).join('')}</div>`;
}

function searchBox() {
  const categories = ['Todas', ...new Set(data.protocols.map((protocol) => protocol.category))];
  const types = ['Todos', ...new Set(data.protocols.map((protocol) => protocol.type).filter(Boolean))];
  return `
    <div class="search-panel">
      <label for="main-search">Buscar protocolo, síntoma, fármaco o término clínico</label>
      <input id="main-search" type="search" value="${state.query}" placeholder="tensión, azúcar, colesterol, tos, IECA, insulina...">
      <div class="filter-group">
        <span>Categoría</span>
        <div class="filters" role="list" aria-label="Categorías">
        ${categories.map((category) => `<button class="chip" data-category="${category}" ${state.category === category ? 'aria-pressed="true"' : ''}>${category}</button>`).join('')}
        </div>
      </div>
      <div class="filter-group">
        <span>Tipo</span>
        <div class="filters" role="list" aria-label="Tipo clínico">
        ${types.map((type) => `<button class="chip" data-type="${type}" ${state.type === type ? 'aria-pressed="true"' : ''}>${type}</button>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function bindSearch() {
  const input = $('#main-search');
  if (input) {
    input.addEventListener('input', (event) => {
      state.query = event.target.value;
      $('.protocol-list-wrap').innerHTML = protocolList(filterProtocols());
    });
  }
  $$('.chip').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.category) state.category = button.dataset.category;
      if (button.dataset.type) state.type = button.dataset.type;
      route();
    });
  });
}

function renderHome() {
  const visibleProtocols = filterProtocols();
  layout(
    'NexoClx AP',
    'Protocolos rápidos de Atención Primaria para consulta clínica con tiempo limitado.',
    `
      ${searchBox()}
      <section class="split">
        <div>
          <h2>Protocolos frecuentes</h2>
          <div class="protocol-list-wrap">${protocolList(visibleProtocols)}</div>
        </div>
        <aside class="side-panel">
          <h2>Herramientas</h2>
          ${data.calculators.map((calc) => `<a href="#/herramientas" class="tool-link"><strong>${calc.title}</strong><small>${calc.protocol}</small></a>`).join('')}
        </aside>
      </section>
    `
  );
  bindSearch();
}

function renderProtocols() {
  layout(
    'Protocolos',
    'Lista filtrable por categoría, sinónimos, síntomas y fármacos.',
    `${searchBox()}<section><div class="protocol-list-wrap">${protocolList(filterProtocols())}</div></section>`
  );
  bindSearch();
}

function renderProtocol(id) {
  const protocol = data.protocols.find((item) => item.id === id);
  if (!protocol) {
    location.hash = '#/protocolos';
    return;
  }
  const medCards = protocol.meds.map((medId) => medById(medId)).filter(Boolean).map(renderMedication).join('');
  const calcCards = protocol.calculators.map((calcId) => calcById(calcId)).filter(Boolean).map(renderCalculator).join('');
  const bibRows = protocol.bibliography.map((bibId) => bibById(bibId)).filter(Boolean).map(renderBibRow).join('');

  layout(
    protocol.title,
    `${protocol.category} · ${protocol.focus}`,
    `
      <section class="protocol-grid">
        ${protocol.blocks.map((block) => `
          <article class="clinical-block">
            <h2>${block.title}</h2>
            ${block.title === 'Tratamiento' && protocol.treatmentRows ? renderTreatmentRows(protocol.treatmentRows) : `<ul>${block.items.map((item) => `<li>${linkMedicationNames(item)}</li>`).join('')}</ul>`}
          </article>
        `).join('')}
      </section>
      ${calcCards ? `<section><h2>Calculadoras vinculadas</h2>${calcCards}</section>` : ''}
      ${medCards ? `<section><h2>Medicamentos</h2><div class="med-grid">${medCards}</div></section>` : ''}
      <section class="details">${protocol.secondary.map((section) => `
        <details>
          <summary>${section.title}</summary>
          <ul>${section.items.map((item) => `<li>${linkMedicationNames(item)}</li>`).join('')}</ul>
        </details>
      `).join('')}</section>
      <section><h2>Bibliografía del protocolo</h2><div class="table-wrap"><table><thead><tr><th>Fuente</th><th>Año</th><th>Confianza</th><th>Enlace</th></tr></thead><tbody>${bibRows}</tbody></table></div></section>
    `
  );
  bindCalculators();
}

function renderTreatmentRows(rows) {
  return `<div class="treatment-grid">${rows.map((row) => {
    const med = row.cimaMedicationId ? medById(row.cimaMedicationId) : null;
    const cima = med?.cima?.startsWith('http')
      ? `<a href="${med.cima}" target="_blank" rel="noopener">CIMA</a>`
      : row.medication && row.medication !== '-' ? '<span class="pending">CIMA pendiente</span>' : '-';
    return `
      <article class="treatment-row">
        <h3>${row.scenario}</h3>
        <dl>
          <dt>Conducta</dt><dd>${row.action}</dd>
          <dt>Grupo</dt><dd>${row.drugClass || '-'}</dd>
          <dt>Fármaco</dt><dd><strong>${row.medication || '-'}</strong></dd>
          <dt>Dosis</dt><dd>${row.dose || '-'}</dd>
          <dt>Frecuencia</dt><dd>${row.frequency || '-'}</dd>
          <dt>Duración</dt><dd>${row.duration || '-'}</dd>
          <dt>Subir/cambiar</dt><dd>${row.escalation || '-'}</dd>
          <dt>Control</dt><dd>${row.followUp || '-'}</dd>
          <dt>Precauciones</dt><dd>${row.safety || '-'}</dd>
          <dt>CIMA</dt><dd>${cima}</dd>
        </dl>
      </article>
    `;
  }).join('')}</div>`;
}

function linkMedicationNames(text) {
  let result = text;
  data.medications.forEach((med) => {
    if (!med.cima.startsWith('http')) return;
    const escaped = med.generic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`\\b(${escaped})\\b`, 'gi'), `<a href="${med.cima}" target="_blank" rel="noopener">$1</a>`);
  });
  return result;
}

function renderMedication(med) {
  const cima = med.cima.startsWith('http')
    ? `<a href="${med.cima}" target="_blank" rel="noopener">Ficha CIMA/AEMPS</a>`
    : `<span class="pending">${med.cima}</span>`;
  return `
    <article class="med-card">
      <h3>${med.generic}</h3>
      <p><strong>Dosis:</strong> ${med.dose}</p>
      <p><strong>Duración:</strong> ${med.duration}</p>
      <p><strong>Seguridad:</strong> ${med.safety}</p>
      <p><strong>Renal:</strong> ${med.renal}</p>
      <p><strong>Hepática:</strong> ${med.hepatic}</p>
      <p>${cima}</p>
    </article>
  `;
}

function renderTools() {
  layout(
    'Herramientas / Calculadoras',
    'Solo se incluyen herramientas vinculadas a decisiones de los protocolos V1.',
    data.calculators.map(renderCalculator).join('')
  );
  bindCalculators();
}

function renderCalculator(calc) {
  const body = calc.id === 'insulina-basal' ? basalCalculator(calc)
    : calc.id === 'cockcroft-gault' ? renalCalculator(calc)
    : score2Tool(calc);
  return `
    <article class="calculator" id="${calc.id}">
      <h2>${calc.title}</h2>
      <dl>
        <dt>Protocolo</dt><dd>${calc.protocol}</dd>
        <dt>Variables</dt><dd>${calc.variables.join(', ')}</dd>
        <dt>Fórmula/criterio</dt><dd>${calc.formula}</dd>
        <dt>Fuente</dt><dd>${calc.source}</dd>
        <dt>Revisión</dt><dd>${calc.reviewed}</dd>
      </dl>
      <p class="notice">${calc.warning}</p>
      ${body}
    </article>
  `;
}

function basalCalculator() {
  return `
    <form class="calc-form" data-calc="basal">
      <label>Peso kg <input name="weight" inputmode="decimal" required></label>
      <label>Edad <input name="age" inputmode="numeric" required></label>
      <label>Glucemia basal media mg/dl <input name="fasting" inputmode="decimal" required></label>
      <label>HbA1c % <input name="hba1c" inputmode="decimal"></label>
      <label>eGFR ml/min/1,73 m2 <input name="egfr" inputmode="decimal"></label>
      <label>Tratamiento actual <textarea name="treatment" rows="2"></textarea></label>
      <label><input type="checkbox" name="fragile"> Fragilidad o alto riesgo de hipoglucemia</label>
      <label><input type="checkbox" name="risk"> Situación de riesgo actual: cetosis, vómitos, deshidratación, infección grave, embarazo o sospecha DM1</label>
      <button type="submit">Calcular orientación</button>
      <output class="calc-output"></output>
    </form>
  `;
}

function renalCalculator() {
  return `
    <form class="calc-form" data-calc="renal">
      <label>Edad <input name="age" inputmode="numeric" required></label>
      <label>Peso kg <input name="weight" inputmode="decimal" required></label>
      <label>Sexo
        <select name="sex"><option value="male">Hombre</option><option value="female">Mujer</option></select>
      </label>
      <label>Creatinina <input name="creatinine" inputmode="decimal" required></label>
      <label>Unidad
        <select name="unit"><option value="mgdl">mg/dl</option><option value="umol">µmol/l</option></select>
      </label>
      <button type="submit">Calcular ClCr</button>
      <output class="calc-output"></output>
    </form>
  `;
}

function score2Tool() {
  return `<p><a class="button-link" href="https://www.heartscore.org/" target="_blank" rel="noopener">Abrir ESC HeartScore oficial</a></p>`;
}

function bindCalculators() {
  $$('.calc-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      const output = $('.calc-output', form);
      if (form.dataset.calc === 'basal') output.innerHTML = calculateBasal(values, form);
      if (form.dataset.calc === 'renal') output.innerHTML = calculateRenal(values);
    });
  });
}

function num(value) {
  return Number(String(value).replace(',', '.'));
}

function calculateBasal(values, form) {
  const weight = num(values.weight);
  const age = num(values.age);
  const fasting = num(values.fasting);
  const fragile = Boolean(new FormData(form).get('fragile')) || age >= 80;
  const risk = Boolean(new FormData(form).get('risk'));
  if (!weight || !age || !fasting) return '<strong>Faltan datos obligatorios.</strong>';
  if (risk) return '<strong>No calcular pauta ambulatoria:</strong> hay situación de riesgo. Valorar urgencias, cetonas, hidratación, infección, embarazo o sospecha de DM1.';
  const byWeight = weight * (fragile ? 0.1 : 0.2);
  const dose = Math.max(6, Math.min(10, byWeight));
  const rounded = Math.round(dose);
  const target = fragile ? '110-150 mg/dl' : '80-130 mg/dl';
  const titration = fasting > (fragile ? 150 : 130)
    ? 'si la mediana de 3 glucemias basales sigue por encima del objetivo y no hay hipoglucemia, subir 2 UI cada 3 días.'
    : 'no subir dosis ahora; mantener y revisar hipoglucemias, técnica y HbA1c.';
  return `
    <strong>Dosis inicial orientativa:</strong> ${rounded} UI SC cada 24 h (glargina U100 u otra basal según ficha y disponibilidad).<br>
    <strong>Objetivo basal inicial:</strong> ${target}.<br>
    <strong>Titulación:</strong> ${titration}<br>
    <strong>Reducir:</strong> 10-20% si glucemia <70 mg/dl, hipoglucemia nocturna o reducción brusca de ingesta.<br>
    <strong>Autocontroles:</strong> basal diaria al inicio; añadir controles si síntomas, conducción, ejercicio inhabitual o hipoglucemia.<br>
    <strong>Revisión:</strong> contacto en 3-7 días y revisión en 1-2 semanas.
  `;
}

function calculateRenal(values) {
  const age = num(values.age);
  const weight = num(values.weight);
  let creatinine = num(values.creatinine);
  if (values.unit === 'umol') creatinine = creatinine / 88.4;
  if (!age || !weight || !creatinine) return '<strong>Faltan datos obligatorios.</strong>';
  let clcr = ((140 - age) * weight) / (72 * creatinine);
  if (values.sex === 'female') clcr *= 0.85;
  const rounded = Math.round(clcr);
  const range = rounded < 30 ? '<30 ml/min' : rounded < 60 ? '30-59 ml/min' : rounded < 90 ? '60-89 ml/min' : '>=90 ml/min';
  return `<strong>ClCr Cockcroft-Gault:</strong> ${rounded} ml/min (${range}). Usar solo para fármacos cuya ficha técnica pida ClCr; si pide eGFR/CKD-EPI, no sustituirlo por este cálculo.`;
}

function renderBibliography() {
  const rows = data.bibliography.map(renderBibRow).join('');
  layout(
    'Bibliografía',
    'Fuentes usadas por protocolo, año, institución y trazabilidad.',
    `<div class="table-wrap"><table><thead><tr><th>Protocolo</th><th>Fuente</th><th>Año</th><th>Institución</th><th>Confianza</th><th>Enlace</th></tr></thead><tbody>${rows}</tbody></table></div>`
  );
}

function renderBibRow(bib) {
  return `
    <tr>
      <td>${bib.protocol}</td>
      <td>${bib.title}</td>
      <td>${bib.year}</td>
      <td>${bib.institution}</td>
      <td>${bib.confidence}</td>
      <td><a href="${bib.url}" target="_blank" rel="noopener">Abrir</a></td>
    </tr>
  `;
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
  route();
});
