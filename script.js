function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function hide(id) {
    document.getElementById(id).classList.add("hidden");
}

function show(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hideAll() {
    for (var i = 0; i < state.all.length; i++) {
        state.all.item(i).classList.add("hidden");
    }
}

function hidePictures() {
    for (var i = 0; i < state.stimuli.length; i++) {
        state.stimuli.item(i).classList.add("hidden");
    }
}

function showPictures() {
    for (var i = 0; i < state.stimuli.length; i++) {
        state.stimuli.item(i).classList.remove("hidden");
    }
}

var state = {
    progress: 0,
    scenes: [], 
    all: document.getElementsByClassName("all"), 
    stimuli: document.getElementsByClassName("stimulus")
}

function renderState(i) {
    hideAll();
    switch(state.scenes[i][0]) {
        case "briefing":
            show("briefing-text");
            show("continue-button");
            break;
        case "break":
            show("break-text");
            setTimeout(() => {
                show("continue-button");
            }, 5000);
            break;
        case "debriefing":
            show("debriefing-text");
            show("download-button");
            break;
        case "hfuset":
            hfusetTrial();
            break;
        case "londonset":
            londonsetTrial();
            break;
    }
}

function hfusetTrial() {
    document.getElementById("stimulus-left").classList.remove("londonset-left");
    document.getElementById("stimulus-center").classList.remove("londonset-center");
    document.getElementById("stimulus-right").classList.remove("londonset-right");
    document.getElementById("stimulus-left").classList.add("hfuset-left");
    document.getElementById("stimulus-center").classList.add("hfuset-center");
    document.getElementById("stimulus-right").classList.add("hfuset-right");
    switch(state.scenes[state.progress][1]) {
        case "alone":
            document.getElementById("stimulus-left").src = "Images/001_scramble-3.jpg";
            document.getElementById("stimulus-center").src = "Images/" + state.scenes[state.progress][3] + "_scramble-0.jpg";
            document.getElementById("stimulus-right").src = "Images/001_scramble-3.jpg";
            break;
        case "group":
            document.getElementById("stimulus-left").src = "Images/" + state.scenes[state.progress][2] + "_scramble-0.jpg";;
            document.getElementById("stimulus-center").src = "Images/" + state.scenes[state.progress][3] + "_scramble-0.jpg";
            document.getElementById("stimulus-right").src = "Images/" + state.scenes[state.progress][4] + "_scramble-0.jpg";
            break;
    }
    runTrial();
}

function londonsetTrial() {
    document.getElementById("stimulus-left").classList.remove("hfuset-left");
    document.getElementById("stimulus-center").classList.remove("hfuset-center");
    document.getElementById("stimulus-right").classList.remove("hfuset-right");
    document.getElementById("stimulus-left").classList.add("londonset-left");
    document.getElementById("stimulus-center").classList.add("londonset-center");
    document.getElementById("stimulus-right").classList.add("londonset-right");
    switch(state.scenes[state.progress][1]) {
        case "alone":
            document.getElementById("stimulus-left").src = "Images/F-000.jpg";
            document.getElementById("stimulus-center").src = "Images/F-" + state.scenes[state.progress][3] + ".jpg";
            document.getElementById("stimulus-right").src = "Images/F-000.jpg";
            break;
        case "group":
            document.getElementById("stimulus-left").src = "Images/F-" + state.scenes[state.progress][2] + ".jpg";
            document.getElementById("stimulus-center").src = "Images/F-" + state.scenes[state.progress][3] + ".jpg";
            document.getElementById("stimulus-right").src = "Images/F-" + state.scenes[state.progress][4] + ".jpg";
            break;
    }
    runTrial();
}

function runTrial() {
    setTimeout(() => {
        show("conceal-pictures");
        show("fixation-cross");
        //pictures visible but concealed (to allow loading in the background)
        showPictures();
    }, 0);

    setTimeout(() => {
        //reveal pictures
        hide("conceal-pictures");
        hide("fixation-cross");
    }, 1000);

    setTimeout(() => {
        hidePictures();
        show("noise-mask");
    }, 3000);

    setTimeout(() => {
        hide("noise-mask");
        document.getElementById("slider").value = 0;
        show("slider");
        show("slider-label-left");
        show("slider-label-right");
    }, 3300);
}

function initialiseExperiment() {
    //Stimulus Set 1 (hfuset)
    var leftOrder = [];
    var rightOrder = [];
    for(var i = 1; i<32; i++) {
        leftOrder.push(("000" + i).slice (-3));
        rightOrder.push(("000" + i).slice (-3));
    }

    shuffle(leftOrder);
    shuffle(rightOrder);

    for(var i = 1; i<32; i++) {
        state.scenes.push(["hfuset", "group", leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1]]);
        state.scenes.push(["hfuset", "alone", leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1]]);
    }
    //
    //Stimulus Set 2 (londonset)
    var leftOrder = [];
    var rightOrder = [];
    for(var i = 1; i<50; i++) {
        leftOrder.push(("000" + i).slice (-3));
        rightOrder.push(("000" + i).slice (-3));
    }

    shuffle(leftOrder);
    shuffle(rightOrder);

    for(var i = 1; i<50; i++) {
        state.scenes.push(["londonset", "group", leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1]]);
        state.scenes.push(["londonset", "alone", leftOrder[i-1], ("000" + i).slice (-3), rightOrder[i-1]]);
    }
    //
    shuffle(state.scenes);
    state.scenes.splice(0,0,["briefing"]);
    state.scenes.splice(33,0,["break"]);
    state.scenes.splice(66,0,["break"]);
    state.scenes.splice(99,0,["break"]);
    state.scenes.splice(132,0,["break"]);
    state.scenes.push(["debriefing"]);
    renderState(state.progress);
}

initialiseExperiment();

document.getElementById("slider").addEventListener("change", function(event) {
    show("continue-button");
});

document.getElementById("continue-button").addEventListener("click", function(event) {
    hide("continue-button");
    switch(state.scenes[state.progress][0]) {
        case "briefing":
            break;
        case "break":
            break;
        case "debriefing":
            break;
        case "hfuset":
            state.scenes[state.progress].push("" + document.getElementById("slider").value);
            break;
        case "londonset":
            state.scenes[state.progress].push("" + document.getElementById("slider").value);
            break;
    }
    state.scenes[state.progress].push("" + Date.now());
    state.progress = state.progress + 1;
    renderState(state.progress);
});

document.getElementById("download-button").addEventListener("click", function(event) {
    var rows = state.scenes
     
     let csvContent = "data:text/csv;charset=utf-8," 
         + rows.map(e => e.join(",")).join("\n");
 
         var encodedUri = encodeURI(csvContent);
         var link = document.createElement("a");
         link.setAttribute("href", encodedUri);
         link.setAttribute("download", "experiment-log_"+Math.floor(Math.random() * 1000000) + 1+".csv");
         document.body.appendChild(link); // Required for FF
         
         link.click();
 });