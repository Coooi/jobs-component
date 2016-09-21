'use strict';

const RP            = require('request-promise');
const _             = require('lodash');
const winston       = require('winston');

let getAllJobs = function(req, res){
    const JOBS_URL = 'http://private-14c693-rentapanda.apiary-mock.com/jobs',
          OPEN_WEATHER_API_KEY = 'a065c4f72910bbc46dc78980fe6fe962',
          OPEN_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather',
          KEY_PARAM = `&APPID=${OPEN_WEATHER_API_KEY}`;

    const jobsOptions = {
        uri: JOBS_URL,
        method: 'GET',
        timeout: 30000,
        json: true
    };

    function respond(jobs){
        res.status(200).send(jobs);
    }

    function fetchWeathers(jobs){

        let weathersFecthed = 0;
        let totalJobs = _.size(jobs);

        _.forEach(jobs, (job) => {
            const latitude = job.job_latitude;
            const longitude =job.job_longitude;
            const weathersOptions = {
                uri: `${OPEN_WEATHER_URL}?lat=${latitude}&lon=${longitude}${KEY_PARAM}`,
                method: 'GET',
                timeout: 30000,
                json: true
            };

            function validateResponse(){
                weathersFecthed++;
                if (weathersFecthed === totalJobs) {
                    respond(jobs);
                }
            }

            RP(weathersOptions)
                .then(function (weatherResponse) {
                    job.weather = weatherResponse;
                    validateResponse();
                })
                .catch(function (err) {
                    validateResponse();
                    winston.error("Request failed when trying to fetch wheater.");
                    winston.debug(err);
                });
        });
    }

    RP(jobsOptions)
        .then(function (response) {
            fetchWeathers(response);
        })
        .catch(function (err) {
            let errorResponse = {};
            errorResponse.code = 404;
            errorResponse.message = 'Jobs not found.';
            res.status(404).send(errorResponse);
        });

};

module.exports = {
    getAllJobs: getAllJobs
};