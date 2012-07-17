jQuery(function() {
  
	$("#send").unbind()
	
	current_user = {user_name: "Guest", full_name: "Guest User"}
	$("#user-name").val(current_user.user_name)
	$("#full-name").val(current_user.full_name)
  dispatcher.on_open = function() {
    dispatcher.trigger('new_user',current_user)
  }
	
	dispatcher.bind('new_message', function(message) {
		var template = $("<div class='message' style='display:none'><label class='label label-info'>"+message.user_name+" "+message.received+"</label> "+message.msg_body+"</div>");
		if($('#chat div.message').size() > 15) {
      $('#chat div.message:first').slideDown(100, function() {
        $(this).remove();
      });
    }
    $('#chat').append(template);
    template.slideDown(140);
	})
	
	dispatcher.bind('user_list', function(user_list) {
		var user_html = ""
		for(i = 0; i < user_list.length; i++) {
			user_html = user_html + "<li>"+user_list[i].user_name+"</li>"
		}
		var template = $(user_html)
		$('#user-list').empty()
		$('#user-list').append(template)
		template.slideDown(140)
	})
	

	$("#send").on('click',function() {
		var msg = $("#message").val()
		dispatcher.trigger('new_message',{user_name: current_user.user_name, msg_body: msg})
		$("#message").val('')
	});
	$("#message").keypress(function(e) {
		if(e.keyCode == 13) {
    	$("#send").click()
    }
	});
	
	$("#save-user-info").unbind()
	$("#save-user-info").on('click',function() {
		current_user.user_name = $("#user-name").val()
		current_user.full_name = $("#full-name").val()
		$("#username").html(current_user.user_name)
		$("#close-user-info").click()
		dispatcher.trigger('change_username',current_user)
	})
})
function send_message(socket) {
	var msg = $("#message").val()
	socket.send(msg)
	$("#message").val('')
}

