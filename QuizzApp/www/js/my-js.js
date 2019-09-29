/** ----- GENERAL SETTINGS -----  **/

/**
 * Fixing proxy issue
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
})(window);

/**
 * For having a faster transition
 */
$(document).on("mobileinit", function () {
    $.mobile.defaultPageTransition = "none";
    $.mobile.defaultDialogTransition = "none";
});

/**
 * Closes the app.
 */
function closeApp() {
	if (navigator.app) {
	    navigator.app.exitApp();
	} else if (navigator.device) {
	    navigator.device.exitApp();
	} else {
		// can't exit app in browser
		$.mobile.back();
	}
}




/** ----- LOADER SETTINGS -----  **/

/**
 * Display loader until the resources are loaded, or exit the app if no connection to the server.
 */
$(window).load(function() {
	$.ajax({url: appConfig['Server-URL'] + "db.php",
	    type: "HEAD",
	    timeout: 3000,
	    success: function() {
	    	hideLoader();
	    },
	    error: function(response) {
	    	navigator.notification.alert("Une erreur de connexion avec le serveur est survenue.\nCode de status : " + response.status,
	    			closeApp(),
	    			"Erreur de connexion",
	    			"Fermer l'application");
	    }
	});
});

/**
 * Shows the loader.
 */
function showLoader() {
	$("#content").hide();
	$("#spinner").show();
}

/**
 * Hides the loader.
 */
function hideLoader() {
	$("#content").show();
	$("#spinner").hide();
}




/** ----- PAGE CONTENT LOADING FROM SERVER ----- **/
var trace = [];
var answered = [];
var nextLevel = 1;
var flag = false;

/**
 * View specific treatment redirection.
 */
$(document).on("pagebeforechange", function (e, data) {
    switch (data.toPage[0].id) {
        case "categories-view":
            loadCategoriesView();
            break;
        case "game-view":
            loadQuestionView(data);
            break;
        default:
    }
});

/**
 * Categories loading.
 */
function loadCategoriesView() {
    showLoader();
    var url = appConfig['Server-URL'] + "getCategories.php";
    var data = {
        level_id: nextLevel,
        answered: answered
    };
    $.post(url, JSON.stringify(data), function (result) {
        $("#categories-list").empty();
        $.each(result.categories, function (i, field) {
            $("#categories-list").append("<a class='ui-btn ui-shadow ui-corner-all' data-role='button' data-transition='none' data-category-id='" + field.id + "'>" + field.theme + "</a>");
        });
        $.each(result.blocked, function(i, id) {
        	$("#categories-list a[data-category-id='" + id + "']").addClass("ui-state-disabled");
        });
        $('#categories-list a').on('click', function (event) {
            event.preventDefault();
            showLoader();
            $.mobile.changePage('#game-view', {category_id: $(this).data("category-id"), transition: "none"});
        });
        hideLoader();
    }, "json").error(function (err) {
    	navigator.notification.alert("Une erreur est survenue lors de l'obtention des catégories de jeu.\nCode de status : " + err.status,
    			closeApp(),
    			"Erreur technique",
    			"Fermer l'application");
    });
}


/**
 * Question loading.
 */
function loadQuestionView(data) {
    var category_id = data.options.category_id;
    var url = appConfig['Server-URL'] + "getQuestion.php";
    var data = {
        category_id: category_id,
        level_id: nextLevel,
        answered: answered
    };
    $.post(url, JSON.stringify(data), function (result) {
            var lineMem = null;

            if (answered.length !== 0) {
                answered.forEach((item, index) => {
                    if (item.category === category_id && item.level === nextLevel) {
                        item.id.push(result.id);
                        flag = true;
                    }
                });
            }

            if (!flag) {
                lineMem = {
                    category: category_id,
                    level: nextLevel,
                    id: [result.id],
                };
                answered.push(lineMem);
            }
            flag = false;
            console.log(answered);

            $("#question").text(result.question);
            $('#question-content').css('margin-top',($(window).height() - $('[data-role=header]').height() - $('[data-role=footer]').height() - $('#question-content').outerHeight() - 100)/2);
            $('#scan-info-button').unbind().click(function () {
                scanInfo();
            });
            $('#scan-res-button').unbind().click(function () {
                var promise = scanAnswer(result.answers);
                promise.then(function (value) {
                    var lineTrace = {
                        id: null,
                        categorie: null,
                        niveau: null,
                        state: null
                    };
                    //console.log(value);
                    lineTrace.id = result.id;
                    lineTrace.category = category_id;
                    lineTrace.level = nextLevel;
                    lineTrace.state = value;
                    //console.log(lineTrace);
                    trace.push(lineTrace);
                    // console.log(trace);
                    //console.log(trace);
                    if (trace.length !== 0) {
                        findNextLevel(trace);
                        console.log("prochain niveau " + nextLevel);
                    }
                    // redirection si state diff de 0
                    console.log(trace[trace.length - 1].state);
                    if (trace[trace.length - 1].state !== 0) {
                        $.mobile.changePage('#categories-view');
                    }
                });
            });
            hideLoader();
    }, "json").error(function (err) {
    	navigator.notification.alert("Une erreur est survenue lors de l'obtention d'une question de jeu.\nCode de status : " + err.status,
    			closeApp(),
    			"Erreur technique",
    			"Fermer l'application");
    });
    hideLoader();
}

/**
 * Progression
 */
function findNextLevel(trace) {
    var nbStateZero = 0;
    var nbStateOne = 0;
    var nbStateTwo = 0;
    var idQuestion = trace[trace.length - 1].id;
    var levelQuestion = trace[trace.length - 1].level;
    for (var i = trace.length - 1; i >= 0; --i) {
        /*  console.log(trace[i].id);
          console.log(trace[i].category);
          console.log(trace[i].level);
          console.log(trace[i].state);*/
        if (idQuestion === trace[i].id) {
            if (trace[i].state === 0) nbStateZero++;
            if (trace[i].state === 1) nbStateOne++;
            if (trace[i].state === 2) nbStateTwo++;
        }
        console.log("nombre succes " + nbStateOne);
        console.log("nombre echec " + nbStateZero);
        console.log("nombre abandon " + nbStateTwo);
    }
    // if(nbStateZero%2===0) //to do donner indice
    if ((nbStateZero > 4 || nbStateTwo === 1) && levelQuestion > 1) {
        // level down
        --levelQuestion;
    }
    if ((nbStateZero < 2 && nbStateOne === 1) && levelQuestion < 3) {
        // level up
        ++levelQuestion;
    }
    nextLevel = levelQuestion;
}




/** ----- SCAN INTERACTIONS ----- **/

function scanInfo() {
    cordova.plugins.barcodeScanner.scan(function (result) {
            alert(result.text);
        }, function (error) {
            alert(JSON.stringify(error));
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
                    alert("Bonne réponse");
                    resolve(1);
                } else {
                	resolve(0);
                	// small timeout to prevent UI issue
                	setTimeout(function() {
                        $("#question-content").effect("shake");
                	}, 200);
                }
                reject(3);
            }, function (error) {
                alert(JSON.stringify(error));
            }
        );
    });
}

/**
 * Proposition verifying.
 */
function isAnAnswer(proposition, answers) {
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].intitule == proposition) {
            return true;
        }
    }
    return false;
}
