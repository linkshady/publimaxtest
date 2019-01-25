const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const User = mongoose.model('User');

router.get('/', (request, response) => {
    response.render("./user/addOrEdit", {
        viewTitle: "Crear Usuario"
    });
});


router.get('/list', (request, response) => {
    User.find((error, docs) => {
        if (!error) {
            response.render("user/list", {
                list: docs
            });
        }
        else {
            console.log('Error retrieving Users list :' + error);
        }
    });
});

router.get('/:id', (request, response) => {
    User.findById(request.params.id, (error, doc) => {
        if (!error) {
            response.render("user/addOrEdit", {
                viewTitle: "Actualizar Usuario",
                user: doc
            })
        }
    })
});


router.post('/', (request, response) => {
    if (request.body._id == '') {
        instertRecord(request, response);
        console.log("insert");
    } else {
        updateRecord(request, response);
        console.log("update");
    }

});

function instertRecord(request, response) {
    var user = new User();
    user.id = request.body.ID;
    user.nombre = request.body.nombre;
    user.fecha_nacimiento = request.body.fecha_nacimiento;
    user.status = request.body.status;
    user.deportes_favoritos = request.body.deportes_favoritos
    user.save((error, doc) => {
        if (!error) {
            response.redirect('user/list');
        } else {
            if (error.name == 'ValidationError') {
                handleValidationError(error, request.body);
                response.render("./user/addOrEdit", {
                    viewTitle: "Crear Usuario",
                    user: request.body
                });
            } else {
                console.log('Error In Record Insertion: ' + error);
            }
        }
    });
};

function updateRecord(request, response) {
    console.log(request.body)
    User.findOneAndUpdate({ _id: request.body._id }, request.body, { returnOriginal: false }, (error, doc) => {
        if (!error) { response.redirect('user/list'); }
        else {
            if (error.name == 'ValidationError') {
                handleValidationError(error, request.body);
                response.render("user/addOrEdit", {
                    viewTitle: 'Actualizar Usuario',
                    user: request.body
                });
            }
            else
                console.log('Error during record update : ' + error);
        }
    });
}

router.get('/delete/:id', (request, response) => {
    User.findByIdAndRemove(request.params.id, (error, doc) => {
        if (!error) {
            response.redirect('/user/list');
        }
        else { console.log('Error in delete :' + error); }
    });
});



function handleValidationError(error, data) {
    for (field in error.errors) {
        switch (error.errors[field].path) {
            case 'id':
                data['idError'] = error.errors[field].message;
                break;
            case 'email':
                data['emailError'] = error.errors[field].message;
                break;
            default:
                break;
        }
    }
};
module.exports = router;