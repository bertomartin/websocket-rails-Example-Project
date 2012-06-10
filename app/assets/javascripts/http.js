var ServerEventsDispatcher = function(){
  var conn = new XMLHttpRequest(),
      open_handler = function(){},
      loaded = false,
      lastPos = 0,
      client_id = '';

  this.get_client_id = function() {
    return client_id
  }
  conn.onreadystatechange = function() {
    if (conn.readyState == 3) {
      var data = conn.responseText.substring(lastPos);
      lastPos = conn.responseText.length;
      var json_data = JSON.parse(data),
          id = json_data[0],
          event_name = json_data[1],
          message = json_data[2];
      client_id = id
      
      if (loaded == false) {
        open_handler();
        loaded = true
      }
      console.log(json_data)
      dispatch(event_name, message)
    }
  }
  conn.open("GET","/websocket",true)
  conn.send()

  var callbacks = {}

  this.bind = function(event_name, callback) {
    callbacks[event_name] = callbacks[event_name] || [];
    callbacks[event_name].push(callback)
  }

  this.trigger = function(event_name, data) {
    var payload = JSON.stringify([event_name,data])
    console.log("Sending Payload: " + payload)
    console.log("To Connection: " + client_id)
    $.ajax({
        type: 'POST',
        url: '/websocket',
        data: {client_id: client_id, data: payload},
        success: function(){console.log('success');}
    });
    return this;
  }

  this.onopen = function(handler) {
    open_handler = handler
  }

  var dispatch = function(event_name, message) {
    var chain = callbacks[event_name]
    if (typeof chain == 'undefined') return;
    for(var i = 0; i < chain.length; i++) {
      chain[i]( message )
    }
  }	
}
