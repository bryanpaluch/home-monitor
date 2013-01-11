$(document).ready(function () {
  $('.editsensor').on('submit', function(e){
    e.preventDefault();
    console.log(this);
    var self = this;
    var url = $(this).attr('action') 
    $.ajax({
      type: 'POST',
      url:url, 
      data :$(this).serialize(),
      success: function(data){
        if(data.result === 'success'){
          if(data.redraw === true){
            $(self).parent().modal('hide');
            document.location.reload();
          }
        }else{
            $(self).parent().modal('hide');
        }
      },
      dataType: 'json'
    });
  });

  $('#dashboard-menu a').click(function(e){
    e.preventDefault();
    var self = this;
    $('#dashboard-menu .active').removeClass('active');
    $(this).parent().addClass('active');
    $('#dashboard-active .active').hide().removeClass('active');
    $($(this).attr('href')).show().addClass('active');
  });


});
