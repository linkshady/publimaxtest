const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: 'Este Campo Es Requerido'
    },
    nombre: {
        type: String
    },
    email: {
        type: String
    },
    fecha_nacimiento: {
        type: Date
    },
    status: {
        type: String
    },
    deportes_favoritos: [{
        type: String,
        enum: ["futbol", "basquetbol", "natacion"]
    }]
});

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, ' e-mail Invalido');
mongoose.model('User', userSchema);