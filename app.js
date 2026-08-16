/* =========================================================
   فضاء | مولد التصاميم
   app.js — FINAL STABLE EXPORT ENGINE
   الإصدار: تصدير مباشر بدون Clone + تحجيم تلقائي للنصوص
========================================================= */

"use strict";

/* =========================================================
   إعدادات
========================================================= */

const CONFIG = {
    canvasWidth: 1700,
    canvasHeight: 1000,
    exportScale: 5,
    exportWidth: 8500,
    exportHeight: 5000,
    html2canvasURL: "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
};

/* =========================================================
   المواد
========================================================= */

const SUBJECTS = {
    islamic: { name: "التربية الإسلامية / القرآن الكريم", short: "التربية الإسلامية", className: "subject-islamic" },
    "arabic-linguistics": { name: "اللغة العربية — الدراسات اللغوية", short: "الدراسات اللغوية", className: "subject-arabic-linguistics" },
    "arabic-literature": { name: "اللغة العربية — الأدب والنصوص", short: "الأدب والنصوص", className: "subject-arabic-literature" },
    "arabic-rhetoric": { name: "اللغة العربية — البلاغة", short: "البلاغة", className: "subject-arabic-rhetoric" },
    english: { name: "اللغة الإنجليزية", short: "اللغة الإنجليزية", className: "subject-english" },
    mathematics: { name: "الرياضيات", short: "الرياضيات", className: "subject-mathematics" },
    electromagnetism: { name: "الفيزياء الكهرومغناطيسية", short: "الفيزياء الكهرومغناطيسية", className: "subject-electromagnetism" },
    mechanics: { name: "الميكانيكا", short: "الميكانيكا", className: "subject-mechanics" },
    chemistry: { name: "الكيمياء", short: "الكيمياء", className: "subject-chemistry" },
    biology: { name: "الأحياء", short: "الأحياء", className: "subject-biology" },
    "information-technology": { name: "تقنية المعلومات", short: "تقنية المعلومات", className: "subject-information-technology" },
    statistics: { name: "الإحصاء", short: "الإحصاء", className: "subject-statistics" }
};

/* =========================================================
   العناصر
========================================================= */

const canvas = document.getElementById("designCanvas");
const subjectInput = document.getElementById("subject");
const unitInput = document.getElementById("unitName");
const titleInput = document.getElementById("lessonName");
const previewSubject = document.getElementById("previewSubject");
const previewUnit = document.getElementById("previewUnit");
const previewTitle = document.getElementById("previewTitle");
const exportButton = document.getElementById("exportBtn");
const resetButton = document.getElementById("resetBtn");
const templateButtons = document.querySelectorAll(".template-option");
const styleButtons = document.querySelectorAll(".style-option");

/* =========================================================
   التحقق من العناصر
========================================================= */

if (!canvas) console.error("designCanvas غير موجود.");
if (!exportButton) console.error("exportBtn غير موجود.");

/* =========================================================
   الحالة
========================================================= */

const state = {
    subject: "islamic",
    template: "lesson",
    style: "default",
    unit: "الوحدة الأولى",
    title: "عنوان الدرس"
};

/* =========================================================
   تحديث النصوص + التحجيم التلقائي (إضافة جديدة للحل)
========================================================= */

function updateText() {
    const subject = SUBJECTS[state.subject] || SUBJECTS.islamic;

    if (previewSubject) previewSubject.textContent = subject.short;
    if (previewUnit) previewUnit.textContent = state.unit || "الوحدة الأولى";
    if (previewTitle) previewTitle.textContent = state.title || "عنوان الدرس";

    adjustFontSizes(); // استدعاء دالة التحجيم التلقائي
}

/* 
 * دالة ذكية لتصغير الخط تلقائياً إذا تجاوز النص المساحة المخصصة
 * تمنع خروج النص عن الشاشة وتداخله مع التذييل
 */
function adjustFontSizes() {
    if (!previewTitle || !previewUnit) return;

    // 1. إعادة الخطوط لحجمها الافتراضي قبل الحساب
    previewTitle.style.fontSize = "100px";
    previewUnit.style.fontSize = "50px";

    // 2. معالجة عنوان الدرس (تجنب التداخل مع العناصر السفلية)
    // حددنا 320 بكسل كحد أقصى لارتفاع صندوق العنوان
    let titleSize = 100;
    while (previewTitle.scrollHeight > 320 && titleSize > 45) {
        titleSize -= 2;
        previewTitle.style.fontSize = `${titleSize}px`;
    }

    // 3. معالجة اسم الوحدة (تجنب الخروج من العرض)
    let unitSize = 50;
    while (previewUnit.scrollWidth > 1500 && unitSize > 25) {
        unitSize -= 2;
        previewUnit.style.fontSize = `${unitSize}px`;
    }
}

/* =========================================================
   تحديث مادة التصميم
========================================================= */

function updateSubject() {
    if (!canvas) return;

    Object.values(SUBJECTS).forEach(subject => {
        canvas.classList.remove(subject.className);
    });

    const subject = SUBJECTS[state.subject] || SUBJECTS.islamic;
    canvas.classList.add(subject.className);
}

/* =========================================================
   تحديث القالب
========================================================= */

function updateTemplate() {
    if (!canvas) return;

    canvas.classList.remove("template-lesson", "template-unit");
    canvas.classList.add(`template-${state.template}`);

    templateButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.template === state.template);
    });

    adjustFontSizes(); // إعادة ضبط الخطوط عند تغيير القالب (لأن قالب الوحدة له مساحات مختلفة)
}

/* =========================================================
   تحديث النمط
========================================================= */

function updateStyle() {
    if (!canvas) return;

    canvas.classList.remove("style-modern", "style-minimal");
    if (state.style === "modern") canvas.classList.add("style-modern");
    if (state.style === "minimal") canvas.classList.add("style-minimal");

    styleButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.style === state.style);
    });
}

/* =========================================================
   تحديث التصميم بالكامل
========================================================= */

function updateDesign() {
    if (subjectInput) state.subject = subjectInput.value || "islamic";
    if (unitInput) state.unit = unitInput.value.trim() || "الوحدة الأولى";
    if (titleInput) state.title = titleInput.value.trim() || "عنوان الدرس";

    updateText();
    updateSubject();
    updateTemplate();
    updateStyle();
}

/* =========================================================
   الأحداث
========================================================= */

if (subjectInput) subjectInput.addEventListener("change", updateDesign);
if (unitInput) unitInput.addEventListener("input", updateDesign);
if (titleInput) titleInput.addEventListener("input", updateDesign);

templateButtons.forEach(button => {
    button.addEventListener("click", () => {
        state.template = button.dataset.template || "lesson";
        updateTemplate();
    });
});

styleButtons.forEach(button => {
    button.addEventListener("click", () => {
        state.style = button.dataset.style || "default";
        updateStyle();
    });
});

/* =========================================================
   إعادة الضبط
========================================================= */

if (resetButton) {
    resetButton.addEventListener("click", () => {
        state.subject = "islamic";
        state.template = "lesson";
        state.style = "default";
        state.unit = "الوحدة الأولى";
        state.title = "عنوان الدرس";

        if (subjectInput) subjectInput.value = state.subject;
        if (unitInput) unitInput.value = state.unit;
        if (titleInput) titleInput.value = state.title;

        updateDesign();
    });
}

/* =========================================================
   تحميل html2canvas
========================================================= */

function loadHtml2Canvas() {
    return new Promise((resolve, reject) => {
        if (typeof window.html2canvas === "function") {
            resolve(window.html2canvas);
            return;
        }

        const existing = document.querySelector('script[data-html2canvas="true"]');
        if (existing) {
            existing.addEventListener("load", () => {
                if (typeof window.html2canvas === "function") resolve(window.html2canvas);
                else reject(new Error("تعذر تشغيل html2canvas."));
            }, { once: true });
            existing.addEventListener("error", () => reject(new Error("فشل تحميل html2canvas.")), { once: true });
            return;
        }

        const script = document.createElement("script");
        script.src = CONFIG.html2canvasURL;
        script.async = true;
        script.dataset.html2canvas = "true";

        script.onload = () => {
            if (typeof window.html2canvas === "function") resolve(window.html2canvas);
            else reject(new Error("مكتبة html2canvas غير متاحة."));
        };

        script.onerror = () => reject(new Error("فشل تحميل مكتبة التصدير."));
        document.head.appendChild(script);
    });
}

/* =========================================================
   انتظار الصور
========================================================= */

async function waitForImages(element) {
    if (!element) return;
    const images = Array.from(element.querySelectorAll("img"));

    await Promise.all(
        images.map(image => {
            if (image.complete && image.naturalWidth > 0) return Promise.resolve();
            return new Promise(resolve => {
                let finished = false;
                const done = () => {
                    if (finished) return;
                    finished = true;
                    resolve();
                };
                image.addEventListener("load", done, { once: true });
                image.addEventListener("error", done, { once: true });
                setTimeout(done, 10000); // لا نسمح للصورة المعطلة بتعطيل التصدير
            });
        })
    );
}

/* =========================================================
   انتظار الخطوط
========================================================= */

async function waitForFonts() {
    try {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
    } catch (error) {
        console.warn("تعذر انتظار الخطوط:", error);
    }
}

/* =========================================================
   انتظار الرسم
========================================================= */

function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
}

/* =========================================================
   تثبيت مقاس التصميم
========================================================= */

function lockCanvasSize() {
    if (!canvas) return;
    canvas.style.width = `${CONFIG.canvasWidth}px`;
    canvas.style.height = `${CONFIG.canvasHeight}px`;
    canvas.style.minWidth = `${CONFIG.canvasWidth}px`;
    canvas.style.minHeight = `${CONFIG.canvasHeight}px`;
    canvas.style.maxWidth = `${CONFIG.canvasWidth}px`;
    canvas.style.maxHeight = `${CONFIG.canvasHeight}px`;
}

/* =========================================================
   إنشاء PNG
========================================================= */

async function createPNG() {
    if (!canvas) throw new Error("التصميم غير موجود.");

    const renderer = await loadHtml2Canvas();

    updateDesign();
    lockCanvasSize();

    await waitForImages(canvas);
    await waitForFonts();
    await nextFrame();

    const rendered = await renderer(canvas, {
        width: CONFIG.canvasWidth,
        height: CONFIG.canvasHeight,
        scale: CONFIG.exportScale,
        windowWidth: CONFIG.canvasWidth,
        windowHeight: CONFIG.canvasHeight,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#f7f6f1",
        foreignObjectRendering: false,
        imageTimeout: 30000,
        logging: false,
        removeContainer: true
    });

    if (!rendered) throw new Error("لم يتم إنشاء Canvas.");
    if (rendered.width !== CONFIG.exportWidth || rendered.height !== CONFIG.exportHeight) {
        throw new Error(`مقاس الصورة الناتجة غير صحيح: ${rendered.width} × ${rendered.height}`);
    }

    return rendered;
}

/* =========================================================
   تنظيف اسم الملف
========================================================= */

function cleanName(text) {
    return String(text || "").replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

/* =========================================================
   اسم الملف
========================================================= */

function getFilename() {
    const subject = SUBJECTS[state.subject] || SUBJECTS.islamic;
    const title = state.title || "عنوان-الدرس";
    return `فضاء-${cleanName(subject.short)}-${cleanName(title)}.png`;
}

/* =========================================================
   تنزيل PNG
========================================================= */

function downloadCanvas(canvasElement) {
    return new Promise((resolve, reject) => {
        if (!canvasElement) {
            reject(new Error("Canvas غير موجود."));
            return;
        }

        canvasElement.toBlob(blob => {
            if (!blob) {
                reject(new Error("فشل إنشاء ملف PNG."));
                return;
            }

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = getFilename();
            link.style.position = "fixed";
            link.style.left = "-9999px";

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => {
                URL.revokeObjectURL(url);
                resolve();
            }, 2000);
        }, "image/png");
    });
}

/* =========================================================
   تصدير التصميم
========================================================= */

if (exportButton) {
    exportButton.addEventListener("click", async () => {
        if (exportButton.disabled) return;
        const originalHTML = exportButton.innerHTML;

        try {
            exportButton.disabled = true;
            exportButton.innerHTML = `<span>⏳</span> جاري تجهيز الصورة...`;

            updateDesign();

            const finalCanvas = await createPNG();

            if (finalCanvas.width !== CONFIG.exportWidth || finalCanvas.height !== CONFIG.exportHeight) {
                throw new Error("الصورة ليست 8500 × 5000.");
            }

            exportButton.innerHTML = `<span>⬇</span> جاري حفظ PNG...`;
            await downloadCanvas(finalCanvas);

            exportButton.innerHTML = `<span>✓</span> تم التصدير بنجاح`;
            setTimeout(() => { exportButton.innerHTML = originalHTML; }, 1800);

        } catch (error) {
            console.error("FINAL EXPORT ERROR:", error);
            exportButton.innerHTML = originalHTML;
            alert("تعذر تصدير التصميم.\n\nالسبب:\n" + (error?.message || "خطأ غير معروف") + "\n\nتأكد من وجود الشعارات وتشغيل المشروع عبر Live Server.");
        } finally {
            exportButton.disabled = false;
        }
    });
}

/* =========================================================
   المساعدة
========================================================= */

const helpButton = document.getElementById("helpBtn");
const helpModal = document.getElementById("helpModal");
const closeModal = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");

function openModal() {
    if (!helpModal) return;
    helpModal.classList.add("active");
    helpModal.setAttribute("aria-hidden", "false");
}

function closeHelp() {
    if (!helpModal) return;
    helpModal.classList.remove("active");
    helpModal.setAttribute("aria-hidden", "true");
}

if (helpButton) helpButton.addEventListener("click", openModal);
if (closeModal) closeModal.addEventListener("click", closeHelp);
if (modalOverlay) modalOverlay.addEventListener("click", closeHelp);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeHelp();
});

/* =========================================================
   Ctrl + S
========================================================= */

document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (exportButton) exportButton.click();
    }
});

/* =========================================================
   التهيئة
========================================================= */

function initialize() {
    state.subject = "islamic";
    state.template = "lesson";
    state.style = "default";
    state.unit = "الوحدة الأولى";
    state.title = "عنوان الدرس";

    if (subjectInput) subjectInput.value = state.subject;
    if (unitInput) unitInput.value = state.unit;
    if (titleInput) titleInput.value = state.title;

    lockCanvasSize();
    updateDesign();
}

/* =========================================================
   تشغيل آمن
========================================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
} else {
    initialize();
}
