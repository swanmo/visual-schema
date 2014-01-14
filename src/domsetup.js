define(['jquery'], function($) {
	return {
		setup:function() {
			$('.collapser').on("click", function() {
				var $this = $(this);

				var thisEncountered = false;

				$this.parent().children().each(function(){
					var $current = $(this);
					if ($current) {}

					
				});




			});

		}

	};

});