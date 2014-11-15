define(['root'], function (root) {
	return {
		parse: function() {
			var xml = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
			xmlDoc = $.parseXML( xml ),
			$xml = $( xmlDoc ),
			$title = $xml.find( "title" );

			// Append "RSS Title" to #someElement
			root.append( $title.text() );

			// Change the title to "XML Title"
			$title.text( "XML Title" );

			// Append "XML Title" to #anotherElement
			root.append( " " + $title.text() );
		}

	};


})