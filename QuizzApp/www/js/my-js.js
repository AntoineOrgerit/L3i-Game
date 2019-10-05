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


/** ----- STYLING ----- **/

function centerQuestion() {
	$('#question-content').css('margin-top',($(window).height() - $('[data-role=header]').height() - $('[data-role=footer]').height() - $('#question-content').outerHeight() - 100)/2);
}


/** ----- USER GAME INTERACTIONS ----- **/

$("#categories-back-dialog").dialog({
	autoOpen: false,
	dialogClass: "no-close",
	modal: true,
	buttons: {
		"Oui": function(event) {
			event.preventDefault();
			$("#categories-back-dialog").dialog("close");
			$.mobile.changePage('#menu-view');
		},
		"Non": function(event) {
			event.preventDefault();
			$("#categories-back-dialog").dialog("close");
		}
	}
});

$("#back-menu-btn-header").click(function(event) {
	event.preventDefault();
	$("#categories-back-dialog").dialog("open");
});

$("#game-back-dialog").dialog({
	autoOpen: false,
	dialogClass: "no-close",
	modal: true,
	buttons: {
		"Oui": function(event) {
			event.preventDefault();
			$("#game-back-dialog").dialog("close");
			$.mobile.changePage('#categories-view');
		},
		"Non": function(event) {
			event.preventDefault();
			$("#game-back-dialog").dialog("close");
		}
	}
});

$("#back-categories-btn-header").click(function(event) {
	event.preventDefault();
	$("#game-back-dialog").dialog("open");
});


/** ----- ANDROID BACK BUTTON OVERRIDE ----- **/
document.addEventListener("backbutton", function(event) {
	event.preventDefault();
	switch($.mobile.activePage.attr("id")) {
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


/** ----- PAGE CONTENT LOADING FROM SERVER ----- **/
var trace = [];
var answered = [];
var nextLevel = 1;
var flag = false;
var timer;
var timerLocal;
let initTime = 0.3 * 60;

/* --------------------------------------------------TIMER------------------------------------------------ */
function startTimer(type, seconds, container, oncomplete) {
    var startTime, timer, obj, ms = seconds * 1000,
        display = document.getElementById(container);
    var now;
    obj = {};
    obj.resume = function () {
        startTime = new Date().getTime();
        timer = setInterval(obj.step, 250); // adjust this number to affect granularity
        // lower numbers are more accurate, but more CPU-expensive
    };
    obj.pause = function () {
        ms = obj.step();
        clearInterval(timer);
    };
    obj.reset = function () {
        ms = seconds * 1000;
    };
    obj.step = function () {
        if (type === "increment") {
            now = Math.max(0, ms + (new Date().getTime() - startTime));
            var m = Math.floor(now / 60000), s = Math.floor(now / 1000) % 60;
            console.log("timer local :" + now);
        } else if (type === "decrement") {
            now = Math.max(0, ms - (new Date().getTime() - startTime));
            var m = Math.floor(now / 60000), s = Math.floor(now / 1000) % 60;
            console.log("timer :" + now);

        }
        s = (s < 10 ? "0" : "") + s;
        display.innerHTML = m + ":" + s;
        if (now === 0) {
            clearInterval(timer);
            obj.resume = function () {
            };
            if (oncomplete) oncomplete();
        }
        return now;
    };
    obj.resume();
    obj.result = function () {
        if (type === "decrement") {
            if (now === 0) {
                return initTime;
            } else {
                return (initTime - now / 1000);
            }
        } else if (type === "increment") {
            return (now / 1000);
        }
    };
    return obj;
}

/* --------------------------------------------------END TIMER------------------------------------------------ */

/**
 * View specific treatment redirection.
 */
$(document).on("pagebeforechange", function (e, data) {
    switch (data.toPage[0].id) {
        case "menu-view":
            // si le timer est initialisé on le stop car la partie est finie
            if (timer !== undefined) {
                timer.pause();
                //console.log(timer.result());
                // stockage en session - test
                sessionStorage.setItem('globalTime', timer.result());
                var data = sessionStorage.getItem('globalTime');
                console.log("temps global " + data);
                timer.reset();
            }
            break;
        case "categories-view":
            if (timerLocal !== undefined) {
                timerLocal.pause();
                // stockage en session du temps local
                sessionStorage.setItem('localTime', timerLocal.result());
                var data = sessionStorage.getItem('localTime');
                console.log("temps local " + data);
                //mise a jour du score apres calcul
                // to do
                // remise a zero du timer local
                timerLocal.reset();
            }
            loadCategoriesView();
            // lancement du timer global qui decremente
            timer = startTimer("decrement", initTime, "timer", function () {
              /*  $.mobile.changePage('#menu-view');
                alert("Jeu terminé!");*/
            });
            break;
        case "game-view":
            loadQuestionView(data);
            // lancement du timer local qui incremente
            timerLocal = startTimer("increment", 0, "timerLocal", function () {
            });
            console.log(timerLocal);
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
            centerQuestion();
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
                	$("#wrong-answer").show();
                	centerQuestion();
                	resolve(0);
                	// small timeout to prevent UI issue
                	setTimeout(function() {
                        $("#question-content").effect("shake");
                	}, 200);
                	setTimeout(function() {
                		$("#wrong-answer").fadeOut(1000, centerQuestion);
                	}, 3000);
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
