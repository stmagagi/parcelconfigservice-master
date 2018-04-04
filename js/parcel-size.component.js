angular.module('parcelConfig').component('parcelSize', {
    transclude: true,
    templateUrl: "html/parcelSize.html",
    controller: function ParcelSizeController($scope, $http) {
        this.size = {
            length: "",
            width: "",
            height: ""
        };
        this.getGirthSize = function () {
            $http({url: "/api/getGirthSize", method: "GET", params: {size: this.size}}).then(function (res) {
                $scope.gurtmass = res.data.size;
            })
        }

    }
});


