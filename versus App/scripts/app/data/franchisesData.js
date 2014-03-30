define(["kendo", "app/data/opponentsData", "app/config"], function (kendo, opponentsData, config) {

    var _data = kendo.data.ObservableObject.extend({
        dataSource: null,
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
				console.log('franchises.json remote finished. Length='+ length +'Type='+ e.type);
            };
            dataSource = new kendo.data.DataSource({
                requestStart: _onRequestStart,
                requestEnd: _onRequestEnd,
                transport: {
                    read: {
                        url: function(options) {
                            return config.remoteServices.franchises;
						},
                        dataType: "json",
                        data: {
                            Accept: "application/json"
                        }
                    }
                },
                schema: {
                    total: function (response){
                        return response.length;
                    },
                    data: function(data) {
                        data.forEach(function(row){
                            opponentsData.data.sharedData.push(row);
                        });
                        return data;
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