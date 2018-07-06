// The code below borrowed from http://www.salsify.com/blog/data-binding-in-backbone-with-epoxy/1400

// Base Item View:
define([
  "apps/config/mixins/baseViewMixin",
	"marionette"
], function(baseViewMixins, Marionette) {
	  return Marionette.ItemView.extend(baseViewMixins);
});

