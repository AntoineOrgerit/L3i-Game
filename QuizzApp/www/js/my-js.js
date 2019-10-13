/** ----- GENERAL SETTINGS -----  **/

/**
 * Allows to fix proxy redirection issues.
 */
(function () {
    var xhr = {};
    xhr.open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        console.log(url);
        if (url.indexOf('/proxy/') == 0) {
            url = window.decodeURIComponent(url.substr(7));
        }
        xhr.open.apply(this, arguments);
    };
})();

/**
 * Allows to have faster transitions with the loader rather than existing ones.
 */
$(document).on("mobileinit", function () {
    $.mobile.defaultPageTransition = "none";
    $.mobile.defaultDialogTransition = "none";
});

/**
 * Allows to close the application. A special case is defined for the browser
 * mode, where it is impossible in modern browser to close a tab if it has not
 * been opened programmatically.
 */
function closeApp() {
    if (navigator.app) {
        navigator.app.exitApp();
    } else if (navigator.device) {
        navigator.device.exitApp();
    } else {
        // can't exit application in browser
        $.mobile.back();
    }
}


/** ----- LOADER SETTINGS ----- * */

/**
 * Displays the loader until the resources are loaded, or exit the application
 * if no connection to the server.
 */
$(window).load(function () {
    $.ajax({
        url: appConfig['Server-URL'] + "db.php",
        type: "HEAD",
        timeout: 3000,
        error: function (response) {
            navigator.notification.alert("Une erreur de connexion avec le serveur est survenue.\nCode de status : " + response.status,
                closeApp(),
                "Erreur de connexion",
                "Fermer l'application");
        }
    });
});

/**
 * Allows to display the loader on the application.
 */
function showLoader() {
    $("#content").hide();
    $("#spinner").show();
}

/**
 * Allows to hide the loader on the application.
 */
function hideLoader() {
    $("#content").show();
    $("#spinner").hide();
}


/** ----- STYLING ----- * */

/**
 * Allows to center the question information on the question view.
 */
function centerQuestion() {
    $('#question-content').css('margin-top', ($("#game-view").height() - $('#question-content').outerHeight()) / 2);
}

/**
 * Allows to center the score information on the score view.
 */
function centerScore() {
    $('#score-content').css('margin-top', ($("#score-view").height() - $('#score-content').outerHeight() - $("#score-view div[data-role='header']").outerHeight()) / 2);
}


/** ----- USER GAME INTERACTIONS ----- **/

var rightAnswerRedirectionTimeout;
var hintButtonAnimationInterval;

/**
 * Defines the HTML object as the dialog to exit categories.
 */
$("#categories-back-dialog").dialog({
    autoOpen: false,
    dialogClass: "no-close",
    modal: true,
    buttons: {
        "Oui": function (event) {
            event.preventDefault();
            $("#categories-back-dialog").dialog("close");
            $.mobile.changePage('#menu-view');
        },
        "Non": function (event) {
            event.preventDefault();
            $("#categories-back-dialog").dialog("close");
        }
    }
});

/**
 * Handles the back button action on the categories view.
 */
$("#back-menu-from-categories-btn-header").click(function (event) {
    event.preventDefault();
    $("#categories-back-dialog").dialog("open");
});

/**
 * Defines the HTML object as the dialog to exit a question.
 */
$("#game-back-dialog").dialog({
    autoOpen: false,
    dialogClass: "no-close",
    modal: true,
    buttons: {
        "Oui": function (event) {
            event.preventDefault();
            $("#game-back-dialog").dialog("close");
            $.mobile.changePage('#categories-view');
        },
        "Non": function (event) {
            event.preventDefault();
            $("#game-back-dialog").dialog("close");
        }
    }
});

/**
 * Defines the HTML object as the right answer dialog.
 */
$("#info-scan-dialog").dialog({
    autoOpen: false,
    dialogClass: "no-close",
    width: $(window).width() * 0.8,
    modal: true,
    buttons: {
        "Fermer": function (event) {
            event.preventDefault();
            $("#info-scan-dialog").dialog("close");
        }
    }
});

/**
 * Defines the HTML object as the hints dialog.
 */
$("#hints-dialog").dialog({
    autoOpen: false,
    dialogClass: "no-close",
    width: $(window).width() * 0.8,
    modal: true,
    buttons: {
        "Fermer": function (event) {
            event.preventDefault();
            $("#hints-dialog").dialog("close");
        }
    }
});

/**
 * Defines the HTML object as the right answer dialog.
 */
$("#right-answer-dialog").dialog({
    autoOpen: false,
    dialogClass: "no-close",
    modal: true,
    buttons: {
        "Question suivante": function (event) {
            event.preventDefault();
            clearTimeout(rightAnswerRedirectionTimeout);
            $("#right-answer-dialog").dialog("close");
            $.mobile.changePage('#categories-view');
        }
    }
});

/**
 * Handles the back button action on the game view.
 */
$("#back-categories-btn-header").click(function (event) {
    event.preventDefault();
    $("#game-back-dialog").dialog("open");
});

/**
 * Handles the skip button action on the game view.
 */
$("#skip-button").click(function (event) {
    event.preventDefault();
    $("#game-back-dialog").dialog("open");
});

/**
 * Defines the HTML object as the dialog for score logging issue.
 */
$("#score-log-error-dialog").dialog({
    autoOpen: false,
    dialogClass: "no-close",
    modal: true,
    buttons: {
        "OK": function (event) {
            event.preventDefault();
            $("#score-log-error-dialog").dialog("close");
        }
    }
});

/**
 * Handles the back button action on the score view.
 */
$("#back-menu-from-score-btn-header").click(function (event) {
    event.preventDefault();
    $.mobile.changePage('#menu-view');
});

/**
 * Handles the back button action on the leaderboard view.
 */
$("#back-menu-from-leaderboard-btn-header").click(function (event) {
    event.preventDefault();
    $.mobile.changePage('#menu-view');
});

/**
 * Handles the back button action on the help view.
 */
$("#back-menu-from-help-btn-header").click(function (event) {
    event.preventDefault();
    $.mobile.changePage('#menu-view');
});

/**
 * Handles the back button action on the about view.
 */
$("#back-menu-from-about-btn-header").click(function (event) {
    event.preventDefault();
    $.mobile.changePage('#menu-view');
});

/**
 * Allows to close all dialogs objects.
 */
function closeAllDialogs() {
    $("#categories-back-dialog").dialog("close");
    $("#game-back-dialog").dialog("close");
    $("hints-dialog").dialog("close");
    $("info-scan-dialog").dialog("close");
    $("#right-answer-dialog").dialog("close");
    $("#score-log-error-dialog").dialog("close");
}

/**
 * Handles the exit button on the menu view.
 */
$("#exit-button").click(function (event) {
    event.preventDefault();
    closeApp();
});

/**
 * Handles informations scan for questions action.
 */
$('#scan-info-button').unbind().click(scanInfo);

/**
 * Handles hints display for questions action.
 */
$("#hints-button").unbind().click(function () {
    $("#hints-dialog").dialog("open");
    clearInterval(hintButtonAnimationInterval);
});


/** ----- ANDROID BACK BUTTON OVERRIDE ----- * */

/**
 * Overrides the Android system back button action.
 */
document.addEventListener("backbutton", function (event) {
    event.preventDefault();
    switch ($.mobile.activePage.attr("id")) {
        case "menu-view":
            closeApp();
            break;
        case "game-view":
            $("#game-back-dialog").dialog("open");
            break;
        case "categories-view":
            $("#categories-back-dialog").dialog("open");
            break;
        default:
    }
}, false);


/** ----- GENERAL ROUTING ACTIONS FOR THE GAME ----- * */

//var initTime = 0.3 * 60;
var initTime = 1 * 60;
var gameSession = null;

/**
 * Allows to route the different page loading to specific actions.
 */
$(document).on("pagebeforechange", function (e, data) {
    showLoader();
    // switching on destination page ID to do specific actions
    switch (data.toPage[0].id) {
        case "menu-view":
            if (gameSession !== null) {
                // destroying game session if finished, or pausing it if saved
                // in memory
                if (gameSession.hasEnded()) {
                    gameSession = null;
                } else {
                    gameSession.pause();
                }
            }
            loadMenuView();
            break;
        case "categories-view":
            // creating game session if it does not exist
            if (gameSession == null) {
                gameSession = new GameSession(new Timer("decrement", initTime, "#timer", function () {
                    closeAllDialogs();
                    const finalScore = gameSession.getScore() < 0 ? 0 : gameSession.getScore();
                    //console.log("final score " + finalScore);
                    logScoreInDatabase(finalScore);
                    $.mobile.changePage('#score-view');
                }), new Timer("increment", 0), 1);
            }
            // if it was previously paused or just created, resume it
            if (!gameSession.isRunning()) {
                gameSession.resume();
            }
            // if a question has been aborted by a "back" action, abort it in
            // the game session, or reset the question timer
            if (gameSession.isQuestionRunning()) {
                gameSession.abortQuestion();
            } else {
                gameSession.resetQuestion();
            }
            loadCategoriesView();
            break;
        case "game-view":
            // launch timer for question in the game session
            gameSession.startQuestion();
            // launch check if one scan in 5 min
            gameSession.checkCompetitionLow();
            loadQuestionView(data);
            break;
        case "score-view":
            loadScoreView();
            break;
        case "leaderboard-view":
            loadLeaderboardView();
            break;
        case "help-view":
            hideLoader();
            break;
        case "about-view":
            hideLoader();
            break;
        default:
    }
});


/**
 * Allows to log a score value to the online database.
 */
function logScoreInDatabase(score) {
    var url = appConfig['Server-URL'] + "addScore.php";
    var data = {
        score: score
    };
    $.post(url, JSON.stringify(data), function (result) {
        // if we have a result, an error occured
    });
}


/** ----- PAGE CONTENT LOADING ----- * */

/**
 * Loads the menu view and adapt the main action button.
 */
function loadMenuView() {
    if (gameSession == null) {
        $("#start-button").text("Commencer");
    } else {
        $("#start-button").text("Continuer");
    }
    hideLoader();
}

/**
 * Loads the categories view by retrieving the categories from the server.
 */
function loadCategoriesView() {
    var url = appConfig['Server-URL'] + "getCategories.php";
    var data = {
        level_id: gameSession.getNextQuestionLevel(),
        answered: gameSession.getAnsweredQuestions()
    };
    $.post(url, JSON.stringify(data), function (result) {
        $("#categories-list").empty();
        $.each(result.categories, function (i, field) {
            $("#categories-list").append("<a class='ui-btn ui-shadow ui-corner-all' data-role='button' data-transition='none' data-category-id='" + field.id + "'>" + field.theme + "</a>");
        });
        // if not question available for a category, blocking it
        $.each(result.blocked, function (i, id) {
            $("#categories-list a[data-category-id='" + id + "']").addClass("ui-state-disabled");
        });
        // overriding click action of the categories to send information about
        // it
        $('#categories-list a').on('click', function (event) {
            event.preventDefault();
            $.mobile.changePage('#game-view', {
                category_id: $(this).data("category-id"),
                category_title: $(this).text(),
                transition: "none"
            });
        });
        hideLoader();
    }, "json").error(function (err) {
        // handling server error
        navigator.notification.alert("Une erreur est survenue lors de l'obtention des catégories de jeu.\nCode de status : " + err.status,
            closeApp(),
            "Erreur technique",
            "Fermer l'application");
    });
}

/**
 * Allows to display the hint.
 * @param shouldGiveHint boolean
 */
function displayHint(shouldGiveHint) {
    if (shouldGiveHint) {
        var hint = gameSession.getNextHint();
        if (hint !== undefined) {
            $("#hints-dialog").append("<p class='dialogs-infos'>" + hint.content + "</p>");
            if ($("#hints-button").hasClass("ui-state-disabled")) {
                $("#hints-button").removeClass("ui-state-disabled");
            }
            hintButtonAnimationInterval = setInterval(function () {
                $("#hints-button").animate({
                    "color": "white",
                    "background-color": "#49789F"
                }, 500, function () {
                    $("#hints-button").animate({"color": "#49789F", "background-color": "white"}, 500);
                });
            }, 3000);
        }
    }
}

/**
 * Loads the question view by retrieving the information about it from the
 * server.
 */
function loadQuestionView(loadViewData) {
    var category_id = loadViewData.options.category_id;
    var url = appConfig['Server-URL'] + "getQuestion.php";
    var data = {
        category_id: category_id,
        level_id: gameSession.getNextQuestionLevel(),
        answered: gameSession.getAnsweredQuestions()
    };
    $.post(url, JSON.stringify(data), function (result) {
        gameSession.logQuestion(result);
        $("#category-title").text(loadViewData.options.category_title);
        $("#question").text(result.question);
        // override previous response proposition button action with specific

        // check if it's possible to unclock an hint each second
        setInterval(function () {
            displayHint(gameSession.hintCompetitionLow())
        }, 1000);

        // question data
        $('#scan-res-button').unbind().click(function () {
            var promise = scanAnswer(result.answers);
            promise.then(function (value) {
                var shouldGiveHint = gameSession.logOutcome(value, function () {
                    $("#right-answer-dialog").dialog("open");
                    rightAnswerRedirectionTimeout = setTimeout(function () {
                        $("#right-answer-dialog").dialog("close");
                        $.mobile.changePage('#categories-view');
                    }, 2000);
                });
                displayHint(shouldGiveHint);
            });
        });
        hideLoader();
        centerQuestion();
    }, "json").error(function (err) {
        // handling server error
        navigator.notification.alert("Une erreur est survenue lors de l'obtention d'une question de jeu.\nCode de status : " + err.status,
            closeApp(),
            "Erreur technique",
            "Fermer l'application");
    });
}

/**
 * Loads the score view.
 */
function loadScoreView() {
    const finalScore = gameSession.getScore() < 0 ? 0 : gameSession.getScore();
    $("#score-container").text(finalScore);
    hideLoader();
    centerScore();
}

/**
 * Loads the leaderboard view by retrieving the top 10 scores from the server.
 */
function loadLeaderboardView() {
    var url = appConfig['Server-URL'] + "getLeaderboard.php";
    $.get(url, function (result) {
        result.leaderboard.forEach(function (item, index) {
            $("#leaderboard-scores").append("<tr><td>" + (index + 1) + "</td><td>" + item + "</td></tr>");
        });
        hideLoader();
    }).error(function (err) {
        $("#score-log-error-dialog").dialog("open");
    });
}


/** ----- SCAN INTERACTIONS ----- * */

/**
 * Allows to handle scan information action.
 */
function scanInfo() {
    cordova.plugins.barcodeScanner.scan(function (result) {
            $("#info-scan-content").text(result.text);
            $("#info-scan-dialog").dialog("open");
        }, function (error) {
            $("#info-scan-content").text(error);
            $("#info-scan-dialog").dialog("open");
        }
    )
}

/**
 * Answer QRCODE scanning.
 */
function scanAnswer(answers) {
    return new Promise((resolve, reject) => {
        cordova.plugins.barcodeScanner.scan(function (result) {
                if (isAnAnswer(result.text, answers)) {
                    resolve(gameSession.RIGHT_ANSWER);
                } else {
                    $("#wrong-answer").show();
                    centerQuestion();
                    resolve(gameSession.WRONG_ANSWER);
                    // small timeout to prevent UI issue
                    setTimeout(function () {
                        $("#question-content").effect("shake");
                    }, 200);
                    setTimeout(function () {
                        $("#wrong-answer").fadeOut(1000, centerQuestion);
                    }, 3000);
                }
            }, function (error) {
                $("#info-scan-content").text(error);
                $("#info-scan-dialog").dialog("open");
                reject(3);
            }
        );
    });
}

/**
 * Allows to verify if the given answer is one of the right answers.
 */
function isAnAnswer(proposition, answers) {
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].intitule == proposition) {
            return true;
        }
    }
    return false;
}
