/**
 * Dona Cenoura — Landing Page
 * Interações: menu mobile, máscara de telefone, validação de formulário,
 * envio para WhatsApp, pré-seleção de produto via CTA dos cards.
 */

(function () {
    'use strict';

    // -------------------------------------------------------------
    // 1. MENU MOBILE
    // -------------------------------------------------------------
    const navToggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.hasAttribute('hidden') ? false : true;
            if (isOpen) {
                mobileMenu.setAttribute('hidden', '');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menu');
            } else {
                mobileMenu.removeAttribute('hidden');
                navToggle.setAttribute('aria-expanded', 'true');
                navToggle.setAttribute('aria-label', 'Fechar menu');
            }
        });

        // Fecha o menu ao clicar em um link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.setAttribute('hidden', '');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // -------------------------------------------------------------
    // 2. PRÉ-SELEÇÃO DO PRODUTO AO CLICAR EM "PEDIR" NO CARD
    // -------------------------------------------------------------
    const productButtons = document.querySelectorAll('[data-product]');
    const saborSelect = document.getElementById('sabor');

    productButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product');
            if (saborSelect && product) {
                saborSelect.value = product;
                // Remove erro caso já estivesse marcado
                const field = saborSelect.closest('.form__field');
                if (field) field.classList.remove('is-invalid');
            }
        });
    });

    // -------------------------------------------------------------
    // 3. MÁSCARA DE TELEFONE BRASILEIRO
    // -------------------------------------------------------------
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '').slice(0, 11);
            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/(\d{0,2})/, '($1');
            }
            e.target.value = value;
        });
    }

    // -------------------------------------------------------------
    // 4. VALIDAÇÃO E ENVIO DO FORMULÁRIO PARA WHATSAPP
    // -------------------------------------------------------------
    const form = document.getElementById('order-form');

    // Mensagens de erro customizadas em PT-BR
    const errorMessages = {
        nome: 'Por favor, informe seu nome.',
        telefone: 'Informe um WhatsApp válido com DDD.',
        sabor: 'Escolha um sabor.',
        quantidade: 'Quantidade deve ser entre 1 e 20.',
        endereco: 'Informe o endereço completo de entrega.'
    };

    function validateField(input) {
        const field = input.closest('.form__field');
        const errorEl = field.querySelector('.form__error');
        const fieldName = input.name;
        let isValid = true;
        let message = '';

        // Required
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            message = errorMessages[fieldName] || 'Campo obrigatório.';
        }

        // Telefone — pelo menos 10 dígitos
        if (isValid && fieldName === 'telefone') {
            const digits = input.value.replace(/\D/g, '');
            if (digits.length < 10) {
                isValid = false;
                message = errorMessages.telefone;
            }
        }

        // Quantidade
        if (isValid && fieldName === 'quantidade') {
            const num = parseInt(input.value, 10);
            if (isNaN(num) || num < 1 || num > 20) {
                isValid = false;
                message = errorMessages.quantidade;
            }
        }

        if (isValid) {
            field.classList.remove('is-invalid');
            if (errorEl) errorEl.textContent = '';
        } else {
            field.classList.add('is-invalid');
            if (errorEl) errorEl.textContent = message;
        }

        return isValid;
    }

    if (form) {
        // Valida ao sair do campo (UX: feedback imediato sem ser intrusivo)
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required')) {
                    validateField(input);
                }
            });

            // Limpa erro ao começar a digitar
            input.addEventListener('input', () => {
                const field = input.closest('.form__field');
                if (field && field.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Valida todos os campos required
            const requiredInputs = form.querySelectorAll('[required]');
            let allValid = true;
            let firstInvalid = null;

            requiredInputs.forEach(input => {
                const valid = validateField(input);
                if (!valid && !firstInvalid) firstInvalid = input;
                if (!valid) allValid = false;
            });

            if (!allValid) {
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Monta a mensagem para o WhatsApp
            const data = new FormData(form);
            const nome = data.get('nome');
            const telefone = data.get('telefone');
            const sabor = data.get('sabor');
            const quantidade = data.get('quantidade');
            const endereco = data.get('endereco');
            const observacoes = data.get('observacoes');

            const linhas = [
                '*Novo pedido — Dona Cenoura* 🥕',
                '',
                `*Nome:* ${nome}`,
                `*WhatsApp:* ${telefone}`,
                `*Sabor:* ${sabor}`,
                `*Quantidade:* ${quantidade}`,
                `*Endereço:* ${endereco}`
            ];

            if (observacoes && observacoes.trim()) {
                linhas.push(`*Observações:* ${observacoes}`);
            }

            const message = encodeURIComponent(linhas.join('\n'));
            // ⚠️ Substitua pelo número real do estabelecimento (formato: 55 + DDD + número)
            const phoneNumber = '5511999999999';
            const url = `https://wa.me/${phoneNumber}?text=${message}`;

            window.open(url, '_blank', 'noopener');
        });
    }

    // -------------------------------------------------------------
    // 5. HEADER COM SOMBRA AO ROLAR
    // -------------------------------------------------------------
    const header = document.querySelector('.header');
    if (header) {
        let lastY = 0;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y > 8) {
                header.style.boxShadow = '0 2px 12px rgba(42, 31, 26, 0.06)';
            } else {
                header.style.boxShadow = 'none';
            }
            lastY = y;
        }, { passive: true });
    }

})();
