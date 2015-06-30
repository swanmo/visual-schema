define(['jquery', 'pagejs', 'page/editor', 'page/toast', 'services/collectionService'],
    function($, page, editor, toast, collectionService) {
        'use strict';
        var xsdOnScreen;
        function updatePage(collectionId, newSchema) {
            var $list = $('*[data-collectionid="' + collectionId + '"] .collapsible-body ul');
            $list.append(schema(newSchema));
        }

        function createSchema(collection) {
            var docName = $('#docName').val();

            collectionService.saveNewDocument(
                docName, collection.id, editor.val(), function(newlyCreatedSchema) {
                    toast.done('Saved');
                    page('/xsd/' + newlyCreatedSchema.id);
                    updatePage(collection.id, newlyCreatedSchema);
                });
        }

        function initActions() {
            // $('#toolEdit').css('display', 'none');
            // $('#toolDel').css('display', 'none');
            $('#nav-icon1').click(function(){
                var $this = $(this);
                if ($this.hasClass('open')) {
                    
                    
                    $('#toolEdit').removeClass('reveal');
                    $('#toolDel').removeClass('reveal');
                    setTimeout(
                        function() {
                            $this.removeClass('open');
                            $('#toolTitle').removeClass('open');
                            $('#toolDel').removeClass('open');
                            $('#toolEdit').removeClass('open');
                        }, 20);
                } else {
                    $this.addClass('open');
                    $('#toolTitle').addClass('open');
                    $('#toolEdit').addClass('open');
                    
                    $('#toolDel').addClass('open');
                    setTimeout(
                        function() {
                            $('#toolDel').addClass('reveal');
                            $('#toolEdit').addClass('reveal');
                        }, 20);
                    
                }

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
            var $list = $('#clist');
            for(var i = 0; i < all.length; i++) {
                var title = all[i].store.title || ('Collection ' + (i + 1));
                var $li = $('<li data-collectionid="' + all[i].store.id + '">');

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

        function schema(schemaItem) {
            var $li = $("<li>");
            var $a = $("<a>", {text: schemaItem.title,
                href: '/xsd/' + schemaItem.id});
            $li.append($a);
            return $li;
            // var schemaId = schemaItem.id;
            // $a.click(function() {
                //alert('open schema' + schemaId);
            // });
        }
        function schemas(schemaList) {
            var $ul = $("<ul>");
            for(var i = 0; i < schemaList.length; i++) {

                $ul.append(schema(schemaList[i]));
            }
            return $ul;
        }
        function setToolbar(schemaDoc) {
            $('#toolTitle').text(schemaDoc.title);
            $('.tools').addClass('open');
        }

        return {
            init: function() {
                collectionService.findAll(function(all) {
                    display(all);
                    initSelect(all);
                    initActions();
                });
            },
            fromStore: function(schemaId) {
                collectionService.find(schemaId,
                    function(stored) {
                        xsdOnScreen = stored;
                        editor.val(stored.xsdData);
                        setToolbar(stored);
                    });

            },
            update: function() {
                if (!xsdOnScreen) {
                    alert('There is no xsd data to save!');
                    return;
                }
                function done() {
                    toast.done('Updated');
                }
                collectionService.updateDocument(xsdOnScreen.id, done, editor.val());
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
