// =====================================
// GPA+
// Designed by Hidaya
// =====================================

let gpaType = "semester";


// =====================================
// اختيار نوع المعدل
// =====================================

function selectGpaType(type, button) {

    gpaType = type;

    // إزالة Active من الأزرار
    document.querySelectorAll(".type-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // تفعيل الزر المختار
    button.classList.add("active");


    const previousData =
        document.getElementById("previousData");

    const resultTitle =
        document.getElementById("resultTitle");


    // =========================
    // المعدل الفصلي
    // =========================

    if (gpaType === "semester") {

        previousData.classList.add("hidden");

        resultTitle.textContent =
            "المعدل الفصلي";

    }


    // =========================
    // المعدل العام
    // =========================

    else {

        previousData.classList.remove("hidden");

        resultTitle.textContent =
            "المعدل العام";
    }


    calculateGPA();
}


// =====================================
// إضافة مادة
// =====================================

function addCourse() {

    const courses =
        document.getElementById("courses");

    const course =
        document.createElement("div");

    course.className = "course";

    course.innerHTML = `

        <input
            type="text"
            class="course-name"
            placeholder="اسم المادة"
        >

        <input
            type="number"
            class="units"
            placeholder="الوحدات"
            min="1"
        >

        <select class="grade">

            <option value="">
                التقدير
            </option>

            <option value="4">AA</option>
            <option value="3.5">A</option>
            <option value="3">BB</option>
            <option value="2.5">B</option>
            <option value="2">CC</option>
            <option value="1.5">C</option>
            <option value="1">DD</option>
            <option value="0.5">D</option>
            <option value="0">F</option>

        </select>

        <button
            class="delete-btn"
            onclick="removeCourse(this)"
        >
            ×
        </button>

    `;

    courses.appendChild(course);

    calculateGPA();
}


// =====================================
// حذف مادة
// =====================================

function removeCourse(button) {

    button.parentElement.remove();

    calculateGPA();
}


// =====================================
// حساب المعدل
// =====================================

function calculateGPA() {

    const courses =
        document.querySelectorAll(".course");


    let currentPoints = 0;
    let currentUnits = 0;
    let courseCount = 0;


    // حساب مواد الفصل الحالي
    courses.forEach(course => {

        const unitsInput =
            course.querySelector(".units");

        const gradeInput =
            course.querySelector(".grade");


        const units =
            parseFloat(unitsInput.value);

        const grade =
            parseFloat(gradeInput.value);


        if (
            !isNaN(units) &&
            units > 0 &&
            gradeInput.value !== ""
        ) {

            currentPoints += units * grade;

            currentUnits += units;

            courseCount++;
        }

    });


    // =================================
    // المعدل الفصلي
    // =================================

    let finalGPA = 0;

    let finalUnits = currentUnits;


    if (gpaType === "semester") {

        if (currentUnits > 0) {

            finalGPA =
                currentPoints / currentUnits;
        }

    }


    // =================================
    // المعدل العام
    // =================================

    else {

        const previousGpa =
            parseFloat(
                document.getElementById("previousGpa").value
            );

        const previousUnits =
            parseFloat(
                document.getElementById("previousUnits").value
            );


        if (
            !isNaN(previousGpa) &&
            !isNaN(previousUnits) &&
            previousUnits >= 0 &&
            previousGpa >= 0 &&
            previousGpa <= 4
        ) {

            const previousPoints =
                previousGpa * previousUnits;


            const totalPoints =
                previousPoints + currentPoints;


            const totalUnits =
                previousUnits + currentUnits;


            if (totalUnits > 0) {

                finalGPA =
                    totalPoints / totalUnits;

                finalUnits =
                    totalUnits;
            }

        }

    }


    // تقريب إلى منزلتين
    finalGPA =
        Math.round(finalGPA * 100) / 100;


    // =================================
    // عرض النتيجة
    // =================================

    const resultTitle =
        document.getElementById("resultTitle");


    if (gpaType === "semester") {

        resultTitle.textContent =
            "المعدل الفصلي";

    } else {

        resultTitle.textContent =
            "المعدل العام";
    }


    document.getElementById("gpaResult").textContent =
        finalGPA.toFixed(2);


    document.getElementById("unitsResult").textContent =
        finalUnits;


    document.getElementById("coursesResult").textContent =
        courseCount;


    // =================================
    // HERO
    // =================================

    document.getElementById("heroGpa").textContent =
        finalGPA.toFixed(2);


    document.getElementById("heroCourses").textContent =
        courseCount;


    document.getElementById("heroUnits").textContent =
        finalUnits;


    // =================================
    // GPA CIRCLE
    // =================================

    const degree =
        Math.min((finalGPA / 4) * 360, 360);


    const circle =
        document.getElementById("gpaCircle");


    if (
        document.body.classList.contains("dark-mode")
    ) {

        circle.style.background = `
            radial-gradient(
                circle,
                #1A1A22 57%,
                transparent 58%
            ),
            conic-gradient(
                #6658E8 0deg,
                #6658E8 ${degree}deg,
                #383743 ${degree}deg,
                #383743 360deg
            )
        `;

    } else {

        circle.style.background = `
            radial-gradient(
                circle,
                white 57%,
                transparent 58%
            ),
            conic-gradient(
                #6658E8 0deg,
                #6658E8 ${degree}deg,
                #E8E5FA ${degree}deg,
                #E8E5FA 360deg
            )
        `;
    }

}


// =====================================
// تحديث تلقائي
// =====================================

document.addEventListener("input", function(event) {

    if (
        event.target.classList.contains("units") ||
        event.target.classList.contains("course-name") ||
        event.target.id === "previousGpa" ||
        event.target.id === "previousUnits"
    ) {

        calculateGPA();
    }

});


document.addEventListener("change", function(event) {

    if (
        event.target.classList.contains("grade")
    ) {

        calculateGPA();
    }

});


// =====================================
// DARK MODE
// =====================================

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const button =
        document.querySelector(".theme-btn");


    if (
        document.body.classList.contains("dark-mode")
    ) {

        button.textContent = "☀️";

    } else {

        button.textContent = "🌙";
    }


    calculateGPA();
}


// =====================================
// تشغيل
// =====================================

calculateGPA();