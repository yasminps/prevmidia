/* ============================================================
   CONFIGURAÇÃO DOS PACOTES
   Cada pacote é vendido separadamente por R$ 97 e tem seu próprio
   link de checkout na Kiwify. Para adicionar, remover ou editar um
   pacote, mexa só neste array.
   - kiwifyLink: link de checkout do produto na Kiwify. Cada pacote
     tem o seu — troque pelo link real de cada produto.
   - price / oldPrice: texto livre exibido no modal "Ver por dentro".
   - coverImage: (opcional) caminho de uma imagem real de capa do
     pacote (ex: "imagens/img bpc.png"). Se não tiver, o card usa
     um bloco de cor no lugar.
   - color: cor base usada nas miniaturas de preview do card/modal.
   - thumbLabels: textos que aparecem nos blocos de preview
     (troque por miniaturas reais quando tiver as artes prontas).
   - bullets: o que está incluso, mostrado no "Ver por dentro".
   ============================================================ */
const PACKS = [
  {
    id: "bpc-loas",
    name: "BPC LOAS",
    meta: "15+ artes editáveis",
    oldPrice: "R$ 290",
    price: "R$ 97",
    color: "#8f5e3f",
    coverImage: "imagens/img bpc.png",
    kiwifyLink: "https://pay.kiwify.com.br/SEU-LINK-BPC-LOAS",
    thumbLabels: ["Quem tem direito", "Documentos", "Renda familiar", "Negado, e agora?", "PCD", "Idoso"],
    bullets: [
      "Posts explicando quem tem direito ao BPC",
      "Reels roteirizados para gravar ou narrar",
      "Stories interativos (enquete, caixinha de pergunta)",
      "Arquivo 100% editável no Canva",
      "Cores e fontes no padrão do seu escritório",
    ],
  },
  {
    id: "salario-maternidade",
    name: "Salário-Maternidade",
    meta: "15+ artes editáveis",
    oldPrice: "R$ 290",
    price: "R$ 97",
    color: "#8f3f6b",
    kiwifyLink: "https://pay.kiwify.com.br/SEU-LINK-SALARIO-MATERNIDADE",
    thumbLabels: ["Quem tem direito", "Prazo", "Autônoma", "Desempregada", "Documentos", "Valor"],
    bullets: [
      "Posts explicando quem pode receber o benefício",
      "Reels roteirizados para gravar ou narrar",
      "Stories interativos (enquete, caixinha de pergunta)",
      "Arquivo 100% editável no Canva",
      "Cores e fontes no padrão do seu escritório",
    ],
  },
  {
    id: "aposentadoria",
    name: "Aposentadoria",
    meta: "15+ artes editáveis",
    oldPrice: "R$ 290",
    price: "R$ 97",
    color: "#3f5e8f",
    kiwifyLink: "https://pay.kiwify.com.br/SEU-LINK-APOSENTADORIA",
    thumbLabels: ["Tempo de contribuição", "Idade mínima", "Documentos", "Simulação", "Revisão", "Perícia"],
    bullets: [
      "Posts explicando regras e tipos de aposentadoria",
      "Reels roteirizados para gravar ou narrar",
      "Stories interativos (enquete, caixinha de pergunta)",
      "Arquivo 100% editável no Canva",
      "Cores e fontes no padrão do seu escritório",
    ],
  },
];

const grid = document.getElementById("packs-grid");
const modalOverlay = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close");

function shadeColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round(255 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * percent);
  let b = (num & 0x0000ff) + Math.round(255 * percent);
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return `rgb(${r}, ${g}, ${b})`;
}

function renderThumbs(pack, count) {
  return pack.thumbLabels
    .slice(0, count)
    .map((label, i) => {
      const bg = i % 2 === 0 ? pack.color : shadeColor(pack.color, 0.12);
      return `<div class="modal-thumb" style="background:${bg}">${label}</div>`;
    })
    .join("");
}

function renderCover(pack, index) {
  if (pack.coverImage) {
    return `<img class="pack-cover-img" src="${pack.coverImage}" alt="${pack.name}">`;
  }
  return `
    <div class="pack-cover" style="background:linear-gradient(155deg, ${pack.color}, ${shadeColor(pack.color, -0.14)})">
      <span class="pack-cover-meta">Pacote</span>
      <span class="pack-cover-index">${String(index + 1).padStart(2, "0")}</span>
    </div>
  `;
}

function renderCards() {
  grid.innerHTML = PACKS.map(
    (pack, i) => `
    <article class="pack-card" data-pack-id="${pack.id}">
      ${renderCover(pack, i)}
      <div class="pack-info">
        <h3 class="pack-name">${pack.name}</h3>
        <p class="pack-meta">${pack.meta} — ${pack.price}</p>
        <div class="pack-actions">
          <button type="button" class="btn btn-dark btn-medium btn-block js-view-pack" data-pack-id="${pack.id}">
            Quero adquirir
          </button>
        </div>
      </div>
    </article>
  `
  ).join("");
}

function openModal(packId) {
  const pack = PACKS.find((p) => p.id === packId);
  if (!pack) return;

  const preview = pack.coverImage
    ? `<img class="modal-cover-img" src="${pack.coverImage}" alt="${pack.name}">`
    : `<div class="modal-thumbs">${renderThumbs(pack, 6)}</div>`;

  modalBody.innerHTML = `
    ${preview}
    <h3 class="modal-title" id="modal-title">${pack.name}</h3>
    <p class="modal-meta">${pack.meta}</p>
    <ul class="modal-bullets">
      ${pack.bullets.map((b) => `<li>${b}</li>`).join("")}
    </ul>
    <p class="modal-price-old">${pack.oldPrice}</p>
    <p class="modal-price-new">Por <strong>${pack.price}</strong></p>
    <p class="modal-price-note">Pagamento único, acesso liberado na hora pela Kiwify.</p>
    <a href="${pack.kiwifyLink}" target="_blank" rel="noopener" class="btn btn-primary btn-large btn-block">
      Quero esse pacote por ${pack.price}
    </a>
  `;

  modalOverlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".js-view-pack");
  if (btn) openModal(btn.dataset.packId);
});

modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* FAQ accordion */
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");
    document.querySelectorAll(".faq-item").forEach((other) => {
      other.classList.remove("is-open");
      other.querySelector(".faq-answer").style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add("is-open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderCards();
