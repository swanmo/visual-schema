define(['jquery', 'xsd', 'init'], function($, xsd, init) {
	return {
		setupButtons:function() {
			$("#optXsd").on("click", function() {
				window.location.href="index.html";
			});
			$("#optSettings").on("click", function() {
				window.location.href="settings.htm";
			});
			$("#optAbout").on("click", function() {
				window.location.href="about.htm";
			});
		},
		setup:function() {
			this.setupButtons();
			init.setDefaults();

			$("#showXsd").on("click", function() {
				xsd.show($("#xsdContent").val());
				$("#headRow").slideUp(800);
				$("#inputRow").slideUp();
				
				$(this).hide();
				$("#back").show();
			});

			$("#back").on("click", function() {
				$("#inputRow").slideDown();
				$(this).hide();
				$("#showXsd").show();
			});

			$('.collapser').on("click", function() {
				var $this = $(this);

				var thisEncountered = false;

				$this.parent().children().each(function(){
					var $current = $(this);
				});
			});
		}
	};
});