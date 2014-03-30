define(["kendo", "app/config"], function (kendo, config) {

    var _data = kendo.data.ObservableObject.extend({
        dataSource: null,
        svcUrl: '',
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
				console.log('team remote finished. Length='+ length +'Type='+ e.type);
            };
            dataSource = new kendo.data.DataSource({
                requestStart: _onRequestStart,
                requestEnd: _onRequestEnd,
                transport: {
                    read: {
                        url: function(options) {
                            return that.svcUrl;
						},
                        dataType: "json",
                        data: {
                            Accept: "application/json"
                        }
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