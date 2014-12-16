define(function(require, exports, module) {

    var Validator = require('bootstrap.validator');
           var Notify = require('common/bootstrap-notify');
           require('jquery.sortable');

    exports.run = function() { 

        var sortList = function($list) {

            var data = $list.sortable("serialize").get();
            $.post($list.data('sortUrl'), {ids:data}, function(response){
                var lessonNum = chapterNum = unitNum = 0;

                $list.find('.item-essay-content, .item-chapter').each(function() {
                    var $item = $(this);
                    if ($item.hasClass('item-essay-content')) {
                        lessonNum ++;
                        $item.find('.number').text(lessonNum);
                    } else if ($item.hasClass('item-chapter-unit')) {
                        unitNum ++;
                        $item.find('.number').text(unitNum);
                    } else if ($item.hasClass('item-chapter')) {
                        chapterNum ++;
                        unitNum = 0;
                        $item.find('.number').text(chapterNum);
                    }
                });
            });
        };

        var validator = new Validator({
            element: '#essay-content-chapter-form',
            autoSubmit: false
        });

        validator.addItem({
            element: '#chapter-title-field',
            required: true
            display: '章节名' 
        });

        validator.on('formValidated', function(error, msg, $form) {
          if (error) {
              return ;
          }
          $('#essay-content-chapter-btn').button('submiting').addClass('disabled');

          $.post($form.attr('action'), $form.serialize(), function(html) {
              var id = '#' + $(html).attr('id'),
                  $item = $(id);
              var $parent = $('#'+$form.data('parentid'));
              if ($item.length) {
                  $item.replaceWith(html);
                  Notify.success('章节信息已保存');
              } else {
                 if($parent.length){
                  var add = 0;
                   $parent.nextAll().each(function(){
                     if($(this).hasClass('item-chapter  clearfix')){
                        $(this).before(html);
                        add = 1;
                        return false;
                      }
                     
                  });
                     if(add != 1 )
                        $("#essay-item-list").append(html);
                   
                    var $list = $("#essay-item-list");
                    sortList($list);
                   
                 }else{
                    $("#essay-item-list").append(html);
                 }
                    
                  Notify.success('章节添加成功');
              }
              $(id).find('.btn-link').tooltip();
              var emptyDiv = $("#essay-item-list").parent().prev('div');
              if(emptyDiv.hasClass('empty')){
                  emptyDiv.remove();
              }
              $form.parents('.modal').modal('hide');
          });

        });

  };
});