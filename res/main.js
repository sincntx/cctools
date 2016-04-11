window.onload = function() {
    var cctools = {};
    var MainScene, targetNode, targetAction, targetActionNode, propNode, isRun = false, nodeIndex = -1, actionIndex = -1, storageName='';

    cctools.refreshStorage = function() {
        var i;

        $('#storageInput').empty();
        $('#storageInput').append("<option value='select'>Select the storage</option>");

        for (i = 0; i < localStorage.length; i++)   {
            if(storageName === localStorage.key(i))
                $('#storageInput').append("<option selected value='" + localStorage.key(i) + "'>" + localStorage.key(i) + "</option>");
            else
                $('#storageInput').append("<option value='" + localStorage.key(i) + "'>" + localStorage.key(i) + "</option>");
        }

        $('#storageName').val('');
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

        switch(targetAction.type) {
            case "cc.MoveTo":
                action = new cc.MoveTo(parseInt(targetAction.duration), cc.p(parseInt(targetAction.x), parseInt(targetAction.y)));
                break;
            case "cc.MoveBy":
                action = new cc.MoveBy(parseInt(targetAction.duration), cc.p(parseInt(targetAction.x), parseInt(targetAction.y)));
                break;
            case "cc.ScaleTo":
                action = new cc.ScaleTo(parseInt(targetAction.duration), parseInt(targetAction.x), parseInt(targetAction.y));
                break;
            case "cc.ScaleBy":
                action = new cc.ScaleBy(parseInt(targetAction.duration), parseInt(targetAction.x), parseInt(targetAction.y));
                break;
            case "cc.RotateTo":
                action = new cc.RotateTo(parseInt(targetAction.duration), parseInt(targetAction.x), parseInt(targetAction.y));
                break;
            case "cc.RotateBy":
                action = new cc.RotateBy(parseInt(targetAction.duration), parseInt(targetAction.x), parseInt(targetAction.y));
                break;
            case "cc.SkewTo":
                action = new cc.SkewTo(parseInt(targetAction.duration), parseInt(targetAction.x), parseInt(targetAction.y));
                break;
            case "cc.SkewBy":
                action = new cc.SkewBy(parseInt(targetAction.duration), parseInt(targetAction.x), parseInt(targetAction.y));
                break;
            case "cc.FadeIn":
                action = new cc.FadeIn(parseInt(targetAction.duration));
                break;
            case "cc.FadeOut":
                action = new cc.FadeOut(parseInt(targetAction.duration));
                break;
            case "cc.JumpTo":
                action = new cc.JumpTo(parseInt(targetAction.duration), cc.p(parseInt(targetAction.x), parseInt(targetAction.y)), parseInt(targetAction.height), parseInt(targetAction.jumps));
                break;
            case "cc.JumpBy":
                action = new cc.JumpBy(parseInt(targetAction.duration), cc.p(parseInt(targetAction.x), parseInt(targetAction.y)), parseInt(targetAction.height), parseInt(targetAction.jumps));
                break;
            case "cc.Blink":
                action = new cc.Blink(parseInt(targetAction.duration), parseInt(targetAction.blinks));
                break;
            case "cc.TintTo":
                action = new cc.TintTo(parseInt(targetAction.duration), parseInt(targetAction.r), parseInt(targetAction.g), parseInt(targetAction.b));
                break;
            case "cc.TintBy":
                action = new cc.TintBy(parseInt(targetAction.duration), parseInt(targetAction.r), parseInt(targetAction.g), parseInt(targetAction.b));
                break;
            case "cc.Show":
                action = new cc.Show();
                break;
            case "cc.Hide":
                action = new cc.Hide();
                break;
            case "cc.Place":
                action = new cc.Place(cc.p(parseInt(targetAction.x), parseInt(targetAction.y)));
                break;
            case "cc.FlipX":
                action = new cc.FlipX(eval(targetAction.flip));
                break;
            case "cc.FlipY":
                action = new cc.FlipY(eval(targetAction.flip));
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

                action = eval("new " + targetAction.type + "(cctools.getCocosAction(targetAction.children[0]))");
                break;
        }

        return action;
    };

    cctools.getCocosActionStr = function(targetAction) {
        var action;

        if(!targetAction.hasOwnProperty('id')) targetAction = $('#jstreeAction').jstree(true).get_node(targetAction);

        switch(targetAction.type) {
            case "cc.MoveTo":
                action = "new cc.MoveTo(" + parseInt(targetAction.duration) + ", cc.p(" + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + "))";
                break;
            case "cc.MoveBy":
                action = "new cc.MoveBy(" + parseInt(targetAction.duration) + ", cc.p(" + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + "))";
                break;
            case "cc.ScaleTo":
                action = "new cc.ScaleTo(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + ")";
                break;
            case "cc.ScaleBy":
                action = "new cc.ScaleBy(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + ")";
                break;
            case "cc.RotateTo":
                action = "new cc.RotateTo(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + ")";
                break;
            case "cc.RotateBy":
                action = "new cc.RotateBy(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + ")";
                break;
            case "cc.SkewTo":
                action = "new cc.SkewTo(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + ")";
                break;
            case "cc.SkewBy":
                action = "new cc.SkewBy(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + ")";
                break;
            case "cc.FadeIn":
                action = "new cc.FadeIn(" + parseInt(targetAction.duration) + ")";
                break;
            case "cc.FadeOut":
                action = "new cc.FadeOut(" + parseInt(targetAction.duration) + ")";
                break;
            case "cc.JumpTo":
                action = "new cc.JumpTo(" + parseInt(targetAction.duration) + ", cc.p(" + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + ") + , " + parseInt(targetAction.height) + ", " + parseInt(targetAction.jumps) + ")";
                break;
            case "cc.JumpBy":
                action = "new cc.JumpBy(" + parseInt(targetAction.duration) + ", cc.p(" + parseInt(targetAction.x) + ", " + parseInt(targetAction.y) + ") + , " + parseInt(targetAction.height) + ", " + parseInt(targetAction.jumps) + ")";
                break;
            case "cc.Blink":
                action = "new cc.Blink(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.blinks) + ")";
                break;
            case "cc.TintTo":
                action = "new cc.TintTo(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.r) + ", " + parseInt(targetAction.g) + ", " + parseInt(targetAction.b) + ")";
                break;
            case "cc.TintBy":
                action = "new cc.TintBy(" + parseInt(targetAction.duration) + ", " + parseInt(targetAction.r) + ", " + parseInt(targetAction.g) + ", " + parseInt(targetAction.b) + ")";
                break;
            case "cc.Show":
                action = "new cc.Show()";
                break;
            case "cc.Hide":
                action = "new cc.Hide()";
                break;
            case "cc.Place":
                action = "new cc.Place(cc.p(" + parseInt(targetAction.x) +", " + parseInt(targetAction.y) + "))";
                break;
            case "cc.FlipX":
                action = "new cc.FlipX(" + targetAction.flip + ")";
                break;
            case "cc.FlipY":
                action = "new cc.FlipY(" + targetAction.flip + ")";
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

                action = "new " + targetAction.type + "(" + cctools.getCocosActionStr(targetAction.children[0]) + ")";
                break;
        }

        return action;
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
                    nodeIndex = i;
                    break;
                }
            }

            $('#nodeModalTitle').html(cctools.NodeList[nodeIndex][0].title);
            $('#nodeModalForm').empty();
            $('#spriteImagePreivew').hide();

            for(i = 1;i < cctools.NodeList[nodeIndex].length;i++) {
                $('#nodeModalForm').append('<div class="form-group"> <label for="nodeModal' + cctools.NodeList[nodeIndex][i].id + '">' + cctools.NodeList[nodeIndex][i].title + '</label><input type="' + cctools.NodeList[nodeIndex][i].type + '" class="form-control" id="nodeModal' + cctools.NodeList[nodeIndex][i].id + '" placeholder="' + cctools.NodeList[nodeIndex][i].title + '" value="' + cctools.NodeList[nodeIndex][i].value +'"></div>');
                if(cctools.NodeList[nodeIndex][i].type === 'file') {
                    $('#nodeModal' + cctools.NodeList[nodeIndex][i].id).setPreview(opt);
                    $('#nodeModalForm').append('<input type="hidden" id="spriteFilename" />');
                }
            }
            $('#nodeModalBtn').unbind('click');
            $('#nodeModalBtn').click(function() {
                var n = MainScene.getChildByTag($('#nodeModal' + cctools.NodeList[nodeIndex][1].id).val());
                if(!n) {
                    var size = cc.director.getWinSize(), node;

                    switch(cctools.NodeList[nodeIndex][0].value) {
                        case "cc.LabelTTF" :
                            node = new cc.LabelTTF($('#nodeModal' + cctools.NodeList[nodeIndex][2].id).val(), $('#nodeModal' + cctools.NodeList[nodeIndex][3].id).val(), $('#nodeModal' + cctools.NodeList[nodeIndex][4].id).val());
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

                    node.tag = $('#nodeModal' + cctools.NodeList[nodeIndex][1].id).val();
                    node.setPosition(size.width / 2, size.height / 2);
                    MainScene.addChild(node);
                    $('#nodeModal').modal('hide');
                    $('#jstreeNode').jstree("create_node", "#", {text:$('#nodeModal' + cctools.NodeList[nodeIndex][1].id).val(), data:{type:cctools.NodeList[nodeIndex][0].value, parent:"#"}}, "last");
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
                    actionIndex = i;
                    break;
                }
            }

            $('#actionModalBtn').text('Create');
            $('#actionModalTitle').html(cctools.BasicActionList[actionIndex][0].title);
            $('#actionModalForm').empty();

            for(i = 1;i < cctools.BasicActionList[actionIndex].length;i++) {
                $('#actionModalForm').append('<input type="hidden" id="actionModalType" value="' + cctools.BasicActionList[actionIndex][0].value + '" /><div class="form-group"> <label for="actionModal' + cctools.BasicActionList[actionIndex][i].id + '">' + cctools.BasicActionList[actionIndex][i].title + '</label><input type="' + cctools.BasicActionList[actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.BasicActionList[actionIndex][i].id + '" placeholder="' + cctools.BasicActionList[actionIndex][i].title + '" value="' + cctools.BasicActionList[actionIndex][i].value +'"></div>');
            }
            $('#actionModalBtn').unbind('click');
            $('#actionModalBtn').click(function() {
                var check = $('#jstreeAction').jstree("create_node", "#", {text:'<span class="label label-primary">' + $('#actionModalType').val() + "</span> " + $('#actionModalname').val()}, "last");

                if(!check) {
                    alert('Action name already exists.');
                }
                else {
                    check = $('#jstreeAction').jstree(true).get_node(check);
                    check.type = cctools.BasicActionList[actionIndex][0].value;
                    check.isSequence = false;

                    for(i = 1;i < cctools.BasicActionList[actionIndex].length;i++) {
                        check[cctools.BasicActionList[actionIndex][i].id] = $('#actionModal' + cctools.BasicActionList[actionIndex][i].id).val();
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
                    actionIndex = i;
                    break;
                }
            }

            $('#actionModalBtn').text('Create');
            $('#actionModalTitle').html(cctools.SequenceActionList[actionIndex][0].title);
            $('#actionModalForm').empty();

            for(i = 1;i < cctools.SequenceActionList[actionIndex].length;i++) {
                $('#actionModalForm').append('<input type="hidden" id="actionModalType" value="' + cctools.SequenceActionList[actionIndex][0].value + '" /><div class="form-group"> <label for="actionModal' + cctools.SequenceActionList[actionIndex][i].id + '">' + cctools.SequenceActionList[actionIndex][i].title + '</label><input type="' + cctools.SequenceActionList[actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.SequenceActionList[actionIndex][i].id + '" placeholder="' + cctools.SequenceActionList[actionIndex][i].title + '" value="' + cctools.SequenceActionList[actionIndex][i].value +'"></div>');
            }
            $('#actionModalBtn').unbind('click');
            $('#actionModalBtn').click(function() {
                var check = $('#jstreeAction').jstree("create_node", "#", {text:'<span class="label label-default">' + $('#actionModalType').val() + "</span> " + $('#actionModalname').val()}, "last");

                if(!check) {
                    alert('Action name already exists.');
                }
                else {
                    check = $('#jstreeAction').jstree(true).get_node(check);
                    check.type = cctools.SequenceActionList[actionIndex][0].value;
                    check.isSequence = true;

                    for(i = 1;i < cctools.SequenceActionList[actionIndex].length;i++) {
                        check[cctools.SequenceActionList[actionIndex][i].id] = $('#actionModal' + cctools.SequenceActionList[actionIndex][i].id).val();
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
                    actionIndex = i;
                    break;
                }
            }

            $('#actionModalBtn').text('Create');
            $('#actionModalTitle').html(cctools.EaseActionList[actionIndex][0].title);
            $('#actionModalForm').empty();

            for(i = 1;i < cctools.EaseActionList[actionIndex].length;i++) {
                $('#actionModalForm').append('<input type="hidden" id="actionModalType" value="' + cctools.EaseActionList[actionIndex][0].value + '" /><div class="form-group"> <label for="actionModal' + cctools.EaseActionList[actionIndex][i].id + '">' + cctools.EaseActionList[actionIndex][i].title + '</label><input type="' + cctools.EaseActionList[actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.EaseActionList[actionIndex][i].id + '" placeholder="' + cctools.EaseActionList[actionIndex][i].title + '" value="' + cctools.EaseActionList[actionIndex][i].value +'"></div>');
            }
            $('#actionModalBtn').unbind('click');
            $('#actionModalBtn').click(function() {
                var check = $('#jstreeAction').jstree("create_node", "#", {text:'<span class="label label-success">' + $('#actionModalType').val() + "</span> " + $('#actionModalname').val()}, "last");

                if(!check) {
                    alert('Action name already exists.');
                }
                else {
                    check = $('#jstreeAction').jstree(true).get_node(check);
                    check.type = cctools.EaseActionList[actionIndex][0].value;
                    check.isEase = true;

                    for(i = 1;i < cctools.EaseActionList[actionIndex].length;i++) {
                        check[cctools.EaseActionList[actionIndex][i].id] = $('#actionModal' + cctools.EaseActionList[actionIndex][i].id).val();
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
        MainScene.getChildByTag('colorLayer').color = cc.color(parseInt(layerColor.substring(1, 3), 16), parseInt(layerColor.substring(3, 5), 16), parseInt(layerColor.substring(5, 7), 16), 255);
    });

    $("#propColorInput").on("change.color", function(event, color){
        if(propNode) {
            var color = $('#propColorInput').val();
            propNode.color = cc.color(parseInt(color.substring(1, 3), 16), parseInt(color.substring(3, 5), 16), parseInt(color.substring(5, 7), 16), 255);
        }
    });

    // Storage Init
    $('#storageInput').change(function() {
        $('#storageName').val($('#storageInput option:selected').text());
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

        if(!$('#storageName').val()) {
            alert('Please enter the storage name');
            return;
        }

        localStorage.setItem($('#storageName').val(), localStorage.getItem($('#storageInput option:selected').text()));
        localStorage.removeItem($('#storageInput option:selected').text());

        cctools.refreshStorage();
    });

    $('#saveBtn').click(function() {
        var data = {};

        if(!$('#storageName').val()) {
            alert('Please enter the storage name');
            return;
        }

        data.canvas_width = $('#canvasWidthInput').val();
        data.canvas_height = $('#canvasHeightInput').val();
        data.resoultion_policy = $('#canvasResInput').val();

        localStorage.setItem($('#storageName').val(), JSON.stringify(data));
        storageName = $('#storageName').val();

        $('#storageModal').modal('hide');
    });

    $('#loadBtn').click(function() {
        var data;

        if(!$('#storageInput option:selected').text() || $('#storageInput option:selected').text() === 'Select the storage') {
            alert('Please select the storage');
            return;
        }

        data = JSON.parse(localStorage.getItem($('#storageInput option:selected').text()));
        $('#canvasWidthInput').val(data.canvas_width);
        $('#canvasHeightInput').val(data.canvas_height);
        $('#canvasResInput').val(data.resoultion_policy);
        $('.canvas-input').trigger('change');

        storageName = $('#storageInput option:selected').text();

        $('#storageModal').modal('hide');
    });

    $('.navbar-main > li > a').click(function() {
        if(this.id.split('Btn')[0] === 'code') {
            $('#jsBtn').click();
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
        MainScene.getChildByTag('colorLayer').color = cc.color(parseInt(layerColor.substring(1, 3), 16), parseInt(layerColor.substring(3, 5), 16), parseInt(layerColor.substring(5, 7), 16), 255);
        MainScene.getChildByTag('colorLayer').width = $('#canvasWidthInput').val();
        MainScene.getChildByTag('colorLayer').height = $('#canvasHeightInput').val();
        cc.view.setDesignResolutionSize($('#canvasWidthInput').val(), $('#canvasHeightInput').val(), $("#canvasResInput option:selected").text());
    });

    $('#canvasResInput').change(function() {
        cc.view.setResolutionPolicy(eval($("#canvasResInput option:selected").text()));
    });

    $('.prop-input').change(function() {
        if(propNode) {
            if(propNode.hasOwnProperty('color')) propNode.color = cc.color(parseInt(propNode.color.substring(1, 3), 16), parseInt(propNode.color.substring(3, 5), 16), parseInt(propNode.color.substring(5, 7), 16), 255);
            propNode.x = parseInt($('#propXInput').val());
            propNode.y = parseInt($('#propYInput').val());
            propNode.opacity = parseFloat($('#propOpacityInput').val());
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
        var size = cc.director.getWinSize();
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
        str += "// Create Nodes\n\n";

        for(i = 1;i < MainScene._children.length;i++) {
            child = MainScene._children[i];
            name = child.tag;

            str += "// " + name + "\n";

            if(child instanceof cc.LabelTTF) {
                type = "cc.LabelTTF";
                str += "var " + name + " = new " + type + "(\"" + child.string + "\", \"" + child.fontName + "\", " + child.fontSize + ");\n";
            }
            else if(child instanceof cc.Sprite) {
                type = "cc.Sprite";
                str += "var " + name + " = new " + type + "(\"" + child.filename + "\");\n";
            }

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

        str += "\n\n";
        str += "// Create Actions\n\n";

        var root = targetAction = $('#jstreeAction').jstree(true).get_node('#');

        for(i = 0;i < root.children.length;i++) {
            str += "// " + $('#jstreeAction').jstree(true).get_node(root.children[i]).name + "\nvar " + $('#jstreeAction').jstree(true).get_node(root.children[i]).name + " = ";
            str += cctools.getCocosActionStr(root.children[i]) + ";\n\n";
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
                        $('#propColorInput').val("#" + propNode.color.r.toString(16) + propNode.color.g.toString(16) + propNode.color.b.toString(16) + propNode.color.a.toString(16));
                        $('#propNameInput').val(propNode.tag);
                        $('#propXInput').val(propNode.x);
                        $('#propYInput').val(propNode.y);
                        $('#propOpacityInput').val(propNode.opacity);
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
                                actionIndex = i;
                                break;
                            }
                        }

                        $('#actionModalTitle').html(cctools.BasicActionList[actionIndex][0].title);
                        $('#actionModalForm').empty();

                        for(i = 1;i < cctools.BasicActionList[actionIndex].length;i++) {
                            if(cctools.BasicActionList[actionIndex][i].id != 'name') $('#actionModalForm').append('<div class="form-group"> <label for="actionModal' + cctools.BasicActionList[actionIndex][i].id + '">' + cctools.BasicActionList[actionIndex][i].title + '</label><input type="' + cctools.BasicActionList[actionIndex][i].type + '" class="form-control action-modal" id="actionModal' + cctools.BasicActionList[actionIndex][i].id + '" placeholder="' + cctools.BasicActionList[actionIndex][i].title + '" value="' + eval('n.' + cctools.BasicActionList[actionIndex][i].id) +'"></div>');
                        }

                        $('#actionModalBtn').text('Edit');
                        $('#actionModal').modal('show');

                        $('#actionModalBtn').unbind('click');
                        $('#actionModalBtn').click(function() {
                            for(i = 1;i < cctools.BasicActionList[actionIndex].length;i++) {
                                if(cctools.BasicActionList[actionIndex][i].id != 'name') n[cctools.BasicActionList[actionIndex][i].id] = $('#actionModal' + cctools.BasicActionList[actionIndex][i].id).val();
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

    $('#jstreeAction').on('move_node.jstree', function (event, data) {
        // Parent action is root
        if(data.parent == '#') return;

        if(!$('#jstreeAction').jstree(true).get_node(data.parent).isSequence && !$('#jstreeAction').jstree(true).get_node(data.parent).isEase) {
            var parent = $('#jstreeAction').jstree(true).get_node(data.old_parent);
            $('#jstreeAction').jstree(true).move_node(data.node, parent);
            alert('Parent action is must sequence action or ease action!');
            return;
        }

        if($('#jstreeAction').jstree(true).get_node(data.parent).isEase && $('#jstreeAction').jstree(true).get_node(data.parent).children.length > 1) {
            var parent = $('#jstreeAction').jstree(true).get_node(data.old_parent);
            $('#jstreeAction').jstree(true).move_node(data.node, parent);
            alert('ease action can have only one children!');
            return;
        }
    });

    $('#runActionBtn').click(function() {
        var target = MainScene.getChildByTag($("#runTargetInput option:selected").text()), action;
        isRun = true;
        targetActionNode = $.extend({}, target);
        $('#actionStatus').text('Action!');
        $('#actionStatus').removeClass('label-default');
        $('#actionStatus').addClass('label-danger');

        action = cctools.getCocosAction(targetAction);

        target.runAction(new cc.Sequence(action, new cc.DelayTime(1), new cc.CallFunc(function(sender) {
            isRun = false;
            sender.color = targetActionNode.color;
            sender.x = targetActionNode.x;
            sender.y = targetActionNode.y;
            sender.scaleX = targetActionNode.scaleX;
            sender.scaleY = targetActionNode.scaleY;
            sender.skewX = targetActionNode.skewX;
            sender.skewY = targetActionNode.skewY;
            sender.flippedX = targetActionNode.flipX;
            sender.flippedY = targetActionNode.flipY;
            sender.rotation = targetActionNode.rotation;
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
                            for(i = 1;i < target._children.length;i++) {
                                if(cc.rectContainsPoint(target._children[i].getBoundingBox(),pos)) {
                                    targetNode = target._children[i];
                                    propNode = target._children[i];
                                    $('#propNameInput').val(propNode.tag);
                                    $('#propColorInput').val("#" + propNode.color.r.toString(16) + propNode.color.g.toString(16) + propNode.color.b.toString(16) + propNode.color.a.toString(16));
                                    $('#propXInput').val(propNode.x);
                                    $('#propYInput').val(propNode.y);
                                    $('#propOpacityInput').val(propNode.opacity);
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
                                        $('#propColorInput').val("#" + propNode.color.r.toString(16) + propNode.color.g.toString(16) + propNode.color.b.toString(16) + propNode.color.a.toString(16));
                                        $('#propXInput').val(propNode.x);
                                        $('#propYInput').val(propNode.y);
                                        $('#propOpacityInput').val(propNode.opacity);
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