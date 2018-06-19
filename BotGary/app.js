//MODULES NODE
global.restify = require('restify');
global.builder = require('botbuilder');
global.request = require('request');
//OTHERFILES
global.functions = require('./functions/functions.js');
global.vars = require('./vars/vars.js');
global.load = require('./vars/loadArrays.js');
global.getInfo = require('./getInfo.js');
//REQUEST's
global.help = require('./requests/help.js');
global.client = require('./requests/client.js');
global.car = require('./requests/car.js');
global.carstock = require('./requests/carstock.js');
global.carsale = require('./requests/carsale.js');
global.add = require('./requests/add.js');

// Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Chat connector para comunicar com o BotFramework WebChat
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

//Carregar os Arrays
load.loadArrays();

// Escuta de Mensagens do User
server.post('/api/messages', connector.listen());

// Recebe as mensagens do user e responde da melhor forma
var bot = new builder.UniversalBot(connector, function (session) {

    //lowercase do input
    var input = session.message.text.toLowerCase();

    //Está a espera do Action.Submit dos forms para adicionar clientes ou carros
    if (session.message && session.message.value) {
        add.addNew(session, session.message.value);
        return;
    }

    if (input[0] === "!") {
        if (functions.hasWhiteSpace(input)) {

            var inputs = input.split(" ");
            var keyword = inputs[0];
            var keywordAssistant = inputs[1];
            var params = inputs[2];
            var keywordGlobal = keyword + " " + keywordAssistant;


            switch (keywordGlobal) {

                //Pedido do ficheiro de documentação PDF
                case "!help pdf":
                    help.getHelpPdf(vars.url.Help, session);
                    break;

                //Pedido dos commandos do bot
                case "!help commands":
                    help.getHelpCommands(vars.url.Help, session);
                    break;

                //Pedido dos dados do cliente através do NIF
                case "!client nif":
                    if (params === undefined || params === "") {
                        session.send("Adicione o nif do cliente (ex: !client nif 158793468).");
                    } else {
                        var nifClient = params;
                        client.getClientNif(vars.url.Clients, session, nifClient);

                    } break;

                //Pedido dos dados do cliente através do Nome
                case "!client name":
                    if (params === undefined || params === "") {
                        session.send("Adicione os parametros necessários (ex: !client name Paulo).");
                    } else {
                        var nameClient = params;
                        client.getClientName(vars.url.Clients, session, nameClient);
                    }
                    break;

                //Pedido dos dados do carro através do Nome
                case "!car carname":
                    if (params != undefined) {
                        var paramsTemp = params.split("-");
                        var brand = paramsTemp[0];
                        var model = paramsTemp[1];

                        if (model != undefined) {
                            car.getCarCarname(vars.url.Cars, session, brand, model);
                        } else {
                            session.send("Coloque o nome do carro da seguinte forma (Marca-Modelo ex: BMW-120).");
                        }

                    } else {
                        session.send("Adicione os parametros necessários (ex: !car carname BMW-120).");
                    }
                    break;

                //Pedido dos dados do carro através da matricula
                case "!car numberplate":
                    if (params != undefined) {
                        var numberplate = params;
                        car.getCarNumberPlate(vars.url.Cars, session, numberplate);
                    } else {
                        session.send("Adicione os parametros necessários (ex: !car carname BMW-120).");
                    }
                    break;

                //Pedido do numero de carros em stock por marca
                case "!carstock brand":
                    if (params === undefined || params === "") {
                        session.send("Adicione os parametros necessários (ex: !carstock brand BMW).");
                    } else {
                        var brandStock = params;
                        carstock.getCarStockNumberBrand(vars.url.CarStock, session, brandStock);
                    }
                    break;

                //Pedido do numero de carros em stock por modelo
                case "!carstock model":
                    if (params === undefined || params === "") {
                        session.send("Adicione os parametros necessários (ex: !carstock model e30).");
                    } else {
                        var modelStock = params;
                        carstock.getCarStockNumberModel(vars.url.CarStock, session, modelStock);
                    }
                    break;

                //Pedido do numero de carros em stock por categoria
                case "!carstock category":
                    if (params === undefined || params === "") {
                        session.send("Adicione os parametros necessários (ex: !carstock category SUV).");
                    } else {
                        var categoryStock = params;
                        carstock.getCarStockNumberCategory(vars.url.CarStock, session, categoryStock);
                    }
                    break;

                //Pedido dos carros em stock por marca
                case "!vercarstock brand":
                    brandStockTemp = params;

                    if (brandStockTemp === undefined || brandStockTemp === "") {
                        session.send("Adicione os parametros necessários (ex: !vercarstock brand BMW).");
                    } else {
                        carstock.getCarStockBrand(vars.url.CarStock, session, brandStockTemp);
                    }
                    break;

                //Pedido dos carros em stock por modelo
                case "!vercarstock model":
                    modelStockTemp = params;

                    if (modelStockTemp === undefined || modelStockTemp === "") {
                        session.send("Adicione os parametros necessários (ex: !vercarstock model e30).");
                    } else {
                        carstock.getCarStockModel(vars.url.CarStock, session, modelStockTemp);
                    }
                    break;

                //Pedido dos carros em stock por category
                case "!vercarstock category":
                    categoryStockTemp = params;

                    if (categoryStockTemp === undefined || categoryStockTemp === "") {
                        session.send("Adicione os parametros necessários (ex: !vercarstock category SUV).");
                    } else {
                        carstock.getCarStockCategory(vars.url.CarStock, session, categoryStockTemp);
                    }
                    break;

                //Pedido dos carros vendidos no dia x
                case "!carsales day":
                    if (params === undefined || params === "") {
                        session.send("Adicione os parametros necessários (ex: !carsales day 28/05/2018).");
                    } else {
                        var day = params;
                        carsale.getNumberCarSalesDay(vars.url.CarSalesDay, session, day);
                    }
                    break;


                //Pedido dos carros vendidos por marca
                case "!carsales brand":
                    if (params === undefined || params === "") {
                        session.send("Adicione os parametros necessários (ex: !carsales brand BMW).");
                    } else {
                        var brandSales = params;
                        carsale.getNumberCarSalesBrand(vars.url.CarSales, session, brandSales);
                    }
                    break;

                //Pedido dos carros vendidos por category
                case "!carsales category":
                    if (params === undefined || params === "") {
                        session.send("Adicione os parametros necessários (ex: !carsales category SUV).");
                    } else {
                        var categorySales = params;
                        carsale.getNumberCarSalesCategory(vars.url.CarSales, session, categorySales);
                    }
                    break;

                //Pedido dos carros vendidos por modelo
                case "!carsales model":
                    if (params === undefined || params === "") {
                        session.send("Adicione os parametros necessários (ex: !carsales model e30).");
                    } else {
                        var modelSales = params;
                        carsale.getNumberCarSalesModel(vars.url.CarSales, session, modelSales);
                    }
                    break;
                case "!add car":
                    add.addCar(session);
                    break;
                case "!add client":
                    add.addClient(session);
                    break;

                default:
                    session.send('O comando **' + input + '** não existe... \n >  **!help commands** - Principais comandos do Bot Gary\n >  **!help pdf** - Todos os comandos do Bot Gary');
            }
        } else {
            switch (input) {
                //Pedido de todos os Clientes
                case "!clients":
                    client.getAllClients(vars.url.Clients, session);
                    break;

                //Pedido de todos os Carros
                case "!cars":
                    car.getAllCars(vars.url.Cars, session);
                    break;

                //Pedido do numero de carros em stock
                case "!carstock":
                    carstock.getNumberCarStock(vars.url.CarStock, session);
                    break;

                //Pedido do numero de carros em stock
                case "!carsales":
                    carsale.getNumberCarSales(vars.url.CarSales, session);
                    break;

                //Pedido dos carros em stock
                case "!vercarstock":
                    carstock.getCarStock(vars.url.CarStock, session);
                    break;
                default:
                    session.send('O comando **' + input + '** não existe... \n >  **!help commands** - Principais comandos do Bot Gary\n >  **!help pdf** - Todos os comandos do Bot Gary');
            }
        }
    }

});



















