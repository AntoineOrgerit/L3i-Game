function GameSession(globalTimer, questionTimer, initLevel) {
	
	/** ----- SESSION STATE INFORMATION ----- * */
	var questionRunning = false;
	var sessionRunning = false;
	
	/** ----- ADAPTATIVITY AND EVOLUTION ----- * */
	var trace = [];
	var answered = [];
	var nextLevel = initLevel;
	
	/** ----- SCORE INFORMATION ----- * */
	var score = 0;
	var currentQuestionScoringSystem = null;
	
	/** ----- HINTS INFORMATION ----- * */
	var currentHintSystem = null;
	
	/** ----- STATIC VARIABLES ----- * */
	this.WRONG_ANSWER = 0;
	this.RIGHT_ANSWER = 1;
	this.ABORT_QUESTION = 2;

	
	
	
	
	/** ----- SESSION TIMER ----- * */
	
	/**
	 * Allows to check if the session has ended.
	 */
	this.hasEnded = function () {
		return globalTimer.hasEnded();
	}
	
	/**
	 * Allows to retrieve the current session time in seconds.
	 */
	this.getSessionTime = function () {
		return globalTimer.getCurrentTime();
	}
	
	/**
	 * Allows to pause the game session.
	 */
	this.pause = function () {
		globalTimer.pause();
		sessionRunning = false;
	}
	
	/**
	 * Allows to resume the game session.
	 */
	this.resume = function () {
		sessionRunning = true;
		globalTimer.resume();
	}
	
	/**
	 * Allows to check if the session is running (paused or active).
	 */
	this.isRunning = function() {
		return sessionRunning;
	}
	
	
	
	
	
	/** ----- QUESTION ACTIVITY ----- * */
	
	/**
	 * Allows to start a question activity.
	 */
	this.startQuestion = function () {
		questionRunning = true;
		questionTimer.resume();
	}
	
	/**
	 * Allows to check if the game session is actively in a question activity.
	 */
	this.isQuestionRunning = function () {
		return questionRunning;
	}
	
	/**
	 * Allows to abort a question activity.
	 */
	this.abortQuestion = function () {
		questionTimer.pause();
		questionRunning = false;
		this.logOutcome(this.ABORT_QUESTION);
		var time = questionTimer.getCurrentTime();
		questionTimer.reset();
		return time;
	}
	
	/**
	 * Allows to reset a question activity to its initial state.
	 */
	this.resetQuestion = function() {
		var time = questionTimer.getCurrentTime();
		questionTimer.reset();
		return time;
	}
	
	
	
	
	/** ----- QUESTIONS TRACE IN TIME ----- * */
	
	/**
	 * Allows to get the ids of answered questions.
	 */
	this.getAnsweredQuestions = function() {
		return answered;
	}
	
	/**
	 * Allows to get the level of the next question.
	 */
	this.getNextQuestionLevel = function() {
		return nextLevel;
	}
	
	/**
	 * Allows to retrieve the score of the use in the game session.
	 */
	this.getScore = function() {
		return score;
	}
	
	/**
	 * Allows to log a question in the game session trace for adaptivity and
	 * evolution.
	 */
	this.logQuestion = function(question) {
		var flag = false;
		if (answered.length !== 0) {
            answered.forEach((item, index) => {
                if (item.category === question.category_id && item.level === nextLevel) {
                    item.id.push(question.id);
                    flag = true;
                }
            });
        }
		if (!flag) {
			answered.push( {
				category: question.category_id,
                level: nextLevel,
                id: [question.id]
			});
        }
		currentQuestionScoringSystem = question.scoring_system;
		currentQuestionScoringSystem.id = question.id;
		currentQuestionScoringSystem.number_wrong_answers = 0;
		currentHintSystem = question.hints;
	}
	
	/**
	 * Allows to log the outcome of a question, i.e. a right or wrong answer, or
	 * an abortion action.
	 */
	this.logOutcome = function(state, onRightAnswer) {
		if(currentQuestionScoringSystem != null) {
			if(state === this.RIGHT_ANSWER) {
				questionTimer.pause();
				questionRunning = false;
			} else if (state === this.WRONG_ANSWER) {
				currentQuestionScoringSystem.number_wrong_answers++;
			}
			trace.push({
				id: currentQuestionScoringSystem.id,
				category: currentQuestionScoringSystem.category_id,
				level: nextLevel,
				state: state
			});
			var shouldGiveHint = findNextLevel();
			if(state === this.RIGHT_ANSWER) {
				currentHintSystem = null;
				updateScore();
			} else if (state === this.ABORT_QUESTION) {
				currentQuestionScoringSystem = null;
				currentHintSystem = null;
			}
			if(state === this.RIGHT_ANSWER && onRightAnswer !== undefined) {
				onRightAnswer();
			}
			return shouldGiveHint;
		}
	}
	
	/**
	 * Allows to retrieve the next to offer.
	 */
	this.getNextHint = function () {
		return currentHintSystem.shift();
	}
	
	/**
	 * Allows to update the score in the game session.
	 */
	function updateScore() {
		var questionScore = currentQuestionScoringSystem.points;
		// applying multiplier
		if(questionTimer.getCurrentTime() < currentQuestionScoringSystem.lower_time_bound) {
			questionScore = questionScore * currentQuestionScoringSystem.lower_bound_multiplier;
		} else if (questionTimer.getCurrentTime() > currentQuestionScoringSystem.higher_time_bound) {
			questionScore = questionScore * currentQuestionScoringSystem.higher_bound_multiplier;
		}
		// applying penalty
		questionScore = questionScore - (currentQuestionScoringSystem.number_wrong_answers * currentQuestionScoringSystem.wrong_answer_penalty);
		if(questionScore > 0) {
			score += Math.floor(questionScore);
		}
		currentQuestionScoringSystem = null;
	}
	
	/**
	 * Allows to determine the level of the next question depending on the
	 * previous questions outcomes.
	 */
	function findNextLevel() {
		var nbStateZero = 0;
	    var nbStateOne = 0;
	    var nbStateTwo = 0;
	    var idQuestion = trace[trace.length - 1].id;
	    var levelQuestion = trace[trace.length - 1].level;
	    for (var i = trace.length - 1; i >= 0; --i) {
	        if (idQuestion === trace[i].id) {
	            if (trace[i].state === 0) nbStateZero++;
	            if (trace[i].state === 1) nbStateOne++;
	            if (trace[i].state === 2) nbStateTwo++;
	        }
	        console.log("nombre succes " + nbStateOne);
	        console.log("nombre echec " + nbStateZero);
	        console.log("nombre abandon " + nbStateTwo);
	    }
	    if ((nbStateZero > 4 || nbStateTwo === 1) && levelQuestion > 1) {
	        // level down
	        --levelQuestion;
	    }
	    if ((nbStateZero < 2 && nbStateOne === 1) && levelQuestion < 3) {
	        // level up
	        ++levelQuestion;
	    }
	    nextLevel = levelQuestion;
	    console.log("niveau suivant : " + nextLevel);
	    // if(nbStateZero%2===0) //to do donner indice
	    return (nbStateZero%2===0);
	}
	
}