const mongoose = require('mongoose');

let housingSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 6,
        required: true,
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true,
    },
    year: {
        type: Number,
        min:1960,
        max:2020,
        required: true,
    },

    city: {
        type: String,
        minlength: 4,
        required: true,
    },
    image: {
        ///http or https validation TODO
        type: String,
        validate: /^https?:\/\//i,
        required: true,
    },
    description: {
        type: String,
        maxlength: 60,
        required: true,
    },
    availablePieces: {
        type: Number,
        required: true,

    },
    tenants: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

housingSchema.method('getTenants', function() {
    return this.tenants.map(x => x.name).join(', ')
})

let Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;