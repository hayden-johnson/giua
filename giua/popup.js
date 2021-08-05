class Popup {
  getUrl() {
        return chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            console.log(tabs[0].url);
        let postUrl = "http://lekan101.duckdns.org:5000/parse";
        // $.post(postUrl, {"url": url}, function(data, status){
            // console.log(data);
        // });
        return fetch(postUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"url": tabs[0].url})
        })
        .then((response) => {
            let r = response.json().then(function(response) {
                              
                // Create variables for HTML elements
                let _difficultyDisplay = document.querySelector("#difficulty");
                let _descriptionContainer = document.querySelector("#description-container");
                let _topicsContainer = document.querySelector("#topics-container");
                let _buttonsContainer = document.querySelector("#buttons-container")
                let _startBtn = document.querySelector("#start");

                // Add event handlers
                _startBtn.addEventListener("click", (event) => {
                  window.close();
                });
                  /**
                   * Set up green / red display of the difficulty score 
                   */

                // Configure difficulty score
                let difficultyText = document.createElement("h2");
                difficultyText.textContent = response.difficulty;
                _difficultyDisplay.appendChild(difficultyText);
                
                chrome.storage.sync.get({
                      languageLevel: '',
                      interests: []
                    }, function(items) {
                        let userLevel = 0;
                        let articleLevel = 0;
                        
                        if(items.languageLevel.toLowerCase() === "a1") {
                            userLevel = 1;
                        } else if (items.languageLevel.toLowerCase() === "a2") {
                            userLevel = 2;
                        } else if (items.languageLevel.toLowerCase() === "b1") {
                            userLevel = 3;
                        } else if (items.languageLevel.toLowerCase() === "b2") {
                            userLevel = 4;
                        } else if (items.languageLevel.toLowerCase() === "c1") {
                            userLevel = 5;
                        } else if (items.languageLevel.toLowerCase() === "c2") {
                            userLevel = 6;
                        }

                        if (userLevel === 0) {
                            alert("Please set your language proficiency in the options menu.");
                            return;
                        }
                        
                        if(response.difficulty === "beginner-a1"){
                            articleLevel = 1;
                        } else if (response.difficulty === "pre-intermediate-a2") {
                            articleLevel = 2;
                        } else if (response.difficulty === "intermediate-b1") {
                            articleLevel = 3;
                        } else if (response.difficulty === "upper-intermediate-b2") {
                            articleLevel = 4;
                        } else if (response.difficulty === "advanced-c1") {
                            articleLevel = 5;
                        } else if (response.difficulty === "mastery-c2") {
                            articleLevel = 6;
                        }
                        
                        // Apply red or green styling
                        if (userLevel >= articleLevel) {
                          _difficultyDisplay.classList.add("green");
                        } else {
                          _difficultyDisplay.classList.add("red");
                        }
                        
                      /**
                       * Set up description explaining the difficulty estimation
                       */

                        // Configure and add description title element
                        let titleStr = "";
                        if (userLevel >= articleLevel) {
                          titleStr += "This is a good challenge for you!"
                        } else {
                          titleStr += "This is a bit above your reading level."
                        }
                        let titleText = document.createElement("h2");
                        titleText.textContent = titleStr;
                        _descriptionContainer.appendChild(titleText);

                        // Configure description text
                        let descriptionStr = "We detected the following difficulty factors on this webpage: ";
                        for (let factor of response.difficultyFactors) {
                          descriptionStr += factor + ", ";
                        }
                        descriptionStr = descriptionStr.slice(0, -2);

                        // Create and add description text element
                        let descriptionText = document.createElement("p");
                        descriptionText.textContent = descriptionStr;
                        _descriptionContainer.appendChild(descriptionText);
                    });





              /**
               * Set up canvas filter bubbles containing article topics
               */

                for (let topic of response.topics) {
                  let topicBubble = document.createElement("div");
                  topicBubble.textContent = topic;
                  topicBubble.classList.add('topic-bubble');
                  _topicsContainer.appendChild(topicBubble);
                }

            });
            return r;
        })
        .catch((error) => {
            console.log("Api call error ", error.message);
        }); 
            return tabs[0].url;
        
        });
  }  
  
    getRecs() {
        return chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            console.log(tabs[0].url);
            let postUrl = "http://lekan101.duckdns.org:5000/topics";
            
                chrome.storage.sync.get({
                      languageLevel: '',
                      interests: []
                    }, function(items) {
                        if(items.languageLevel.toLowerCase() === "a1") {
                            items.languageLevel = "a1-beginner";
                        } else if (items.languageLevel.toLowerCase() === "a2") {
                            items.languageLevel = "a2-pre-intermediate";
                        } else if (items.languageLevel.toLowerCase() === "b1") {
                            items.languageLevel = "b1-intermediate";
                        } else if (items.languageLevel.toLowerCase() === "b2") {
                            items.languageLevel = "b2-upper-intermediate";
                        } else if (items.languageLevel.toLowerCase() === "c1") {
                            items.languageLevel = "c1-advanced";
                        } else if (items.languageLevel.toLowerCase() === "c2") {
                            items.languageLevel = "c2-mastery";
                        }
                        console.log(items);

                      fetch(postUrl, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(
                        {
                            "topics": items.interests,
                            "proficiency": items.languageLevel.toLowerCase()
                        })
                    })
                    .then((response) => {
                        let r = response.json().then(function(response) {
                            console.log(response);
                            let txt = document.getElementById("articleLink");
                            txt.innerHTML = response.url;
                            txt.href = response.url;

                        });
                        return r;
                    })
                    .catch((error) => {
                        console.log("Api call error ", error.message);
                    }); 
                });

            
            return tabs[0].url;
        
        });
  }  
    
  constructor() {

    // Passed in variables
    this.difficultyScore = "low-intermediate"
    this.isAppropriateDifficulty = false;
    this.difficultyFactors = ["factor 1", "factor 2", "factor 3"];
    this.topics = ["soccer", "sports", "Brazil", "The Olympics", "Neymar"];
   

  }

  /**
   * Set up HTML elements and event listeners
   */
  setup() {
    this.getUrl(this.topics);
    this.getRecs();
  }
}

let popup = new Popup();
popup.setup();

