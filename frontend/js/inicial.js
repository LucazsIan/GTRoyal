// Efeito de digitação no título
document.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  };

  typeWriter();

  // Efeito de fade-in para as seções
  const sections = document.querySelectorAll("section");

  const fadeInSections = () => {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.style.opacity = 1;
        section.style.transform = "translateY(0)";
      }
    });
  };

  // Configurações iniciais para a animação
  sections.forEach((section) => {
    if (!section.classList.contains("hero")) {
      section.style.opacity = 0;
      section.style.transform = "translateY(20px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    }
  });

  window.addEventListener("scroll", fadeInSections);
  fadeInSections();
});

// Carrusel functionality CORRIGIDA
let currentPosition = 0;
const cardWidth = 325; // 300px card + 25px gap

function moveCarousel(direction) {
  const track = document.getElementById("carouselTrack");
  const container = track.parentElement;
  const maxPosition = -(track.scrollWidth - container.offsetWidth);

  // CORREÇÃO: inverter a direção do movimento
  currentPosition += direction * cardWidth * 3;

  // Limitar o movimento - CORRIGIDO
  if (currentPosition > 0) {
    currentPosition = 0;
  }
  if (currentPosition < maxPosition) {
    currentPosition = maxPosition;
  }

  track.style.transform = `translateX(${currentPosition}px)`;

  console.log(
    "Posição:",
    currentPosition,
    "Max:",
    maxPosition,
    "Direction:",
    direction
  );
}

// Versão alternativa se ainda estiver invertido:
function moveCarouselAlternative(direction) {
  const track = document.getElementById("carouselTrack");
  const container = track.parentElement;
  const maxPosition = -(track.scrollWidth - container.offsetWidth);

  // MOVIMENTO CORRETO:
  // direction = 1 (next) → move para a esquerda (valores negativos)
  // direction = -1 (prev) → move para a direita (valores positivos)
  currentPosition -= direction * cardWidth * 3;

  // Limitar o movimento
  if (currentPosition > 0) currentPosition = 0;
  if (currentPosition < maxPosition) currentPosition = maxPosition;

  track.style.transform = `translateX(${currentPosition}px)`;
}
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active de todos os botões do mesmo grupo
      const parentGroup = this.closest(".filter-buttons");
      parentGroup.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Adiciona active no botão clicado
      this.classList.add("active");
    });
  });
});
