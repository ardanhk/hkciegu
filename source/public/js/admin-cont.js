/**
 * Created by aaronlai on 3/6/14.
 */

var orgCom = angular.module('orgCom_Admin', []);


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


        updateOrg: function (params) {
            return $http.get('http://114.112.229.14:3000/updateOrg/', {
                params: params
            });
        },


        addEvent: function (params) {
            return $http.get('http://114.112.229.14:3000/addEvent/', {
                params: params
            });
        },
        isJoined: function () {
            return $http.get('http://114.112.229.14:3000/isJoined/', {
            });
        }



    }
});


orgCom.controller('orgCom_admin', function ($scope, $http, WebServices,$location) {

    $scope.org = [];

    $scope.eventName;
    $scope.eventDetail;









    $scope.emtpyOrg={ OrgID: '',
        LogoImg: '',
        SlideImg:
            [ { Img: '', Caption: '' },
                { Img: '', Caption: '' },
                { Img: '', Caption: '' } ],
        OrgTcName: '',
        OrgTcSName: '建總',
        OrgScName: '香港建造業總工會',
        OrgEnName: '香港建造業總工會',
        AboutUs: '',
        Phone: '',
        Email: '',
        Address: '',
        IsSubOrg: false,
        OrgGroupID: 'group1',
        Service:
            [ { Title: '', Link: '', SubList: '' },
                { Title: '', Link: '', SubList: '' },
                { Title: '', Link: '', SubList: '' } ],
        Purpose:
            [ { Title: '', Link: '', SubList: '' },
                { Title: '', Link: '', SubList: '' },
                { Title: '', Link: '', SubList: '' },
                { Title: '', Link: '', SubList: '' } ],
        Downloads:
            [ { Title: '', Link: '', SubList: '' },
                { Title: '', Link: '', SubList: '' } ] }

    ;

    $scope.preOrg = {OrgID: "", LogoImg: "logo-01.png", SlideImg: [
        { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
        { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
        { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
    ], OrgTcName: "香港建造業總工會",
        OrgTcSName: "建總",
        OrgScName: "香港建造業總工會",
        OrgEnName: "香港建造業總工會",
        AboutUs: "香港建造業總工會成立於1986年是香港工會聯合會的屬會，是建造行業集團工會。本會凝聚了歷史長短不一、工種不同的屬會23間。當中有成立了一百多年跨越一個世紀歷史悠久的屬會；有會員眾多、傳統優良、享有盛名的屬會；亦有成立不久、潛力待發、方興未艾的屬會。                        工會宗旨是：堅持「愛國、愛港、團結、權益、福利、參與」的精神，爭取勞工權益、調處勞資關係、推廣職業安全與健康、關心工人職業生活、興辦工人福利、開展文娛康樂活動、參與勞工事務和社會事務，促進工人團結。凡從事建造行業，包括地盤、裝修、文職人員、以及與建造行業有關，不論任何工作部門及工程之員工，均可參加工會。 ",
        Phone: "(852) 2388 6887",
        Email: "hkciegu@yahoo.com.hk",
        Address: "九龍油麻地上海街383號華興商業中心2字樓",
        IsSubOrg: false,
        OrgGroupID: "group1",
        Service: [
            {Title: "工聯會進修中心",
                Link: "",
                SubList: "" },
            {Title: "就業轉介",
                Link: "",
                SubList: "" },
            {Title: "項目計劃",
                Link: "",
                SubList: [
                    {Title: "預防石棉沉着病全港社區推廣計劃",
                        Link: "www.google.com",
                        SubList: "" },
                    {Title: "超越「塵世美」社交復康計劃",
                        Link: "",
                        SubList: "" }
                ] }
        ],
        Purpose: [
            {Title: "凝聚香港建造業從業員",
                Link: "",
                SubList: "" },
            {Title: "爭取公平和合理的雇傭條件",
                Link: "",
                SubList: "" },
            {Title: "推動行業職業安全健康",
                Link: "",
                SubList: "" },
            {Title: "促進從業員與業界的溝通",
                Link: "",
                SubList: "" }


        ],
        Downloads: [
            {Title: "修改會員資料的表格",
                Link: "",
                SubList: "" },
            {Title: "爭取公平和合理的雇傭條件",
                Link: "",
                SubList: "" }
        ]
    }
    ;


    $scope.preOrg= $scope.emtpyOrg;




    $scope.addService = function () {

        console.log("addService");
        $scope.preOrg.Service.push({Title: "",
            Link: "",
            SubList: "" });


    }



    $scope.addSubService = function (index) {

        console.log($scope.org.Service[index]);
        $scope.org.Service[index].SubList.push({Title: " ",
            Link: "",
            SubList: "" });


    }


    $scope.uploadOrg=function (){
        console.log("uploadOrg");
        uploadOrgs(WebServices,$http, $scope.preOrg);

    }


    $scope.addEvent=function (){
        console.log("add Event");

        WebServices.addEvent({
            eventName: $scope.eventName,
            eventDetail: $scope.eventDetail
        }).then(function (response) {
            //Do what you will with the data.
            console.log(response.data);
location="http://114.112.229.14/OrgCom/EventRecord.html";
            $scope.org = response.data[0];
        });



    };

    //$scope.isJoined;

$scope.refresh=function(){


   // isJoined=true;

    $scope.isJoined="123";
    console.log($scope.isJoined);

    /*
    WebServices.isJoined({

    }).then(function (response) {
        //Do what you will with the data.
        console.log(response);
        $scope.isJoined=response.data;

        //   $scope.org = response.data[0];
    });
*/



};


});


function getOrgById($http, orgId) {


}

function uploadOrgs(WebServices,$http, org){

    WebServices.updateOrg(
        {orgData:org}
   ).then(function (response) {
        //Do what you will with the data.
        console.log(response.data);
  //      $scope.org = response.data[0];
    })
}


function checkEmtpy(org){


}
