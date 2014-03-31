define(["kendo", "app/data/franchiseDrillDownData", "app/common", "app/config"], function (kendo, franchiseDrillDownData, common, config) {
    
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
            e.view.element.find("#franchiseDrillDownListView").kendoMobileListView({
                autoBind: false,
                dataSource: franchiseDrillDownData.data.dataSource,
                template: $("#franchiseDrillDownTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".f-dtls-button").data("kendoMobileButton").bind("click", function() {
                if (config.params.fDrillDown) {
                    app.application.navigate("views/franchiseDrillDown.html");
                }
            });            
        },
        show: function (e) {
            common.teamSelectedButton(e, { dtls:true } );
			config.teamFeature.currentPageId = 3;

            if (helper.checkLoad(config.params.fDrillDown)) {
                var data = franchiseDrillDownData.data,
                	urlBase = config.remoteServices.franchiseYearSearch;
    			//data.dataSource.data({});//clear out last results
                data.params = config.params.fDrillDown;
                data.svcUrl = urlBase + data.params +'.json';
                data.dataSource.read();
    			common.resetJsScroller(e);
			}
        }
    }
});