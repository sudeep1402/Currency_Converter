angular.module('currencyConverterApp', [])
    .controller('CurrencyConverterController', ['$scope', '$http', function ($scope, $http) {
        $scope.currencyCodes = Object.keys(Country_List);
        $scope.fromCurrency = 'USD';
        $scope.toCurrency = 'GBP';
        $scope.amountValue = 1;

        $scope.getFlagImage = function (currencyCode) {
            return `https://flagcdn.com/48x36/${Country_List[currencyCode].toLowerCase()}.png`;
        };

        $scope.getExchangeRate = function () {
            $scope.resultText = "Getting exchange rate...";
            $http.get(`https://v6.exchangerate-api.com/v6/1d0b56ff825c90928ad5ad72/latest/${$scope.fromCurrency}`)
                .then(function (response) {
                    const exchangeRate = response.data.conversion_rates[$scope.toCurrency];
                    const totalExRate = ($scope.amountValue * exchangeRate).toFixed(2);
                    $scope.resultText = `${$scope.amountValue} ${$scope.fromCurrency} = ${totalExRate} ${$scope.toCurrency}`;
                })
                .catch(function (error) {
                    $scope.resultText = "Something went wrong...";
                });
        };

        $scope.getResult = function () {
            return $scope.resultText;
        };

        $scope.reverseCurrencies = function () {
            const temp = $scope.fromCurrency;
            $scope.fromCurrency = $scope.toCurrency;
            $scope.toCurrency = temp;
            $scope.getExchangeRate();
        };

        $scope.getExchangeRate();
    }]);
