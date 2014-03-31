define(["kendo", "app/data/playerDrillDownData", "app/common", "app/config"], function (kendo, playerDrillDownData, common, config) {

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
    
    return {
         init: function (e) {
            var view = e.view;
            view.element.find("#playerDrillDownListView").kendoMobileListView({
                autoBind: false,
                dataSource: playerDrillDownData.data.dataSource,
                template: $("#playerDrillDownTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".t-dtls-button").data("kendoMobileButton").bind("click", function() {
                if (config.params.pDrillDown) {
                    app.application.navigate("views/playerDrillDown.html");
                }
            });            
        },
        show: function (e) {
            common.playerSelectedButton(e, { dtls:true } );
			config.teamFeature.currentPageId = 5;

            if (helper.checkLoad(config.params.pDrillDown)) {
                var data = playerDrillDownData.data,
                	urlBase = config.remoteServices.playerPlayerYearSearch;
    			//data.dataSource.data({});
                data.params = config.params.pDrillDown;
                data.svcUrl = urlBase + data.params +'.json';
                data.dataSource.read();
    			common.resetJsScroller(e);
			}
        }
    }
});