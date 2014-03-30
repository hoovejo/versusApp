define(["kendo", "app/data/yearsData", "app/common", "app/config"], function (kendo, yearsData, common, config) {
    
    var viewModel = (function () {
        
        var tap = function (e) {
            var itemUID = $(e.touch.currentTarget.parentNode).data("uid");
            if(itemUID !== undefined && !app.getIsLoading()) {
                config.params.yearId = yearsData.data.dataSource.getByUid(itemUID).id;
                app.application.navigate("views/teams.html");
            }
        }
        return {
            tap: tap
        };
        
    }());
    
    return {
        init: function (e) {
            e.sender.element.find("#yearsListView").kendoMobileListView({
                dataSource: yearsData.data.dataSource,
                template: $("#yearsListViewTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".t-year-button").data("kendoMobileButton").bind("click", function() {
				app.application.navigate("views/years.html", "slide reverse");
            });            
        },
        show: function (e) {
            common.playerSelectedButton(e, { year:true } );
			config.playerFeature.currentPageId = 0;

            var data = yearsData.data;
            if(data.dataSource.total === 0){
                data.dataSource.read();
    			common.resetJsScroller(e);
            }
        },
        viewModel: viewModel
    }
});