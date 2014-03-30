define(["kendo", "app/data/opponentsData", "app/common", "app/config"], function (kendo, opponentsData, common, config) {

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
                var model = opponentsData.data.dataSource.getByUid(itemUID);
                config.params.opponentId = model.retro_id;
                config.params.fResultSearch = config.params.franchiseId + '/' + model.retro_id;
                app.application.navigate("views/franchiseResults.html");
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
            e.view.element.find("#opponentsListView").kendoMobileListView({
                autoBind: false,
                dataSource: opponentsData.data.dataSource,
                template: $("#opponentsListViewTemplate").html(),
                dataBound: function (e) { 
					app.endRemote();
				}
            });
            e.view.header.find(".f-oppo-button").data("kendoMobileButton").bind("click", function() {
                if (config.params.franchiseId) {
                    if (config.teamFeature.currentPageId < 1) {
	                    app.application.navigate("views/opponents.html");
                    } else {
	                    app.application.navigate("views/opponents.html", "slide reverse");
                    }
                }
            });
        },
        show: function (e) {
            common.teamSelectedButton(e, { oppo:true } );
			config.teamFeature.currentPageId = 1;
            
            if (helper.checkLoad(config.params.franchiseId)) {
				setTimeout(function(){
                    var filter = { field: "retro_id", operator: "neq", value: config.params.franchiseId };
                    opponentsData.data.dataSource.filter( filter );
                    opponentsData.data.dataSource.read();
	    			common.resetJsScroller(e);
				}, 100);
            }
        }, 
        viewModel: viewModel
    }
});