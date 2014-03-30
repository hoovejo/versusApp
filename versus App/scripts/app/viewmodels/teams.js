define(["kendo", "app/data/teamsData", "app/common", "app/config"], function (kendo, teamsData, common, config) {

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
                var model = teamsData.data.dataSource.getByUid(itemUID);
                config.params.teamIdSlashYearId = model.team_id + '/' + model.year_id;
                app.application.navigate("views/batters.html");
            }
        }
        return {
            tap: tap
        };
        
    }());
    
    return {
        init: function (e) {
            e.sender.element.find("#teamsListView").kendoMobileListView({
                autoBind: false,
                dataSource: teamsData.data.dataSource,
                template: $("#teamsListViewTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".t-team-button").data("kendoMobileButton").bind("click", function() {
                if(config.params.yearId){
                    if (config.playerFeature.currentPageId < 1) {
	                    app.application.navigate("views/teams.html");
                    } else {
	                    app.application.navigate("views/teams.html", "slide reverse");
                    }
                }
            });
        },
        show: function (e) {
            common.playerSelectedButton(e, { team:true } );
			config.playerFeature.currentPageId = 1;

            if (helper.checkLoad(config.params.yearId)) {
                var data = teamsData.data,
                    yearId = config.params.yearId,
                    urlBase = config.remoteServices.teams;
                data.dataSource.data({});
                data.svcUrl = urlBase + yearId +'.json';
            	data.dataSource.read();
    			common.resetJsScroller(e);
            }
        },
        viewModel: viewModel
    }
});