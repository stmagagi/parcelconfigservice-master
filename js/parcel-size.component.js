angular.module('parcelConfig').component('parcelSize', {
    transclude: true,
    templateUrl:  "/ui/html/parcelSize.html",
    controller: function ParcelSizeController($scope, $http) {
        this.size = {
            length: 3,
            width: 4,
            height: 5
        };
        this.getGirthSize = function () {
            $http({
                url: "http://192.168.50.11:8082/api/getGirthSize",
                method: "GET",
                params: {size: this.size}
            }).then(function (res) {
                $scope.gurtmass = res.data.size;
            })
        }

    }
});


