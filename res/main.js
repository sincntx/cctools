window.onload = function() {
    var cctools;
    var MainScene, targetNode, targetAction, targetActionNode, propNode, isRun = false;

    cctools = {};

    cctools.sideBtnClick = function(selector) {
        $('.contents-box').css('display', 'none');
        $('.contents-box').removeClass('hidden');
        $('#' + selector + '-contents').css('display', 'block');
        $('.navbar-main > li').removeClass('active');
        $('#' + selector + 'Btn').parent().addClass('active');
    };

    $.fn.setPreview = function(opt){
        "use strict"
        var defaultOpt = {
            inputFile: $(this),
            img: null,
            w: 200,
            h: 200
        };
        $.extend(defaultOpt, opt);

        var previewImage = function(){
            if (!defaultOpt.inputFile || !defaultOpt.img) return;

            var inputFile = defaultOpt.inputFile.get(0);
            var img       = defaultOpt.img.get(0);

            if (window.FileReader) {
                if (!inputFile.files[0].type.match(/image\//)) return;

                $('#spriteFilename').val(inputFile.files[0].name);

                try {
                    var reader = new FileReader();
                    reader.onload = function(e){
                        img.src = e.target.result;
                        img.style.width  = defaultOpt.w+'px';
                        img.style.height = defaultOpt.h+'px';
                        img.style.display = '';
                    }
                    reader.readAsDataURL(inputFile.files[0]);
                } catch (e) {
                }
            } else if (img.filters) {
                inputFile.select();
                inputFile.blur();
                var imgSrc = document.selection.createRange().text;

                img.style.width  = defaultOpt.w+'px';
                img.style.height = defaultOpt.h+'px';
                img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
                img.style.display = '';
            } else {
            }
        };

        $(this).change(function(){
            previewImage();
        });
    };

    var opt = {
        img: $('#spriteImagePreivew'),
        w: 200,
        h: 200
    };

    $('#spriteSrc').setPreview(opt);

    $('.navbar-main > li > a').click(function() {
        if(this.id.split('Btn')[0] !== 'code') {
            cctools.sideBtnClick(this.id.split('Btn')[0]);
        }
        else {
            $('#jsBtn').click();
            $('#codeModal').modal('show');
        }
    });

    $('#canvasWidthInput').val($('#gameCanvas').attr('width'));
    $('#canvasHeightInput').val($('#gameCanvas').attr('height'));

    $('.canvas-input').change(function() {
        var layerColor;
        $('#gameCanvas').attr('width', $('#canvasWidthInput').val());
        $('#gameCanvas').attr('height', $('#canvasHeightInput').val());
        $('#Cocos2dGameContainer').css('width', $('#canvasWidthInput').val());
        $('#Cocos2dGameContainer').css('height', $('#canvasHeightInput').val());
        $('#Cocos2dGameContainer').css('background-color', $('#canvasBackgroundInput').val());

        layerColor = $('#canvasLayerBackgroundInput').val();
        MainScene.getChildByTag('colorLayer').color = cc.color(parseInt(layerColor.substring(1, 3), 16), parseInt(layerColor.substring(3, 5), 16), parseInt(layerColor.substring(5, 7), 16));
    });

    $('#canvasResInput').change(function() {
        cc.view.setResolutionPolicy(eval($("#canvasResInput option:selected").text()));
    });

    $('.prop-input').change(function() {
        if(propNode) {
            propNode.x = parseInt($('#propXInput').val());
            propNode.y = parseInt($('#propYInput').val());
            propNode.anchorX = parseFloat($('#propAXInput').val());
            propNode.anchorY = parseFloat($('#propAYInput').val());
            propNode.scaleX = parseFloat($('#propScaleXInput').val());
            propNode.scaleY = parseFloat($('#propScaleYInput').val());
            propNode.rotationX = parseInt($('#propRotationXInput').val());
            propNode.rotationY = parseInt($('#propRotationYInput').val());
            propNode.skewX = parseInt($('#propSkewXInput').val());
            propNode.skewY = parseInt($('#propSkewYInput').val());
            propNode.zIndex = parseInt($('#propzIndexInput').val());
        }
    });

    $('#labelttfBtn').click(function() {
        var n = MainScene.getChildByTag($('#labelttfName').val());
        if(!n) {
            var size = cc.director.getWinSize();
            var label = new cc.LabelTTF($('#labelttfText').val(), $('#labelttfFont').val(), $('#labelttfFontSize').val());
            label.tag = $('#labelttfName').val();
            label.setPosition(size.width / 2, size.height / 2);
            MainScene.addChild(label);
            $('#labelttfModal').modal('hide');
            $('#jstreeNode').jstree("create_node", "#", {text:$('#labelttfName').val(), data:{type:"cc.LabelTTF", parent:"#"}}, "last");
        }
        else {
            alert('Node name already exists.');
        }
    });

    $('#spriteBtn').click(function() {
        var n = MainScene.getChildByTag($('#spriteName').val());
        if(!n) {
            var size = cc.director.getWinSize();
            var sprite = new cc.Sprite($('#spriteImagePreivew')[0].src);
            sprite.tag = $('#spriteName').val();
            sprite.filename = $('#spriteFilename').val();
            sprite.setPosition(size.width / 2, size.height / 2);
            MainScene.addChild(sprite);
            $('#spriteModal').modal('hide');
        }
        else {
            alert('Node name already exists.');
        }
    });

    $('#xLeftAlign').click(function() {
        if(propNode) {
            propNode.x = 0;
            $('#propXInput').val(propNode.x);
        }
    });

    $('#xCenterAlign').click(function() {
        var size = cc.director.getWinSize();
        if(propNode) {
            propNode.x = size.width / 2;
            $('#propXInput').val(propNode.x);
        }
    });

    $('#xRightAlign').click(function() {
        if(propNode) {
            propNode.x = size.width;
            $('#propXInput').val(propNode.x);
        }
    });

    $('#yTopAlign').click(function() {
        var size = cc.director.getWinSize();
        if(propNode) {
            propNode.y = size.height;
            $('#propYInput').val(propNode.y);
        }
    });

    $('#yMiddleAlign').click(function() {
        var size = cc.director.getWinSize();
        if(propNode) {
            propNode.y = size.height / 2;
            $('#propYInput').val(propNode.y);
        }
    });

    $('#yBottomAlign').click(function() {
        if(propNode) {
            propNode.y = 0;
            $('#propYInput').val(propNode.y);
        }
    });

    $('#jsBtn').click(function() {
        var i, j, type, name, child, child2, str = "// Canvas Setting\n";
        str += "cc.view.setDesignResolutionSize(" + $('#canvasWidthInput').val() + ", " + $('#canvasHeightInput').val() + ", " + $("#canvasResInput option:selected").text() + ");";
        str += "\n\n";
        str += "// Nodes Create\n";

        for(i = 1;i < MainScene._children.length;i++) {
            child = MainScene._children[i];
            name = child.tag;

            if(child instanceof cc.LabelTTF) {
                type = "cc.LabelTTF";
                str += "var " + name + " = new " + type + "(\"" + child.string + "\", \"" + child.fontName + "\", " + child.fontSize + ");\n";
            }
            else if(child instanceof cc.Sprite) {
                type = "cc.Sprite";
                str += "var " + name + " = new " + type + "(\"" + child.filename + "\");\n";
            }

            str += name + ".x = " + child.x + ";\n";
            str += name + ".y = " + child.y + ";\n";
            str += name + ".anchorX = " + child.anchorX + ";\n";
            str += name + ".anchorY = " + child.anchorY + ";\n";
            str += name + ".scaleX = " + child.scaleX + ";\n";
            str += name + ".scaleY = " + child.scaleY + ";\n";
            str += name + ".skewX = " + child.skewX + ";\n";
            str += name + ".skewY = " + child.skewY + ";\n";
            str += name + ".rotationX = " + child.rotationX + ";\n";
            str += name + ".rotationY = " + child.rotationY + ";\n";
            str += name + ".zIndex = " + child.zIndex + ";\n";
            str += "this.addChild(" + name + ");\n\n";

            for(j = 0;j < child._children.length;j++) {
                child2 = child._children[j];
                name = child2.tag;

                if(child2 instanceof cc.LabelTTF) {
                    type = "cc.LabelTTF";
                    str += "var " + name + " = new " + type + "(\"" + child2.string + "\", \"" + child2.fontName + "\", " + child2.fontSize + ");\n";
                }
                else if(child2 instanceof cc.Sprite) {
                    type = "cc.Sprite";
                    str += "var " + name + " = new " + type + "(\"" + child2.filename + "\");\n";
                }

                str += name + ".x = " + child2.x + ";\n";
                str += name + ".y = " + child2.y + ";\n";
                str += name + ".anchorX = " + child2.anchorX + ";\n";
                str += name + ".anchorY = " + child2.anchorY + ";\n";
                str += name + ".scaleX = " + child2.scaleX + ";\n";
                str += name + ".scaleY = " + child2.scaleY + ";\n";
                str += name + ".skewX = " + child2.skewX + ";\n";
                str += name + ".skewY = " + child2.skewY + ";\n";
                str += name + ".rotationX = " + child2.rotationX + ";\n";
                str += name + ".rotationY = " + child2.rotationY + ";\n";
                str += name + ".zIndex = " + child2.zIndex + ";\n";
                str += child.tag + ".addChild(" + name + ");\n\n";
            }
        }

        $('#codeTextHidden').val(str);

        var editor = ace.edit("codeText");
        editor.setValue(str);
        editor.clearSelection();
    });

    $('#movetoBtn').click(function() {
        var check = $('#jstreeAction').jstree("create_node", "#", {text:$('#movetoName').val()}, "last");

        if(!check) {
            alert('Action name already exists.');
        }
        else {
            check = $('#jstreeAction').jstree(true).get_node(check);
            check.type = 'cc.MoveTo';
            check.x = $('#movetoX').val();
            check.y = $('#movetoY').val();
            check.duration = $('#movetoDuration').val();
            $('#movetoModal').modal('hide');
        }
    });

    var editor = ace.edit("codeText");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/javascript");

    var client = new ZeroClipboard( document.getElementById("codeCopyBtn") );

    $('#jstreeNode').jstree({"core":{"check_callback" : true}, "plugins" : [ "unique", "contextmenu", "dnd", "wholerow" ], "contextmenu" : {
        "items" : function ($node) {
            return {
                "Rename" : {
                    "label" : "Rename",
                    "action" : function (obj) {
                        var n = $('#jstreeNode').jstree(true).get_node(obj.reference);
                        $('#jstreeNode').jstree(true).edit(n);
                    }
                },
                "Delete" : {
                    "label" : "Delete",
                    "action" : function (obj) {
                        var n = $('#jstreeNode').jstree(true).get_node(obj.reference);
                        $('#jstreeNode').jstree(true).delete_node(n);
                    }
                },
                "Property" : {
                    "label" : "Property",
                    "action" : function (obj) {
                        var n = $('#jstreeNode').jstree(true).get_node(obj.reference);
                        if(n.parent_tags) {
                            propNode = MainScene.getChildByTag(n.parent_tags).getChildByTag(n.text);
                        }
                        else {
                            propNode = MainScene.getChildByTag(n.text);
                        }
                        $('#propNameInput').val(propNode.tag);
                        $('#propXInput').val(propNode.x);
                        $('#propYInput').val(propNode.y);
                        $('#propAXInput').val(propNode.anchorX);
                        $('#propAYInput').val(propNode.anchorY);
                        $('#propScaleXInput').val(propNode.scaleX);
                        $('#propScaleYInput').val(propNode.scaleY);
                        $('#propRotationXInput').val(propNode.rotationX);
                        $('#propRotationYInput').val(propNode.rotationY);
                        $('#propSkewXInput').val(propNode.skewX);
                        $('#propSkewYInput').val(propNode.skewY);
                        $('#propzIndexInput').val(propNode.zIndex);
                        $('#propertyBtn').click();
                    }
                }
            };
        }
    }});

    $('#jstreeNode').on('move_node.jstree', function (event, data) {
        var exParentName, exParent, parent, node;

        exParentName = $('#jstreeNode').jstree(true).get_node(data.node).parent_tags;

        if(exParentName) {
            exParent = MainScene.getChildByTag(exParentName);
        }

        if(!exParent) {
            exParent = MainScene;
        }

        parent = MainScene.getChildByTag($('#jstreeNode').jstree(true).get_node(data.parent).text);
        $('#jstreeNode').jstree(true).get_node(data.node).parent_tags = $('#jstreeNode').jstree(true).get_node(data.parent).text

        if(!parent) parent = MainScene;

        node = exParent.getChildByTag(data.node.text);
        exParent.removeChildByTag(data.node.text);
        parent.addChild(node);
    });

    $('#jstreeNode').on('rename_node.jstree', function (event, obj) {
        var node;
        node = MainScene.getChildByTag(obj.old);
        node.tag = obj.text;
    });

    $('#jstreeNode').on('delete_node.jstree', function (event, obj) {
        MainScene.removeChildByTag(obj.node.text);
    });

    $('#jstreeAction').jstree({"core":{"check_callback" : true}, "plugins" : [ "unique", "contextmenu", "dnd", "wholerow" ], "contextmenu" : {
        "items" : function ($node) {
            return {
                "Rename" : {
                    "label" : "Rename",
                    "action" : function (obj) {
                        var n = $('#jstreeAction').jstree(true).get_node(obj.reference);
                        $('#jstreeAction').jstree(true).edit(n);
                    }
                },
                "Delete" : {
                    "label" : "Delete",
                    "action" : function (obj) {
                        var n = $('#jstreeAction').jstree(true).get_node(obj.reference);
                        $('#jstreeAction').jstree(true).delete_node(n);
                    }
                },
                "Run" : {
                    "label" : "Run",
                    "action" : function (obj) {
                        var n = $('#jstreeAction').jstree(true).get_node(obj.reference), i;

                        if(isRun) return;

                        if(MainScene._children.length < 2) {
                            alert('Please add a node.');
                            return;
                        }

                        targetAction = n;

                        $('#runTargetInput option').remove();

                        for(i = 1;i < MainScene._children.length;i++) {
                            $('#runTargetInput').append('<option>' + MainScene._children[i].tag +'</option>');
                        }

                        $('#runActionModal').modal('show');
                    }
                }
            };
        }
    }});

    $('#runActionBtn').click(function() {
        var target = MainScene.getChildByTag($("#runTargetInput option:selected").text()), action;

        isRun = true;
        targetActionNode = $.extend({}, target);
        $('#actionStatus').text('Action!');
        $('#actionStatus').removeClass('label-default');
        $('#actionStatus').addClass('label-danger');
        action = new cc.MoveTo(parseInt(targetAction.duration), cc.p(parseInt(targetAction.x), parseInt(targetAction.y)));
        target.runAction(new cc.Sequence(action, new cc.DelayTime(1), new cc.CallFunc(function(sender) {
            isRun = false;
            sender.x = targetActionNode.x;
            sender.y = targetActionNode.y;
            $('#actionStatus').text('Ready');
            $('#actionStatus').removeClass('label-danger');
            $('#actionStatus').addClass('label-default');
        }, target)));

        $('#runActionModal').modal('hide');
    });

    cc.game.onStart = function(){
        cc.LoaderScene.preload([], function () {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();

                    var size = cc.director.getWinSize();

                    var colorLayer = new cc.LayerColor(cc.color(0, 0, 0), size.width, size.height);
                    colorLayer.tag = 'colorLayer';
                    this.addChild(colorLayer);

                    cc.eventManager.addListener(cc.EventListener.create({
                        event: cc.EventListener.KEYBOARD,
                        onKeyPressed: function(key, event){
                            if(propNode) {
                                switch(key) {
                                    case 37:
                                        propNode.x--;
                                        break;
                                    case 39:
                                        propNode.x++;
                                        break;
                                    case 38:
                                        propNode.y++;
                                        break;
                                    case 40:
                                        propNode.y--;
                                        break;
                                }

                                $('#propXInput').val(propNode.x);
                                $('#propYInput').val(propNode.y);
                            }
                        }
                    }), this);

                    cc.eventManager.addListener(cc.EventListener.create({
                        event: cc.EventListener.MOUSE,
                        onMouseDown: function(event){
                            var pos = event.getLocation(), target = event.getCurrentTarget(), i, j;
                            /*if(event.getButton() === cc.EventMouse.BUTTON_RIGHT)
                                cc.log("onRightMouseDown at: " + pos.x + " " + pos.y );
                            else if(event.getButton() === cc.EventMouse.BUTTON_LEFT)
                                cc.log("onLeftMouseDown at: " + pos.x + " " + pos.y );*/

                            for(i = 1;i < target._children.length;i++) {
                                if(cc.rectContainsPoint(target._children[i].getBoundingBox(),pos)) {
                                    targetNode = target._children[i];
                                    propNode = target._children[i];
                                    $('#propNameInput').val(propNode.tag);
                                    $('#propXInput').val(propNode.x);
                                    $('#propYInput').val(propNode.y);
                                    $('#propAXInput').val(propNode.anchorX);
                                    $('#propAYInput').val(propNode.anchorY);
                                    $('#propScaleXInput').val(propNode.scaleX);
                                    $('#propScaleYInput').val(propNode.scaleY);
                                    $('#propRotationXInput').val(propNode.rotationX);
                                    $('#propRotationYInput').val(propNode.rotationY);
                                    $('#propSkewXInput').val(propNode.skewX);
                                    $('#propSkewYInput').val(propNode.skewY);
                                    $('#propzIndexInput').val(propNode.zIndex);
                                    $('#propertyBtn').click();
                                }

                                for(j = 0;j < target._children[i]._children.length;j++) {
                                    if(cc.rectContainsPoint(target._children[i]._children[j].getBoundingBoxToWorld(),pos)) {
                                        targetNode = target._children[i]._children[j];
                                        propNode = target._children[i]._children[j];
                                        $('#propNameInput').val(propNode.tag);
                                        $('#propXInput').val(propNode.x);
                                        $('#propYInput').val(propNode.y);
                                        $('#propAXInput').val(propNode.anchorX);
                                        $('#propAYInput').val(propNode.anchorY);
                                        $('#propScaleXInput').val(propNode.scaleX);
                                        $('#propScaleYInput').val(propNode.scaleY);
                                        $('#propRotationXInput').val(propNode.rotationX);
                                        $('#propRotationYInput').val(propNode.rotationY);
                                        $('#propSkewXInput').val(propNode.skewX);
                                        $('#propSkewYInput').val(propNode.skewY);
                                        $('#propzIndexInput').val(propNode.zIndex);
                                        $('#propertyBtn').click();
                                    }
                                }
                            }
                        },
                        onMouseMove: function(event){
                            var pos = event.getLocation(), target = event.getCurrentTarget();
                            if(targetNode) {
                                targetNode.x = parseInt(pos.x - targetNode.parent.x);
                                targetNode.y = parseInt(pos.y - targetNode.parent.y);
                                $('#propXInput').val(targetNode.x);
                                $('#propYInput').val(targetNode.y);
                            }
                        },
                        onMouseUp: function(event){
                            var pos = event.getLocation(), target = event.getCurrentTarget();
                            targetNode = null;
                        }
                    }), this);
                }
            });
            MainScene = new MyScene();
            cc.director.runScene(MainScene);
        }, this);
    };
    cc.game.run("gameCanvas");
};