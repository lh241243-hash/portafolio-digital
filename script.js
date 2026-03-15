// ========================================
// PORTAFOLIO DIGITAL - VERSIÓN LOCAL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando portafolio...');
    initParticles();
    initTabs();
    initModal();
});

// ========================================
// 1. PARTÍCULAS DE FONDO
// ========================================
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40 },
                color: { value: ['#C295C2', '#9860A4', '#7B749E'] },
                shape: { type: 'circle' },
                opacity: { value: 0.4, random: true },
                size: { value: 6, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#C295C2',
                    opacity: 0.2
                },
                move: { enable: true, speed: 1 }
            },
            interactivity: {
                events: {
                    onhover: { enable: true, mode: 'grab' }
                }
            }
        });
        console.log('✅ Partículas listas');
    }
}

// ========================================
// 2. SISTEMA DE PESTAÑAS
// ========================================
function initTabs() {
    const buttons = document.querySelectorAll('.tab-button');
    const panes = document.querySelectorAll('.tab-pane');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            buttons.forEach(b => b.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ========================================
// 3. MODAL PARA PREVIEWS
// ========================================
let modal, modalBody, closeBtn;

function initModal() {
    modal = document.getElementById('previewModal');
    modalBody = document.getElementById('modalBody');
    closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !modalBody || !closeBtn) {
        console.error('❌ Error: No se encontró el modal');
        return;
    }
    
    closeBtn.addEventListener('click', cerrarModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') cerrarModal();
    });
    
    console.log('✅ Modal listo');
}

function cerrarModal() {
    modal.style.display = 'none';
    modalBody.innerHTML = '';
}

// Función global para abrir previews
window.abrirPreview = function(tipo, contenido) {
    console.log(`📂 Abriendo: ${tipo} - ${contenido}`);
    
    if (!modal) modal = document.getElementById('previewModal');
    if (!modalBody) modalBody = document.getElementById('modalBody');
    
    modal.style.display = 'flex';
    modalBody.innerHTML = '';
    
    if (tipo === 'video-local') {
        const video = document.createElement('video');
        video.src = contenido;
        video.controls = true;
        video.autoplay = true;
        video.style.width = '100%';
        video.style.maxHeight = '70vh';
        video.style.borderRadius = '20px';
        modalBody.appendChild(video);
    }
    else if (tipo === 'genially') {
        const iframe = document.createElement('iframe');
        iframe.src = contenido;
        iframe.style.width = '100%';
        iframe.style.height = '70vh';
        iframe.style.border = 'none';
        iframe.allowFullscreen = true;
        modalBody.appendChild(iframe);
    }
    else if (tipo === 'imagen') {
        const img = document.createElement('img');
        img.src = contenido;
        img.alt = 'Preview';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '70vh';
        img.style.borderRadius = '20px';
        img.style.border = '4px solid var(--rosa-lila)';
        
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/800x600/483F6B/C9CBE2?text=Imagen+no+disponible';
        };
        
        modalBody.appendChild(img);
    }
};