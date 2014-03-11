define(function() {
    var Attrs = function(name, type, minOccurs, maxOccurs, ref, base, use) {
        this.name = name;
        this.type = type;
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.ref = ref;
        this.base = base;
        this.use = ref;
    };

    var AttrsElement = function(name, type, minOccurs, maxOccurs, ref, base) {
        this.name = name;
        this.type = type;
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.ref = ref;
        this.base = base;
    };

    var AttrsAttribute = function(name, type, use, ref) {
        this.name = name;
        this.type = type;
        this.use = use;
        this.ref = ref;
    };

    var entry = function(prefix, name, node, parent, nsMap){
        var attrs = null;
        this.prefix = prefix;
        this.name = name;
        this.parent = parent;
        this.nsMap = nsMap;
        this.children = [];
        this.linkedEntry = null;
        var $node = $(node);
        if (name == "element") {
            attrs = new AttrsElement(
                $node.attr('name'),
                $node.attr('type'),
                $node.attr('minOccurs'),
                $node.attr('maxOccurs'),
                $node.attr('ref'),
                $node.attr('base')
                );
        } else if (name == "sequence") {
            attrs = new AttrsAttribute(
                $node.attr('name'),
                $node.attr('type'),
                $node.attr('use'),
                $node.attr('ref')
                );
        } else {
            attrs = new Attrs(
                $node.attr('name'),
                $node.attr('type'),
                $node.attr('minOccurs'),
                $node.attr('maxOccurs'),
                $node.attr('ref'),
                $node.attr('base'),
                $node.attr('use')
                );
        }
        this.attrs = attrs;
    };

    entry.prototype.addChild = function(entry) {
        this.children.push(entry);
    };
    return entry;
})

