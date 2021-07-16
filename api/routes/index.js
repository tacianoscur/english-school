const express = require('express');
const pessoas = require('./pessoasRoute');
const turmas = require('./turmasRoute');
const niveis = require('./niveisRoute');

module.exports = app => {
    app.use(express.json());
    app.use(pessoas);
    app.use(turmas);
    app.use(niveis);
};