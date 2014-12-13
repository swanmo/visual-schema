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
				$("#inputRow").slideDown(resizeBox);
				$("#showXsd").show();
			});

			var resizeBox = function() {
				var proposedHeight = $(window).height() - 240;
				if (proposedHeight < 250) {
					proposedHeight = 250;
				}
			  	$('#xsdContent').height(proposedHeight);
			}
			resizeBox();
			$(window).resize(resizeBox);
		}
	};
});
