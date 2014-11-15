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
	var isTargetNsPrefixed = function(name, arrOfNamespaces) {
		var prefix = parseUtils.parsePrefix(name);
		var tnsQualifier = findByPrefix("targetNamespace", arrOfNamespaces);

		return (findByPrefix(prefix, arrOfNamespaces) == tnsQualifier);
	};

	var isNotXsdPrefixed = function(name, arrOfNamespaces) {

		var prefix = parseUtils.parsePrefix(name);
		if (findByPrefix(prefix, arrOfNamespaces) == "http://www.w3.org/2001/XMLSchema") {
			return false;
		}
		return true;
	};

	var findByPrefix = function(prefix, arrOfNamespaces) {
		for (var i = 0; i < arrOfNamespaces.length; i++) {
			if (arrOfNamespaces[i][prefix]) {
				return arrOfNamespaces[i][prefix];
			}
		}
		return null;
	};

	var findByNameAndPrefix = function(refName, mapByName, arrNamespacesMaps) {
		var lookupName = parseUtils.parseName(refName);

		var entry = mapByName[lookupName];
		var isCorrectPrefix = false;
		if (entry) {
			if (entry.attrs.name == refName) {
				isCorrectPrefix = true;
			} else {
				if (isTargetNsPrefixed(refName, arrNamespacesMaps)) {
					isCorrectPrefix = true;
				}
			}

			if (isCorrectPrefix) {
				return entry;
			} else {
				return null;
			}
		}
	};

	return {
		link:function(roots) {
			if (roots.length != 1) {
				console.log("ERROR: expected element 'schema' alone at top level.");
			}
			var mapOfRootTypes = getMapByName(roots[0].children);

			this.linkItem(roots[0], mapOfRootTypes, [roots[0].nsMap]);
		},
		linkItem:function(entry, entriesByName, arrNamespacesMaps) {
			var reference = null;
			var hasNsMapping = (entry.nsMap) ? true : false;
			if (hasNsMapping) {
				arrNamespacesMaps.unshift(entry.nsMap);	
			}

			if (entry.attrs) {
				if (entry.attrs.type) {
					reference = entry.attrs.type;
				} else if (entry.attrs.ref) {
					reference = entry.attrs.ref;
				} else if (entry.attrs.base) {
					reference = entry.attrs.base;
				}
			}
			if (reference) {
				var _isNotXsdPrefixed = isNotXsdPrefixed(reference, arrNamespacesMaps);
				// console.log(reference + " is Xsd prefixed: " + (!_isNotXsdPrefixed));
			}

			if (reference && isNotXsdPrefixed(reference, arrNamespacesMaps)) {
				var e = findByNameAndPrefix(reference,entriesByName, arrNamespacesMaps);
				if (!e) {
					// TODO
					console.log("Unable to find referenced element '"  + reference + "'");
				} else {
					entry.linkedEntry = e;
				}
			}
			if (entry.children) {
				for (var i = 0; i < entry.children.length; i++) {
					this.linkItem(entry.children[i], entriesByName, arrNamespacesMaps);
				}
			}
			if (hasNsMapping) {
				arrNamespacesMaps.shift();
			}
		}
	};
});