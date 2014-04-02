var session = require("zed/session");

module.exports = function(info) {
    var env = info.environment;
    var path = "/www/index.js";
    var environments = ["prod", "dev", "local"];
    environments = environments.filter(function(value) {
        if (value !== env) {
            return true;
        }
        return false;
    });
    return session.getAllLines(path).then(function(lines) {
        var i, j;
        for (i = 0; i < lines.length; i++) {
            var index = lines[i].indexOf("sos.constant('environment', '" + env + "');");
            if (index !== -1) {
                lines[i] = lines[i].substring(index);
            }
            for (j = 0; j < environments.length; j++) {
                index = lines[i].indexOf("sos.constant('environment', '" + environments[j] + "');");
                if (index !== -1) {
                    lines[i] = "// " + lines[i].substring(index);
                }
            }
        }
        var text = lines.join("\n");
        return session.setText(path, text);
    });
};