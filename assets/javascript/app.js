var numCorrect = 0,
    numIncorrect = 0,
    numUnanswered = 0,
    numTotalAnswered = 0,
    timeLeft = 15,
    timerID,
    idx,
    trivia = {
        arrTriviaPool: [],
        arrGamePool: [],

        GameRoutine: function() {

            numTotalAnswered = numCorrect + numIncorrect + numUnanswered;
            $("#timerHdr").text("Time Remaining: " + timeLeft.toString() + " seconds");
            idx = trivia.arrGamePool[numTotalAnswered];

            $("#question").text(trivia.arrTriviaPool[idx].question);
            $("#btn0").text(trivia.arrTriviaPool[idx].choices[0]);
            $("#btn1").text(trivia.arrTriviaPool[idx].choices[1]);
            $("#btn2").text(trivia.arrTriviaPool[idx].choices[2]);
            $("#btn3").text(trivia.arrTriviaPool[idx].choices[3]);
        },

        PoseTheQuestion: function() {
            var numPercent;
                
            if (timeLeft === 0) {
                trivia.Unanswered();
            }
            else {
                timeLeft--;
                $("#timerHdr").text("Time Remaining: " + timeLeft.toString() + " seconds");
                numPercent = Math.round(timeLeft / 15 * 100);
                $("#progTimeRemaining").attr("aria-valuenow", timeLeft.toString()).css("width", numPercent.toString() + "%");
            }
        },

        AnswerChosen: function(whichOne) {

            clearTimeout(timerID);

            if (whichOne === trivia.arrTriviaPool[idx].answer) {
                numCorrect++;
                numTotalAnswered = numCorrect + numIncorrect + numUnanswered;
                trivia.ShowTheResult("Correct");
            }
            else {
                numIncorrect++;
                numTotalAnswered = numCorrect + numIncorrect + numUnanswered;
                trivia.ShowTheResult("Incorrect");
            }
        },

        Unanswered: function() {

            window.clearTimeout(timerID);
            numUnanswered++
            numTotalAnswered = numCorrect + numIncorrect + numUnanswered;
            trivia.ShowTheResult("Unanswered");
        },

        ContinueGame: function() {

            timeLeft = 15;
            $("#progTimeRemaining").attr("aria-valuenow", 100).css("width", "100%");
            timerID = setInterval(trivia.PoseTheQuestion, 1000);

            $("#results_container").addClass("d-none");
            $("#game_container").removeClass("d-none");

            if (numTotalAnswered < 10) {
                trivia.GameRoutine();
            }
            else {
                trivia.RoundOver();
            }
        },

        ShowTheResult(whichOne) {
            var answerIDX;

            $("#game_container").addClass("d-none");

            if (whichOne === "Correct") {
                $("#resultAlert").text("Correct!");
                $("#answerMsg").text("");
                $("#resultImg").attr("src","assets/images/clap.gif");
            }
            else if (whichOne === "Incorrect") {
                answerIDX = trivia.arrTriviaPool[idx].answer
                $("#resultAlert").text("Nope!!");
                $("#answerMsg").text("The Correct Answer was: " + trivia.arrTriviaPool[idx].choices[answerIDX]);
                $("#resultImg").attr("src","assets/images/wrong.gif");
            }
            else if (whichOne === "Unanswered") {
                answerIDX = trivia.arrTriviaPool[idx].answer
                $("#resultAlert").text("Out of time!");
                $("#answerMsg").text("The Correct Answer was: " + trivia.arrTriviaPool[idx].choices[answerIDX]);
                $("#resultImg").attr("src","assets/images/timesUP.gif");
            }

            $("#results_container").removeClass("d-none");
            setTimeout(trivia.ContinueGame, 5000);
        },
        
        RoundOver: function() {

            clearTimeout(timerID);
            $("#game_container").addClass("d-none");
            $("#correct").text("Correct Answers: " + numCorrect.toString());
            $("#incorrect").text("Incorrect Answers: " + numIncorrect.toString());
            $("#unanswered").text("Unanswered: " + numUnanswered.toString());
            $("#stats_container").removeClass("d-none");
        },

        StartGame: function() {

            var rdm;

            while (trivia.arrGamePool.length < 10) {
                rdm = Math.floor(Math.random() * 30)

                if (trivia.arrGamePool.indexOf(rdm) === -1) {
                    trivia.arrGamePool.push(rdm);
                }
            }

            $("#btn_Start").addClass("d-none");
            $("#game_container").removeClass("d-none");
            timerID = setInterval(trivia.PoseTheQuestion, 1000);
            trivia.GameRoutine();
        },

        RestartGame: function() {

            trivia.arrGamePool = [];
            timeLeft = 15;
            numCorrect = 0;
            numIncorrect = 0;
            numUnanswered = 0;
            numTotalAnswered = 0;
            $("#stats_container").addClass("d-none");
            trivia.StartGame();
        }
    };


    /***************************************************************/
    function PopulateTriviaPool() {
    /***************************************************************/

        trivia.arrTriviaPool.push({
            id: 0,
            question: "What is the sum of 118 + 37?",
            choices: ["141", "165", "155", "None of the above"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 1,
            question: "What is the greatest common factor of 18 and 36?",
            choices: ["2", "6", "9", "18"],
            answer: 3
        });
        trivia.arrTriviaPool.push({
            id: 2,
            question: "What is the quotient of 67 divided by 9?",
            choices: ["4", "8", "7", "58"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 3,
            question: "What is the least common multiple of 3 and 4?",
            choices: ["0", "12", "21", "24"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 4,
            question: "What is the remainder of 70 divided by 11?",
            choices: ["4", "59", "11", "6"],
            answer: 0
        });
        trivia.arrTriviaPool.push({
            id: 5,
            question: "Solve: 5 plus 3 times 3?",
            choices: ["24", "14", "45", "11"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 6,
            question: "The circumference of a circle is calculated by?",
            choices: ["Multiply the diameter times the radius",
                "Subtract pi from the diameter squared",
                "Muliple the radius by pi",
                "None of the above"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 7,
            question: "What type of triangle is equal on all sides?",
            choices: ["Scalene", "Isosceles", "Equilateral", "None of the above"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 8,
            question: "Solve: 18 minus 4 times 3?",
            choices: ["6", "42", "17", "None of the above"],
            answer: 0
        });
        trivia.arrTriviaPool.push({
            id: 9,
            question: "What is the square root of 144?",
            choices: ["14", "12", "16", "None of the above"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 10,
            question: "What is the sum of 118 + 37?",
            choices: ["141", "165", "155", "None of the above"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 11,
            question: "This leader was the 16th President of the United States.  He led the country to victory during the Civil War.",
            choices: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 12,
            question: "Adolf Hitler was an Austrian-born politician.  He was the leader of which party?",
            choices: ["Socialist", "Nazi", "Republic", "Communist"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 13,
            question: "Which of the following leaders was the President of the African National Congress?",
            choices: ["Albert John Luthuli", "Jawahanial Nehru", "Henri La Fontaine", "Boris Yugoslich"],
            answer: 0
        });
        trivia.arrTriviaPool.push({
            id: 14,
            question: "Alexander Hamilton was one of the important pioneers in the early formation of what?",
            choices: ["Civil War", "Revolutionary War", "American government", "Mexican government"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 15,
            question: "Fidel Castro is a revolutionary figure and former Prime Minister of __________?",
            choices: ["Cuba", "Mexico", "India", "None of the above"],
            answer: 0
        });
        trivia.arrTriviaPool.push({
            id: 16,
            question: "This person is the former Prime Minister of Israel and military leader. He is ranked among the most powerful leaders in the history of Israel.",
            choices: ["Gamal Abdel Nasser", "Benjamin Netanyahu", "Albertu Marcion", "Arial Sharon"],
            answer: 3
        });
        trivia.arrTriviaPool.push({
            id: 17,
            question: "Which of the following leaders is famous all over the world with the three letters, FDR?",
            choices: ["Franklin D. Ryan", "Franklin D. Reagan", "Franklin D. Roosevelt", "None of the above"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 18,
            question: "This leader was the 2nd President of Egypt and one of the most important figures in the modern world and Arab history.",
            choices: ["Gamal Abdel Nasser", "Ariel Sharon", "Cordel Hull", "Amelda Barruso"],
            answer: 0
        });
        trivia.arrTriviaPool.push({
            id: 19,
            question: "Who is a former President of Poland and a Nobel Peace Prize Winner?",
            choices: ["Lord Mountbatten", "Lech Walesa", "Mao Zedong", "Mikhail Gorbachev"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 20,
            question: "This American woman aided wounded soldiers on the battlefield during the Civil War.",
            choices: ["Mother Theresa","Margaret Thatcher","Sandra O'Connor","Clara Barton"],
            answer: 3
        });
        trivia.arrTriviaPool.push({
            id: 21,
            question: "James Polk, the 11th President, was the first President for what?",
            choices: ["having his photograph taken","living in the White House","getting a T.V. in the White House","riding in an airplane"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 22,
            question: "During the War of 1812, who was the United States fighting against?",
            choices: ["Great Britain","Spain","Russia","France"],
            answer: 0
        });
        trivia.arrTriviaPool.push({
            id: 23,
            question: "In 1803, Thomas Jefferson bought a large amount of land from the French. What was this called?",
            choices: ["Florida Sale","Louisiana Purchase","French Affair","None of the above"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 24,
            question: "Who won World War II?",
            choices: ["America","England","Allied Powers","Axis Powers"],
            answer: 2
        });
        trivia.arrTriviaPool.push({
            id: 25,
            question: "What are positive integers greater than 1 that are divisible by one and themselves?",
            choices: ["Negative numbers","Prime numbers","Odd integers","Even integers"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 26,
            question: "What is the missing integer? -10 + 17 - 2 + ? = 10",
            choices: ["5","15","-5","-15"],
            answer: 0
        });
        trivia.arrTriviaPool.push({
            id: 27,
            question: "What is 20% of 240??",
            choices: ["240","21","24","48"],
            answer: 3
        });
        trivia.arrTriviaPool.push({
            id: 28,
            question: "What is the decimal 0.125 written as a percent?",
            choices: ["125%","12.5%","0.125%","1.25%"],
            answer: 1
        });
        trivia.arrTriviaPool.push({
            id: 29,
            question: "There were 11 acorns on the ground. Squirrels ate three. What fraction of the acorns are left on the ground?",
            choices: ["11/3","3/11","8/11","11/8"],
            answer: 2
        });
    };


    /***************************************************************/    
    function StartTheGame() {
    /***************************************************************/
    
        PopulateTriviaPool();
        trivia.StartGame();
    };


    /***************************************************************/
    $(document).ready(function() {
    /***************************************************************/
    
        $("#btn_Start").bind("click", function() {StartTheGame()});

        $("#btn0").bind("click", function() {trivia.AnswerChosen(0)});
        $("#btn1").bind("click", function() {trivia.AnswerChosen(1)});
        $("#btn2").bind("click", function() {trivia.AnswerChosen(2)});
        $("#btn3").bind("click", function() {trivia.AnswerChosen(3)});

        $("#btn_StartOver").bind("click", function() {trivia.RestartGame()});
    }, false);