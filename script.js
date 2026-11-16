/* =================================
   1. PAGE NAVIGATION
================================= */

const navButtons = document.querySelectorAll(".nav-btn");

const pages = document.querySelectorAll(".page");

function showPage(pageName) {

    // Page အားလုံးကို ဖျောက်မယ်
    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // ရွေးချယ်ထားတဲ့ Page ကို ပြမယ်
    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Navigation အရောင်ပြောင်းမယ်
    navButtons.forEach(function(button) {
        button.classList.remove("active");

        if (button.dataset.page === pageName) {
            button.classList.add("active");
        }
    });

    // Page အသစ်ပြောင်းတိုင်း အပေါ်ဆုံးပြန်သွားမယ်
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Navigation Button Click
navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const pageName = button.dataset.page;

        showPage(pageName);

    });

});


/* =================================
   2. QUIZ QUESTION BANK
================================= */

const questions = [

    {
        question: "စက်မှုတော်လှန်ရေးကို မည်သည့်နိုင်ငံတွင် စတင်ခဲ့သနည်း။",

        answers: [
            "အမေရိကန်",
            "ဗြိတိန်",
            "ဂျာမနီ",
            "ပြင်သစ်"
        ],

        correct: 1
    },

    {
        question: "ပထမအဆင့် စက်မှုတော်လှန်ရေးတွင် အဓိကအသုံးပြုခဲ့သော စွမ်းအင်မှာ အဘယ်နည်း။",

        answers: [
            "နေရောင်ခြည်",
            "လျှပ်စစ်",
            "ရေနွေးငွေ့",
            "နျူကလီးယား"
        ],

        correct: 2
    },

    {
        question: "Spinning Jenny ကို မည်သူတီထွင်ခဲ့သနည်း။",

        answers: [
            "James Hargreaves",
            "James Watt",
            "Thomas Edison",
            "Henry Ford"
        ],

        correct: 0
    },

    {
        question: "ဒုတိယအဆင့် စက်မှုတော်လှန်ရေးတွင် အရေးပါသော စွမ်းအင်တစ်မျိုးမှာ အဘယ်နည်း။",

        answers: [
            "ထင်း",
            "လျှပ်စစ်",
            "လေစွမ်းအင်",
            "ရေစွမ်းအင်"
        ],

        correct: 1
    },

    {
        question: "မော်တော်ကား အမြောက်အမြားထုတ်လုပ်သည့် စနစ်ကို ဖွံ့ဖြိုးစေခဲ့သူမှာ မည်သူနည်း။",

        answers: [
            "James Watt",
            "Richard Arkwright",
            "Henry Ford",
            "George Stephenson"
        ],

        correct: 2
    }

];


/* =================================
   3. QUIZ VARIABLES
================================= */

let currentQuestion = 0;

let score = 0;

let answered = false;


/* =================================
   4. DISPLAY QUESTION
================================= */

function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    document.getElementById("question-number")
        .textContent =
        "မေးခွန်း " + (currentQuestion + 1);

    document.getElementById("question")
        .textContent = question.question;

    document.getElementById("feedback")
        .textContent = "";

    document.getElementById("next-btn")
        .disabled = true;

    const answersBox =
        document.getElementById("answers");

    answersBox.innerHTML = "";

    question.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.textContent = answer;

        button.className = "answer-btn";

        button.addEventListener("click", function() {

            checkAnswer(index, button);

        });

        answersBox.appendChild(button);

    });

}


/* =================================
   5. CHECK ANSWER
================================= */

function checkAnswer(selectedIndex, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    const correctIndex =
        questions[currentQuestion].correct;

    const allButtons =
        document.querySelectorAll(".answer-btn");

    if (selectedIndex === correctIndex) {

        score++;
        selectedButton.classList.add("correct");

        document.getElementById("feedback")
            .innerHTML = '<svg class="ico fb-ok"><use href="#i-check"/></svg> မှန်ကန်ပါသည်။ ကောင်းပါသည်။';

    } else {

        selectedButton.classList.add("wrong");

        allButtons[correctIndex]
            .classList.add("correct");

        document.getElementById("feedback")
            .innerHTML = '<svg class="ico fb-no"><use href="#i-x"/></svg> မမှန်ပါ။ အဖြေမှန်မှာ ' +
            questions[currentQuestion].answers[correctIndex];

    }

    document.getElementById("next-btn")
        .disabled = false;

    // ဖြေပြီးသားအဖြေများ ပြန်မပြောင်းနိုင်စေရန်
    allButtons.forEach(function(button) {
        button.disabled = true;
    });

}


/* =================================
   6. NEXT QUESTION
================================= */

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

}


/* =================================
   7. SHOW FINAL RESULT
================================= */

function showResult() {

    document.getElementById("question-number")
        .textContent = "စာမေးပွဲပြီးဆုံးပါပြီ";

    document.getElementById("question")
        .textContent = "သင်၏ရမှတ်မှာ";

    document.getElementById("answers")
        .innerHTML = "";

    document.getElementById("feedback")
        .textContent = "ကြိုးစားဖြေဆိုပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်။";

    document.getElementById("score")
        .textContent =
        score + " / " + questions.length + " မှတ် ရရှိပါသည်။";

    document.getElementById("next-btn")
        .hidden = true;

    document.getElementById("restart-btn")
        .hidden = false;

}


/* =================================
   8. RESTART QUIZ
================================= */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    document.getElementById("score")
        .textContent = "";

    document.getElementById("next-btn")
        .hidden = false;

    document.getElementById("restart-btn")
        .hidden = true;

    loadQuestion();

}


/* =================================
   9. START QUIZ
================================= */

loadQuestion();



/* =================================
   10. INVENTION DETAIL POPUP
================================= */

const modal = document.getElementById("topic-modal");
let lastTopic = null;

function openTopic(topic) {

    lastTopic = topic;

    const img = topic.querySelector(".topic-img img");

    document.getElementById("modal-img").src = img.src;
    document.getElementById("modal-img").alt = img.alt;

    document.getElementById("modal-year").textContent =
        topic.dataset.year + " ခုနှစ်";

    document.getElementById("modal-title").textContent =
        topic.querySelector("h4").textContent.trim();

    document.getElementById("modal-inventor").textContent =
        topic.querySelector(".topic-cap b").textContent;

    document.getElementById("modal-detail").innerHTML =
        topic.querySelector(".topic-detail").innerHTML;

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();

}

function closeTopic() {

    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (lastTopic) {
        lastTopic.focus();
    }

}

document.querySelectorAll(".topic[data-year]").forEach(function(topic) {

    topic.addEventListener("click", function() {
        openTopic(topic);
    });

    topic.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openTopic(topic);
        }
    });

});

modal.querySelectorAll("[data-close]").forEach(function(el) {
    el.addEventListener("click", closeTopic);
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.hidden) {
        closeTopic();
    }
});



/* =================================
   11. NAVIGATION DROPDOWN (သင်ခန်းစာ) AUTO CLOSE
================================= */

const lessonMenu = document.querySelector("details.dropdown");

function closeLessonMenu() {
    if (lessonMenu) {
        lessonMenu.removeAttribute("open");
    }
}

// တခြားနေရာကို နှိပ်ရင် ပိတ်မယ်
document.addEventListener("click", function(e) {
    if (lessonMenu && !lessonMenu.contains(e.target)) {
        closeLessonMenu();
    }
});

// Menu ထဲက page ရွေးပြီးရင် ပိတ်မယ်
document.querySelectorAll(".dropdown-menu .nav-btn").forEach(function(btn) {
    btn.addEventListener("click", closeLessonMenu);
});

// Esc နှိပ်ရင် ပိတ်မယ်
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeLessonMenu();
    }
});


/* =================================
   12. VIDEO STATUS (PLAY / PAUSE)
================================= */

const lessonVideo = document.querySelector(".video-screen video");
const videoStatus = document.getElementById("video-status");

function setVideoStatus(isPlaying) {
    videoStatus.classList.toggle("playing", isPlaying);
    videoStatus.querySelector("em").textContent =
        isPlaying ? "PLAY" : "PAUSE";
}

if (lessonVideo && videoStatus) {

    lessonVideo.addEventListener("play",    function() { setVideoStatus(true);  });
    lessonVideo.addEventListener("playing", function() { setVideoStatus(true);  });
    lessonVideo.addEventListener("pause",   function() { setVideoStatus(false); });
    lessonVideo.addEventListener("ended",   function() { setVideoStatus(false); });

}

// တခြား page သို့ ပြောင်းသွားရင် ဗီဒီယိုကို ရပ်ထားမယ်
const originalShowPage = showPage;

showPage = function(pageName) {
    if (pageName !== "video" && lessonVideo && !lessonVideo.paused) {
        lessonVideo.pause();
    }
    originalShowPage(pageName);
};


/* =================================
   13. VIDEO PICKER (ဗီဒီယို ၃ ခု)
   ဖိုင်နာမည် အမျိုးမျိုးကို အလိုအလျောက် စမ်းရှာပေးမယ်
================================= */

const videoList = [
    {
        title: "ကလေးများအတွက် စက်မှုတော်လှန်ရေး",
        srcs: ["video-1.mp4", "videos/video-1.mp4"]
    },
    {
        title: "စက်မှုတော်လှန်ရေး",
        srcs: ["video-2.mp4", "videos/video-2.mp4"]
    },
    {
        title: "သမိုင်းအလှည့်အပြောင်းများ",
        srcs: ["video-3.mp4", "videos/video-3.mp4"]
    }
];

const pickerItems = document.querySelectorAll(".vp-item");
const videoCap = document.querySelector(".video-cap");
const capText = videoCap ? videoCap.textContent : "";

let currentVideo = 0;
let srcTry = 0;
let wantPlay = false;

function loadVideoSrc() {
    lessonVideo.src = videoList[currentVideo].srcs[srcTry];
    lessonVideo.load();
    if (wantPlay) {
        const p = lessonVideo.play();
        if (p && p.catch) { p.catch(function() {}); }
    }
}

function selectVideo(index, autoplay) {

    if (!videoList[index] || !lessonVideo) { return; }

    currentVideo = index;
    srcTry = 0;
    wantPlay = !!autoplay;

    lessonVideo.pause();
    loadVideoSrc();

    document.getElementById("video-title").textContent = videoList[index].title;
    if (videoCap) { videoCap.textContent = capText; }

    pickerItems.forEach(function(item, i) {
        item.classList.toggle("active", i === index);
        item.setAttribute("aria-pressed", i === index ? "true" : "false");
    });

    setVideoStatus(false);
}

pickerItems.forEach(function(item) {
    item.addEventListener("click", function() {
        selectVideo(Number(item.dataset.index), true);
    });
});

// ဖိုင်မတွေ့ရင် နောက်ဖိုင်နာမည်ကို ဆက်စမ်းမယ်
if (lessonVideo) {
    lessonVideo.addEventListener("error", function() {
        if (srcTry < videoList[currentVideo].srcs.length - 1) {
            srcTry++;
            loadVideoSrc();
        } else if (videoCap) {
            videoCap.textContent = "ဗီဒီယိုဖိုင်ကို ရှာမတွေ့ပါ။ " + videoList[currentVideo].srcs[0] +
                " ဖိုင်ကို index.html နှင့် folder တစ်ခုတည်းတွင် ထားပါ။";
        }
    });
}