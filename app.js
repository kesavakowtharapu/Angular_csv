var app = angular.module('MyApp', ['ngFileUpload'])
    app.controller('MyController', function ($scope, $window) {
        $scope.SelectFile = function (file) {
            $scope.SelectedFile = file;
        };
        var customers = new Array();
        $scope.Upload = function () {
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
            if (regex.test($scope.SelectedFile.name.toLowerCase())) {
                if (typeof (FileReader) != "undefined") {
                    var reader = new FileReader();
                    reader.onload = function (e) {

                        var rows = e.target.result.split("\r\n");
                        for (var i = 0; i < rows.length; i++) {
                            var cells = rows[i].split(",");
                            if (cells.length > 1) {
                                var customer = {};
                                customer.firstName = cells[0].replace(/"/g,'');
                                customer.surName = cells[1].replace(/"/g,'');
                                customer.issueCount = parseInt(cells[2]);
                                customer.dob = cells[3].replace(/"/g,'');
                                if(i!=0){
                                    customers.push(customer);
                                }
                                $scope.$apply(function () {
                                    $scope.Customers = customers;
                                    $scope.IsVisible = true;
                                });
                            }
                        }

                    }
                    reader.readAsText($scope.SelectedFile);
                } else {
                    $window.alert("This browser does not support HTML5.");
                }
            } else {
                $window.alert("Please upload a valid CSV/Txt file.");
            }
        }

        $scope.minimalCount = function(val){
            return function(customers){
              if(val == undefined | val == "") return true;
              if (customers['issueCount'] <= parseInt(val)) return true;
            }
          }
    });