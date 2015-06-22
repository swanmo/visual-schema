define(['jquery', 'page/editor', 'page/toast', 'services/collectionService'],
    function($, editor, toast, collectionService) {
        'use strict';
        function createSchema(collection) {
            var docName = $('#docName').val();

            collectionService.saveNewDocument(
                docName, collection.id, editor.val(), function() {
                    toast.done('Saved');
                });
        }

        function initSelect(all) {
            var $select = $("#collection");
            for(var i = 0; i < all.length; i++) {
                var title = all[i].store.title || ('Collection ' + (i + 1))
                $select.append($("<option>",{
                    value: all[i].store.id,
                    text: title
                }));    
            }
            $select.material_select(); 
        }
        function display(all) {
            var $list = $("#clist");
            for(var i = 0; i < all.length; i++) {
                var title = all[i].store.title || ('Collection ' + (i + 1))
                var $li = $("<li>");
                $list.append($li);
                $li.append(
                    $("<div class='collapsible-header'><i class='mdi-file-folder'></i>" + title + "</div>"),
                    $("<div class='collapsible-body'></div>").append(
                        schemas(all[i].schemas)
                    )
                );
            }
            $list.collapsible(); 
        }

        function validateInput(name) {
            var name = $('#docName').val();

            if (!name) {
                toast.error('Please enter "New document name"');
                return false;
            }
            var coll = $("#collection").val();
            var newName = $('#newCollectionName').val();
            if (!coll && !newName) {
                toast.error('Please select a collection or name of new collection');
                return false;
            }
            return true;
        }

        function schemas(schemaList) {
            var $ul = $("<ul>");
            for(var i = 0; i < schemaList.length; i++) {
                var $li = $("<li>" +  + "</li>");
                var $a = $("<a>", {text: schemaList[i].title,
                    href: '/xsd/' + schemaList[i].id});
                $li.append($a);
                var schemaId = schemaList[i].id;
                $a.click(function() {
                    //alert('open schema' + schemaId);
                });
                $ul.append($li);
            }
            return $ul;
        }

        return {
            init: function() {
                collectionService.findAll(function(all) {
                    display(all);
                    initSelect(all);
                });
            },
            fromStore: function(schemaId) {
                collectionService.find(schemaId,
                    function(stored) {
                        editor.val(stored.xsdData);
                    });
            },
            create: function() {
                if (!validateInput()) {
                    return;
                }

                var coll = $("#collection").val();
                if (!coll || coll == '-1') {
                    var newName = $('#newCollectionName').val();
                    collectionService.saveNewCollection(newName, createSchema);
                } else {
                	createSchema({id: coll});
                }
            }
        };
    }
);
