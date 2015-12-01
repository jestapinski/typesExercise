/** 
 * @file Types Exercise
 * @author  Jordan Stapinski, Lilian Chin
 */

 //Save data needed:
/*
    Question Number (0-3 --> 1st part, 4 --> 2nd part)
    
    **FIRST PART**
    Current Score
    Current Element
    Current Element Type
    (Draginfo)

    **SECOND PART**
    Just the dragInfo? If so done! :D



Still To Do:
-Overall Cleaner UI
-Move feedback out of the way (Bucket dropping 2nd mode)
-Check positioning (should be better)
-Practice Mode
-Quiz Delay Mode
    -Delay feedback and move on if incorrect
-Save state and setting grade (Kinda done, need to verify)
    -Uncomment above two functions when put onto Heroku
-"Slightly improved" Feedback in "Practice Mode" (i.e. char, boolean logic and such)
-Boolean logic is no longer taught, maybe change this?

-Get rid of hardcoded ex.data.instance when put on Heroku
*/



var main = function(ex) {
    

    //temporary variable to figure out what to draw (we can figure out a better way) later
    var practice = true;
    var userScore = 0;
    var userAttempts = 0;
    var userQuestionNumber = 0;
    var dragInfo = {};
    dragInfo.rect = [];
    dragInfo.mouseLastX = 0;
    dragInfo.mouseLastY = 0;
    var showAgain = true;

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

    //Testing purposes
    ex.data.instance = {state: undefined};

    //Unloading save state
    if (ex.data.instance.state != undefined){
        //There is some kind of save state
        //If user is on first '4' questions, it is first mode
        if (ex.data.instance.state.userQuestionNumber != undefined){
            userQuestionNumber = ex.data.instance.state.userQuestionNumber;
            if (userQuestionNumber < 4){
                //In first mode
                practice = true;
                dragInfo = ex.data.instance.state.dragInfo;
                userScore = ex.data.instance.state.userScore;
                playPracticeGame();
            }
            else{
                //Other mode
                practice = false;
                playQuizGame();
            }
        }
    }
    // ex.data.meta.mode = "practice";

    //always quiz-immediate
    console.log(ex.data.meta.mode);

    function saveData(){
        var data = {};
        data.userQuestionNumber = userQuestionNumber;
        data.dragInfo = dragInfo;
        data.userScore = userScore;
        //if (ex.data.meta.mode == "quiz-delay"){
        // ex.saveState(data);
        //}
    }
    
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

    //Keep track of score regardless, only care if in quiz-delay or immediate mode





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
            //This is where things are distinguished
            if (practice == true) {
                // ex.chromeElements.submitButton.disable();
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
                //For practice mode
                if (practice == true) {
                    if (rectsCollide(dragInfo.rect[i], dragInfo.rect[0])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[0].left;
                        dragInfo.rect[i].top = dragInfo.rect[0].top;
                        dragInfo.rect[i].right = dragInfo.rect[0].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[0].bottom;
                        drawAll();
                        if (practice == true) {
                            providePracticeFeedback(dragInfo.value, dragInfo.typeOfElem, dragInfo.rect[i].text, i);
                        } 
                    }
                    else {
                        resetBox(dragInfo.rect[i]);
                        //reset original box location
                    }
                //in quiz mode (putting the options into their types)
                } else {
                    //Try to snap into place for the 8 placement boxes
                    if (rectsCollide(dragInfo.rect[i], dragInfo.rect[0])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[0].left;
                        dragInfo.rect[i].top = dragInfo.rect[0].top;
                        dragInfo.rect[i].right = dragInfo.rect[0].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[0].bottom;
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[1])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[1].left;
                        dragInfo.rect[i].top = dragInfo.rect[1].top;
                        dragInfo.rect[i].right = dragInfo.rect[1].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[1].bottom;
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[2])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[2].left;
                        dragInfo.rect[i].top = dragInfo.rect[2].top;
                        dragInfo.rect[i].right = dragInfo.rect[2].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[2].bottom;
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[3])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[3].left;
                        dragInfo.rect[i].top = dragInfo.rect[3].top;
                        dragInfo.rect[i].right = dragInfo.rect[3].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[3].bottom;
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[4])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[4].left;
                        dragInfo.rect[i].top = dragInfo.rect[4].top;
                        dragInfo.rect[i].right = dragInfo.rect[4].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[4].bottom;
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[5])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[5].left;
                        dragInfo.rect[i].top = dragInfo.rect[5].top;
                        dragInfo.rect[i].right = dragInfo.rect[5].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[5].bottom;
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[6])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[6].left;
                        dragInfo.rect[i].top = dragInfo.rect[6].top;
                        dragInfo.rect[i].right = dragInfo.rect[6].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[6].bottom;
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[7])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[7].left;
                        dragInfo.rect[i].top = dragInfo.rect[7].top;
                        dragInfo.rect[i].right = dragInfo.rect[7].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[7].bottom;
                        drawAll();
                    } else {
                        resetBox(dragInfo.rect[i]);
                    }
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

        ex.chromeElements.submitButton.disable(); 
        dragInfo.rect = [];
        dragInfo.value = undefined;
        dragInfo.typeOfElem = undefined;
        if (userQuestionNumber > 3){
            practice = false;
            playQuizGame();
            return;
        }
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
        // var width = ex.width()/2;
        var width = 100;
        var margin = 25;
        var placementRectangle = createRectangleObject(ex.width()/2 + 75, ex.height()/3, width, 75, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangle);
        placementRectangle.draw();
        var option1 = createRectangleObject(ex.width()/2 - 2* margin - 2* width, 3 * ex.height() / 4, width, 75, "#33FFAA", "Integer");
        // option1.draw();
        //Need to append to list rather than overwrite
        console.log(dragInfo.rect);
        dragInfo.rect.push(option1);
        var option2 = createRectangleObject(option1.left + margin + width, 3 * ex.height()/4, width, 75, "#AAAAAA", "String");
        dragInfo.rect.push(option2);
        // option2.draw();
        //Drag and drop
        var option3 = createRectangleObject(option2.left + margin + width, 3 * ex.height()/4, width, 75, "#7777FF", "Float");
        dragInfo.rect.push(option3);
        // option3.draw();

        var option4 = createRectangleObject(option3.left + margin + width, 3 * ex.height()/4, width, 75, "#FF7777", "Boolean");
        dragInfo.rect.push(option4);
        // option4.draw();
        saveData();
        drawAll();
        return;
}

    function playQuizGame() {

        //In dragInfo.rect, first 8 are placement boxes, next 8 are options

        ex.chromeElements.submitButton.enable(); 

        dragInfo.rect = [];
        dragInfo.value = [];
        dragInfo.typeOfElem = [];
        var placementRectangleInt1 = createRectangleObject(ex.width()/10, ex.height()/2.5, 100, 50, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleInt1);
        placementRectangleInt1.draw();

        var placementRectangleInt2 = createRectangleObject(ex.width()/10, ex.height()/2.5 + 60, 100, 50, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleInt2);
        placementRectangleInt2.draw();

        var placementRectangleBool1 = createRectangleObject(placementRectangleInt1.left + ex.width()/4.5, 
                                                           ex.height()/2.5, 100, 50, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleBool1);
        placementRectangleBool1.draw();

        var placementRectangleBool2 = createRectangleObject(placementRectangleInt1.left + ex.width()/4.5, 
                                                           ex.height()/2.5 + 60, 100, 50, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleBool2);
        placementRectangleBool2.draw();

        var placementRectangleStr1 = createRectangleObject(placementRectangleBool1.left + ex.width()/4.5, 
                                                          ex.height()/2.5, 100, 50, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleStr1);
        placementRectangleStr1.draw();

        var placementRectangleStr2 = createRectangleObject(placementRectangleBool1.left + ex.width()/4.5, 
                                                          ex.height()/2.5 + 60, 100, 50, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleStr2);
        placementRectangleStr2.draw();

        var placementRectangleFloat1 = createRectangleObject(placementRectangleStr1.left + ex.width()/4.5, 
                                                            ex.height()/2.5, 100, 50, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleFloat1);
        placementRectangleFloat1.draw();
        
        var placementRectangleFloat2 = createRectangleObject(placementRectangleStr1.left + ex.width()/4.5, 
                                                            ex.height()/2.5 + 60, 100, 50, "#00FFFF", "wow", true);
        dragInfo.rect.push(placementRectangleFloat2);
        placementRectangleFloat2.draw();

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

            dragInfo.value[index] = actualElement;
            dragInfo.typeOfElem[index] = actualType;
           
            //PURPOSE??
            ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height()); 
        };

        //Create graphics as needed
        //Need to append to list rather than overwrite
        console.log(dragInfo.rect);

        var optionY0 = 2.75 * ex.height()/4 + 10
        var option1 = createRectangleObject(ex.width()/10, optionY0, 100, 50, "#33FFAA", options[0]);
        dragInfo.rect.push(option1);
        
        var option2 = createRectangleObject(option1.left + ex.width()/4.5, optionY0, 100, 50, "#AAAAAA", options[1]);
        dragInfo.rect.push(option2);

        var option3 = createRectangleObject(option2.left + ex.width()/4.5, optionY0, 100, 50, "#7777FF", options[2]);
        dragInfo.rect.push(option3);

        var option4 = createRectangleObject(option3.left + ex.width()/4.5, optionY0, 100, 50, "#FF7777", options[3]);
        dragInfo.rect.push(option4);

        var option5 = createRectangleObject(ex.width()/10, optionY0 + 60, 100, 50, "#CCFF00", options[4]);
        dragInfo.rect.push(option5);
        
        var option6 = createRectangleObject(option5.left + ex.width()/4.5, optionY0 + 60, 100, 50, "#FF9900", options[5]);
        dragInfo.rect.push(option6);
        
        var option7 = createRectangleObject(option6.left + ex.width()/4.5, optionY0 + 60, 100, 50, "#9900CC", options[6]);
        dragInfo.rect.push(option7);

        var option8 = createRectangleObject(option7.left + ex.width()/4.5, optionY0 + 60, 100, 50, "#C00000", options[7]);
        dragInfo.rect.push(option8);

        saveData();
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
    
            ex.graphics.ctx.fillText("Select the correct type.", ex.width() / 2, ex.height() / 10);
            ex.graphics.ctx.textAlign = "right";
            ex.graphics.ctx.fillText(dragInfo.value, ex.width() / 2 - 50, ex.height() / 2 - 75);
            //var question = ex.createParagraph(ex.width()/3, ex.height()/2, 
                                              //dragInfo.value, 
                                              //{size: "xlarge", textAlign: "center"});
            //var codeWidth = 160
            //var codeHeight = 70
            //var typeInQuestion = ex.createCode(ex.width()/5, ex.height()/2, dragInfo.value, 
            //                             {size: "large", language: "python"}).innerWidth(codeWidth).innerHeight(codeHeight);
            //var questionStatement = ex.createParagraph(ex.width()/4, ex.height()/5, 
            //                                  "Select the correct <code>type</code>.", 
            //                                  {size: "xlarge", textAlign: "center"});
        } else {
            console.log("in Quiz Mode");
            //var questionStatement = ex.createParagraph(ex.width()/4, ex.height()/10,
            //                                           "Drag each rectangle into their <code>type</code>.",
            //                                           {size: "xlarge", textAlign: "center"});
            ex.graphics.ctx.fillStyle = "black";
            ex.graphics.ctx.font = "17px Arial Bold";
            ex.graphics.ctx.textAlign = "center";
            ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());

            ex.graphics.ctx.fillText("Drag each rectangle into their type box.", ex.width() / 2, ex.height() / 8);
            var firstTypeX0 = ex.width()/7;
            var secondTypeX0 = firstTypeX0 + ex.width()/4.5;
            var thirdTypeX0 = secondTypeX0 + ex.width()/4.5;
            var fourthTypeX0 = thirdTypeX0 + ex.width()/4.5;
            var typeY0 = ex.height()/3;

            ex.graphics.ctx.fillText("int", firstTypeX0, typeY0);
            ex.graphics.ctx.fillText("bool", secondTypeX0, typeY0);
            ex.graphics.ctx.fillText("str", thirdTypeX0, typeY0);
            ex.graphics.ctx.fillText("float", fourthTypeX0, typeY0);

            //var intType = ex.createParagraph(firstTypeX0, typeY0,
            //                                 "int", {size: "large"});
            //var boolType = ex.createParagraph(secondTypeX0, typeY0,
            //                                  "bool", {size: "large"});
            //var strType = ex.createParagraph(thirdTypeX0, typeY0, 
            //                                 "str", {size: "large"});
            //var floatType = ex.createParagraph(fourthTypeX0, typeY0,
            //                                   "float", {size: "large"});

            for (var i = 0; i < dragInfo.rect.length; i++){
                dragInfo.rect[i].draw();
                //console.log(options[i]);
                //console.log(optionsTypes[i]);
                console.log(dragInfo.value[i]);
                console.log(dragInfo.typeOfElem[i]);
            };

        }
    }

//options, width, left, top, cx, cy,

    function providePracticeFeedback(value, expectedResult, actualResult, i) {
        console.log("here");
        console.log(userAttempts);
        console.log(userScore);
        userQuestionNumber++;
        saveData();
        var margin = -40;
        if (expectedResult == actualResult) {
            userScore++;
            saveData();
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
                var correctBox = textbox112("Correct! <span>BTN1</span> <span>BTN2</span>", {}, undefined, ex.height()/3, ex.height()/2 + margin);
                insertButtonTextbox112(correctBox, hideButton, "BTN1");
                insertButtonTextbox112(correctBox, nahButton, "BTN2");
            }
            else{
                saveData();
                ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                playPracticeGame(); 
            }
            return;
        }
        else {
            //Add in feedback for wrong answers
            if (ex.data.meta.mode == "practice"){
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
                    }, undefined, ex.height()/3, ex.height()/2 + margin)
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
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
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
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
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
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
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
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
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
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
                    insertButtonTextbox112(boolBox, boolButton, 'BUTTON');
                }
                saveData();
                // ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                drawAll();
                return;
        }
        else{
            // userQuestionNumber++;
            if (expectedResult == "String" && expectedResult.slice(0,3) == "chr"){
                    //we know it is a misunderstanding of what chr is
                    var str = "What type does \'chr(integer)\' return? <span>BUTTON</span>"
                    var chrButton = ex.createButton(0, 0, "OK");
                    chrButton.on("click", function(){
                        chrBox.remove();
                        resetBox(dragInfo.rect[i]);
                        playPracticeGame();
                    })
                    var chrBox = textbox112(str, {
                        color: 'red'
                    }, undefined, ex.height()/3, ex.height()/2 + margin)
                    insertButtonTextbox112(chrBox, chrButton, 'BUTTON');
                }
                else if (expectedResult == "Integer" && expectedResult.slice(0,3) == "ord"){
                    //Misunderstanding of what ord is
                    var str = "What type does \'ord(string)\' return? <span>BUTTON</span>"
                    var ordButton = ex.createButton(0, 0, "OK");
                    ordButton.on("click", function(){
                        ordBox.remove();
                        resetBox(dragInfo.rect[i]);
                        playPracticeGame();
                    })
                    var ordBox = textbox112(str, {
                        color: 'red'
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
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
                        playPracticeGame();
                    })
                    var strBox = textbox112(str, {
                        color: 'red'
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
                    insertButtonTextbox112(strBox, strButton, 'BUTTON');
                }
                else if (expectedResult == "Integer"){
                    //Misunderstanding of what makes an int an int
                    var str = "Incorrect. Is this a whole number? <span>BUTTON</span>"
                    var intButton = ex.createButton(0, 0, "OK");
                    intButton.on("click", function(){
                        intBox.remove();
                        resetBox(dragInfo.rect[i]);
                        playPracticeGame();
                    })
                    var intBox = textbox112(str, {
                        color: 'red'
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
                    insertButtonTextbox112(intBox, intButton, 'BUTTON');
                }
                else if (expectedResult == "Float"){
                    //Misunderstanding of what makes an int an int
                    var str = "Incorrect. Is this a floating point number? <span>BUTTON</span>"
                    var floatButton = ex.createButton(0, 0, "OK");
                    floatButton.on("click", function(){
                        floatBox.remove();
                        resetBox(dragInfo.rect[i]);
                        playPracticeGame();
                    })
                    var floatBox = textbox112(str, {
                        color: 'red'
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
                    insertButtonTextbox112(floatBox, floatButton, 'BUTTON');
                }
                else if (expectedResult == "Boolean"){
                    //Misunderstanding of what makes a bool a bool
                    var str = "Incorrect. Is this a True or False quantity? <span>BUTTON</span>"
                    var boolButton = ex.createButton(0, 0, "OK");
                    boolButton.on("click", function(){
                        boolBox.remove();
                        resetBox(dragInfo.rect[i]);
                        playPracticeGame();
                    })
                    var boolBox = textbox112(str, {
                        color: 'red'
                    }, undefined, ex.height()/3, ex.height()/2 + margin);
                    insertButtonTextbox112(boolBox, boolButton, 'BUTTON');
                }
                saveData();
                // ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                drawAll();
                return;
        }

    }
    }

    function provideQuizFeedback() {
        if (practice == true){
            ex.chromeElements.submitButton.enable();
            return;}
        var intCorrect = 0;
        var boolCorrect = 0;
        var strCorrect = 0;
        var floatCorrect = 0;
        var total = 0;
        //8 answers to check and these rectangles are indexed 8-16
        for (var i = 8; i < 16; i++) {    
            console.log(dragInfo.rect[i].left);
            console.log(dragInfo.rect[0].left);
            console.log(dragInfo.typeOfElem);
            console.log(dragInfo.value);
            console.log(dragInfo.typeOfElem[i]);
            //check if they've attempted all answers (if not, at least one of the boxes are located on the bottom)
            console.log(dragInfo.rect[8].bottom);
            console.log(dragInfo.rect[15].bottom);
            //Changed on herokupp, need to figure out a better way to keep track of this
            if (dragInfo.rect[i].bottom == 368 || 
                dragInfo.rect[i].bottom == 368 + 60) {
                ex.alert("Keep trying!", {color: "red"});
                ex.chromeElements.submitButton.enable();
                return;
            } else if (dragInfo.rect[i].left == dragInfo.rect[0].left) {
                //i-8 because the list containing the values is indexed 0-8
                if (dragInfo.typeOfElem[i-8] == "Integer") { 
                    intCorrect++;
                } else {
                    ex.graphics.ctx.lineWidth = "3";
                    ex.graphics.ctx.strokeStyle = "red";
                    ex.graphics.ctx.strokeRect(dragInfo.rect[i].left, dragInfo.rect[i].top,
                                               dragInfo.rect[i].width, dragInfo.rect[i].height);
                }
            } else if (dragInfo.rect[i].left == dragInfo.rect[2].left) {
                if (dragInfo.typeOfElem[i-8] == "Boolean") {
                    boolCorrect++;
                } else {
                    ex.graphics.ctx.lineWidth = "3";
                    ex.graphics.ctx.strokeStyle = "red";
                    ex.graphics.ctx.strokeRect(dragInfo.rect[i].left, dragInfo.rect[i].top,
                                               dragInfo.rect[i].width, dragInfo.rect[i].height);
                }
            } else if (dragInfo.rect[i].left == dragInfo.rect[4].left) {
                if (dragInfo.typeOfElem[i-8] == "String") {
                    strCorrect++;
                } else {
                    ex.graphics.ctx.lineWidth = "3";
                    ex.graphics.ctx.strokeStyle = "red";
                    ex.graphics.ctx.strokeRect(dragInfo.rect[i].left, dragInfo.rect[i].top,
                                               dragInfo.rect[i].width, dragInfo.rect[i].height);
                }
            } else if (dragInfo.rect[i].left == dragInfo.rect[6].left) {
                if (dragInfo.typeOfElem[i-8] == "Float") {
                    floatCorrect++;
                } else {
                    ex.graphics.ctx.lineWidth = "3";
                    ex.graphics.ctx.strokeStyle = "red";
                    ex.graphics.ctx.strokeRect(dragInfo.rect[i].left, dragInfo.rect[i].top,
                                               dragInfo.rect[i].width, dragInfo.rect[i].height);
                }
            }
        }
        saveData();
        total = userScore + intCorrect + boolCorrect + strCorrect + floatCorrect;
        var totalScore = (10 * total / 12);
        //Set the grade
        //if (ex.data.meta.mode == "quiz-delay"){
        // ex.setGrade(totalScore, "Good job!");
        //}
        ex.showFeedback(total.toString().concat("/12"));
        //disable moving things after submitting
        for (var i = 0; i < dragInfo.rect.length; i++) {
            dragInfo.rect[i].clicked = false;
        }

    }

    //Quiz feedback (using submit button) (putting types into correct buckets)
    ex.chromeElements.submitButton.on("click", function() {
        provideQuizFeedback();
    });
  
    function runQuizDelayMode(){
        alert("Quizzing on a Delay");
        playGuideBox();
        return;
    }


//Woo switch cases
    if (ex.data.instance.state == undefined){
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
    }

};