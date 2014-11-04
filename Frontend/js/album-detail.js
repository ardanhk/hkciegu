/**
 * Created by cashonline on 28/5/14.
 */

var orgCom = angular.module('orgCom', []);


orgCom.factory('WebServices', function ($http) {
    return {

        findOrgById: function () {
            //return the promise directly.
            return $http.get('http://114.112.229.14:3000/findorg')
                .then(function (result) {
                    //resolve the promise as the data
                    return result.data;
                });
        },


        get: function (params) {
            return $http.get('http://114.112.229.14:3000/findorg/', {
                params: params
            });
        },


        findAllMsgs: function () {
            return $http.get('http://114.112.229.14:3000/findAllMsgs/', {

            });
        },


        findallorgs: function () {
            return $http.get('http://114.112.229.14:3000/findallorgs/', {

            });
        },

        findalbum: function () {
            return $http.get('http://114.112.229.14:3000/findalbum/org21', {

            });
        },

        findalbumBySubAlbum: function (orgId, album) {
            return $http.get('http://114.112.229.14:3000/findAlbumByName/' + orgId + '/' + album, {

            });
        }


    }
});


orgCom.controller('orgCom', function ($scope, $http, WebServices,$location) {
    $scope.albums = [];
    $scope.subOrg =getParameterByName('orgId');
   $scope.inAlbum = getParameterByName('album');
    console.log(  $scope.inAlbum);

    WebServices.get({
        orgId: 'org1',
        name: 'Head'
    }).then(function (response) {
        //Do what you will with the data.
        //    console.log(response.data);
        $scope.org = response.data;
    });


    WebServices.findalbumBySubAlbum(
        $scope.subOrg,
        $scope.inAlbum
    ).then(function (response) {
            //Do what you will with the data.
            //    console.log(response.data);
            $scope.albums = response.data;
        });


    WebServices.findallorgs({

    }).then(function (response) {
        //Do what you will with the data.
        console.log(response.data);
        $scope.orgs = response.data;


    });


    $scope.CatConert = function (cat) {

        switch (cat) {
            case '8':
                //   console.log(cat);
                return "category_2";
                break;
            case '13':
                console.log(cat);
                return "category_1";
                break;
            case '12':
                console.log(cat);
                return "category_3";
                break;
        }
    };


});


function getOrgById($http, orgId) {


}

function getParameters() {
    var searchString = window.location.search.substring(1),
        params = searchString.split("&"),
        hash = {};

    if (searchString == "") return {};
    for (var i = 0; i < params.length; i++) {
        var val = params[i].split("=");
        hash[unescape(val[0])] = unescape(val[1]);
    }
    return hash;
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}