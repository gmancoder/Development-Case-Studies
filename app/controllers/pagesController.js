var locomotive = require('locomotive')
  , Controller = locomotive.Controller;
var dynamics = require("services-dynamics");
var languages = require("functions-languages");

var pagesController = new Controller();

pagesController.main = function() {
  this.title = 'Home';
  this.pageimage = "/images/home.png";
  var self = this;
  dynamics.DynamicsToken().then(function(token) {
  	languages.GetLanguages(token).then(function(languageObject) {
	  	self.nav = languageObject;
	  	self.render();
	  });
  });
  
}

module.exports = pagesController;
