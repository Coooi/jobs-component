function JobsController(ApiService, $log, $scope, $timeout) {
    var $ctrl = this;

    $ctrl.errorMsg = '';
    $ctrl.showSpinner = false;
    $ctrl.jobs = [];

    $ctrl.$onInit = function () {
        $ctrl.getAllJobs();
    };

    $ctrl.getAllJobs = function () {
        $ctrl.showResults = false;
        $ctrl.showSpinner = true;
        $ctrl.errorMsg = '';
        ApiService.getAllJobs().then(handleSuccess, handleError);
    };

    function handleSuccess(jobsResponse) {
        $ctrl.showSpinner = false;
        $timeout(function () {
            $ctrl.jobs = jobsResponse;
        });

        $ctrl.showResults = true;
    }

    function handleError(errorResponse) {
        $ctrl.showSpinner = false;
        if (errorResponse.data.message) {
            $ctrl.errorMsg = errorResponse.data.message;
        }
        $log.debug(errorResponse);
    }
}

angular.module('jobsApp').component('jobsComponent', {
    templateUrl: 'views/jobs_component.html',
    controller: JobsController,
    controllerAs: '$ctrl'
});