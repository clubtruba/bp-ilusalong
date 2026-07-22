const DETAILS = Object.freeze({
  iban: "EE081010220280807220",
  company: "B&P Ilusalong OÜ"
});

const TRANSLATIONS = Object.freeze({
  en: {
    intro: "Payment details",
    copyIban: "Copy IBAN",
    copyCompany: "Copy company name",
    review: "Leave a review",
    privacy: "Nothing is stored or sent.",
    copiedIban: "IBAN copied",
    copiedCompany: "Company name copied",
    copyFailed: "Could not copy. Please try again."
  },
  ru: {
    intro: "Данные для оплаты",
    copyIban: "Скопировать IBAN",
    copyCompany: "Скопировать название",
    review: "Оставить отзыв",
    privacy: "Данные не сохраняются и не отправляются.",
    copiedIban: "IBAN скопирован",
    copiedCompany: "Название скопировано",
    copyFailed: "Не удалось скопировать. Попробуйте ещё раз."
  },
  et: {
    intro: "Makseandmed",
    copyIban: "Kopeeri IBAN",
    copyCompany: "Kopeeri ettevõtte nimi",
    review: "Jäta arvustus",
    privacy: "Andmeid ei salvestata ega saadeta.",
    copiedIban: "IBAN kopeeritud",
    copiedCompany: "Ettevõtte nimi kopeeritud",
    copyFailed: "Kopeerimine ebaõnnestus. Proovi uuesti."
  }
});

let currentLanguage = "en";
let toastTimer;

const toast = document.querySelector(".toast");
const toastText = document.querySelector(".toast-text");
const languageButtons = [...document.querySelectorAll("[data-language]")];

function setLanguage(language) {
  if (!TRANSLATIONS[language]) return;

  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = TRANSLATIONS[language][key];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("bp-language", language);
  } catch (_) {
    // Language persistence is optional.
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toastText.textContent = message;
  toast.classList.add("visible");

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 1700);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  const successful = document.execCommand("copy");
  textarea.remove();

  if (!successful) {
    throw new Error("Copy command failed");
  }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const key = button.dataset.copy;

    try {
      await copyText(DETAILS[key]);

      if (navigator.vibrate) {
        navigator.vibrate(35);
      }

      const messageKey = key === "iban" ? "copiedIban" : "copiedCompany";
      showToast(TRANSLATIONS[currentLanguage][messageKey]);
    } catch (error) {
      showToast(TRANSLATIONS[currentLanguage].copyFailed);
    }
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

let savedLanguage = "en";
try {
  savedLanguage = localStorage.getItem("bp-language") || "en";
} catch (_) {
  savedLanguage = "en";
}
setLanguage(savedLanguage);
