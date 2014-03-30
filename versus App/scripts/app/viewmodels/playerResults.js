define(["kendo", "app/data/playerResultsData", "app/common", "app/config"], function (kendo, playerResultsData, common, config) {

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
                var model = playerResultsData.data.dataSource.getByUid(itemUID);
                config.params.pDrillDown = model.drilldown();
                app.application.navigate("views/playerDrillDown.html");
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
            e.sender.element.find("#playerResultsListView").kendoMobileListView({
                autoBind: false,
                dataSource: playerResultsData.data.dataSource,
                template: $("#playerResultsListViewTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".t-rslt-button").data("kendoMobileButton").bind("click", function() {
                if (config.params.pResultSearch) {
                    if (config.playerFeature.currentPageId < 4) {
	                    app.application.navigate("views/playerResults.html");
                    } else {
	                    app.application.navigate("views/playerResults.html", "slide reverse");
                    }
                }
            });
        },
        show: function (e) {
            common.playerSelectedButton(e, { rslt:true } );
			config.playerFeature.currentPageId = 4;

            if (helper.checkLoad(config.params.pResultSearch)) {
				//setTimeout(function(){
                    var data = playerResultsData.data,
                        params = config.params.pResultSearch,
                        urlBase = config.remoteServices.playerPlayerSearch;
    				data.dataSource.data({});
                    data.champSlashOppo = params;//aybae001/beckj002
                    data.svcUrl = urlBase + params +'.json';
                	data.dataSource.read();
        			common.resetJsScroller(e);
				//}, 100);
            }
        }, 
        viewModel: viewModel
    }
});