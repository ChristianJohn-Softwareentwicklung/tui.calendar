/*eslint-disable*/
var core = ne.dooray.calendar.TimeCore;
var Time = ne.dooray.calendar.Time;
describe('module:Time.Creation', function() {
    it('_nearest()', function() {
        expect(core._nearest(0.5, [0.3, 0.6, 0.9])).toBe(0.6);
        expect(core._nearest(13, [5, 9, 11, 12, 15])).toBe(12);
        expect(core._nearest(0.12, [0.5, 0.1, 0.11, 0.3])).toBe(0.11);
    });

    it('_calcGridYIndex()', function() {
        // 24시간이 100px일 때  50px은 12시임
        expect(core._calcGridYIndex(86400000, 100, 50)).toBe(12);
        // 3시간이 100px일 때 50px는 1.5시간인데, 30분 단위로 반올림
        // 처리를 하므로 1이 되고, 51px는 1.5가 된다.
        expect(core._calcGridYIndex(10800000, 100, 50)).toBe(1);
        expect(core._calcGridYIndex(10800000, 100, 51)).toBe(1.5);
    });

    it('_retriveEventData()', function() {
        var container = document.createElement('div');
        container.style.height = '100px';
        var time = new Time(100, null, container);

        spyOn(time, 'getDate').and.returnValue(new Date('2015-05-05T00:00:00+09:00'));
        spyOn(time, 'getViewBound').and.returnValue({
            height: 230 
        });

        var func = core._retriveEventData(time);

        // center of timeview grid.
        var vMouseEvent = {
            target: 'hello',
            clientX: 10,
            clientY: 115 
        };

        var expected = {
            target: 'hello',
            relatedView: time,
            originEvent: vMouseEvent,
            mouseY: 115,
            gridY: 12,
            timeY: (new Date('2015-05-05T12:00:00+09:00').getTime()),
            nearestGridY: 12,
            nearestGridTimeY: (new Date('2015-05-05T12:00:00+09:00').getTime())
        };

        expect(func(vMouseEvent)).toEqual(expected);
    });
});
