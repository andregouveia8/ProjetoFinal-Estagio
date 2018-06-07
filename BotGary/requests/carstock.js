module.exports = {
    //Mostra o numero de carros em Stock no Stand
    getNumberCarStock: function (urlCarStock, session) {
        getInfo.requests.getRequest(urlCarStock, function (body) {
            session.send("Estão disponiveis em stock " + body.length + " carros");
            if (body.length > 0) {
                text = "Deseja ver quais são os carros disponiveis?";
                command = "!vercarstock";
                functions.question(text, command, session);
            }
        });
    },
    // Mostra os carros em stock no Stand
    getCarStock: function (urlCarStock, session) {
        getInfo.requests.getRequest(urlCarStock, function (body) {
            if (body.length === 0) {
                session.send("O Stand não tem carros em stock.");
            } else {
                functions.creationCardsCars(body, session);
            }
        });
    },
    // Mostra o numero de carros da marca em stock no stand
    getCarStockNumberBrand: function (urlCarStock, session, brandStock) {
        brand = { marca: brandStock };
        getInfo.requests.postRequest(urlCarStock, brand, function (body) {
            session.send("Estão disponiveis em stock " + body.length + " carros da marca " + brandStock);
            if (body.length != 0) {
                text = "Deseja ver quais os carros disponiveis em stock da marca " + brandStock + "?";
                command = "!vercarstock brand " + brandStock;
                functions.question(text, command, session);
            }
        });
    },
    // Mostra os carros da marca em stock no stand
    getCarStockBrand: function (urlCarStock, session, brandStock) {
        brand = { marca: brandStock };
        getInfo.requests.postRequest(urlCarStock, brand, function (body) {
            if (body.length != 0) {
                functions.creationCardsCars(body, session);
            }
        });
    },
    // Mostra o numero de carros do modelo em stock no stand
    getCarStockNumberModel: function (urlCarStock, session, modelStock) {
        modelo = { modelo: modelStock };
        getInfo.requests.postRequest(urlCarStock, modelo, function (body) {
            session.send("Estão disponiveis em stock " + body.length + " carros do modelo " + modelStock);

            if (body.length != 0) {
                text = "Deseja ver quais os carros disponiveis em stock do modelo " + modelStock + "?";
                command = "!vercarstock model " + modelStock;
                functions.question(text, command, session);
            }
        });
    },
    // Mostra os carros da marca em stock no stand
    getCarStockModel: function (urlCarStock, session, modelStock) {
        modelo = { modelo: modelStock };
        getInfo.requests.postRequest(urlCarStock, modelo, function (body) {
            if (body.length != 0) {
                functions.creationCardsCars(body, session);
            }
        });
    },
    // Mostra o numero de carros da categoria em stock no stand
    getCarStockNumberCategory: function (urlCarStock, session, categoryStock) {
        categoria = { categoria: categoryStock };
        getInfo.requests.postRequest(urlCarStock, categoria, function (body) {
            session.send("Estão disponiveis em stock " + body.length + " carros da categoria " + categoryStock);
            if (body.length != 0) {
                text = "Deseja ver quais os carros disponiveis em stock da categoria " + categoryStock + "?";
                command = "!vercarstock category " + categoryStock;
                functions.question(text, command, session);
            }
        });
    },
    // Mostra os carros da categoria em stock no stand
    getCarStockCategory: function (urlCarStock, session, categoryStock) {
        categoria = { categoria: categoryStock };
        getInfo.requests.postRequest(urlCarStock, categoria, function (body) {
            if (body.length != 0) {
                functions.creationCardsCars(body, session);
            }
        });
    }
};
