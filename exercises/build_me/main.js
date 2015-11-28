/** 
 * @file Types Exercise
 * @author  Jordan Stapinski, Lilian Chin
 */

 //Save data needed:
/*
    Exercise number
    Current Score
    Current Element
    Current Element Type



Still To Do:
-Overall Cleaner UI
    -Constantly Redrawing Question Text
-2nd Mode for dropping elements by type into bucket
    -Practice Mode
    -Quiz Delay Mode
-Save state
-Quiz Scoring (Kinda done, need to figure out end of quiz to report)
-Fix locations to account for various screen sizes (not sure how good this is right now)
*/



var main = function(ex) {
    
    //temporary variable to figure out what to draw (we can figure out a better way) later
    var practice = true;
    // ex.data.meta.mode = "practice";

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


    var userScore = 0;
    var userAttempts = 0;
    //Keep track of score regardless, only care if in quiz-delay or immediate mode

    var listOfStringTypes = ["\'a\'", "\'A\'", "\'hello\'", "chr(97)", "\'0\'", "\'True\'",
                             "1 and \'hi'\'", "0 or \'and\'", "\'112\' or 112", 
                             "\'0\' or 0", "0 or \'0\'", "\'112forlyfe\'"];
    var listOfIntTypes = ["13", "42", "-124", "ord('a')", "0", "-6+7", 
                          "4 or True", "0 or 0", "0 and 0", "0.0 or 0",
                          "\'112\' and 112", "1 or False", "\'0\' and 0", "0 and \'0\'"]; //Can dynamically do these and will add later
    var listOfFloatTypes = ["1.", "42.999999", "0.1", "4.2", "math.pi", "0 or 0.0", 
                            "1.0 + 3"];
    var listOfBoolTypes = ["True", "False", "True or False", "0.0 == 0", 
                           "True or 0", "1 and False"];
    var listOfAllTypes = [listOfStringTypes, listOfIntTypes, listOfFloatTypes, listOfBoolTypes];



    function runPracticeMode(){
        alert("Practice Mode");
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
        // insertButtonTextbox112(newBox, newButton, "BUTTON");
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
            if (practice == true) {
                playPracticeGame();
            } else {
                playQuizGame();
            }
        })
        var beginBox = textbox112("Select and drop the correct type of object <span> BUTTON </span>");
        insertButtonTextbox112(beginBox, beginButton, "BUTTON");
    }

    function randomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

    function unsort(list) {
        var newList = [];
        length = list.length;
        for (var i = 0; i < length; i++) {
            randomInd = randomIndex(0, list.length-1);
            newList[i] = list[randomInd];
            list.splice(randomInd, 1);
        }
        return newList;
}

//Inspired by kitchen sink
    function createRectangleObject(left, top, width, height, color, text, outlined){
        var rectangle = {};
        rectangle.top = top;
        rectangle.initialTop = top;
        rectangle.left = left;
        rectangle.initialLeft = left;
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
                ex.graphics.ctx.fillText(rectangle.text, rectangle.left + rectangle.width/2, rectangle.top + rectangle.height/2);
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

    function rectsCollide(rect1, rect2){
        return ((rect1.left > rect2.left && 
            rect1.left < rect2.right) ||
            (rect1.right > rect2.left && 
                rect1.right < rect2.right)) && 
            ((rect1.top > rect2.top &&
                rect1.top < rect2.bottom) ||
            (rect1.bottom > rect2.top &&
                rect1.bottom < rect2.bottom));

    };

    function resetBox(box){
        box.left = box.initialLeft;
        box.top = box.initialTop;
        box.right = box.left + box.width;
        box.bottom = box.top + box.height;
        drawAll();
    }

    dragInfo.mouseup = function(event) {
        for (var i = 0; i < dragInfo.rect.length; i++){
            if (dragInfo.rect[i].drag){
                //Try to snap into place
                if (rectsCollide(dragInfo.rect[i], dragInfo.rect[0])){
                    dragInfo.rect[i].drag = false;
                    dragInfo.rect[i].left = dragInfo.rect[0].left;
                    dragInfo.rect[i].top = dragInfo.rect[0].top;
                    dragInfo.rect[i].right = dragInfo.rect[0].right;
                    dragInfo.rect[i].bottom = dragInfo.rect[0].bottom;
                    drawAll();
                    if (practice == true) {
                        providePracticeFeedback(dragInfo.value, dragInfo.typeOfElem, dragInfo.rect[i].text, i);
                    } //else {
                      //  provideQuizFeedback();
                      //}
                }
                else {
                    resetBox(dragInfo.rect[i]);
                    //reset original box location
                }
            }
            dragInfo.rect[i].drag = false;
        }
        ex.graphics.off("mousemove",dragInfo.mousemove);
        ex.graphics.off("mouseup",dragInfo.mouseup);
    };

    //bind mousedown
    ex.graphics.on("mousedown",dragInfo.mousedown);

    function playPracticeGame(){
        dragInfo.rect = [];
        dragInfo.value = undefined;
        dragInfo.typeOfElem = undefined;
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
        ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
        
        //Create graphics as needed
        var placementRectangle = createRectangleObject(ex.width()/2, ex.height()/2, 100, 75, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangle);
        placementRectangle.draw();
        var option1 = createRectangleObject(ex.width()/7, 3 * ex.height() / 4, 100, 75, "#33FFAA", "Integer");
        // option1.draw();
        //Need to append to list rather than overwrite
        console.log(dragInfo.rect);
        dragInfo.rect.push(option1);
        var option2 = createRectangleObject(option1.left + 1.5* option1.width, 3 * ex.height()/4, 100, 75, "#AAAAAA", "String");
        dragInfo.rect.push(option2);
        // option2.draw();
        //Drag and drop
        var option3 = createRectangleObject(option2.left + 1.5* option2.width, 3 * ex.height()/4, 100, 75, "#7777FF", "Float");
        dragInfo.rect.push(option3);
        // option3.draw();

        var option4 = createRectangleObject(option3.left + 1.5* option3.width, 3 * ex.height()/4, 100, 75, "#FF7777", "Boolean");
        dragInfo.rect.push(option4);
        // option4.draw();

        drawAll();
        return;
}

    function playQuizGame() {

        //In dragInfo.rect, first 4 are placement boxes, next 8 are options 

        dragInfo.rect = [];
        var placementRectangleInt = createRectangleObject(ex.width()/10, ex.height()/2.5, 100, 100, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleInt);
        placementRectangleInt.draw();
        var placementRectangleBool = createRectangleObject(placementRectangleInt.left + 1.5* placementRectangleInt.width, 
                                                           ex.height()/2.5, 100, 100, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleBool);
        placementRectangleBool.draw();
        var placementRectangleStr = createRectangleObject(placementRectangleBool.left + 1.5* placementRectangleBool.width, 
                                                          ex.height()/2.5, 100, 100, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleStr);
        placementRectangleStr.draw();
        var placementRectangleFloat = createRectangleObject(placementRectangleStr.left + 1.5* placementRectangleStr.width, 
                                                            ex.height()/2.5, 100, 100, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleFloat);
        placementRectangleFloat.draw();
        
        //Generate 8 random options, 2 of each type
        options = [0,0,0,0,0,0,0,0];
        optionsTypes = ["","","","","","","",""];
        //For randomness
        optionIndices = [0,1,2,3,4,5,6,7];
        optionIndices = unsort(optionIndices);
        
        for (var i = 0; i < options.length; i++) {

            //Siphon each set of index to a certain group
            //var elementType = randomIndex(0, listOfAllTypes.length-1);
            var elementType;
            var actualType;
            if (i < 2) {
                elementType = 0;
                actualType = "String";
            }
            else if (i >= 2 && i < 4) {
                elementType = 1;
                actualType = "Integer";
            }
            else if (i >= 4 && i < 6) {
                elementType = 2;
                actualType = "Float";
            } 
            else if (i >= 6 && i < options.length){
                elementType = 3;
                actualType = "Boolean";
            }
            //Pick a random element from each group twice
            var actualElementList = listOfAllTypes[elementType];
            var actualElement = actualElementList[randomIndex(0, actualElementList.length - 1)];
            index = optionIndices.pop();
                              
            options[index] = actualElement;
            optionsTypes[index] = actualType;
           
            //PURPOSE??
            ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height()); 
        };

        //Create graphics as needed
        //Need to append to list rather than overwrite
        console.log(dragInfo.rect);

        var optionY0 = 2.75 * ex.height()/4
        var option1 = createRectangleObject(ex.width()/10, optionY0, 100, 50, "#33FFAA", options[0]);
        dragInfo.rect.push(option1);
        
        var option2 = createRectangleObject(option1.left + 1.5* option1.width, optionY0, 100, 50, "#AAAAAA", options[1]);
        dragInfo.rect.push(option2);

        var option3 = createRectangleObject(option2.left + 1.5* option2.width, optionY0, 100, 50, "#7777FF", options[2]);
        dragInfo.rect.push(option3);

        var option4 = createRectangleObject(option3.left + 1.5* option3.width, optionY0, 100, 50, "#FF7777", options[3]);
        dragInfo.rect.push(option4);

        var option5 = createRectangleObject(ex.width()/10, optionY0 + 75, 100, 50, "#CCFF00", options[4]);
        dragInfo.rect.push(option5);
        
        var option6 = createRectangleObject(option5.left + 1.5* option5.width, optionY0 + 75, 100, 50, "#FF9900", options[5]);
        dragInfo.rect.push(option6);
        
        var option7 = createRectangleObject(option6.left + 1.5* option6.width, optionY0 + 75, 100, 50, "#9900CC", options[6]);
        dragInfo.rect.push(option7);

        var option8 = createRectangleObject(option7.left + 1.5* option7.width, optionY0 + 75, 100, 50, "#C00000", options[7]);
        dragInfo.rect.push(option8);

        drawAll();
        return;
}

    function drawAll(){
        if (practice == true) {
            console.log("in Practice Mode");
            ex.graphics.ctx.fillStyle = "black";
            ex.graphics.ctx.font = "24px Arial Bold";
            ex.graphics.ctx.textAlign = "center";
            ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
            for (var i = 0; i < dragInfo.rect.length; i++){
                dragInfo.rect[i].draw();
            };
    
            //ex.graphics.ctx.fillText(dragInfo.value, ex.width() / 3, ex.height() / 2);
            //ex.graphics.ctx.fillText("Select the correct type", ex.width() / 10, ex.height() / 10);
            //var question = ex.createParagraph(ex.width()/3, ex.height()/2, 
                                              //dragInfo.value, 
                                              //{size: "xlarge", textAlign: "center"});
            var codeWidth = 160
            var codeHeight = 70
            var typeInQuestion = ex.createCode(ex.width()/5, ex.height()/2, dragInfo.value, 
                                         {size: "large", language: "python"}).innerWidth(codeWidth).innerHeight(codeHeight);
            var questionStatement = ex.createParagraph(ex.width()/4, ex.height()/5, 
                                              "Select the correct <code>type</code>.", 
                                              {size: "xlarge", textAlign: "center"});
        } else {
            console.log("in Quiz Mode");
            var questionStatement = ex.createParagraph(ex.width()/4, ex.height()/10,
                                                       "Drag each rectangle into their <code>type</code>.",
                                                       {size: "xlarge", textAlign: "center"});
            var firstTypeX0 = ex.width()/7;
            var secondTypeX0 = firstTypeX0 + ex.width()/5;
            var thirdTypeX0 = secondTypeX0 + ex.width()/5;
            var fourthTypeX0 = thirdTypeX0 + ex.width()/5;
            var typeY0 = ex.height()/3;
            var intType = ex.createParagraph(firstTypeX0, typeY0,
                                             "int", {size: "large"});
            var boolType = ex.createParagraph(secondTypeX0, typeY0,
                                              "bool", {size: "large"});
            var strType = ex.createParagraph(thirdTypeX0, typeY0, 
                                             "str", {size: "large"});
            var floatType = ex.createParagraph(fourthTypeX0, typeY0,
                                               "float", {size: "large"});

            ex.graphics.ctx.fillStyle = "black";
            ex.graphics.ctx.font = "17px Arial Bold";
            ex.graphics.ctx.textAlign = "center";
            ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
            for (var i = 0; i < dragInfo.rect.length; i++){
                dragInfo.rect[i].draw();
                console.log(options[i]);
                console.log(optionsTypes[i]);
            };

        }
    }

    var showAgain = true;

    function providePracticeFeedback(value, expectedResult, actualResult, i) {
        console.log("here");
        console.log(userAttempts);
        console.log(userScore);
        userAttempts++;
        if (expectedResult == actualResult) {
            userScore++;
            if (showAgain){
                var hideButton = ex.createButton(0, 0, "Hide Correct Feedback");
                hideButton.on("click", function() {
                    showAgain = false;
                    correctBox.remove();
                    ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                    playPracticeGame();
                })
                var nahButton = ex.createButton(0, 0, "OK");
                nahButton.on("click", function(){
                    correctBox.remove();
                    ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                    playPracticeGame();
                })
                var correctBox = textbox112("Correct! <span>BTN1</span> <span>BTN2</span>");
                insertButtonTextbox112(correctBox, hideButton, "BTN1");
                insertButtonTextbox112(correctBox, nahButton, "BTN2");
            }
            else{
                ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                playPracticeGame(); 
            }
            return;
        }
        else {
            //Add in feedback for wrong answers
            if (expectedResult == "String" && expectedResult.slice(0,3) == "chr"){
                //we know it is a misunderstanding of what chr is
                var str = "What type does \'chr(integer)\' return? <span>BUTTON</span>"
                var chrButton = ex.createButton(0, 0, "OK");
                chrButton.on("click", function(){
                    chrBox.remove();
                    resetBox(dragInfo.rect[i]);
                })
                var chrBox = textbox112(str, {
                    color: 'red'
                })
                insertButtonTextbox112(chrBox, chrButton, 'BUTTON');
            }
            else if (expectedResult == "Integer" && expectedResult.slice(0,3) == "ord"){
                //Misunderstanding of what ord is
                var str = "What type does \'ord(string)\' return? <span>BUTTON</span>"
                var ordButton = ex.createButton(0, 0, "OK");
                ordButton.on("click", function(){
                    ordBox.remove();
                    resetBox(dragInfo.rect[i]);
                })
                var ordBox = textbox112(str, {
                    color: 'red'
                })
                insertButtonTextbox112(ordBox, ordButton, 'BUTTON');
            }
            else if (expectedResult == "String"){
                //Misunderstanding of what makes a string a string
                //Check for other types but in string form i.e True
                var str = "Incorrect. What do the \" \" mean? <span>BUTTON</span>"
                var strButton = ex.createButton(0, 0, "OK");
                strButton.on("click", function(){
                    strBox.remove();
                    resetBox(dragInfo.rect[i]);
                })
                var strBox = textbox112(str, {
                    color: 'red'
                })
                insertButtonTextbox112(strBox, strButton, 'BUTTON');
            }
            else if (expectedResult == "Integer"){
                //Misunderstanding of what makes an int an int
                var str = "Incorrect. Is this a whole number? <span>BUTTON</span>"
                var intButton = ex.createButton(0, 0, "OK");
                intButton.on("click", function(){
                    intBox.remove();
                    resetBox(dragInfo.rect[i]);
                })
                var intBox = textbox112(str, {
                    color: 'red'
                })
                insertButtonTextbox112(intBox, intButton, 'BUTTON');
            }
            else if (expectedResult == "Float"){
                //Misunderstanding of what makes an int an int
                var str = "Incorrect. Is this a floating point number? <span>BUTTON</span>"
                var floatButton = ex.createButton(0, 0, "OK");
                floatButton.on("click", function(){
                    floatBox.remove();
                    resetBox(dragInfo.rect[i]);
                })
                var floatBox = textbox112(str, {
                    color: 'red'
                })
                insertButtonTextbox112(floatBox, floatButton, 'BUTTON');
            }
            else if (expectedResult == "Boolean"){
                //Misunderstanding of what makes a bool a bool
                var str = "Incorrect. Is this a True or False quantity? <span>BUTTON</span>"
                var boolButton = ex.createButton(0, 0, "OK");
                boolButton.on("click", function(){
                    boolBox.remove();
                    resetBox(dragInfo.rect[i]);
                })
                var boolBox = textbox112(str, {
                    color: 'red'
                })
                insertButtonTextbox112(boolBox, boolButton, 'BUTTON');
            }
            // ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
            drawAll();
            return;
        }
    }

    function provideQuizFeedback(){
        return;
    }

    function runQuizDelayMode(){
        alert("Quizzing on a Delay");
        playGuideBox();
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