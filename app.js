/* =========================================================
   فضاء | مولد التصاميم التعليمية
   app.js — النسخة النهائية
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
   المواد
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
   وظائف مساعدة
========================================================= */

function getSubjectData(subjectId) {

    return SUBJECTS[subjectId] ||
        SUBJECTS[CONFIG.defaultSubject];

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
        state.unit ||
        CONFIG.defaultUnit;

    elements.previewTitle.textContent =
        state.title ||
        CONFIG.defaultTitle;

}


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
   تحديث لون المادة
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
   تحديث نوع التصميم
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
   تحديث التصميم
========================================================= */

function updateDesign() {

    updateStateFromInputs();

    updatePreviewText();

    updateSubjectTheme();

    updateTemplate();

    updateStyle();

}


/* =========================================================
   المادة
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
   الباب / الوحدة
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
   عنوان الدرس
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
   نوع التصميم
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
   النمط
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
   تحميل html2canvas
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
            container.querySelectorAll("img")
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
   انتظار الخط
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
                "تعذر انتظار الخطوط:",
                error
            );

        }

    }

}


/* =========================================================
   إنشاء نسخة التصدير
========================================================= */

async function createExportCanvas() {

    const html2canvas =
        await loadHtml2Canvas();


    /*
       مهم جدًا:

       لا نقوم بتغيير التصميم إلى 8500px هنا.

       نأخذ التصميم بنفس حجمه الحقيقي في المعاينة،
       ثم نرفع دقة الالتقاط بواسطة scale.

       بهذه الطريقة:
       1. أماكن العناصر تبقى صحيحة.
       2. أحجام الخطوط تبقى صحيحة.
       3. الشعارات تبقى صحيحة.
       4. النتيجة النهائية تصبح 8500 × 5000.
    */


    const source =
        elements.designCanvas;


    const rect =
        source.getBoundingClientRect();


    const sourceWidth =
        Math.round(rect.width);


    const sourceHeight =
        Math.round(rect.height);


    if (
        sourceWidth <= 0 ||
        sourceHeight <= 0
    ) {

        throw new Error(
            "تعذر تحديد حجم التصميم."
        );

    }


    /*
       النسبة المطلوبة للتصدير.
    */

    const scale =
        CONFIG.exportWidth /
        sourceWidth;


    /*
       نتأكد أن الناتج يطابق
       النسبة المطلوبة.
    */

    const expectedHeight =
        Math.round(
            sourceHeight * scale
        );


    /*
       لو اختلفت بضعة بكسلات بسبب
       التقريب أو الشاشة، نستخدم
       النسبة الأصلية للتصميم.
    */

    console.log(
        "Export:",
        {
            sourceWidth,
            sourceHeight,
            scale,
            expectedWidth:
                CONFIG.exportWidth,
            expectedHeight
        }
    );


    /*
       ننتظر الخطوط والصور.
    */

    await waitForFonts();

    await waitForImages(
        source
    );


    /*
       نلتقط التصميم نفسه مباشرة.
       لا Clone بحجم 8500.
    */

    const canvas =
        await html2canvas(
            source,
            {

                scale: scale,

                width:
                    sourceWidth,

                height:
                    sourceHeight,

                useCORS: true,

                allowTaint: false,

                backgroundColor: null,

                logging: false,

                imageTimeout: 20000,

                removeContainer: true,

                foreignObjectRendering: false

            }
        );


    /*
       html2canvas سيعطي الحجم الناتج
       بناءً على scale.

       للتأكد من عدم وجود فرق بسبب
       التقريب، نعيد رسم الصورة
       في Canvas نهائي بالحجم المطلوب.
    */

    if (
        canvas.width !==
            CONFIG.exportWidth ||
        canvas.height !==
            CONFIG.exportHeight
    ) {

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


        context.drawImage(
            canvas,
            0,
            0,
            canvas.width,
            canvas.height,
            0,
            0,
            CONFIG.exportWidth,
            CONFIG.exportHeight
        );


        return finalCanvas;

    }


    return canvas;

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
   اسم ملف التصميم
========================================================= */

function generateFilename() {

    const subject =
        getSubjectData(
            state.subject
        );


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


    return (
        `فضاء-${cleanSubject}-${cleanTitle}.png`
    );

}


/* =========================================================
   تصدير PNG
========================================================= */

function downloadCanvasAsPNG(
    canvas,
    filename
) {

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
                        1500
                    );

                },

                "image/png"
            );

        }
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
   تنفيذ التصدير
========================================================= */

async function exportDesign() {

    try {

        setExportLoading(
            true
        );


        /*
           ننتظر دورة رسم كاملة.
        */

        await new Promise(
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


        /*
           إنشاء الصورة عالية الدقة.
        */

        const canvas =
            await createExportCanvas();


        /*
           اسم الملف.
        */

        const filename =
            generateFilename();


        /*
           تنزيل PNG.
        */

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
            "حدث خطأ أثناء تصدير التصميم.\n\n" +
            "إذا كنت تستخدم هاتفًا، جرّب إغلاق التطبيقات الأخرى ثم أعد التصدير."
        );


    } finally {

        setExportLoading(
            false
        );

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
   اختصار لوحة المفاتيح
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
   منع Enter غير المرغوب
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
   تشغيل التطبيق
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
   البداية
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
