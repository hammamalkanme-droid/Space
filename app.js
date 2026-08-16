/* =========================================================
   فَضَاء | مولّد التصاميم التعليمية
   app.js — FINAL
========================================================= */

"use strict";


/* =========================================================
   إعدادات عامة
========================================================= */

const CONFIG = {
    exportWidth: 8500,
    exportHeight: 5000,

    defaultSubject: "islamic",
    defaultTemplate: "lesson",
    defaultStyle: "default",

    defaultUnit: "الوحدة الأولى",
    defaultTitle: "عنوان الدرس"
};


/* =========================================================
   المواد والألوان
========================================================= */

const SUBJECTS = {

    islamic: {
        name: "التربية الإسلامية / القرآن الكريم",
        shortName: "التربية الإسلامية",
        className: "subject-islamic"
    },

    "arabic-linguistics": {
        name: "اللغة العربية — الدراسات اللغوية",
        shortName: "الدراسات اللغوية",
        className: "subject-arabic-linguistics"
    },

    "arabic-literature": {
        name: "اللغة العربية — الأدب والنصوص",
        shortName: "الأدب والنصوص",
        className: "subject-arabic-literature"
    },

    "arabic-rhetoric": {
        name: "اللغة العربية — البلاغة",
        shortName: "البلاغة",
        className: "subject-arabic-rhetoric"
    },

    english: {
        name: "اللغة الإنجليزية",
        shortName: "اللغة الإنجليزية",
        className: "subject-english"
    },

    mathematics: {
        name: "الرياضيات",
        shortName: "الرياضيات",
        className: "subject-mathematics"
    },

    electromagnetism: {
        name: "الفيزياء الكهرومغناطيسية",
        shortName: "الفيزياء الكهرومغناطيسية",
        className: "subject-electromagnetism"
    },

    mechanics: {
        name: "الميكانيكا",
        shortName: "الميكانيكا",
        className: "subject-mechanics"
    },

    chemistry: {
        name: "الكيمياء",
        shortName: "الكيمياء",
        className: "subject-chemistry"
    },

    biology: {
        name: "الأحياء",
        shortName: "الأحياء",
        className: "subject-biology"
    },

    "information-technology": {
        name: "تقنية المعلومات",
        shortName: "تقنية المعلومات",
        className: "subject-information-technology"
    },

    statistics: {
        name: "الإحصاء",
        shortName: "الإحصاء",
        className: "subject-statistics"
    }

};


/* =========================================================
   عناصر الصفحة
========================================================= */

const elements = {
    subject: document.getElementById("subject"),
    unitName: document.getElementById("unitName"),
    lessonName: document.getElementById("lessonName"),

    designCanvas: document.getElementById("designCanvas"),

    previewSubject: document.getElementById("previewSubject"),
    previewUnit: document.getElementById("previewUnit"),
    previewTitle: document.getElementById("previewTitle"),

    exportBtn: document.getElementById("exportBtn"),
    resetBtn: document.getElementById("resetBtn"),

    helpBtn: document.getElementById("helpBtn"),
    helpModal: document.getElementById("helpModal"),
    closeModal: document.getElementById("closeModal"),
    modalOverlay: document.getElementById("modalOverlay"),

    templateOptions:
        document.querySelectorAll(".template-option"),

    styleOptions:
        document.querySelectorAll(".style-option")
};


/* =========================================================
   حالة التطبيق
========================================================= */

const state = {
    subject: CONFIG.defaultSubject,
    template: CONFIG.defaultTemplate,
    style: CONFIG.defaultStyle,
    unit: CONFIG.defaultUnit,
    title: CONFIG.defaultTitle
};


/* =========================================================
   الحصول على بيانات المادة
========================================================= */

function getSubjectData(subjectId) {

    return SUBJECTS[subjectId] ||
        SUBJECTS[CONFIG.defaultSubject];

}


/* =========================================================
   تحديث النصوص
========================================================= */

function updatePreviewText() {

    const subject =
        getSubjectData(state.subject);


    elements.previewSubject.textContent =
        subject.shortName;


    elements.previewUnit.textContent =
        state.unit ||
        CONFIG.defaultUnit;


    elements.previewTitle.textContent =
        state.title ||
        CONFIG.defaultTitle;

}


/* =========================================================
   تحديث حالة المدخلات
========================================================= */

function updateStateFromInputs() {

    state.subject =
        elements.subject.value;


    state.unit =
        elements.unitName.value.trim();


    state.title =
        elements.lessonName.value.trim();

}


/* =========================================================
   إزالة ألوان المواد السابقة
========================================================= */

function removeSubjectClasses() {

    Object.values(SUBJECTS).forEach(
        subject => {

            elements.designCanvas.classList.remove(
                subject.className
            );

        }
    );

}


/* =========================================================
   تحديث ثيم المادة
========================================================= */

function updateSubjectTheme() {

    const subject =
        getSubjectData(state.subject);


    removeSubjectClasses();


    elements.designCanvas.classList.add(
        subject.className
    );

}


/* =========================================================
   تحديث نوع القالب
========================================================= */

function updateTemplate() {

    elements.designCanvas.classList.remove(
        "template-lesson",
        "template-unit"
    );


    elements.designCanvas.classList.add(
        `template-${state.template}`
    );


    elements.templateOptions.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.template ===
                state.template
            );

        }
    );

}


/* =========================================================
   تحديث النمط
========================================================= */

function updateStyle() {

    elements.designCanvas.classList.remove(
        "style-modern",
        "style-minimal"
    );


    if (state.style === "modern") {

        elements.designCanvas.classList.add(
            "style-modern"
        );

    }


    if (state.style === "minimal") {

        elements.designCanvas.classList.add(
            "style-minimal"
        );

    }


    elements.styleOptions.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.style ===
                state.style
            );

        }
    );

}


/* =========================================================
   تحديث التصميم بالكامل
========================================================= */

function updateDesign() {

    updateStateFromInputs();

    updatePreviewText();

    updateSubjectTheme();

    updateTemplate();

    updateStyle();

}


/* =========================================================
   تغيير المادة
========================================================= */

elements.subject.addEventListener(
    "change",
    () => {

        state.subject =
            elements.subject.value;

        updateDesign();

    }
);


/* =========================================================
   تغيير الباب / الوحدة
========================================================= */

elements.unitName.addEventListener(
    "input",
    () => {

        state.unit =
            elements.unitName.value;

        updatePreviewText();

    }
);


/* =========================================================
   تغيير عنوان الدرس
========================================================= */

elements.lessonName.addEventListener(
    "input",
    () => {

        state.title =
            elements.lessonName.value;

        updatePreviewText();

    }
);


/* =========================================================
   اختيار قالب
========================================================= */

elements.templateOptions.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                state.template =
                    button.dataset.template;

                updateTemplate();

            }
        );

    }
);


/* =========================================================
   اختيار النمط
========================================================= */

elements.styleOptions.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                state.style =
                    button.dataset.style;

                updateStyle();

            }
        );

    }
);


/* =========================================================
   إعادة الضبط
========================================================= */

function resetDesign() {

    state.subject =
        CONFIG.defaultSubject;

    state.template =
        CONFIG.defaultTemplate;

    state.style =
        CONFIG.defaultStyle;

    state.unit =
        CONFIG.defaultUnit;

    state.title =
        CONFIG.defaultTitle;


    elements.subject.value =
        CONFIG.defaultSubject;

    elements.unitName.value =
        CONFIG.defaultUnit;

    elements.lessonName.value =
        CONFIG.defaultTitle;


    updateDesign();

}


elements.resetBtn.addEventListener(
    "click",
    resetDesign
);


/* =========================================================
   إصلاح الشعارات
========================================================= */

function setupLogos() {

    const logos =
        elements.designCanvas.querySelectorAll(
            ".canvas-logo"
        );


    logos.forEach(
        logo => {

            const image =
                logo.querySelector("img");

            const fallback =
                logo.querySelector(
                    ".logo-fallback"
                );


            if (!image) {

                if (fallback) {
                    fallback.style.display = "flex";
                }

                return;

            }


            /*
             * مهم:
             * إذا كانت الصورة موجودة، نخفي البديل.
             */

            if (
                image.complete &&
                image.naturalWidth > 0
            ) {

                image.style.display =
                    "block";

                if (fallback) {
                    fallback.style.display =
                        "none";
                }

            }


            /*
             * عند نجاح تحميل الصورة.
             */

            image.addEventListener(
                "load",
                () => {

                    image.style.display =
                        "block";

                    if (fallback) {
                        fallback.style.display =
                            "none";
                    }

                }
            );


            /*
             * فقط إذا فشلت الصورة،
             * نظهر البديل.
             */

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                    if (fallback) {
                        fallback.style.display =
                            "flex";
                    }

                }
            );

        }
    );

}


/* =========================================================
   نافذة المساعدة
========================================================= */

function openHelp() {

    elements.helpModal.classList.add(
        "active"
    );


    elements.helpModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeHelp() {

    elements.helpModal.classList.remove(
        "active"
    );


    elements.helpModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


elements.helpBtn.addEventListener(
    "click",
    openHelp
);


elements.closeModal.addEventListener(
    "click",
    closeHelp
);


elements.modalOverlay.addEventListener(
    "click",
    closeHelp
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            elements.helpModal.classList.contains(
                "active"
            )
        ) {

            closeHelp();

        }

    }
);


/* =========================================================
   تحميل مكتبة html2canvas
========================================================= */

function loadHtml2Canvas() {

    return new Promise(
        (resolve, reject) => {

            if (window.html2canvas) {

                resolve(
                    window.html2canvas
                );

                return;

            }


            const script =
                document.createElement(
                    "script"
                );


            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";


            script.onload = () => {

                if (window.html2canvas) {

                    resolve(
                        window.html2canvas
                    );

                } else {

                    reject(
                        new Error(
                            "تعذر تحميل مكتبة التصدير."
                        )
                    );

                }

            };


            script.onerror = () => {

                reject(
                    new Error(
                        "فشل تحميل مكتبة التصدير."
                    )
                );

            };


            document.head.appendChild(
                script
            );

        }
    );

}


/* =========================================================
   انتظار الصور
========================================================= */

function waitForImages(container) {

    const images =
        Array.from(
            container.querySelectorAll(
                "img"
            )
        );


    if (!images.length) {

        return Promise.resolve();

    }


    return Promise.all(
        images.map(
            image => {

                if (
                    image.complete &&
                    image.naturalWidth > 0
                ) {

                    return Promise.resolve();

                }


                return new Promise(
                    resolve => {

                        image.addEventListener(
                            "load",
                            resolve,
                            { once: true }
                        );

                        image.addEventListener(
                            "error",
                            resolve,
                            { once: true }
                        );

                    }
                );

            }
        )
    );

}


/* =========================================================
   انتظار الخطوط
========================================================= */

async function waitForFonts() {

    if (
        document.fonts &&
        document.fonts.ready
    ) {

        try {

            await document.fonts.ready;

        } catch (error) {

            console.warn(
                "تعذر انتظار الخطوط.",
                error
            );

        }

    }

}


/* =========================================================
   انتظار اكتمال الرسم
========================================================= */

function nextFrame() {

    return new Promise(
        resolve => {

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        resolve
                    );

                }
            );

        }
    );

}


/* =========================================================
   إنشاء Canvas عالي الدقة
========================================================= */

async function createExportCanvas() {

    const html2canvas =
        await loadHtml2Canvas();


    const source =
        elements.designCanvas;


    /*
     * حجم التصميم الفعلي في المعاينة.
     */

    const rect =
        source.getBoundingClientRect();


    const sourceWidth =
        Math.round(rect.width);


    const sourceHeight =
        Math.round(rect.height);


    if (
        sourceWidth < 10 ||
        sourceHeight < 10
    ) {

        throw new Error(
            "تعذر قراءة حجم التصميم."
        );

    }


    /*
     * التأكد من تحميل كل شيء.
     */

    await waitForFonts();

    await waitForImages(source);

    await nextFrame();


    /*
     * نحسب التكبير المطلوب للوصول
     * إلى 8500px عرض.
     */

    const scale =
        CONFIG.exportWidth /
        sourceWidth;


    /*
     * نلتقط التصميم نفسه،
     * وليس نسخة مضروبة بأبعاد خاطئة.
     */

    const captured =
        await html2canvas(
            source,
            {
                scale: scale,

                width: sourceWidth,

                height: sourceHeight,

                useCORS: true,

                allowTaint: false,

                backgroundColor: null,

                imageTimeout: 30000,

                logging: false,

                removeContainer: true,

                foreignObjectRendering: false
            }
        );


    /*
     * Canvas نهائي مضمون
     * 8500 × 5000 بالضبط.
     */

    const finalCanvas =
        document.createElement(
            "canvas"
        );


    finalCanvas.width =
        CONFIG.exportWidth;


    finalCanvas.height =
        CONFIG.exportHeight;


    const context =
        finalCanvas.getContext(
            "2d"
        );


    context.imageSmoothingEnabled =
        true;


    context.imageSmoothingQuality =
        "high";


    /*
     * نملأ الخلفية أولًا
     * لمنع أي شفافية غير مرغوبة.
     */

    context.fillStyle =
        getComputedStyle(
            source
        ).backgroundColor ||
        "#ffffff";


    context.fillRect(
        0,
        0,
        CONFIG.exportWidth,
        CONFIG.exportHeight
    );


    /*
     * نرسم الصورة كاملة على
     * الحجم النهائي.
     */

    context.drawImage(
        captured,
        0,
        0,
        captured.width,
        captured.height,
        0,
        0,
        CONFIG.exportWidth,
        CONFIG.exportHeight
    );


    return finalCanvas;

}


/* =========================================================
   تنظيف اسم الملف
========================================================= */

function sanitizeFilename(text) {

    return text
        .replace(
            /[\\/:*?"<>|]/g,
            ""
        )
        .replace(
            /\s+/g,
            "-"
        )
        .trim();

}


/* =========================================================
   اسم ملف PNG
========================================================= */

function generateFilename() {

    const subject =
        getSubjectData(
            state.subject
        );


    const title =
        state.title ||
        CONFIG.defaultTitle;


    const subjectName =
        sanitizeFilename(
            subject.shortName
        );


    const titleName =
        sanitizeFilename(
            title
        );


    return (
        `فضاء-${subjectName}-${titleName}.png`
    );

}


/* =========================================================
   تحويل Canvas إلى PNG
========================================================= */

function canvasToBlob(canvas) {

    return new Promise(
        (resolve, reject) => {

            canvas.toBlob(
                blob => {

                    if (!blob) {

                        reject(
                            new Error(
                                "تعذر إنشاء ملف PNG."
                            )
                        );

                        return;

                    }


                    resolve(blob);

                },

                "image/png"
            );

        }
    );

}


/* =========================================================
   تنزيل الصورة
========================================================= */

async function downloadCanvasAsPNG(
    canvas,
    filename
) {

    const blob =
        await canvasToBlob(
            canvas
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        filename;


    link.style.display =
        "none";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    setTimeout(
        () => {

            URL.revokeObjectURL(
                url
            );

        },
        2000
    );

}


/* =========================================================
   حالة زر التصدير
========================================================= */

function setExportLoading(
    loading
) {

    if (loading) {

        elements.exportBtn.disabled =
            true;


        elements.exportBtn.dataset
            .originalText =
            elements.exportBtn.innerHTML;


        elements.exportBtn.innerHTML =
            `
                <span>⏳</span>
                جاري تجهيز الصورة...
            `;

    } else {

        elements.exportBtn.disabled =
            false;


        elements.exportBtn.innerHTML =
            elements.exportBtn.dataset
                .originalText ||
            `
                <span>↓</span>
                تصدير التصميم PNG
            `;

    }

}


/* =========================================================
   تصدير التصميم
========================================================= */

async function exportDesign() {

    if (
        elements.exportBtn.disabled
    ) {

        return;

    }


    try {

        setExportLoading(true);


        /*
         * تأكيد أن الشعارات في حالتها
         * الصحيحة قبل التصدير.
         */

        setupLogos();


        await nextFrame();


        const canvas =
            await createExportCanvas();


        const filename =
            generateFilename();


        await downloadCanvasAsPNG(
            canvas,
            filename
        );


    } catch (error) {

        console.error(
            "Export error:",
            error
        );


        alert(
            "تعذر تصدير التصميم.\n\n" +
            "حاول مرة أخرى بعد اكتمال تحميل الصفحة."
        );


    } finally {

        setExportLoading(false);

    }

}


/* =========================================================
   زر التصدير
========================================================= */

elements.exportBtn.addEventListener(
    "click",
    exportDesign
);


/* =========================================================
   Ctrl + S
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
                event.metaKey) &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();

            exportDesign();

        }

    }
);


/* =========================================================
   تهيئة التطبيق
========================================================= */

function initializeApp() {

    elements.subject.value =
        CONFIG.defaultSubject;


    elements.unitName.value =
        CONFIG.defaultUnit;


    elements.lessonName.value =
        CONFIG.defaultTitle;


    updateDesign();


    /*
     * إصلاح الشعارات مباشرة.
     */

    setupLogos();

}


/* =========================================================
   بدء التطبيق
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();

               }
