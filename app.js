/* ═══════════════════════════════════════════════════════════════
   P CARE · ADVANCED AI PET MEDICAL SYSTEM (CORE JAVASCRIPT)
   Production-grade demo engine, state management & reactive UI
═══════════════════════════════════════════════════════════════ */

/* ─── Static Data & Presets ─── */
const BREEDS = {
  dog: [
    'Shiba Inu', 'Golden Retriever', 'Labrador Retriever', 'French Bulldog', 'Bulldog',
    'German Shepherd', 'Poodle (Toy)', 'Poodle (Standard)', 'Husky', 'Chihuahua',
    'Beagle', 'Rottweiler', 'Dachshund', 'Shih Tzu', 'Maltese', 'Border Collie',
    'Pomeranian', 'Yorkshire Terrier', 'Doberman', 'Corgi (Pembroke)', 'Samoyed'
  ],
  cat: [
    'Scottish Fold', 'British Shorthair', 'Persian', 'Siamese', 'Maine Coon',
    'Ragdoll', 'Bengal', 'Russian Blue', 'Sphynx', 'American Shorthair',
    'Norwegian Forest', 'Burmese', 'Abyssinian', 'Devon Rex'
  ]
};

const PLAN_INFO = [
  { name: 'Essential', short: 'Free', monthly: 0, yearly: 0, tag: 'Free' },
  { name: 'Care Plus', short: 'Starter', monthly: 5, yearly: 4, tag: 'Starter' },
  { name: 'Protection', short: 'Pro', monthly: 10, yearly: 8, tag: 'Most Popular' },
  { name: 'Ultimate Concierge', short: 'VET VIP', monthly: 50, yearly: 40, tag: 'VIP' }
];

const DIAGNOSES = {
  Skin: {
    disease: 'Fungal Infection (Ringworm)',
    th: 'การติดเชื้อราที่ผิวหนัง (กลาก)',
    confidence: 94,
    severity: 'Medium',
    firstAid: [
      'Clean affected area gently with sterile saline solution twice daily.',
      'Apply protective collar (cone) to prevent pet scratching or licking the lesion.',
      'Disinfect bedding and grooming tools to avoid spread.'
    ],
    meds: [
      { name: 'Miconazole Cream 2%', use: 'Apply morning & evening (14 days)', price: 350, tag: 'Antifungal', icon: '🧴' },
      { name: 'Ketoconazole Shampoo 200ml', use: 'Bathe twice a week, leave 10 min', price: 480, tag: 'Medicated', icon: '🧴' }
    ]
  },
  Eyes: {
    disease: 'Mild Conjunctivitis (Pink Eye)',
    th: 'เยื่อบุตาอักเสบระยะเริ่มต้น',
    confidence: 91,
    severity: 'Low',
    firstAid: [
      'Gently wipe away eye discharge with cotton pad soaked in warm saline.',
      'Avoid bright direct sunlight and dusty environments.',
      'Monitor for squinting or cornea cloudiness.'
    ],
    meds: [
      { name: 'Gentamicin Eye Drops 5ml', use: '1-2 drops 3 times daily (7 days)', price: 280, tag: 'Antibacterial', icon: '💧' },
      { name: 'Tear Lubricant Eye Gel', use: 'Apply at night to prevent dryness', price: 320, tag: 'Soothing', icon: '💧' }
    ]
  },
  Ear: {
    disease: 'Otitis Externa (Ear Canal Yeast)',
    th: 'ช่องหูอักเสบจากการสะสมของยีสต์',
    confidence: 89,
    severity: 'Medium',
    firstAid: [
      'Do not use cotton swabs deep into the ear canal.',
      'Gently wipe the outer ear flap with sterile antiseptic ear cleanser.',
      'Keep ears dry after baths or swimming.'
    ],
    meds: [
      { name: 'Otoclean Ear Cleanser 100ml', use: 'Clean ear twice weekly', price: 390, tag: 'Antiseptic', icon: '🧴' },
      { name: 'Posatex Otic Drops', use: 'Once daily for 7 days', price: 540, tag: 'Triple Action', icon: '💧' }
    ]
  },
  Dental: {
    disease: 'Grade 1 Gingivitis & Plaque',
    th: 'เหงือกอักเสบระยะแรกและคราบหินปูน',
    confidence: 92,
    severity: 'Low',
    firstAid: [
      'Introduce pet-safe enzymatic toothpaste gradually.',
      'Provide dental chews or toys to mechanically reduce plaque.',
      'Avoid hard bones that can fracture teeth.'
    ],
    meds: [
      { name: 'Enzymatic Dental Gel 70g', use: 'Brush or apply to gumline daily', price: 320, tag: 'Enzymatic', icon: '🪥' },
      { name: 'ProDen PlaqueOff Powder', use: '1 scoop mixed with daily food', price: 650, tag: 'Oral Health', icon: '✨' }
    ]
  },
  Motion: {
    disease: 'Mild Patellar Tendon Strain',
    th: 'เส้นเอ็นสะบ้าอักเสบเล็กน้อย',
    confidence: 86,
    severity: 'Medium',
    firstAid: [
      'Restrict running and jumping on stairs or furniture for 5-7 days.',
      'Provide non-slip mats on tile or hardwood floors.',
      'Apply cool compress to knee joint for 5 mins after walking.'
    ],
    meds: [
      { name: 'Glucosamine & Chondroitin 60 tabs', use: '1 tablet daily with meal', price: 580, tag: 'Joint Support', icon: '💊' },
      { name: 'Omega-3 EPA/DHA Fish Oil 100ml', use: 'Add 2ml to food daily', price: 420, tag: 'Anti-inflammatory', icon: '🐟' }
    ]
  }
};

const BOT_RESPONSES = {
  'เกา': '🐾 **อาการเกาตัวบ่อย (Pruritus)** อาจเกิดจาก:\n• การติดเชื้อยีสต์หรือเชื้อราบนผิวหนัง\n• แพ้น้ำลายหมัดหรือปรสิตภายนอก\n• การแพ้อาหาร (Food Allergy)\n\n💡 **การดูแลเบื้องต้น:**\n1. ตรวจสอบขนและผิวหนังว่ามีตุ่มแดงหรือสะเก็ดหรือไม่\n2. ลองใช้กล้อง **AI Scan** โหมด Skin เพื่อตรวจจับรอยโรค\n3. หลีกเลี่ยงการอาบน้ำอุ่นจัดเพราะจะทำให้ผิวแห้งคันมากขึ้นครับ',
  'ไม่ยอมกิน': '🍽️ **น้องไม่ยอมทานอาหาร (Anorexia):**\n• หากเพิ่งเริ่มเป็น 1 วัน: ลองอุ่นอาหารให้หอมขึ้น หรือผสมน้ำซุปไก่ไม่ปรุงรส\n• ตรวจดูเหงือกและฟันว่ามีแผลหรือปวดฟันหรือไม่\n\n⚠️ **สัญญาณเตือน:** หากมีอาการซึม อาเจียน หรือไม่กินน้ำเกิน 24 ชม. ควรพาพบสัตวแพทย์ทันทีครับ',
  'วัคซีน': '💉 **ตารางวัคซีนสำคัญ:**\n• **สุนัข:** วัคซีนรวม 5-6 โรค (กระตุ้นปีละ 1 ครั้ง) + พิษสุนัขบ้า\n• **แมว:** วัคซีนรวมไข้หัด-หวัดแมว + ลิวคีเมีย + พิษสุนัขบ้า\n\n📌 สามารถกดดูประวัติและวันนัดฉีดวัคซีนได้ที่แท็บ **Health** ได้เลยครับ',
  'ท้องเสีย': '🏥 **สัตว์เลี้ยงมีอาการท้องเสีย (Diarrhea):**\n• งดอาหารเม็ด 8-12 ชม. เพื่อให้ลำไส้ได้พัก (แต่ต้องมีน้ำสะอาดให้ดื่มตลอด)\n• ให้อาหารอ่อนย่อยง่าย เช่น ข้าวต้มผสมอกไก่ต้มไม่ใส่เกลือ\n\n⚠️ หากถ่ายเป็นมูกเลือด หรืออาเจียนร่วมด้วย ให้รีบพบสัตวแพทย์ทันทีครับ'
};

/* ─── Reactive Application State ─── */
let currentUser = {
  name: 'Suchada PetLover',
  email: 'suchada@petcare.ai',
  phone: '081 234 5678',
  plan: 2, // Protection Pro by default
  avatar: ''
};

let myPets = [
  {
    name: 'Mochi',
    type: 'dog',
    breed: 'Shiba Inu',
    age: 3,
    weight: 7.2,
    gender: 'Male',
    emoji: '🐶',
    photoSrc: 'assets/mochi.jpg',
    score: 88,
    status: 'Healthy · Up to date',
    statusClass: 'green'
  },
  {
    name: 'Luna',
    type: 'cat',
    breed: 'Scottish Fold',
    age: 2,
    weight: 3.8,
    gender: 'Female',
    emoji: '🐱',
    photoSrc: 'assets/luna.jpg',
    score: 76,
    status: 'Skin · Monitor (Ringworm)',
    statusClass: 'orange'
  }
];

let activePetIndex = 0;
let selectedPlanIndex = 2;
let billingCycle = 'monthly'; // 'monthly' | 'yearly'
let plansSourceScreen = 'screen-home';
let currentScanPart = 'Skin';
let scanInterval = null;
let scanTimeout = null;
let selectedPaymentMethodKey = 'promptpay';
let discountApplied = false;
let callTimerInterval = null;
let callSeconds = 0;

/* ─── Initialization ─── */
window.addEventListener('DOMContentLoaded', () => {
  setupShellAndOverlays();
  buildDesktopDemoPanels();
  populateBreedList('dog');
  updateGreeting();
  initSplash();
  renderAllViews();
});

function setupShellAndOverlays() {
  const shell = document.createElement('div');
  shell.id = 'app-shell';
  document.body.appendChild(shell);

  // Move screens and shell overlays into phone shell container
  document.querySelectorAll('.screen, .bottom-nav, .shell-item').forEach(el => shell.appendChild(el));
}

function updateGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning ☀️' : h < 18 ? 'Good afternoon 🌤️' : 'Good evening 🌙';
  const el = document.getElementById('home-greeting');
  if (el) el.textContent = g;
}

/* ─── Desktop Demo Panels ─── */
function buildDesktopDemoPanels() {
  const left = document.getElementById('demo-left');
  const right = document.getElementById('demo-right');

  if (left) {
    left.innerHTML = `
      <div class="demo-title">
        <span style="font-size:20px">🐾</span>
        <span>P Care Demo Suite</span>
      </div>
      <p class="demo-desc">Interactive high-fidelity prototype testing environment. Switch screens anytime.</p>
      
      <div class="demo-section-label">Screen Navigation</div>
      <div class="demo-nav-list">
        <button class="demo-nav-btn" onclick="goToScreen('screen-splash')"><span>✨</span> Splash Intro</button>
        <button class="demo-nav-btn" onclick="goToScreen('screen-auth')"><span>🔐</span> Auth / Login</button>
        <button class="demo-nav-btn" onclick="goToPlans('screen-home')"><span>👑</span> Choose Plans (Fixed)</button>
        <button class="demo-nav-btn" onclick="goToScreen('screen-payment')"><span>💳</span> Checkout &amp; Pay</button>
        <button class="demo-nav-btn active" onclick="goToScreen('screen-home')"><span>🏠</span> Home Dashboard</button>
        <button class="demo-nav-btn" onclick="goToScreen('screen-profile')"><span>➕</span> Add / Edit Pet</button>
        <button class="demo-nav-btn" onclick="goToScreen('screen-scan')"><span>🔬</span> AI Scanner</button>
        <button class="demo-nav-btn" onclick="showScanResult('Skin')"><span>📋</span> Diagnosis Report</button>
        <button class="demo-nav-btn" onclick="goToScreen('screen-health')"><span>📊</span> Health History</button>
        <button class="demo-nav-btn" onclick="goToScreen('screen-chat')"><span>🤖</span> AI Chatbot &amp; Vet</button>
        <button class="demo-nav-btn" onclick="goToScreen('screen-owner')"><span>👤</span> Owner Profile</button>
      </div>

      <div class="demo-section-label" style="margin-top:20px">Quick Demo Actions</div>
      <button class="demo-quick-action-btn" onclick="demoLogin()">
        <span>🚀</span> Load VIP Demo (Mochi &amp; Luna)
      </button>
      <button class="demo-quick-action-btn" style="background:#475569;margin-top:6px;" onclick="teleVet()">
        <span>🩺</span> Simulate Tele-Vet Call
      </button>
    `;
  }

  if (right) {
    right.innerHTML = `
      <div class="demo-title">
        <span style="font-size:20px">💡</span>
        <span>Key Capabilities</span>
      </div>
      <p class="demo-desc">Engineered for seamless pet healthcare &amp; veterinary workflows.</p>

      <div class="demo-feature-card">
        <h4><span>🔬</span> Multi-Mode AI Vision</h4>
        <p>Real-time visual pathology analysis for Skin, Eyes, Ear, Dental, and Gait / Motion with evidence heatmaps.</p>
      </div>

      <div class="demo-feature-card">
        <h4><span>👑</span> Fixed Plan &amp; Billing</h4>
        <p>Monthly &amp; Annual cycle toggle (Save 20%), Active Plan tracking, seamless back navigation, and zero data loss.</p>
      </div>

      <div class="demo-feature-card">
        <h4><span>💳</span> Localized Checkout</h4>
        <p>Interactive PromptPay QR with live timer, Credit Card formatting, coupon code engine, and instant confirmation.</p>
      </div>

      <div class="demo-feature-card">
        <h4><span>🩺</span> 24/7 Tele-Vet Calling</h4>
        <p>Integrated HD video &amp; voice consultation with licensed veterinarian Dr. Suchada directly inside the app.</p>
      </div>

      <div class="demo-feature-card">
        <h4><span>📍</span> Geo Vet &amp; Drug Delivery</h4>
        <p>Nearby 24h clinics map with live distance, operating hours, and 1-tap direct prescription ordering.</p>
      </div>
    `;
  }
}

/* ─── Navigation Engine ─── */
const NAV_HIDDEN_SCREENS = new Set(['screen-splash', 'screen-scan', 'screen-plans', 'screen-auth', 'screen-payment']);

function goToScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');

  const nav = document.getElementById('bottom-nav');
  if (nav) {
    if (NAV_HIDDEN_SCREENS.has(screenId)) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
  }

  // Update tab highlights
  const tabMap = {
    'screen-home': 'tab-home',
    'screen-health': 'tab-health',
    'screen-scan': 'tab-scan',
    'screen-chat': 'tab-chat',
    'screen-owner': 'tab-profile',
    'screen-result': 'tab-health',
    'screen-profile': 'tab-home'
  };
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const activeTab = tabMap[screenId];
  if (activeTab) document.getElementById(activeTab)?.classList.add('active');

  // Trigger screen-specific renders
  if (screenId === 'screen-home') renderHome();
  if (screenId === 'screen-health') renderHealth();
  if (screenId === 'screen-owner') renderOwner();
  if (screenId === 'screen-plans') updatePlansUI();
  if (screenId === 'screen-payment') renderPay();
  if (screenId === 'screen-chat') initChat();
  if (screenId === 'screen-scan') setupScanPetPreview();
}

function navTo(tab) {
  const map = {
    home: 'screen-home',
    health: 'screen-health',
    scan: 'screen-scan',
    chat: 'screen-chat',
    owner: 'screen-owner',
    profile: 'screen-owner'
  };
  goToScreen(map[tab]);
}

/* ─── Splash Screen ─── */
function initSplash() {
  const splash = document.getElementById('screen-splash');
  if (!splash) return;

  // Clicking splash immediately advances
  splash.onclick = () => goToScreen('screen-auth');

  setTimeout(() => {
    // If still on splash, move to auth
    if (splash.classList.contains('active')) {
      goToScreen('screen-auth');
    }
  }, 2300);
}

/* ─── Auth Module ─── */
function switchAuthTab(tab) {
  document.getElementById('auth-tab-login')?.classList.toggle('active', tab === 'login');
  document.getElementById('auth-tab-register')?.classList.toggle('active', tab === 'register');
  const fLogin = document.getElementById('auth-form-login');
  const fReg = document.getElementById('auth-form-register');
  if (fLogin) fLogin.style.display = tab === 'login' ? 'flex' : 'none';
  if (fReg) fReg.style.display = tab === 'register' ? 'flex' : 'none';
}

function pwStrength(val) {
  const fill = document.getElementById('pw-meter-fill');
  if (!fill) return;
  let score = 0;
  if (val.length >= 6) score += 33;
  if (val.length >= 8 && /[A-Z]/.test(val)) score += 34;
  if (/[0-9!@#$%^&*]/.test(val)) score += 33;

  fill.style.width = score + '%';
  fill.style.backgroundColor = score < 40 ? '#ef4444' : score < 70 ? '#f59e0b' : '#22c55e';
}

function togglePw(id, btn) {
  const input = document.getElementById(id);
  if (!input) return;
  const isPw = input.type === 'password';
  input.type = isPw ? 'text' : 'password';
  btn.textContent = isPw ? '🙈' : '👁';
}

function doLogin() {
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-pass');
  const errEmail = document.getElementById('err-login-email');
  const errPass = document.getElementById('err-login-pass');

  let valid = true;
  if (!emailInput.value.includes('@')) {
    errEmail.textContent = 'Please enter a valid email address';
    errEmail.classList.add('show');
    valid = false;
  } else {
    errEmail.classList.remove('show');
  }

  if (passInput.value.length < 4) {
    errPass.textContent = 'Please enter your password';
    errPass.classList.add('show');
    valid = false;
  } else {
    errPass.classList.remove('show');
  }

  if (!valid) return;

  currentUser.email = emailInput.value;
  currentUser.name = emailInput.value.split('@')[0];
  showToast(`Welcome back, ${currentUser.name}!`, 'success');
  goToScreen('screen-home');
}

function doRegister() {
  const nameInput = document.getElementById('reg-name');
  const emailInput = document.getElementById('reg-email');
  const passInput = document.getElementById('reg-pass');

  if (!nameInput.value.trim() || !emailInput.value.includes('@') || passInput.value.length < 6) {
    showToast('Please fill in all required fields properly', 'warn');
    return;
  }

  currentUser.name = nameInput.value.trim();
  currentUser.email = emailInput.value.trim();
  currentUser.plan = 0; // Starts on free
  showToast('Account created successfully! 🎉', 'success');
  goToPlans('screen-auth');
}

function socialLogin(provider) {
  currentUser.name = provider === 'google' ? 'Google PetLover' : 'Facebook PetLover';
  currentUser.email = `user@${provider}.com`;
  showToast(`Signed in with ${provider.toUpperCase()}`, 'success');
  goToScreen('screen-home');
}

function demoLogin() {
  currentUser = {
    name: 'Suchada PetLover',
    email: 'suchada@petcare.ai',
    phone: '081 234 5678',
    plan: 3, // VET VIP
    avatar: ''
  };
  triggerConfetti();
  showToast('✨ Loaded Demo VIP Account with Mochi & Luna!', 'success');
  goToScreen('screen-home');
}

function forgotPassword() {
  const email = prompt('Enter your registered email address to receive reset link:', currentUser.email || 'you@email.com');
  if (email) {
    showToast(`Password reset link sent to ${email}`, 'info');
  }
}

/* ═══════════════════════════════════════════════════════════════
   PLANS & SUBSCRIPTION SYSTEM (FIXED & EXPANDED)
═══════════════════════════════════════════════════════════════ */
function goToPlans(fromScreen = 'screen-home') {
  plansSourceScreen = fromScreen;
  goToScreen('screen-plans');
  updatePlansUI();
}

function plansBack() {
  // Fix bug: Go back to where the user actually came from!
  goToScreen(plansSourceScreen || 'screen-home');
}

function setBillingCycle(cycle) {
  billingCycle = cycle;
  document.getElementById('billing-monthly')?.classList.toggle('active', cycle === 'monthly');
  document.getElementById('billing-yearly')?.classList.toggle('active', cycle === 'yearly');

  // Update displayed prices
  PLAN_INFO.forEach((plan, idx) => {
    const priceValEl = document.getElementById(`price-val-${idx}`);
    const periodValEl = document.getElementById(`period-val-${idx}`);
    if (priceValEl && periodValEl) {
      const price = cycle === 'yearly' ? plan.yearly : plan.monthly;
      priceValEl.textContent = price;
      periodValEl.textContent = cycle === 'yearly' ? '/mo (billed yearly)' : '/mo';
    }
  });

  updatePlansUI();
}

function selectPlan(index) {
  selectedPlanIndex = index;
  updatePlansUI();
}

function updatePlansUI() {
  // Update card selected status & current plan marker
  PLAN_INFO.forEach((p, idx) => {
    const card = document.getElementById(`plan-${idx}`);
    if (!card) return;

    card.classList.remove('selected', 'is-current');

    if (idx === currentUser.plan) {
      card.classList.add('is-current');
    }
    if (idx === selectedPlanIndex) {
      card.classList.add('selected');
    }
  });

  // Update CTA button
  const cta = document.getElementById('plans-cta-btn');
  if (!cta) return;

  cta.style.opacity = '1';
  cta.style.pointerEvents = 'auto';

  const plan = PLAN_INFO[selectedPlanIndex];
  const price = billingCycle === 'yearly' ? plan.yearly : plan.monthly;

  if (selectedPlanIndex === currentUser.plan) {
    cta.innerHTML = `
      <span class="btn-label">Your Current Active Plan ✓</span>
    `;
    cta.style.background = 'linear-gradient(135deg, #0284c7, #0369a1)';
  } else if (selectedPlanIndex === 0) {
    cta.innerHTML = `
      <span class="btn-label">Switch to Free Plan</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    `;
    cta.style.background = 'linear-gradient(135deg, #64748b, #475569)';
  } else {
    cta.innerHTML = `
      <span class="btn-label">Upgrade to ${plan.name} · $${price}/mo</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    `;
    cta.style.background = selectedPlanIndex === 3 
      ? 'linear-gradient(135deg, #d97706, #b45309)' 
      : 'linear-gradient(135deg, var(--teal), var(--teal-dark))';
  }
}

function planContinue() {
  if (selectedPlanIndex === currentUser.plan) {
    showToast('You are currently on this plan!', 'info');
    goToScreen(plansSourceScreen);
    return;
  }

  if (selectedPlanIndex === 0) {
    currentUser.plan = 0;
    showToast('Switched to Essential Free plan', 'info');
    if (plansSourceScreen === 'screen-auth') {
      goToScreen('screen-profile');
    } else {
      goToScreen(plansSourceScreen);
    }
    return;
  }

  // Go to checkout for paid plan
  goToScreen('screen-payment');
}

function openPlanComparison() {
  const content = `
    <h3 style="font-size:18px;font-weight:800;color:var(--slate);margin-bottom:12px;">Plan Features Comparison</h3>
    <table style="width:100%;font-size:12px;border-collapse:collapse;">
      <tr style="border-bottom:1.5px solid #e2e8f0;text-align:left;">
        <th style="padding:8px 4px;">Feature</th>
        <th style="padding:8px 4px;text-align:center;">Free</th>
        <th style="padding:8px 4px;text-align:center;">Care+</th>
        <th style="padding:8px 4px;text-align:center;">Pro</th>
        <th style="padding:8px 4px;text-align:center;color:#d97706;">VIP</th>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:8px 4px;font-weight:600;">AI Scans / mo</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">4</td>
        <td style="text-align:center;color:#22c55e;font-weight:700;">Unlimited</td>
        <td style="text-align:center;color:#22c55e;font-weight:700;">Unlimited</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:8px 4px;font-weight:600;">Health History</td>
        <td style="text-align:center;">Basic</td>
        <td style="text-align:center;">Full</td>
        <td style="text-align:center;">Full</td>
        <td style="text-align:center;color:#22c55e;font-weight:700;">Full + PDF</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:8px 4px;font-weight:600;">Tele-Vet Video Call</td>
        <td style="text-align:center;color:#cbd5e1;">-</td>
        <td style="text-align:center;color:#cbd5e1;">-</td>
        <td style="text-align:center;color:#cbd5e1;">-</td>
        <td style="text-align:center;color:#22c55e;font-weight:700;">24/7 Live</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:8px 4px;font-weight:600;">Prescription Delivery</td>
        <td style="text-align:center;color:#cbd5e1;">-</td>
        <td style="text-align:center;">Standard</td>
        <td style="text-align:center;">Priority</td>
        <td style="text-align:center;color:#22c55e;font-weight:700;">Free 2hr</td>
      </tr>
      <tr>
        <td style="padding:8px 4px;font-weight:600;">Pets Covered</td>
        <td style="text-align:center;">1</td>
        <td style="text-align:center;">2</td>
        <td style="text-align:center;">Unlimited</td>
        <td style="text-align:center;color:#22c55e;font-weight:700;">Unlimited</td>
      </tr>
    </table>
    <button class="btn-primary" style="margin-top:18px;" onclick="closeSheet()">Done</button>
  `;
  openSheet(content);
}

function toggleFaq(el) {
  el.classList.toggle('open');
}

/* ═══════════════════════════════════════════════════════════════
   CHECKOUT & PAYMENT MODULE
═══════════════════════════════════════════════════════════════ */
function renderPay() {
  const container = document.getElementById('pay-body');
  if (!container) return;

  const plan = PLAN_INFO[selectedPlanIndex];
  const basePrice = billingCycle === 'yearly' ? plan.yearly * 12 : plan.monthly;
  const discountAmount = discountApplied ? Math.round(basePrice * 0.2) : 0;
  const subtotal = basePrice - discountAmount;
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat;
  const thbTotal = Math.round(total * 35); // Approx THB

  container.innerHTML = `
    <div class="pay-summary-box">
      <div class="pay-summary-row">
        <span><strong>${plan.name}</strong> (${billingCycle === 'yearly' ? 'Annual Plan' : 'Monthly'})</span>
        <span>$${basePrice}.00</span>
      </div>
      ${discountApplied ? `
      <div class="pay-summary-row" style="color:#22c55e;font-weight:700;">
        <span>Promo Code (20% OFF)</span>
        <span>-$${discountAmount}.00</span>
      </div>` : ''}
      <div class="pay-summary-row">
        <span>VAT 7%</span>
        <span>$${vat}.00</span>
      </div>
      <div class="pay-summary-row total">
        <span>Total Due</span>
        <span>$${total}.00 <small style="font-size:12px;color:var(--slate-lite);">(฿${thbTotal.toLocaleString()})</small></span>
      </div>
    </div>

    <!-- Promo code input -->
    <div class="promo-wrap">
      <input type="text" class="promo-input" id="promo-code" placeholder="PROMO CODE: PCARE2026" />
      <button type="button" class="promo-btn" onclick="applyPromo()">Apply</button>
    </div>

    <div style="font-size:13px;font-weight:700;color:var(--slate);margin:16px 0 8px;">Select Payment Method</div>

    <div class="method-tabs">
      <button type="button" class="method-tab ${selectedPaymentMethodKey === 'promptpay' ? 'active' : ''}" onclick="setPaymentMethod('promptpay')">
        <span style="font-size:20px">📱</span>
        <span>PromptPay</span>
      </button>
      <button type="button" class="method-tab ${selectedPaymentMethodKey === 'card' ? 'active' : ''}" onclick="setPaymentMethod('card')">
        <span style="font-size:20px">💳</span>
        <span>Card</span>
      </button>
      <button type="button" class="method-tab ${selectedPaymentMethodKey === 'truemoney' ? 'active' : ''}" onclick="setPaymentMethod('truemoney')">
        <span style="font-size:20px">🧡</span>
        <span>TrueMoney</span>
      </button>
    </div>

    ${renderPaymentMethodBody(thbTotal)}
  `;

  // Update footer button
  const confirmBtn = document.getElementById('pay-confirm-btn');
  if (confirmBtn) {
    confirmBtn.innerHTML = `
      <span class="btn-label">Pay ฿${thbTotal.toLocaleString()} &amp; Activate ${plan.short}</span>
    `;
  }
}

function setPaymentMethod(method) {
  selectedPaymentMethodKey = method;
  renderPay();
}

function renderPaymentMethodBody(thbTotal) {
  if (selectedPaymentMethodKey === 'promptpay') {
    return `
      <div class="qr-box">
        <div class="qr-timer">⏳ Expires in 14:52 min</div>
        <div class="qr-code-img">
          <!-- Scalable QR mockup -->
          <svg viewBox="0 0 100 100" style="width:100%;height:100%;">
            <rect width="100" height="100" fill="white"/>
            <path d="M10 10h30v30h-30z M50 10h10v10h-10z M70 10h20v20h-20z M20 20h10v10h-10z M80 20h0v0z M10 60h30v30h-30z M20 70h10v10h-10z M60 50h10v10h-10z M80 50h10v20h-10z M50 70h20v10h-20z M80 80h10v10h-10z M50 90h40v10h-40z" fill="#0f172a"/>
          </svg>
        </div>
        <div style="font-size:12px;color:var(--slate-lite);margin-bottom:4px;">Scan with any Thai Banking App</div>
        <strong style="font-size:14px;color:var(--slate);">Ref: PCARE-${Date.now().toString().slice(-6)}</strong>
      </div>
    `;
  }

  if (selectedPaymentMethodKey === 'card') {
    return `
      <div style="background:white;padding:16px;border-radius:16px;border:1px solid #e2e8f0;display:flex;flex-direction:column;gap:10px;">
        <div class="input-group">
          <label class="input-label">Card Number</label>
          <input type="text" class="field-input" placeholder="4111 2222 3333 4444" value="4532 •••• •••• 8892" />
        </div>
        <div style="display:flex;gap:10px;">
          <div class="input-group" style="flex:1;">
            <label class="input-label">Expiry</label>
            <input type="text" class="field-input" placeholder="MM/YY" value="08/28" />
          </div>
          <div class="input-group" style="flex:1;">
            <label class="input-label">CVC / CVV</label>
            <input type="password" class="field-input" placeholder="123" value="888" maxlength="4" />
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div style="background:white;padding:16px;border-radius:16px;border:1px solid #e2e8f0;">
      <div class="input-group">
        <label class="input-label">TrueMoney Wallet Number</label>
        <input type="tel" class="field-input" placeholder="08X-XXX-XXXX" value="${currentUser.phone}" />
      </div>
      <p style="font-size:11.5px;color:var(--slate-lite);margin-top:8px;">You will receive an OTP confirmation code on your phone.</p>
    </div>
  `;
}

function applyPromo() {
  const code = document.getElementById('promo-code')?.value.trim().toUpperCase();
  if (code === 'PCARE2026' || code === 'PCARE' || code === 'VIP') {
    discountApplied = true;
    showToast('Promo code applied: 20% Discount! 🏷️', 'success');
    renderPay();
  } else {
    showToast('Invalid promo code. Try "PCARE2026"', 'warn');
  }
}

function confirmPayment() {
  const overlay = document.getElementById('proc-overlay');
  const procText = document.getElementById('proc-text');
  if (overlay) overlay.classList.add('active');
  if (procText) procText.textContent = 'Verifying payment with bank...';

  setTimeout(() => {
    if (procText) procText.textContent = 'Activating subscription...';
  }, 700);

  setTimeout(() => {
    if (overlay) overlay.classList.remove('active');
    currentUser.plan = selectedPlanIndex;
    triggerConfetti();
    showToast(`🎉 Subscription Active: Welcome to ${PLAN_INFO[selectedPlanIndex].name}!`, 'success');

    if (plansSourceScreen === 'screen-auth' && myPets.length === 0) {
      goToScreen('screen-profile');
    } else {
      goToScreen(plansSourceScreen || 'screen-home');
    }
  }, 1400);
}

/* ═══════════════════════════════════════════════════════════════
   PET PROFILE MODULE (ADD & MANAGE)
═══════════════════════════════════════════════════════════════ */
function selectPet(type) {
  const slider = document.getElementById('toggle-slider');
  const btnDog = document.getElementById('btn-dog');
  const btnCat = document.getElementById('btn-cat');

  if (type === 'dog') {
    slider?.classList.remove('right');
    btnDog?.classList.add('active');
    btnCat?.classList.remove('active');
  } else {
    slider?.classList.add('right');
    btnCat?.classList.add('active');
    btnDog?.classList.remove('active');
  }
  populateBreedList(type);
}

function selectGender(gender) {
  document.querySelectorAll('#gender-chips .chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-g') === gender);
  });
}

function previewPetPhoto(input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById('pet-photo-img');
    const placeholder = document.getElementById('pet-photo-placeholder');
    if (img) {
      img.src = e.target.result;
      img.style.display = 'block';
    }
    if (placeholder) placeholder.style.display = 'none';
  };
  reader.readAsDataURL(input.files[0]);
}

function populateBreedList(type, filter = '') {
  const dropdown = document.getElementById('breed-dropdown');
  if (!dropdown) return;
  const list = BREEDS[type] || [];
  const filtered = list.filter(b => b.toLowerCase().includes(filter.toLowerCase()));
  dropdown.innerHTML = filtered.map(
    b => `<div class="breed-option" onclick="chooseBreed('${b}')">${b}</div>`
  ).join('');
}

function filterBreeds(val) {
  const isCat = document.getElementById('btn-cat')?.classList.contains('active');
  populateBreedList(isCat ? 'cat' : 'dog', val);
  openBreedDropdown();
}

function openBreedDropdown() {
  document.getElementById('breed-dropdown')?.classList.add('open');
}

function closeBreedDropdown() {
  document.getElementById('breed-dropdown')?.classList.remove('open');
}

function chooseBreed(breed) {
  const input = document.getElementById('breed-search');
  if (input) input.value = breed;
  closeBreedDropdown();
}

function savePet() {
  const nameInput = document.getElementById('pet-name');
  const ageInput = document.getElementById('pet-age');
  const weightInput = document.getElementById('pet-weight');
  const breedInput = document.getElementById('breed-search');
  const photoImg = document.getElementById('pet-photo-img');
  const isCat = document.getElementById('btn-cat')?.classList.contains('active');
  const activeGenderChip = document.querySelector('#gender-chips .chip.active');

  const name = nameInput?.value.trim();
  if (!name) {
    showToast('Please enter your pet\'s name', 'warn');
    nameInput?.focus();
    return;
  }

  const newPet = {
    name: name,
    type: isCat ? 'cat' : 'dog',
    breed: breedInput?.value.trim() || (isCat ? 'Domestic Shorthair' : 'Mixed Breed'),
    age: parseFloat(ageInput?.value) || 1,
    weight: parseFloat(weightInput?.value) || (isCat ? 4.0 : 8.5),
    gender: activeGenderChip?.getAttribute('data-g') || 'Male',
    emoji: isCat ? '🐱' : '🐶',
    photoSrc: (photoImg && photoImg.style.display !== 'none') ? photoImg.src : null,
    score: 92,
    status: 'Healthy · New Patient',
    statusClass: 'green'
  };

  myPets.push(newPet);
  activePetIndex = myPets.length - 1;

  // Clear form
  if (nameInput) nameInput.value = '';
  if (ageInput) ageInput.value = '';
  if (weightInput) weightInput.value = '';
  if (breedInput) breedInput.value = '';
  if (photoImg) photoImg.style.display = 'none';
  document.getElementById('pet-photo-placeholder').style.display = 'flex';

  triggerConfetti();
  showToast(`Added ${newPet.name} to your pet profile! 🐾`, 'success');
  goToScreen('screen-home');
}

function profileBack() {
  if (myPets.length > 0) {
    goToScreen('screen-home');
  } else {
    goToScreen('screen-auth');
  }
}

/* ═══════════════════════════════════════════════════════════════
   HOME SCREEN (DASHBOARD)
═══════════════════════════════════════════════════════════════ */
function renderHome() {
  const container = document.getElementById('home-body');
  if (!container) return;

  const currentPet = myPets[activePetIndex] || {
    name: 'Pet', breed: 'Breed', age: 1, weight: 5, emoji: '🐾', score: 85, status: 'Healthy', statusClass: 'green'
  };

  const plan = PLAN_INFO[currentUser.plan] || PLAN_INFO[0];

  container.innerHTML = `
    <!-- Top Greeting Header -->
    <div class="home-header">
      <div>
        <div class="home-greeting" id="home-greeting">Good day 👋</div>
        <div class="home-owner-name">Hi, ${currentUser.name.split(' ')[0]}!</div>
      </div>
      <button class="home-plan-badge" onclick="goToPlans('screen-home')" title="Manage subscription">
        👑 ${plan.short} Plan
      </button>
    </div>

    <!-- Pet Switcher Carousel -->
    <div class="section-title-row" style="margin-bottom:10px">
      <span class="section-title">My Pets (${myPets.length})</span>
      <button class="add-pet-btn" onclick="goToScreen('screen-profile')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:13px;height:13px">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add Pet
      </button>
    </div>

    <div class="pet-carousel">
      ${myPets.map((p, idx) => `
        <button class="pet-pill ${idx === activePetIndex ? 'active' : ''}" onclick="switchActivePet(${idx})">
          <div class="pet-pill-avatar">
            ${p.photoSrc ? `<img src="${p.photoSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />` : p.emoji}
          </div>
          <span>${p.name}</span>
        </button>
      `).join('')}
    </div>

    <!-- Active Pet Hero Card -->
    <div class="pet-hero-card" onclick="goToScreen('screen-health')" style="cursor:pointer;">
      <div class="phc-top">
        <div class="phc-photo-wrap">
          ${currentPet.photoSrc ? `<img src="${currentPet.photoSrc}" alt="${currentPet.name}" />` : `<div style="font-size:36px;display:flex;align-items:center;justify-content:center;height:100%;">${currentPet.emoji}</div>`}
        </div>
        <div class="phc-info">
          <div class="phc-name">${currentPet.name}</div>
          <div class="phc-meta">${currentPet.breed} · ${currentPet.gender || 'Pet'}</div>
          <div class="pet-status-dot ${currentPet.statusClass}" style="display:inline-block;margin-right:6px;"></div>
          <span style="font-size:12px;font-weight:600;color:var(--slate-lite);">${currentPet.status}</span>
        </div>
        <div style="text-align:right;">
          <div style="font-size:24px;font-weight:900;color:var(--teal);">${currentPet.score}</div>
          <div style="font-size:10px;font-weight:700;color:var(--slate-lite);text-transform:uppercase;">Health Score</div>
        </div>
      </div>
      <div class="phc-stats-row">
        <div class="stat-item">
          <div class="val">${currentPet.age} yrs</div>
          <div class="lbl">Age</div>
        </div>
        <div class="stat-item">
          <div class="val">${currentPet.weight} kg</div>
          <div class="lbl">Weight</div>
        </div>
        <div class="stat-item">
          <div class="val" style="color:#22c55e;">Normal</div>
          <div class="lbl">Vitals</div>
        </div>
      </div>
    </div>

    <!-- Quick Action Grid -->
    <div class="section-title-row" style="margin-top:16px;margin-bottom:12px">
      <span class="section-title">AI Clinical Services</span>
    </div>

    <div class="quick-action-grid">
      <button class="quick-action-card" onclick="goToScreen('screen-scan')">
        <div class="qa-icon teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:22px;height:22px">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
        <div class="qa-label">AI Scan</div>
      </button>

      <button class="quick-action-card" onclick="goToScreen('screen-health')">
        <div class="qa-icon blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:22px;height:22px">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div class="qa-label">Health Log</div>
      </button>

      <button class="quick-action-card" onclick="goToScreen('screen-chat')">
        <div class="qa-icon purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:22px;height:22px">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div class="qa-label">AI Vet Chat</div>
      </button>

      <button class="quick-action-card" onclick="teleVet()">
        <div class="qa-icon gold">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:22px;height:22px">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <div class="qa-label">Tele-Vet</div>
      </button>
    </div>

    <!-- Latest Scan Alert Banner -->
    <div class="section-title-row" style="margin-top:22px;margin-bottom:12px">
      <span class="section-title">Latest Medical Scan</span>
      <span class="section-see-all" onclick="goToScreen('screen-health')">History</span>
    </div>

    <div class="last-scan-card" onclick="showScanResult('Skin')">
      <div class="lsc-icon">🔬</div>
      <div class="lsc-info">
        <div class="lsc-diag">Fungal Infection (Ringworm)</div>
        <div class="lsc-date">Scanned today · 94% Confidence · Skin Mode</div>
      </div>
      <span class="tag-warning">Review</span>
    </div>

    <!-- Upcoming Vet Appointment -->
    <div class="appt-card" style="margin-top:16px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="appt-icon">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <div class="appt-info">
        <div class="appt-title">Next Routine Vet Checkup</div>
        <div class="appt-date">March 15, 2026 · 10:00 AM · Thonglor Pet Hospital</div>
      </div>
      <button class="appt-btn" onclick="showToast('Appointment synchronized to calendar 📅', 'success')">Calendar</button>
    </div>
  `;
}

function switchActivePet(idx) {
  activePetIndex = idx;
  renderHome();
  showToast(`Switched active pet to ${myPets[idx].name}`, 'info');
}

/* ═══════════════════════════════════════════════════════════════
   AI MEDICAL SCANNER
═══════════════════════════════════════════════════════════════ */
function setupScanPetPreview() {
  const currentPet = myPets[activePetIndex];
  if (!currentPet) return;

  const nameEl = document.getElementById('scan-pet-name');
  const avatarEl = document.getElementById('scan-pet-avatar');
  const vfCircle = document.getElementById('vf-pet-circle');

  if (nameEl) nameEl.textContent = currentPet.name;
  if (avatarEl) avatarEl.textContent = currentPet.emoji;
  if (vfCircle) vfCircle.textContent = currentPet.emoji;

  const quotaEl = document.getElementById('scan-quota');
  if (quotaEl) {
    quotaEl.textContent = currentUser.plan >= 2 ? '∞ Unlimited AI Scans' : 'Weekly Scan Active';
  }
}

function selectScanPart(btn, part) {
  currentScanPart = part;
  document.querySelectorAll('.scan-part-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const badge = document.getElementById('scan-mode-badge');
  if (badge) badge.textContent = part + ' Mode';

  const reticleLabel = document.getElementById('vf-reticle-label');
  if (reticleLabel) reticleLabel.textContent = part;

  const currentPet = myPets[activePetIndex];
  const petName = currentPet ? currentPet.name : 'your pet';
  const statusText = document.getElementById('scan-status-text');
  if (statusText) statusText.textContent = `Align guides with ${petName}'s ${part.toLowerCase()} & hold still`;
}

function toggleFlash() {
  const btn = document.getElementById('scan-flash-btn');
  btn.classList.toggle('active');
  const isActive = btn.classList.contains('active');
  btn.style.background = isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)';
  showToast(isActive ? 'Flash illumination ON' : 'Flash OFF', 'info');
}

function openPetPicker() {
  const listHtml = myPets.map((p, idx) => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:12px;margin-bottom:8px;cursor:pointer;" onclick="switchActivePet(${idx});closeSheet();setupScanPetPreview();">
      <div style="font-size:24px;">${p.emoji}</div>
      <div style="flex:1;">
        <strong>${p.name}</strong>
        <div style="font-size:12px;color:var(--slate-lite);">${p.breed}</div>
      </div>
      ${idx === activePetIndex ? '<span style="color:var(--teal);font-weight:700;">Active ✓</span>' : ''}
    </div>
  `).join('');

  openSheet(`
    <h3 style="font-size:16px;font-weight:800;margin-bottom:12px;">Select Pet for AI Scan</h3>
    ${listHtml}
  `);
}

function pickScanImage(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    const vfPhoto = document.getElementById('vf-photo');
    if (vfPhoto) {
      vfPhoto.src = e.target.result;
      vfPhoto.style.display = 'block';
      document.querySelector('.vf-pet-preview').style.display = 'none';
      showToast('Image loaded. Ready for AI Analysis.', 'success');
    }
  };
  reader.readAsDataURL(file);
}

function toggleCamera() {
  showToast('Live camera feed active (Simulation mode)', 'info');
}

function startScan() {
  const btn = document.getElementById('scan-capture-btn');
  if (btn) btn.disabled = true;

  const progressFill = document.getElementById('scan-progress');
  const statusText = document.getElementById('scan-status-text');
  const analyzing = document.getElementById('vf-analyzing');
  const pctEl = document.getElementById('vf-pct');

  if (analyzing) analyzing.classList.add('active');

  const steps = [
    { pct: 18, msg: 'Calibrating neural focal depth...' },
    { pct: 40, msg: `Segmenting ${currentScanPart} tissue morphology...` },
    { pct: 65, msg: 'Comparing with 45,000+ veterinary pathology datasets...' },
    { pct: 88, msg: 'Generating differential diagnosis & confidence score...' },
    { pct: 100, msg: 'Analysis finalized ✓' }
  ];

  let currentStep = 0;
  clearInterval(scanInterval);

  scanInterval = setInterval(() => {
    if (currentStep < steps.length) {
      const s = steps[currentStep];
      if (progressFill) progressFill.style.width = s.pct + '%';
      if (statusText) statusText.textContent = s.msg;
      if (pctEl) pctEl.textContent = s.pct + '%';
      currentStep++;
    } else {
      clearInterval(scanInterval);
      if (analyzing) analyzing.classList.remove('active');
      if (btn) btn.disabled = false;
      showScanResult(currentScanPart);
    }
  }, 450);
}

function leaveScan() {
  clearInterval(scanInterval);
  goToScreen('screen-home');
}

/* ═══════════════════════════════════════════════════════════════
   DIAGNOSIS REPORT (SCREEN RESULT)
═══════════════════════════════════════════════════════════════ */
function showScanResult(part = 'Skin') {
  currentScanPart = part;
  goToScreen('screen-result');

  const container = document.getElementById('result-body');
  const ctaContainer = document.getElementById('result-cta');
  if (!container) return;

  const data = DIAGNOSES[part] || DIAGNOSES.Skin;
  const currentPet = myPets[activePetIndex] || { name: 'Mochi', emoji: '🐶' };

  container.innerHTML = `
    <!-- Result Header -->
    <div class="result-header-row">
      <button class="back-btn" onclick="goToScreen('screen-scan')" aria-label="Back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <h2 class="result-title">AI Diagnosis Report</h2>
      <button class="share-btn" onclick="shareReport()" aria-label="Share">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
      </button>
    </div>

    <!-- Confidence Banner -->
    <div class="confidence-banner">
      <div class="confidence-icon">🔬</div>
      <div class="confidence-info">
        <div class="confidence-label">Suspected Diagnosis</div>
        <div class="confidence-name">${data.disease}</div>
        <div style="font-size:12px;color:var(--slate-lite);margin-top:2px;">${data.th}</div>
        <div class="confidence-label" style="margin-top:6px; color:var(--teal)">
          📌 Target: ${part} Mode · ${currentPet.name}
        </div>
      </div>
      <div class="confidence-score">
        <div class="score-num">${data.confidence}%</div>
        <div class="score-label">Confidence</div>
      </div>
    </div>

    <!-- Evidence Heatmap Card -->
    <div class="heatmap-card">
      <div class="heatmap-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="heatmap-icon">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Visual Evidence Heatmap
      </div>
      <div class="heatmap-img-wrap" id="heatmap-wrap">
        <div class="heatmap-base">${currentPet.emoji}</div>
        <div class="heatmap-overlay" id="heatmap-overlay">
          <div class="heat-spot spot1"></div>
          <div class="heat-spot spot2"></div>
          <div class="heat-spot spot3"></div>
        </div>
        <div class="heatmap-legend">
          <div class="legend-item"><span class="legend-dot red"></span> Severe</div>
          <div class="legend-item"><span class="legend-dot orange"></span> Moderate</div>
          <div class="legend-item"><span class="legend-dot yellow"></span> Mild</div>
        </div>
      </div>
      <div class="heat-controls-bar">
        <button type="button" class="heat-toggle-btn" onclick="toggleHeatmapOverlay()">
          Toggle Heatmap Layer
        </button>
        <span style="font-size:11px;color:var(--slate-lite);font-weight:600;">Resolution: 4K Neural</span>
      </div>
    </div>

    <!-- First Aid Guidelines -->
    <div class="treatment-section">
      <div class="treatment-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="treat-icon">
          <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        First Aid &amp; Clinical Instructions
      </div>
      <div class="treatment-text-block">
        <strong>📝 Care Guidelines:</strong><br />
        ${data.firstAid.map(s => `• ${s}<br/>`).join('')}
      </div>

      <!-- Prescribed Medicines -->
      <div style="font-size:13px;font-weight:700;color:var(--slate);margin:16px 0 10px;">
        Recommended Veterinary Medications
      </div>

      ${data.meds.map((m, i) => `
        <div class="med-order-card">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="font-size:26px;">${m.icon}</div>
            <div>
              <strong style="font-size:14px;color:var(--slate);">${m.name}</strong>
              <div style="font-size:12px;color:var(--slate-lite);">${m.use}</div>
              <span class="med-tag" style="margin-top:4px;display:inline-block;">${m.tag}</span>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:15px;font-weight:800;color:var(--teal);">฿${m.price}</div>
            <button class="add-pet-btn" style="margin-top:6px;font-size:10px;padding:4px 10px;" onclick="orderMed('${m.name}', ${m.price})">Order</button>
          </div>
        </div>
      `).join('')}

      <!-- Nearby Clinics -->
      <div style="font-size:13px;font-weight:700;color:var(--slate);margin:20px 0 10px;">
        Nearby Veterinary Hospitals &amp; Clinics
      </div>
      
      <div class="vet-item" style="display:flex;justify-content:space-between;align-items:center;padding:14px;background:var(--off-white);border-radius:12px;border:1px solid var(--slate-ghost);margin-bottom:8px;">
        <div>
          <strong style="font-size:14px;color:var(--slate);">PetCare Clinic &amp; Pharmacy</strong>
          <div style="color:var(--slate-lite);font-size:12px;">1.2 km away · Open until 22:00</div>
        </div>
        <button style="border:none;background:#DBEAFE;color:#3B97D3;padding:6px 12px;border-radius:8px;font-weight:700;font-size:12px;cursor:pointer;" onclick="openClinicDirections()">Directions</button>
      </div>

      <div class="vet-item" style="display:flex;justify-content:space-between;align-items:center;padding:14px;background:var(--off-white);border-radius:12px;border:1px solid var(--slate-ghost);">
        <div>
          <strong style="font-size:14px;color:var(--slate);">Thonglor 24h Animal Hospital</strong>
          <div style="color:var(--slate-lite);font-size:12px;">3.4 km away · 24 Hours Emergency</div>
        </div>
        <button style="border:none;background:#DBEAFE;color:#3B97D3;padding:6px 12px;border-radius:8px;font-weight:700;font-size:12px;cursor:pointer;" onclick="openClinicDirections()">Directions</button>
      </div>
    </div>
  `;

  if (ctaContainer) {
    ctaContainer.innerHTML = `
      <button class="btn-primary" onclick="teleVet()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>Consult Tele-Vet Immediately</span>
      </button>
      <button class="btn-secondary" onclick="exportPdf()">
        <span>Download Official PDF Medical Report</span>
      </button>
    `;
  }
}

function toggleHeatmapOverlay() {
  const overlay = document.getElementById('heatmap-overlay');
  if (!overlay) return;
  overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
  showToast(overlay.style.display === 'none' ? 'Heatmap hidden' : 'Heatmap visible', 'info');
}

function orderMed(name, price) {
  showToast(`Ordered ${name} (฿${price}) · Delivered within 2 hrs 🚚`, 'success');
}

function shareReport() {
  showToast('Medical report copied to clipboard / ready to share 📋', 'success');
}

function exportPdf() {
  showToast('Generating official PDF diagnostic report... 📄', 'info');
  setTimeout(() => {
    showToast('PDF downloaded successfully! Check downloads.', 'success');
  }, 1000);
}

function openClinicDirections() {
  window.open('https://maps.google.com/?q=veterinary+clinic+near+me', '_blank');
}

/* ═══════════════════════════════════════════════════════════════
   HEALTH SUMMARY & LOG SCREEN
═══════════════════════════════════════════════════════════════ */
function renderHealth() {
  const container = document.getElementById('health-body');
  if (!container) return;

  const currentPet = myPets[activePetIndex] || myPets[0];

  container.innerHTML = `
    <div class="screen-header">
      <div class="header-chip">Wellness Tracker</div>
      <h1 class="screen-title">Health History<br />&amp; Log</h1>
    </div>

    <!-- Pet info row -->
    <div class="health-pet-header">
      <div class="health-pet-photo">
        ${currentPet.photoSrc ? `<img src="${currentPet.photoSrc}" alt="${currentPet.name}"/>` : currentPet.emoji}
      </div>
      <div class="health-pet-info">
        <div class="health-pet-name">${currentPet.name}</div>
        <div class="health-pet-meta">${currentPet.breed} · ${currentPet.age} yrs · ${currentPet.weight} kg</div>
      </div>
      <button class="back-btn" onclick="goToScreen('screen-home')" style="margin-left:auto" aria-label="Back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Health Score Ring -->
    <div class="health-score-card">
      <div class="health-ring-wrap">
        <svg class="health-ring-svg" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#EEF2F7" stroke-width="10" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#3B97D3" stroke-width="10" stroke-dasharray="314"
            stroke-dashoffset="${314 - (314 * currentPet.score / 100)}" stroke-linecap="round" transform="rotate(-90 60 60)" class="health-ring-arc" />
        </svg>
        <div class="health-ring-inner">
          <div class="health-score-num">${currentPet.score}</div>
          <div class="health-score-label">Health Score</div>
        </div>
      </div>
      <div class="health-status-badges">
        <div class="health-badge green">🟢 Overall Condition · Stable</div>
        <div class="health-badge orange">🟡 Skin Lesion · In Treatment</div>
        <div class="health-badge green">🟢 Weight Index · Ideal</div>
      </div>
    </div>

    <!-- Weight Tracker Chart -->
    <div class="section-title-row" style="margin-top:16px;">
      <span class="section-title">Weight Tracking (6 Months)</span>
    </div>
    <div class="weight-chart-card">
      <div class="weight-chart">
        <div class="wc-bar-group"><div class="wc-bar" style="height:55%"></div><div class="wc-label">Oct</div></div>
        <div class="wc-bar-group"><div class="wc-bar" style="height:62%"></div><div class="wc-label">Nov</div></div>
        <div class="wc-bar-group"><div class="wc-bar" style="height:60%"></div><div class="wc-label">Dec</div></div>
        <div class="wc-bar-group"><div class="wc-bar" style="height:67%"></div><div class="wc-label">Jan</div></div>
        <div class="wc-bar-group"><div class="wc-bar" style="height:72%"></div><div class="wc-label">Feb</div></div>
        <div class="wc-bar-group active-bar">
          <div class="wc-bar highlight" style="height:70%">
            <div class="wc-tip">${currentPet.weight}kg</div>
          </div>
          <div class="wc-label">Mar</div>
        </div>
      </div>
      <div class="weight-range">Healthy veterinary range: 6.5 – 8.5 kg</div>
    </div>

    <!-- Vaccine Passport -->
    <div class="section-title-row" style="margin-top:18px;">
      <span class="section-title">Vaccine Passport</span>
      <button class="add-pet-btn" style="font-size:10px;padding:3px 8px;" onclick="logVaccine()">+ Record</button>
    </div>

    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
      <div style="background:white;padding:12px 14px;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="font-size:13px;color:var(--slate);">Rabies Vaccine (พิษสุนัขบ้า)</strong>
          <div style="font-size:11px;color:var(--slate-lite);">Valid until Nov 2026 · Batch #RV9921</div>
        </div>
        <span class="tag-ok">Valid ✓</span>
      </div>

      <div style="background:white;padding:12px 14px;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="font-size:13px;color:var(--slate);">DHPP Core Vaccine (รวม 5 โรค)</strong>
          <div style="font-size:11px;color:var(--slate-lite);">Due in 3 weeks (Apr 2026)</div>
        </div>
        <span class="tag-warning">Due Soon</span>
      </div>
    </div>

    <!-- Scan History Timeline -->
    <div class="section-title-row">
      <span class="section-title">Diagnostic History</span>
    </div>

    <div class="timeline">
      <div class="timeline-item active-result" onclick="showScanResult('Skin')" style="cursor:pointer;">
        <div class="timeline-dot teal"></div>
        <div class="timeline-card">
          <div class="timeline-date">Today · Skin Mode</div>
          <div class="timeline-diag">Fungal Infection (Ringworm)</div>
          <div class="timeline-conf">94% Confidence · <span class="tag-warning">Prescription Active</span></div>
        </div>
      </div>

      <div class="timeline-item" onclick="showScanResult('Eyes')" style="cursor:pointer;">
        <div class="timeline-dot grey"></div>
        <div class="timeline-card">
          <div class="timeline-date">Feb 14, 2026 · Eyes Mode</div>
          <div class="timeline-diag">Mild Conjunctivitis</div>
          <div class="timeline-conf">91% Confidence · <span class="tag-ok">Resolved</span></div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-dot grey"></div>
        <div class="timeline-card">
          <div class="timeline-date">Jan 10, 2026 · Routine AI Check</div>
          <div class="timeline-diag">Full Body Wellness Scan</div>
          <div class="timeline-conf">100% Score · <span class="tag-ok">Healthy</span></div>
        </div>
      </div>
    </div>
  `;
}

function logVaccine() {
  const vacName = prompt('Enter vaccine name:', 'DHPP Booster');
  if (vacName) {
    showToast(`Logged ${vacName} to medical records 💉`, 'success');
    renderHealth();
  }
}

/* ═══════════════════════════════════════════════════════════════
   AI CHATBOT & TELE-VET CONSULTATION
═══════════════════════════════════════════════════════════════ */
function initChat() {
  const container = document.getElementById('chat-messages');
  const chipsContainer = document.getElementById('chat-chips');
  const vipBanner = document.getElementById('vip-call-banner');

  if (vipBanner) {
    vipBanner.style.display = currentUser.plan === 3 ? 'flex' : 'none';
  }

  if (chipsContainer) {
    chipsContainer.innerHTML = `
      <button class="chat-chip" onclick="sendQuickChat('✨ โหมดทดลอง (Demo Mode)')">✨ โหมดทดลอง</button>
      <button class="chat-chip" onclick="sendQuickChat('น้องเกาตัวตลอดเวลา เกิดจากอะไร?')">🐶 น้องเกาตัวตลอด</button>
      <button class="chat-chip" onclick="sendQuickChat('สัตว์เลี้ยงไม่ยอมกินข้าว ทำอย่างไรดี?')">🍽️ ไม่ยอมกินข้าว</button>
      <button class="chat-chip" onclick="sendQuickChat('ตารางฉีดวัคซีนที่จำเป็นมีอะไรบ้าง?')">💉 ตารางวัคซีน</button>
      <button class="chat-chip" onclick="sendQuickChat('น้องมีอาการท้องเสีย ควรงดอาหารไหม?')">🏥 ท้องเสีย</button>
    `;
  }

  if (container && container.children.length === 0) {
    appendChatBubble('👋 สวัสดีครับ! ผม PetCare AI ผู้ช่วยสุขภาพสัตว์เลี้ยงอัจฉริยะ 🐶🐱\n\nพิมพ์ปรึกษาอาการ หรือส่งรูปถ่ายบริเวณที่ผิดปกติมาให้ผมวิเคราะห์เบื้องต้นได้ตลอด 24 ชม. ครับ!', 'bot');
  }
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input?.value.trim();
  if (!text) return;
  input.value = '';

  appendChatBubble(text, 'user');

  // Typing indicator
  const typingId = appendChatBubble('กำลังประมวลผล...', 'bot', true);

  setTimeout(() => {
    document.getElementById(typingId)?.remove();
    const reply = generateBotReply(text);
    appendChatBubble(reply, 'bot');
  }, 700 + Math.random() * 500);
}

function sendQuickChat(text) {
  const input = document.getElementById('chat-input');
  if (input) input.value = text;
  sendChat();
}

function sendChatImage(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    appendChatBubble(`<img src="${e.target.result}" style="max-width:180px;border-radius:10px;margin-bottom:4px;"/><br/>ส่งรูปภาพอาการ`, 'user');

    const typingId = appendChatBubble('กำลังวิเคราะห์ภาพรอยโรค...', 'bot', true);
    setTimeout(() => {
      document.getElementById(typingId)?.remove();
      appendChatBubble(`📸 ได้รับภาพถ่ายแล้วครับ จากการประมวลผลเบื้องต้นด้วยโมเดล AI Vision:\n\n• พบรอยแดงสะเก็ดและความผิดปกติของผิวหนัง\n• สงสัยภาวะเชื้อราที่ผิวหนัง (Ringworm)\n\n👉 แนะนำให้กดปุ่ม **"AI Scan"** เพื่อสร้างรายงานผลการวินิจฉัยและรับแผนการรักษาอย่างละเอียดครับ!`, 'bot');
    }, 1200);
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function generateBotReply(msg) {
  const lower = msg.toLowerCase();
  for (const [k, v] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(k)) return v;
  }
  return `🤖 ขอบคุณสำหรับข้อมูลครับ สำหรับอาการ "${msg}" ทีมแพทย์แนะนำให้สังเกตอาการใกล้ชิด หากมีอาการรุนแรงสามารถกดปุ่ม **Tele-Vet** ด้านบนเพื่อโทรปรึกษาสัตวแพทย์โดยตรงได้เลยครับ 🏥`;
}

function appendChatBubble(content, sender, isTyping = false) {
  const container = document.getElementById('chat-messages');
  if (!container) return null;

  const id = 'bubble-' + Date.now() + '-' + Math.floor(Math.random()*1000);
  const timeStr = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.id = id;
  bubble.innerHTML = `
    <div class="bubble-text" ${isTyping ? 'style="font-style:italic;opacity:0.7;"' : ''}>
      ${content.replace(/\n/g, '<br/>')}
    </div>
    <div class="bubble-time">${timeStr}</div>
  `;

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return id;
}

function clearChat() {
  const container = document.getElementById('chat-messages');
  if (container) {
    container.innerHTML = '';
    initChat();
  }
}

/* ═══════════════════════════════════════════════════════════════
   TELE-VET LIVE CONSULTATION OVERLAY (AUDIO & VIDEO CALL)
═══════════════════════════════════════════════════════════════ */
function teleVet() {
  startCall('video');
}

function startCall(mode = 'video') {
  const overlay = document.getElementById('call-overlay');
  if (!overlay) return;

  callSeconds = 0;
  overlay.innerHTML = `
    <div class="call-header">
      <div class="call-badge-live">🔴 LIVE ${mode.toUpperCase()} CALL</div>
      <button class="call-ctrl-btn hangup" style="width:36px;height:36px;" onclick="endCall()" aria-label="End call">✕</button>
    </div>

    <div class="call-body">
      <div class="vet-call-avatar">
        <img src="assets/vet.jpg" alt="Dr. Suchada" />
      </div>
      <div class="call-vet-name">Dr. Suchada P., DVM</div>
      <div class="call-vet-role">Licensed Chief Veterinarian · P Care Clinic</div>
      <div class="call-timer" id="call-timer-text">00:00</div>
      <div style="font-size:12px;color:#cbd5e1;margin-top:8px;">Connected · Audio &amp; Video HD Encrypted</div>
    </div>

    <div class="call-controls">
      <button class="call-ctrl-btn" onclick="showToast('Microphone toggled', 'info')" aria-label="Mute">🎤</button>
      <button class="call-ctrl-btn" onclick="showToast('Camera flipped', 'info')" aria-label="Flip">📷</button>
      <button class="call-ctrl-btn hangup" onclick="endCall()" aria-label="Hang up">📞</button>
      <button class="call-ctrl-btn" onclick="showToast('Prescription notes opened', 'info')" aria-label="Notes">📝</button>
    </div>
  `;

  overlay.classList.add('active');

  clearInterval(callTimerInterval);
  callTimerInterval = setInterval(() => {
    callSeconds++;
    const m = String(Math.floor(callSeconds / 60)).padStart(2, '0');
    const s = String(callSeconds % 60).padStart(2, '0');
    const t = document.getElementById('call-timer-text');
    if (t) t.textContent = `${m}:${s}`;
  }, 1000);
}

function endCall() {
  clearInterval(callTimerInterval);
  const overlay = document.getElementById('call-overlay');
  if (overlay) overlay.classList.remove('active');
  showToast('Consultation ended. Clinical summary saved to Health Log.', 'success');
}

/* ═══════════════════════════════════════════════════════════════
   OWNER PROFILE SCREEN
═══════════════════════════════════════════════════════════════ */
function renderOwner() {
  const container = document.getElementById('owner-body');
  if (!container) return;

  const plan = PLAN_INFO[currentUser.plan] || PLAN_INFO[0];

  container.innerHTML = `
    <div class="owner-hero">
      <label class="owner-avatar" id="owner-avatar-wrap">
        ${currentUser.avatar ? `<img src="${currentUser.avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />` : `
          <svg class="owner-avatar-icon" viewBox="0 0 24 24">
            <path d="M12 2C8.69 2 6 4.69 6 8a5.98 5.98 0 0 0 1.94 4.38C5.23 13.9 3 16.59 3 20v2h18v-2c0-3.41-2.23-6.1-4.94-7.62A5.98 5.98 0 0 0 18 8c0-3.31-2.69-6-6-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
          </svg>
        `}
        <div class="avatar-edit-icon" onclick="document.getElementById('owner-photo-input').click()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="8" width="18" height="12" rx="2" />
            <circle cx="12" cy="14" r="3" />
            <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          </svg>
        </div>
      </label>
      <input type="file" id="owner-photo-input" accept="image/*" style="display:none;" onchange="handleOwnerPhotoUpload(event)">
      
      <div class="owner-name">${currentUser.name}</div>
      <div class="owner-email">${currentUser.email}</div>
      <button class="owner-plan-pill" onclick="goToPlans('screen-owner')">
        👑 ${plan.name} (${plan.short})
      </button>
    </div>

    <div class="owner-section">
      <div class="owner-row" onclick="editOwnerName()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="owner-row-icon">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
        <div class="owner-row-info">
          <div class="owner-row-label">Full Name</div>
          <div class="owner-row-val">${currentUser.name}</div>
        </div>
        <span style="font-size:12px;color:var(--teal);font-weight:700;">Edit</span>
      </div>

      <div class="owner-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="owner-row-icon">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        <div class="owner-row-info">
          <div class="owner-row-label">Email Address</div>
          <div class="owner-row-val">${currentUser.email}</div>
        </div>
      </div>

      <div class="owner-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="owner-row-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div class="owner-row-info">
          <div class="owner-row-label">Subscription Tier</div>
          <div class="owner-row-val">${plan.name} · ${billingCycle === 'yearly' ? 'Annual' : 'Monthly'}</div>
        </div>
        <button class="owner-upgrade-btn" onclick="goToPlans('screen-owner')">Change</button>
      </div>

      <div class="owner-row" onclick="goToScreen('screen-home')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="owner-row-icon">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <div class="owner-row-info">
          <div class="owner-row-label">Registered Pets</div>
          <div class="owner-row-val">${myPets.length} pets (${myPets.map(p=>p.name).join(', ')})</div>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;opacity:.35">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>

    <button class="btn-secondary owner-logout-btn" onclick="doLogout()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Sign Out
    </button>
  `;
}

function editOwnerName() {
  const newName = prompt('Enter new display name:', currentUser.name);
  if (newName && newName.trim()) {
    currentUser.name = newName.trim();
    renderOwner();
    showToast('Name updated successfully', 'success');
  }
}

function handleOwnerPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    currentUser.avatar = e.target.result;
    renderOwner();
    showToast('Profile photo updated!', 'success');
  };
  reader.readAsDataURL(file);
}

function doLogout() {
  showToast('Signed out of P Care', 'info');
  goToScreen('screen-auth');
}

/* ═══════════════════════════════════════════════════════════════
   TOAST, SHEET & CELEBRATION UTILITIES
═══════════════════════════════════════════════════════════════ */
function showToast(msg, type = 'info') {
  const stack = document.getElementById('toast-stack');
  if (!stack) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${msg}</span>`;
  stack.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 2800);
}

function openSheet(htmlContent) {
  const body = document.getElementById('sheet-body');
  const sheet = document.getElementById('sheet');
  const backdrop = document.getElementById('sheet-backdrop');

  if (body) body.innerHTML = htmlContent;
  if (sheet) sheet.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
}

function closeSheet() {
  const sheet = document.getElementById('sheet');
  const backdrop = document.getElementById('sheet-backdrop');
  if (sheet) sheet.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
}

function triggerConfetti() {
  const layer = document.getElementById('confetti');
  if (!layer) return;

  layer.innerHTML = '';
  const colors = ['#38bdf8', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (1.8 + Math.random() * 1.2) + 's';
    layer.appendChild(piece);
  }

  setTimeout(() => { layer.innerHTML = ''; }, 3200);
}

function renderAllViews() {
  renderHome();
  renderHealth();
  renderOwner();
}
