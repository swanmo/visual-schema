define(['jquery', 'xsd', 'init'], function($, xsd, init) {
	return {
		setup:function() {
			init.setDefaults();

			$("#showXsd").on("click", function() {
				xsd.show($("#xsdContent").val());
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