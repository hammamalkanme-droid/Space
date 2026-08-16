/* =========================================================
   فضاء | مولد التصاميم
   app.js — FINAL EXPORT ENGINE
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

    exportScale: 5

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
    document.querySelectorAll(
        ".template-option"
    );

const styleButtons =
    document.querySelectorAll(
        ".style-option"
    );


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
        state.unit ||
        "الوحدة الأولى";


    previewTitle.textContent =
        state.title ||
        "عنوان الدرس";

}


/* =========================================================
   ثيم المادة
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
   القالب
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
   النمط
========================================================= */

function updateStyle() {

    canvas.classList.remove(
        "style-modern",
        "style-minimal"
    );


    if (
        state.style ===
        "modern"
    ) {

        canvas.classList.add(
            "style-modern"
        );

    }


    if (
        state.style ===
        "minimal"
    ) {

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
   تحديث كامل
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
   التأكد من الصور
========================================================= */

function waitForImages() {

    const images =
        canvas.querySelectorAll(
            "img"
        );


    return Promise.all(

        Array.from(images).map(
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

        await document.fonts.ready;

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
                        resolve
                    );

                }
            );

        }
    );

}


/* =========================================================
   تحميل html2canvas
========================================================= */

function loadHtml2Canvas() {

    return new Promise(
        (resolve, reject) => {

            if (
                typeof html2canvas ===
                "function"
            ) {

                resolve(
                    html2canvas
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

                if (
                    typeof html2canvas ===
                    "function"
                ) {

                    resolve(
                        html2canvas
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
   إنشاء نسخة التصدير
========================================================= */

function createExportClone() {

    const clone =
        canvas.cloneNode(true);


    /*
     * النسخة لا تدخل في الصفحة.
     * نضعها خارج الشاشة.
     */

    clone.style.position =
        "fixed";

    clone.style.left =
        "-20000px";

    clone.style.top =
        "0";

    clone.style.width =
        `${CONFIG.canvasWidth}px`;

    clone.style.height =
        `${CONFIG.canvasHeight}px`;

    clone.style.minWidth =
        `${CONFIG.canvasWidth}px`;

    clone.style.minHeight =
        `${CONFIG.canvasHeight}px`;

    clone.style.maxWidth =
        "none";

    clone.style.maxHeight =
        "none";

    clone.style.transform =
        "none";

    clone.style.margin =
        "0";

    clone.style.borderRadius =
        "0";

    clone.style.boxShadow =
        "none";


    /*
     * نضمن عدم وجود أي fallback
     * في النسخة المصدرة.
     */

    clone.querySelectorAll(
        ".logo-fallback"
    ).forEach(
        element => element.remove()
    );


    document.body.appendChild(
        clone
    );


    return clone;

}


/* =========================================================
   إنشاء PNG
========================================================= */

async function createPNG() {

    const renderer =
        await loadHtml2Canvas();


    await waitForFonts();

    await waitForImages();

    await waitFrame();


    const clone =
        createExportClone();


    try {

        /*
         * ننتظر صور النسخة أيضًا.
         */

        const cloneImages =
            clone.querySelectorAll(
                "img"
            );


        await Promise.all(

            Array.from(cloneImages).map(
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


        await waitForFonts();


        /*
         * هنا السر:
         *
         * التصميم = 1700 × 1000
         *
         * scale = 5
         *
         * الناتج = 8500 × 5000
         */

        const rendered =
            await renderer(
                clone,
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
                        false

                }
            );


        /*
         * html2canvas يفترض أن يعطينا
         * 8500 × 5000.
         */

        const output =
            document.createElement(
                "canvas"
            );


        output.width =
            CONFIG.exportWidth;

        output.height =
            CONFIG.exportHeight;


        const context =
            output.getContext(
                "2d"
            );


        context.imageSmoothingEnabled =
            true;

        context.imageSmoothingQuality =
            "high";


        context.drawImage(
            rendered,
            0,
            0,
            CONFIG.exportWidth,
            CONFIG.exportHeight
        );


        return output;

    } finally {

        clone.remove();

    }

}


/* =========================================================
   اسم الملف
========================================================= */

function cleanName(text) {

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

function downloadCanvas(canvasElement) {

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


            updateDesign();


            const finalCanvas =
                await createPNG();


            /*
             * فحص أخير للمقاس.
             */

            if (
                finalCanvas.width !==
                    CONFIG.exportWidth ||
                finalCanvas.height !==
                    CONFIG.exportHeight
            ) {

                throw new Error(
                    "مقاس التصدير غير صحيح."
                );

            }


            await downloadCanvas(
                finalCanvas
            );


        } catch (error) {

            console.error(
                "Export error:",
                error
            );


            alert(
                "حدث خطأ أثناء تصدير الصورة.\n\n" +
                "تأكد من أن شعارات المشروع موجودة داخل:\n" +
                "assets/logos/"
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
   تشغيل
========================================================= */

function initialize() {

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


    updateDesign();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initialize
    );

} else {

    initialize();

       }
