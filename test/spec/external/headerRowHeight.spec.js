define(['d3', 'mock', 'external/headerRowHeight'], function (d3, mock) {
    "use strict";

    describe("headerRowHeight", function () {

        var underTest = Scrollgrid.prototype.headerRowHeight;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should return the column resizing value if no parameter is passed", function () {
            expect(underTest.call(mock)).toEqual(mock.vals.headerRowHeight);
        });

        it("should update the column resizing value to a passed parameter", function () {
            underTest.call(mock, 13);
            expect(mock.internal.sizes.physical.headerRowHeight).toEqual(13);
        });

        it("should return the context when a parameter is passed", function () {
            expect(underTest.call(mock, 13)).toEqual(mock);
        });

        it("should call refresh when a parameter is passed", function () {
            underTest.call(mock, 13);
            expect(mock.refresh).toHaveBeenCalled();
        });

        it("should not call refresh when a parameter is not passed", function () {
            underTest.call(mock);
            expect(mock.refresh).not.toHaveBeenCalled();
        });

    });

});