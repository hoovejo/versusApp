define(["kendo", "app/config"], function (kendo, config) {

    var _data = kendo.data.ObservableObject.extend({
        dataSource: null,
        svcUrl: '',
        champSlashOppo: '',
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
				console.log('player results remote finished. Length='+ length +'Type='+ e.type);
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
                group: { field: "year", dir: "desc" },
                schema: {
					data: function(data) {
                        //Some manipulation, could fix the back-end
                        data.rows.forEach(function(row){
                            row['two_b'] = row['2B'];
                            delete row['2B'];
                            row['three_b'] = row['3B'];
                            delete row['3B'];
                            row.drilldown = function () {
                                return that.champSlashOppo + '/' + this.year + '/' + this.Type;
                            };
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