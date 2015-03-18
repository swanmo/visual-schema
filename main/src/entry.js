define(function() {
    var Attrs = function(name, type, minOccurs, maxOccurs, ref, base, use, nodeMap) {
        this.name = name;
        this.type = type;
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.ref = ref;
        this.base = base;
        this.use = ref;
        this.nodeMap = nodeMap;
    };

    var AttrsElement = function(name, type, minOccurs, maxOccurs, ref, base, nodeMap) {
        this.name = name;
        this.type = type;
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.ref = ref;
        this.base = base;
        this.nodeMap = nodeMap;
    };

    var AttrsAttribute = function(name, type, use, ref, nodeMap) {
        this.name = name;
        this.type = type;
        this.use = use;
        this.ref = ref;
        this.nodeMap = nodeMap;
    };

    var entry = function(prefix, name, node, parent, nsMap){
        // console.log('E', name, node);
        var attrs = null;
        this.prefix = prefix;
        this.name = name;
        this.parent = parent;
        this.nsMap = nsMap;
        this.children = [];
        this.linkedEntry = null;
        var $node = $(node);

        var nodeMap = {};
        if ($node[0] && $node[0].attributes) {
            $.each($node[0].attributes, function(i, attrib){
                nodeMap[attrib.name] = attrib.value;
            });
        }
        if(name === 'documentation') {
            nodeMap._inner = node.innerHTML;
        }

        if (name == "element") {
            attrs = new AttrsElement(
                $node.attr('name'),
                $node.attr('type'),
                $node.attr('minOccurs'),
                $node.attr('maxOccurs'),
                $node.attr('ref') || $node.attr('refer'),
                $node.attr('base'),
                nodeMap
                );
        } else if (name == "sequence") {
            attrs = new AttrsAttribute(
                $node.attr('name'),
                $node.attr('type'),
                $node.attr('use'),
                $node.attr('ref'),
                nodeMap
                );
        } else {
            attrs = new Attrs(
                $node.attr('name'),
                $node.attr('type'),
                $node.attr('minOccurs'),
                $node.attr('maxOccurs'),
                $node.attr('ref'),
                $node.attr('base'),
                $node.attr('use'),
                nodeMap
                );
        }
        this.attrs = attrs;
    };

    entry.prototype.addChild = function(entry) {
        this.children.push(entry);
    };
    return entry;
})

