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
    var url = appConfig['Server-URL'] + "getQuestion.php";
    $.post(url, {
        category_id: category_id
    }, function (result) {
        var question_data = JSON.parse(result);
        $("#question").text(question_data.intitule);
		$('#scan-info-button').unbind().click(function () {
			scanInfo();
		});
        $('#scan-res-button').unbind().click(function () {
            scanAnswer(question_data.answers);
        });
        hideLoader();
    }).error(function (err) {
        hideLoader();
        alert("Erreur lors de l'obtention de la question.");
    });
    hideLoader();
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
    cordova.plugins.barcodeScanner.scan(function (result) {
        if (isAnAnswer(result.text, answers)) {
            alert("Bonne réponse !");
        } else {
            alert("Mauvaise réponse...");
        }
    }, function (error) {
        alert(JSON.stringify(error));
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
