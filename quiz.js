(function () {
  var allQuestions = [{
    question: "'This is a string' instanceof String; What is the result?",
    options: ["true", "undefined", "false", "TypeError"],
    answer: 2
  }, {
    question: "10 > 9 > 8 === true;    What is the result?",
    options: ["true", "NaN", "false", "undefined"],
    answer: 2
  }, {
    question: "NaN === NaN;     What is the result?",
    options: ["NaN", "false", "undefined", "true"],
    answer: 1
  }, {
    question: "Number('1') - 1 == 0; What is the result?",
    options: ["true", "false", "NaN", "undefined"],
    answer: 0
  }, {
    question: "(true + false) > 2 + true; What is the result?",
    options: ["NaN", "false", "true", "undefined"],
    answer: 1
  }, {
    question: "'1' - - '1'; What is the result?",
    options: ["2", "11", "0", "'11'"],
    answer: 0
  }, {
    question: "[ ] + [ ] + 'Cat'.split(''); What is the result?",
    options: ["'C, a ,t'", "['C','a','t']", "[ ][ ]['C','a','t']", "TypeError"],
    answer: 0
  }, {
    question: "new Array(5).toString(); What is the result ?",
    options: ["', , , ,'", "[ ]", "'[ ]'", "'['']'"],
    answer: 0
  }, {
    question: "String('Hello') === 'Hello'; What is the result?",
    options: ["NaN", "false", "true", "undefined"],
    answer: 2
  }, {
    question: "console.log(typeof typeof 1); What is the result?",
    options: ["number", "string", "1", "typeof"],
    answer: 1
  }];
  
 
  let questionCounter = 0;
  let selectOptions = [];
  let quizSpace = $('#quiz');
 
  nextQuestion();

  $('#next').click(function () {
    chooseOption();
    if (isNaN(selectOptions[questionCounter])) {
      alert('Ընտրեք որևէ տարբերակ !');
    }
    else {
      questionCounter++;
      nextQuestion();
      $('#prev').show();
    }
  });

  $('#prev').click(function () {

    chooseOption();
    questionCounter--;
    $('#prev').hide();
    nextQuestion();


  });

  function createElement(index) {
    let element = $('<div>', { id: 'question' });
    let header = $('<h2>Question ' + (index + 1) + ' .</h2>');
    element.append(header);

    let question = $('<h4>').append(allQuestions[index].question);
    element.append(question);

    let radio = radioButtons(index);
    element.append(radio);

    return element;
  }

  function radioButtons(index) {
    let radioItems = $('<ul col-3-md>');
    let item;
    let input = '';
    for (var i = 0; i < allQuestions[index].options.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += allQuestions[index].options[i];
      item.append(input);
      radioItems.append(item);
    }
    return radioItems;
  }

  function chooseOption() {
    selectOptions[questionCounter] = +$('input[name="answer"]:checked').val();
     
  }

  function nextQuestion() {
    quizSpace.fadeOut(function () {
      $('#question').remove();
      if (questionCounter < allQuestions.length) {
        let nextQuestion = createElement(questionCounter);
        quizSpace.append(nextQuestion).fadeIn();
        if (!(isNaN(selectOptions[questionCounter]))) {
          $('input[value=' + selectOptions[questionCounter] + ']').prop('checked', true);
          
        }
        // if (quesCounter === 1) {
        //   $('#prev').show();
        // }
        else if (questionCounter == 0) {
          $('#prev').hide();
          $('#next').show();
        }
      }
      else {
        var scoreRslt = displayResult();
        quizSpace.append(scoreRslt).fadeIn();
        $('#next').hide();
        $('#prev').hide();
      }
    });
  }

  function displayResult() {
    let score = $('<h4>', { id: 'question' });
    let correct = 0;
    for (var i = 0; i < selectOptions.length; i++) {
      if (selectOptions[i] == allQuestions[i].answer) {
        correct++;
      }
    }
    return score.append('Your score: ' + correct);

  }
})();