define([], function () {
    return {
        remoteServices: {
            jsonSuffix: '.json',
            franchises: 'http://versus.skeenshare.com/franchises.json',
            franchiseSearch: 'http://versus.skeenshare.com/search/franchise_vs_franchise/',
            franchiseYearSearch: 'http://versus.skeenshare.com/search/franchise_vs_franchise_by_year/',
            opponentsForBatter: 'http://versus.skeenshare.com/search/opponents_for_batter/',
            playerPlayerSearch: 'http://versus.skeenshare.com/search/player_vs_player/',
            playerPlayerYearSearch: 'http://versus.skeenshare.com/search/player_vs_player_by_year/',
            rosterSearch: 'http://versus.skeenshare.com/roster_for_team_and_year/',
            teams: 'http://versus.skeenshare.com/teams/',
            years: 'http://versus.skeenshare.com/years.json'
        },
        teamFeature: { currentPageId: 0},
        playerFeature: { currentPageId: 0},
        params:{
            franchiseId: '',
            opponentId: '',
            fResultSearch: '',
            fDrillDown: '',
            yearId: '',
            teamIdSlashYearId: '',
            batterId: '',
            batterIdSlashYearId: '',
            pitcherParams: '',
            pResultSearch: '',
            pDrillDown: ''
        }
	}
});
