 angular.module('Enes')
 	.controller('schoolrecordTypeAdminCtrl', function(schoolrecordTypeFactory,$scope, Notification, $window){
 		$scope.records = {};
 		$scope.recordtype = {};
        $scope.entityrecord = [];
        $scope.entity = {};
        $scope.base;

        // Fileds for search in user model
        $scope.availableSearchParams = [
            { key: "name", name: "Name", placeholder: "Name..." },
            { key: "description", name: "Description", placeholder: "Description..." },
            { key: "date", name: "Date", placeholder: "Date..." }//,restrictToSuggestedValues: true, suggestedValues: ['admin', 'student', 'employee'] }
        ];

        $scope.init = function(){
            schoolrecordTypeFactory.getInfo()
            .success(function(data){
                $scope.entityrecord = data;
            })
            .error(function(error){
                Notification.error({
                    message: '<b>Error!</b> Problemas de conexión',
                    title: '<b>Error</b>',
                    delay: 5000});
            });
        }

        $scope.delete = function(entity){
            $scope.entity = entity;
            $('#cancel').modal('show');
        }

        $scope.showView = function(entity){
            $scope.entity = entity;
           $scope.base = atob(entity.record);

            var file = new Blob([$scope.base], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);

            //$scope.base = '<embed src="data:application/pdf;base64,' + entity.record + '" type="application/pdf" width="200" height="200"></embed>';
            //console.log(base);
            //entity.base = base;
           // var pdfName = 'data:application/pdf;base64,' + entity.record;
            //var embeddedPdf = document.getElementById('printablePdf');
            //embeddedPdf.setAttribute('src', pdfName);
            //$scope.printDocument(embeddedPdf);
            $('#showView').modal('show');
        }


        $scope.printDocument = function() {
      var test = document.getElementById('printablePdf');
      if (typeof document.getElementById('printablePdf').print === 'undefined') {

        setTimeout(function(){$scope.printDocument();}, 1000);

      } else {

        var x = document.getElementById('printablePdf');
        x.print();
      }
    };

        $scope.deleteAction = function(paramInt){
            schoolrecordTypeFactory.delete(paramInt)
            .success(function(data){
                Notification.success({
                message: 'Se ha eliminado la constancia correctamente.',
                delay: 5000});
                setTimeout('document.location.reload()',3000);
            })
            .error(function(error){

            });
        }
 		
 		$scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
            Notification.success({
                message: 'Archivo adjuntado correctamente.',
                delay: 5000});
            console.log($scope.records);
        };

        $scope.submitForm = function(isValid) {
            if (isValid) {
            }
        };

        $scope.saveRecord = function(){
        	console.log($scope.records);
        	console.log($scope.recordtype);
        	$scope.recordtype.record = $scope.records;
        	console.log($scope.recordtype);
            schoolrecordTypeFactory.save($scope.recordtype)
            .success(function(data){
            	Notification.success({
            		message: 'La constancia se ha creado correctamente.',
            		delay: 5000});
            })
            .error(function(error){
            	Notification.error({
            		message: '<b>Error!</b> Problemas de conexión',
            		title: '<b>Error</b>',
            		delay: 5000});
            });
        }
 	});