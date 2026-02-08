/* ================================
   FORM HANDLER - Contact & Devis
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    const devisForm = document.getElementById('devisForm');
    const successMessage = document.getElementById('successMessage');

    if (devisForm) {
        devisForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const formData = {
                nom: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value,
                entreprise: document.getElementById('entreprise').value || 'Non spécifiée',
                service: document.getElementById('service').value,
                poids: document.getElementById('poids').value || 'Non spécifié',
                dimensions: document.getElementById('dimensions').value || 'Non spécifiées',
                destination: document.getElementById('destination').value,
                description: document.getElementById('description').value,
                urgence: document.getElementById('urgence').value || 'Pas d\'urgence',
                budget: document.getElementById('budget').value || 'Non spécifié',
                regulier: document.getElementById('regulier').value || 'Envoi unique',
                message: document.getElementById('message').value || 'Aucun message additionnel',
                date: new Date().toLocaleString('fr-FR'),
                source: 'Website Contact Form'
            };

            // Log form data (for demo purposes)
            console.log('Formulaire soumis:', formData);

            // Simulate sending to backend (replace with real API call)
            await submitDevisForm(formData);

            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }

            // Reset form
            devisForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        });
    }
});

/**
 * Submit devis form data
 * @param {Object} formData - Formulaire data
 */
async function submitDevisForm(formData) {
    try {
        // Option 1: Send to FormSubmit.co (free service, no backend needed)
        // This sends to an email without needing a backend

        // For now, we'll just log and show success
        // In production, replace with your backend endpoint:
        // const response = await fetch('/api/devis', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });

        // Demo: Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Devis envoyé avec succès:', formData);
                resolve({ success: true });
            }, 500);
        });

    } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Format phone number
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned;
}

/**
 * Validate email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * WhatsApp message generator
 */
function generateWhatsAppMessage() {
    const nom = document.getElementById('nom')?.value || 'Client';
    const service = document.getElementById('service')?.value || 'un service';
    const message = `Bonjour ANAPHIE BUSINESS, je suis ${nom} et je suis intéressé par ${service}. Pouvez-vous me contacter ?`;

    const phoneNumber = '243811797202'; // RDC number
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Add WhatsApp quick contact button (optional enhancement)
 */
function addWhatsAppQuickButton() {
    const whatsappBtn = document.createElement('div');
    whatsappBtn.className = 'whatsapp-quick-btn';
    whatsappBtn.innerHTML = `
        <a href="https://wa.me/243811797202?text=Bonjour%20ANAPHIE%20BUSINESS%2C%20j%27ai%20une%20question%20sur%20vos%20services" 
           target="_blank" 
           title="Chat WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;

    whatsappBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        z-index: 98;
    `;

    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-quick-btn a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #25d366, #128c7e);
            color: white;
            border-radius: 50%;
            font-size: 1.5rem;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
        }
        
        .whatsapp-quick-btn a:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.6);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(whatsappBtn);
}

// Initialize WhatsApp button on load
window.addEventListener('load', () => {
    // Uncomment to enable WhatsApp button
    // addWhatsAppQuickButton();
});

/**
 * Service selection changed
 */
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', (e) => {
        const selectedService = e.target.value;
        const dimensionsField = document.getElementById('dimensions');
        const poidsField = document.getElementById('poids');

        // Customize fields based on service
        if (selectedService === 'fret-aerien') {
            poidsField?.removeAttribute('required');
            dimensionsField?.removeAttribute('required');
        } else if (selectedService === 'fret-maritime') {
            poidsField?.setAttribute('required', 'required');
        } else if (selectedService === 'import-vehicules') {
            dimensionsField?.parentElement.style.display = 'none';
            poidsField?.parentElement.style.display = 'none';
        }
    });
}

/**
 * Form validation on input
 */
const phoneInput = document.getElementById('telephone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = formatPhoneNumber(e.target.value);
    });
}

const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', (e) => {
        if (e.target.value && !validateEmail(e.target.value)) {
            e.target.classList.add('is-invalid');
            e.target.classList.remove('is-valid');
        } else if (e.target.value) {
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');
        }
    });
}

/**
 * Progressive form enhancement
 */
function enhanceFormFields() {
    // Add icons and placeholders
    const fields = {
        nom: '<i class="fas fa-user"></i>',
        email: '<i class="fas fa-envelope"></i>',
        telephone: '<i class="fas fa-phone"></i>',
        entreprise: '<i class="fas fa-building"></i>'
    };

    // This would require restructuring HTML, so we skip for now
}

console.log('Form handler initialized');
