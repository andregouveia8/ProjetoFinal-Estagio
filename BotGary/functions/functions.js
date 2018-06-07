module.exports = {
    uppercaseFirst: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    hasWhiteSpace: function (s) {
        return s.indexOf(' ') >= 0;
    },
    creationCardsClients: function (dataCardsClients, session) {

        var personNIFClient = dataCardsClients[0].nif;
        var personNameClient = dataCardsClients[0].nome;
        var personAdressClient = dataCardsClients[0].morada;
        var personCityClient = dataCardsClients[0].cidade;
        var personCountryClient = dataCardsClients[0].distrito + ", " + dataCardsClients[0].país;

        var adaptiveCardClient = new builder.Message(session).addAttachment({ contentType: "application/vnd.microsoft.card.adaptive", content: { type: "AdaptiveCard", body: [{ type: "Container", items: [{ type: "ColumnSet", columns: [{ type: "Column", width: "stretch", items: [{ type: "TextBlock", text: personNameClient, weight: "bolder", wrap: true }, { type: "TextBlock", spacing: "none", text: personNIFClient, isSubtle: true, wrap: true }] }] }] }, { type: "Container", items: [{ type: "FactSet", facts: [{ title: "Morada:", value: personAdressClient }, { title: "Cidade", value: personCityClient }, { title: "Distrito", value: personCountryClient }] }] }] } });
        session.send(adaptiveCardClient);

    },
    creationCardsCars: function (dataCardsCars, session) {
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
                ]);

            cards.push(tempCard);
        }
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.list)
            .attachments(cards);
        session.send(reply);
    },

    question: function (text, command, session) {
        var questionCarstock = new builder.Message(session)
            .text(text)
            .suggestedActions(
                builder.SuggestedActions.create(
                    session, [
                        builder.CardAction.imBack(session, command, "Sim"),
                        builder.CardAction.imBack(session, "", "Não")
                    ]
                ));
        session.send(questionCarstock);
    }

};
