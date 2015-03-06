window.onload = function() {
    var MainScene, targetNode, propNode;

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

    var sideBtnClick = function(selector) {
        $('.contents-box').css('display', 'none');
        $('.contents-box').removeClass('hidden');
        $('#' + selector + '-contents').css('display', 'block');
        $('.nav-tabs > li').removeClass('active');
        $('#' + selector + '-btn').parent().addClass('active');
    }

    $('.nav-tabs > li > a').click(function() {
        sideBtnClick(this.id.split('-btn')[0]);
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
        }
    });

    $('#labelttf-btn').click(function() {
        var size = cc.director.getWinSize();
        var label = new cc.LabelTTF($('#labelttfText').val(), $('#labelttfFont').val(), $('#labelttfFontSize').val());
        label.tag = $('#labelttfName').val();
        label.setPosition(size.width / 2, size.height / 2);
        MainScene.addChild(label);
        $('#labelttf-modal').modal('hide');
        $('#nodeList').append("<tr><td>" + $('#labelttfName').val() + "</td><td><span class='label label-default'>cc.LabelTTF</span></td><td><a href='#' class='remove-btn'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a></td></tr>");
        $('.remove-btn').click(function() {
            MainScene.removeChild(MainScene.getChildByTag($(this).parent().parent()[0].childNodes[0].innerText));
            $(this).parent().parent().remove();
        });
    });

    $('#sprite-btn').click(function() {
        var size = cc.director.getWinSize();
        var sprite = new cc.Sprite($('#spriteImagePreivew')[0].src);
        sprite.tag = $('#spriteName').val();
        sprite.setPosition(size.width / 2, size.height / 2);
        MainScene.addChild(sprite);
        $('#sprite-modal').modal('hide');
        $('#nodeList').append("<tr><td>" + $('#spriteName').val() + "</td><td><span class='label label-default'>cc.Sprite</span></td><td><a href='#' class='remove-btn'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a></td></tr>");
        $('.remove-btn').click(function() {
            MainScene.removeChild(MainScene.getChildByTag($(this).parent().parent()[0].childNodes[0].innerText));
            $(this).parent().parent().remove();
        });
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
                            var pos = event.getLocation(), target = event.getCurrentTarget(), i;
                            if(event.getButton() === cc.EventMouse.BUTTON_RIGHT)
                                cc.log("onRightMouseDown at: " + pos.x + " " + pos.y );
                            else if(event.getButton() === cc.EventMouse.BUTTON_LEFT)
                                cc.log("onLeftMouseDown at: " + pos.x + " " + pos.y );

                            for(i = 1;i < target._children.length;i++) {
                                if(cc.rectContainsPoint(target._children[i].getBoundingBox(),pos)) {
                                    targetNode = target._children[i];
                                    propNode = target._children[i];
                                    $('#propNameInput').val(propNode.tag);
                                    $('#propXInput').val(propNode.x);
                                    $('#propYInput').val(propNode.y);
                                    $('#propAXInput').val(propNode.anchorX);
                                    $('#propAYInput').val(propNode.anchorY);
                                    $('#property-btn').click();
                                }
                            }
                        },
                        onMouseMove: function(event){
                            var pos = event.getLocation(), target = event.getCurrentTarget();
                            if(targetNode) {
                                targetNode.x = pos.x;
                                targetNode.y = pos.y;
                                $('#propXInput').val(pos.x);
                                $('#propYInput').val(pos.y);
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