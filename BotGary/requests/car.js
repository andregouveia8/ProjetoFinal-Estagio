module.exports = {
    
    if (input[0] === “!”){
//CODIGO A EXECUTAR CASO O PRIMEIRO CARACTER = “!”
}


    //Mostra todos os carros do Stand (vendidos e por vender)
    getAllCars: function (urlCars, session) {
        json = true;
        getInfo.requests.postRequest(urlCars, json, function (dataCardsCars) {
            if (dataCardsCars.length != 0) {
                if (dataCardsCars.length != 0) {
                    var cards = [];
                    for (var x = 0; x < dataCardsCars.length; x++) {
                        var carName = dataCardsCars[x].marca + " " + dataCardsCars[x].modelo + " " + dataCardsCars[x].cilindrada;
                        var carUrl = dataCardsCars[x].img;
                        var carNumberplate = dataCardsCars[x].matricula;
                        var carCategory = dataCardsCars[x].categoria;
                        var carExtras = dataCardsCars[x].extras;

                        var tempCard = new builder.HeroCard(session)
                            .title(carName)
                            .subtitle(carNumberplate)
                            .text(carCategory + "\n\n" + carExtras)
                            .images([
                                builder.CardImage.create(session, carUrl)
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "!car numberplate " + carNumberplate, '+Info do Carro')
                            ]);
                        cards.push(tempCard);
                    }
                    var reply = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.list)
                        .attachments(cards);
                    session.send(reply);
                } else {
                    session.send("O Stand não tem carros disponiveis.");
                }
            }
        });
    },

    //Mostra os carros pelo nome
    getCarCarname: function (urlCars, session, brand, model) {
        object = { marca: brand, modelo: model };
        getInfo.requests.postRequest(urlCars, object, function (body) {
            var brandTemp = functions.uppercaseFirst(brand);
            var modelTemp = functions.uppercaseFirst(model);

            var carname = brandTemp + " " + modelTemp;
            if (body.length === 0) {
                session.send("O " + carname + " não se encontra disponivel no Stand!");
            } else {
                functions.creationCardsCars(body, session);
            }
        });
    },

    //Mostra os carros por matricula
    getCarNumberPlate: function (urlCars, session, numberplateCar) {
        numberplate = { matricula: numberplateCar };
        getInfo.requests.postRequest(urlCars, numberplate, function (body) {
            if (body.length === 0) {
                session.send("O carro com a matricula " + numberplateCar.toUpperCase() + " não se encontra disponivel no Stand!");
            } else {
                var carName = body[0].marca + " " + body[0].modelo + " " + body[0].cilindrada;
                var carNumberplate = body[0].matricula;
                var carUrl = body[0].img;
                var carCategory = body[0].categoria;
                var carExtras = body[0].extras;
                var carColor = body[0].cor;
                var carKM = body[0].km;
                var carPrice = body[0].preço;
                var carStateTemp = body[0].vendido;

                var adaptiveCardCarNumberPlate;

                if (carStateTemp === 1) {
                    carState = "Vendido";
                    adaptiveCardCarNumberPlate = new builder.Message(session).addAttachment({ contentType: "application/vnd.microsoft.card.adaptive", content: { type: "AdaptiveCard", body: [{ "type": "Container", "size": "medium", "items": [{ "type": "TextBlock", "text": carName, "weight": "bolder", "size": "medium" }, { "type": "ColumnSet", "columns": [{ "type": "Column", "width": "auto", "items": [{ "type": "Image", "url": carUrl, "size": "auto" }] }] }, { "type": "TextBlock", "text": carState, "color": "warning", "weight": "bolder", "size": "small" }] }, { "type": "Container", "items": [{ "type": "FactSet", "facts": [{ "title": "Matrícula", "value": carNumberplate }, { "title": "KM", "value": carKM }, { "title": "Categoria", "value": carCategory }, { "title": "Extras", "value": carExtras }, { "title": "Cor", "value": carColor }] }] }] } });
                    session.send(adaptiveCardCarNumberPlate);
                } else {
                    carState = "Dísponivel para Compra (" + carPrice + "€)";
                    adaptiveCardCarNumberPlate = new builder.Message(session).addAttachment({ contentType: "application/vnd.microsoft.card.adaptive", content: { type: "AdaptiveCard", body: [{ "type": "Container", "size": "medium", "items": [{ "type": "TextBlock", "text": carName, "weight": "bolder", "size": "medium" }, { "type": "ColumnSet", "columns": [{ "type": "Column", "width": "auto", "items": [{ "type": "Image", "url": carUrl, "size": "auto" }] }] }, { "type": "TextBlock", "text": carState, "color": "accent", "weight": "bolder", "size": "small" }] }, { "type": "Container", "items": [{ "type": "FactSet", "facts": [{ "title": "Matrícula", "value": carNumberplate }, { "title": "KM", "value": carKM }, { "title": "Categoria", "value": carCategory }, { "title": "Extras", "value": carExtras }, { "title": "Cor", "value": carColor }] }] }] } });
                    session.send(adaptiveCardCarNumberPlate);
                }
            }
        });
    }
};
