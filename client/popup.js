
class Popup {
  constructor() {
  
    // Passed in variables
    this.difficultyScore = "low-intermediate"
    this.isAppropriateDifficulty = false;
    this.difficultyFactors = ["factor 1", "factor 2", "factor 3"];
    this.topics = ["soccer", "sports", "Brazil", "The Olympics", "Neymar"];

    // HTML element variables
    this._difficultyDisplay = null;
    this._descriptionContainer = null;
    this._topicsContainer = null;
    this._buttonsContainer = null
    this._startBtn = null;

  }

  /**
   * Set up HTML elements and event listeners
   */
  setup() {

    // Create variables for HTML elements
    this._difficultyDisplay = document.querySelector("#difficulty");
    this._descriptionContainer = document.querySelector("#description-container");
    this._topicsContainer = document.querySelector("#topics-container");
    this._buttonsContainer = document.querySelector("#buttons-container")
    this._startBtn = document.querySelector("#start");

    // Add event handlers
    this._startBtn.addEventListener("click", (event) => {
      window.close();
    });

    // Set up sections
    this.setupDifficultyDisplay();
    this.setupDescriptionDisplay();
    this.setupTopicsDisplay();
    this.setupButtonDisplay();

  }

  /**
   * Set up green / red display of the difficulty score 
   */
  setupDifficultyDisplay() {

    // Configure difficulty score
    let difficultyText = document.createElement("h2");
    difficultyText.textContent = this.difficultyScore;
    this._difficultyDisplay.appendChild(difficultyText);

    // Apply red or green styling
    if (this.isAppropriateDifficulty) {
      this._difficultyDisplay.classList.add("green");
    } else {
      this._difficultyDisplay.classList.add("red");
    }

  }

  /**
   * Set up description explaining the difficulty estimation
   */
   setupDescriptionDisplay() {

    // Configure and add description title element
    let titleStr = "";
    if (this.isAppropriateDifficulty) {
      titleStr += "This is a good challenge for you!"
    } else {
      titleStr += "This is a bit above your reading level."
    }
    let titleText = document.createElement("h2");
    titleText.textContent = titleStr;
    this._descriptionContainer.appendChild(titleText);

    // Configure description text
    let descriptionStr = "We detected the following difficulty factors on this webpage: ";
    for (let factor of this.difficultyFactors) {
      descriptionStr += factor + ", ";
    }
    descriptionStr = descriptionStr.slice(0, -2);

    // Create and add description text element
    let descriptionText = document.createElement("p");
    descriptionText.textContent = descriptionStr;
    this._descriptionContainer.appendChild(descriptionText);
   }

  /**
   * Set up canvas filter bubbles containing article topics
   */

  setupTopicsDisplay() {
    for (let topic of this.topics) {
      console.log(topic)
      let topicBubble = document.createElement("div");
      topicBubble.textContent = topic;
      topicBubble.classList.add('topic-bubble');
      this._topicsContainer.appendChild(topicBubble);
    }
  }

  /**
   * Set up action button(s) at the bottom of the modal
   */
   setupButtonDisplay() {
    this._startBtn.classList.add("half-btn");

    if (!this.isAppropriateDifficulty) {

      // Create Recommend New button
      let recommendNewBtn = document.createElement("button");
      let recommendNewBtnText = document.createElement("h2");
      recommendNewBtnText.textContent = "Recommend New";
      recommendNewBtn.appendChild(recommendNewBtnText);

      // Add Recommend New event listener
      recommendNewBtn.addEventListener("click", (event) => {
        window.close();
      });


      // Style Recommend New button
      recommendNewBtn.classList.add("half-btn", "secondary-btn");
      this._buttonsContainer.appendChild(recommendNewBtn);

    } 
  }

}

let popup = new Popup();
popup.setup();

