$('#game-view').on('pageinit', function () {

    rejoindre();

    $('#scan-res-button').click(function () {
        scan();
    })

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

    // Fonction lancée au début du jeu : connexion à une partie
    // Chargement de la question et affichage
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