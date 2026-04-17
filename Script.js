const diseases = [
  {
    name: "Flu",
    symptoms: ["cough", "tiredness", "sore throat", "fever", "runny nose", "headache", "body aches"],
    medication: "Paracetamol, flu tablets",
    prevention: "Drink warm fluids, rest, and wash hands regularly.",
    video: "https://youtu.be/MfX6xGdQco0?si=RDFRL9z34yDXBngW",
    description: "A common viral infection that affects the nose, throat, and lungs."
  },
  {
    name: "Common Cold",
    symptoms: ["sneezing", "runny nose", "sore throat", "cough", "mild fever", "headache"],
    medication: "Rest, fluids, decongestants, throat lozenges",
    prevention: "Wash hands, cover coughs, and avoid close contact with sick people.",
    video: "https://youtu.be/BGTsyYQq0xs?si=34YrWFl0Mmeh74Am",
    description: "A mild viral infection of the upper respiratory tract."
  },
  {
    name: "COVID-19",
    symptoms: ["fever", "cough", "tiredness", "loss of taste or smell", "shortness of breath", "sore throat"],
    medication: "Seek medical care; follow local health guidelines and supportive treatment.",
    prevention: "Vaccination, wear masks in crowded places, and maintain physical distance.",
    video: "https://youtu.be/eDtKGF9xDLQ?si=lnEK74lA5jG_Fz0N",
    description: "A respiratory illness caused by the SARS-CoV-2 virus."
  },
  {
    name: "Asthma",
    symptoms: ["shortness of breath", "wheezing", "chest tightness", "coughing"],
    medication: "Inhalers (bronchodilators), corticosteroids",
    prevention: "Avoid triggers, follow an asthma action plan, and use medications as prescribed.",
    video: "https://youtu.be/KM72Bo59Isg?si=vaxhybwkLnQbHXJH",
    description: "A chronic lung condition that causes airways to narrow and swell."
  },
  {
    name: "Migraine",
    symptoms: ["headache", "nausea", "sensitivity to light", "sensitivity to sound", "aura"],
    medication: "Pain relievers, triptans, and anti-nausea medication",
    prevention: "Manage stress, avoid triggers, and maintain a regular sleep schedule.",
    video: "https://youtu.be/UqEQmrBlewM?si=8PZFXsX74CRDkSxJ",
    description: "A neurological condition that causes intense, recurring headaches."
  },
  {
    name: "Food Poisoning",
    symptoms: ["vomiting", "stomach pain", "tiredness", "diarrhea", "nausea"],
    medication: "Oral rehydration salts",
    prevention: "Eat clean food and wash hands.",
    video: "https://youtu.be/BCRW2o15qsQ?si=qHpezSjXAu2rG6Lu",
    description: "Often caused by contaminated food or water."
  },
  {
    name: "Malaria",
    symptoms: ["fever", "chills", "sweating", "headache", "muscle pain", "nausea"],
    medication: "Antimalarial drugs prescribed by a doctor",
    prevention: "Use mosquito nets and repellents.",
    video: "https://youtu.be/GZsjHXUjRlM?si=-IKQ1LalnwMyRCfH",
    description: "A parasitic infection transmitted by mosquitoes."
  },
  {
    name: "HIV/AIDS",
    symptoms: ["weight loss", "fever", "night sweats", "fatigue", "recurrent infections", "swollen lymph nodes"],
    medication: "Antiretroviral therapy (ART)",
    prevention: "Practice safe sex and avoid sharing needles.",
    video: "https://youtu.be/lowauFSefOM?si=QOHGfZSfxhpGM8JC",
    description: "A virus that attacks the immune system over time."
  },
  {
    name: "Tuberculosis",
    symptoms: ["persistent cough", "chest pain", "fever", "night sweats", "weight loss", "coughing blood"],
    medication: "Antibiotics (DOTS regimen)",
    prevention: "Early diagnosis and treatment, BCG vaccination.",
    video: "https://youtu.be/oh8b0WOOZPM?si=yAl6oVdkZfIRxqzD",
    description: "A bacterial infection that mostly affects the lungs."
  },
  {
    name: "Cholera",
    symptoms: ["watery diarrhea", "vomiting", "dehydration", "muscle cramps", "rapid heart rate"],
    medication: "Oral rehydration solution (ORS), antibiotics in severe cases",
    prevention: "Drink clean water and maintain sanitation.",
    video: "https://youtu.be/kuliQhjco9g?si=DATdM6H_hZJCQW0M",
    description: "A bacterial infection causing severe dehydration."
  },
  {
    name: "Chickenpox",
    symptoms: ["fever", "itchy rash", "blisters", "fatigue"],
    medication: "Antihistamines, calamine lotion, antiviral medication in severe cases",
    prevention: "Vaccination (varicella vaccine)",
    video: "https://youtu.be/UjWiqMut81A?si=_Ug02rFoMaGHr3qO",
    description: "A viral infection that causes an itchy, blister-like rash."
  },
  {
    name: "Genital Herpes",
    symptoms: ["painful blisters", "itching", "burning sensation"],
    medication: "Antiviral drugs (acyclovir, valacyclovir)",
    prevention: "Avoid sexual contact during outbreaks, use protection.",
    video: "https://youtu.be/j2_vdpPuivE?si=z22nwBElcX0klQaO",
    description: "A common viral infection causing recurrent sores."
  }
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function getById(id) {
  return document.getElementById(id);
}

function setYear() {
  const yearEl = getById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function setStoredPatientInfo() {
  const age    = localStorage.getItem("age");
  const sex    = localStorage.getItem("sex");
  const weight = localStorage.getItem("weight");

  if (age && sex && weight) {
    const form = getById("patientForm");
    if (!form) return;
    form.querySelector("#age").value    = age;
    form.querySelector("#sex").value    = sex;
    form.querySelector("#weight").value = weight;
  }
}

// ─── Patient form ─────────────────────────────────────────────────────────────

function handlePatientFormSubmit(event) {
  event.preventDefault();

  const age    = getById("age").value.trim();
  const sex    = getById("sex").value.trim();
  const weight = getById("weight").value.trim();

  const ageError    = getById("ageError");
  const sexError    = getById("sexError");
  const weightError = getById("weightError");

  ageError.textContent    = "";
  sexError.textContent    = "";
  weightError.textContent = "";

  let valid = true;

  if (!age)                           { ageError.textContent    = "Required"; valid = false; }
  if (!sex)                           { sexError.textContent    = "Required"; valid = false; }
  if (!weight || Number(weight) <= 0) { weightError.textContent = "Required (must be greater than 0)"; valid = false; }

  if (!valid) return;

  localStorage.setItem("age",    age);
  localStorage.setItem("sex",    sex);
  localStorage.setItem("weight", weight);

  window.location.href = "index2.html";
}

// ─── Symptom helpers ──────────────────────────────────────────────────────────

function filterSymptoms(symptoms) {
  return symptoms.map((s) => s.toLowerCase().trim()).filter(Boolean);
}

// ─── Rule-based diagnosis ─────────────────────────────────────────────────────

function ruleBased(userSymptoms) {
  return diseases
    .map((d) => {
      const matched      = d.symptoms.filter((s) => userSymptoms.includes(s));
      const matchCount   = matched.length;
      const matchPercent = Math.round((matchCount / d.symptoms.length) * 100);
      const userCoverage = Math.round((matchCount / userSymptoms.length) * 100);
      return { disease: d, matchCount, matchPercent, userCoverage, matchedSymptoms: matched };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent || b.matchCount - a.matchCount);
}

function renderResults(matches) {
  const resultEl  = getById("result");
  const loadingEl = getById("loading");

  if (!resultEl) return;
  if (loadingEl) loadingEl.textContent = "";

  if (!matches.length) {
    resultEl.innerHTML = `<p>No diseases matched your symptoms. Please consult a doctor.</p>`;
    return;
  }

  resultEl.innerHTML = matches
    .slice(0, 4)
    .map(({ disease, matchPercent, userCoverage, matchCount, matchedSymptoms }) => `
      <div class="disease-card" style="
        background: rgba(255,255,255,0.92);
        border: 1px solid rgba(11,110,172,0.2);
        border-radius: 14px;
        padding: 1.25rem 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 8px 24px rgba(15,23,42,0.08);
      ">
        <h3 style="margin-top:0; color: #064c74;">${disease.name}</h3>
        <p><strong>Match:</strong> ${matchPercent}% of disease symptoms (${matchCount}/${disease.symptoms.length})</p>
        <p><strong>Your symptoms covered:</strong> ${userCoverage}%</p>
        <p><strong>Matched symptoms:</strong> ${matchedSymptoms.join(", ")}</p>
        <p><strong>Suggested medication:</strong> ${disease.medication}</p>
        <p><strong>Prevention:</strong> ${disease.prevention}</p>
      </div>
    `)
    .join("");
}

// ─── Diagnosis form ───────────────────────────────────────────────────────────

function handleDiagnosisFormSubmit(event) {
  event.preventDefault();

  const symptomInput  = getById("symptoms");
  const symptomsError = getById("symptomsError");

  if (!symptomInput || !symptomsError) return;

  symptomsError.textContent = "";

  const symptoms = filterSymptoms(symptomInput.value.split(","));

  if (!symptoms.length) {
    symptomsError.textContent = "Please enter at least one symptom.";
    return;
  }

  const matches = ruleBased(symptoms);
  renderResults(matches);
}

// ─── Disease cards & modal ────────────────────────────────────────────────────

function getYouTubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    const host   = parsed.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) return url;
      const v = parsed.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
  } catch {
    // Not a valid URL
  }
  return null;
}

function createVideoEmbedHtml(videoSrc) {
  if (!navigator.onLine) {
    return "<p>Video requires an internet connection to load.</p>";
  }

  const embedUrl = getYouTubeEmbedUrl(videoSrc);

  if (embedUrl) {
    return `
      <div class="video-wrapper">
        <iframe
          src="${embedUrl}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `;
  }

  return `
    <video controls width="100%" preload="metadata">
      <source src="${videoSrc}" type="video/mp4">
      Your browser does not support embedded videos.
    </video>
  `;
}

function openModal(disease) {
  const modal          = getById("diseaseModal");
  const title          = getById("modalTitle");
  const description    = getById("modalDescription");
  const videoContainer = getById("modalVideoContainer");

  if (!modal || !title || !description || !videoContainer) return;

  title.textContent        = disease.name;
  description.textContent  = disease.description;
  videoContainer.innerHTML = createVideoEmbedHtml(disease.video);

  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = getById("diseaseModal");
  if (!modal) return;
  modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

function setupModalHandlers() {
  const modal = getById("diseaseModal");
  if (!modal) return;

  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close]")) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function renderDiseaseCards() {
  const grid = getById("diseaseGrid");
  if (!grid) return;

  grid.innerHTML = "";

  diseases.forEach((disease) => {
    const card     = document.createElement("button");
    card.type      = "button";
    card.className = "card";

    const safeName = disease.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    // Try .jpeg first, fall back to .jpg, then placeholder
    const imageUrl = `images/${safeName}.jpeg`;
    const fallbackUrl = `images/${safeName}.jpg`;
    const placeholder = `https://placehold.co/400x225/e8f0fe/0b6eac?text=${encodeURIComponent(disease.name)}`;

    card.innerHTML = `
      <img src="${imageUrl}" alt="${disease.name} image"
           onerror="if(this.src.endsWith('.jpeg')){this.src='${fallbackUrl}'}else{this.src='${placeholder}'}"
      >
      <h3>${disease.name}</h3>
      <p>${disease.description}</p>
    `;

    card.addEventListener("click", () => openModal(disease));
    grid.appendChild(card);
  });
}

// ─── Contact form ─────────────────────────────────────────────────────────────

function handleContactFormSubmit(event) {
  event.preventDefault();

  const name     = getById("name");
  const email    = getById("email");
  const message  = getById("message");
  const feedback = getById("contactFeedback");

  if (!name || !email || !message || !feedback) return;

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    feedback.textContent = "Please fill out all fields before sending.";
    return;
  }

  feedback.textContent = "Thank you! Your message has been received.";
  feedback.style.color = "var(--primary-2)";

  name.value    = "";
  email.value   = "";
  message.value = "";
}

// ─── Background slideshow ─────────────────────────────────────────────────────

function initSlideshow() {
  const slides = document.querySelectorAll(".bg-slide");
  if (!slides.length) return;

  let current = 0;
  slides[current].classList.add("active");

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 5000);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  setYear();

  const patientForm = getById("patientForm");
  if (patientForm) {
    setStoredPatientInfo();
    patientForm.addEventListener("submit", handlePatientFormSubmit);
  }

  const diagnosisForm = getById("diagnosisForm");
  if (diagnosisForm) {
    renderDiseaseCards();
    setupModalHandlers();
    diagnosisForm.addEventListener("submit", handleDiagnosisFormSubmit);
  }

  const contactForm = getById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }

  initSlideshow();
}

window.addEventListener("DOMContentLoaded", init);
