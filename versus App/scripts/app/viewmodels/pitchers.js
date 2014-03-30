define(["kendo", "app/data/pitchersData", "app/common", "app/config"], function (kendo, pitchersData, common, config) {

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
        
        var tap = function (e) {
            var itemUID = $(e.touch.currentTarget.parentNode).data("uid");
            if(itemUID !== undefined && !app.getIsLoading()) {
                var model = pitchersData.data.dataSource.getByUid(itemUID);
                config.params.pResultSearch = config.params.batterId + '/' + model.retro_id;
                app.application.navigate("views/playerResults.html");
            }
        }
        return {
            tap: tap
        };
        
    }());
    
    return {
        init: function (e) {
            e.sender.element.find("#pitchersListView").kendoMobileListView({
                autoBind: false,
                dataSource: pitchersData.data.dataSource,
                template: $("#pitchersListViewTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".t-pitc-button").data("kendoMobileButton").bind("click", function() {
                if (config.params.batterIdSlashYearId) {
                    if (config.playerFeature.currentPageId < 3) {
	                    app.application.navigate("views/pitchers.html");
                    } else {
	                    app.application.navigate("views/pitchers.html", "slide reverse");
                    }    
                }
            });
        },
        show: function (e) {
            common.playerSelectedButton(e, { pitc:true } );
			config.playerFeature.currentPageId = 3;

            if (helper.checkLoad(config.params.batterIdSlashYearId)) {
                var data = pitchersData.data,
                    params = config.params.batterIdSlashYearId,
                    urlBase = config.remoteServices.opponentsForBatter;
                data.dataSource.data({});
                data.svcUrl = urlBase + params +'.json';
            	data.dataSource.read();
    			common.resetJsScroller(e);
            }
        }, 
        viewModel: viewModel
    }
});