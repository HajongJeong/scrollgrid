
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/headerColumns.js
Scrollgrid.prototype.headerColumns = function (value) {
    "use strict";

    var virtual = this.internal.sizes.virtual,
        result;

    if (value === undefined) {
        result = virtual.left;
    } else {
        // Set the value and redraw but return self for chaining
        virtual.left = value;
        result = this;
        this.refresh();
    }

    return result;

};