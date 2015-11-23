/** 
 * @file Types Exercise
 * @author 
 */
var main = function(ex) {
    //always quiz-immediate
    console.log(ex.data.meta.mode);
    
    /**
     * @returns {object} See Piazza post 
     */
    var generateContent = function () {
        var content = {};
        //populate content
        return content;
    };

    /**
     * @param {object} the result of generateContent()
     * @param {object} just pass in ex.data
     * @returns {number} floating point from 0 to 1
     */
    var grade = function (content,state) {
        return 1.0; 
    };

    //A good place to start is the kitchen sink

    textbox112 = function(message, options, width, left, top, cx, cy, height) {
            // Default Arguments!
            if(typeof(width) == 'undefined') {width = ex.width()/4;}
            if(typeof(cx) == 'undefined') {cx = ex.width() / 2;}
            if(typeof(cy) == 'undefined') {cy = ex.height() / 2;}
            if(typeof(height) == 'undefined') {height = width;}

            var element = ex.alert(message, {
                fontSize: (width/height * 20),
                stay: true,
                removeXButton: true,
                opacity: 0.8
            });
            element.style(options);
            if (typeof(left) == 'undefined') {left = cx - width / 2}
            if (typeof(top) == 'undefined') {top = cy - height / 2}
            element.position(left, top);

            return element;
        };
    
    insertTextAreaTextbox112 = function(TextboxElement, textarea) {
            var identifier = "$TEXTAREA$";
            ex.insertDropdown(TextboxElement, identifier, textarea);
    }

    insertButtonTextbox112 = function(TextboxElement, button, identifier) {
            ex.insertDropdown(TextboxElement, identifier, button);
        };



    var listOfStringTypes = ["a", "A", "hello", "chr(97)", "\'0\'", "\'True\'"];
    var listOfIntTypes = ["13", "42", "-124", "ord('a')", "0"]; //Can dynamically do these and will add later
    var listOfFloatTypes = ["1.", "42.9999999999", "0.1", "4.2"];
    var listOfBoolTypes = ["True", "False", "1 and 0", "True or False"];
    var listOfAllTypes = [listOfStringTypes, listOfIntTypes, listOfFloatTypes, listOfBoolTypes];



    function runPracticeMode(){
        alert("Practice Mode");
        return;
    }

    function runQuizImmediateMode(){
        alert("Quizzing Immediately");
        ex.createParagraph(500, 500, "Hello world");
        var newButton = ex.createButton(0, 0, "OK");
        newButton.on("click", function() {
            console.log("such button very 539");
            newBox.remove();
            secondInstructionBox();
        })
        var newBox = textbox112("Here we will talk about Python Types <span>BUTTON</span>", {
            color: "blue"
        });
        insertButtonTextbox112(newBox, newButton, "BUTTON");
        return;
    }

    function secondInstructionBox(){
        var infoOkButton = ex.createButton(0, 0, "OK");
        infoOkButton.on("click", function() {
            infoBox.remove();
            playGuideBox();
        })
        var infoBox = textbox112("For more on types, click the info button, else let's begin <span>BUTTON</span>", {
            color: "blue"
        })
        insertButtonTextbox112(infoBox, infoOkButton, "BUTTON");
    }

    function playGuideBox(){
        var beginButton = ex.createButton(0, 0, "OK");
        beginButton.on("click", function() {
            beginBox.remove();
            playPracticeGame();
        })
        var beginBox = textbox112("Select and drop the correct type of object <span> BUTTON </span>");
        insertButtonTextbox112(beginBox, beginButton, "BUTTON");
    }

    function playPracticeGame(){
        //Randomly Generate an element and type
        //Create graphics as needed
        //Check for mousedown (function needed)
        //Drag and drop
        //Check for correctness
        //Create feedback as needed
        return;
    }

    var showAgain = true;

    function provideFeedback(value, expectedResult, actualResult){
        if (expectedResult == actualResult){
            if (showAgain){
                var hideButton = ex.createButton(0, 0, "Hide Correct Feedback");
                hideButton.on("click", function() {
                    showAgain = false;
                    correctBox.remove();
                })
                var nahButton = ex.createButton(0, 0, "OK");
                nahButton.on("click", function(){
                    correctBox.remove();
                })
                var correctBox = textbox112("Correct! <span>BTN1</span> <span>BTN2</span>");
                insertButtonTextbox112(correctBox, hideButton, "BTN1");
                insertButtonTextbox112(correctBox, nahButton, "BTN2");
            }
        }
        else{
            //Add in feedback for wrong answers
            if (expectedResult == "string" && value[0:3] == "chr"){
                //we know it is a misunderstanding of what chr is
                return;
            }
            else if (expectedResult == "int" && value[0:3] == "ord"){
                //Misunderstanding of what ord is
                return;
            }
            else if (expectedResult == "string"){
                //Misunderstanding of what makes a string a string
                //Check for other types but in string form i.e True
            }
            else if (expectedResult == "int"){
                //Misunderstanding of what makes an int an int
            }
            else if (expectedResult == "bool"){
                //Misunderstanding of what makes a bool a bool
            }

            return
        }
    }

    function runQuizDelayMode(){
        alert("Quizzing on a Delay")
        return;
    }

    switch (ex.data.meta.mode){
        case "practice":
            runPracticeMode(ex)
            return;
        case "quiz-immediate":
            runQuizImmediateMode(ex)
            return;
        case "quiz-delay":
            runQuizDelayMode(ex)
            return;
    }

};