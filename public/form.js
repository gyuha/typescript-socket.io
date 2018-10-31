console.log('test');

function setMessage(message) {
  var template = $('#template').html();
  var compiled = _.template(template);
  var html = compiled({ message: message });
  $('#messages').append(html);
  $('#messages').animate({ scrollTop: $('#messages').prop('scrollHeight') }, 500);
}

function enterMessage() {
  var message = $('#input').val();
  sendMessage(message);
  $('#input').val('');
}

function changeChannel() {
  $('#messages').html('');
  connectRoom();
}

$(function() {
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  $('#input').keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      enterMessage();
    }
  });

  $('#channel').keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      changeChannel();
    }
  });
});
