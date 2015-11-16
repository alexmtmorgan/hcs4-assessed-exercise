/**
 * Created by alexmtmorgan on 14/11/2015.
 */

angular.module('app.controllers', [])

    .controller('MainCtrl', function($scope) {

        $scope.sidebar = {
            hide: "false"
        };

        $scope.toggleSidebar = function() {
            $scope.sidebar.hide = !$scope.sidebar.hide;
        };

        $scope.levels = [
            {
                id: 0
            },
            {
                id: 1,
                partOneCompleted: false
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ];

        $scope.username = "";
    })

    .controller('DropdownCtrl', function() {

        this.status = {
            isopen: false
        };

        this.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            this.status.isopen = !this.status.isopen;
        };

    })

    .controller('LevelCtrl', function($scope, $uibModal) {

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/www/nameInput.html',
                controller: 'NameInputCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    })

    .controller('NameInputCtrl', function ($scope, $uibModalInstance) {

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('IntroductionCtrl', function($scope) {

    })

    .controller('LevelOneCtrl', function($scope) {

        this.level = 1;

        this.geoff = {
            name: "G e _ _ _",
            has_o: false,
            has_ff: false
        };

        this.continueDisabled = false;

        this.disableContinue = function() {
            this.continueDisabled = true;
        };

        this.enableContinue = function() {
            this.continueDisabled = false;
        };

        this.o = function() {
            this.geoff.name = "G e o _ _";
            this.geoff.has_o = true;
        };

        this.ff = function() {
            this.geoff.name = "G e o f f";
            this.geoff.has_ff = true;

            this.enableContinue();
        };

        this.partOneCompleted = function() {
            return $scope.levels[this.level].partOneCompleted;
        };

        this.continue = function() {
            if(!this.partOneCompleted()) {
                $scope.levels[this.level].partOneCompleted = true;
                this.disableContinue();
            } else {

            }
        }

    });