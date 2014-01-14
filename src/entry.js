define(function() {
    var AttrsElement = function(name, type, minOccurs, maxOccurs, ref) {
        this.name = name;
        this.type = type;
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.ref = ref;
    };

    var AttrsAttribute = function(name, type, use, ref) {
        this.name = name;
        this.type = type;
        this.use = use;
        this.ref = ref;
    };

    var entry = function(prefix, name, node, parent){
        var attrs = null;
        this.prefix = prefix;
        this.name = name;
        this.parent = parent;
        this.children = [];
        this.linkedEntry = null;

        if (name == "element") {
            var $node = $(node);
            attrs = new AttrsElement(
                $node.attr('name'),
                $node.attr('type'),
                $node.attr('minOccurs'),
                $node.attr('maxOccurs'),
                $node.attr('ref')
                );
        } else if (name == "sequence") {
            var $node = $(node);
            attrs = new AttrsAttribute(
                $node.attr('name'),
                $node.attr('type'),
                $node.attr('use'),
                $node.attr('ref')
                );
        }
        this.attrs = attrs;
    };

    entry.prototype.addChild = function(entry) {
        this.children.push(entry);
    };
    return entry;
})

