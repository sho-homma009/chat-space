$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html = 
       `<div class="message-box">
          <div class="message-box__info">
            <div class="message-box__info__UserName">
              ${message.user_name}
            </div>
            <div class="message-box__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-box__text">
            ${message.body}
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html = 
       `<div class="message-box">
          <div class="message-box__info">
            <div class="message-box__info__UserName">
              ${message.user_name}
            </div>
            <div class="message-box__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-box__text">
            ${message.body}
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.ChatMain__messages').append(html);
      $('.ChatMain__messages').animate({ scrollTop: $('.ChatMain__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});