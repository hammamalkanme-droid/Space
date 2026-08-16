/* =========================================================
   فضاء | مولد التصاميم التعليمية
   app.js
========================================================= */


/* =========================================================
   إعدادات المشروع
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
   بيانات المواد
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
   أدوات مساعدة
========================================================= */

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


function getSubjectData(subjectId) {

    return SUBJECTS[subjectId] || SUBJECTS[CONFIG.defaultSubject];

}


function updateStateFromInputs() {

    state.subject =
        elements.subject.value;

    state.unit =
        elements.unitName.value.trim();

    state.title =
        elements.lessonName.value.trim();

}


function updatePreviewText() {

    const subject =
        getSubjectData(state.subject);

    elements.previewSubject.textContent =
        subject.shortName;

    elements.previewUnit.textContent =
        state.unit || CONFIG.defaultUnit;

    elements.previewTitle.textContent =
        state.title || CONFIG.defaultTitle;

}


function removeSubjectClasses() {

    Object.values(SUBJECTS).forEach(subject => {

        elements.designCanvas.classList.remove(
            subject.className
        );

    });

}


function updateSubjectTheme() {

    const subject =
        getSubjectData(state.subject);

    removeSubjectClasses();

    elements.designCanvas.classList.add(
        subject.className
    );

}


function updateTemplate() {

    elements.designCanvas.classList.remove(
        "template-lesson",
        "template-unit"
    );

    elements.designCanvas.classList.add(
        `template-${state.template}`
    );


    elements.templateOptions.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.template === state.template
        );

    });

}


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


    elements.styleOptions.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.style === state.style
        );

    });

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
   تغيير اسم الباب
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
   اختيار نوع التصميم
========================================================= */

elements.templateOptions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            state.template =
                button.dataset.template;

            updateTemplate();

        }
    );

});


/* =========================================================
   اختيار النمط
========================================================= */

elements.styleOptions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            state.style =
                button.dataset.style;

            updateStyle();

        }
    );

});


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
            elements.helpModal.classList.contains("active")
        ) {

            closeHelp();

        }

    }
);


/* =========================================================
   تحميل مكتبة html2canvas عند الحاجة
========================================================= */

function loadHtml2Canvas() {

    return new Promise(
        (resolve, reject) => {

            if (window.html2canvas) {

                resolve(window.html2canvas);

                return;

            }


            const script =
                document.createElement("script");

            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

            script.onload =
                () => {

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


            script.onerror =
                () => {

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
   تجهيز نسخة التصدير
========================================================= */

async function createExportCanvas() {

    const html2canvas =
        await loadHtml2Canvas();


    /*
       نعمل نسخة مستقلة من التصميم.
       هذا يمنع تغيير المعاينة الأصلية أثناء التصدير.
    */

    const clone =
        elements.designCanvas.cloneNode(true);


    clone.style.position =
        "fixed";

    clone.style.left =
        "-100000px";

    clone.style.top =
        "0";

    clone.style.width =
        `${CONFIG.exportWidth}px`;

    clone.style.height =
        `${CONFIG.exportHeight}px`;

    clone.style.aspectRatio =
        "auto";

    clone.style.borderRadius =
        "0";

    clone.style.boxShadow =
        "none";

    clone.style.margin =
        "0";

    clone.style.transform =
        "none";


    /*
       لأن التصميم داخل الصفحة يعتمد على النسب،
       نضمن أن النسخة تستخدم الحجم الحقيقي.
    */

    document.body.appendChild(
        clone
    );


    try {

        const canvas =
            await html2canvas(
                clone,
                {
                    width:
                        CONFIG.exportWidth,

                    height:
                        CONFIG.exportHeight,

                    scale: 1,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor: null,

                    logging: false,

                    imageTimeout: 15000
                }
            );


        return canvas;

    } finally {

        clone.remove();

    }

}


/* =========================================================
   تنزيل ملف PNG
========================================================= */

function downloadCanvasAsPNG(
    canvas,
    filename
) {

    return new Promise(
        resolve => {

            canvas.toBlob(
                blob => {

                    if (!blob) {

                        throw new Error(
                            "تعذر إنشاء ملف PNG."
                        );

                    }


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

                            resolve();

                        },
                        1000
                    );

                },

                "image/png"
            );

        }
    );

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


function generateFilename() {

    const subject =
        getSubjectData(state.subject);

    const title =
        state.title ||
        CONFIG.defaultTitle;


    const cleanSubject =
        sanitizeFilename(
            subject.shortName
        );


    const cleanTitle =
        sanitizeFilename(
            title
        );


    return `فضاء-${cleanSubject}-${cleanTitle}.png`;

}


/* =========================================================
   حالة التصدير
========================================================= */

function setExportLoading(isLoading) {

    if (isLoading) {

        elements.exportBtn.disabled =
            true;

        elements.exportBtn.dataset.originalText =
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
            elements.exportBtn.dataset.originalText ||
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

    try {

        setExportLoading(true);


        /*
           نعطي المتصفح لحظة حتى يكمل
           تحديث التصميم قبل الالتقاط.
        */

        await new Promise(
            resolve =>
                requestAnimationFrame(
                    () => resolve()
                )
        );


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
            "حدث خطأ أثناء تصدير الصورة. تأكد من تحميل الصفحة بشكل كامل ثم حاول مرة أخرى."
        );


    } finally {

        setExportLoading(false);

    }

}


elements.exportBtn.addEventListener(
    "click",
    exportDesign
);


/* =========================================================
   منع Enter من إرسال أي نموذج مستقبلًا
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            event.target.tagName === "INPUT"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   تشغيل أولي
========================================================= */

function initializeApp() {

    elements.subject.value =
        CONFIG.defaultSubject;

    elements.unitName.value =
        CONFIG.defaultUnit;

    elements.lessonName.value =
        CONFIG.defaultTitle;


    updateDesign();

}


/* =========================================================
   بدء التطبيق
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
