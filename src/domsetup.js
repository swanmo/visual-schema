define(['jquery', 'xsd', 'init', 'root'], function($, xsd, init, $root) {
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

				$("#headRow").addClass("closed").removeClass("semi-open");


				$("#inputRow").slideUp(function() {
					$("#leftie").slideToggle("fast");
				});

				$(this).hide();

				$root.show();
				xsd.show($("#xsdContent").val());
			});

			$("#undo").on("click", function() {
				$root.hide();
				$("#leftie").slideToggle("fast");
				$("#headRow").addClass("semi-open").removeClass("closed");
				$("#inputRow").slideDown();
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
