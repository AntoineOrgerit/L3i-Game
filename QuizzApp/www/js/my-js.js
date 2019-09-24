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


/** ----- LOADER SETTINGS -----  **/

/**
 * Display loader until the ressources are loaded
 */
$(window).load(hideLoader);

/**
 * Shows the loader.
 */
function showLoader() {
    document.getElementById("content").style.display = "none";
    if (document.getElementById("spinner") != null) document.getElementById("spinner").style.display = "block";
}

/**
 * Hides the loader.
 */
function hideLoader() {
    document.getElementById("content").style.display = "block";
    if (document.getElementById("spinner") != null) document.getElementById("spinner").style.display = "none";
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
    $.getJSON(url, function (result) {
        $("#categories-list").empty();
        $.each(result, function (i, field) {
            $("#categories-list").append("<a class='ui-btn ui-shadow ui-corner-all' data-role='button' data-transition='none' data-category-id='" + field.id + "'>" + field.theme + "</a>");
        });
        $('#categories-list a').on('click', function (event) {
            event.preventDefault();
            showLoader();
            $.mobile.changePage('#game-view', {category_id: $(this).data("category-id"), transition: "none"});
        });
        hideLoader();
    }).error(function () {
        hideLoader();
        alert("Erreur lors de l'obtention des catégories de jeu.");
    });
}



/**
 * Question loading.
 */
function loadQuestionView(data) {
    var category_id = data.options.category_id;
    var niveau_id = 1;
    var url = appConfig['Server-URL'] + "getQuestion.php";
    $.post(url, {
            category_id: category_id,
            //niveau_id: niveau_id
        }, function (result) {
            var question_data = JSON.parse(result);
            console.log(question_data);
            var lineMem = null;

            if (answered.length !== 0) {
                answered.forEach((item, index) => {
                    if (item.categorie === category_id && item.niveau === niveau_id) {
                        item.id.push(question_data.id);
                        flag = true;
                    }
                });
            }

            if (!flag) {
                lineMem = {
                    categorie: category_id,
                    niveau: niveau_id,
                    id: [question_data.id],
                };
                answered.push(lineMem);
            }
            flag = false;
            console.log(answered);

            $("#question").text(question_data.intitule);
            $('#scan-info-button').unbind().click(function () {
                scanInfo();
            });
            $('#scan-res-button').unbind().click(function () {
                var promise = scanAnswer(question_data.answers);
                promise.then(function (value) {
                    var lineTrace = {
                        id: null,
                        categorie: null,
                        niveau: null,
                        state: null
                    };
                    //console.log(value);
                    lineTrace.id = question_data.id;
                    lineTrace.categorie = category_id;
                    lineTrace.niveau = niveau_id;
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
        }
    ).error(function (err) {
        hideLoader();
        alert("Erreur lors de l'obtention de la question.");
    });
    hideLoader();
}

/**
 * Progression
 * @param trace
 */
function findNextLevel(trace) {
    var nbStateZero = 0;
    var nbStateOne = 0;
    var nbAbandon = 0;
    var idQuestion = trace[trace.length - 1].id;
    var niveauQuestion = trace[trace.length - 1].niveau;
    for (var i = trace.length - 1; i >= 0; --i) {
        /*  console.log(trace[i].id);
          console.log(trace[i].categorie);
          console.log(trace[i].niveau);
          console.log(trace[i].state);*/
        if (idQuestion === trace[i].id) {
            if (trace[i].state === 0) nbStateZero++;
            if (trace[i].state === 1) nbStateOne++;
            if (trace[i].state === 2) nbAbandon++;
        }
        console.log("nombre succes " + nbStateOne);
        console.log("nombre echec " + nbStateZero);
        console.log("nombre abandon " + nbAbandon);
    }
    // if(nbStateZero%2===0) //to do donner indice
    if ((nbStateZero > 4 || nbAbandon === 1) && niveauQuestion > 1) {
        // level down
        --niveauQuestion;
    }
    if ((nbStateZero < 2 && nbStateOne === 1) && niveauQuestion < 3) {
        // level up
        ++niveauQuestion;
    }
    nextLevel = niveauQuestion;
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
                    alert("Mauvaise réponse");
                    resolve(0);
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
