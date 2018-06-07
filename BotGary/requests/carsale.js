module.exports = {

    //Mostra o numero de vendas desde o inicio do stand
    getNumberCarSales: function (urlCarSales, session) {
        getInfo.requests.getRequest(urlCarSales, function (body) {
            session.send("Foram vendidos desde o início " + body.length + " carros no Stand.    ");
        });
    },
    //Mostra o numero de vendas no dia
    getNumberCarSalesDay: function (urlCarSalesDay, session, day) {
        data = { data: day };
        getInfo.requests.postRequest(urlCarSalesDay, data, function (body) {
            session.send("Foram vendidos " + body[0].total + " carros no dia " + day);
        });
    },
    //Mostra o numero de vendas por marca
    getNumberCarSalesBrand: function (urlCarSales, session, brandSales) {
        brand = { marca: brandSales };
        getInfo.requests.postRequest(urlCarSales, brand, function (body) {
            session.send("Foram vendidos " + body[0].total + " carros da marca " + functions.uppercaseFirst(brandSales));
        });
    },
    //Mostra o numero de vendas por categoria
    getNumberCarSalesCategory: function (urlCarSales, session, categorySales) {
        categoria = { categoria: categorySales };
        getInfo.requests.postRequest(urlCarSales, categoria, function (body) {
            session.send("Foram vendidos " + body[0].total + " carros da categoria " + categorySales);
        });
    },
    //Mostra o numero de vendas por modelo
    getNumberCarSalesModel: function (urlCarSales, session, modelSales) {
        modelo = { modelo: modelSales };
        getInfo.requests.postRequest(urlCarSales, modelo, function (body) {
            session.send("Foram vendidos " + body[0].total + " carros do modelo " + modelSales);
        });
    }

};