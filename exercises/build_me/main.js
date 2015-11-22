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

    function runPracticeMode(){
        alert("Practice Mode");
        return;
    }

    function runQuizImmediateMode(){
        alert("Quizzing Immediately");
        ex.createParagraph(500, 500, "Hello world");
        var newButton = ex.createButton(0, 0, "wow");
        newButton.on("click", function() {
            console.log("such button very 539");
        })
        var newBox = textbox112("Here we will talk about Python Types <span>BUTTON</span>", {
            color: "blue"
        });
        insertButtonTextbox112(newBox, newButton, "BUTTON");
        return;
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