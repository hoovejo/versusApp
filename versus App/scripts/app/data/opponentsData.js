define(["kendo", "app/config"], function (kendo, config) {

    var _data = kendo.data.ObservableObject.extend({
        dataSource: null,
        sharedData: [],
        franchiseId: '',        
        init: function () {
            var that = this,
                dataSource;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            var _onRequestStart = function (e) {
                if ( !app.checkOnline() ) {
                    e.preventDefault();
                    return false;
                } else {
        			app.startRemote();                    
                }
            };
            var _onRequestEnd = function (e) {
                var length = (e.response) ? e.response.length : 0;
				console.log('opponents datasource local finished. Length='+ length +'Type='+ e.type);
            };
            dataSource = new kendo.data.DataSource({
                requestStart: _onRequestStart,
                requestEnd: _onRequestEnd,
                transport: {
                    read: function(options) {
                        options.success(that.sharedData);
                    }
                }
            });

            that.set("dataSource", dataSource);
        }    
    });    
            
    return {
        data: new _data()
    }

});