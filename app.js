var app = angular.module("App", []);

app.controller("Ctrl", function($scope, $http)
{    
    function initVar()
    {
        $scope.fileJSON = "data.json";        ;
        $scope.listOfTrans = JSON.parse(localStorage.getItem('trans')); 
        $scope.lenghtTrans = 0;
        $scope.index = 1;
    }   
    
    initVar();
    init();   
    
    $scope.viewTrans = function(selected)
    {               
        if(selected)
        { 
            if($scope.listOfTrans)
            {
                if($scope.index < $scope.lenghtTrans)
                {
                    $scope.currentValue = $scope.listOfTrans[$scope.index];
                    $scope.index++;
                }
                else
                {
                    $scope.index = 1;
                    $scope.currentValue = $scope.listOfTrans[0];
                }
            }
            else
            {
                init();
            }           
        }
    };
   
   function init()
   {  localStorage.clear();
       if (!$scope.listOfTrans) 
       {
            $http.get($scope.fileJSON).success
            (
                function (data) 
                {
                    $scope.listOfTrans = data.trans;                    
                    $scope.lenghtTrans = $scope.listOfTrans.length;                    
                    //localStorage.setItem( 'trans', JSON.stringify(data.trans));  
                    if($scope.listOfTrans)
                    {
                        $scope.currentValue = $scope.listOfTrans[0];                                             
                    }
                    else
                    {
                        alert("data.json is Empty!!!")
                    }
                }
            );  
       }  
       else
       {
           $scope.lenghtTrans = $scope.listOfTrans.length;           
       }        
    }
  }            
);
