# WebSocket-Rails Example Application

This is an example implementation of the [websocket-rails](https://github.com/DanKnox/websocket-rails) gem. 

## Out of Date

June 17 2012

While this example project still provides a useful look at using the
very basic features of the `websocket-rails` gem, it is now quite out of
date and a poor example of structuring JavaScript in general. 

I will be updating it within the next several days to demonstrate
all of the new features that have been add to the gem recently.

## Event Routing

Check out `app/config/initializers/events.rb` for the example event routing.

## Controller Implementation

Check out `app/controllers/chat_controller.rb` for the example websocket controller.

## JavaScript Dispatcher

This project does not currently demonstrate the usage of the
`WebSocketRails` JavaScript client. I will be updating this very soon.
Please ignore most of the javascript implementation in this project for
now and instead refer to the [Websocket Rails Wiki
Guides](/DanKnox/websocket-rails/wiki)

## Installation/Usage

1. Clone the git repo
2. Run the `bundle` command inside the directory
3. Fire up the web server `thin start`
4. Browse to `http://localhost:3000` or whatever port you started thin on.
