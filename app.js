// Ghost Kitchens in Action (GKIA) - Decentralized Tamale System Logic

// --- LANGUAGE DICTIONARY ---
const translations = {
  en: {
    navFranchise: "Join GKIA ($10k)",
    navMenu: "Tamales to Go",
    navDashboard: "CRM Dashboard",
    navClaude: "Claude AI Co-worker",
    navCalculator: "ROI Calculator",
    navMarketing: "Marketing Kit",
    heroTag: "Decentralized Restaurant Franchise Model",
    heroTitle: "Start Your Tamale Business for Just $10,000 USD",
    heroDesc: "A complete decentralized ghost kitchen setup. Get a brand package, consulting, CRM dashboard, local stay-at-home cook networks, and a MacBook Pro with M5 chip featuring Claude AI Co-worker integration.",
    btnGetStarted: "Get Started Now",
    btnLearnMore: "Explore Models",
    valuePropsTitle: "Why Decentralized Tamales?",
    valuePropsSubtitle: "Traditional restaurants cost $250k+ to start. Ghost Kitchens in Action puts you in business for a fraction of that.",
    prop1Title: "Low Entry Cost ($10k)",
    prop1Desc: "Covers brand licensing, local vendor partnerships, software setup, and hardware requirements (MacBook Pro M5).",
    prop2Title: "AI Integration with Claude",
    prop2Desc: "Claude Co-worker acts as your marketing manager, logistics dispatcher, and quality control inspector.",
    prop3Title: "Dual Supply Models",
    prop3Desc: "Partner with local bulk tamale factories or empower Hispanic stay-at-home cooks to automate production.",
    pkgTitle: "What's Included in the $10,000 Package?",
    pkg1: "Consulting & Brand Setup: Local entity registration and brand customization.",
    pkg2: "MacBook Pro with M5 Chip: High-performance AI hardware preconfigured.",
    pkg3: "Claude AI Co-worker Integration: Customized prompts, local hot-spot routing, and marketing strategy builders.",
    pkg4: "GKIA CRM Dashboard License: Manage cooks, mobile kitchens (roach coaches), and local delivery dispatch.",
    pkg5: "Coaching & Training: Brand building, local regulations compliance, and driver coordination setup.",
    b2cTitle: "Tamales to Go - Phoenix, AZ",
    b2cSubtitle: "Fresh, artisanal tamales prepared locally and delivered hot to your doorstep or mobile kitchen vendor.",
    btnOrderUber: "Order on Uber Eats",
    btnOrderGrub: "Order on Grubhub",
    btnOrderInsta: "Shop on Instacart",
    btnOrderLocal: "GKIA Local Delivery",
    calcTitle: "Interactive Profit & ROI Calculator",
    calcSubtitle: "Compare and model your decentralized tamale business metrics.",
    lblVolume: "Daily Tamale Volume Sold",
    lblCookCost: "At-Home Cook Production Cost",
    lblWholesaleSell: "Wholesale Price (to Roach Coaches)",
    lblRetailPrice: "Retail Selling Price (Uber Eats / Mobile)",
    lblBulkBuy: "Factory Bulk Purchase Price",
    resultsTitle: "Financial Projections Summary",
    resMargin: "Profit Margin per Tamale",
    resDailyProfit: "Estimated Daily Profit",
    resWeeklyProfit: "Estimated Weekly Profit",
    resAnnualProfit: "Estimated Annual Profit",
    resBreakEven: "Break-Even on $10k Investment",
    daysUnit: "days",
    crmTitle: "GKIA Partner & CRM Portal",
    crmSubtitle: "Monitor stays-at-home cooks, manage roach coaches, and dispatch delivery drivers in Phoenix.",
    metricActiveCooks: "Active Cooks",
    metricRoachCoaches: "Partner Roach Coaches",
    metricDailySales: "Today's Sales",
    metricPendingOrders: "Pending Dispatch",
    aiTitle: "Claude AI Co-worker Chat Console",
    aiSubtitle: "Your virtual marketing agent, quality control auditor, and Phoenix location specialist.",
    aiPresetTitle1: "Phoenix Casino Hotspots",
    aiPresetDesc1: "Late night sales strategy (10pm - 3am)",
    aiPresetTitle2: "Spanish FB Ad Copies",
    aiPresetDesc2: "Recruit cooks & food trucks",
    aiPresetTitle3: "Quality Control Checklist",
    aiPresetDesc3: "Standard for stay-at-home cooks",
    aiPresetTitle4: "Optimize UberEats Pricing",
    aiPresetDesc4: "Option A vs Option B comparison",
    aiInputPlaceholder: "Ask Claude about marketing, logistics, local supply...",
  },
  es: {
    navFranchise: "Únete a GKIA ($10k)",
    navMenu: "Tamales para Llevar",
    navDashboard: "Panel CRM",
    navClaude: "Claude Co-worker",
    navCalculator: "Calculadora de ROI",
    navMarketing: "Kit de Marketing",
    heroTag: "Modelo Descentralizado de Franquicia de Restaurantes",
    heroTitle: "Inicia tu Negocio de Tamales por solo $10,000 USD",
    heroDesc: "Un sistema de cocina fantasma descentralizado completo. Obtén paquete de marca, consultoría, panel CRM, redes de cocineras en casa y una MacBook Pro con chip M5 con integración de Claude AI Co-worker.",
    btnGetStarted: "Comenzar Ahora",
    btnLearnMore: "Explorar Modelos",
    valuePropsTitle: "¿Por qué Tamales Descentralizados?",
    valuePropsSubtitle: "Los restaurantes tradicionales cuestan más de $250k para iniciar. Ghost Kitchens in Action te pone en marcha por una fracción de eso.",
    prop1Title: "Bajo Costo de Entrada ($10k)",
    prop1Desc: "Cubre registro de marca, asociaciones con vendedores locales, configuración de software y hardware (MacBook Pro M5).",
    prop2Title: "Integración de IA con Claude",
    prop2Desc: "Claude Co-worker actúa como tu gerente de marketing, despachador de logística e inspector de control de calidad.",
    prop3Title: "Modelos de Suministro Dual",
    prop3Desc: "Asóciate con fábricas de tamales al por mayor o empodera a mamás hispanas que cocinan en casa para automatizar producción.",
    pkgTitle: "¿Qué Incluye el Paquete de $10,000?",
    pkg1: "Consultoría y Configuración: Registro de entidad local y personalización de marca.",
    pkg2: "MacBook Pro con Chip M5: Hardware de IA de alto rendimiento preconfigurado.",
    pkg3: "Integración de Claude AI Co-worker: Indicaciones personalizadas, rutas locales y creador de estrategias.",
    pkg4: "Licencia de Panel CRM GKIA: Administra cocineros, camiones de comida y despachos de entrega local.",
    pkg5: "Entrenamiento y Coaching: Construcción de marca, cumplimiento regulatorio y coordinación de choferes.",
    b2cTitle: "Tamales para Llevar - Phoenix, AZ",
    b2cSubtitle: "Tamales frescos y artesanales preparados localmente y entregados calientes a tu puerta o camión de comida.",
    btnOrderUber: "Pedir por Uber Eats",
    btnOrderGrub: "Pedir por Grubhub",
    btnOrderInsta: "Comprar en Instacart",
    btnOrderLocal: "Entrega Local GKIA",
    calcTitle: "Calculadora Interactiva de Ganancias y ROI",
    calcSubtitle: "Compara y modela las métricas de tu negocio descentralizado de tamales.",
    lblVolume: "Volumen Diario de Tamales Vendidos",
    lblCookCost: "Costo de Producción (Cocinera en Casa)",
    lblWholesaleSell: "Precio de Venta a Roach Coaches",
    lblRetailPrice: "Precio de Venta al Público (Uber/Móvil)",
    lblBulkBuy: "Precio de Compra al por Mayor (Fábrica)",
    resultsTitle: "Resumen de Proyecciones Financieras",
    resMargin: "Margen de Ganancia por Tamal",
    resDailyProfit: "Ganancia Diaria Estimada",
    resWeeklyProfit: "Ganancia Semanal Estimada",
    resAnnualProfit: "Ganancia Anual Estimada",
    resBreakEven: "Retorno de Inversión de $10k",
    daysUnit: "días",
    crmTitle: "Portal CRM & Socios de GKIA",
    crmSubtitle: "Monitorea cocineras en casa, administra camiones de comida y despacha repartidores en Phoenix.",
    metricActiveCooks: "Cocineras Activas",
    metricRoachCoaches: "Camiones Asociados",
    metricDailySales: "Ventas de Hoy",
    metricPendingOrders: "Pendientes de Despacho",
    aiTitle: "Consola de Claude AI Co-worker",
    aiSubtitle: "Tu agente virtual de marketing, auditor de calidad y especialista en ubicaciones de Phoenix.",
    aiPresetTitle1: "Puntos Clave: Casinos en Phoenix",
    aiPresetDesc1: "Estrategia nocturna (10pm - 3am)",
    aiPresetTitle2: "Copias de Anuncios FB (Español)",
    aiPresetDesc2: "Reclutar cocineras y camiones",
    aiPresetTitle3: "Lista de Control de Calidad",
    aiPresetDesc3: "Estándar para cocineras en casa",
    aiPresetTitle4: "Optimizar Precios en UberEats",
    aiPresetDesc4: "Comparativa Opción A vs Opción B",
    aiInputPlaceholder: "Pregunta a Claude sobre marketing, logística, suministros...",
  }
};

let currentLanguage = 'en';
const API_BASE = window.location.origin;

// --- FALLBACK LOCAL STATE (if Backend Offline) ---
let systemState = {
  activeTab: 'franchise',
  calculatorModel: 'homeCook',
  todaySales: 602.00,
  activeCooksCount: 2,
  activeRoachCoachesCount: 3,
  cooks: [
    { id: 'cook-1', name: "Maria Sanchez", location: "Maryvale, Phoenix", rating: 4.9, activeBatch: 120, status: "active" },
    { id: 'cook-2', name: "Elena Rodriguez", location: "South Phoenix", rating: 4.8, activeBatch: 0, status: "pending" },
    { id: 'cook-3', name: "Juana Martinez", location: "Glendale, AZ", rating: 4.9, activeBatch: 80, status: "active" }
  ],
  mobileKitchens: [
    { id: 'truck-1', name: "Antojitos El Sol", contact: "Jose L.", stock: 45, status: "active" },
    { id: 'truck-2', name: "Phoenix Taco Express", contact: "Mateo R.", stock: 12, status: "active" },
    { id: 'truck-3', name: "Tamales Don Lupe", contact: "Lupe H.", stock: 80, status: "active" }
  ],
  drivers: [
    { id: 'driver-1', name: "Carlos Perez", status: "delivering", vehicle: "Honda Civic" },
    { id: 'driver-2', name: "Miguel Torres", status: "idle", vehicle: "Toyota Prius" },
    { id: 'driver-3', name: "Sofia Gomez", status: "offline", vehicle: "E-Bike" }
  ],
  orders: [
    { id: 'G-1004', customer: "Roberto D.", destination: "Desert Diamond Casino Parking Lot", source: "Uber Eats", items: "12x Pork Red Tamales", total: 84.00, status: "pending" },
    { id: 'G-1003', customer: "Sandra L.", destination: "Maryvale Residential", source: "Instacart", items: "24x Sweet Corn Tamales", total: 168.00, status: "completed" },
    { id: 'G-1002', customer: "Casino Arizona Lounge", destination: "Loop 101 & McKellips", source: "GKIA App", items: "50x Beef Green Tamales", total: 350.00, status: "completed" }
  ]
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initLanguage();
  initCalculator();
  initCRM();
  initClaude();
  initMarketingKit();
  initFAQ();
  
  // Sync state from server on load
  syncStateWithServer().then(() => {
    updateCalculator();
  });
  
  // Poll state every 5 seconds
  setInterval(syncStateWithServer, 5000);
});

// --- API SYNC LOGIC ---
async function syncStateWithServer() {
  try {
    const res = await fetch(`${API_BASE}/api/state`);
    if (res.ok) {
      const data = await res.json();
      systemState.todaySales = data.todaySales;
      systemState.activeCooksCount = data.activeCooksCount;
      systemState.activeRoachCoachesCount = data.activeRoachCoachesCount;
      systemState.cooks = data.cooks;
      systemState.mobileKitchens = data.mobileKitchens;
      systemState.drivers = data.drivers;
      systemState.orders = data.orders;
      
      updateDashboardMetrics();
      renderSidebarTrackers();
      if (systemState.activeTab === 'dashboard') {
        renderCRMTable();
      }
    }
  } catch (err) {
    console.warn("Backend offline. Running in browser-local fallback mode.", err);
  }
}

// --- NAVIGATION LOGIC ---
function initNavigation() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const viewId = tab.dataset.view;
      switchView(viewId);
    });
  });
}

function switchView(viewId) {
  systemState.activeTab = viewId;
  const sections = document.querySelectorAll(".view-section");
  sections.forEach(section => {
    section.classList.remove("active");
    if (section.id === `view-${viewId}`) {
      section.classList.add("active");
    }
  });
  
  if (viewId === 'dashboard') {
    syncStateWithServer().then(() => {
      renderCRMTable();
    });
  }
}

// --- LANGUAGE SWITCHER LOGIC ---
function initLanguage() {
  const langBtns = document.querySelectorAll(".lang-btn");
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      langBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentLanguage = btn.dataset.lang;
      applyTranslations();
    });
  });
  applyTranslations();
}

function applyTranslations() {
  const dict = translations[currentLanguage];
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach(el => {
    const key = el.dataset.translate;
    if (dict[key]) {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });
  updateCalculator();
  renderCRMTable();
}

// --- FAQ ACCORDION LOGIC ---
function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains("active");
      
      // Close all items
      document.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("active");
      });
      
      // If clicked item was not active, expand it
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// --- ROI CALCULATOR LOGIC ---
function initCalculator() {
  const optButtons = document.querySelectorAll(".calc-opt-btn");
  optButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      optButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      systemState.calculatorModel = btn.dataset.model;
      
      if (systemState.calculatorModel === 'homeCook') {
        document.getElementById("group-cook-cost").style.display = "flex";
        document.getElementById("group-wholesale-sell").style.display = "flex";
        document.getElementById("group-bulk-buy").style.display = "none";
        
        document.getElementById("calc-volume").value = 150;
        document.getElementById("calc-retail").value = 7.00;
      } else {
        document.getElementById("group-cook-cost").style.display = "none";
        document.getElementById("group-wholesale-sell").style.display = "none";
        document.getElementById("group-bulk-buy").style.display = "flex";
        
        document.getElementById("calc-volume").value = 250;
        document.getElementById("calc-retail").value = 8.50;
      }
      updateCalculator();
    });
  });
  
  const sliders = document.querySelectorAll(".calc-slider");
  sliders.forEach(slider => {
    slider.addEventListener("input", (e) => {
      const valSpan = document.getElementById(`${e.target.id}-val`);
      if (e.target.id === 'calc-volume' || e.target.id === 'calc-coaches') {
        valSpan.textContent = e.target.value;
      } else {
        valSpan.textContent = `$${parseFloat(e.target.value).toFixed(2)}`;
      }
      updateCalculator();
    });
  });
}

function updateCalculator() {
  const dict = translations[currentLanguage];
  const volume = parseFloat(document.getElementById("calc-volume").value);
  const retailPrice = parseFloat(document.getElementById("calc-retail").value);
  const coaches = parseFloat(document.getElementById("calc-coaches").value);
  
  let costPerUnit = 0;
  let salePerUnit = 0;
  let profitPerUnit = 0;
  let dailyProfit = 0;
  
  if (systemState.calculatorModel === 'homeCook') {
    const cookCost = parseFloat(document.getElementById("calc-cook-cost").value);
    const wholesalePrice = parseFloat(document.getElementById("calc-wholesale-sell").value);
    
    const wholesaleVolume = volume * 0.7;
    const retailVolume = volume * 0.3;
    
    const wholesaleProfit = (wholesalePrice - cookCost) * wholesaleVolume;
    const retailProfit = (retailPrice - cookCost) * retailVolume;
    
    dailyProfit = (wholesaleProfit + retailProfit) * coaches;
    costPerUnit = cookCost;
    const avgSellingPrice = (wholesalePrice * 0.7) + (retailPrice * 0.3);
    profitPerUnit = avgSellingPrice - costPerUnit;
  } else {
    const bulkBuyPrice = parseFloat(document.getElementById("calc-bulk-buy").value);
    costPerUnit = bulkBuyPrice;
    salePerUnit = retailPrice;
    profitPerUnit = salePerUnit - costPerUnit;
    dailyProfit = profitPerUnit * volume * coaches;
  }
  
  const weeklyProfit = dailyProfit * 7;
  const monthlyProfit = dailyProfit * 30;
  const annualProfit = dailyProfit * 365;
  const entryFee = 10000;
  
  const breakEvenDays = Math.ceil(entryFee / dailyProfit);
  
  document.getElementById("res-margin").textContent = `$${profitPerUnit.toFixed(2)}`;
  document.getElementById("res-daily").textContent = `$${dailyProfit.toFixed(2)}`;
  document.getElementById("res-weekly").textContent = `$${weeklyProfit.toFixed(2)}`;
  document.getElementById("res-annual").textContent = `$${annualProfit.toLocaleString('en-US', {maximumFractionDigits:0})}`;
  
  const breakEvenText = breakEvenDays > 365 
    ? `${(breakEvenDays / 365).toFixed(1)} years` 
    : `${breakEvenDays} ${dict.daysUnit || 'days'}`;
  document.getElementById("res-breakeven").textContent = breakEvenText;
  
  const percentage = Math.min(100, Math.max(0, (dailyProfit * 30 / entryFee) * 100));
  document.getElementById("roi-progress-fill").style.width = `${percentage}%`;
  document.getElementById("roi-percentage-label").textContent = `${percentage.toFixed(0)}% ROI in Month 1`;
}

// --- CRM & DASHBOARD LOGIC ---
function initCRM() {
  setInterval(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/new`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        showToast(data.message);
        syncStateWithServer();
      }
    } catch (e) {
      if (Math.random() > 0.7) {
        simulateLocalNewOrder();
      }
    }
  }, 18000);
  
  document.getElementById("btn-crm-dispatch").addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/dispatch`, { method: 'POST' });
      const data = await res.json();
      showToast(data.message, data.success ? "success" : "warning");
      syncStateWithServer();
    } catch (err) {
      dispatchDriverLocal();
    }
  });

  document.getElementById("btn-crm-cook").addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cooks/batch`, { method: 'POST' });
      const data = await res.json();
      showToast(data.message, data.success ? "success" : "warning");
      syncStateWithServer();
    } catch (err) {
      assignCookBatchLocal();
    }
  });

  document.getElementById("btn-crm-restock").addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_BASE}/api/kitchens/restock`, { method: 'POST' });
      const data = await res.json();
      showToast(data.message, data.success ? "success" : "warning");
      syncStateWithServer();
    } catch (err) {
      restockRoachCoachLocal();
    }
  });
}

function simulateLocalNewOrder() {
  const names = ["Arthur M.", "Lucia G.", "Juan C.", "Phoenix Hotel", "Casino Guest"];
  const destinations = ["Casino Arizona Valet", "Tempe Marketplace", "Old Town Scottsdale"];
  const products = ["12x Pork Red Tamales", "24x Sweet Corn Tamales"];
  const prices = [84.00, 168.00];
  
  const orderId = `G-${1005 + systemState.orders.length}`;
  const newOrder = {
    id: orderId,
    customer: names[Math.floor(Math.random() * names.length)],
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    source: "Uber Eats",
    items: products[Math.floor(Math.random() * products.length)],
    total: prices[Math.floor(Math.random() * prices.length)],
    status: "pending"
  };
  
  systemState.orders.unshift(newOrder);
  systemState.todaySales += newOrder.total;
  showToast(`New order ${orderId} received locally!`);
  renderCRMTable();
}

function dispatchDriverLocal() {
  const pendingOrder = systemState.orders.find(o => o.status === 'pending');
  if (pendingOrder) {
    const idleDriver = systemState.drivers.find(d => d.status === 'idle');
    if (idleDriver) {
      pendingOrder.status = 'delivering';
      idleDriver.status = 'delivering';
      showToast(`Driver ${idleDriver.name} dispatched locally!`);
      renderCRMTable();
    } else {
      showToast("No idle drivers available locally!", "warning");
    }
  } else {
    showToast("No pending orders.");
  }
}

function assignCookBatchLocal() {
  const targetCook = systemState.cooks.find(c => c.status === 'active' && c.activeBatch === 0);
  if (targetCook) {
    targetCook.activeBatch = 100;
    showToast(`Assigned batch to ${targetCook.name} locally.`);
    renderSidebarTrackers();
  } else {
    showToast("All cooks cooking locally.");
  }
}

function restockRoachCoachLocal() {
  systemState.mobileKitchens.sort((a,b) => a.stock - b.stock);
  systemState.mobileKitchens[0].stock += 50;
  showToast(`Restocked ${systemState.mobileKitchens[0].name} locally.`);
  renderSidebarTrackers();
}

function renderCRMTable() {
  const tbody = document.getElementById("crm-orders-body");
  if (!tbody) return;
  tbody.innerHTML = "";
  
  systemState.orders.forEach(order => {
    const tr = document.createElement("tr");
    let statusBadge = "";
    if (order.status === 'pending') {
      statusBadge = `<span class="badge badge-gold">Pending</span>`;
    } else if (order.status === 'delivering') {
      statusBadge = `<span class="badge badge-primary">In Transit</span>`;
    } else {
      statusBadge = `<span class="badge badge-accent">Completed</span>`;
    }
    
    tr.innerHTML = `
      <td><strong>${order.id}</strong></td>
      <td>${order.customer}</td>
      <td>${order.destination}</td>
      <td>${order.items}</td>
      <td><strong>$${order.total.toFixed(2)}</strong></td>
      <td>${order.source}</td>
      <td>${statusBadge}</td>
    `;
    tbody.appendChild(tr);
  });
  updateDashboardMetrics();
  renderSidebarTrackers();
}

function updateDashboardMetrics() {
  document.getElementById("m-sales").textContent = `$${systemState.todaySales.toFixed(2)}`;
  const pendingCount = systemState.orders.filter(o => o.status === 'pending').length;
  document.getElementById("m-pending").textContent = pendingCount;
  document.getElementById("m-cooks").textContent = systemState.cooks.filter(c => c.status === 'active').length;
  document.getElementById("m-trucks").textContent = systemState.mobileKitchens.filter(t => t.status === 'active').length;
}

function renderSidebarTrackers() {
  const cooksContainer = document.getElementById("active-cooks-list");
  if (cooksContainer) {
    cooksContainer.innerHTML = "";
    systemState.cooks.forEach(cook => {
      const isCooking = cook.activeBatch > 0;
      const statusDot = isCooking ? 'status-active' : (cook.status === 'pending' ? 'status-pending' : 'status-offline');
      const statusText = isCooking ? `Cooking (${cook.activeBatch})` : (cook.status === 'pending' ? 'Standby' : 'Offline');
      
      cooksContainer.innerHTML += `
        <div class="cook-card">
          <div class="cook-info">
            <span class="cook-name">${cook.name}</span>
            <span class="text-muted" style="font-size: 0.75rem;">${cook.location} • ★ ${cook.rating}</span>
          </div>
          <div>
            <span class="status-dot ${statusDot}"></span>
            <span style="font-size: 0.8rem; font-weight: 500;">${statusText}</span>
          </div>
        </div>
      `;
    });
  }
  
  const driversContainer = document.getElementById("active-drivers-list");
  if (driversContainer) {
    driversContainer.innerHTML = "";
    systemState.drivers.forEach(driver => {
      const statusDot = driver.status === 'delivering' ? 'status-active' : (driver.status === 'idle' ? 'status-pending' : 'status-offline');
      const statusText = driver.status === 'delivering' ? 'Delivering' : (driver.status === 'idle' ? 'Available' : 'Offline');
      
      driversContainer.innerHTML += `
        <div class="driver-card">
          <div class="driver-info">
            <span class="driver-name">${driver.name}</span>
            <span class="text-muted" style="font-size: 0.75rem;">${driver.vehicle}</span>
          </div>
          <div>
            <span class="status-dot ${statusDot}"></span>
            <span style="font-size: 0.8rem; font-weight: 500;">${statusText}</span>
          </div>
        </div>
      `;
    });
  }
}

// --- CLAUDE AI CO-WORKER LOGIC ---
const localAIFallbacks = {
  casinos: "### 🌙 Phoenix Late-Night Casino Hotspot Strategy (10 PM - 3 AM)\n\nTargeting casino corridors around Phoenix metro areas using mobile trucks...",
  ads: "### 📱 High-Converting Spanish Facebook Ad Copy templates\n\nRecruiting cocineras en casa y camiones de comida...",
  quality: "### 📋 Stay-at-Home Cook Quality Control Checklist\n\nChecklist:\n1. Masa floats in water.\n2. Internal Temp 165°F.\n3. GKIA thermal bag.",
  pricing: "### 💰 GKIA Financial Optimization: Option A vs Option B\n\nOption A yields higher margins ($1.50 - $4.00), Option B is commercial bulk factory buying."
};

function initClaude() {
  const sendBtn = document.getElementById("ai-send-btn");
  const chatInput = document.getElementById("ai-chat-input");
  
  sendBtn.addEventListener("click", () => { handleUserMessage(); });
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') handleUserMessage();
  });
  
  const presets = document.querySelectorAll(".preset-btn");
  presets.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      let promptText = "";
      if (type === 'casinos') promptText = "Review Phoenix Casino Hotspots strategy.";
      if (type === 'ads') promptText = "Generate Spanish Facebook Ad copy.";
      if (type === 'quality') promptText = "Generate Quality Control checklist.";
      if (type === 'pricing') promptText = "Compare Option A vs Option B optimization.";
      
      appendMessage('user', promptText);
      simulateClaudeReply(type);
    });
  });
}

function handleUserMessage() {
  const chatInput = document.getElementById("ai-chat-input");
  const text = chatInput.value.trim();
  if (!text) return;
  
  appendMessage('user', text);
  chatInput.value = "";
  
  let matchType = 'default';
  const query = text.toLowerCase();
  
  // STATS QUERY CHECK FIRST (resolves keyword collision)
  if (query.includes("stats") || query.includes("how many") || query.includes("status") || query.includes("sales") || query.includes("today")) {
    matchType = 'stats';
  } else if (query.includes("casino") || query.includes("phoenix") || query.includes("night") || query.includes("late")) {
    matchType = 'casinos';
  } else if (query.includes("ad") || query.includes("anuncio") || query.includes("facebook") || query.includes("marketing")) {
    matchType = 'ads';
  } else if (query.includes("quality") || query.includes("checklist") || query.includes("calidad") || query.includes("hygiene")) {
    matchType = 'quality';
  } else if (query.includes("price") || query.includes("cost") || query.includes("wholesale") || query.includes("margin") || query.includes("calculator")) {
    matchType = 'pricing';
  }
  
  simulateClaudeReply(matchType, text);
}

function appendMessage(sender, text) {
  const container = document.getElementById("ai-chat-messages");
  if (!container) return;
  
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble bubble-${sender}`;
  
  if (sender === 'bot') {
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')
      .replace(/# (.*?)\n/g, '<h1>$1</h1>')
      .replace(/\* (.*?)\n/g, '<li>$1</li>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
      
    if (formattedText.includes("<li>")) {
      formattedText = formattedText.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    }
    formattedText = formattedText.replace(/```text\n(.*?)\n```/gs, '<pre>$1</pre>');
    formattedText = formattedText.replace(/```html\n(.*?)\n```/gs, '<pre>$1</pre>');
    
    bubble.innerHTML = formattedText;
  } else {
    bubble.textContent = text;
  }
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

async function simulateClaudeReply(type, userText = "") {
  const indicator = document.getElementById("ai-typing-indicator");
  indicator.style.display = "block";
  const container = document.getElementById("ai-chat-messages");
  container.scrollTop = container.scrollHeight;
  
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userText || type })
    });
    
    if (res.ok) {
      const data = await res.json();
      setTimeout(() => {
        indicator.style.display = "none";
        appendMessage('bot', data.reply);
      }, 1000);
    } else {
      throw new Error();
    }
  } catch (err) {
    // Local Fallback
    setTimeout(() => {
      indicator.style.display = "none";
      let reply = "";
      if (type === 'stats') {
        const activeCooks = systemState.cooks.filter(c => c.status === 'active').length;
        const idleDrivers = systemState.drivers.filter(d => d.status === 'idle').length;
        const pendingOrders = systemState.orders.filter(o => o.status === 'pending').length;
        const totalToday = systemState.todaySales;
        
        reply = `### GKIA Live Database Assistant (Local Fallback)\n\nHere is a summary of the current local backend metrics:\n\n*   **Today's Revenue**: \`$${totalToday.toFixed(2)} USD\`\n*   **Active Cooks**: \`${activeCooks}\` cooks preparing batches\n*   **Pending Orders**: \`${pendingOrders}\` orders waiting for dispatch\n*   **Available Drivers**: \`${idleDrivers}\` idle drivers\n\nModify states in the CRM Dashboard to see these values update!`;
      } else {
        reply = localAIFallbacks[type] || `Hello, I'm Claude. (Local Fallback) Received query: "${userText}". Go to the ROI Calculator and CRM tabs to configure GKIA details!`;
      }
      appendMessage('bot', reply);
    }, 1200);
  }
}

// --- MARKETING KIT LOGIC ---
const marketingTemplates = {
  fb_es_cooks: `¡GANA DINERO DESDE CASA COCINANDO TAMALES! 👩‍🍳🫔\n¿Eres ama de casa en Phoenix y sabes preparar unos tamales riquísimos? Únete al programa Ghost Kitchens in Action y genera ingresos estables apoyando a tu familia.\n\n¿Cómo funciona?\n1. Tú cocinas los tamales en la comodidad de tu hogar.\n2. Nosotros te conseguimos los pedidos y enviamos a repartidores locales a recogerlos.\n3. Te pagamos $3.00 USD por tamal. Con un costo de preparación de solo $1.20 - $1.50 USD, ¡tu ganancia es de más del 100%!\n\nHaz clic abajo y chatea con nuestro equipo para registrar tu cocina. ¡Cupos limitados en el área de Maryvale y South Phoenix!`,
  fb_en_trucks: `BOOST YOUR FOOD TRUCK DAILY SALES WITH READY-TO-SERVE TAMALES! 🫔🚚\nLooking to capture the late-night crowd in Phoenix without spending hours prepping masa? Partner with Ghost Kitchens in Action.\n\nWhat you get:\n✅ Premium, hand-crafted tamales delivered wholesale to your truck for just $3.00 each.\n✅ Easy retail pricing at $7.00 - $8.00, yielding a massive $4.00+ net margin per unit.\n✅ Heat-and-serve ready. Attract hungry customers from 10 PM to 3 AM.\n✅ Complete local delivery integrations via Uber Eats & Grubhub built-in.\n\nTap 'Learn More' to claim a free sample batch for your roach coach today!`,
  sms_order_placed: `GKIA Alert: Fresh tamales are on the way! Your order #{order_id} from Tamales to Go has been received. Our driver is picking them up from Mom's Kitchen now. Support local Hispanic cooks!`,
  sms_driver_onway: `GKIA Delivery: Your driver {driver_name} is on the way to {destination} with your hot tamales. ETA is 12 mins. Enjoy! Track live: gkia.to/track`,
  sms_cook_alert: `GKIA Cocina: Hola {cook_name}, tenemos un pedido grande de {quantity} tamales para despacho. Por favor, empácalos en la bolsa térmica GKIA. Repartidor en camino.`
};

function initMarketingKit() {
  const kitBtns = document.querySelectorAll(".kit-sel-btn");
  kitBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      kitBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const templateId = btn.dataset.template;
      renderMarketingTemplate(templateId);
    });
  });
  
  // Set up copy button event with fallback for headless browsers
  document.getElementById("btn-copy-template").addEventListener("click", () => {
    const textBox = document.getElementById("template-text-box");
    const textToCopy = textBox.textContent;
    
    const copyToClipboard = (text) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        } finally {
          document.body.removeChild(textarea);
        }
      }
    };

    copyToClipboard(textToCopy).then(() => {
      const copyBtn = document.getElementById("btn-copy-template");
      copyBtn.classList.add("copy-success");
      copyBtn.innerHTML = `<span>✓ Copied!</span>`;
      showToast("Template copied to clipboard!");
      setTimeout(() => {
        copyBtn.classList.remove("copy-success");
        copyBtn.innerHTML = `<span>📋 Copy Template</span>`;
      }, 2000);
    }).catch(err => {
      console.warn("Clipboard copy failed. Showing fallback toast.", err);
      showToast("Copy triggered! (Using browser fallback)");
    });
  });
  
  renderMarketingTemplate('fb_es_cooks');
}

function renderMarketingTemplate(templateId) {
  const text = marketingTemplates[templateId];
  document.getElementById("template-text-box").textContent = text;
}

// --- UTILS ---
function showToast(message, type = "success") {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  
  toast.textContent = message;
  toast.style.background = type === "success" ? "var(--color-accent)" : (type === "warning" ? "var(--color-secondary)" : "var(--color-danger)");
  toast.style.display = "block";
  
  setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}
