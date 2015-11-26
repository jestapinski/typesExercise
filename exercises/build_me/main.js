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
        // ex.createParagraph(500, 500, "Hello world");
        // var newButton = ex.createButton(0, 0, "OK");
        // newButton.on("click", function() {
        //     console.log("such button very 539");
        //     newBox.remove();
        //     secondInstructionBox();
        // })
        // var newBox = textbox112("Here we will talk about Python Types <span>BUTTON</span>", {
        //     color: "blue"
        // });
        playGuideBox();
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

    function randomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Inspired by kitchen sink
    function createRectangleObject(left, top, width, height, color, text, outlined){
        var rectangle = {};
        rectangle.top = top;
        rectangle.left = left;
        rectangle.width = width;
        rectangle.height = height;
        rectangle.right = rectangle.left + rectangle.width;
        rectangle.bottom = rectangle.top + rectangle.height;
        if (text == undefined){
            rectangle.text = "";
        }
        else{
            rectangle.text = text;
        }
        if (color == undefined){
            rectangle.color = "#FFFFFF";
        }
        else{
            rectangle.color = color;
        }
        if (outlined == undefined){
            rectangle.outlined = false;
        }
        else{
            rectangle.outlined = outlined;
        }
        rectangle.drag = false;
        rectangle.draw = function(){
            ex.graphics.ctx.fillStyle = color;
            if (!rectangle.outlined){
                ex.graphics.ctx.fillRect(rectangle.left,
                    rectangle.top, rectangle.width, rectangle.height);
                ex.graphics.ctx.fillStyle = "black";
                ex.graphics.ctx.font = "22 px Arial";
                ex.graphics.ctx.textAlgn = "center";
                ex.graphics.ctx.textBaseline = "middle";
                ex.graphics.ctx.fillText(rectangle.text, rectangle.left, rectangle.top);
            }
            else{
             ex.graphics.ctx.strokeRect(rectangle.left,
                    rectangle.top, rectangle.width, rectangle.height);   
            }
        };
        rectangle.clicked = function(x, y){
            return (x > rectangle.left && x < rectangle.right && y > rectangle.top && y < rectangle.bottom);
        };
        rectangle.move = function(dx, dy){
            rectangle.left += dx;
            rectangle.top += dy;
            rectangle.right = rectangle.left + rectangle.width;
            rectangle.bottom = rectangle.top + rectangle.height;
        };
        return rectangle;
    }

    var dragInfo = {};
    dragInfo.rect = [];
    dragInfo.mouseLastX = 0;
    dragInfo.mouseLastY = 0;

    dragInfo.mousedown = function(event) {
        var x = event.offsetX;
        var y = event.offsetY;
        for (var i = 0; i < dragInfo.rect.length; i++){
            if (dragInfo.rect[i].clicked(x,y) && dragInfo.rect[i].outlined != true) {
                dragInfo.rect[i].drag = true;
                dragInfo.mouseLastX = x;
                dragInfo.mouseLastY = y;
            }
        }
        //bind mousemove and mouseup
        ex.graphics.on("mousemove",dragInfo.mousemove);
        ex.graphics.on("mouseup",dragInfo.mouseup);
    };

    dragInfo.mousemove = function(event) {
        for (var i = 0; i < dragInfo.rect.length; i++){
            if (dragInfo.rect[i].drag) {
                //move the rect
                // console.log("oooh");
                var x = event.offsetX;
                var y = event.offsetY;
                var xChange = x - dragInfo.mouseLastX; 
                var yChange = y - dragInfo.mouseLastY; 
                dragInfo.rect[i].move(xChange,yChange);
                dragInfo.mouseLastX = x;
                dragInfo.mouseLastY = y;

                //redraw
                drawAll();
            }
        }
    };

    dragInfo.mouseup = function(event) {
        for (var i = 0; i < dragInfo.rect.length; i++){
            if (dragInfo.rect[i].drag){
                dragInfo.rect[i].drag = false;
                provideFeedback(dragInfo.value, dragInfo.typeOfElem, dragInfo.rect[i].text);
            }
        }
        ex.graphics.off("mousemove",dragInfo.mousemove);
        ex.graphics.off("mouseup",dragInfo.mouseup);
    };

    //bind mousedown
    ex.graphics.on("mousedown",dragInfo.mousedown);
    function playPracticeGame(){
        //Randomly Generate an element and type
        var elementType = randomIndex(0, listOfAllTypes.length - 1);
        var actualType;
        if (elementType == 0){
            actualType = "String";
        }
        else if (elementType == 1){
            actualType = "Integer";
        }
        else if (elementType == 2){
            actualType = "Float";
        } 
        else{
            actualType = "Boolean";
        }
        var actualElementList = listOfAllTypes[elementType];
        console.log(actualElementList);
        var actualElement = actualElementList[randomIndex(0, actualElementList.length - 1)];
        console.log(actualElement);
        dragInfo.value = actualElement;
        dragInfo.typeOfElem = actualType; 
        ex.createParagraph(ex.width() / 3, ex.height() / 2, actualElement, {
            size: 'xlarge'
        });
        ex.createParagraph(ex.width() / 10, ex.height() / 10, "Select the correct type")
        //Create graphics as needed
        var placementRectangle = createRectangleObject(ex.width()/2, ex.height()/2, 100, 75, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangle);
        placementRectangle.draw();
        var option1 = createRectangleObject(ex.width()/4, 3 * ex.height() / 4, 100, 75, "#33FFAA", "Integer");
        option1.draw();
        //Need to append to list rather than overwrite
        console.log(dragInfo.rect);
        dragInfo.rect.push(option1);
        var option2 = createRectangleObject(option1.left + 2* option1.width, 3 * ex.height()/4, 100, 75, "#AAAAAA", "String");
        dragInfo.rect.push(option2);
        option2.draw();
        //Drag and drop
        var option3 = createRectangleObject(option2.left + 2* option2.width, 3 * ex.height()/4, 100, 75, "#7777FF", "Float");
        dragInfo.rect.push(option3);
        option3.draw();

        var option4 = createRectangleObject(option3.left + 2* option3.width, 3 * ex.height()/4, 100, 75, "#FF7777", "Boolean");
        dragInfo.rect.push(option4);
        option4.draw();

        //Check for correctness
        //Create feedback as needed
        return;
    }

    function drawAll(){
        ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
        for (var i = 0; i < dragInfo.rect.length; i++){
            dragInfo.rect[i].draw();
        }
        // dragInfo.rect.draw();
        //Need to draw everything once appended
    }

    var showAgain = true;

    function provideFeedback(value, expectedResult, actualResult){
        console.log("here");
        console.log(value);
        console.log(expectedResult);
        console.log(actualResult);
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
            if (expectedResult == "string" && expectedResult.slice(0,3) == "chr"){
                //we know it is a misunderstanding of what chr is
                return;
            }
            else if (expectedResult == "int" && expectedResult.slice(0,3) == "ord"){
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

//Woo switch cases
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