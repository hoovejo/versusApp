define(["kendo", "app/data/franchiseResultsData", "app/common", "app/config"], function (kendo, franchiseResultsData, common, config) {

    var _oldParams = '';
	var helper = (function () {
        var checkLoad = function (newParams) {
            if(newParams !== _oldParams){
                _oldParams = newParams;
                return true;
            }
            return false;
        }        
        return {
            checkLoad: checkLoad,
        };        
    }());
    
    var viewModel = (function () {
        
        var _nav = function(e){
			var itemUID = $(e.touch.currentTarget.parentNode).data("uid");
            if(itemUID !== undefined && !app.getIsLoading()) {
                var model = franchiseResultsData.data.dataSource.getByUid(itemUID);
                config.params.fDrillDown = model.drilldown();
                app.application.navigate("views/franchiseDrillDown.html");
            }
        };

        var tap = function (e) {
            _nav(e);
        };
        var touchStart = function (e){
            _nav(e);
        };
        
        return {
            tap: tap,
            touchStart: touchStart
        };
        
    }());
    
    return {
        init: function (e) {
            console.log(e.view.applicationNativeScrolling);
            e.sender.element.find("#franchiseResultsListView").kendoMobileListView({
                autoBind: false,
                dataSource: franchiseResultsData.data.dataSource,
                template: $("#franchiseResultsListViewTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".f-rslt-button").data("kendoMobileButton").bind("click", function() {
                if (config.params.fResultSearch) {
                    if (config.teamFeature.currentPageId < 2) {
	                    app.application.navigate("views/franchiseResults.html");
                    } else {
	                    app.application.navigate("views/franchiseResults.html", "slide reverse");
                    }
                }
            });            
        },
        show: function (e) {
            common.teamSelectedButton(e, { rslt:true } );
			config.teamFeature.currentPageId = 2;
			
			if (helper.checkLoad(config.params.fResultSearch)) {
				//setTimeout(function(){
                    var data = franchiseResultsData.data,
                        params = config.params.fResultSearch,
                        urlBase = config.remoteServices.franchiseSearch;
                    data.dataSource.data({});//clear out last results
                    data.champSlashOppo = params;//ATL/BAL
                    data.svcUrl = urlBase + params +'.json';
                	data.dataSource.read();
        			common.resetJsScroller(e);
				//}, 100);
            }
		}, 
        viewModel: viewModel
    }
});