define(['parseUtils', 'logger'], function(parseUtils, logger) {
	var getMapByName = function(roots) {
		var mapOfNames = {};
		for (var i = 0; i < roots.length; i++) {
			if (roots[i].attrs && roots[i].attrs.name) {
				mapOfNames[parseUtils.parseName(roots[i].attrs.name)] = roots[i];

			}
		}
		return mapOfNames;
	};

	return {
		xsdNamespacePrefix: [],
		targetNamespacePrefix:[],
		init:function(xsdNamespacePrefix, targetNamespacePrefix) {
			this.xsdNamespacePrefix = xsdNamespacePrefix;
			this.targetNamespacePrefix = targetNamespacePrefix;
		},
		isNotXsdPrefixed: function(name) {
			return (this.xsdNamespacePrefix.indexOf(parseUtils.parsePrefix(name)) < 0);
		},
		findByNameAndPrefix: function(refName, mapByName) {
			var lookupName = parseUtils.parseName(refName);

			var entry = mapByName[lookupName];
			var isCorrectPrefix = false;
			if (entry) {
				if (entry.attrs.name == refName) {
					isCorrectPrefix = true;
				} else {
					if (this.targetNamespacePrefix.indexOf(parseUtils.parsePrefix(refName)) >= 0) {
						isCorrectPrefix = true;
					}
				}

				if (isCorrectPrefix) {
					return entry;
				} else {
					return null;
				}
			}
		},
		link:function(roots) {
			var mapOfRootTypes = getMapByName(roots);

			this.linkItem(roots, mapOfRootTypes);
		},
		linkItem:function(roots, entriesByName) {
			for (var i = 0; i < roots.length; i++) {
				var reference = null;


				if (roots[i].attrs) {
					if (roots[i].attrs.type) {
						reference = roots[i].attrs.type;
					} else if (roots[i].attrs.ref) {
						reference = roots[i].attrs.ref;
					} else if (roots[i].attrs.base) {
						reference = roots[i].attrs.base;
					}
				}

				if (reference && this.isNotXsdPrefixed(reference)) {
					var e = this.findByNameAndPrefix(reference,entriesByName);
					if (!e) {
						// TODO
						console.log("Unable to find referenced element '"  + reference + "'");
					} else {
						roots[i].linkedEntry = e;
					}
				}

				this.linkItem(roots[i].children, entriesByName);
			}

		}
	};
});