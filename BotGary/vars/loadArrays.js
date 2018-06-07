module.exports = {
    loadArrays: function () {
        //Brands
        request(vars.url.BrandsBD, { json: true }, function (err, res, body) {
            if (err) { return console.log(err); }

            for (var brands = 0; brands < body.length; brands++) {
                var brandTemp = { 'title': body[brands].marca, 'value': body[brands].id_marca };
                vars.brandsBD.push(brandTemp);
            }
        });

        //Categories
        request(vars.url.CategoriesBD, { json: true }, function (err, res, body) {
            if (err) { return console.log(err); }

            for (var categories = 0; categories < body.length; categories++) {
                var categoryTemp = { 'title': body[categories].categoria, 'value': body[categories].id_categoria };
                vars.categoriesBD.push(categoryTemp);
            }
        });
    }
};