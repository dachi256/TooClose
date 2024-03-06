



document.addEventListener('DOMContentLoaded', function() {
    let currentPanelIndex = 0;
    let nextPanelIndex = null;
    const panels = [
        "panels/panel-1.png", // first panel
        { choiceA: 2, choiceB: "TheEnd", question: "Yes or No" }, // decision at panel-2.png
        "panels/panel-3.png", // continue story after opening the letter
        "panels/panel-4.png",
        "panels/panel-5.png",
        "panels/panel-6.png",
        "panels/panel-7.png", 
        "panels/panel-8.png", 
        "panels/panel-9.png", 
        { choiceA: 11, choiceB: 10, question: "Ask Bartender or Call out her name?" }, // decision object, split with or
        "panels/panel-11.png", // leads to panel 13
        "panels/panel-12.png", // leads to panel 13
        "panels/panel-13.png", // Merge
        "panels/panel-14.png", 
        "panels/panel-15.png", 
        "panels/panel-16.png", 
        "panels/panel-17.png", 
        "panels/panel-18.png", 
        "panels/panel-19.png", 
        "panels/panel-20.png", 
        "panels/panel-21.png", 
        "panels/panel-22.png", 
        "panels/panel-23.png", 
        "panels/panel-24.png", 
        "panels/panel-25.png", 
        "panels/panel-26.png", 
        "panels/panel-27.png",
        "panels/panel-28.png",
        "panels/panel-29.png",
        "panels/panel-30.png",
        "panels/panel-31.png",
        "panels/panel-32.png",
        "panels/panel-33.png",
        { choiceA: 34, choiceB: 40, question: "Yes or No" }, // New decision at panel 34
        "panels/panel-35.png",  
        "panels/panel-36.png",  
        "panels/panel-37.png",  
        "panels/panel-38.png",  
        "panels/panel-39.png",  
        "panels/panel-40.png", //  skip to 46 after this
        "panels/panel-41.png", // no option
        "panels/panel-42.png",
        "panels/panel-43.png",
        "panels/panel-44.png",
        "panels/panel-45.png", // continue to panel 46 after this
        "panels/panel-46.png", 
        "panels/panel-47.png", 
        "panels/panel-48.png", 
        "panels/panel-49.png", 
        "panels/panel-50.png", 
        "panels/panel-51.png", 
        "panels/panel-52.png", 
        "panels/panel-53.png", 
        "panels/panel-54.png", 
        { choiceA: 55, choiceB: 55, question: "leave or follow calling of her name" }, // decision at panel 55
        "panels/panel-56.png",  
        "panels/panel-57.png",  
        "panels/panel-58.png",  
        "panels/panel-59.png",  
        "panels/panel-60.png",  
        "panels/panel-61.png", 
        "panels/panel-62.png",
        "panels/panel-63.png",
        "panels/panel-64.png",
        "panels/panel-65.png",
        "panels/panel-66.png",
        "panels/panel-67.png",

        "panels/TheEnd.png" // The end panel 
    ];
  
    function updatePanel() {
      let panel = panels[currentPanelIndex];
      const currentPanelImage = document.getElementById('current-panel');
      const choicesDiv = document.getElementById('choices');
      const choiceAButton = document.getElementById('choiceA');
      const choiceBButton = document.getElementById('choiceB');
      const nextButton = document.getElementById('next');
      const restartButton = document.getElementById('restart');
  
      currentPanelImage.style.display = 'block';
  
      if (typeof panel === 'object') {
        // check for decision panels and set the appropriate background
        if (currentPanelIndex === 33) { // decision panel at index 33 (Panel 34)
            currentPanelImage.src = "panels/panel-34.png"; 
        } else if (currentPanelIndex === 54) { // decision panel at index 54 (Panel 55)
            currentPanelImage.src = "panels/panel-55.png";
        } else if (currentPanelIndex == 9) { // decision panel at 10
            currentPanelImage.src = "panels/panel-10.png"; 
        } else {
            // default
            currentPanelImage.src = "panels/panel-2.png"; // final decision at panel2
        }
        choicesDiv.style.display = 'block';
        choiceAButton.textContent = panel.question.split(" or ")[0]; // Split the question and set the text content
        choiceBButton.textContent = panel.question.split(" or ")[1]; 
        nextButton.style.display = 'none';
    } else {
        // It's a regular panel
        currentPanelImage.src = panel;
        choicesDiv.style.display = 'none';
        nextButton.style.display = currentPanelIndex === panels.length - 1 ? 'none' : 'block';
    }

    restartButton.style.display = currentPanelIndex === panels.length - 1 ? 'block' : 'none'; // Show the restart button only on the last panel

    if (currentPanelIndex === 6) { // Check if it's panel 7 (index 6)
        playPartyMusic(); // Play party music
    } else if (currentPanelIndex === 34 || currentPanelIndex === 42 ) {
        mufflePartyMusic(); // Muffle party music 
    } else if (currentPanelIndex === 45 ) {
        playSuspenseMusic(); // Play suspense music and pause party music
    }


}

    document.getElementById('choiceA').addEventListener('click', function() {
        let decision = panels[currentPanelIndex];
        if (typeof decision.choiceA === 'number') {
            // If it's a direct navigation decision
            currentPanelIndex = decision.choiceA;
        } else if (decision.choiceA === "TheEnd") {
            // If the decision is to end the story
            currentPanelIndex = panels.length - 1;
        }
        updatePanel();
    });
    
    document.getElementById('choiceB').addEventListener('click', function() {
        let decision = panels[currentPanelIndex];
        if (typeof decision.choiceB === 'number') {
            // If it's a direct navigation decision
            currentPanelIndex = decision.choiceB;
        } else if (decision.choiceB === "TheEnd") {
            // If the decision is to end the story
            currentPanelIndex = panels.length - 1;
        }
        updatePanel();
    });
    
    document.getElementById('next').addEventListener('click', function() {
        if (currentPanelIndex == 10) { // After "Call out her name" -> Panel 11, skip to Panel 13
            currentPanelIndex = 12; 
        } else if (currentPanelIndex == 39) { // Last panel before the skip for "No" from new decision
            currentPanelIndex = 45; // Skip to panel 46
        } else if (nextPanelIndex !== null) {
            currentPanelIndex = nextPanelIndex;
            nextPanelIndex = null;
        } else {
            currentPanelIndex++;
        }
        updatePanel();
    });
    

  
    document.getElementById('restart').addEventListener('click', function() {
        // Pause or stop all background music
        introMusic.currentTime = 0; // Reset the intro music
        introMusic.play(); // Pause the intro music
        partyMusic.pause(); // Pause the party music
        suspenseMusic.pause(); // Pause the suspense music
        
        currentPanelIndex = 0;
        nextPanelIndex = null; // Reset
        updatePanel();
    });
    updatePanel(); // Initialize the first panel

    //audio elements
    const playButton = document.getElementById('playButton');
    const currentPanelImage = document.getElementById('current-panel');
    const introMusic = document.getElementById('introMusic');
    const partyMusic = new Audio('music/party.mp3'); 
    partyMusic.volume = 0.3; //  initial volume for party music
    partyMusic.loop = true;
    const suspenseMusic = new Audio('music/suspense.mp3'); 
    suspenseMusic.volume = 0.5; //  initial volume for suspense music

    // play party music and pause intro music
    function playPartyMusic() {
        introMusic.pause(); 
        partyMusic.play(); 
    }

    function mufflePartyMusic() {
        partyMusic.volume = 0.05; 
    }

    function playSuspenseMusic() {
        partyMusic.pause(); 
        suspenseMusic.play(); 
    }


    

    //  apply blur to the comic panel
    currentPanelImage.classList.add('blurred');

    // Event listener for the play button
    playButton.addEventListener('click', function() {
        // remove the blur effect and hide the play button
        currentPanelImage.classList.remove('blurred');
        playButton.style.display = 'none';
        introMusic.play();
        
    });

    // Event listener for the intro music canplaythrough event //autostart
    introMusic.addEventListener('canplaythrough', function() {
        introMusic.play();
    });

    
    // Initialize the first panel
    updatePanel();
  });
  