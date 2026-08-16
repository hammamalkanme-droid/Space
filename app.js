/* =========================================================
   فضاء | مولد التصاميم
   app.js — FINAL STABLE EXPORT ENGINE
========================================================= */

"use strict";


/* =========================================================
   إعدادات
========================================================= */

const CONFIG = {

    canvasWidth: 1700,

    canvasHeight: 1000,

    exportWidth: 8500,

    exportHeight: 5000,

    exportScale: 5,

    fontFamily: "Cairo"

};


/* =========================================================
   المواد
========================================================= */

const SUBJECTS = {

    islamic: {
        name: "التربية الإسلامية / القرآن الكريم",
        short: "التربية الإسلامية",
        className: "subject-islamic"
    },

    "arabic-linguistics": {
        name: "اللغة العربية — الدراسات اللغوية",
        short: "الدراسات اللغوية",
        className: "subject-arabic-linguistics"
    },

    "arabic-literature": {
        name: "اللغة العربية — الأدب والنصوص",
        short: "الأدب والنصوص",
        className: "subject-arabic-literature"
    },

    "arabic-rhetoric": {
        name: "اللغة العربية — البلاغة",
        short: "البلاغة",
        className: "subject-arabic-rhetoric"
    },

    english: {
        name: "اللغة الإنجليزية",
        short: "اللغة الإنجليزية",
        className: "subject-english"
    },

    mathematics: {
        name: "الرياضيات",
        short: "الرياضيات",
        className: "subject-mathematics"
    },

    electromagnetism: {
        name: "الفيزياء الكهرومغناطيسية",
        short: "الفيزياء الكهرومغناطيسية",
        className: "subject-electromagnetism"
    },

    mechanics: {
        name: "الميكانيكا",
        short: "الميكانيكا",
        className: "subject-mechanics"
    },

    chemistry: {
        name: "الكيمياء",
        short: "الكيمياء",
        className: "subject-chemistry"
    },

    biology: {
        name: "الأحياء",
        short: "الأحياء",
        className: "subject-biology"
    },

    "information-technology": {
        name: "تقنية المعلومات",
        short: "تقنية المعلومات",
        className: "subject-information-technology"
    },

    statistics: {
        name: "الإحصاء",
        short: "الإحصاء",
        className: "subject-statistics"
    }

};


/* =========================================================
   العناصر
========================================================= */

const canvas =
    document.getElementById("designCanvas");

const subjectInput =
    document.getElementById("subject");

const unitInput =
    document.getElementById("unitName");

const titleInput =
    document.getElementById("lessonName");

const previewSubject =
    document.getElementById("previewSubject");

const previewUnit =
    document.getElementById("previewUnit");

const previewTitle =
    document.getElementById("previewTitle");

const exportButton =
    document.getElementById("exportBtn");

const resetButton =
    document.getElementById("resetBtn");

const templateButtons =
    document.querySelectorAll(".template-option");

const styleButtons =
    document.querySelectorAll(".style-option");


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
   تحديث النص
========================================================= */

function updateText() {

    const subject =
        SUBJECTS[state.subject] ||
        SUBJECTS.islamic;

    previewSubject.textContent =
        subject.short;

    previewUnit.textContent =
        state.unit || "الوحدة الأولى";

    previewTitle.textContent =
        state.title || "عنوان الدرس";

}


/* =========================================================
   تحديث المادة
========================================================= */

function updateSubject() {

    Object.values(SUBJECTS).forEach(
        subject => {

            canvas.classList.remove(
                subject.className
            );

        }
    );

    const data =
        SUBJECTS[state.subject] ||
        SUBJECTS.islamic;

    canvas.classList.add(
        data.className
    );

}


/* =========================================================
   تحديث القالب
========================================================= */

function updateTemplate() {

    canvas.classList.remove(
        "template-lesson",
        "template-unit"
    );

    canvas.classList.add(
        `template-${state.template}`
    );

    templateButtons.forEach(
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

    canvas.classList.remove(
        "style-modern",
        "style-minimal"
    );

    if (state.style === "modern") {

        canvas.classList.add(
            "style-modern"
        );

    }

    if (state.style === "minimal") {

        canvas.classList.add(
            "style-minimal"
        );

    }

    styleButtons.forEach(
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

    state.subject =
        subjectInput.value;

    state.unit =
        unitInput.value.trim();

    state.title =
        titleInput.value.trim();

    updateText();

    updateSubject();

    updateTemplate();

    updateStyle();

}


/* =========================================================
   الأحداث
========================================================= */

subjectInput.addEventListener(
    "change",
    updateDesign
);


unitInput.addEventListener(
    "input",
    updateDesign
);


titleInput.addEventListener(
    "input",
    updateDesign
);


templateButtons.forEach(
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


styleButtons.forEach(
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

resetButton.addEventListener(
    "click",
    () => {

        state.subject = "islamic";

        state.template = "lesson";

        state.style = "default";

        state.unit = "الوحدة الأولى";

        state.title = "عنوان الدرس";

        subjectInput.value =
            state.subject;

        unitInput.value =
            state.unit;

        titleInput.value =
            state.title;

        updateDesign();

    }
);


/* =========================================================
   تحميل html2canvas
========================================================= */

function loadHtml2Canvas() {

    return new Promise(
        (resolve, reject) => {

            if (
                typeof window.html2canvas ===
                "function"
            ) {

                resolve(
                    window.html2canvas
                );

                return;

            }

            const existing =
                document.querySelector(
                    'script[data-html2canvas="true"]'
                );

            if (existing) {

                existing.addEventListener(
                    "load",
                    () => {

                        if (
                            typeof window.html2canvas ===
                            "function"
                        ) {

                            resolve(
                                window.html2canvas
                            );

                        } else {

                            reject(
                                new Error(
                                    "html2canvas غير متوفر."
                                )
                            );

                        }

                    },
                    { once: true }
                );

                existing.addEventListener(
                    "error",
                    () => {

                        reject(
                            new Error(
                                "فشل تحميل مكتبة التصدير."
                            )
                        );

                    },
                    { once: true }
                );

                return;

            }

            const script =
                document.createElement("script");

            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

            script.async = true;

            script.dataset.html2canvas =
                "true";

            script.onload = () => {

                if (
                    typeof window.html2canvas ===
                    "function"
                ) {

                    resolve(
                        window.html2canvas
                    );

                } else {

                    reject(
                        new Error(
                            "html2canvas غير متوفر."
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

async function waitForImages(
    root
) {

    const images =
        root.querySelectorAll("img");

    await Promise.all(

        Array.from(images).map(
            image => {

                /*
                 * منع ظهور alt النصي إذا حدث خطأ
                 * أثناء التصدير.
                 */

                image.setAttribute(
                    "alt",
                    ""
                );

                image.removeAttribute(
                    "title"
                );

                image.decoding =
                    "sync";

                image.loading =
                    "eager";


                if (
                    image.complete
                ) {

                    return Promise.resolve();

                }


                return new Promise(
                    resolve => {

                        const done =
                            () => resolve();

                        image.addEventListener(
                            "load",
                            done,
                            { once: true }
                        );

                        image.addEventListener(
                            "error",
                            done,
                            { once: true }
                        );

                    }
                );

            }
        )

    );

}


/* =========================================================
   حماية الصور من broken image
========================================================= */

function prepareImagesForExport() {

    const images =
        canvas.querySelectorAll("img");

    images.forEach(
        image => {

            image.setAttribute(
                "alt",
                ""
            );

            image.removeAttribute(
                "title"
            );

            image.style.display =
                "block";

            image.style.visibility =
                "visible";

        }
    );

}


/* =========================================================
   انتظار الخطوط
========================================================= */

async function waitForFonts() {

    if (!document.fonts) {

        return;

    }

    try {

        await document.fonts.load(
            '400 40px "Cairo"'
        );

        await document.fonts.load(
            '600 40px "Cairo"'
        );

        await document.fonts.load(
            '700 40px "Cairo"'
        );

        await document.fonts.load(
            '800 40px "Cairo"'
        );

        await document.fonts.load(
            '900 100px "Cairo"'
        );

        await document.fonts.ready;

    } catch (error) {

        console.warn(
            "Font loading warning:",
            error
        );

    }

}


/* =========================================================
   انتظار الرسم
========================================================= */

function waitFrame() {

    return new Promise(
        resolve => {

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        () => {

                            resolve();

                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   تجهيز التصميم للتصدير
========================================================= */

function prepareCanvasForExport() {

    /*
     * إجبار اتجاه الكتابة العربية.
     */

    canvas.setAttribute(
        "dir",
        "rtl"
    );

    canvas.style.direction =
        "rtl";

    canvas.style.textRendering =
        "geometricPrecision";

    canvas.style.webkitFontSmoothing =
        "antialiased";


    /*
     * منع أي عنصر خارجي من التأثير
     * على التصدير.
     */

    canvas.querySelectorAll(
        "[title]"
    ).forEach(
        element => {

            element.removeAttribute(
                "title"
            );

        }
    );


    /*
     * إزالة أي fallback قديم إن كان
     * موجودًا في HTML.
     */

    canvas.querySelectorAll(
        ".logo-fallback"
    ).forEach(
        element => {

            element.remove();

        }
    );


    prepareImagesForExport();

}


/* =========================================================
   استعادة التصميم بعد التصدير
========================================================= */

function restoreCanvasAfterExport() {

    canvas.style.direction =
        "";

    canvas.style.textRendering =
        "";

    canvas.style.webkitFontSmoothing =
        "";

}


/* =========================================================
   إنشاء PNG النهائي
========================================================= */

async function createPNG() {

    const renderer =
        await loadHtml2Canvas();


    /*
     * الخطوط أولًا.
     */

    await waitForFonts();


    /*
     * تجهيز الصور.
     */

    prepareCanvasForExport();

    await waitForImages(canvas);


    /*
     * إعطاء المتصفح فرصة أخيرة
     * لتثبيت Cairo والـ layout.
     */

    await waitFrame();


    /*
     * نتأكد أن القياس الحقيقي
     * للتصميم هو 1700×1000.
     */

    const rect =
        canvas.getBoundingClientRect();


    if (
        Math.round(rect.width) !==
        CONFIG.canvasWidth ||
        Math.round(rect.height) !==
        CONFIG.canvasHeight
    ) {

        /*
         * لا نغير العرض الظاهر للمستخدم،
         * وإنما نثبت قياس العنصر نفسه.
         */

        canvas.style.width =
            `${CONFIG.canvasWidth}px`;

        canvas.style.height =
            `${CONFIG.canvasHeight}px`;

    }


    /*
     * =====================================================
     * أهم تغيير:
     *
     * foreignObjectRendering = true
     *
     * هذا يجعل المتصفح نفسه يرسم النص العربي
     * بدل اعتماد html2canvas على محلل النص القديم.
     *
     * النتيجة:
     * الحروف العربية لا تتقطع ولا تتراكب.
     * =====================================================
     */

    let rendered;

    try {

        rendered =
            await renderer(
                canvas,
                {

                    width:
                        CONFIG.canvasWidth,

                    height:
                        CONFIG.canvasHeight,

                    scale:
                        CONFIG.exportScale,

                    useCORS:
                        true,

                    allowTaint:
                        false,

                    backgroundColor:
                        "#f7f6f1",

                    imageTimeout:
                        30000,

                    logging:
                        false,

                    removeContainer:
                        true,

                    foreignObjectRendering:
                        true,

                    letterRendering:
                        true,

                    imageSmoothingEnabled:
                        true,

                    imageSmoothingQuality:
                        "high"

                }
            );

    } finally {

        restoreCanvasAfterExport();

    }


    /*
     * فحص المقاس.
     */

    if (
        rendered.width !==
            CONFIG.exportWidth ||
        rendered.height !==
            CONFIG.exportHeight
    ) {

        throw new Error(
            `مقاس التصدير غير صحيح: ${rendered.width}×${rendered.height}`
        );

    }


    return rendered;

}


/* =========================================================
   تنظيف اسم الملف
========================================================= */

function cleanName(
    text
) {

    return String(text || "")
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
   اسم الملف
========================================================= */

function getFilename() {

    const subject =
        SUBJECTS[state.subject] ||
        SUBJECTS.islamic;

    const title =
        state.title ||
        "عنوان-الدرس";

    return (
        "فضاء-" +
        cleanName(subject.short) +
        "-" +
        cleanName(title) +
        ".png"
    );

}


/* =========================================================
   تنزيل PNG
========================================================= */

function downloadCanvas(
    canvasElement
) {

    return new Promise(
        (resolve, reject) => {

            canvasElement.toBlob(
                blob => {

                    if (!blob) {

                        reject(
                            new Error(
                                "فشل إنشاء ملف PNG."
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
                        getFilename();

                    link.style.display =
                        "none";


                    document.body.appendChild(
                        link
                    );


                    /*
                     * النقر مرة واحدة فقط.
                     */

                    link.click();


                    link.remove();


                    setTimeout(
                        () => {

                            URL.revokeObjectURL(
                                url
                            );

                            resolve();

                        },
                        2000
                    );

                },

                "image/png"
            );

        }
    );

}


/* =========================================================
   التصدير
========================================================= */

exportButton.addEventListener(
    "click",
    async () => {

        if (
            exportButton.disabled
        ) {

            return;

        }


        const original =
            exportButton.innerHTML;


        try {

            exportButton.disabled =
                true;

            exportButton.innerHTML =
                `
                <span>⏳</span>
                جاري تجهيز 8500×5000...
                `;


            /*
             * تحديث نهائي قبل التصوير.
             */

            updateDesign();


            /*
             * تصدير مباشر من نفس التصميم.
             */

            const finalCanvas =
                await createPNG();


            /*
             * فحص صارم.
             */

            if (
                finalCanvas.width !==
                    CONFIG.exportWidth ||
                finalCanvas.height !==
                    CONFIG.exportHeight
            ) {

                throw new Error(
                    "فشل التحقق من أبعاد PNG."
                );

            }


            await downloadCanvas(
                finalCanvas
            );


        } catch (error) {

            console.error(
                "FINAL EXPORT ERROR:",
                error
            );


            alert(
                "حدث خطأ أثناء تصدير التصميم.\n\n" +
                "تأكد من وجود الشعارات داخل:\n" +
                "assets/logos/\n\n" +
                "ثم حاول مرة أخرى."
            );


        } finally {

            exportButton.disabled =
                false;

            exportButton.innerHTML =
                original;

        }

    }
);


/* =========================================================
   المساعدة
========================================================= */

const helpButton =
    document.getElementById(
        "helpBtn"
    );

const helpModal =
    document.getElementById(
        "helpModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


function openModal() {

    helpModal.classList.add(
        "active"
    );

    helpModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeHelp() {

    helpModal.classList.remove(
        "active"
    );

    helpModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


helpButton.addEventListener(
    "click",
    openModal
);


closeModal.addEventListener(
    "click",
    closeHelp
);


modalOverlay.addEventListener(
    "click",
    closeHelp
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeHelp();

        }

    }
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
            event.key.toLowerCase() ===
                "s"
        ) {

            event.preventDefault();

            exportButton.click();

        }

    }
);


/* =========================================================
   التهيئة
========================================================= */

function initialize() {

    /*
     * القيم الافتراضية.
     */

    subjectInput.value =
        "islamic";

    unitInput.value =
        "الوحدة الأولى";

    titleInput.value =
        "عنوان الدرس";


    state.subject =
        "islamic";

    state.template =
        "lesson";

    state.style =
        "default";

    state.unit =
        "الوحدة الأولى";

    state.title =
        "عنوان الدرس";


    /*
     * تحديث الواجهة.
     */

    updateDesign();


    /*
     * تجهيز الشعارات بدون أي fallback.
     */

    canvas.querySelectorAll(
        "img"
    ).forEach(
        image => {

            image.setAttribute(
                "alt",
                ""
            );

        }
    );

}


/* =========================================================
   التشغيل
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initialize,
        { once: true }
    );

} else {

    initialize();

}
