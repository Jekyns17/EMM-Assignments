/* Shared data */
const diseases = [
  {
    name: "Flu",
    symptoms: ["cough", "tiredness", "sore throat", "fever"],
    medication: "Paracetamol, flu tablets",
    prevention: "Drink warm fluids and rest.",
    video: "https://youtu.be/MfX6xGdQco0?si=RDFRL9z34yDXBngW",
    description: "A common viral infection that affects the nose, throat, and lungs."
  },
  {
    name: "Food Poisoning",
    symptoms: ["vomiting", "stomach pain", "tiredness"],
    medication: "Oral rehydration salts",
    prevention: "Eat clean food and wash hands.",
    video: "https://youtu.be/BCRW2o15qsQ?si=qHpezSjXAu2rG6Lu",
    description: "Often caused by contaminated food or water."
  },
  {
    name: "Malaria",
    symptoms: ["fever", "chills", "sweating", "headache", "muscle pain"],
    medication: "Antimalarial drugs prescribed by a doctor",
    prevention: "Use mosquito nets and repellents.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "A parasitic infection transmitted by mosquitoes."
  },
  {
    name: "HIV/AIDS",
    symptoms: ["weight loss", "fever", "night sweats", "fatigue", "recurrent infections"],
    medication: "Antiretroviral therapy (ART)",
    prevention: "Practice safe sex and avoid sharing needles.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "A virus that attacks the immune system over time."
  },
  {
    name: "Tuberculosis",
    symptoms: ["persistent cough", "chest pain", "fever", "night sweats", "weight loss"],
    medication: "Antibiotics (DOTS regimen)",
    prevention: "Early diagnosis and treatment, BCG vaccination.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "A bacterial infection that mostly affects the lungs."
  },
  {
    name: "Cholera",
    symptoms: ["watery diarrhea", "vomiting", "dehydration", "muscle cramps"],
    medication: "Oral rehydration solution (ORS), antibiotics in severe cases",
    prevention: "Drink clean water and maintain sanitation.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "A bacterial infection causing severe dehydration."
  },
  {
    name: "Genital Herpes",
    symptoms: ["painful blisters", "itching", "burning sensation"],
    medication: "Antiviral drugs (acyclovir, valacyclovir)",
    prevention: "Avoid sexual contact during outbreaks, use protection.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "A common viral infection causing recurrent sores."
  }
];

function getById(id) {
  return document.getElementById(id);
}

function setYear() {
  const yearEl = getById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function setStoredPatientInfo() {
  const age = localStorage.getItem("age");
  const sex = localStorage.getItem("sex");
  const weight = localStorage.getItem("weight");

  if (age && sex && weight) {
    const form = getById("patientForm");
    if (!form) return;
    form.querySelector("#age").value = age;
    form.querySelector("#sex").value = sex;
    form.querySelector("#weight").value = weight;
  }
}

function handlePatientFormSubmit(event) {
  event.preventDefault();

  const age = getById("age").value.trim();
  const sex = getById("sex").value.trim();
  const weight = getById("weight").value.trim();

  const ageError = getById("ageError");
  const sexError = getById("sexError");
  const weightError = getById("weightError");

  ageError.textContent = "";
  sexError.textContent = "";
  weightError.textContent = "";

  let valid = true;

  if (!age) {
    ageError.textContent = "Required";
    valid = false;
  }

  if (!sex) {
    sexError.textContent = "Required";
    valid = false;
  }

  if (!weight || Number(weight) <= 0) {
    weightError.textContent = "Required (must be greater than 0)";
    valid = false;
  }

  if (!valid) return;

  localStorage.setItem("age", age);
  localStorage.setItem("sex", sex);
  localStorage.setItem("weight", weight);

  window.location.href = "index2.html";
}

function filterSymptoms(symptoms) {
  return symptoms
    .map((s) => s.toLowerCase().trim())
    .filter(Boolean);
}

function getYouTubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host.includes("youtube.com")) {
      // Already an embed URL
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
    return '<p>Video requires an internet connection to load.</p>';
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
  const modal = getById("diseaseModal");
  const title = getById("modalTitle");
  const description = getById("modalDescription");
  const videoContainer = getById("modalVideoContainer");

  if (!modal || !title || !description || !videoContainer) return;

  title.textContent = disease.name;
  description.textContent = disease.description;

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
    if (event.target.matches("[data-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function renderDiseaseCards() {
  const grid = getById("diseaseGrid");
  if (!grid) return;

  grid.innerHTML = "";

  diseases.forEach((disease) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";

    const safeName = disease.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    const imageUrl = `images/${safeName}.jpg`;

    card.innerHTML = `
      <img src="${imageUrl}" alt="${disease.name} image" onerror="this.src='https://via.placeholder.com/400x225?text=No+image'">
      <h3>${disease.name}</h3>
      <p>${disease.description}</p>
    `;

    card.addEventListener("click", () => openModal(disease));
    grid.appendChild(card);
  });
}

function renderDiagnosisResults(userSymptoms) {
  const result = getById("result");
  const loading = getById("loading");

  if (!result || !loading) return;

  if (!userSymptoms.length) {
    result.innerHTML = `<p class="field-error">Please enter at least one symptom.</p>`;
    loading.textContent = "";
    return;
  }

  loading.textContent = "Analyzing symptoms...";

  setTimeout(() => {
    const matches = diseases
      .map((d) => {
        const totalSymptoms = d.symptoms.length;
        const matched = d.symptoms.filter((s) => userSymptoms.includes(s));
        const matchCount = matched.length;
        const matchPercent = Math.round((matchCount / totalSymptoms) * 100);
        const userCoverage = Math.round((matchCount / userSymptoms.length) * 100);

        return {
          disease: d,
          matchCount,
          matchPercent,
          userCoverage,
          matchedSymptoms: matched
        };
      })
      .filter((item) => item.matchCount > 0)
      .sort((a, b) => b.matchPercent - a.matchPercent || b.matchCount - a.matchCount);

    if (!matches.length) {
      result.innerHTML = `<p>No diseases matched your symptoms. Please consult a doctor.</p>`;
    } else {
      result.innerHTML = matches
        .slice(0, 4)
        .map((match) => {
          const { disease, matchPercent, userCoverage, matchCount, matchedSymptoms } = match;
          return `
            <div class="disease-card">
              <h3>${disease.name}</h3>
              <p><strong>Match:</strong> ${matchPercent}% of disease symptoms (${
            matchCount
          }/${disease.symptoms.length})</p>
              <p><strong>Coverage:</strong> ${userCoverage}% of your symptoms matched</p>
              <p><strong>Matched symptoms:</strong> ${matchedSymptoms.join(", ")}</p>
              <p><strong>Medication:</strong> ${disease.medication}</p>
              <p><strong>Prevention:</strong> ${disease.prevention}</p>
            </div>
          `;
        })
        .join("");
    }

    loading.textContent = "";
  }, 1200);
}

function handleDiagnosisFormSubmit(event) {
  event.preventDefault();

  const symptomInput = getById("symptoms");
  const symptomsError = getById("symptomsError");

  if (!symptomInput || !symptomsError) return;

  symptomsError.textContent = "";

  const symptoms = filterSymptoms(symptomInput.value.split(","));

  if (!symptoms.length) {
    symptomsError.textContent = "Please enter at least one symptom.";
    return;
  }

  renderDiagnosisResults(symptoms);
}

function handleContactFormSubmit(event) {
  event.preventDefault();

  const name = getById("name");
  const email = getById("email");
  const message = getById("message");
  const feedback = getById("contactFeedback");

  if (!name || !email || !message || !feedback) return;

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    feedback.textContent = "Please fill out all fields before sending.";
    return;
  }

  // This demo does not send messages anywhere; it just provides confirmation.
  feedback.textContent = "Thank you! Your message has been received.";
  feedback.style.color = "var(--primary-2)";

  name.value = "";
  email.value = "";
  message.value = "";
}

function initSlideshow() {
  const slides = document.querySelectorAll('.bg-slide');
  if (!slides.length) return;

  let current = 0;
  slides[current].classList.add('active');

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000); // change every 5 seconds
}

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
