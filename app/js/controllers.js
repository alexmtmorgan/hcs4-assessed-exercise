/**
 * Created by alexmtmorgan on 14/11/2015.
 */

angular.module('app.controllers', [])

    .controller('MainCtrl', function($scope, SharedService) {

        $scope.completedLevels = SharedService.getCompletedLevels();

        String.prototype.replaceAt = function(index, character) {
            return this.substr(0, index) + character + this.substr(index+character.length);
        };

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
                partTwoCompleted: false
            },
            {
                id: 4,
                partOneCompleted: false,
                partTwoCompleted: false,
                partThreeCompleted: false
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
        this.password = null;
        this.password_c = null;

        this.getMessage = function() {
            if(this.password === null || this.password_c === null) {
                if(this.password_c === null && this.password === null) {
                    return "";

                } else {
                    return "Passwords do not match!";
                }
            } else if(this.password == this.password_c) {
                return "";
            } else {
                return "Passwords do not match!";
            }
        };

        this.passwordSubmitted = false;

        this.submitPassword = function() {
            if(this.getMessage() == "") {
                this.passwordSubmitted = true;

            }
        };

        this.continue = function() {
            SharedService.setUsername(this.user_name);
            SharedService.setInitialPassword(this.password);
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

                this.geoff = {
                    name: "G e _ _ _",
                    has_o: false,
                    has_ff: false
                };

                this.disableContinue();

                $scope.levels[this.level] = {
                    id: this.level,
                    partOneCompleted: false,
                    partTwoCompleted: false
                };

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

        this.initial = function() {
            this.geoff = {
                password: '_ _ _ _ _ _ _  _ _ / _ _ / _ _ _ _',
                guessedGeoff: 0,
                guessedMittens: false,
                guessedAria: false,
                guessedDate: false,
                guessedWrongDate: false
            };

            this.continueDisabled = false;

            $scope.levels[this.level].partOneCompleted = false;
            $scope.levels[this.level].partTwoCompleted = false;
        };

        this.initial();

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

        this.continue = function() {
            if(!this.partOneCompleted()) {
                $scope.levels[this.level].partOneCompleted = true;

            } else if(!this.partTwoCompleted()) {
                $scope.levels[this.level].partTwoCompleted = true;
                this.disableContinue();

            } else if(this.partOneCompleted() && this.partTwoCompleted()) {
                SharedService.setLevelCompleted(2);

                this.geoff = {
                    password: '_ _ _ _ _ _ _  _ _ / _ _ / _ _ _ _',
                    guessedGeoff: 0,
                    guessedMittens: false,
                    guessedAria: false,
                    guessedDate: false,
                    guessedWrongDate: false
                };

                this.enableContinue();

                $scope.levels[this.level] = {
                    id: this.level,
                    partOneCompleted: false,
                    partTwoCompleted: false
                };

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

                this.numFilled = 0;

                this.enableContinue();

                $scope.levels[this.level] = {
                    id: this.level,
                    partOneCompleted: false,
                    partTwoCompleted: false
                };

                $state.go('level4');
            }
        };
    })

    .controller('LevelFourCtrl', function($scope, SharedService, $anchorScroll, $location, $state) {

        this.gotoAnchor = function() {
            var newHash = 'passwordForm';
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('passwordForm');
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        };

        this.user_name = SharedService.getUsername();
        $scope.completedLevels = SharedService.getCompletedLevels();

        this.level = 4;

        this.buttonLabel = "Yes!";

        this.password = null;
        this.password_c = null;

        this.inputType = 'password';

        this.passwordLength = function() {
            var num = 4;

            if(this.password != null) {
                if(this.password.length >= 8) {
                    this.alerts[num].type = "success";
                    this.alerts[num].icon = "fa-check";
                } else {
                    this.alerts[num].type = "danger";
                    this.alerts[num].icon = "fa-times";
                }

                return this.password.length;
            } else {
                this.alerts[num].type = "danger";
                this.alerts[num].icon = "fa-times";
                return 0;
            }
        };

        this.possibleCharacters = 0;

        this.secondsToString = function() {


            if(this.passwordLength() === 0 || this.possibleCharacters === 0) {
                return 0 + " years, " +
                    0 + " days, " +
                    0 + " hours, " +
                    0 + " minutes, " +
                    0 + " seconds, " +
                    0 + " milliseconds";
            }

            var totalMilliseconds = Math.pow(this.possibleCharacters,this.passwordLength()) / 1000000;
            var days = 365, hours = 24, minutes = 60, seconds = 60, milliseconds = 1000;

            var millisecondsInYear = days * hours * minutes * seconds * milliseconds,
                millisecondsInDay = hours * minutes * seconds * milliseconds,
                millisecondsInHour = minutes * seconds * milliseconds,
                millisecondsInMinute = seconds * milliseconds,
                millisecondsInSecond = milliseconds;

            var numyears = Math.floor(totalMilliseconds / millisecondsInYear);
            var numdays = Math.floor((totalMilliseconds % millisecondsInYear) / millisecondsInDay);
            var numhours = Math.floor(((totalMilliseconds % millisecondsInYear) % millisecondsInDay) / millisecondsInHour);
            var numminutes = Math.floor((((totalMilliseconds % millisecondsInYear) % millisecondsInDay) % millisecondsInHour) / millisecondsInMinute);
            var numseconds = Math.floor(((((totalMilliseconds % millisecondsInYear) % millisecondsInDay) % millisecondsInHour) % millisecondsInMinute) / millisecondsInSecond);
            var nummilliseconds = (((((totalMilliseconds % millisecondsInYear) % millisecondsInDay) % millisecondsInHour) % millisecondsInMinute) % millisecondsInSecond);

            return numyears + " years, " +
                numdays + " days, " +
                numhours + " hours, " +
                numminutes + " minutes, " +
                numseconds + " seconds, " +
                nummilliseconds + " milliseconds";
        };

        this.timeToCrack = function() {
            return this.secondsToString();
        };

        this.charChecked = {
            lower: false,
            upper: false,
            num: false,
            special: false
        };

        this.checkPattern = function() {
            if(this.password !== null || this.password !== undefined) {
                this.checkLowerCase();

                this.checkUpperCase();

                this.checkDigit();

                this.checkNonAlphaNumeric();
            }
        };

        this.checkLowerCase = function() {
            var num = 0;

            if(this.password === null || this.password === undefined) {
                this.alerts[num].type = "danger";
                if(this.charChecked.lower === true) {
                    this.charChecked.lower = false;
                    this.possibleCharacters -= 26;
                }
                this.alerts[num].icon = "fa-times";
                return;
            }

            if(this.password !== null && this.password !== undefined) {
                var contains = this.password.match(/(.*([a-z]))/);
            }

            if(contains !== null) {
                this.alerts[num].type = "success";
                if(this.charChecked.lower === false) {
                    this.charChecked.lower = true;
                    this.possibleCharacters += 26;
                }

                this.alerts[num].icon = "fa-check"
            } else {
                this.alerts[num].type = "danger";
                if(this.charChecked.lower === true) {
                    this.charChecked.lower = false;
                    this.possibleCharacters -= 26;
                }
                this.alerts[num].icon = "fa-times";
            }
        };

        this.checkUpperCase = function() {
            var num = 1;

            if(this.password === null || this.password === undefined) {
                this.alerts[num].type = "danger";
                if(this.charChecked.upper === true) {
                    this.charChecked.upper = false;
                    this.possibleCharacters -= 26;
                }
                this.alerts[num].icon = "fa-times";
                return;
            }
            if(this.password !== null && this.password !== undefined) {
                var contains = this.password.match(/(.*([A-Z]))/);
            }

            if(contains !== null) {
                this.alerts[num].type = "success";
                if(this.charChecked.upper === false) {
                    this.charChecked.upper = true;
                    this.possibleCharacters += 26;
                }
                this.alerts[num].icon = "fa-check"

            } else {
                this.alerts[num].type = "danger";
                if(this.charChecked.upper === true) {
                    this.charChecked.upper = false;
                    this.possibleCharacters -= 26;
                }
                this.alerts[num].icon = "fa-times";
            }
        };

        this.checkDigit = function() {
            var num = 2;

            if(this.password === null || this.password === undefined) {
                this.alerts[num].type = "danger";
                if(this.charChecked.num === true) {
                    this.charChecked.num = false;
                    this.possibleCharacters -= 10;
                }
                this.alerts[num].icon = "fa-times";
                return;
            }
            if(this.password !== null && this.password !== undefined) {
                var contains = this.password.match(/(.*([0-9]))/);
            }

            if(contains !== null) {
                this.alerts[num].type = "success";
                if(this.charChecked.num === false) {
                    this.charChecked.num = true;
                    this.possibleCharacters += 10;
                }
                this.alerts[num].icon = "fa-check"
            } else {
                this.alerts[num].type = "danger";
                if(this.charChecked.num === true) {
                    this.charChecked.num = false;
                    this.possibleCharacters -= 10;
                }
                this.alerts[num].icon = "fa-times";
            }
        };

        this.checkNonAlphaNumeric = function() {
            var num = 3;

            if(this.password === null || this.password === undefined) {
                this.alerts[num].type = "danger";
                if(this.charChecked.special === true) {
                    this.charChecked.special = false;
                    this.possibleCharacters -= 33;
                }
                this.alerts[num].icon = "fa-times";
                return;
            }

            if(this.password !== null && this.password !== undefined) {
                var contains = this.password.match(/(.*(_|[^\w]))/);
            }

            if(contains !== null) {
                this.alerts[num].type = "success";
                if(this.charChecked.special === false) {
                    this.charChecked.special = true;
                    this.possibleCharacters += 33;
                }
                this.alerts[num].icon = "fa-check"
            } else {
                this.alerts[num].type = "danger";
                if(this.charChecked.special === true) {
                    this.charChecked.special = false;
                    this.possibleCharacters -= 33;
                }
                this.alerts[num].icon = "fa-times";
            }
        };

        this.nameInPassword = function() {
            if(this.user_name !== null && this.password !== null) {
                var passwordLower = this.password.toLowerCase();
                var usernameLower = this.user_name.toLowerCase();

                var num = 5;

                if(passwordLower.indexOf(usernameLower) > -1) {
                    this.alerts[num].type = "danger";

                    this.alerts[num].icon = "fa-times";

                    return true;
                } else {
                    this.alerts[num].type = "success";

                    this.alerts[num].icon = "fa-check";

                    return false;
                }

            } else {
                return false;

            }
        };

        this.togglePassword = function() {
            this.passwordCheckbox = !this.passwordCheckbox;

            if(this.passwordCheckbox) {
                this.inputType = 'text';
            } else {
                this.inputType = 'password';
            }
        };

        this.submitPassword = function() {
            this.continue();
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

        this.alerts = [
            {
                type: "danger",
                msg: "Your password must contain at least one small letter (like 'a', 'b' or 'z')",
                icon: "fa-times"
            },
            {
                type: "danger",
                msg: "Your password must contain at least one capital letter (like 'A', 'B' or 'Z')",
                icon: "fa-times"
            },
            {
                type: "danger",
                msg: "Your password must contain at least one number (like '0', '1' or '9')",
                icon: "fa-times"
            },
            {
                type: "danger",
                msg: "Your password must contain at least one special character (like '_', '%' or '@')",
                icon: "fa-times"
            },
            {
                type: "danger",
                msg: "Your password must be at least 8 characters long",
                icon: "fa-times"
            },
            {
                type: "success",
                msg: "You mustn't use your name in your password",
                icon: "fa-check"
            }
        ];

        this.hidePasswordForm = false;

        this.continue = function() {
            if(!this.partOneCompleted()) {
                $scope.levels[this.level].partOneCompleted = true;
                this.buttonLabel = "Continue";
                this.continueDisabled = true;

            } else if(!this.partTwoCompleted()) {
                $scope.levels[this.level].partTwoCompleted = true;
                this.continueDisabled = false;
                this.hidePasswordForm = true;

            } else if(!this.partThreeCompleted()) {
                $scope.levels[this.level].partThreeCompleted = true;

                $state.go('information');
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