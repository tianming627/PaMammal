angular.module('ionicApp', ['ionic','ngCordova'])

.factory('testInterceptor', function($rootScope){

  return {
    request: function(config) {
      $rootScope.showLoading();
      return config;
    },

    requestError: function(config) {
      $rootScope.hideLoading();
      return config;
    },

    response: function(res) {
      $rootScope.hideLoading();
      return res;
    },

    responseError: function(res) {
      $rootScope.hideLoading();
      return res;
    }
  }

})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  

  $httpProvider.interceptors.push('testInterceptor');

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "template/app.html"
    })
    .state('app.home', {
      url: "/home",
      views: {
        'appContent' :{
          templateUrl: "template/home.html",
          controller : "HomeController"
        }
      }
    })
    .state('app.login', {
      url: "/login",
      views: {
        'appContent' :{
          templateUrl: "template/login.html",
          controller : "LoginController"
        }
      }
    })
    .state('app.register', {
      url: "/register",
      views: {
        'appContent' :{
          templateUrl: "template/register.html",
          controller : "RegistrationController"
        }
      }
    })
    .state('app.mammalrecords', {
      url: "/mammalrecords",
      views: {
        'appContent' :{
          templateUrl: "template/mammalrecords.html",
          controller : "MammalRecordsController"
        }
      }
    })
    .state('app.mymammalrecords', {
      url: "/mymammalrecords",
      views: {
        'appContent' :{
          templateUrl: "template/mymammalrecords.html",
          controller : "MyMammalRecordsController"
        }
      }
    })
    .state('app.mammalsubmission', {
      url: "/mammalsubmission",
      views: {
        'appContent' :{
          templateUrl: "template/mammalsubmission.html",
          controller : "MammalSubmissionController"
        }
      }
    })
    .state('app.mammalobservation', {
      url: "/mammalobservation",
      views: {
        'appContent' :{
          templateUrl: "template/mammalobservation.html",
          controller : "MammalObservationController"
        }
      }
    })
    .state('app.swinerecords', {
      url: "/swinerecords",
      views: {
        'appContent' :{
          templateUrl: "template/swinerecords.html",
          controller : "SwineRecordsController"
        }
      }
    })
    .state('app.myswinerecords', {
      url: "/myswinerecords",
      views: {
        'appContent' :{
          templateUrl: "template/myswinerecords.html",
          controller : "MySwineRecordsController"
        }
      }
    })
    .state('app.swinesubmission', {
      url: "/swinesubmission",
      views: {
        'appContent' :{
          templateUrl: "template/swinesubmission.html",
          controller : "SwineSubmissionController"
        }
      }
    })
    .state('app.swineobservation', {
      url: "/swineobservation",
      views: {
        'appContent' :{
          templateUrl: "template/swineobservation.html",
          controller : "SwineObservationController"
        }
      }
    })
    .state('app.site', {
      url: "/site",
      views: {
        'appContent' :{
          templateUrl: "template/site.html",
          controller : "SiteController"
        }
      }
    })
    .state('app.picture', {
      url: "/picture",
      views: {
        'appContent' :{
          templateUrl: "template/picture.html",
          controller : "PictureController"
        }
      }
    });
  
    $urlRouterProvider.otherwise("/app/home");
})

.service('baseService',function($http){
    var baseurl = "http://api.pamammalatlas.com";

    var getCounties = function() {
      return [
        {
          value:'All',
          data:'All'
        },
        {
          value:'Adams County',
          data:'Adams County'
        },
        {
          value:'Allegheny County',
          data:'Allegheny County'
        },
        {
          value:'Armstrong County',
          data:'Armstrong County'
        }
      ];
    };

    var getDisplayers = function() {
      return [
        {
          value: 'Top 10',
          data: 'Top 10'
        },
        {
          value: 'All',
          data: 'All'
        },
      ];
    };

    var getStatus = function() {
      return [
        {
          value:'All',
          data:'All'
        },
        {
          value:'Approved',
          data:'Approved'
        },
        {
          value:'Pending',
          data:'Pending'
        },
        {
          value:'Denied',
          data:'Denied'
        },
      ];
    };


    return {
      baseurl : baseurl,
      getCounties : getCounties,
      getDisplayers : getDisplayers,
      getStatus : getStatus
    }
})

.service('galleryService',function($http,baseService){
    var getGallery = function() {
      return $http.get(baseService.baseurl+"/gallery");
    }

    return {
      getGallery:getGallery
    }
})

.service('loginService',function($http,baseService){
    
    var userId    = window.localStorage.getItem('userId');
    var userType  = window.localStorage.getItem('userType');

    var login = function(username, password, userType){
      return $http.get(baseService.baseurl+"/login?name="+username+"&pass="+password);
    };

    var getLoginStatus = function() {
      var loggedIn = window.localStorage.getItem('loggedIn');
      if (loggedIn == "true") {
        loggedIn = true;
      } else {
        loggedIn = false;
      }
      return loggedIn;
    };

    var getUser = function(){
      return JSON.parse(window.localStorage.getItem('user'));      
    };

    return {
      login : login,
      getLoginStatus : getLoginStatus,
      userId : userId,
      userType : userType,
      getUser : getUser
    }
})

.service('mammalService',function($http,baseService,loginService){
    
    var getMammals = function(selectedMDisplay,selectedMSpecies,selectedMCounty,page) {

      var endpoint = baseService.baseurl + "/mammals?page=";
      if (selectedMDisplay == "All") {
        endpoint += page;
      } else {
        endpoint += "0";
      }

      endpoint += "&species=" + selectedMSpecies;
      endpoint += "&county=" + selectedMCounty;

      return $http.get(endpoint);      
    };

    var getMyMammals = function(selectedMStatus,page) {      
      var endpoint = baseService.baseurl + "/mammals/mine?uid="+loginService.userId+"&page="+page+"&approval="+selectedMStatus;    
      return $http.get(endpoint);      
    };

    var getMyMammals = function(selectedMStatus,page) {      
      var endpoint = baseService.baseurl + "/mammals/mine?uid="+loginService.userId+"&page="+page+"&approval="+selectedMStatus;      
      return $http.get(endpoint);      
    };

    var getMammalSpecies = function(selectedMStatus,page) {            
      return $http.get(baseService.baseurl + "/mammals/species");      
    };

    var getDatum = function() {
      return [
        {
          value:'Unknown',
          data:'Unknown'
        },
        {
          value:'NAD27',
          data:'NAD27'
        },
        {
          value:'NAD83',
          data:'NAD83'
        },
        {
          value:'WGS84',
          data:'WGS84'
        },
        {
          value:'Other',
          data:'Other'
        }
      ];
    };

    var getAges = function() {
      return [
        {
          value:'Unknown',
          data:'Unknown'
        },
        {
          value:'Juvenile',
          data:'Juvenile'
        },
        {
          value:'Adult',
          data:'Adult'
        }
      ];
    };

    var getSexual = function() {
      return [
        {
          value:'Unknown',
          data:'Unknown'
        },
        {
          value:'Male',
          data:'Male'
        },
        {
          value:'Female',
          data:'Female'
        }
      ];
    };

    var getHabitats = function() {
      return [
        {
          value:'Forest',
          data:'Forest'
        },
        {
          value:'Field/Grass',
          data:'Field/Grass'
        },
        {
          value:'Water',
          data:'Water'
        },
        {
          value:'Wetland',
          data:'Wetland'
        },
        {
          value:'Developed/Residential',
          data:'Developed/Residential'
        },
        {
          value:'Other (comment below)',
          data:'Other (comment below)'
        }
      ];
    };

    var getMethods = function() {
      return [
        {
          value:'Incidental observation',
          data:'Incidental observation'
        },
        {
          value:'Trail camera',
          data:'Trail camera'
        },
        {
          value:'Harvest/trapped',
          data:'Harvest/trapped'
        },
        {
          value:'Roadkill',
          data:'Roadkill'
        },
        {
          value:'Other (comment below)',
          data:'Other (comment below)'
        }
      ];
    };

    var getStatus = function() {
      return [
        {
          value:'All',
          data:'All'
        },
        {
          value:'Approved',
          data:'Approved'
        },
        {
          value:'Pending',
          data:'Pending'
        },
        {
          value:'Denied',
          data:'Denied'
        },
      ];
    };  

    return {
      getMammals : getMammals,
      getMyMammals : getMyMammals,
      getMammalSpecies : getMammalSpecies,
      getDatum : getDatum,
      getAges : getAges,
      getSexual : getSexual,
      getHabitats : getHabitats,
      getMethods : getMethods,
      getStatus : getStatus
    }
})


.service('swineService',function($http,baseService,loginService){
    
    var getSwine = function(selectedMDisplay,selectedMSpecies,selectedMCounty,page) {

      var endpoint = baseService.baseurl + "/swines?page=";
      if (selectedMDisplay == "All") {
        endpoint += page;
      } else {
        endpoint += "0";
      }

      endpoint += "&species=" + selectedMSpecies;
      endpoint += "&county=" + selectedMCounty;

      return $http.get(endpoint);
      
    };

    var getMySwine = function(selectedSStatus,page){
      var endpoint = baseService.baseurl + "/swines/mine?uid="+loginService.userId+"&page="+page+"&approval="+selectedSStatus;
      return $http.get(endpoint);      
    };

    var getSwineSpecies = function(selectedMStatus,page) {            
      return $http.get(baseService.baseurl + "/swines/species");      
    };

    return {      
      getSwine : getSwine,
      getMySwine : getMySwine,
      getSwineSpecies : getSwineSpecies
    }
})

.controller('AppController', function($scope, $rootScope, $state, $ionicSideMenuDelegate, $ionicModal, $ionicLoading, loginService, baseService, mammalService) {

  $scope.isLogin = loginService.getLoginStatus();
  $scope.userType = loginService.userType;

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $rootScope.showLoading = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  $rootScope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if(toState.name == 'app.mammalobservation')
    {
      $scope.isMyMammalRecords = false;
      $scope.isMammalObservation = true;
      $scope.isSwineObservation = false;
      $scope.isMySwineRecords = false;
    }else if(toState.name == 'app.mymammalrecords'){
      $scope.isMyMammalRecords = true;
      $scope.isMammalObservation = false;
      $scope.isSwineObservation = false;    
      $scope.isMySwineRecords = false;
    }else if(toState.name == 'app.swineobservation'){
      $scope.isMyMammalRecords = false;
      $scope.isMammalObservation = false;
      $scope.isSwineObservation = true;
      $scope.isMySwineRecords = false;
    }else if(toState.name == 'app.myswinerecords'){
      $scope.isMyMammalRecords = false;
      $scope.isMammalObservation = false;
      $scope.isSwineObservation = false;
      $scope.isMySwineRecords = true;      
    }else{
      $scope.isMySwineRecords = false;
      $scope.isMyMammalRecords = false;
      $scope.isMammalObservation = false;
      $scope.isSwineObservation = false;
    }
  });

  //Start Filter Page Date
  $scope.displayers = baseService.getDisplayers();
  $scope.status = baseService.getStatus();

  $scope.filter = {selectedMDisplay: "All", selectedMSpecies: "All", selectedMCounty: "All"};

  mammalService.getMammalSpecies().then(function(data) {      
      data = data.data;
      if(data.success = "true")
      {
        $scope.species =  data.data;
      }
  }, function(error) {
    //Error
  });

  $scope.countries = baseService.getCounties();    
  //End Filter Page Date

  $ionicModal.fromTemplateUrl('template/mammalobservation-modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
  }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
  });  

  $ionicModal.fromTemplateUrl('template/myMammalRecords-modal.html', function($ionicModal) {
        $scope.myMammalModal = $ionicModal;
  }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('template/swineobservation-modal.html', function($ionicModal) {
        $scope.swinemodal = $ionicModal;
  }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('template/mySwineRecords-modal.html', function($ionicModal) {
        $scope.mySwinemodal = $ionicModal;
  }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.openSwineModal = function() {
    $scope.swinemodal.show();
  };

  $scope.openMySwineModal = function() {
    $scope.mySwinemodal.show();
  };

  $scope.openMyMammalModal = function() {
    $scope.myMammalModal.show();
  };
  
  $scope.filterMammal  = function(filter){
    $rootScope.getMammals(filter.selectedMDisplay,filter.selectedMSpecies,filter.selectedMCounty,1);
    $scope.modal.hide();
  };

  $scope.filterMyMammal  = function(filter){
    $rootScope.myMammals(filter.selectedMStatus,0);
    $scope.myMammalModal.hide();
  };
  
  $scope.filterSwine  = function(filter){
    console.log(filter);
    $rootScope.getSwines(filter.selectedMDisplay,filter.selectedMSpecies,filter.selectedMCounty,0);
    $scope.swinemodal.hide();
  };

  $scope.filterMySwine  = function(filter){
    $rootScope.mySwines(filter.selectedMStatus,0);
    $scope.mySwinemodal.hide();
  };

  

})
  
.controller("HomeController", function($scope,$ionicSlideBoxDelegate,galleryService) {
    $scope.gallery = [];
    galleryService.getGallery().then(function(data){
      console.log(data);
      temp = JSON.parse(data.data[0].content);
      console.log(temp);
      a = JSON.stringify(temp.captions);
      b = a.replace(/{/g, '');
      c = b.replace(/}/g, '');
      d = c.split(',');
      console.log(d[0].substr(1, d[0].length-5));
      for (var i = d.length - 1; i >= 0; i--) {
        $scope.gallery.push('http://pamammalatlas.com/images' + d[i].substr(1, d[i].length-5));        
      };
      // $timeout($scope.$apply(), 1000);
      $ionicSlideBoxDelegate.update();
      console.log($scope.gallery);
    }, function(err){
      console.log(err);
    })

    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
})
  
.controller("leftMenuController", function($scope) {

})
  
.controller("LoginController", function($scope,$ionicPopup,$state,loginService) {
    
    $scope.isLogin = loginService.getLoginStatus();  

    $scope.user = {
      username : '',
      password : '',
      userType : 'Both'
    }

    //Start Login
    $scope.login = function(user){

      if (user.username == '') {
        var alertPopup = $ionicPopup.alert({         
         template: 'Please Enter Username'
        }); 
        return;
      } 

      if (user.password == '') {
        var alertPopup = $ionicPopup.alert({         
         template: 'Please Enter Password'
        }); 
        return;
      }

      if (user.userType == '') {
        var alertPopup = $ionicPopup.alert({         
         template: 'Please Select User Type'
        }); 
        return;
      }


      loginService.login(user.username,user.password,user.userType).then(function(data) {

        data = data.data;        
        if (data.result=="true") {
          var userdata = data.user;          
          window.localStorage.setItem('loggedIn', true);
          window.localStorage.setItem('userType', user.userType);
          window.localStorage.setItem('userId', userdata.id);
          window.localStorage.setItem('user', JSON.stringify(userdata));

          window.location.reload(); 
          //$state.go('app.home');

        } else {          
          var alertPopup = $ionicPopup.alert({         
            template: "Username or password wasn't recognized"
          }); 
          return;
        }
        console.log(data);  

      }, function(error) {
        var alertPopup = $ionicPopup.alert({         
         template: "Username or password wasn't recognized'"
        }); 
        return;
      });      

    };
    //End Login 

    //Start Logout
    $scope.logout = function(){      
      $scope.isLogin = false;
      window.localStorage.removeItem('loggedIn');
      window.localStorage.removeItem('userType');
      window.localStorage.removeItem('userId');
      //$state.go('app.home');
      window.location.reload(); 
    };
    //End Logout
})

.controller("RegistrationController", function($scope) {
    
})

.controller("MammalRecordsController", function($scope) {
    
})

.controller("MyMammalRecordsController", function($scope,$rootScope,$ionicPopup,$ionicModal,$ionicActionSheet,$cordovaCamera,mammalService,baseService,loginService) {
    
    $scope.page = 0;

    $rootScope.myMammals = function(selectedMStatus,page){
      mammalService.getMyMammals(selectedMStatus,page).then(function(data) {
          console.log(data);
          data = data.data;      
          if(data.success = "true")
          {
            $scope.mymammals =  data.data;
          }
      }, function(error) {
          //Error
      }); 
    };

    $scope.myMammals('All',$scope.page);

    //Start next  
    $rootScope.next = function(){      
      $scope.page = $scope.page + 1;
      console.log($scope.page);
      mammalService.getMyMammals('All',$scope.page).then(function(data) {
        console.log(data);
        data = data.data;      
        if(data.success = "true")
        {
            $scope.mymammals =  data.data;
        }  
      }, function(error) {
        //Error
      }); 
    };
    //End next

    //Start prev
    $rootScope.prev = function(){
      if($scope.page > 0)
      {
        $scope.page = $scope.page - 1;
        console.log($scope.page);
        mammalService.getMyMammals('All',$scope.page).then(function(data) {
          console.log(data);
          data = data.data;      
          if(data.success = "true")
          {

              $scope.mymammals =  data.data;
          }  
        }, function(error) {
          //Error
        }); 
      }
    };
    //End prev


    $scope.showModal = function(mammal) {
        console.log(mammal);
        $scope.mammal = mammal;
        $scope.old_image = $scope.mammal.upload_image;
        var date = $scope.mammal.DateSpotted.split(' ');
        $scope.mammal.DateSpotted = date[0];
        
        $ionicModal.fromTemplateUrl('template/editmammal-modal.html', {
          scope: $scope,
          animation: 'slideInLeft'
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
          $scope.hideModal = function(){
            $scope.modal.hide();
            // Note that $scope.$on('destroy') isn't called in new ionic builds where cache is used
            // It is important to remove the modal to avoid memory leaks
            $scope.modal.remove();
          }
        });

    };



    $scope.show = function() {
       console.log("hi"); 
       // Show the action sheet
       var hideSheet = $ionicActionSheet.show({
         buttons: [{ text: '<b>Take a Photo</b>' },{ text: 'Choose Picture' }],       
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {
            
            if(index == 0)
            {
              var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
              };

              $cordovaCamera.getPicture(options).then(function(imageData) {
                
                $scope.mammal.upload_image = "data:image/jpeg;base64," + imageData
                
              }, function(err) {
                // error
              });
            }
            
            if(index == 1)
            {
              var options = {
                quality: 75,
                destinationType: 0,
                sourceType: 0,
                allowEdit: true,
                encodingType: 1,
                targetWidth: 400,
                targetHeight: 300,
                saveToPhotoAlbum: false
              };

              $cordovaCamera.getPicture(options).then(function(imageData) {
                
                $scope.mammal.upload_image = "data:image/jpeg;base64," + imageData
                
              }, function(err) {
                // error
              });
            }
            
            return true;
         }
       });

    };

     $scope.submit = function(mammal){
      
      if (mammal.mammal_species == "") {
        $ionicPopup.alert({template: 'Please Enter Mammal Species Observed'});         
        return;
      }  
      if (mammal.DateSpotted == "") {
        $ionicPopup.alert({template: 'Please Enter Date'});         
        return;
      }
      if (mammal.time_spotted == "") {
        $ionicPopup.alert({template: 'Please Enter Time'});         
        return;
      }
      if (mammal.county_of_mammal == "") {
        $ionicPopup.alert({template: 'Please Select County'});         
        return;
      }
      if (mammal.location == "") {
        $ionicPopup.alert({template: 'Please Enter Location'});         
        return;
      }

      var user = loginService.getUser();

      var data = new FormData();
      data.append("user_id", user.id);
      data.append("full_name", user.name);
      data.append("user_name", user.username);
      data.append("DateSpotted", mammal.DateSpotted);
      data.append("time_spotted", mammal.time_spotted);
      data.append("county_of_mammal", mammal.county_of_mammal);
      data.append("township", mammal.township);
      data.append("mammal_species", mammal.mammal_species);
      data.append("location", mammal.location);
      data.append("longitude", mammal.longitude);
      data.append("latitude", mammal.latitude);
      data.append("datum", mammal.datum);
      data.append("have_picture_of_mammal", mammal.have_picture_of_mammal);

      if(mammal.upload_image != $scope.old_image)
      {
        data.append("upload_image", mammal.upload_image);  
      }      

      data.append("you_take_picture", mammal.you_take_picture);
      data.append("description_of_mammal", mammal.description_of_mammal);
      data.append("age", mammal.age);
      data.append("sex", mammal.sex);
      data.append("habitat", mammal.habitat);
      data.append("habitat_detail", mammal.habitat_detail);
      data.append("technique", mammal.technique);
      data.append("technique_comment", mammal.technique_comment);
      data.append("terms_conditions", mammal.terms_conditions);

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          $rootScope.hideLoading();
          $ionicPopup.alert({template: 'Saved successfully.'});
        }
      });

      xhr.open("POST", baseService.baseurl+"/mammals/" + mammal.id + "?uid="+user.id);
      $rootScope.showLoading();
      xhr.send(data);      


    };
    

})

.controller("MammalObservationController", function($scope,$rootScope,mammalService) {
    
    $scope.page = 1;

    $rootScope.getMammals = function(selectedMDisplay,selectedMSpecies,selectedMCounty,page){
      mammalService.getMammals(selectedMDisplay,selectedMSpecies,selectedMCounty,page).then(function(data) {
        console.log(data);
          data = data.data;      
          if(data.success = "true")
          {
              $scope.mammals =  data.data;
          }  
      }, function(error) {
        //Error
      }); 
    };
    $rootScope.getMammals('All','All','All',$scope.page);

    //Start next  
    $rootScope.next = function(){      
      $scope.page = $scope.page + 1;
      console.log($scope.page);
      mammalService.getMammals('All','All','All',$scope.page).then(function(data) {
        console.log(data);
        data = data.data;      
        if(data.success = "true")
        {
            $scope.mammals =  data.data;
        }  
      }, function(error) {
        //Error
      }); 
    };
    //End next

    //Start prev
    $rootScope.prev = function(){
      if($scope.page > 0)
      {
        $scope.page = $scope.page - 1;
        console.log($scope.page);
        mammalService.getMammals('All','All','All',$scope.page).then(function(data) {
          console.log(data);
          data = data.data;      
          if(data.success = "true")
          {
              $scope.mammals =  data.data;
          }  
        }, function(error) {
          //Error
        }); 
      }
    };
    //End prev

    
})

.controller("MammalSubmissionController", function($scope,$ionicPopup,$ionicActionSheet,$cordovaCamera,mammalService,baseService,loginService) {
    
    var user = loginService.getUser();
    
    $scope.mammal = {
      user_id: loginService.userId,
      full_name: user.name,
      user_name: user.username,
      DateSpotted: "",
      time_spotted: "",
      county_of_mammal: "",
      township: "",
      mammal_species: "",
      location: "",
      longitude: "",
      latitude: "",
      datum: "",
      have_picture_of_mammal: "false",
      upload_image: undefined,
      you_take_picture: "false",
      description_of_mammal: "",
      age: "",
      sex: "",
      habitat: "",
      habitat_detail: "",
      technique: "",
      technique_comment: "",
      terms_conditions: "false",
    };    

    mammalService.getMammalSpecies().then(function(data) {
      
      data = data.data;
      if(data.success = "true")
      {
        $scope.species =  data.data;
      }
    }, function(error) {
      //Error
    });

    $scope.countries = baseService.getCounties();    
    $scope.datum = mammalService.getDatum();    
    $scope.ages = mammalService.getAges();
    $scope.sexual = mammalService.getSexual();
    $scope.habitats = mammalService.getHabitats();
    $scope.methods = mammalService.getMethods();

    $scope.submit = function(mammal){

      if (mammal.DateSpotted == "") {
        $ionicPopup.alert({template: 'Please Enter Date'});         
        return;
      }
      if (mammal.time_spotted == "") {
        $ionicPopup.alert({template: 'Please Enter Time'});         
        return;
      }
      if (mammal.county_of_mammal == "") {
        $ionicPopup.alert({template: 'Please Select County'});         
        return;
      }
      if(mammal.mammal_species == ''){
        $ionicPopup.alert({template: 'Please Mammal Species'});         
        return;
      }
      if (mammal.location == "") {
        $ionicPopup.alert({template: 'Please Enter Location'});         
        return;
      }
      if (mammal.location == "") {
        $ionicPopup.alert({template: 'Please Enter Location'});         
        return;
      }
      if (mammal.technique == "") {
        $ionicPopup.alert({template: 'Please Select Observation Method'});         
        return;
      }
      if (mammal.terms_conditions == "false") {
        $ionicPopup.alert({template: 'Please Select Terms and Conditions'});         
        return;
      }

      var user = loginService.getUser();

      var data = new FormData();
      data.append("user_id", user.id);
      data.append("full_name", user.name);
      data.append("user_name", user.username);
      data.append("DateSpotted", mammal.DateSpotted);
      data.append("time_spotted", mammal.time_spotted);
      data.append("county_of_mammal", mammal.county_of_mammal);
      data.append("township", mammal.township);
      data.append("mammal_species", mammal.mammal_species);
      data.append("location", mammal.location);
      data.append("longitude", mammal.longitude);
      data.append("latitude", mammal.latitude);
      data.append("datum", mammal.datum);
      data.append("have_picture_of_mammal", mammal.have_picture_of_mammal);
      data.append("upload_image", mammal.upload_image);
      data.append("you_take_picture", mammal.you_take_picture);
      data.append("description_of_mammal", mammal.description_of_mammal);
      data.append("age", mammal.age);
      data.append("sex", mammal.sex);
      data.append("habitat", mammal.habitat);
      data.append("habitat_detail", mammal.habitat_detail);
      data.append("technique", mammal.technique);
      data.append("technique_comment", mammal.technique_comment);
      data.append("terms_conditions", mammal.terms_conditions);

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          $rootScope.hideLoading();
          $ionicPopup.alert({template: 'Saved successfully.'});
        }
      });

      xhr.open("POST", baseService.baseurl+"/mammals?uid="+user.id);
      $rootScope.showLoading();
      xhr.send(data);      


    };

    $scope.show = function() {
     console.log("hi"); 
     // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: [{ text: '<b>Take a Photo</b>' },{ text: 'Choose Picture' }],       
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
          
          if(index == 0)
          {
            var options = {
              quality: 75,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 400,
              targetHeight: 300,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              
              $scope.mammal.upload_image = "data:image/jpeg;base64," + imageData
              
            }, function(err) {
              // error
            });
          }
          
          if(index == 1)
          {
            var options = {
              quality: 75,
              destinationType: 0,
              sourceType: 0,
              allowEdit: true,
              encodingType: 1,
              targetWidth: 400,
              targetHeight: 300,
              saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              
              $scope.mammal.upload_image = "data:image/jpeg;base64," + imageData
              
            }, function(err) {
              // error
            });
          }
          
          return true;
       }
     });


   };

})

.controller("EditMammalController", function($scope,$ionicPopup,$ionicActionSheet,$cordovaCamera,mammalService,baseService,loginService) {

    
})

.controller("SwineRecordsController", function($scope) {
    
})

.controller("MySwineRecordsController", function($scope,$rootScope,$ionicPopup,$ionicModal,$ionicActionSheet,$cordovaCamera,mammalService,swineService,baseService,loginService) {

    $scope.page = 0;

    $rootScope.mySwines = function(selectedMStatus,page){
      swineService.getMySwine(selectedMStatus,page).then(function(data) {          
          data = data.data;      
          if(data.success = "true")
          {
            $scope.myswinerecords =  data.data;
            console.log($scope.myswinerecords);
          }
      }, function(error) {
          //Error
      }); 
    };

    $scope.mySwines('All',$scope.page);

    //Start next
    $rootScope.next = function(){
      $scope.page = $scope.page + 1;
      swineService.getMySwine(selectedMStatus,page).then(function(data) {
        data = data.data;
        if(data.success = "true")
        {
            $scope.myswinerecords =  data.data;
        }
      }, function(error) {
        //Error
      }); 
    };
    //End next

    //Start prev
    $rootScope.prev = function(){
      if($scope.page > 0)
      {
        $scope.page = $scope.page - 1;        
        swineService.getMySwine(selectedMStatus,page).then(function(data) {          
          data = data.data;      
          if(data.success = "true")
          {

              $scope.myswinerecords =  data.data;
          }  
        }, function(error) {
          //Error
        }); 
      }
    };
    //End prev

    swineService.getSwineSpecies().then(function(data) {
      console.log(data);
      data = data.data;
      if(data.success = "true")
      {
        $scope.species =  data.data;
      }
    }, function(error) {
      //Error
    });

    $scope.showModal = function(mammal) {
        console.log(mammal);
        $scope.mammal = mammal;
        $scope.old_image = $scope.mammal.upload_image;
        var date = $scope.mammal.DateSpotted.split(' ');
        $scope.mammal.DateSpotted = date[0];
        
        $ionicModal.fromTemplateUrl('template/editswine-modal.html', {
          scope: $scope,
          animation: 'slideInLeft'
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
          $scope.hideModal = function(){
            $scope.modal.hide();
            // Note that $scope.$on('destroy') isn't called in new ionic builds where cache is used
            // It is important to remove the modal to avoid memory leaks
            $scope.modal.remove();
          }
        });

    };


    $scope.submit = function(mammal){

      if (mammal.swine_species == "") {
        $ionicPopup.alert({template: 'Please Enter Mammal Species Observed'});         
        return;
      }
      if (mammal.DateSpotted == "") {
        $ionicPopup.alert({template: 'Please Enter Date'});         
        return;
      }
      if (mammal.time_spotted == "") {
        $ionicPopup.alert({template: 'Please Enter Time'});         
        return;
      }
      if (mammal.county_of_mammal == "") {
        $ionicPopup.alert({template: 'Please Select County'});         
        return;
      }
      if (mammal.location == "") {
        $ionicPopup.alert({template: 'Please Enter Location'});         
        return;
      }
     

      var user = loginService.getUser();

      var data = new FormData();
      data.append("user_id", user.id);
      data.append("full_name", user.name);
      data.append("user_name", user.username);
      data.append("DateSpotted", mammal.DateSpotted);
      data.append("time_spotted", mammal.time_spotted);
      data.append("county_of_mammal", mammal.county_of_mammal);
      data.append("township", mammal.township);
      data.append("swine_species", mammal.swine_species);
      data.append("location", mammal.location);
      data.append("longitude", mammal.longitude);
      data.append("latitude", mammal.latitude);
      data.append("datum", mammal.datum);
      data.append("have_picture_of_mammal", mammal.have_picture_of_mammal);
      data.append("upload_image", mammal.upload_image);
      data.append("you_take_picture", mammal.you_take_picture);
      data.append("description_of_mammal", mammal.description_of_mammal);
      data.append("age", mammal.age);
      data.append("sex", mammal.sex);
      data.append("habitat", mammal.habitat);
      data.append("habitat_detail", mammal.habitat_detail);
      data.append("technique", mammal.technique);
      data.append("technique_comment", mammal.technique_comment);
      data.append("terms_conditions", mammal.terms_conditions);

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          $rootScope.hideLoading();
          $ionicPopup.alert({template: 'Saved successfully.'});
        }
      });

      xhr.open("POST", baseService.baseurl+"/swines/" + mammal.id + "?uid="+user.id);
      $rootScope.showLoading();
      xhr.send(data);      


    };

    $scope.show = function() {
        
       // Show the action sheet
       var hideSheet = $ionicActionSheet.show({
         buttons: [{ text: '<b>Take a Photo</b>' },{ text: 'Choose Picture' }],       
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {
            
            if(index == 0)
            {
              var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
              };

              $cordovaCamera.getPicture(options).then(function(imageData) {
                
                $scope.mammal.upload_image = "data:image/jpeg;base64," + imageData
                
              }, function(err) {
                // error
              });
            }

            if(index == 1)
            {
              var options = {
                quality: 75,
                destinationType: 0,
                sourceType: 0,
                allowEdit: true,
                encodingType: 1,
                targetWidth: 400,
                targetHeight: 300,
                saveToPhotoAlbum: false
              };

              $cordovaCamera.getPicture(options).then(function(imageData) {
                
                $scope.mammal.upload_image = "data:image/jpeg;base64," + imageData
                
              }, function(err) {
                // error
              });
            }
            
            return true;
         }
       });


     };  


    
})

.controller("SwineObservationController", function($scope,$rootScope,swineService) {

    $scope.page = 0;
    

    $rootScope.getSwines = function(selectedMDisplay,selectedMSpecies,selectedMCounty,page){

      swineService.getSwine(selectedMDisplay,selectedMSpecies,selectedMCounty,page).then(function(data) {
          data = data.data;
          console.log(data);
          if(data.success = "true")
          {
              $scope.swines =  data.data;
          }
      }, function(error) {
        //Error
      });        
    };
    $rootScope.getSwines('All','All','All',$scope.page);

    //Start next
    $rootScope.next = function(){
      $scope.page = $scope.page + 1;
      swineService.getSwine('All','All','All',$scope.page).then(function(data) {
        data = data.data;
        if(data.success = "true")
        {
            $scope.swines =  data.data;
        }
      }, function(error) {
        //Error
      }); 
    };
    //End next

    //Start prev
    $rootScope.prev = function(){
      if($scope.page > 0)
      {
        $scope.page = $scope.page - 1;        
        swineService.getSwine('All','All','All',$scope.page).then(function(data) {
          console.log(data);
          data = data.data;      
          if(data.success = "true")
          {

              $scope.swines =  data.data;
          }  
        }, function(error) {
          //Error
        }); 
      }
    };
    //End prev
    
})

.controller("SwineSubmissionController", function($scope,$rootScope,$ionicPopup,$ionicActionSheet,$cordovaCamera,mammalService,swineService,baseService,loginService) {
    
    var user = loginService.getUser();
    
    $scope.mammal = {
      user_id: loginService.userId,
      full_name: user.name,
      user_name: user.username,
      DateSpotted: "",
      time_spotted: "",
      county_of_mammal: "",
      township: "",
      swine_species: "",
      location: "",
      longitude: "",
      latitude: "",
      datum: "",
      have_picture_of_mammal: "false",
      upload_image: undefined,
      you_take_picture: "false",
      description_of_mammal: "",
      age: "",
      sex: "",
      habitat: "",
      habitat_detail: "",
      technique: "",
      technique_comment: "",
      terms_conditions: "false",
    };

    swineService.getSwineSpecies().then(function(data) {
      console.log(data);
      data = data.data;
      if(data.success = "true")
      {
        $scope.species =  data.data;
      }
    }, function(error) {
      //Error
    });

    $scope.countries = baseService.getCounties();    
    $scope.datum = mammalService.getDatum();    
    $scope.ages = mammalService.getAges();
    $scope.sexual = mammalService.getSexual();
    $scope.habitats = mammalService.getHabitats();
    $scope.methods = mammalService.getMethods();

    $scope.submit = function(mammal){

      if (mammal.swine_species == "") {
        $ionicPopup.alert({template: 'Please Enter Swine Species Observed'});         
        return;
      }

      if (mammal.DateSpotted == "") {
        $ionicPopup.alert({template: 'Please Enter Date'});         
        return;
      }
      if (mammal.time_spotted == "") {
        $ionicPopup.alert({template: 'Please Enter Time'});         
        return;
      }
      if (mammal.county_of_mammal == "") {
        $ionicPopup.alert({template: 'Please Select County'});         
        return;
      }
      if (mammal.location == "") {
        $ionicPopup.alert({template: 'Please Enter Location'});         
        return;
      }
      if (mammal.location == "") {
        $ionicPopup.alert({template: 'Please Enter Location'});         
        return;
      }
      if (mammal.technique == "") {
        $ionicPopup.alert({template: 'Please Select Observation Method'});         
        return;
      }
      if (mammal.terms_conditions == "false") {
        $ionicPopup.alert({template: 'Please Select Terms and Conditions'});         
        return;
      }

      var user = loginService.getUser();

      var data = new FormData();
      data.append("user_id", user.id);
      data.append("full_name", user.name);
      data.append("user_name", user.username);
      data.append("DateSpotted", mammal.DateSpotted);
      data.append("time_spotted", mammal.time_spotted);
      data.append("county_of_mammal", mammal.county_of_mammal);
      data.append("township", mammal.township);
      data.append("swine_species", mammal.swine_species);
      data.append("location", mammal.location);
      data.append("longitude", mammal.longitude);
      data.append("latitude", mammal.latitude);
      data.append("datum", mammal.datum);
      data.append("have_picture_of_mammal", mammal.have_picture_of_mammal);
      data.append("upload_image", mammal.upload_image);
      data.append("you_take_picture", mammal.you_take_picture);
      data.append("description_of_mammal", mammal.description_of_mammal);
      data.append("age", mammal.age);
      data.append("sex", mammal.sex);
      data.append("habitat", mammal.habitat);
      data.append("habitat_detail", mammal.habitat_detail);
      data.append("technique", mammal.technique);
      data.append("technique_comment", mammal.technique_comment);
      data.append("terms_conditions", mammal.terms_conditions);

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          $rootScope.hideLoading();
          $ionicPopup.alert({template: 'Saved successfully.'});
        }
      });

      xhr.open("POST", baseService.baseurl+"/swines?uid="+user.id);
      $rootScope.showLoading();
      xhr.send(data);      


    };

    $scope.show = function() {
        
       // Show the action sheet
       var hideSheet = $ionicActionSheet.show({
         buttons: [{ text: '<b>Take a Photo</b>' },{ text: 'Choose Picture' }],       
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {
            
            if(index == 0)
            {
              var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
              };

              $cordovaCamera.getPicture(options).then(function(imageData) {
                
                $scope.mammal.upload_image = "data:image/jpeg;base64," + imageData
                
              }, function(err) {
                // error
              });
            }

            if(index == 1)
            {
              var options = {
                quality: 75,
                destinationType: 0,
                sourceType: 0,
                allowEdit: true,
                encodingType: 1,
                targetWidth: 400,
                targetHeight: 300,
                saveToPhotoAlbum: false
              };

              $cordovaCamera.getPicture(options).then(function(imageData) {
                
                $scope.mammal.upload_image = "data:image/jpeg;base64," + imageData
                
              }, function(err) {
                // error
              });
            }
            
            return true;
         }
       });


     };

})

.controller("SiteController", function($scope) {
    
})

.controller("PictureController", function($scope,$cordovaCamera) {
      
      document.addEventListener("deviceready", function () {

        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true,
          correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          var image = document.getElementById('myImage');
          image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          // error
        });

      }, false);
      

})

.directive("ionMenu", function() {
  return {
    restrict : "E",
    templateUrl : "template/leftmenu.html"
  }
});
