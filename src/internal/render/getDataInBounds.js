
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getDataInBounds.js
Scrollgrid.prototype.internal.render.getDataInBounds = function (viewArea) {
    "use strict";

    var i, r, c, x,
        self = this,
        int = self.internal,
        sizes = int.sizes,
        render = int.render,
        physical = sizes.physical,
        cols = self.columns,
        column,
        runningX,
        runningY,
        rowHeight = 0,
        visibleData = [],
        adjustments,
        getValue;

    runningY = viewArea.startY;

    // Load the data range and get the accessor
    getValue = self.adapter.loadDataRange(viewArea);

    for (r = viewArea.top || 0, i = 0; r < viewArea.bottom || 0; r += 1) {
        rowHeight = physical.getRowHeight.call(self, r);
        runningX = viewArea.startX || 0;
        for (c = viewArea.left || 0; c < viewArea.right || 0; c += 1, i += 1) {
            // Get any measurement modifiers based on cell position
            adjustments = render.calculateCellAdjustments.call(self, r, c);
            // Get the column definition
            column = cols[c];
            // Get the x position of the cell
            x = Math.floor(runningX) + adjustments.x + 0.5;
            // Using direct assignment for speed
            visibleData[i] = {
                x: x,
                y: Math.floor(runningY) + adjustments.y + 0.5,
                boxWidth: Math.ceil(column.width) + adjustments.boxWidth,
                boxHeight: Math.ceil(rowHeight) + adjustments.boxHeight,
                textWidth: Math.ceil(column.width) + adjustments.textWidth,
                textHeight: Math.ceil(rowHeight) + adjustments.textHeight,
                backgroundStyle: self.style.cellBackgroundPrefix + 'r' + (r + 1) + ' ' + self.style.cellBackgroundPrefix + 'c' + (c + 1),
                foregroundStyle: self.style.cellForegroundPrefix + 'r' + (r + 1) + ' ' + self.style.cellForegroundPrefix + 'c' + (c + 1),
                sortIcon: adjustments.sortIcon || 'none',
                cellPadding: self.cellPadding,
                alignment: 'left',
                rowIndex: r,
                columnIndex: c,
                column: column,
                formatter: null,
                getValue: getValue,
                renderForeground: render.renderForeground,
                renderBetween: null,
                renderBackground: render.renderBackground
            };
            // We abuse the key here, cells will be rendered on enter only, we therefore
            // want to key by any value which should result in a redraw of a particular cell,
            // this has huge performance benefits.  The
            visibleData[i].key = visibleData[i].columnIndex + '_' + visibleData[i].rowIndex + "_" + visibleData[i].boxHeight + "_" + visibleData[i].boxWidth + "_" + visibleData[i].sortIcon;
            runningX += column.width;
        }
        runningY += rowHeight;
    }

    // Modify the data based on the user rules
    render.applyRules.call(self, visibleData);

    return visibleData;

};