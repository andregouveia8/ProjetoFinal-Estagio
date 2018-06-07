module.exports = {

    //Mostra o pdf com os commandos do bot
    getHelpPdf: function (urlHelp, session) {
        var helpDoc = new builder.Message(session)
            .addAttachment({
                "contentUrl": "https://files.fm/u/xmd2zych#/view/GaryCommands.pdf",
                "contentType": "application/pdf",
                "name": "BotGaryCommandsd.pdf"
            });
        session.send(helpDoc);
    },

    //Mostra os principais comandos do bot
    getHelpCommands: function (urlHelp, session) {
        var commandCardMessage = "**Principais comandos do Bot Gary** \n" +
            "**!cars** - `Mostra todos os carros do Stand.` \n" +
            "**!clients** - `Mostra todos os clientes do Stand.` \n" +
            "**!carstock** - `Mostra o numero de carros em stock no Stand.` \n" +
            "**!car carname *<carname>*** - `Mostra os carros com o nome = carname.` \n" +
            "**!car numberplate *<numberplate>*** - `Mostra os carros com a matricula = numberplate.` \n" +
            "**!client nif *<NIF>*** - `Mostra informações do cliente com o nif = NIF.` \n" +
            "**!add car** - `Para adicionar um carro ao Stand.` \n" +
            "**!add client** - `Para adicionar um cliente ao Stand.` \n" +
            "**!help pdf** - `Para consultar todos os comandos do Bot Gary`";
        session.send(commandCardMessage);
    }
};


