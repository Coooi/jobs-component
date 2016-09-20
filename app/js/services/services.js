(function () {
    'use strict';

    angular.module('jobsApp')

        .service('ApiService', function ($http, $rootScope, $interval, $q, $log) {
            var jobs = [],
                PROXY_URL = '/jobs';


            //Services
            return {
                getAllJobs: getAllJobs
            };

            /**
             * @ngdoc method
             * @name getAllJobs
             *
             * @description
             * Get all the jobs from the provided URL.
             *
             */
            function getAllJobs() {
                var q = $q.defer();

                $http({
                    method: 'GET',
                    url: PROXY_URL
                }).then(handleSuccessResponse, handleErrorResponse);

                 function handleSuccessResponse (response) {
                     jobs = response.data;
                     q.resolve(jobs);
                }
                function handleErrorResponse (errorResponse) {
                    q.reject(errorResponse);
                }

                return q.promise;
            }
        });
})();