define(["jQuery", "kendo", 
		"app/viewmodels/franchises",
		"app/viewmodels/opponents",
		"app/viewmodels/franchiseResults",
		"app/viewmodels/franchiseDrillDown",
		"app/viewmodels/years",
		"app/viewmodels/teams",
		"app/viewmodels/batters",
		"app/viewmodels/pitchers",
		"app/viewmodels/playerResults",
		"app/viewmodels/playerDrillDown"
	], 
	function ($, kendo, franchisesView, opponentsView, franchiseResultsView, franchiseDrillDownView, 
				yearsView, teamsView, battersView, pitchersView, playerResultsView, playerDrillDownView) {

        var _kendoApplication;
			_isLoading = false,
			_that = this;
     
        return {
            init: function (app) {
				// Handle "deviceready" event
                document.addEventListener('deviceready', function() {
                    navigator.splashscreen.hide();
                }, false);
                window.addEventListener('error', function (e) {
                    e.preventDefault();
                    var message = e.message + "' from " + e.filename + ":" + e.lineno;
                    _that.app.showAlert(message, 'Error occured');
                    return true;
                });
                
                var os = kendo.support.mobileOS,  
					statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';
                
                _kendoApplication = new kendo.mobile.Application(document.body, { 
                    layout: 'default-layout', 
                    initial: 'default-view',
                    transition: 'slide',
                    statusBarStyle: statusBarStyle
                });
                app.application = _kendoApplication;
            },
            views: {
                franchises: franchisesView,
                opponents: opponentsView,
                franchiseResults: franchiseResultsView,
                franchiseDrillDown: franchiseDrillDownView,
                years: yearsView,
                teams: teamsView,
                batters: battersView,
                pitchers: pitchersView,
                playerResults: playerResultsView,
                playerDrillDown: playerDrillDownView
            },
            showAlert: function(message, title, callback) {
                navigator.notification.alert(message, callback || function () {
                }, title, 'OK');
        	},
            checkOnline: function() {
                if(navigator.connection.type !== Connection.NONE) return true;
                _that.app.showAlert("No network connection available. Please try again when online.", "Network");
                return false;
            },
            startRemote: function () {
                // we have an app instance and are not already showing the loading
    			if(_kendoApplication && !_isLoading) { 
                    _kendoApplication.showLoading(); 
                    _isLoading = true; 
                }
            },
            endRemote: function () {
                if(_kendoApplication && _isLoading) {
                    setTimeout(function(){
                    	_kendoApplication.hideLoading(); 
                    	_isLoading = false;
					}, 100);
                }
            },
            getIsLoading: function(){ return _isLoading; },
            helper: {
                // Date formatter. Return date in d.m.yyyy format
                formatDate: function (dateString) {
                    var months = [
                        'Jan', 'Feb', 'Mar',
                        'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep',
                        'Oct', 'Nov', 'Dec'
                    ];
                    var date = new Date(dateString);
                    var year = date.getFullYear();
                    var month = months[ date.getMonth() ];
                    var day = date.getDate();

                    return month + ' ' + day + ', ' + year;
                }
            }
    }
});


