const LEVELS = {
  "A1": "Beginner (A1)",
  "A2": "Pre-Intermediate (A2)",
  "B1": "Intermediate (B1)",
  "B2": "Upper-Intermediate (B2)",
  "C1": "Advanced (C1)",
  "C2": "Mastery (C2)"
  // "beginner-a1": "Beginner (A1)",
  // "pre-intermediate-a2: "Pre-Intermediate (A2)",
  // "intermediate-b1": "Intermediate (B1)",
  // "upper-intermediate-b2": "Upper-Intermediate (B2)",
  // "advanced-c1": "Advanced (C1)",
  // "mastery-c2": "Mastery (C2)"
}
const INTERESTS = ["Art", "Cooking", "Movies", "Music", "Sports", "Science", "Travel"];

class Options {
  constructor() {

    this.languageLevel = '';
    this.interests = [];

    // HTML element variables
    this._levelsGroup = null;
    this._interestsGroup = null;
    this._optionsForm = null;

    // Event handlers
    this._onSave = this._onSave.bind(this);

  }

  /**
   * Set up HTML elements and event listeners
   */
   setup() {

    // Adding event listeners
    this._optionsForm = document.querySelector("#options-form");
    this._optionsForm.save.addEventListener("click", this._onSave);

    // Creating variables for HTML elements
    this._levelsGroup = document.querySelector("#levels-group");
    this._interestsGroup = document.querySelector("#interests-group");

    // Set up sections
    this.restore();
    this.setupLevels();
    this.setupInterests();

  }

  /**
   * Restore options
   */

   restore() {

    // Use default value languageLevel = '' and interests = []
    chrome.storage.sync.get({
      languageLevel: '',
      interests: []
    }, function(items) {

      // Restore selected language level and interest(s)
      this.languageLevel = items.languageLevel;
      this.interests = items.interests;

      let selLevelBtn = document.querySelector(`#${this.languageLevel}`);
      selLevelBtn.checked = true;

      for (let interest of this.interests) {
        let selInterestChecbox = document.querySelector(`#${interest}`);
        selInterestChecbox.checked = true;
      }

    });
   }

  /**
   * Set up levels radio buttons
   */
   setupLevels() {

    for (let levelId in LEVELS) {

      let levelDiv = document.createElement("div")

      // Create radio button
      let levelBtn = document.createElement("input");
      levelBtn.id = levelId;
      levelBtn.setAttribute('type', 'radio');
      levelBtn.setAttribute('name', 'levelBtn');

      // Create label
      let levelLabel = document.createElement("label");
      levelLabel.setAttribute('for', levelId);
      levelLabel.textContent = LEVELS[levelId];

      // Add elements to div
      levelDiv.appendChild(levelBtn);
      levelDiv.appendChild(levelLabel)
      this._levelsGroup.appendChild(levelDiv);
      console.log(levelDiv)
    }

  }

  /**
   * Set up interests checkboxes
   */
   setupInterests() {

    for (let interest of INTERESTS) {

      let interestDiv = document.createElement("div")
      let interestId = `${interest}`;

      // Create checkbox
      let interestBtn = document.createElement("input");
      interestBtn.id = interestId;
      interestBtn.setAttribute('type', 'checkbox');
      interestBtn.setAttribute('name', 'interestCheckbox');

      // Create label
      let interestLabel = document.createElement("label");
      interestLabel.setAttribute('for', interestId);
      interestLabel.textContent = interest;

      // Add elements to div
      interestDiv.appendChild(interestBtn);
      interestDiv.appendChild(interestLabel)
      this._interestsGroup.appendChild(interestDiv);
            console.log(interestDiv)

    }

  }

  /**
   * Event handler: Save user's level and interest preferences
   */
   async _onSave(event) {
    event.preventDefault();

    // Save language level as a string
    let radioBtns = document.getElementsByName("levelBtn");  
    for (var radioBtn of radioBtns) {  
      if (radioBtn.checked) {
        this.languageLevel = radioBtn.id;
      }
    } 

    // Save interets in an array
    let checkboxes = document.getElementsByName("interestCheckbox");  
    for (var checkbox of checkboxes) {  
      if (checkbox.checked) {
        this.interests.push(checkbox.id);  
      }
    }
    
    if (this.languageLevel === "" || this.interests.length === 0) {
      alert("Please select your language level and interest(s)");
      return;
    }

    // Save in Chrome storage sync
    chrome.storage.sync.set({
      languageLevel: this.languageLevel,
      interests: this.interests
    }, function() {
      // Update status to let user know options were saved.
      let status = document.getElementById("status");
      status.classList.remove("hidden");
    });


  }

}

let options = new Options();
options.setup();


