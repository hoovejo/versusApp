define([], function () {
    return {
        teamSelectedButton: function (e, n) {
            e.view.header.find(".f-fran-button").removeClass("m-selected-btn");
            e.view.header.find(".f-oppo-button").removeClass("m-selected-btn");
            e.view.header.find(".f-rslt-button").removeClass("m-selected-btn");
            e.view.header.find(".f-dtls-button").removeClass("m-selected-btn");
            if (n.fran) {
				e.view.header.find(".f-fran-button").addClass("m-selected-btn");
			} else if (n.oppo) {
				e.view.header.find(".f-oppo-button").addClass("m-selected-btn");
			} else if (n.rslt) {
				e.view.header.find(".f-rslt-button").addClass("m-selected-btn");
			} else if (n.dtls) {
				e.view.header.find(".f-dtls-button").addClass("m-selected-btn");
			} else {
				e.view.header.find(".f-fran-button").addClass("m-selected-btn");
			}
        },
        playerSelectedButton: function (e, n) {
            e.view.header.find(".t-year-button").removeClass("m-selected-btn");
            e.view.header.find(".t-team-button").removeClass("m-selected-btn");
            e.view.header.find(".t-batt-button").removeClass("m-selected-btn");
            e.view.header.find(".t-pitc-button").removeClass("m-selected-btn");
            e.view.header.find(".t-rslt-button").removeClass("m-selected-btn");
            e.view.header.find(".t-dtls-button").removeClass("m-selected-btn");
            if (n.year) {
				e.view.header.find(".t-year-button").addClass("m-selected-btn");
			} else if (n.team) {
				e.view.header.find(".t-team-button").addClass("m-selected-btn");
			} else if (n.batt) {
				e.view.header.find(".t-batt-button").addClass("m-selected-btn");
			} else if (n.pitc) {
				e.view.header.find(".t-pitc-button").addClass("m-selected-btn");
			} else if (n.rslt) {
				e.view.header.find(".t-rslt-button").addClass("m-selected-btn");
			} else if (n.dtls) {
				e.view.header.find(".t-dtls-button").addClass("m-selected-btn");
			} else {
				e.view.header.find(".t-year-button").addClass("m-selected-btn");
			}
        },
        resetJsScroller: function (e) {
			if(e.view.scroller) {e.view.scroller.reset();} //reset the scroller
        }
	}
});
