/**
 * Created by cashonline on 28/5/14.
 */

var orgCom = angular.module('orgCom', []);


orgCom.factory('WebServices', function($http){
    return {



        findOrgById: function() {
            //return the promise directly.
            return $http.get('http://114.112.229.14:3000/findorg')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        },


        get : function(params){
            return $http.get('http://114.112.229.14:3000/findorg/', {
                params : params
            });
        },


        findAllMsgs : function(){
            return $http.get('http://114.112.229.14:3000/findAllMsgs/', {

            });
        },



        findallorgs : function(){
            return $http.get('http://114.112.229.14:3000/findallorgs/', {

            });
        }
    }
});


orgCom.controller('orgCom', function ($scope,$http,WebServices) {

    $scope.org=[];

    WebServices.get({
        orgId : getParameters().orgID

    }).then(function(response){
        //Do what you will with the data.
           console.log("org : " , response.data);
        $scope.org=response.data;
    });





});


function getOrgById($http,orgId){



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