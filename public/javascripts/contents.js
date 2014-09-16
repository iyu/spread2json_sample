/**
 * @fileOverview
 * @name contents.js
 * @author Yuhei Aihara <aihara_yuhei@cyberagent.co.jp>
 */
'use strict';

angular.module('spread2jsonApp.contents', []).
    controller('ContentsCtrl', function($scope, $modal) {
        $.ajaxSettings.error = function(xhr) {
            if (xhr.status === 302) {
                var data = xhr.responseJSON;
                if (data.redirect) {
                    location.replace(data.redirect);
                }
            }
        };

        $scope.spreadList = [];
        $scope.result = null;

        $scope.getSpreadList = function() {
            $.ajax({
                type: 'GET',
                url: '/_/spread'
            }).
            success(function(data) {
                $scope.spreadList = data.spreadList || [];
                $scope.$apply();
            });
        };

        $scope.openModal_addSpread = function() {
            $scope.modal = $modal({
                title: 'Add Spreadsheet',
                scope: $scope,
                template: 'partials/modal-add_spread'
            });
        };

        $scope.openModal_convert = function(spread) {
            $scope.spread = spread;
            $scope.modal = $modal({
                title: 'Convert Spreadsheet',
                scope: $scope,
                template: 'partials/modal-convert'
            });
        };

        $scope.convertResult = function(data) {
            $scope.result = data;
            $scope.$apply();
        };

        $scope.getSpreadList();
    }).
    controller('AddSpreadModalCtrl', function($scope) {
        $scope.id = '';
        $scope.addSpread = function() {
            $.ajax({
                type: 'POST',
                url: '/_/spread',
                data: { id: $scope.id }
            }).
            success(function() {
                $scope.getSpreadList();
                $scope.modal.hide();
            });
        };
    }).
    controller('ConvertSpreadModalCtrl', function($scope) {
        $scope.selectSheets = [];
        $scope.convertSpread = function() {
            $.ajax({
                type: 'POST',
                url: '/_/convert',
                data: {
                    key: $scope.spread.id,
                    sheets: $scope.selectSheets
                }
            }).
            success(function(data) {
                $scope.convertResult(data);
                $scope.modal.hide();
            });
        };
    })
;