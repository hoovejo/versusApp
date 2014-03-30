define(["kendo", "app/data/franchisesData", "app/common", "app/config"], function (kendo, franchisesData, common, config) {

    var viewModel = (function () {

        var _nav = function(e){
            var itemUID = $(e.touch.currentTarget.parentNode).data("uid");
            if(itemUID !== undefined && !app.getIsLoading()) {
                var model = franchisesData.data.dataSource.getByUid(itemUID);
                config.params.franchiseId = model.retro_id;
                app.application.navigate("views/opponents.html");
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
        
    })();
    
    return {
        init: function (e) {
            e.sender.element.find("#franchisesListView").kendoMobileListView({
                dataSource: franchisesData.data.dataSource,
                template: $("#franchisesListViewTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".f-fran-button").data("kendoMobileButton").bind("click", function() {
				app.application.navigate("views/franchises.html", "slide reverse");
            });            
        },
        show: function (e) {
            common.teamSelectedButton(e, { fran:true } );
			config.teamFeature.currentPageId = 0;

            var data = franchisesData.data;
            if(data.dataSource.total === 0){
                data.dataSource.read();
    			common.resetJsScroller(e);
            }
        },
        viewModel: viewModel
    }
});