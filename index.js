// Telegram Web App Initialization
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.expand();
}

// Translations
const translations = {
    ru: {
        header_get_osago: "Получить ОСАГО",
        hero_desc: "Простое и понятное страхование.<br>Оформите ОСАГО за несколько минут.",
        hero_btn: "Начать онлайн &rarr;",
        badge_soon: "Скоро",
        products_title: "Другие страховые продукты",
        products_desc: "Мы создаем полноценную страховую платформу. Эти продукты появятся в ближайшее время.",
        prod_kasko: "КАСКО",
        prod_kasko_desc: "Полное покрытие автомобиля",
        prod_health: "Здоровье",
        prod_health_desc: "Медицинское страхование",
        prod_travel: "Путешествия",
        prod_travel_desc: "Защита в поездках",
        prod_property: "Имущество",
        prod_property_desc: "Дом и активы",
        badge_available: "Доступно сейчас",
        osago_title: "ОСАГО — Обязательное автострахование",
        osago_desc: "Оформите полис онлайн. Быстро, понятно и без лишних хлопот.",
        feat_price: "Регулируемая цена",
        feat_price_desc: "Тарифы установлены законом",
        feat_fast: "Быстрое оформление",
        feat_fast_desc: "Завершите за 10 минут",
        feat_digital: "Цифровой полис",
        feat_digital_desc: "Получите мгновенно на телефон",
        osago_btn: "Оформить ОСАГО &rarr;",
        why_title: "Почему EasySugurta?",
        why_desc: "Современная платформа, которая делает страхование простым и доступным.",
        why_aggregator: "Агрегатор страхования",
        why_aggregator_desc: "Сравнивайте и выбирайте из нескольких надежных страховых компаний в одном месте.",
        why_simple: "Быстро и просто",
        why_simple_desc: "Без бумаг и очередей. Застрахуйтесь за минуты, полностью онлайн.",
        why_secure: "Безопасно и надёжно",
        why_secure_desc: "Ваши данные защищены. Полисы выдаются напрямую лицензированными страховщиками.",
        choice_title: "Выберите способ начала",
        choice_desc: "Используйте наш сайт или откройте прямо в Telegram — одинаково быстрый опыт.",
        choice_site: "Сайт",
        choice_site_desc: "Заполните заявку прямо здесь в браузере",
        choice_tg: "Telegram",
        choice_tg_desc: "Используйте наше Mini App в Telegram для быстрого доступа",
        choice_tg_btn: "Открыть в Telegram",
        copyright: "Все права защищены.",

        // Wizard
        wizard_title: "ОФОРМИТЬ ОСАГО ОНЛАЙН",
        step_1: "Данные авто",
        step_2: "Владелец",
        step_3: "Заявитель",
        step_4: "Период",
        step_5: "Водители",
        step_6: "Подтверждение",
        step_7: "Оплата",
        step_1_title: "Данные авто",
        label_car_number: "Номер машины",
        label_tech_passport: "Серия и номер тех паспорта",
        terms_agree: "Нажимая продолжить Вы соглашаетесь с <a href='#'>Офертой</a> и даете согласие на обработку своих персональных данных",
        btn_continue: "Продолжить &rarr;"
    },
    uz: {
        header_get_osago: "OSAGO olish",
        hero_desc: "Oddiy va tushunarli sug'urta.<br>OSAGO ni bir necha daqiqada rasmiylashtiring.",
        hero_btn: "Onlayn boshlash &rarr;",
        badge_soon: "Tez orada",
        products_title: "Boshqa sug'urta mahsulotlari",
        products_desc: "Biz to'liq sug'urta platformasini yaratmoqdamiz. Ushbu mahsulotlar yaqin orada paydo bo'ladi.",
        prod_kasko: "KASKO",
        prod_kasko_desc: "Avtomobilni to'liq qoplash",
        prod_health: "Salomatlik",
        prod_health_desc: "Tibbiy sug'urta",
        prod_travel: "Sayohat",
        prod_travel_desc: "Sayohatda himoya",
        prod_property: "Mulk",
        prod_property_desc: "Uy va aktivlar",
        badge_available: "Hozir mavjud",
        osago_title: "OSAGO — Majburiy avtosug'urta",
        osago_desc: "Polisni onlayn rasmiylashtiring. Tez, tushunarli va ortiqcha tashvishlarsiz.",
        feat_price: "Tartibga solinadigan narx",
        feat_price_desc: "Tariflar qonun bilan belgilangan",
        feat_fast: "Tez rasmiylashtirish",
        feat_fast_desc: "10 daqiqada yakunlang",
        feat_digital: "Raqamli polis",
        feat_digital_desc: "Telefoningizga darhol oling",
        osago_btn: "OSAGO rasmiylashtirish &rarr;",
        why_title: "Nima uchun EasySugurta?",
        why_desc: "Sug'urtani oddiy va hamyonbop qiladigan zamonaviy platforma.",
        why_aggregator: "Sug'urta agregatori",
        why_aggregator_desc: "Bir joyda bir nechta ishonchli sug'urta kompaniyalarini solishtiring va tanlang.",
        why_simple: "Tez va oddiy",
        why_simple_desc: "Qog'oz va navbatlarsiz. Daqiqalar ichida, butunlay onlayn sug'urtalaning.",
        why_secure: "Xavfsiz va ishonchli",
        why_secure_desc: "Ma'lumotlaringiz himoyalangan. Polislar to'g'ridan-to'g'ri litsenziyalangan sug'urtachilar tomonidan beriladi.",
        choice_title: "Boshlash usulini tanlang",
        choice_desc: "Saytimizdan foydalaning yoki to'g'ridan-to'g'ri Telegram da oching — bir xil tezkor tajriba.",
        choice_site: "Sayt",
        choice_site_desc: "Arizani shu yerda brauzerda to'ldiring",
        choice_tg: "Telegram",
        choice_tg_desc: "Tez kirish uchun Telegram dagi Mini App imizdan foydalaning",
        choice_tg_btn: "Telegram da ochish",
        copyright: "Barcha huquqlar himoyalangan.",

        // Wizard
        wizard_title: "OSAGO NI ONLAYN RASMIYLASHTIRISH",
        step_1: "Avto ma'lumotlari",
        step_2: "Egasi",
        step_3: "Ariza beruvchi",
        step_4: "Davr",
        step_5: "Haydovchilar",
        step_6: "Tasdiqlash",
        step_7: "To'lov",
        step_1_title: "Avto ma'lumotlari",
        label_car_number: "Mashina raqami",
        label_tech_passport: "Texnik pasport seriyasi va raqami",
        terms_agree: "Davom etish tugmasini bosish orqali siz <a href='#'>Oferta</a> ga rozilik bildirasiz va shaxsiy ma'lumotlaringizni qayta ishlashga ruxsat berasiz",
        btn_continue: "Davom etish &rarr;"
    },
    en: {
        header_get_osago: "Get OSAGO",
        hero_desc: "Simple and clear insurance.<br>Get OSAGO in a few minutes.",
        hero_btn: "Start Online &rarr;",
        badge_soon: "Coming Soon",
        products_title: "Other Insurance Products",
        products_desc: "We are building a complete insurance platform. These products will appear soon.",
        prod_kasko: "KASKO",
        prod_kasko_desc: "Full car coverage",
        prod_health: "Health",
        prod_health_desc: "Medical insurance",
        prod_travel: "Travel",
        prod_travel_desc: "Protection while traveling",
        prod_property: "Property",
        prod_property_desc: "Home and assets",
        badge_available: "Available Now",
        osago_title: "OSAGO — Mandatory Auto Insurance",
        osago_desc: "Get your policy online. Fast, clear, and hassle-free.",
        feat_price: "Regulated Price",
        feat_price_desc: "Rates are set by law",
        feat_fast: "Fast Process",
        feat_fast_desc: "Complete in 10 minutes",
        feat_digital: "Digital Policy",
        feat_digital_desc: "Get instantly on your phone",
        osago_btn: "Get OSAGO &rarr;",
        why_title: "Why EasySugurta?",
        why_desc: "A modern platform making insurance simple and accessible.",
        why_aggregator: "Insurance Aggregator",
        why_aggregator_desc: "Compare and choose from multiple trusted insurance companies in one place.",
        why_simple: "Fast and Simple",
        why_simple_desc: "No paper or lines. Get insured in minutes, completely online.",
        why_secure: "Safe and Reliable",
        why_secure_desc: "Your data is secure. Policies are issued directly by licensed insurers.",
        choice_title: "Choose How to Start",
        choice_desc: "Use our website or open directly in Telegram — equally fast experience.",
        choice_site: "Website",
        choice_site_desc: "Fill the application right here in the browser",
        choice_tg: "Telegram",
        choice_tg_desc: "Use our Mini App in Telegram for quick access",
        choice_tg_btn: "Open in Telegram",
        copyright: "All rights reserved.",

        // Wizard
        wizard_title: "GET OSAGO ONLINE",
        step_1: "Car Data",
        step_2: "Owner",
        step_3: "Applicant",
        step_4: "Period",
        step_5: "Drivers",
        step_6: "Confirmation",
        step_7: "Payment",
        step_1_title: "Car Data",
        label_car_number: "Car Number",
        label_tech_passport: "Tech Passport Series & Number",
        terms_agree: "By clicking continue, you agree to the <a href='#'>Offer</a> and consent to the processing of your personal data",
        btn_continue: "Continue &rarr;"
    }
};

let currentLang = localStorage.getItem('es_lang') || 'ru';

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('es_lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key]; // innerHTML to support <br>
        }
    });

    // Update active class
    document.querySelectorAll('.lang').forEach(el => {
        el.classList.remove('active');
        if (el.textContent.toLowerCase() === lang) {
            el.classList.add('active');
        }
    });
}

// Initial set
setLanguage(currentLang);

// Wizard Logic
let currentStep = 1;
const totalSteps = 7;

function openWizard() {
    document.getElementById('main-landing').style.display = 'none';
    document.getElementById('wizard-container').style.display = 'block';
    window.scrollTo(0, 0);
    resetWizard();
}

function closeWizard() {
    document.getElementById('main-landing').style.display = 'block';
    document.getElementById('wizard-container').style.display = 'none';
}

function resetWizard() {
    currentStep = 1;
    updateWizardUI();
    // Reset form fields if needed, or simple reset
    document.getElementById('agree_terms').checked = false;
}

function updateWizardUI() {
    // 1. Show/Hide Step Content
    for (let i = 1; i <= totalSteps; i++) {
        const stepContent = document.getElementById(`step_${i}_content`);
        if (stepContent) {
            stepContent.style.display = (i === currentStep) ? 'block' : 'none';
        }
    }

    // 2. Update Stepper
    const steps = document.querySelectorAll('.stepper-item');
    steps.forEach((stepEl, index) => {
        const stepNum = index + 1;
        stepEl.classList.remove('active', 'completed');

        if (stepNum < currentStep) {
            stepEl.classList.add('completed');
        } else if (stepNum === currentStep) {
            stepEl.classList.add('active');
        }
    });

    // 3. Update Button Text (optional but good UX)
    const btn = document.querySelector('.wizard-footer .btn-primary');
    if (btn) {
        if (currentStep === totalSteps) {
            // Pay / Finish
            btn.innerHTML = 'Оплатить 56,000 UZS';
        } else {
            // Continue
            // checking translation key, but simple overwrite is safer for logic
            const continueText = translations[currentLang]?.btn_continue || "Продолжить &rarr;";
            btn.innerHTML = continueText;
        }
    }
}

function submitWizard() {
    // Validation Logic per step
    if (currentStep === 1) {
        const carNumber = document.getElementById('car_number').value;
        const techSeries = document.getElementById('tech_series').value;
        const techNumber = document.getElementById('tech_number').value;
        const agree = document.getElementById('agree_terms').checked;

        if (!agree) {
            alert("Пожалуйста, согласитесь с условиями оферты.");
            return;
        }
        if (!carNumber || !techSeries || !techNumber) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
    }

    // If it's the last step, submit
    if (currentStep === totalSteps) {
        const data = {
            car: document.getElementById('car_number').value,
            step: 'Final Payment'
        };

        if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
            tg.sendData(JSON.stringify(data));
        } else {
            alert(`Payment Simulation:\nProcessing payment...`);
            closeWizard();
        }
        return;
    }

    // Go to next step
    currentStep++;
    updateWizardUI();
}

function toggleApplicantFields() {
    const isOwner = document.getElementById('applicant_is_owner').checked;
    const fields = document.getElementById('applicant_fields');
    if (fields) {
        fields.style.display = isOwner ? 'none' : 'block';
    }
}
