
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/raise.js
Scrollgrid.prototype.internal.raise = function (err) {
    "use strict";

    var self = this,
        log = self.reporter || console;

    if (log && log.error) {
        log.error(err);
    } else {
        throw err;
    }

};