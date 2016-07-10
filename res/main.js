window.onload = function() {
    var cctools = {};

    cctools.refreshStorage = function() {
        var i;

        $('#storageInput').empty();
        $('#storageInput').append("<option value='select'>Select the storage</option>");

        for (i = 0; i < localStorage.length; i++)   {
            if(cctools.storageName === localStorage.key(i))
                $('#storageInput').append("<option selected value='" + localStorage.key(i) + "'>" + localStorage.key(i) + "</option>");
            else
                $('#storageInput').append("<option value='" + localStorage.key(i) + "'>" + localStorage.key(i) + "</option>");
        }

        $('#cctools.storageName').val('');
    };

    cctools.sideBtnClick = function(selector) {
        $('.contents-box').css('display', 'none');
        $('.contents-box').removeClass('hidden');
        $('#' + selector + '-contents').css('display', 'block');
        $('.navbar-main > li').removeClass('active');
        $('#' + selector + 'Btn').parent().addClass('active');
    };

    cctools.getCocosAction = function(targetAction) {
        var action;

        if(!targetAction.hasOwnProperty('id')) targetAction = $('#jstreeAction').jstree(true).get_node(targetAction);

        switch(targetAction.data.type) {
            case "cc.MoveTo":
                action = new cc.MoveTo(parseInt(targetAction.data.duration), cc.p(parseInt(targetAction.data.x), parseInt(targetAction.data.y)));
                break;
            case "cc.MoveBy":
                action = new cc.MoveBy(parseInt(targetAction.data.duration), cc.p(parseInt(targetAction.data.x), parseInt(targetAction.data.y)));
                break;
            case "cc.ScaleTo":
                action = new cc.ScaleTo(parseInt(targetAction.data.duration), parseInt(targetAction.data.x), parseInt(targetAction.data.y));
                break;
            case "cc.ScaleBy":
                action = new cc.ScaleBy(parseInt(targetAction.data.duration), parseInt(targetAction.data.x), parseInt(targetAction.data.y));
                break;
            case "cc.RotateTo":
                action = new cc.RotateTo(parseInt(targetAction.data.duration), parseInt(targetAction.data.x), parseInt(targetAction.data.y));
                break;
            case "cc.RotateBy":
                action = new cc.RotateBy(parseInt(targetAction.data.duration), parseInt(targetAction.data.x), parseInt(targetAction.data.y));
                break;
            case "cc.SkewTo":
                action = new cc.SkewTo(parseInt(targetAction.data.duration), parseInt(targetAction.data.x), parseInt(targetAction.data.y));
                break;
            case "cc.SkewBy":
                action = new cc.SkewBy(parseInt(targetAction.data.duration), parseInt(targetAction.data.x), parseInt(targetAction.data.y));
                break;
            case "cc.FadeIn":
                action = new cc.FadeIn(parseInt(targetAction.data.duration));
                break;
            case "cc.FadeOut":
                action = new cc.FadeOut(parseInt(targetAction.data.duration));
                break;
            case "cc.JumpTo":
                action = new cc.JumpTo(parseInt(targetAction.data.duration), cc.p(parseInt(targetAction.data.x), parseInt(targetAction.data.y)), parseInt(targetAction.data.height), parseInt(targetAction.data.jumps));
                break;
            case "cc.JumpBy":
                action = new cc.JumpBy(parseInt(targetAction.data.duration), cc.p(parseInt(targetAction.data.x), parseInt(targetAction.data.y)), parseInt(targetAction.data.height), parseInt(targetAction.data.jumps));
                break;
            case "cc.Blink":
                action = new cc.Blink(parseInt(targetAction.data.duration), parseInt(targetAction.data.blinks));
                break;
            case "cc.TintTo":
                action = new cc.TintTo(parseInt(targetAction.data.duration), parseInt(targetAction.data.r), parseInt(targetAction.data.g), parseInt(targetAction.data.b));
                break;
            case "cc.TintBy":
                action = new cc.TintBy(parseInt(targetAction.data.duration), parseInt(targetAction.data.r), parseInt(targetAction.data.g), parseInt(targetAction.data.b));
                break;
            case "cc.Show":
                action = new cc.Show();
                break;
            case "cc.Hide":
                action = new cc.Hide();
                break;
            case "cc.Place":
                action = new cc.Place(cc.p(parseInt(targetAction.data.x), parseInt(targetAction.data.y)));
                break;
            case "cc.FlipX":
                action = new cc.FlipX(eval(targetAction.data.flip));
                break;
            case "cc.FlipY":
                action = new cc.FlipY(eval(targetAction.data.flip));
                break;
            case "cc.Sequence":
                if(targetAction.children.length < 1) {
                    return new cc.MoveBy(0, 0, 0);
                }

                var actionArray = [];

                for(var i = 0;i < targetAction.children.length;i++) {
                    actionArray.push(cctools.getCocosAction(targetAction.children[i]));
                }

                action = new cc.Sequence(actionArray);
                break;
            case "cc.Spawn":
                if(targetAction.children.length < 1) {
                    return new cc.MoveBy(0, 0, 0);
                }

                var actionArray = [];

                for(var i = 0;i < targetAction.children.length;i++) {
                    actionArray.push(cctools.getCocosAction(targetAction.children[i]));
                }

                action = new cc.Spawn(actionArray);
                break;
            case "cc.EaseBackIn":
            case "cc.EaseBackInOut":
            case "cc.EaseBackOut":
            case "cc.EaseBounceIn":
            case "cc.EaseBounceInOut":
            case "cc.EaseBounceOut":
            case "cc.EaseElasticIn":
            case "cc.EaseElasticInOut":
            case "cc.EaseElasticOut":
            case "cc.EaseExponentialIn":
            case "cc.EaseExponentialInOut":
            case "cc.EaseExponentialOut":
            case "cc.EaseSineIn":
            case "cc.EaseSineInOut":
            case "cc.EaseSineOut":
                if(targetAction.children.length < 1) {
                    return new cc.MoveBy(0, 0, 0);
                }

                action = eval("new " + targetAction.data.type + "(cctools.getCocosAction(targetAction.children[0]))");
                break;
        }

        return action;
    };

    cctools.getCocosActionStr = function(targetAction) {
        var action;

        if(!targetAction.hasOwnProperty('id')) targetAction = $('#jstreeAction').jstree(true).get_node(targetAction);
        switch(targetAction.data.type) {
            case "cc.MoveTo":
                action = "new cc.MoveTo(" + parseInt(targetAction.data.duration) + ", cc.p(" + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + "))";
                break;
            case "cc.MoveBy":
                action = "new cc.MoveBy(" + parseInt(targetAction.data.duration) + ", cc.p(" + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + "))";
                break;
            case "cc.ScaleTo":
                action = "new cc.ScaleTo(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + ")";
                break;
            case "cc.ScaleBy":
                action = "new cc.ScaleBy(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + ")";
                break;
            case "cc.RotateTo":
                action = "new cc.RotateTo(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + ")";
                break;
            case "cc.RotateBy":
                action = "new cc.RotateBy(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + ")";
                break;
            case "cc.SkewTo":
                action = "new cc.SkewTo(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + ")";
                break;
            case "cc.SkewBy":
                action = "new cc.SkewBy(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + ")";
                break;
            case "cc.FadeIn":
                action = "new cc.FadeIn(" + parseInt(targetAction.data.duration) + ")";
                break;
            case "cc.FadeOut":
                action = "new cc.FadeOut(" + parseInt(targetAction.data.duration) + ")";
                break;
            case "cc.JumpTo":
                action = "new cc.JumpTo(" + parseInt(targetAction.data.duration) + ", cc.p(" + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + ") + , " + parseInt(targetAction.data.height) + ", " + parseInt(targetAction.data.jumps) + ")";
                break;
            case "cc.JumpBy":
                action = "new cc.JumpBy(" + parseInt(targetAction.data.duration) + ", cc.p(" + parseInt(targetAction.data.x) + ", " + parseInt(targetAction.data.y) + ") + , " + parseInt(targetAction.data.height) + ", " + parseInt(targetAction.data.jumps) + ")";
                break;
            case "cc.Blink":
                action = "new cc.Blink(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.blinks) + ")";
                break;
            case "cc.TintTo":
                action = "new cc.TintTo(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.r) + ", " + parseInt(targetAction.data.g) + ", " + parseInt(targetAction.data.b) + ")";
                break;
            case "cc.TintBy":
                action = "new cc.TintBy(" + parseInt(targetAction.data.duration) + ", " + parseInt(targetAction.data.r) + ", " + parseInt(targetAction.data.g) + ", " + parseInt(targetAction.data.b) + ")";
                break;
            case "cc.Show":
                action = "new cc.Show()";
                break;
            case "cc.Hide":
                action = "new cc.Hide()";
                break;
            case "cc.Place":
                action = "new cc.Place(cc.p(" + parseInt(targetAction.data.x) +", " + parseInt(targetAction.data.y) + "))";
                break;
            case "cc.FlipX":
                action = "new cc.FlipX(" + targetAction.data.flip + ")";
                break;
            case "cc.FlipY":
                action = "new cc.FlipY(" + targetAction.data.flip + ")";
                break;
            case "cc.Sequence":
                if(targetAction.children.length < 1) {
                    return "new cc.MoveBy(0, 0, 0)";
                }

                var actionArray = [];

                for(var i = 0;i < targetAction.children.length;i++) {
                    actionArray.push(cctools.getCocosActionStr(targetAction.children[i]));
                }

                actionArray = actionArray.join();
                action = "new cc.Sequence(" + actionArray + ")";
                break;
            case "cc.Spawn":
                if(targetAction.children.length < 1) {
                    return "new cc.MoveBy(0, 0, 0)";
                }

                var actionArray = [];

                for(var i = 0;i < targetAction.children.length;i++) {
                    actionArray.push(cctools.getCocosActionStr(targetAction.children[i]));
                }

                actionArray = actionArray.join();
                action = "new cc.Spawn(" + actionArray + ")";
                break;
            case "cc.EaseBackIn":
            case "cc.EaseBackInOut":
            case "cc.EaseBackOut":
            case "cc.EaseBounceIn":
            case "cc.EaseBounceInOut":
            case "cc.EaseBounceOut":
            case "cc.EaseElasticIn":
            case "cc.EaseElasticInOut":
            case "cc.EaseElasticOut":
            case "cc.EaseExponentialIn":
            case "cc.EaseExponentialInOut":
            case "cc.EaseExponentialOut":
            case "cc.EaseSineIn":
            case "cc.EaseSineInOut":
            case "cc.EaseSineOut":
                if(targetAction.children.length < 1) {
                    return "new cc.MoveBy(0, 0, 0)";
                }

                action = "new " + targetAction.data.type + "(" + cctools.getCocosActionStr(targetAction.children[0]) + ")";
                break;
        }

        return action;
    };

    cctools.getNodeStr = function() {
        var i, str = "", j, type, name, child, child2;

        for(i = 1;i < cctools.MainScene._children.length;i++) {
            child = cctools.MainScene._children[i];
            name = child.tag;

            str += "// " + name + "\n";

            if(child instanceof cc.LabelTTF) {
                type = "cc.LabelTTF";
                str += "var " + name + " = new " + type + "(\"" + child.string + "\", \"" + child.fontName + "\", " + child.fontSize + ");\n";
            }
            else if(child instanceof cc.Sprite) {
                type = "cc.Sprite";
                str += "var " + name + " = new " + type + "(\"" + child.filename + "\");\n";
                str += name + ".filename = '" + child.filename + "';\n";
            }
            else if(child instanceof cc.Layer) {
                type = "cc.Layer";
                str += "var " + name + " = new " + type + "();\n";
            }

            str += name + ".tag = '" + name + "';\n";
            str += name + ".color = cc.color(" + child.color.r + ", " + child.color.g +", " + child.color.b +", " + child.color.a + ");\n";
            str += name + ".opacity = " + child.opacity + ";\n";
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
            str += "cctools.MainScene.addChild(" + name + ");\n\n";

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
                    str += name + ".filename = '" + child2.filename + "';\n";
                }
                else if(child2 instanceof cc.Layer) {
                    type = "cc.Layer";
                    str += "var " + name + " = new " + type + "();\n";
                }

                str += name + ".tag = '" + name + "';\n";
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

        return str;
    };

    cctools.getNodeStrCpp = function() {
        var i, str = "", j, type, name, child, child2;

        for(i = 1;i < cctools.MainScene._children.length;i++) {
            child = cctools.MainScene._children[i];
            name = child.tag;

            str += "// " + name + "\n";

            if(child instanceof cc.LabelTTF) {
                str += "auto "+ name + " = Label::createWithSystemFont(\"" + child.string + "\", \"" + child.fontName + "\", " + child.fontSize + ");\n";
            }
            else if(child instanceof cc.Sprite) {
                str += "Sprite*  " + name + "::create(\"" + child.filename + "\");\n";
            }
            else if(child instanceof cc.Layer) {
                str += "Layer* " + name + "::create();\n";
            }

            str += name + "->setTag('" + name + "');\n";
            str += name + "->setColor(ccc4(" + child.color.r + ", " + child.color.g +", " + child.color.b +", " + child.color.a + "));\n";
            str += name + "->setOpacity(" + child.opacity + ");\n";
            str += name + "->setPosition(" + child.x + ", " + child.y + ");\n";
            str += name + "->setAnchorPoint(ccp(" + child.anchorX + ", " + child.anchorY + ");\n";
            str += name + "->setScaleX(" + child.scaleX + ");\n";
            str += name + "->setScaleY(" + child.scaleY + ");\n";
            str += name + "->setSkewX(" + child.skewX + ");\n";
            str += name + "->setSkewY(" + child.skewY + ");\n";
            str += name + "->setRotationX(" + child.rotationX + ");\n";
            str += name + "->setRotationY(" + child.rotationY + ");\n";
            str += name + "->setZOrder(" + child.zIndex + ");\n";
            str += "this->addChild(" + name + ");\n\n";

            for(j = 0;j < child._children.length;j++) {
                child2 = child._children[j];
                var name2 = child2.tag;

                if(child2 instanceof cc.LabelTTF) {
                    str += "auto "+ name2 + " = Label::createWithSystemFont(\"" + child2.string + "\", \"" + child2.fontName + "\", " + child2.fontSize + ");\n";
                }
                else if(child2 instanceof cc.Sprite) {
                    str += "Sprite*  " + name2 + "::create(\"" + child2.filename + "\");\n";
                }
                else if(child2 instanceof cc.Layer) {
                    str += "Layer* " + name2 + "::create();\n";
                }

                str += name2 + "->setTag('" + name2 + "');\n";
                str += name2 + "->setColor(ccc4(" + child2.color.r + ", " + child2.color.g +", " + child2.color.b +", " + child2.color.a + "));\n";
                str += name2 + "->setOpacity(" + child2.opacity + ");\n";
                str += name2 + "->setPosition(" + child2.x + ", " + child2.y + ");\n";
                str += name2 + "->setAnchorPoint(ccp(" + child2.anchorX + ", " + child2.anchorY + ");\n";
                str += name2 + "->setScaleX(" + child2.scaleX + ");\n";
                str += name2 + "->setScaleY(" + child2.scaleY + ");\n";
                str += name2 + "->setSkewX(" + child2.skewX + ");\n";
                str += name2 + "->setSkewY(" + child2.skewY + ");\n";
                str += name2 + "->setRotationX(" + child2.rotationX + ");\n";
                str += name2 + "->setRotationY(" + child2.rotationY + ");\n";
                str += name2 + "->setZOrder(" + child2.zIndex + ");\n";
                str += child.tag + "->addChild(" + name2 + ");\n\n";
            }
        }

        return str;
    };

    cctools.init = function() {
        var size = cc.director.getWinSize();

        cctools.isRun = false;
        cctools.MainScene.removeAllChildren();
        cctools.initTree();

        var colorLayer = new cc.LayerColor(cc.color(0, 0, 0), size.width, size.height);
        colorLayer.tag = 'colorLayer';
        cctools.MainScene.addChild(colorLayer);
    };

    cctools.initTree = function() {
        $('#jstreeNode').jstree('destroy');
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
                                cctools.propNode = cctools.MainScene.getChildByTag(n.parent_tags).getChildByTag(n.text);
                            }
                            else {
                                cctools.propNode = cctools.MainScene.getChildByTag(n.text);
                            }

                            $('#propColorInput').val("#" + cctools.propNode.color.r.toString(16) + cctools.propNode.color.g.toString(16) + cctools.propNode.color.b.toString(16) + cctools.propNode.color.a.toString(16));
                            $('#propNameInput').val(cctools.propNode.tag);
                            $('#propXInput').val(cctools.propNode.x);
                            $('#propYInput').val(cctools.propNode.y);
                            $('#propOpacityInput').val(cctools.propNode.opacity);
                            $('#propAXInput').val(cctools.propNode.anchorX);
                            $('#propAYInput').val(cctools.propNode.anchorY);
                            $('#propScaleXInput').val(cctools.propNode.scaleX);
                            $('#propScaleYInput').val(cctools.propNode.scaleY);
                            $('#propRotationXInput').val(cctools.propNode.rotationX);
                            $('#propRotationYInput').val(cctools.propNode.rotationY);
                            $('#propSkewXInput').val(cctools.propNode.skewX);
                            $('#propSkewYInput').val(cctools.propNode.skewY);
                            $('#propzIndexInput').val(cctools.propNode.zIndex);
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
                exParent = cctools.MainScene.getChildByTag(exParentName);
            }

            if(!exParent) {
                exParent = cctools.MainScene;
            }

            parent = cctools.MainScene.getChildByTag($('#jstreeNode').jstree(true).get_node(data.parent).text);
            $('#jstreeNode').jstree(true).get_node(data.node).parent_tags = $('#jstreeNode').jstree(true).get_node(data.parent).text

            if(!parent) parent = cctools.MainScene;

            node = exParent.getChildByTag(data.node.text);
            exParent.removeChildByTag(data.node.text);
            parent.addChild(node);
        });

        $('#jstreeNode').on('rename_node.jstree', function (event, obj) {
            var node;
            node = cctools.MainScene.getChildByTag(obj.old);
            node.tag = obj.text;
        });

        $('#jstreeNode').on('delete_node.jstree', function (event, obj) {
            cctools.MainScene.removeChildByTag(obj.node.text);
        });

        $('#jstreeAction').jstree('destroy');
        $('#jstreeAction').jstree({"core":{"check_callback" : true}, "plugins" : [ "unique", "contextmenu", "dnd", "wholerow" ], "contextmenu" : {
            "items" : function ($node) {
                return {
                    "Edit" : {
                        "label" : "Edit",
                        "action" : function (obj) {
                            var n = $('#jstreeAction').jstree(true).get_node(obj.reference);

                            if(n.data.isSequence) {
                                alert('This action is sequence action!');
                                return;
                            }

                            if(n.data.isEase) {
                                alert('This action is ease action!');
                                return;
                            }

                            for(var i = 0;i < cctools.BasicActionList.length;i++) {
                                if(cctools.BasicActionList[i][0].value === n.data.type) {
                                    cctools.actionIndex = i;
                                    break;
                                }
                            }

                            $('#actionModalTitle').html(cctools.BasicActionList[cctools.actionIndex][0].title);
                            $('#actionModalForm').empty();

                            for(i = 1;i < cctools.BasicActionList[cctools.actionIndex].length;i++) {
                                if(cctools.BasicActionList[cctools.actionIndex][i].id != 'name') $('#actionModalForm').append('<div class="form-group"> <label for="actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id + '">' + cctools.BasicActionList[cctools.actionIndex][i].title + '</label><input type="' + cctools.BasicActionList[cctools.actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id + '" placeholder="' + cctools.BasicActionList[cctools.actionIndex][i].title + '" value="' + eval('n.data.' + cctools.BasicActionList[cctools.actionIndex][i].id) +'"></div>');
                            }

                            $('#actionModalBtn').text('Edit');
                            $('#actionModal').modal('show');

                            $('#actionModalBtn').unbind('click');
                            $('#actionModalBtn').click(function() {
                                for(i = 1;i < cctools.BasicActionList[cctools.actionIndex].length;i++) {
                                    if(cctools.BasicActionList[cctools.actionIndex][i].id != 'name') n.data[cctools.BasicActionList[cctools.actionIndex][i].id] = $('#actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id).val();
                                }

                                $('#actionModal').modal('hide');
                            });
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

                            if(cctools.isRun) return;

                            if(cctools.MainScene._children.length < 2) {
                                alert('Please add a node.');
                                return;
                            }

                            cctools.targetAction = n;

                            $('#runTargetInput option').remove();

                            for(i = 1;i < cctools.MainScene._children.length;i++) {
                                $('#runTargetInput').append('<option>' + cctools.MainScene._children[i].tag +'</option>');
                            }

                            $('#runActionModal').modal('show');
                        }
                    }
                };
            }
        }});

        $('#jstreeAction').on('move_node.jstree', function (event, data) {
            // Parent action is root
            if(data.parent == '#') return;

            if(!$('#jstreeAction').jstree(true).get_node(data.parent).data.isSequence && !$('#jstreeAction').jstree(true).get_node(data.parent).data.isEase) {
                var parent = $('#jstreeAction').jstree(true).get_node(data.old_parent);
                $('#jstreeAction').jstree(true).move_node(data.node, parent);
                alert('Parent action is must sequence action or ease action!');
                return;
            }

            if($('#jstreeAction').jstree(true).get_node(data.parent).data.isEase && $('#jstreeAction').jstree(true).get_node(data.parent).children.length > 1) {
                var parent = $('#jstreeAction').jstree(true).get_node(data.old_parent);
                $('#jstreeAction').jstree(true).move_node(data.node, parent);
                alert('ease action can have only one children!');
                return;
            }
        });
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

    // Node List Init
    $.getJSON("res/nodes.json", function(data) {
        cctools.NodeList = data;

        for(var i = 0;i < cctools.NodeList.length;i++) {
            $('#nodeList').append('<li class="list-group-item"><a class="node-list-btn" href="#" data-toggle="modal" data-target="#nodeModal" data-type="' + cctools.NodeList[i][0].value + '">' + cctools.NodeList[i][0].title + '</a></li>');
        }

        $('.node-list-btn').click(function(e) {
            var i;
            for(i = 0;i < cctools.NodeList.length;i++) {
                if(cctools.NodeList[i][0].value === e.currentTarget.childNodes[0].data) {
                    cctools.nodeIndex = i;
                    break;
                }
            }

            $('#nodeModalTitle').html(cctools.NodeList[cctools.nodeIndex][0].title);
            $('#nodeModalForm').empty();
            $('#spriteImagePreivew').hide();

            for(i = 1;i < cctools.NodeList[cctools.nodeIndex].length;i++) {
                $('#nodeModalForm').append('<div class="form-group"> <label for="nodeModal' + cctools.NodeList[cctools.nodeIndex][i].id + '">' + cctools.NodeList[cctools.nodeIndex][i].title + '</label><input type="' + cctools.NodeList[cctools.nodeIndex][i].type + '" class="form-control" id="nodeModal' + cctools.NodeList[cctools.nodeIndex][i].id + '" placeholder="' + cctools.NodeList[cctools.nodeIndex][i].title + '" value="' + cctools.NodeList[cctools.nodeIndex][i].value +'"></div>');
                if(cctools.NodeList[cctools.nodeIndex][i].type === 'file') {
                    $('#nodeModal' + cctools.NodeList[cctools.nodeIndex][i].id).setPreview(opt);
                    $('#nodeModalForm').append('<input type="hidden" id="spriteFilename" />');
                }
            }
            $('#nodeModalBtn').unbind('click');
            $('#nodeModalBtn').click(function() {
                var n = cctools.MainScene.getChildByTag($('#nodeModal' + cctools.NodeList[cctools.nodeIndex][1].id).val());
                if(!n) {
                    var size = cc.director.getWinSize(), node;

                    switch(cctools.NodeList[cctools.nodeIndex][0].value) {
                        case "cc.LabelTTF" :
                            node = new cc.LabelTTF($('#nodeModal' + cctools.NodeList[cctools.nodeIndex][2].id).val(), $('#nodeModal' + cctools.NodeList[cctools.nodeIndex][3].id).val(), $('#nodeModal' + cctools.NodeList[cctools.nodeIndex][4].id).val());
                            break;
                        case "cc.Sprite" :
                            node = new cc.Sprite($('#spriteImagePreivew')[0].src);
                            node.filename = $('#spriteFilename').val();
                            break;
                        case "cc.Layer" :
                            node = new cc.Layer();
                            break;
                        case "cc.LayerColor" :
                            node = new cc.LayerColor();
                            break;
                    }

                    node.tag = $('#nodeModal' + cctools.NodeList[cctools.nodeIndex][1].id).val();
                    node.setPosition(size.width / 2, size.height / 2);
                    cctools.MainScene.addChild(node);
                    $('#nodeModal').modal('hide');
                    $('#jstreeNode').jstree("create_node", "#", {text:$('#nodeModal' + cctools.NodeList[cctools.nodeIndex][1].id).val(), data:{type:cctools.NodeList[cctools.nodeIndex][0].value, parent:"#"}}, "last");
                }
                else {
                    alert('Same tag already exists.');
                }
            });
        });
    });

    // Action List Init
    $.getJSON("res/basic_actions.json", function(data) {
        cctools.BasicActionList = data;

        for(var i = 0;i < cctools.BasicActionList.length;i++) {
            $('#collapseBasicAction').append('<li class="list-group-item"><a class="basic-action-list-btn" href="#" data-toggle="modal" data-target="#actionModal" data-type="' + cctools.BasicActionList[i][0].value + '">' + cctools.BasicActionList[i][0].title + '</a></li>');
        }

        $('.basic-action-list-btn').click(function(e) {
            var i;
            for(i = 0;i < cctools.BasicActionList.length;i++) {
                if(cctools.BasicActionList[i][0].value === e.currentTarget.childNodes[0].data) {
                    cctools.actionIndex = i;
                    break;
                }
            }

            $('#actionModalBtn').text('Create');
            $('#actionModalTitle').html(cctools.BasicActionList[cctools.actionIndex][0].title);
            $('#actionModalForm').empty();

            for(i = 1;i < cctools.BasicActionList[cctools.actionIndex].length;i++) {
                $('#actionModalForm').append('<input type="hidden" id="actionModalType" value="' + cctools.BasicActionList[cctools.actionIndex][0].value + '" /><div class="form-group"> <label for="actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id + '">' + cctools.BasicActionList[cctools.actionIndex][i].title + '</label><input type="' + cctools.BasicActionList[cctools.actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id + '" placeholder="' + cctools.BasicActionList[cctools.actionIndex][i].title + '" value="' + cctools.BasicActionList[cctools.actionIndex][i].value +'"></div>');
            }
            $('#actionModalBtn').unbind('click');
            $('#actionModalBtn').click(function() {
                var check = $('#jstreeAction').jstree("create_node", "#", {text:'<span class="label label-primary">' + $('#actionModalType').val() + "</span> " + $('#actionModalname').val()}, "last");

                if(!check) {
                    alert('Action name already exists.');
                }
                else {
                    check = $('#jstreeAction').jstree(true).get_node(check);
                    check.data = {};
                    check.data.type = cctools.BasicActionList[cctools.actionIndex][0].value;
                    check.data.isSequence = false;

                    for(i = 1;i < cctools.BasicActionList[cctools.actionIndex].length;i++) {
                        check.data[cctools.BasicActionList[cctools.actionIndex][i].id] = $('#actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id).val();
                    }

                    $('#actionModal').modal('hide');
                }
            });
        });
    });

    $.getJSON("res/sequence_actions.json", function(data) {
        cctools.SequenceActionList = data;

        for(var i = 0;i < cctools.SequenceActionList.length;i++) {
            $('#collapseSequenceAction').append('<li class="list-group-item"><a class="sequence-action-list-btn" href="#" data-toggle="modal" data-target="#actionModal" data-type="' + cctools.SequenceActionList[i][0].value + '">' + cctools.SequenceActionList[i][0].title + '</a></li>');
        }

        $('.sequence-action-list-btn').click(function(e) {
            var i;
            for(i = 0;i < cctools.SequenceActionList.length;i++) {
                if(cctools.SequenceActionList[i][0].value === e.currentTarget.childNodes[0].data) {
                    cctools.actionIndex = i;
                    break;
                }
            }

            $('#actionModalBtn').text('Create');
            $('#actionModalTitle').html(cctools.SequenceActionList[cctools.actionIndex][0].title);
            $('#actionModalForm').empty();

            for(i = 1;i < cctools.SequenceActionList[cctools.actionIndex].length;i++) {
                $('#actionModalForm').append('<input type="hidden" id="actionModalType" value="' + cctools.SequenceActionList[cctools.actionIndex][0].value + '" /><div class="form-group"> <label for="actionModal' + cctools.SequenceActionList[cctools.actionIndex][i].id + '">' + cctools.SequenceActionList[cctools.actionIndex][i].title + '</label><input type="' + cctools.SequenceActionList[cctools.actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.SequenceActionList[cctools.actionIndex][i].id + '" placeholder="' + cctools.SequenceActionList[cctools.actionIndex][i].title + '" value="' + cctools.SequenceActionList[cctools.actionIndex][i].value +'"></div>');
            }
            $('#actionModalBtn').unbind('click');
            $('#actionModalBtn').click(function() {
                var check = $('#jstreeAction').jstree("create_node", "#", {text:'<span class="label label-default">' + $('#actionModalType').val() + "</span> " + $('#actionModalname').val()}, "last");

                if(!check) {
                    alert('Action name already exists.');
                }
                else {
                    check = $('#jstreeAction').jstree(true).get_node(check);
                    check.data = {};
                    check.data.type = cctools.SequenceActionList[cctools.actionIndex][0].value;
                    check.data.isSequence = true;

                    for(i = 1;i < cctools.SequenceActionList[cctools.actionIndex].length;i++) {
                        check.data[cctools.SequenceActionList[cctools.actionIndex][i].id] = $('#actionModal' + cctools.SequenceActionList[cctools.actionIndex][i].id).val();
                    }

                    $('#actionModal').modal('hide');
                }
            });
        });
    });

    $.getJSON("res/ease_actions.json", function(data) {
        cctools.EaseActionList = data;

        for(var i = 0;i < cctools.EaseActionList.length;i++) {
            $('#collapseEaseAction').append('<li class="list-group-item"><a class="ease-action-list-btn" href="#" data-toggle="modal" data-target="#actionModal" data-type="' + cctools.EaseActionList[i][0].value + '">' + cctools.EaseActionList[i][0].title + '</a></li>');
        }

        $('.ease-action-list-btn').click(function(e) {
            var i;
            for(i = 0;i < cctools.EaseActionList.length;i++) {
                if(cctools.EaseActionList[i][0].value === e.currentTarget.childNodes[0].data) {
                    cctools.actionIndex = i;
                    break;
                }
            }

            $('#actionModalBtn').text('Create');
            $('#actionModalTitle').html(cctools.EaseActionList[cctools.actionIndex][0].title);
            $('#actionModalForm').empty();

            for(i = 1;i < cctools.EaseActionList[cctools.actionIndex].length;i++) {
                $('#actionModalForm').append('<input type="hidden" id="actionModalType" value="' + cctools.EaseActionList[cctools.actionIndex][0].value + '" /><div class="form-group"> <label for="actionModal' + cctools.EaseActionList[cctools.actionIndex][i].id + '">' + cctools.EaseActionList[cctools.actionIndex][i].title + '</label><input type="' + cctools.EaseActionList[cctools.actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.EaseActionList[cctools.actionIndex][i].id + '" placeholder="' + cctools.EaseActionList[cctools.actionIndex][i].title + '" value="' + cctools.EaseActionList[cctools.actionIndex][i].value +'"></div>');
            }
            $('#actionModalBtn').unbind('click');
            $('#actionModalBtn').click(function() {
                var check = $('#jstreeAction').jstree("create_node", "#", {text:'<span class="label label-success">' + $('#actionModalType').val() + "</span> " + $('#actionModalname').val()}, "last");

                if(!check) {
                    alert('Action name already exists.');
                }
                else {
                    check = $('#jstreeAction').jstree(true).get_node(check);
                    check.data = {};
                    check.data.type = cctools.EaseActionList[cctools.actionIndex][0].value;
                    check.data.isEase = true;

                    for(i = 1;i < cctools.EaseActionList[cctools.actionIndex].length;i++) {
                        check.data[cctools.EaseActionList[cctools.actionIndex][i].id] = $('#actionModal' + cctools.EaseActionList[cctools.actionIndex][i].id).val();
                    }

                    $('#actionModal').modal('hide');
                }
            });
        });
    });

    $('#propColorInput').colorpicker();
    $('#canvasBackgroundInput').colorpicker();
    $('#canvasLayerBackgroundInput').colorpicker();

    $("#canvasBackgroundInput").on("change.color", function(event, color){
        $('#Cocos2dGameContainer').css('background-color', $('#canvasBackgroundInput').val());
    });

    $("#canvasLayerBackgroundInput").on("change.color", function(event, color){
        var layerColor = $('#canvasLayerBackgroundInput').val();
        cctools.MainScene.getChildByTag('colorLayer').color = cc.color(parseInt(layerColor.substring(1, 3), 16), parseInt(layerColor.substring(3, 5), 16), parseInt(layerColor.substring(5, 7), 16), 255);
    });

    $("#propColorInput").on("change.color", function(event, color){
        if(cctools.propNode) {
            var color = $('#propColorInput').val();
            cctools.propNode.color = cc.color(parseInt(color.substring(1, 3), 16), parseInt(color.substring(3, 5), 16), parseInt(color.substring(5, 7), 16), 255);
        }
    });

    $('#exampleBtn').click(function(e) {
        var size = cc.director.getWinSize();
        cctools.init();

        // create layer
        var layer = new cc.Layer();
        layer.tag = 'layer1';
        layer.setPosition(0, 0);
        cctools.MainScene.addChild(layer);
        var layerNode = $('#jstreeNode').jstree("create_node", "#", {text:'layer1', data:{type:'cc.Layer', parent:"#"}}, "last");

        // create label
        var label = new cc.LabelTTF('cctools', 'Arial', 30);
        label.tag = 'label1';
        label.setPosition(size.width / 2, size.height / 2 + 100);
        layer.addChild(label);
        var labelNode = $('#jstreeNode').jstree("create_node", layerNode, {text:'label1', data:{type:'cc.LabelTTF', parent:layerNode, parent_tags:'layer1'}}, "last");
        $('#jstreeNode').jstree(true).get_node(labelNode).parent_tags = 'layer1';

        // create sprite
        var sprite = new cc.Sprite('http://cocos2d-x.org/images/logo.png');
        sprite.tag = 'sprite1';
        sprite.filename = 'http://cocos2d-x.org/images/logo.png';
        sprite.setPosition(size.width / 2, size.height / 2);
        layer.addChild(sprite);
        var spriteNode = $('#jstreeNode').jstree("create_node", layerNode, {text:'sprite1', data:{filename:'http://cocos2d-x.org/images/logo.png', type:'cc.Sprite', parent:layerNode, parent_tags:'layer1'}}, "last");
        $('#jstreeNode').jstree(true).get_node(spriteNode).parent_tags = 'layer1';

        var sequenceAction = $('#jstreeAction').jstree("create_node", "#", {text:'<span class="label label-default">cc.Sequence</span> sequence1'}, "last");
        sequenceAction = $('#jstreeAction').jstree(true).get_node(sequenceAction);
        sequenceAction.data = {
            isSequence : true,
            name : 'sequence1',
            type : 'cc.Sequence'
        };

        var movetoAction = $('#jstreeAction').jstree("create_node", sequenceAction.id, {text:'<span class="label label-primary">cc.MoveTo</span> moveto1'}, "last");
        movetoAction = $('#jstreeAction').jstree(true).get_node(movetoAction);
        movetoAction.data = {
            type : 'cc.MoveTo',
            name : 'moveto1',
            isSequence : false,
            x : -size.width / 2,
            y : -size.height / 2,
            duration : 1
        };

        var spawnAction = $('#jstreeAction').jstree("create_node", sequenceAction.id, {text:'<span class="label label-default">cc.Spawn</span> spawn1'}, "last");
        spawnAction = $('#jstreeAction').jstree(true).get_node(spawnAction);
        spawnAction.data = {
            type : 'cc.Spawn',
            name : 'spawn1',
            isSequence : true
        };

        var rotateAction = $('#jstreeAction').jstree("create_node", spawnAction.id, {text:'<span class="label label-primary">cc.RotateTo</span> rotateto1'}, "last");
        rotateAction = $('#jstreeAction').jstree(true).get_node(rotateAction);
        rotateAction.data = {
            type : 'cc.RotateTo',
            name : 'rotateto1',
            isSequence : false,
            x : 180,
            y : 180,
            duration : 1
        };

        var moveto2Action = $('#jstreeAction').jstree("create_node", spawnAction.id, {text:'<span class="label label-primary">cc.MoveTo</span> moveto2'}, "last");
        moveto2Action = $('#jstreeAction').jstree(true).get_node(moveto2Action);
        moveto2Action.data = {
            type : 'cc.MoveTo',
            name : 'moveto2',
            isSequence : false,
            x : 0,
            y : 0,
            duration : 1
        };

        var easeAction = $('#jstreeAction').jstree("create_node", sequenceAction.id, {text:'<span class="label label-success">cc.EaseBackIn</span> easebackin1'}, "last");
        easeAction = $('#jstreeAction').jstree(true).get_node(easeAction);
        easeAction.data = {
            type : 'cc.EaseBackIn',
            name : 'easebackin1',
            isEase : true
        };

        var moveto3Action = $('#jstreeAction').jstree("create_node", easeAction.id, {text:'<span class="label label-primary">cc.MoveTo</span> moveto3'}, "last");
        moveto3Action = $('#jstreeAction').jstree(true).get_node(moveto3Action);
        moveto3Action.data = {
            type : 'cc.MoveTo',
            name : 'moveto3',
            isSequence : false,
            x : -size.width / 2,
            y : -size.height / 2,
            duration : 1
        };
    });

    // Storage Init
    $('#storageInput').change(function() {
        $('#cctools.storageName').val($('#storageInput option:selected').text());
    });

    $('#removeBtn').click(function() {
        var data = {};

        if(!$('#storageInput option:selected').text() || $('#storageInput option:selected').text() === 'Select the storage') {
            alert('Please select the storage');
            return;
        }

        localStorage.removeItem($('#storageInput option:selected').text());

        cctools.refreshStorage();
    });


    $('#renameBtn').click(function() {
        var data = {};

        if(!$('#storageInput option:selected').text() || $('#storageInput option:selected').text() === 'Select the storage') {
            alert('Please select the storage');
            return;
        }

        if(!$('#cctools.storageName').val()) {
            alert('Please enter the storage name');
            return;
        }

        localStorage.setItem($('#cctools.storageName').val(), localStorage.getItem($('#storageInput option:selected').text()));
        localStorage.removeItem($('#storageInput option:selected').text());

        cctools.refreshStorage();
    });

    $('#saveBtn').click(function() {
        var data = {};

        if(!$('#cctools.storageName').val()) {
            alert('Please enter the storage name');
            return;
        }

        data.canvas = {
            canvas_width : $('#canvasWidthInput').val(),
            canvas_height : $('#canvasHeightInput').val(),
            resoultion_policy : $('#canvasResInput').val()
        };

        data.action_tree = $('#jstreeAction').jstree(true).get_json(null, { "flat" : true });
        data.node_tree = $('#jstreeNode').jstree(true).get_json(null, { "flat" : true });
        data.node_str = cctools.getNodeStr();

        localStorage.setItem($('#cctools.storageName').val(), CircularJSON.stringify(data));
        cctools.storageName = $('#cctools.storageName').val();

        $('#storageModal').modal('hide');
    });

    $('#loadBtn').click(function() {
        var data;

        if($('#storageInput option:selected').text() === 'Select the storage') {
            alert('Please select the storage');
            return;
        }

        data = CircularJSON.parse(localStorage.getItem($('#storageInput option:selected').text()));

        cctools.init();

        $('#canvasWidthInput').val(data.canvas.canvas_width);
        $('#canvasHeightInput').val(data.canvas.canvas_height);
        $('#canvasResInput').val(data.canvas.resoultion_policy);
        $('.canvas-input').trigger('change');

        $('#jstreeNode').jstree('destroy');
        $('#jstreeNode').jstree({"core":{"check_callback" : true, "data" : data.node_tree }, "plugins" : [ "unique", "contextmenu", "dnd", "wholerow" ], "contextmenu" : {
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
                            if(n.data.parent_tags) {
                                cctools.propNode = cctools.MainScene.getChildByTag(n.data.parent_tags).getChildByTag(n.text);
                            }
                            else {
                                cctools.propNode = cctools.MainScene.getChildByTag(n.text);
                            }

                            if(cctools.propNode.hasOwnProperty('color')) $('#propColorInput').val("#" + cctools.propNode.color.r.toString(16) + cctools.propNode.color.g.toString(16) + cctools.propNode.color.b.toString(16) + cctools.propNode.color.a.toString(16));
                            $('#propNameInput').val(cctools.propNode.tag);
                            $('#propXInput').val(cctools.propNode.x);
                            $('#propYInput').val(cctools.propNode.y);
                            $('#propOpacityInput').val(cctools.propNode.opacity);
                            $('#propAXInput').val(cctools.propNode.anchorX);
                            $('#propAYInput').val(cctools.propNode.anchorY);
                            $('#propScaleXInput').val(cctools.propNode.scaleX);
                            $('#propScaleYInput').val(cctools.propNode.scaleY);
                            $('#propRotationXInput').val(cctools.propNode.rotationX);
                            $('#propRotationYInput').val(cctools.propNode.rotationY);
                            $('#propSkewXInput').val(cctools.propNode.skewX);
                            $('#propSkewYInput').val(cctools.propNode.skewY);
                            $('#propzIndexInput').val(cctools.propNode.zIndex);
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
                exParent = cctools.MainScene.getChildByTag(exParentName);
            }

            if(!exParent) {
                exParent = cctools.MainScene;
            }

            parent = cctools.MainScene.getChildByTag($('#jstreeNode').jstree(true).get_node(data.parent).text);
            $('#jstreeNode').jstree(true).get_node(data.node).parent_tags = $('#jstreeNode').jstree(true).get_node(data.parent).text

            if(!parent) parent = cctools.MainScene;

            node = exParent.getChildByTag(data.node.text);
            exParent.removeChildByTag(data.node.text);
            parent.addChild(node);
        });

        $('#jstreeNode').on('rename_node.jstree', function (event, obj) {
            var node;
            node = cctools.MainScene.getChildByTag(obj.old);
            node.tag = obj.text;
        });

        $('#jstreeNode').on('delete_node.jstree', function (event, obj) {
            cctools.MainScene.removeChildByTag(obj.node.text);
        });

        $('#jstreeAction').jstree('destroy');
        $('#jstreeAction').jstree({"core":{"check_callback" : true, "data" : data.action_tree}, "plugins" : [ "unique", "contextmenu", "dnd", "wholerow" ], "contextmenu" : {
            "items" : function ($node) {
                return {
                    "Edit" : {
                        "label" : "Edit",
                        "action" : function (obj) {
                            var n = $('#jstreeAction').jstree(true).get_node(obj.reference);

                            if(n.isSequence) {
                                alert('This action is sequence action!');
                                return;
                            }

                            if(n.isEase) {
                                alert('This action is ease action!');
                                return;
                            }

                            for(var i = 0;i < cctools.BasicActionList.length;i++) {
                                if(cctools.BasicActionList[i][0].value === n.type) {
                                    cctools.actionIndex = i;
                                    break;
                                }
                            }

                            $('#actionModalTitle').html(cctools.BasicActionList[cctools.actionIndex][0].title);
                            $('#actionModalForm').empty();

                            for(i = 1;i < cctools.BasicActionList[cctools.actionIndex].length;i++) {
                                if(cctools.BasicActionList[cctools.actionIndex][i].id != 'name') $('#actionModalForm').append('<div class="form-group"> <label for="actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id + '">' + cctools.BasicActionList[cctools.actionIndex][i].title + '</label><input type="' + cctools.BasicActionList[cctools.actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id + '" placeholder="' + cctools.BasicActionList[cctools.actionIndex][i].title + '" value="' + eval('n.' + cctools.BasicActionList[cctools.actionIndex][i].id) +'"></div>');
                            }

                            $('#actionModalBtn').text('Edit');
                            $('#actionModal').modal('show');

                            $('#actionModalBtn').unbind('click');
                            $('#actionModalBtn').click(function() {
                                for(i = 1;i < cctools.BasicActionList[cctools.actionIndex].length;i++) {
                                    if(cctools.BasicActionList[cctools.actionIndex][i].id != 'name') n[cctools.BasicActionList[cctools.actionIndex][i].id] = $('#actionModal' + cctools.BasicActionList[cctools.actionIndex][i].id).val();
                                }

                                $('#actionModal').modal('hide');
                            });
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

                            if(cctools.isRun) return;

                            if(cctools.MainScene._children.length < 2) {
                                alert('Please add a node.');
                                return;
                            }

                            cctools.targetAction = n;

                            $('#runTargetInput option').remove();

                            for(i = 1;i < cctools.MainScene._children.length;i++) {
                                $('#runTargetInput').append('<option>' + cctools.MainScene._children[i].tag +'</option>');
                            }

                            $('#runActionModal').modal('show');
                        }
                    }
                };
            }
        }});

        $('#jstreeAction').on('move_node.jstree', function (event, data) {
            // Parent action is root
            if(data.parent == '#') return;

            if(!$('#jstreeAction').jstree(true).get_node(data.parent).data.isSequence && !$('#jstreeAction').jstree(true).get_node(data.parent).data.isEase) {
                var parent = $('#jstreeAction').jstree(true).get_node(data.old_parent);
                $('#jstreeAction').jstree(true).move_node(data.node, parent);
                alert('Parent action is must sequence action or ease action!');
                return;
            }

            if($('#jstreeAction').jstree(true).get_node(data.parent).data.isEase && $('#jstreeAction').jstree(true).get_node(data.parent).children.length > 1) {
                var parent = $('#jstreeAction').jstree(true).get_node(data.old_parent);
                $('#jstreeAction').jstree(true).move_node(data.node, parent);
                alert('ease action can have only one children!');
                return;
            }
        });

        eval(data.node_str);
        cctools.storageName = $('#storageInput option:selected').text();

        $('#storageModal').modal('hide');
    });

    $('.navbar-main > li > a').click(function() {
        if(this.id.split('Btn')[0] === 'code') {
            if($('#jsBtn').hasClass('active')) {
                $('#jsBtn').click();
            }
            else {
                $('#cppBtn').click();
            }

            $('#codeModal').modal('show');
        }
        else if(this.id.split('Btn')[0] === 'storage') {
            cctools.refreshStorage();
            $('#storageModal').modal('show');
        }
        else {
            cctools.sideBtnClick(this.id.split('Btn')[0]);
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
        cctools.MainScene.getChildByTag('colorLayer').color = cc.color(parseInt(layerColor.substring(1, 3), 16), parseInt(layerColor.substring(3, 5), 16), parseInt(layerColor.substring(5, 7), 16), 255);
        cctools.MainScene.getChildByTag('colorLayer').width = $('#canvasWidthInput').val();
        cctools.MainScene.getChildByTag('colorLayer').height = $('#canvasHeightInput').val();
        cc.view.setDesignResolutionSize($('#canvasWidthInput').val(), $('#canvasHeightInput').val(), eval($("#canvasResInput option:selected").text()));
    });

    $('#canvasResInput').change(function() {
        cc.view.setResolutionPolicy(eval($("#canvasResInput option:selected").text()));
    });

    $('.prop-input').change(function() {
        if(cctools.propNode) {
            if(cctools.propNode.hasOwnProperty('color')) cctools.propNode.color = cc.color(parseInt(cctools.propNode.color.substring(1, 3), 16), parseInt(cctools.propNode.color.substring(3, 5), 16), parseInt(cctools.propNode.color.substring(5, 7), 16), 255);
            cctools.propNode.x = parseInt($('#propXInput').val());
            cctools.propNode.y = parseInt($('#propYInput').val());
            cctools.propNode.opacity = parseFloat($('#propOpacityInput').val());
            cctools.propNode.anchorX = parseFloat($('#propAXInput').val());
            cctools.propNode.anchorY = parseFloat($('#propAYInput').val());
            cctools.propNode.scaleX = parseFloat($('#propScaleXInput').val());
            cctools.propNode.scaleY = parseFloat($('#propScaleYInput').val());
            cctools.propNode.rotationX = parseInt($('#propRotationXInput').val());
            cctools.propNode.rotationY = parseInt($('#propRotationYInput').val());
            cctools.propNode.skewX = parseInt($('#propSkewXInput').val());
            cctools.propNode.skewY = parseInt($('#propSkewYInput').val());
            cctools.propNode.zIndex = parseInt($('#propzIndexInput').val());
        }
    });

    $('#xLeftAlign').click(function() {
        if(cctools.propNode) {
            cctools.propNode.x = 0;
            $('#propXInput').val(cctools.propNode.x);
        }
    });

    $('#xCenterAlign').click(function() {
        var size = cc.director.getWinSize();
        if(cctools.propNode) {
            cctools.propNode.x = size.width / 2;
            $('#propXInput').val(cctools.propNode.x);
        }
    });

    $('#xRightAlign').click(function() {
        var size = cc.director.getWinSize();
        if(cctools.propNode) {
            cctools.propNode.x = size.width;
            $('#propXInput').val(cctools.propNode.x);
        }
    });

    $('#yTopAlign').click(function() {
        var size = cc.director.getWinSize();
        if(cctools.propNode) {
            cctools.propNode.y = size.height;
            $('#propYInput').val(cctools.propNode.y);
        }
    });

    $('#yMiddleAlign').click(function() {
        var size = cc.director.getWinSize();
        if(cctools.propNode) {
            cctools.propNode.y = size.height / 2;
            $('#propYInput').val(cctools.propNode.y);
        }
    });

    $('#yBottomAlign').click(function() {
        if(cctools.propNode) {
            cctools.propNode.y = 0;
            $('#propYInput').val(cctools.propNode.y);
        }
    });

    $('#jsBtn').click(function() {
        var i, str = "// Canvas Setting\n";

        $('#jsBtn').addClass('active');
        $('#cppBtn').removeClass('active');

        var editor = ace.edit("codeText");
        editor.getSession().setMode("ace/mode/javascript");

        str += "cc.view.setDesignResolutionSize(" + $('#canvasWidthInput').val() + ", " + $('#canvasHeightInput').val() + ", " + $("#canvasResInput option:selected").text() + ");";
        str += "\n\n";
        str += "// Create Nodes\n\n";

        str += cctools.getNodeStr();

        str += "\n\n";
        str += "// Create Actions\n\n";

        var root = cctools.targetAction = $('#jstreeAction').jstree(true).get_node('#');

        for(i = 0;i < root.children.length;i++) {
            str += "// " + $('#jstreeAction').jstree(true).get_node(root.children[i]).data.name + "\nvar " + $('#jstreeAction').jstree(true).get_node(root.children[i]).data.name + " = ";
            str += cctools.getCocosActionStr(root.children[i]) + ";\n\n";
        }

        $('#codeTextHidden').val(str);

        var editor = ace.edit("codeText");
        editor.setValue(str);
        editor.clearSelection();
    });

    $('#cppBtn').click(function() {
        var i, str = "// Canvas Setting\n", resPolicy ="kResolutionShowAll";

        $('#cppBtn').addClass('active');
        $('#jsBtn').removeClass('active');

        var editor = ace.edit("codeText");
        editor.getSession().setMode("ace/mode/c_cpp");

        switch($("#canvasResInput option:selected").text()) {
            case 'cc.ContainerStrategy.SHOW_ALL':
                resPolicy ="kResolutionShowAll";
                break;
            case 'cc.ContainerStrategy.NO_BORDER':
                resPolicy ="kResolutionNoBorder";
                break;
            case 'cc.ContainerStrategy.EXACT_FIT':
                resPolicy ="kResolutionExactFit";
                break;
            case 'cc.ContainerStrategy.FIXED_WIDTH':
                resPolicy ="kResolutionFixedWidth";
                break;
            case 'cc.ContainerStrategy.FIXED_HEIGHT':
                resPolicy ="kResolutionFixedHeight";
                break;
        }

        // Set the design resolution
        str += "CCDirector* pDirector = CCDirector::sharedDirector();\n";
        str += "CCEGLView* pEGLView = CCEGLView::sharedOpenGLView();\n";

        str += "pDirector->setOpenGLView(pEGLView);\n";
        str += "pEGLView->setDesignResolutionSize(" + $("#canvasWidthInput").val() + ", " + $("#canvasHeightInput").val() + ", " + resPolicy + ");\n";
        str += "\n\n";

        str += "// Create Nodes\n\n";

        str += cctools.getNodeStrCpp();

        str += "\n\n";
        str += "// Create Actions\n\n";

        var root = cctools.targetAction = $('#jstreeAction').jstree(true).get_node('#');

        for(i = 0;i < root.children.length;i++) {
        }

        $('#codeTextHidden').val(str);

        var editor = ace.edit("codeText");
        editor.setValue(str);
        editor.clearSelection();
    });

    var editor = ace.edit("codeText");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/javascript");

    var client = new ZeroClipboard( document.getElementById("codeCopyBtn") );

    cctools.initTree();

    $('#runActionBtn').click(function() {
        var target = cctools.MainScene.getChildByTag($("#runTargetInput option:selected").text()), action;
        cctools.isRun = true;
        cctools.targetActionNode = $.extend({}, target);
        $('#actionStatus').text('Action!');
        $('#actionStatus').removeClass('label-default');
        $('#actionStatus').addClass('label-danger');

        action = cctools.getCocosAction(cctools.targetAction);

        target.runAction(new cc.Sequence(action, new cc.DelayTime(1), new cc.CallFunc(function(sender) {
            cctools.isRun = false;
            sender.color = cctools.targetActionNode.color;
            sender.x = cctools.targetActionNode.x;
            sender.y = cctools.targetActionNode.y;
            sender.scaleX = cctools.targetActionNode.scaleX;
            sender.scaleY = cctools.targetActionNode.scaleY;
            sender.skewX = cctools.targetActionNode.skewX;
            sender.skewY = cctools.targetActionNode.skewY;
            sender.flippedX = cctools.targetActionNode.flipX;
            sender.flippedY = cctools.targetActionNode.flipY;
            sender.rotation = cctools.targetActionNode.rotation;
            sender.runAction(new cc.FadeIn(0));
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
                        event: cc.EventListener.MOUSE,
                        onMouseDown: function(event){
                            var pos = event.getLocation(), target = event.getCurrentTarget(), i, j;
                            for(i = 1;i < target._children.length;i++) {
                                if(cc.rectContainsPoint(target._children[i].getBoundingBox(),pos)) {
                                    cctools.targetNode = target._children[i];
                                    cctools.propNode = target._children[i];
                                    $('#propNameInput').val(cctools.propNode.tag);
                                    $('#propColorInput').val("#" + cctools.propNode.color.r.toString(16) + cctools.propNode.color.g.toString(16) + cctools.propNode.color.b.toString(16) + cctools.propNode.color.a.toString(16));
                                    $('#propXInput').val(cctools.propNode.x);
                                    $('#propYInput').val(cctools.propNode.y);
                                    $('#propOpacityInput').val(cctools.propNode.opacity);
                                    $('#propAXInput').val(cctools.propNode.anchorX);
                                    $('#propAYInput').val(cctools.propNode.anchorY);
                                    $('#propScaleXInput').val(cctools.propNode.scaleX);
                                    $('#propScaleYInput').val(cctools.propNode.scaleY);
                                    $('#propRotationXInput').val(cctools.propNode.rotationX);
                                    $('#propRotationYInput').val(cctools.propNode.rotationY);
                                    $('#propSkewXInput').val(cctools.propNode.skewX);
                                    $('#propSkewYInput').val(cctools.propNode.skewY);
                                    $('#propzIndexInput').val(cctools.propNode.zIndex);
                                    $('#propertyBtn').click();
                                }

                                for(j = 0;j < target._children[i]._children.length;j++) {
                                    if(cc.rectContainsPoint(target._children[i]._children[j].getBoundingBoxToWorld(),pos)) {
                                        cctools.targetNode = target._children[i]._children[j];
                                        cctools.propNode = target._children[i]._children[j];
                                        $('#propNameInput').val(cctools.propNode.tag);
                                        $('#propColorInput').val("#" + cctools.propNode.color.r.toString(16) + cctools.propNode.color.g.toString(16) + cctools.propNode.color.b.toString(16) + cctools.propNode.color.a.toString(16));
                                        $('#propXInput').val(cctools.propNode.x);
                                        $('#propYInput').val(cctools.propNode.y);
                                        $('#propOpacityInput').val(cctools.propNode.opacity);
                                        $('#propAXInput').val(cctools.propNode.anchorX);
                                        $('#propAYInput').val(cctools.propNode.anchorY);
                                        $('#propScaleXInput').val(cctools.propNode.scaleX);
                                        $('#propScaleYInput').val(cctools.propNode.scaleY);
                                        $('#propRotationXInput').val(cctools.propNode.rotationX);
                                        $('#propRotationYInput').val(cctools.propNode.rotationY);
                                        $('#propSkewXInput').val(cctools.propNode.skewX);
                                        $('#propSkewYInput').val(cctools.propNode.skewY);
                                        $('#propzIndexInput').val(cctools.propNode.zIndex);
                                        $('#propertyBtn').click();
                                    }
                                }
                            }
                        },
                        onMouseMove: function(event){
                            var pos = event.getLocation(), target = event.getCurrentTarget();
                            if(cctools.targetNode) {
                                cctools.targetNode.x = parseInt(pos.x - cctools.targetNode.parent.x);
                                cctools.targetNode.y = parseInt(pos.y - cctools.targetNode.parent.y);
                                $('#propXInput').val(cctools.targetNode.x);
                                $('#propYInput').val(cctools.targetNode.y);
                            }
                        },
                        onMouseUp: function(event){
                            var pos = event.getLocation(), target = event.getCurrentTarget();
                            cctools.targetNode = null;
                        }
                    }), this);
                }
            });
            cctools.MainScene = new MyScene();
            cc.director.runScene(cctools.MainScene);
        }, this);
    };

    cc.game.run("gameCanvas");
};