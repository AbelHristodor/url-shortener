/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const linkSchema = new Schema({
    slug: { type: String, default: null },
    origin_url: {
        type: String,
        required: true,
        validate: {
        validator: validator.isURL,
        message: '{VALUE} is not a valid URL',
        },
    },
    short_url: { type: String, default: null },
    createdAt: { type: Date, default: new Date() },
    isActive: { type: Boolean, default: true },

})

module.exports = mongoose.model('Url', linkSchema);