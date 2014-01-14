define(['entry', 'parseUtils'], function(Entry, parseUtils) {
	return {
		roots: [],
		add: function(node, parent) {
			var tagName = node.nodeName;
			var e = new Entry(parseUtils.parsePrefix(tagName),
				parseUtils.parseName(tagName), node, parent);
			if (!parent) {
				this.roots.push(e);
			} else {

				parent.addChild(e);
			}
			return e;
		}
	}
})