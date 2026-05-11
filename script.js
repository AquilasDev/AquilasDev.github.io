/* 1. ALTERNÂNCIA DE TEMA CLARO / ESCURO
   Salva preferência no localStorage para
   manter o tema escolhido entre visitas.*/
const themeBtn   = document.getElementById('theme-toggle');
const body       = document.body;

// Recupera tema salvo
const savedTheme = localStorage.getItem('tema');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  body.classList.add('dark');
  themeBtn.textContent = '☀️';
}

// Ao clicar: alterna classe .dark no body e salva no localStorage
themeBtn.addEventListener('click', function () {
  const isDark = body.classList.toggle('dark');
  themeBtn.textContent  = isDark ? '☀️' : '🌙';
  localStorage.setItem('tema', isDark ? 'dark' : 'light');
});


/* 2. MENU HAMBURGUER (MOBILE)
   Abre e fecha o menu de navegação em telas
   menores; fecha ao clicar em qualquer link.*/
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

// Abre/fecha o menu ao clicar no botão hamburguer
hamburger.addEventListener('click', function () {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Fecha o menu ao clicar em qualquer link (navegação âncora)
document.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


/* 3. DESTAQUE DO LINK ATIVO NO MENU
   Usa IntersectionObserver para detectar qual
   seção está visível e marca o link correspondente. */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Remove classe active de todos os links
      navItems.forEach(function (l) { l.classList.remove('active'); });
      // Adiciona classe active no link correspondente à seção visível
      const active = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 }); // 40% da seção visível para ativar

sections.forEach(function (s) { sectionObserver.observe(s); });


/* 4. ANIMAÇÃO DAS BARRAS DE HABILIDADE
   Anima as barras de progresso (largura 0 → %),
   disparada quando entram na viewport.*/
const skillBars = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Aplica a largura definida no atributo data-width
      entry.target.style.width = entry.target.dataset.width + '%';
      barObserver.unobserve(entry.target); // Anima apenas uma vez
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(function (bar) { barObserver.observe(bar); });


/* 5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   Verifica se todos os campos estão preenchidos
   e se o e-mail tem formato válido antes de
   simular o envio. */
const form    = document.getElementById('contact-form');
const modal   = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

// Função auxiliar: exibe ou esconde mensagem de erro de um campo
function setError(inputId, erroId, mostrar) {
  const input = document.getElementById(inputId);
  const erro  = document.getElementById(erroId);
  if (mostrar) {
    input.classList.add('error');
    erro.classList.add('show');
  } else {
    input.classList.remove('error');
    erro.classList.remove('show');
  }
}

// Função de validação de formato de e-mail com expressão regular
function emailValido(email) {
  // Padrão: texto@texto.texto (ex: usuario@dominio.com)
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

// Evento de submissão do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o recarregamento da página

  // Captura os valores dos campos
  var nome     = document.getElementById('nome').value.trim();
  var email    = document.getElementById('email').value.trim();
  var mensagem = document.getElementById('mensagem').value.trim();

  var valido = true; // Flag: todos os campos válidos?

  // --- Validação do campo Nome ---
  if (nome === '') {
    setError('nome', 'erro-nome', true);
    valido = false;
  } else {
    setError('nome', 'erro-nome', false);
  }

  // --- Validação do campo E-mail ---
  if (email === '' || !emailValido(email)) {
    setError('email', 'erro-email', true);
    valido = false;
  } else {
    setError('email', 'erro-email', false);
  }

  // --- Validação do campo Mensagem ---
  if (mensagem === '') {
    setError('mensagem', 'erro-mensagem', true);
    valido = false;
  } else {
    setError('mensagem', 'erro-mensagem', false);
  }

  // Se todos os campos estão válidos: limpa o form e exibe o modal
  if (valido) {
    form.reset();                    // Limpa todos os campos
    modal.classList.add('show');     // Exibe o modal de confirmação
  }
});

// Fecha o modal ao clicar no botão "Fechar"
modalClose.addEventListener('click', function () {
  modal.classList.remove('show');
});

// Fecha o modal ao clicar fora da caixa (no overlay)
modal.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

// Fecha o modal com a tecla Escape (acessibilidade)
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
  }
});


/* 6. BOTÃO SCROLL TO TOP
   Aparece quando o usuário desce mais de 300px
   e volta ao topo ao clicar. */
const scrollTopBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
