var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var languages = require("functions-languages");
var dynamics = require('services-dynamics');
var studies = require('functions-studies');


var languagesController = new Controller();

languagesController.index = function() {
	var language_id = this.param('id');
 	var self = this;
	dynamics.DynamicsToken().then(function(token) {	
		languages.GetLanguages(token).then(function(languageObject) {
			self.nav = languageObject;
			for(var tidx = 0; tidx < languageObject.length; tidx ++)
			{
				if(languageObject[tidx]['ID'] == language_id)
				{
					self.pageimage = '/images/' + languageObject[tidx]['Folder'] + '.png';
					self.title = languageObject[tidx]['Title'];
					break;
				}
			}
			studies.GetStudiesByType(token, language_id).then(function(studies) {
				self.studies = studies;
				self.render();
			});
			
		});
	});
}

module.exports = languagesController;

