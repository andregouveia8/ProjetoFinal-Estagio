module.exports = {
    //Para adicionar um novo cliente
    addClient: function (session) {
        var clientCardAdd = {
            'contentType': 'application/vnd.microsoft.card.adaptive',
            'content': {
                '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                'type': 'AdaptiveCard',
                'version': '1.0',
                'body': [
                    {
                        'type': 'TextBlock',
                        'size': 'medium',
                        'weight': 'bolder',
                        'text': 'Adicione aqui o seu novo cliente!',
                        'horizontalAlignment': 'center'
                    },
                    {
                        'type': 'Input.Text',
                        'id': 'clientName',
                        'placeholder': 'Nome do Cliente',
                        'style': 'text'
                    },
                    {
                        'type': 'Input.Number',
                        'id': 'clientNif',
                        'placeholder': 'NIF',
                        'style': 'text'
                    },
                    {
                        'type': 'Input.Number',
                        'id': 'clientPhone',
                        'placeholder': 'Nº Telemóvel',
                        'style': 'text'
                    },
                    {
                        'type': 'Input.Text',
                        'id': 'clientDistrict',
                        'placeholder': 'Distrito',
                        'style': 'text'
                    },
                    {
                        'type': 'Input.Text',
                        'id': 'clientCity',
                        'placeholder': 'Cidade',
                        'style': 'text'
                    },
                    {
                        'type': 'Input.Text',
                        'id': 'clientAdress',
                        'placeholder': 'Morada',
                        'style': 'text'
                    }
                ], 'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Adicionar',
                        'speak': '<s>Adicionar</s>',
                        'data': {
                            'type': 'newClient'
                        }
                    }
                ]
            }
        };
        var clientCardMessage = new builder.Message(session)
            .addAttachment(clientCardAdd);
        session.send(clientCardMessage);
    },
    //Para adicionar um novo carro
    addCar: function (session) {

        var carCardAdd = {
            'contentType': 'application/vnd.microsoft.card.adaptive',
            'content': {
                '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                'type': 'AdaptiveCard',
                'version': '1.0',
                'body': [
                    {
                        'type': 'TextBlock',
                        'size': 'medium',
                        'weight': 'bolder',
                        'text': 'Adicione aqui o seu novo carro!',
                        'horizontalAlignment': 'center'
                    }, {
                        'type': 'Input.ChoiceSet',
                        'id': 'carBrand',
                        'style': 'compact',
                        'value': vars.brandsBD[0].value,
                        'choices': vars.brandsBD
                    },
                    {
                        'type': 'Input.Text',
                        'placeholder': 'Modelo',
                        'style': 'text',
                        'id': 'carModel'
                    },
                    {
                        'type': 'Input.ChoiceSet',
                        'id': 'carCategory',
                        'style': 'compact',
                        'value': vars.categoriesBD[0].value,
                        'choices': vars.categoriesBD
                    },
                    {
                        'type': 'Input.Text',
                        'placeholder': 'Extras',
                        'style': 'text',
                        'id': 'carExtras'
                    },
                    {
                        'type': 'Input.Number',
                        'placeholder': 'Preço',
                        'id': 'carPrice'
                    }, {
                        'type': 'Input.Number',
                        'placeholder': 'KM',
                        'id': 'carKms'
                    }, {
                        'type': 'Input.Number',
                        'placeholder': 'Ano',
                        'id': 'carYear'
                    }, {
                        'type': 'Input.Text',
                        'placeholder': 'Imagem (link)',
                        'style': 'url',
                        'maxLength': 0,
                        'id': 'carImgUrl'
                    },
                    {
                        'type': 'Input.Number',
                        'placeholder': 'Cilindrada',
                        'id': 'carPower'
                    },
                    {
                        'type': 'Input.Text',
                        'placeholder': 'Matricula',
                        'style': 'text',
                        'id': 'carNumberPlate'
                    },
                    {
                        'type': 'Input.ChoiceSet',
                        'id': 'carColor',
                        'style': 'compact',
                        'value': 'Preto',
                        'choices': vars.colors
                    }],
                'actions': [
                    {
                        'type': 'Action.Submit',
                        'title': 'Adicionar',
                        'data': {
                            'type': 'newCar'
                        }
                    }
                ]
            }
        };

        var carCardMessage = new builder.Message(session)
            .addAttachment(carCardAdd);
        session.send(carCardMessage);
    },

    //On click do button nos card de form input
    addNew: function (session, value) {
        //caso seja no card de novo carro
        if (value.type === "newCar") {
            var newCar = {
                id_marca: value.carBrand,
                modelo: value.carModel,
                id_categoria: value.carCategory,
                extras: value.carExtras,
                preço: value.carPrice,
                km: value.carKms,
                ano: value.carYear,
                img: value.carImgUrl,
                cilindrada: value.carPower,
                matricula: value.carNumberPlate,
                cor: value.carColor
            };
            if (newCar.id_marca.length > 0 && newCar.modelo.length > 0 && newCar.id_categoria.length > 0 && newCar.extras.length > 0 && newCar.preço.length > 0 && newCar.km.length > 0 && newCar.ano.length > 0 && newCar.img.length > 0 && newCar.cilindrada.length > 0 && newCar.matricula.length > 0 && newCar.cor.length > 0) {
                session.send("Estou a adicionar o novo Carro!");
                getInfo.requests.postRequest(vars.url.CarsAdd, newCar, function (body, error, response) {
                    if (!error && response.statusCode == 200) {
                        session.send("O carro foi adicionado com sucesso!");
                    } else {
                        session.send("Não foi possivel adicionar o carro...");
                    }
                });
            } else {
                session.send("Preencha todos os campos por favor!");
            }
        }
        //caso seja um novo cliente
        else if (value.type === "newClient") {
            var newClient = {
                nome: value.clientName,
                nif: value.clientNif,
                cidade: value.clientCity,
                morada: value.clientAdress,
                distrito: value.clientDistrict,
                telemovel: value.clientPhone
            };
            if (newClient.nome.length > 0 && newClient.nif.length > 0 && newClient.cidade.length > 0 && newClient.morada.length > 0 && newClient.distrito.length > 0 && newClient.telemovel.length > 0) {
                session.send("Estou a adicionar o novo Cliente!");

                getInfo.requests.postRequest(vars.url.ClientsAdd, newClient, function (body, error, response) {
                    if (!error && response.statusCode == 200) {
                        session.send("O cliente " + newClient.nome + " foi adicionado com sucesso!");
                    } else {
                        session.send("Não foi possivel adicionar o cliente...");
                    }
                });
            } else {
                session.send("Preencha todos os campos por favor!");
            }
        }
    }
};