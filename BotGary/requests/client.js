module.exports = {


    //Mostra Cliente Através do Nif
    getClientNif: function (urlClients, session, nifClient) {
        nif = { nif: nifClient };
        getInfo.requests.postRequest(urlClients, nif, function (body) {
            if (body.length === 0) {
                session.send("O cliente com o NIF **" + nifClient + "** não está registado.");
            } else {
                functions.creationCardsClients(body, session);
            }
        });
    },



    //Mostra Cliente Através do Nome
    getClientName: function (urlClients, session, nameClient) {
        name = { nome: nameClient };
        getInfo.requests.postRequest(urlClients, name, function (body) {
            if (body.length === 0) {
                session.send("O cliente **" + functions.uppercaseFirst(nameClient) + "** não está registado no stand.");
            } else {
                functions.creationCardsClients(body, session);
            }
        });
    },



    //Mostra todos os clientes
    getAllClients: function (urlClients, session) {
        json = true;
        getInfo.requests.postRequest(urlClients, json, function (body) {
            if (body.length != 0) {
                var cards = [];
                for (var x = 0; x < body.length; x++) {
                    var personName = body[x].nome;
                    var personNIF = "NIF: " + body[x].nif;
                    var personAdress = "Morada: " + body[x].morada + " " + body[x].cidade + " " + body[x].distrito;

                    var tempCard = new builder.HeroCard(session)
                        .subtitle(personName)
                        .text(personNIF)
                        .buttons([
                            builder.CardAction.imBack(session, "!client nif " + body[x].nif, '+Info de ' + personName)
                        ]);
                    cards.push(tempCard);
                }
                var reply = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.list)
                    .attachments(cards);
                session.send(reply);
            } else {
                session.send("O Stand não tem clientes registados.");
            }
        });
    }


};