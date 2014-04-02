var session = require("zed/session");

module.exports = function(info) {
    var path = "/config.xml";
    return session.getText(path).then(function(text) {
        text = text.replace('<widget id="' + info.replace + '"', '<widget id="' + info.replaceWith + '"');
        return session.setText(path, text);
    });
};