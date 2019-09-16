
/** ----- GENERAL SETTINGS -----  **/

/* Fixing proxy issues */
(function() {
    var xhr = {};
    xhr.open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(method, url) {
        console.log(url);
        if(url.indexOf('/proxy/') == 0){
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
 * Categories loading.
 */
$(document).delegate("#categories-view", "pagebeforecreate", function() {
	showLoader();
	var url = "http://192.168.137.1:8000/getCategories.php";
	console.log(url);
	$.ajax({
		dataType: "json",
		url: url,
		success: function(result) {
			console.log(result);
			$.each(result, function(i, field) {
				$("#categories-list").append("<a href='#game-view' class='ui-btn ui-shadow ui-corner-all' data-role='button' data-transition='none'>" + field.theme + "</a>");
			});
			hideLoader();
		},
		error: function() {
			hideLoader();
			alert("Erreur lors de l'obtention des catégories de jeu.");
		}
	})
	/*$.getJSON(url, function(result) {
		console.log(result);
		$.each(result, function(i, field) {
			$("#categories-list").append("<a href='#game-view' class='ui-btn ui-shadow ui-corner-all' data-role='button' data-transition='none'>" + field.theme + "</a>");
		});
		hideLoader();
	}).error(function() {
		hideLoader();
		alert("Erreur lors de l'obtention des catégories de jeu.");
	});*/
});





/**
 * Game init
 */
$('#game-view').on('pageinit', function () {
    rejoindre();

    /**
     * EventListener Click on scan button to call for QRCode scanner
     */
    $('#scan-res-button').click(function () {
        scan();
    })

    /**
     * Function for QRCode scanning
     */
    function scan() {
        console.log("clicked");
        cordova.plugins.barcodeScanner.scan(function (result) {
                var url = "questions/reponse.txt";
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 || xmlhttp.readyState == "complete") {

                        if (xmlhttp.responseText == result.text) {
                            reponse.appendChild(document.createTextNode(result.text));
                            alert("Bonne reponse");
                        } else
                            alert("Mauvaise reponse");
                    }
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send(null);
            }, function (error) {
                //error callback
                alert(JSON.stringify(error));
            }
        );
    }

    /**
     * Function started at the beginning of the game : connection to a play
     * Load question and display it
     */
    function rejoindre() {
        if (arguments.callee.done) return;
        arguments.callee.done = true;

        var question = document.getElementById("question");
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }

        var url = "questions/question.txt";
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 || xmlhttp.readyState == "complete") {
                question.appendChild(document.createTextNode(xmlhttp.responseText));
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    }
});