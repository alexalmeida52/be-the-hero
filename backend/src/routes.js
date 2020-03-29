const express = require('express');

const routes = express.Router();
const Ongs = require('./controllers/Ongs');
const Incidents = require('./controllers/Incidents');
const Profile = require('./controllers/Profile');
const Session = require('./controllers/Session');

// ONGs
routes.post('/ongs', Ongs.create);
routes.get('/ongs', Ongs.index);
routes.post('/session', Session.create);


// Incidents
routes.get('/incidents', Incidents.index);
routes.get('/profile', Profile.index);
routes.post('/incidents', Incidents.create);
routes.delete('/incidents/:id', Incidents.delete);
module.exports = routes;