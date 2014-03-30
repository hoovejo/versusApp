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
                var length = (e.response) ? e.response.rows.length : 0;
				console.log('player drilldown remote finished. Length='+ length +'Type='+ e.type);
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
                },
                group: { field: "Game_Date", dir: "desc" },
                schema: {
					data: function(data) {
                        //Some manipulation, could fix the back-end
                        data.rows.forEach(function(row){
                            row['Game_Date'] = app.helper.formatDate(row['Game Date']);
                            delete row['Game Date'];
                            row['two_b'] = row['2B'];
                            delete row['2B'];
                            row['three_b'] = row['3B'];
                            delete row['3B'];
                        });
                        return data.rows;
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