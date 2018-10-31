console.log('test');

function setMessage(name, message) {
  var template = $('#template').html();
  var compiled = _.template(template);
  var html = compiled({ name, message });
  $('#messages').append(html);
  $('#messages').animate({ scrollTop: $('#messages').prop('scrollHeight') }, 500);
}

function enterMessage() {
  var name = $('#name').val();
  var message = $('#input').val();
  sendMessage(name, message);
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
