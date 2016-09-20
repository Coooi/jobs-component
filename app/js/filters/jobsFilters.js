angular.module('jobsApp')
    .filter('celsius', function () {
        return function (temp) {
            return temp + 'ºC';
        };
    })
    .filter('recurrency', function () {
        return function (recurrency) {

            return recurrency ? (
                (recurrency === '1') ? (recurrency + ' day') : (recurrency + ' days') ) : 'None';
        };
    })
    .filter('extras', function () {
        return function (extras) {

            var filteredExtras = extras;

            if (!extras) {
                filteredExtras = 'None';
            } else if (extras.indexOf(';') > 0) {
                var regex = new RegExp(';', 'g');
                filteredExtras = extras.replace(regex, ', ');
            }

            return filteredExtras;
        };
    });
