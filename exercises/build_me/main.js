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
    
    ex.chromeElements.undoButton.disable();
    ex.chromeElements.redoButton.disable();

    console.log("ex.data.meta.mode");
    console.log(ex.data.meta.mode);
    var initialized = true;
    // ex.data.instance.state = undefined;
    

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
    var total;

    var listOfStringTypes = ["\'a\'", "\'A\'", "\'hello\'", "chr(97)", "\'0\'", "\'True\'", 
                             "1 and \'hi\'", "0 or \'and\'", "\'112\' or 112", 
                             "0 or \'0\'", "\'112forlyfe\'", "\'world\'", "\'False\'",
                             "\'word\'", "\'serendipity\'", "\'solace\'", "\'chill\'"];
    var listOfIntTypes = ["13", "42", "-124", "150", "6", "9", "11", "45+25", 
                          "-7+4", "102351", "32", "49", "25", "ord('g')", "ord('7')",
                          "5-7", "ord('4')", "ord('a')", "0", "-6+7", 
                          "4 or True", "0.0 or 0", "1 or False", 
                          "\'0\' and 0", "0 and \'0\'"]; //Can dynamically do these and will add later
    var listOfFloatTypes = ["1.", "42.999999", "0.1", "4.2", "math.pi", "0 or 0.0", 
                            "1.0 + 3", "4.6 + 5", "8 + 4.3", "15 + 1.22", "math.cos(100)"];
    var listOfBoolTypes = ["True", "False", "True or False", "0.0 == 0", 
                           "True or 0", "1 and False", "5 == 6", "15 != 112", "\'16\' != 16"];
    var listOfAllTypes = [listOfStringTypes, listOfIntTypes, listOfFloatTypes, listOfBoolTypes];
    var isSubmitted = false;

    //Testing purposes
    // ex.data.instance = {state: undefined};
    console.log(ex.data.instance.state);
    ex.unload(saveData);

    //Unloading save state
    if (ex.data.instance.state != undefined){
        //There is some kind of save statde
        //If user is on first '4' questions, it is first mode
        isSubmitted = ex.data.instance.state.isSubmitted;
        if (ex.data.instance.state.userQuestionNumber != undefined){
            userQuestionNumber = ex.data.instance.state.userQuestionNumber;
            if (userQuestionNumber < 4){
                initialized = ex.data.instance.state.initialized;
                //In first mode
                practice = true;
                dragInfo = ex.data.instance.state.dragInfo;
                userScore = ex.data.instance.state.userScore;
                //console.log("userscore");
                //console.log(userScore);
                playPracticeGame();
            }
            else{
                //Other mode
                initialized = ex.data.instance.state.initialized;
                console.log("initialized");
                console.log(initialized);
                practice = false;
                dragInfo = ex.data.instance.state.dragInfo;
                userScore = ex.data.instance.state.userScore;
                playQuizGame();
            }
        }
        else{
            userQuestionNumber = 0;
            playPracticeGame();
        }
    }
    // ex.data.meta.mode = "practice";

    //always quiz-immediate
    console.log(ex.data.meta.mode);

    function saveData(){
        var data = {};
        data.bot1 = ex.data.bot1;
        data.bot2 = ex.data.bot2;
        data.total = total;
        data.userQuestionNumber = userQuestionNumber;
        data.initialized = initialized
        data.dragInfo = dragInfo;
        data.userScore = userScore;
        data.isSubmitted = isSubmitted;
        if (ex.data.meta.mode == "quiz-delay" || ex.data.meta.mode == "quiz-immediate"){
        ex.saveState(data);
        }
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
        // alert("Quizzing Immediately");
        // ex.createParagraph(500, 500, "Hello world");
        // var newButton = ex.createButton(0, 0, "OK");
        // newButton.on("click", function() {
        //     console.log("such button verypro 539");
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
                ex.graphics.ctx.beginPath();
                ex.graphics.ctx.fillRect(rectangle.left,
                    rectangle.top, rectangle.width, rectangle.height);
                ex.graphics.ctx.fillStyle = "black";
                ex.graphics.ctx.font = "22 px Arial";
                ex.graphics.ctx.textAlgn = "center";
                ex.graphics.ctx.textBaseline = "middle";
                ex.graphics.ctx.fillText(rectangle.text, rectangle.left + rectangle.width/2, rectangle.top + rectangle.height/2);
                ex.graphics.ctx.closePath();
            }
            else{
                ex.graphics.ctx.beginPath();
                ex.graphics.ctx.strokeStyle = "black";
                ex.graphics.ctx.strokeRect(rectangle.left,
                                           rectangle.top, rectangle.width, rectangle.height);   
                ex.graphics.ctx.closePath();
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
        if (isSubmitted){return;}
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
        if (isSubmitted){return;}
        for (var i = 0; i < dragInfo.rect.length; i++){
            if (dragInfo.rect[i].drag) {
                //move the rect
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
        return ((rect1.left >= rect2.left && 
            rect1.left <= rect2.right) ||
            (rect1.right >= rect2.left && 
                rect1.right <= rect2.right)) && 
            ((rect1.top >= rect2.top &&
                rect1.top <= rect2.bottom) ||
            (rect1.bottom >= rect2.top &&
                rect1.bottom <= rect2.bottom));

    };

    function resetBox(box){
        box.left = box.initialLeft;
        box.top = box.initialTop;
        box.right = box.left + box.width;
        box.bottom = box.top + box.height;
        drawAll();
    }
    
    function twoInSame(){
        for (var i = 12; i < dragInfo.rect.length; i++){
            for (var j = 12; j < dragInfo.rect.length; j++){
                if (rectsCollide(dragInfo.rect[i], dragInfo.rect[j]) && i != j){
                    return true;
                }
            }
        }
        return false;
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
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[1])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[1].left;
                        dragInfo.rect[i].top = dragInfo.rect[1].top;
                        dragInfo.rect[i].right = dragInfo.rect[1].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[1].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[2])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[2].left;
                        dragInfo.rect[i].top = dragInfo.rect[2].top;
                        dragInfo.rect[i].right = dragInfo.rect[2].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[2].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[3])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[3].left;
                        dragInfo.rect[i].top = dragInfo.rect[3].top;
                        dragInfo.rect[i].right = dragInfo.rect[3].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[3].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[4])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[4].left;
                        dragInfo.rect[i].top = dragInfo.rect[4].top;
                        dragInfo.rect[i].right = dragInfo.rect[4].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[4].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[5])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[5].left;
                        dragInfo.rect[i].top = dragInfo.rect[5].top;
                        dragInfo.rect[i].right = dragInfo.rect[5].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[5].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[6])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[6].left;
                        dragInfo.rect[i].top = dragInfo.rect[6].top;
                        dragInfo.rect[i].right = dragInfo.rect[6].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[6].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[7])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[7].left;
                        dragInfo.rect[i].top = dragInfo.rect[7].top;
                        dragInfo.rect[i].right = dragInfo.rect[7].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[7].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[8])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[8].left;
                        dragInfo.rect[i].top = dragInfo.rect[8].top;
                        dragInfo.rect[i].right = dragInfo.rect[8].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[8].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[9])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[9].left;
                        dragInfo.rect[i].top = dragInfo.rect[9].top;
                        dragInfo.rect[i].right = dragInfo.rect[9].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[9].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[10])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[10].left;
                        dragInfo.rect[i].top = dragInfo.rect[10].top;
                        dragInfo.rect[i].right = dragInfo.rect[10].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[10].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
                        drawAll();
                    } else if (rectsCollide(dragInfo.rect[i], dragInfo.rect[11])){
                        dragInfo.rect[i].drag = false;
                        dragInfo.rect[i].left = dragInfo.rect[11].left;
                        dragInfo.rect[i].top = dragInfo.rect[11].top;
                        dragInfo.rect[i].right = dragInfo.rect[11].right;
                        dragInfo.rect[i].bottom = dragInfo.rect[11].bottom;
                        if (twoInSame()){resetBox(dragInfo.rect[i]);}
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
        isSubmitted = false;
        
        ex.chromeElements.resetButton.disable();
        ex.chromeElements.submitButton.disable(); 
        console.log(userQuestionNumber);

        if (userQuestionNumber > 3){
            initialized = true;
            isSubmitted = false;
            practice = false;
            playQuizGame();
            return;
        }
        dragInfo.rect = [];
        //Randomly Generate an element and type
        if (initialized){
            dragInfo.value = undefined;
            dragInfo.typeOfElem = undefined;
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
            //console.log(actualElementList);
            var actualElement = actualElementList[randomIndex(0, actualElementList.length - 1)];
            //console.log(actualElement);
            dragInfo.value = actualElement;
            dragInfo.typeOfElem = actualType;
        }
        ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
        initialized = false;
        
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
        //console.log(dragInfo.rect);
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

    function drawRedBox(color, lineWidth, left, top, width, height) {
        ex.graphics.ctx.beginPath();
        ex.graphics.ctx.lineWidth = lineWidth;
        ex.graphics.ctx.strokeStyle = color;
        ex.graphics.ctx.strokeRect(left, top, width, height);
        ex.graphics.ctx.closePath();
    }
    
    function playQuizGame() {
        console.log(initialized);
        console.log("Testing")
        //In dragInfo.rect, first 12 are placement boxes, next 8 are options
        console.log(ex.data.instance.state.isSubmitted);
        ex.chromeElements.resetButton.enable();
        //if (isSubmitted){
        //    ex.chromeElements.submitButton.disable();
        //    ex.chromeElements.displayCAButton.disable();
        //    //ex.chromeElements.resetButton.disable();
        //    //added by me just now;
        //    //drawAll();
        //}
        if (initialized){
            ex.chromeElements.submitButton.enable();
            dragInfo.rect = [];
            dragInfo.value = [];
            dragInfo.typeOfElem = [];
            var placementRectangleInt1 = createRectangleObject(ex.width()/10, ex.height()/2.5 - 60, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleInt1);
            placementRectangleInt1.draw();

            var placementRectangleInt2 = createRectangleObject(ex.width()/10, ex.height()/2.5, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleInt2);
            placementRectangleInt2.draw();

            var placementRectangleInt3 = createRectangleObject(ex.width()/10, ex.height()/2.5 + 60, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleInt3);
            placementRectangleInt3.draw();

            var placementRectangleBool1 = createRectangleObject(placementRectangleInt1.left + ex.width()/4.5, 
                                                               ex.height()/2.5 - 60, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleBool1);
            placementRectangleBool1.draw();

            var placementRectangleBool2 = createRectangleObject(placementRectangleInt1.left + ex.width()/4.5, 
                                                               ex.height()/2.5, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleBool2);
            placementRectangleBool2.draw();

            var placementRectangleBool3 = createRectangleObject(placementRectangleInt1.left + ex.width()/4.5, 
                                                               ex.height()/2.5 + 60, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleBool3);
            placementRectangleBool3.draw();

            var placementRectangleStr1 = createRectangleObject(placementRectangleBool1.left + ex.width()/4.5, 
                                                              ex.height()/2.5 - 60, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleStr1);
            placementRectangleStr1.draw();

            var placementRectangleStr2 = createRectangleObject(placementRectangleBool1.left + ex.width()/4.5, 
                                                              ex.height()/2.5, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleStr2);
            placementRectangleStr2.draw();

            var placementRectangleStr3 = createRectangleObject(placementRectangleBool1.left + ex.width()/4.5, 
                                                              ex.height()/2.5 + 60, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleStr3);
            placementRectangleStr3.draw();

            var placementRectangleFloat1 = createRectangleObject(placementRectangleStr1.left + ex.width()/4.5, 
                                                                ex.height()/2.5 - 60, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleFloat1);
            placementRectangleFloat1.draw();
            
            var placementRectangleFloat2 = createRectangleObject(placementRectangleStr1.left + ex.width()/4.5, 
                                                                ex.height()/2.5 , 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleFloat2);
            placementRectangleFloat2.draw();

            var placementRectangleFloat3 = createRectangleObject(placementRectangleStr1.left + ex.width()/4.5, 
                                                                ex.height()/2.5 + 60, 100, 50, "#00FFFF", "wow", true);
            dragInfo.rect.push(placementRectangleFloat3);
            placementRectangleFloat3.draw();

            saveData();

            //Generate 8 random options, 2 of each type
            options = [0,0,0,0,0,0,0,0];
            optionsTypes = ["","","","","","","",""];
            //For randomness
            optionIndices = [0,1,2,3,4,5,6,7];
            optionIndices = unsort(optionIndices);
            
            var shortCircuitCount = 0; //Make sure we get this twice at most
            //Make sure we get a type at most 3 times
            var stringCount = 0;
            var integerCount = 0;
            var floatCount = 0;
            var booleanCount = 0;

            //console.log(dragInfo.rect);
            var i = 0;
            while (i < options.length) {

                var everythingElse = false; //If false, then good (check of miscellaneous constraints)
                var theSame = false; //To make sure we don't get duplicates
                //Siphon each set of index to a certain group

                var elementType;
                var actualType;
                //Pick one of every type, last 4 are random
                if (i == 0) {
                    elementType = 0;
                    actualType = "String";
                    stringCount++;
                }
                else if (i == 1) {
                    elementType = 1;
                    actualType = "Integer";
                    integerCount++;
                }
                else if (i == 2) {
                    elementType = 2;
                    actualType = "Float";
                    floatCount++;
                } 
                else if (i == 3) {
                    elementType = 3;
                    actualType = "Boolean";
                    booleanCount++;
                //Last random 4;
                } else {
                    elementType = randomIndex(0, 3);
                    if (elementType == 0) {
                        actualType = "String";
                    } else if (elementType == 1) {
                        actualType = "Integer";
                    } else if (elementType == 2) {
                        actualType = "Float";
                    } else if (elementType == 3) {
                        actualType = "Boolean";
                    }
                }
                //Pick a random element from their respective type
                var actualElementList = listOfAllTypes[elementType];
                var actualElement = actualElementList[randomIndex(0, actualElementList.length - 1)];
                   
                //Check of max of 3 for each type
                
                if (actualType == "String") {
                    if (stringCount > 3) everythingElse = true;
                } else if (actualType == "Integer") {
                    if (integerCount > 3) everythingElse = true;
                } else if (actualType == "Float") {
                    if (floatCount > 3) everythingElse = true;
                } else if (actualType == "Boolean") {
                    if (booleanCount > 3) everythingElse = true;
                }
                //Check for short circuiting (only a max of two)
                if (actualElement.search("and") != -1) {
                    if (shortCircuitCount > 1) {
                        everythingElse = true;
                    }
                } else if(actualElement.search("or") != -1 && 
                          actualElement.search("ord") == -1 &&
                          actualElement.search("for") == -1) {
                    if (shortCircuitCount > 1) {
                        everythingElse = true;
                    }
                }

                if (everythingElse == false) {
                    for (var j = 0; j < options.length; j++) {
                        if (options[j] == actualElement) {
                            theSame = true;
                        } 
                    }   
                }
                
                //If pass all the constraints and not a duplicate, make it an option
                if (theSame == false && everythingElse == false) {
                    index = optionIndices.pop();
                    options[index] = actualElement;
                    optionsTypes[index] = actualType;

                    dragInfo.value[index] = actualElement;
                    dragInfo.typeOfElem[index] = actualType;

                    if (actualType == "String") stringCount++;
                    if (actualType == "Integer") integerCount++;
                    if (actualType == "Float") floatCount++;
                    if (actualType == "Boolean") booleanCount++;
                    
                    if (actualElement.search("and") != -1) {
                        shortCircuitCount++;
                    } else if (actualElement.search("or") != -1 && 
                               actualElement.search("ord") == -1 &&
                               actualElement.search("for") == -1) {
                        shortCircuitCount++;
                    }

                    i++;
                }
                initialized = false;
                saveData();
                //PURPOSE??
                ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height()); 
            };
            
            var optionY0 = 2.75 * ex.height()/4 + 10;
            
            var option1 = createRectangleObject(ex.width()/10, optionY0, 100, 50, "#33FFAA", options[0]);
            dragInfo.rect.push(option1);
            
            var option2 = createRectangleObject(option1.left + ex.width()/4.5, optionY0, 100, 50, "#AAAAAA", options[1]);
            dragInfo.rect.push(option2);

            var option3 = createRectangleObject(option2.left + ex.width()/4.5, optionY0, 100, 50, "#7777FF", options[2]);
            dragInfo.rect.push(option3);

            var option4 = createRectangleObject(option3.left + ex.width()/4.5, optionY0, 100, 50, "#997777", options[3]);
            dragInfo.rect.push(option4);

            var option5 = createRectangleObject(ex.width()/10, optionY0 + 60, 100, 50, "#CCFF00", options[4]);
            dragInfo.rect.push(option5);
            
            var option6 = createRectangleObject(option5.left + ex.width()/4.5, optionY0 + 60, 100, 50, "#FF9900", options[5]);
            dragInfo.rect.push(option6);
            
            var option7 = createRectangleObject(option6.left + ex.width()/4.5, optionY0 + 60, 100, 50, "#FFA8D7", options[6]);
            dragInfo.rect.push(option7);

            var option8 = createRectangleObject(option7.left + ex.width()/4.5, optionY0 + 60, 100, 50, "#CCCCFF", options[7]);
            dragInfo.rect.push(option8);

            ex.data.bot1 = option5.bottom;
            ex.data.bot2 = option1.bottom;
            //console.log(dragInfo.rect)
            initialized = false;
            saveData();
            //added by me just now;
            drawAll();
            
        }
        // else{
        //     console.log(dragInfo);
        //     for (var i = 0; i < dragInfo.rect.length; i++){
        //         dragInfo.rect[i].draw();
        //     }
        // }
        else{
            ex.data.bot1 = ex.data.instance.state.bot1;
            ex.data.bot2 = ex.data.instance.state.bot2;
            //First 12 are boxes, rest are options
            var placementRectangleInt1 = createRectangleObject(dragInfo.rect[0].left, dragInfo.rect[0].top, dragInfo.rect[0].width, dragInfo.rect[0].height, dragInfo.rect[0].color, dragInfo.rect[0].text, true);
            dragInfo.rect[0] = (placementRectangleInt1);
            placementRectangleInt1.draw();

            var placementRectangleInt2 = createRectangleObject(dragInfo.rect[1].left, dragInfo.rect[1].top, dragInfo.rect[1].width, dragInfo.rect[1].height, dragInfo.rect[1].color, dragInfo.rect[1].text, true);
            dragInfo.rect[1] = (placementRectangleInt2);
            placementRectangleInt2.draw();

            var placementRectangleInt3 = createRectangleObject(dragInfo.rect[2].left, dragInfo.rect[2].top, dragInfo.rect[2].width, dragInfo.rect[2].height, dragInfo.rect[2].color, dragInfo.rect[2].text, true);
            dragInfo.rect[2] = (placementRectangleInt3);
            placementRectangleInt3.draw();

            var placementRectangleBool1 = createRectangleObject(dragInfo.rect[3].left, dragInfo.rect[3].top, dragInfo.rect[3].width, dragInfo.rect[3].height, dragInfo.rect[3].color, dragInfo.rect[3].text, true);
            dragInfo.rect[3] = (placementRectangleBool1);
            placementRectangleBool1.draw();

            var placementRectangleBool2 = createRectangleObject(dragInfo.rect[4].left, dragInfo.rect[4].top, dragInfo.rect[4].width, dragInfo.rect[4].height, dragInfo.rect[4].color, dragInfo.rect[4].text, true);
            dragInfo.rect[4] = (placementRectangleBool2);
            placementRectangleBool2.draw();

            var placementRectangleBool3 = createRectangleObject(dragInfo.rect[5].left, dragInfo.rect[5].top, dragInfo.rect[5].width, dragInfo.rect[5].height, dragInfo.rect[5].color, dragInfo.rect[5].text, true);
            dragInfo.rect[5] = (placementRectangleBool3);
            placementRectangleBool3.draw();

            var placementRectangleStr1 = createRectangleObject(dragInfo.rect[6].left, dragInfo.rect[6].top, dragInfo.rect[6].width, dragInfo.rect[6].height, dragInfo.rect[6].color, dragInfo.rect[6].text, true);
            dragInfo.rect[6] = (placementRectangleStr1);
            placementRectangleStr1.draw();

            var placementRectangleStr2 = createRectangleObject(dragInfo.rect[7].left, dragInfo.rect[7].top, dragInfo.rect[7].width, dragInfo.rect[7].height, dragInfo.rect[7].color, dragInfo.rect[7].text, true);
            dragInfo.rect[7] = (placementRectangleStr2);
            placementRectangleStr2.draw();

            var placementRectangleStr3 = createRectangleObject(dragInfo.rect[8].left, dragInfo.rect[8].top, dragInfo.rect[8].width, dragInfo.rect[8].height, dragInfo.rect[8].color, dragInfo.rect[8].text, true);
            dragInfo.rect[8] = (placementRectangleStr3);
            placementRectangleStr3.draw();

            var placementRectangleFloat1 = createRectangleObject(dragInfo.rect[9].left, dragInfo.rect[9].top, dragInfo.rect[9].width, dragInfo.rect[9].height, dragInfo.rect[9].color, dragInfo.rect[9].text, true);
            dragInfo.rect[9] = (placementRectangleFloat1);
            placementRectangleFloat1.draw();
            
            var placementRectangleFloat2 = createRectangleObject(dragInfo.rect[10].left, dragInfo.rect[10].top, dragInfo.rect[10].width, dragInfo.rect[10].height, dragInfo.rect[10].color, dragInfo.rect[10].text, true);
            dragInfo.rect[10] = (placementRectangleFloat2);
            placementRectangleFloat2.draw();

            var placementRectangleFloat3 = createRectangleObject(dragInfo.rect[11].left, dragInfo.rect[11].top, dragInfo.rect[11].width, dragInfo.rect[11].height, dragInfo.rect[11].color, dragInfo.rect[11].text, true);
            dragInfo.rect[11] = (placementRectangleFloat3);
            placementRectangleFloat3.draw();

            var option1 = createRectangleObject(dragInfo.rect[12].left, dragInfo.rect[12].top, dragInfo.rect[12].width, dragInfo.rect[12].height, dragInfo.rect[12].color, dragInfo.rect[12].text, false);
            dragInfo.rect[12] = (option1);
            
            var option2 = createRectangleObject(dragInfo.rect[13].left, dragInfo.rect[13].top, dragInfo.rect[13].width, dragInfo.rect[13].height, dragInfo.rect[13].color, dragInfo.rect[13].text, false);
            dragInfo.rect[13] = (option2);

            var option3 = createRectangleObject(dragInfo.rect[14].left, dragInfo.rect[14].top, dragInfo.rect[14].width, dragInfo.rect[14].height, dragInfo.rect[14].color, dragInfo.rect[14].text, false);
            dragInfo.rect[14] = (option3);

            var option4 = createRectangleObject(dragInfo.rect[15].left, dragInfo.rect[15].top, dragInfo.rect[15].width, dragInfo.rect[15].height, dragInfo.rect[15].color, dragInfo.rect[15].text, false);
            dragInfo.rect[15] = (option4);

            var option5 = createRectangleObject(dragInfo.rect[16].left, dragInfo.rect[16].top, dragInfo.rect[16].width, dragInfo.rect[16].height, dragInfo.rect[16].color, dragInfo.rect[16].text, false);
            dragInfo.rect[16] = (option5);
            
            var option6 = createRectangleObject(dragInfo.rect[17].left, dragInfo.rect[17].top, dragInfo.rect[17].width, dragInfo.rect[17].height, dragInfo.rect[17].color, dragInfo.rect[17].text, false);
            dragInfo.rect[17] = (option6);
            
            var option7 = createRectangleObject(dragInfo.rect[18].left, dragInfo.rect[18].top, dragInfo.rect[18].width, dragInfo.rect[18].height, dragInfo.rect[18].color, dragInfo.rect[18].text, false);
            dragInfo.rect[18] = (option7);

            var option8 = createRectangleObject(dragInfo.rect[19].left, dragInfo.rect[19].top, dragInfo.rect[19].width, dragInfo.rect[19].height, dragInfo.rect[19].color, dragInfo.rect[19].text, false);
            dragInfo.rect[19] = (option8);
            
            //added by me just now
            drawAll();
                
            if (isSubmitted){
                ex.chromeElements.submitButton.disable();
                ex.chromeElements.displayCAButton.disable();
                ex.chromeElements.resetButton.disable();
                for (var i = 0; i < dragInfo.rect.length; i++) {
                    dragInfo.rect[i].clicked = function() {
                        return false;
                    }
                //Draw the red rectangles after submitted 
                } for (var i = 12; i < 20; i++) {
                    if (dragInfo.typeOfElem[i-12] == "Integer") {
                        if (dragInfo.rect[i].left == dragInfo.rect[0].left) {
                        } else{
                            var left = dragInfo.rect[i].left;
                            var top = dragInfo.rect[i].top;
                            var width = dragInfo.rect[i].width;
                            var height = dragInfo.rect[i].height;
                            drawRedBox("red", "3", left, top, width, height);
                        }
                    } else if (dragInfo.typeOfElem[i-12] == "Boolean") {
                       if (dragInfo.rect[i].left == dragInfo.rect[3].left) {
                       } else {
                            var left = dragInfo.rect[i].left;
                            var top = dragInfo.rect[i].top;
                            var width = dragInfo.rect[i].width;
                            var height = dragInfo.rect[i].height;
                            drawRedBox("red", "3", left, top, width, height);
                       }
                    } else if (dragInfo.typeOfElem[i-12] == "String") {
                        if (dragInfo.rect[i].left == dragInfo.rect[6].left) {
                        } else {
                            var left = dragInfo.rect[i].left;
                            var top = dragInfo.rect[i].top;
                            var width = dragInfo.rect[i].width;
                            var height = dragInfo.rect[i].height;
                            drawRedBox("red", "3", left, top, width, height);
                        }
                    } else if (dragInfo.typeOfElem[i-12] == "Float") {
                        if (dragInfo.rect[i].left == dragInfo.rect[9].left) {
                        } else{
                            var left = dragInfo.rect[i].left;
                            var top = dragInfo.rect[i].top;
                            var width = dragInfo.rect[i].width;
                            var height = dragInfo.rect[i].height;
                            drawRedBox("red", "3", left, top, width, height);
                        }
                    }
                }
                total = ex.data.instance.state.total;
                ex.showFeedback(total.toString().concat("/12"));
                }
                initialized = false;
                saveData();

                
            
        }
        saveData();
        return;
}

    ex.chromeElements.resetButton.on("click", function() {
        var optionY0 = 2.75 * ex.height()/4 + 10;
        
        dragInfo.rect[12].left = ex.width()/10;
        dragInfo.rect[12].top = optionY0;
        dragInfo.rect[12].right = dragInfo.rect[12].left + dragInfo.rect[12].width;
        dragInfo.rect[12].bottom = dragInfo.rect[12].top + dragInfo.rect[12].height;
        
        dragInfo.rect[13].left = ex.width()/10 + ex.width()/4.5;
        dragInfo.rect[13].top = optionY0;
        dragInfo.rect[13].right = dragInfo.rect[13].left + dragInfo.rect[13].width;
        dragInfo.rect[13].bottom = dragInfo.rect[13].top + dragInfo.rect[13].height;
        
        dragInfo.rect[14].left = ex.width()/10 + 2 * ex.width()/4.5;
        dragInfo.rect[14].top = optionY0;
        dragInfo.rect[14].right = dragInfo.rect[14].left + dragInfo.rect[14].width;
        dragInfo.rect[14].bottom = dragInfo.rect[14].top + dragInfo.rect[14].height;
        
        dragInfo.rect[15].left = ex.width()/10 + 3 * ex.width()/4.5;
        dragInfo.rect[15].top = optionY0;
        dragInfo.rect[15].right = dragInfo.rect[15].left + dragInfo.rect[15].width;
        dragInfo.rect[15].bottom = dragInfo.rect[15].top + dragInfo.rect[15].height;
        
        dragInfo.rect[16].left = ex.width()/10;
        dragInfo.rect[16].top = optionY0 + 60;
        dragInfo.rect[16].right = dragInfo.rect[16].left + dragInfo.rect[16].width;
        dragInfo.rect[16].bottom = dragInfo.rect[16].top + dragInfo.rect[16].height;
        
        dragInfo.rect[17].left = ex.width()/10 + ex.width()/4.5;
        dragInfo.rect[17].top = optionY0 + 60;
        dragInfo.rect[17].right = dragInfo.rect[17].left + dragInfo.rect[17].width;
        dragInfo.rect[17].bottom = dragInfo.rect[17].top + dragInfo.rect[17].height;
        
        dragInfo.rect[18].left = ex.width()/10 + 2 * ex.width()/4.5;
        dragInfo.rect[18].top = optionY0 + 60;
        dragInfo.rect[18].right = dragInfo.rect[18].left + dragInfo.rect[18].width;
        dragInfo.rect[18].bottom = dragInfo.rect[18].top + dragInfo.rect[18].height;
        
        dragInfo.rect[19].left = ex.width()/10 + 3 * ex.width()/4.5;
        dragInfo.rect[19].top = optionY0 + 60;
        dragInfo.rect[19].right = dragInfo.rect[19].left + dragInfo.rect[19].width;
        dragInfo.rect[19].bottom = dragInfo.rect[19].top + dragInfo.rect[19].height;
        
        drawAll();
    });
            
    function drawAll(){
        if (practice == true) {
            console.log("in Practice Mode");
            ex.graphics.ctx.fillStyle = "black";
            ex.graphics.ctx.font = "24px Arial Bold";
            ex.graphics.ctx.textAlign = "center";
            ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
            //console.log(dragInfo.rect);
            for (var i = 0; i < dragInfo.rect.length; i++){
                dragInfo.rect[i].draw();
            };
    
            ex.graphics.ctx.fillText("Drag the correct type.", ex.width() / 2, ex.height() / 10);
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
            //console.log(dragInfo.rect);
            for (var i = 0; i < dragInfo.rect.length; i++){
                // dragInfo.rect[i].draw();
                dragInfo.rect[i].draw();
                // rectangle1 = dragInfo.rect[i];
                // ex.graphics.ctx.fillStyle = rectangle1.color;
                // if (!rectangle1.outlined){
                //     ex.graphics.ctx.fillRect(rectangle1.left,
                //         rectangle1.top, rectangle1.width, rectangle1.height);
                //     ex.graphics.ctx.fillStyle = "black";
                //     ex.graphics.ctx.font = "22 px Arial";
                //     ex.graphics.ctx.textAlgn = "center";
                //     ex.graphics.ctx.textBaseline = "middle";
                //     ex.graphics.ctx.fillText(rectangle1.text, rectangle1.left + rectangle1.width/2, rectangle1.top + rectangle1.height/2);
                // }
                // else{
                //  ex.graphics.ctx.strokeRect(rectangle1.left,
                //         rectangle1.top, rectangle1.width, rectangle1.height);   
                // }
                //console.log(options[i]);
                //console.log(optionsTypes[i]);
                //console.log(dragInfo.value[i]);
                //console.log(dragInfo.typeOfElem[i]);
            };

            ex.graphics.ctx.fillText("Drag each rectangle into their type box. (Not every box will be filled!)", ex.width() / 2, ex.height() / 8);
            var firstTypeX0 = ex.width()/7;
            var secondTypeX0 = firstTypeX0 + ex.width()/4.5;
            var thirdTypeX0 = secondTypeX0 + ex.width()/4.5;
            var fourthTypeX0 = thirdTypeX0 + ex.width()/4.5;
            var typeY0 = ex.height()/5;

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

            

        }
    }

//options, width, left, top, cx, cy,

    function providePracticeFeedback(value, expectedResult, actualResult, i) {
        //console.log("here");
        //console.log(userAttempts);
        //console.log(userScore);
        isSubmitted = true;
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
                    initialized = true;
                    ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                    playPracticeGame();
                })
                var nahButton = ex.createButton(0, 0, "OK");
                nahButton.on("click", function(){
                    correctBox.remove();
                    ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                    initialized = true;
                    playPracticeGame();
                })
                var correctBox = textbox112("Correct! <span>BTN1</span> <span>BTN2</span>", {}, undefined, ex.height()/3, ex.height()/2 + margin);
                insertButtonTextbox112(correctBox, hideButton, "BTN1");
                insertButtonTextbox112(correctBox, nahButton, "BTN2");
                initialized = true;
                saveData();
            }
            else{
                saveData();
                ex.graphics.ctx.clearRect(0,0,ex.width(),ex.height());
                playPracticeGame(); 
            }
            return;
        }
        else {
            initialized = true;
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

    function provideQuizFeedback(bottom1, bottom2) {
        saveData();
        if (practice == true){
            ex.chromeElements.submitButton.enable();
            return;}
        var intCorrect = 0;
        var boolCorrect = 0;
        var strCorrect = 0;
        var floatCorrect = 0;
        //var total = 0;
        //8 answers to check and these rectangles are indexed 12-20
        for (var j = 12; j < 20; j++) {    
            //check if they've attempted all answers (if not, at least one of the boxes are located on the bottom)
            if (dragInfo.rect[j].bottom == bottom1 || 
                dragInfo.rect[j].bottom == bottom2) {
                ex.alert("Keep trying!", {color: "red"});
                ex.chromeElements.submitButton.enable();
                ex.chromeElements.resetButton.enable();
                ex.chromeElements.displayCAButton.disable();
                return;
            }
        } for (var i = 12; i < 20; i++) {
            isSubmitted = true;
            if (dragInfo.rect[i].left == dragInfo.rect[0].left) {
                //i-8 because the list containing the values is indexed 0-8
                if (dragInfo.typeOfElem[i-12] == "Integer") { 
                    intCorrect++;
                } else {
                    ex.graphics.ctx.beginPath();
                    ex.graphics.ctx.lineWidth = "3";
                    ex.graphics.ctx.strokeStyle = "red";
                    ex.graphics.ctx.strokeRect(dragInfo.rect[i].left, dragInfo.rect[i].top,
                                               dragInfo.rect[i].width, dragInfo.rect[i].height);
                    ex.graphics.ctx.closePath();
                }
            } else if (dragInfo.rect[i].left == dragInfo.rect[3].left) {
                if (dragInfo.typeOfElem[i-12] == "Boolean") {
                    boolCorrect++;
                } else {
                    ex.graphics.ctx.beginPath();
                    ex.graphics.ctx.lineWidth = "3";
                    ex.graphics.ctx.strokeStyle = "red";
                    ex.graphics.ctx.strokeRect(dragInfo.rect[i].left, dragInfo.rect[i].top,
                                               dragInfo.rect[i].width, dragInfo.rect[i].height);
                    ex.graphics.ctx.closePath();
                }
            } else if (dragInfo.rect[i].left == dragInfo.rect[6].left) {
                if (dragInfo.typeOfElem[i-12] == "String") {
                    strCorrect++;
                } else {
                    ex.graphics.ctx.beginPath();
                    ex.graphics.ctx.lineWidth = "3";
                    ex.graphics.ctx.strokeStyle = "red";
                    ex.graphics.ctx.strokeRect(dragInfo.rect[i].left, dragInfo.rect[i].top,
                                               dragInfo.rect[i].width, dragInfo.rect[i].height);
                    ex.graphics.ctx.closePath();
                }
            } else if (dragInfo.rect[i].left == dragInfo.rect[9].left) {
                if (dragInfo.typeOfElem[i-12] == "Float") {
                    floatCorrect++;
                } else {
                    ex.graphics.ctx.beginPath();
                    ex.graphics.ctx.lineWidth = "3";
                    ex.graphics.ctx.strokeStyle = "red";
                    ex.graphics.ctx.strokeRect(dragInfo.rect[i].left, dragInfo.rect[i].top,
                                               dragInfo.rect[i].width, dragInfo.rect[i].height);
                    ex.graphics.ctx.closePath();
                }
            }
        }
        total = userScore + intCorrect + boolCorrect + strCorrect + floatCorrect;
        saveData();
        var totalScore = (total / 12);
        //Set the grade
        if (ex.data.meta.mode == "quiz-delay" || ex.data.meta.mode == "quiz-immediate"){
            console.log("Trying to set grade");
        ex.setGrade(totalScore, "Good job!");
        ex.setGrade(totalScore, "Good job!");
        }
        ex.showFeedback(total.toString().concat("/12"));
        ex.chromeElements.displayCAButton.disable();
        //disable moving things after submitting
        for (var i = 0; i < dragInfo.rect.length; i++) {
            dragInfo.rect[i].clicked = function() {
                return false;
            }
        }

    }

    //Quiz feedback (using submit button) (putting types into correct buckets)
    ex.chromeElements.submitButton.on("click", function() {
        saveData();
        provideQuizFeedback(ex.data.bot1, ex.data.bot2);
        saveData();
    });
  
    function runQuizDelayMode(){
        // alert("Quizzing on a Delay");
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