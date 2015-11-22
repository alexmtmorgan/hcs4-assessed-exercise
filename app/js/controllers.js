/**
 * Created by alexmtmorgan on 14/11/2015.
 */

angular.module('app.controllers', [])

    .controller('MainCtrl', function($scope, SharedService) {

        $scope.completedLevels = SharedService.getCompletedLevels();

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
                partOneCompleted: false,
                partTwoCompleted: false
            },
            {
                id: 2,
                partOneCompleted: false,
                partTwoCompleted: false
            },
            {
                id: 3,
                partOneCompleted: false,
                partTwoCompleted: false,
                partThreeCompleted: false
            },
            {
                id: 4,
                partOneCompleted: false,
                partTwoCompleted: false
            }
        ];

        $scope.typedUsername = function() {
            return SharedService.getUsername() !== null &&
                SharedService.getUsername() !== '';
        };

        $scope.getUsername = function() {
            if(!$scope.typedUsername()) {
                return 'Guest';
            } else {
                return SharedService.getUsername();
            }
        };

        $scope.hideLessons = true;
    })

    .controller('DashboardCtrl', function($state) {

        this.continue = function() {
            $state.go('introduction');
        };

    })

    .controller('InformationCtrl', function($scope, SharedService) {

        this.user_name = $scope.getUsername();

        $scope.completedLevels = SharedService.getCompletedLevels();

    })

    .controller('IntroductionCtrl', function($scope, $state, SharedService) {

        this.user_name = null;

        this.continue = function() {
            SharedService.setUsername(this.user_name);
            SharedService.setLevelCompleted(0);
            $state.go('level1');
        };

        $scope.completedLevels = SharedService.getCompletedLevels();

    })

    .controller('LevelOneCtrl', function($scope, $state, SharedService) {

        this.user_name = SharedService.getUsername();
        $scope.completedLevels = SharedService.getCompletedLevels();

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
            } else if(this.partOneCompleted()) {
                SharedService.setLevelCompleted(1);
                $state.go('level2');
            }
        };

        this.tip = function() {
            alert('To get into the system you need a password. Geoff has changed it,' +
                ' though our intel tells us that his password security knowledge is terrible!' +
                " Do you think Geoff could've used his name as the password?");
        };
    })

    .controller('LevelTwoCtrl', function($scope, $state, SharedService) {

        this.user_name = SharedService.getUsername();
        $scope.completedLevels = SharedService.getCompletedLevels();

        this.level = 2;

        this.geoff = {
            password: '_ _ _ _ _ _ _  _ _ / _ _ / _ _ _ _',
            guessedGeoff: 0,
            guessedMittens: false,
            guessedAria: false,
            guessedDate: false,
            guessedWrongDate: false
        };

        this.continueDisabled = false;

        this.disableContinue = function() {
            this.continueDisabled = true;
        };

        this.enableContinue = function() {
            this.continueDisabled = false;
        };

        this.wrongGuess = function(guess) {
            if(guess === 'Aria') {
                this.geoff.guessedAria = true;

            } else if(guess === 'Date') {
                this.geoff.guessedWrongDate = true;

            } else if(guess === 'Geoff') {
                this.geoff.guessedGeoff = true;
            }

            alert("That didn't work, " + this.user_name + ". Did you read read his Facebook page?")
        };

        this.guessMittens = function() {
            this.geoff.guessedMittens = true;

            if(!this.geoff.guessedDate) {
                this.geoff.password = 'm i t t e n s  _ _ / _ _ / _ _ _ _';
            } else {
                this.geoff.password = 'm i t t e n s  0 1 / 0 1 / 2 0 0 0';
                $scope.levels[this.level].partThreeCompleted = true;
                this.enableContinue();
            }
        };

        this.guessDate = function() {
            this.geoff.guessedDate = true;

            if(!this.geoff.guessedMittens) {
                this.geoff.password = '_ _ _ _ _ _ _  0 1 / 0 1 / 2 0 0 0';
            } else {
                this.geoff.password = 'm i t t e n s  0 1 / 0 1 / 2 0 0 0';
                $scope.levels[this.level].partThreeCompleted = true;
                this.enableContinue();
            }
        };

        this.partOneCompleted = function() {
            return $scope.levels[this.level].partOneCompleted;
        };
        this.partTwoCompleted = function() {
            return $scope.levels[this.level].partTwoCompleted;
        };
        this.partThreeCompleted = function() {
            return $scope.levels[this.level].partThreeCompleted;
        };

        this.continue = function() {
            if(!this.partOneCompleted()) {
                $scope.levels[this.level].partOneCompleted = true;

            } else if(!this.partTwoCompleted()) {
                $scope.levels[this.level].partTwoCompleted = true;
                this.disableContinue();

            } else if(this.partOneCompleted() && this.partTwoCompleted() && this.partThreeCompleted()) {
                SharedService.setLevelCompleted(2);
                $state.go('level3');
            }
        };
    })

    .controller('LevelThreeCtrl', function($scope, $state, SharedService) {

        this.user_name = SharedService.getUsername();
        $scope.completedLevels = SharedService.getCompletedLevels();

        this.level = 3;

        this.geoff = {
            password: '_ _ _ _ _',
            guessedg: false,
            guessedG: false,
            guessede: false,
            guessedE: false,
            guessed3: false,
            guessedo: false,
            guessedO: false,
            guessed0: false,
            guessedf: false,
            guessedF: false
        };

        this.continueDisabled = false;

        this.disableContinue = function() {
            this.continueDisabled = true;
        };

        this.enableContinue = function() {
            this.continueDisabled = false;
        };

        String.prototype.replaceAt = function(index, character) {
            return this.substr(0, index) + character + this.substr(index+character.length);
        };

        this.wrongGuess = function(guess) {
            if(guess === 'G') {
                this.geoff.guessedG = true;

            } else if(guess === 'e') {
                this.geoff.guessede = true;

            } else if(guess === 'E') {
                this.geoff.guessedE = true;

            } else if(guess === 'o') {
                this.geoff.guessedo = true;

            } else if(guess === 'O') {
                this.geoff.guessedO = true;

            }

            alert("That didn't work, " + this.user_name + ". Keep trying!")
        };

        this.numFilled = 0;

        this.checkComplete = function() {
            this.numFilled++;
            if(this.numFilled == 5) {
                this.enableContinue();
            }
        };

        this.guessg = function() {
            this.geoff.guessedg = true;
            this.geoff.password = this.geoff.password.replaceAt(0, 'g');

            this.checkComplete();
        };
        this.guess3 = function() {
            this.geoff.guessed3 = true;
            this.geoff.password = this.geoff.password.replaceAt(2, '3');

            this.checkComplete();
        };
        this.guess0 = function() {
            this.geoff.guessed0 = true;
            this.geoff.password = this.geoff.password.replaceAt(4, '0');

            this.checkComplete();
        };
        this.guessf = function() {
            this.geoff.guessedf = true;
            this.geoff.password = this.geoff.password.replaceAt(6, 'f');

            this.checkComplete();
        };
        this.guessF = function() {
            this.geoff.guessedF = true;
            this.geoff.password = this.geoff.password.replaceAt(8, 'F');

            this.checkComplete();
        };

        this.partOneCompleted = function() {
            return $scope.levels[this.level].partOneCompleted;
        };
        this.partTwoCompleted = function() {
            return $scope.levels[this.level].partTwoCompleted;
        };

        this.continue = function() {
            if(!this.partOneCompleted()) {
                $scope.levels[this.level].partOneCompleted = true;

            } else if(!this.partTwoCompleted()) {
                $scope.levels[this.level].partTwoCompleted = true;
                this.disableContinue();

            } else if(this.partOneCompleted() && this.partTwoCompleted()) {
                SharedService.setLevelCompleted(3);
                $state.go('level4');
            }
        };
    })

    .controller('LevelFourCtrl', function($scope, SharedService) {

        this.user_name = SharedService.getUsername();
        $scope.completedLevels = SharedService.getCompletedLevels();

        this.level = 4;

        this.buttonLabel = "Yes!";

        this.password = null;
        this.password_c = null;

        this.inputType = 'password';

        this.togglePassword = function() {
            this.passwordCheckbox = !this.passwordCheckbox;

            if(this.passwordCheckbox) {
                this.inputType = 'text';
            } else {
                this.inputType = 'password';
            }
        };

        this.submitPassword = function() {
            console.log('submitted');
        };

        this.partOneCompleted = function() {
            return $scope.levels[this.level].partOneCompleted;
        };
        this.partTwoCompleted = function() {
            return $scope.levels[this.level].partTwoCompleted;
        };

        this.continue = function() {
            if(!this.partOneCompleted()) {
                $scope.levels[this.level].partOneCompleted = true;
                this.buttonLabel = "Continue";

            } else if(!this.partTwoCompleted()) {
                $scope.levels[this.level].partTwoCompleted = true;

            } else if(this.partOneCompleted() && this.partTwoCompleted()) {

            }
        };
    })

    //Unused controllers below

    .controller('DropdownCtrl', function() {

        this.status = {
            isopen: false
        };

        this.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            this.status.isopen = !this.status.isopen;
        };

    });