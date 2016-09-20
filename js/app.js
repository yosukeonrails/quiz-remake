//View - showExplanation - ShowScore - ShowFinalResults
////Model - restart - finalquestion (return true or false if you reach the end of the questions)

//render state
//
//
//
var gradeNumber = null;

var QuizView = function() {

    this.showQuestion = function() {

  $('.submit-button').hide();
    $('.answer-evaluator').hide();

      $('.welcome').fadeOut(500,function(){

        $('.welcome').hide(0 , function(){
           $('.question-box').show();
         });
      });

        var choiceId = -1;

        $('.question-box h1').text(state.question.question);
        state.question.choices.forEach(function(value, index) {

            $('.question-box ul').append('<div class="question-choice" id=' + index + '><li >' + value + '</li></div>');

        });

    };

    this.showEvaluation = function() {

        $('.answer-evaluator p').text(state.question.explanation);

        $('.answer-evaluator h2').text('you got ' + state.currentPoint + ' points ');

        $('.answer-evaluator h3').text('Total Score: ' + state.score);


    };


    this.ShowFinalResults = function() {
        $('.answer-evaluator').hide();
        $('.result-box').show();
        $('.result-box button').show();


        $('.result-box h3').text(state.finalGrade);

        $('.result-box h3').css("color", gradeColors[gradeNumber]);

        console.log(gradeColors[gradeNumber]);

        $('.result-box h1').text('Congratulations! You finished this weird weird quiz!');

        $('.result-box h2').text('Your total score was: ' + state.score);

    };

};
//change state of the model each time its run
//
var QuizModel = function() {

    this.updateQuestion = function() {

        state.question = question_array[state.currentQuestion];

    };


    this.updateQuestion();

    this.answerChecker = function(answer) {

        var point = state.question.points[answer];

        state.currentPoint = point;
        state.score += point;


        state.currentQuestion += 1;

        // this.updateQuestion();

        console.log(state.score);


    };

    this.selectAnswer = function(selected) {
        state.selectedChoice = selected;
    };

    this.stateReseter = function() {
        state.currentPoint = null;
        state.selectedChoice = null;

    };

    this.quizGrader = function() {

        if (state.score <= 59) {

            state.finalGrade = gradeArray[12];

            console.log(state.finalGrade);

        } else if (state.score > 59)

        {
            console.log('its' + state.score);

            gradeNumber = Math.floor(Math.abs((state.score - 60) / 3.33 - 12));

            state.finalGrade = gradeArray[gradeNumber];

            console.log(state.finalGrade);

        }

    };

};


var state = {
    currentQuestion: 0,
    question: "",
    choices: [],
    score: 0,
    selectedChoice: null,
    currentPoint: null,
    finalGrade: null
};


$(document).ready(function() {





    var model = new QuizModel();

    var view = new QuizView();

    $('.welcome').show();
    $('.welcome button').click(function() {

        view.showQuestion();
        console.log('hello');


        $('.question-box').on('click', '.question-choice', function() {

          $('.question-choice').removeClass('selected');
          $(this).toggleClass('selected');

            $('.submit-button').show();

            var selected = this.id;

            console.log(selected);

            model.selectAnswer(selected);



        });

        $('.submit-button').click(function() {

            model.answerChecker(state.selectedChoice);
            console.log('current question is' + state.currentQuestion);


            $('.question-box').fadeOut(300, function(){

              $('.question-box').hide( 0, function(){

                $('.answer-evaluator button').show();

                  $('.answer-evaluator').fadeIn(300,function(){

                    $('.answer-evaluator').show();


                  });

              });

            });


            view.showEvaluation();

        });

    });


    $('.answer-evaluator button').click(function() {


        if (state.currentQuestion == 10) {

            model.quizGrader();
            view.ShowFinalResults();


        } else {


            $('.question-choice ').remove();
            model.stateReseter();
            model.updateQuestion();
            view.showQuestion();


        }

    });

$('.result-box button').click(function(){
  location.reload();
});

});
