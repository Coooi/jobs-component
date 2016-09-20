'use strict';

const express = require('express');
const app     = express();
const morgan  = require('morgan');
const path    = require('path');
const JobsModule = require('./server/jobsModule');

app.use(morgan('dev'));
app.set('port', (process.env.PORT || 5000));
// app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/jobs', function (req, res) {
    JobsModule.getAllJobs(req, res);
});

app.get('/*', function(req, res) {
    res.status(200).send('index.html')
});

app.listen(app.get('port'), function() {
    console.log('App server running at PORT', app.get('port'));
});
