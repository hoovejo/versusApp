define(["kendo", "app/data/battersData", "app/common", "app/config"], function (kendo, battersData, common, config) {
 
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
                var model = battersData.data.dataSource.getByUid(itemUID);
                config.params.batterId = model.retro_player_id;
                config.params.batterIdSlashYearId = model.retro_player_id +'/'+ config.params.yearId;
                app.application.navigate("views/pitchers.html");
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
            e.sender.element.find("#battersListView").kendoMobileListView({
                autoBind: false,
                dataSource: battersData.data.dataSource,
                template: $("#battersListViewTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".t-batt-button").data("kendoMobileButton").bind("click", function() {
                if(config.params.teamIdSlashYearId){
                    if (config.playerFeature.currentPageId < 2) {
	                    app.application.navigate("views/batters.html");
                    } else {
	                    app.application.navigate("views/batters.html", "slide reverse");
                    }                    
                }
            });
        },
        show: function (e) {
            common.playerSelectedButton(e, { batt:true } );
			config.playerFeature.currentPageId = 2;

            if (helper.checkLoad(config.params.teamIdSlashYearId)) {
                var data = battersData.data,
                    params = config.params.teamIdSlashYearId,
                    urlBase = config.remoteServices.rosterSearch;
                data.dataSource.data({});
                data.svcUrl = urlBase + params +'.json';
            	data.dataSource.read();
    			common.resetJsScroller(e);
            }
        },
        viewModel: viewModel
    }
});