/**
 * For having a faster transition
 */
$(document).on("mobileinit", function () {
    $.mobile.defaultPageTransition = "none";
    $.mobile.defaultDialogTransition = "none";
});

/**
 * Display loader until the ressources are loaded
 */
$(window).load(function () {
    document.getElementById("content").style.display = "block";
    document.getElementById("spinner").style.display = "none";
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