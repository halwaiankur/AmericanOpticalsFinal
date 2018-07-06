define(["marionette", "bootstrap"], function(Marionette) {
	Marionette.Region.Dialog = Marionette.Region.extend({
		onShow: function(view) {
			console.log(this.$el.modal("show"))
			this.$el.modal("show");
			console.log("Region Applied")
			//$('#modal-Region').on('hidden.bs.modal', function(e) {
				//$("body").addClass("modal-open");
			//});
		},
		
		closeDialog: function() {
			this.close();
			this.$el.dialog("destroy");
		}
	});
	return Marionette.Region.Dialog;
});