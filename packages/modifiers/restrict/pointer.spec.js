import test from '@interactjs/_dev/test/test';
import * as helpers from '@interactjs/core/tests/_helpers';
import restrict from '../restrict/pointer';
test('restrict larger than restriction', t => {
    const edges = { left: 0, top: 0, right: 200, bottom: 200 };
    const rect = { ...edges, width: 200, height: 200 };
    const { interaction, } = helpers.testEnv({ rect });
    const restriction = { left: 100, top: 50, right: 150, bottom: 150 };
    const options = {
        ...restrict.defaults,
        restriction: null,
        elementRect: { left: 0, top: 0, right: 1, bottom: 1 },
    };
    const state = { options, offset: null };
    const arg = {
        interaction,
        state,
        rect,
        startOffset: rect,
        coords: null,
        pageCoords: { x: 0, y: 0 },
    };
    options.restriction = () => null;
    t.doesNotThrow(() => restrict.start(arg), 'no errors with null-resolving restriction');
    options.restriction = restriction;
    restrict.start(arg);
    arg.coords = { x: 0, y: 0 };
    restrict.set(arg);
    t.deepEqual(arg.coords, { x: 0, y: 0 }, 'allows top and left edge values to be lower than the restriction');
    arg.coords = { x: restriction.left + 10, y: restriction.top + 10 };
    restrict.set(arg);
    t.deepEqual(arg.coords, { x: restriction.left - rect.left, y: restriction.top - rect.top }, 'keeps the top left edge values lower than the restriction');
    arg.coords = { x: restriction.right - rect.right - 10, y: restriction.bottom - rect.right - 10 };
    restrict.set(arg);
    t.deepEqual(arg.coords, { x: restriction.right - rect.right, y: restriction.bottom - rect.right }, 'keeps the bottom right edge values higher than the restriction');
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9pbnRlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLDRCQUE0QixDQUFBO0FBQzdDLE9BQU8sS0FBSyxPQUFPLE1BQU0saUNBQWlDLENBQUE7QUFDMUQsT0FBTyxRQUFRLE1BQU0scUJBQXFCLENBQUE7QUFFMUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzNDLE1BQU0sS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQzFELE1BQU0sSUFBSSxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDbEQsTUFBTSxFQUNKLFdBQVcsR0FDWixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBRTdCLE1BQU0sV0FBVyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ25FLE1BQU0sT0FBTyxHQUFHO1FBQ2QsR0FBRyxRQUFRLENBQUMsUUFBUTtRQUNwQixXQUFXLEVBQUUsSUFBSTtRQUNqQixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0tBQ3RELENBQUE7SUFDRCxNQUFNLEtBQUssR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUE7SUFDdkMsTUFBTSxHQUFHLEdBQUc7UUFDVixXQUFXO1FBQ1gsS0FBSztRQUNMLElBQUk7UUFDSixXQUFXLEVBQUUsSUFBSTtRQUNqQixNQUFNLEVBQUUsSUFBSTtRQUNaLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtLQUMzQixDQUFBO0lBRUQsT0FBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUE7SUFDaEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQVUsQ0FBQyxFQUFFLDJDQUEyQyxDQUFDLENBQUE7SUFFN0YsT0FBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7SUFDakMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFVLENBQUMsQ0FBQTtJQUUxQixHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7SUFDM0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsU0FBUyxDQUNULEdBQUcsQ0FBQyxNQUFNLEVBQ1YsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFDZCxrRUFBa0UsQ0FDbkUsQ0FBQTtJQUVELEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUE7SUFDbEUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsU0FBUyxDQUNULEdBQUcsQ0FBQyxNQUFNLEVBQ1YsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFDbEUsMkRBQTJELENBQzVELENBQUE7SUFFRCxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQTtJQUNoRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2pCLENBQUMsQ0FBQyxTQUFTLENBQ1QsR0FBRyxDQUFDLE1BQU0sRUFDVixFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUN6RSxnRUFBZ0UsQ0FDakUsQ0FBQTtJQUVELENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUNULENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlc3QgZnJvbSAnQGludGVyYWN0anMvX2Rldi90ZXN0L3Rlc3QnXG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJ0BpbnRlcmFjdGpzL2NvcmUvdGVzdHMvX2hlbHBlcnMnXG5pbXBvcnQgcmVzdHJpY3QgZnJvbSAnLi4vcmVzdHJpY3QvcG9pbnRlcidcblxudGVzdCgncmVzdHJpY3QgbGFyZ2VyIHRoYW4gcmVzdHJpY3Rpb24nLCB0ID0+IHtcbiAgY29uc3QgZWRnZXMgPSB7IGxlZnQ6IDAsIHRvcDogMCwgcmlnaHQ6IDIwMCwgYm90dG9tOiAyMDAgfVxuICBjb25zdCByZWN0ID0geyAuLi5lZGdlcywgd2lkdGg6IDIwMCwgaGVpZ2h0OiAyMDAgfVxuICBjb25zdCB7XG4gICAgaW50ZXJhY3Rpb24sXG4gIH0gPSBoZWxwZXJzLnRlc3RFbnYoeyByZWN0IH0pXG5cbiAgY29uc3QgcmVzdHJpY3Rpb24gPSB7IGxlZnQ6IDEwMCwgdG9wOiA1MCwgcmlnaHQ6IDE1MCwgYm90dG9tOiAxNTAgfVxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIC4uLnJlc3RyaWN0LmRlZmF1bHRzLFxuICAgIHJlc3RyaWN0aW9uOiBudWxsLFxuICAgIGVsZW1lbnRSZWN0OiB7IGxlZnQ6IDAsIHRvcDogMCwgcmlnaHQ6IDEsIGJvdHRvbTogMSB9LFxuICB9XG4gIGNvbnN0IHN0YXRlID0geyBvcHRpb25zLCBvZmZzZXQ6IG51bGwgfVxuICBjb25zdCBhcmcgPSB7XG4gICAgaW50ZXJhY3Rpb24sXG4gICAgc3RhdGUsXG4gICAgcmVjdCxcbiAgICBzdGFydE9mZnNldDogcmVjdCxcbiAgICBjb29yZHM6IG51bGwsXG4gICAgcGFnZUNvb3JkczogeyB4OiAwLCB5OiAwIH0sXG4gIH1cblxuICBvcHRpb25zLnJlc3RyaWN0aW9uID0gKCkgPT4gbnVsbFxuICB0LmRvZXNOb3RUaHJvdygoKSA9PiByZXN0cmljdC5zdGFydChhcmcgYXMgYW55KSwgJ25vIGVycm9ycyB3aXRoIG51bGwtcmVzb2x2aW5nIHJlc3RyaWN0aW9uJylcblxuICBvcHRpb25zLnJlc3RyaWN0aW9uID0gcmVzdHJpY3Rpb25cbiAgcmVzdHJpY3Quc3RhcnQoYXJnIGFzIGFueSlcblxuICBhcmcuY29vcmRzID0geyB4OiAwLCB5OiAwIH1cbiAgcmVzdHJpY3Quc2V0KGFyZylcbiAgdC5kZWVwRXF1YWwoXG4gICAgYXJnLmNvb3JkcyxcbiAgICB7IHg6IDAsIHk6IDAgfSxcbiAgICAnYWxsb3dzIHRvcCBhbmQgbGVmdCBlZGdlIHZhbHVlcyB0byBiZSBsb3dlciB0aGFuIHRoZSByZXN0cmljdGlvbidcbiAgKVxuXG4gIGFyZy5jb29yZHMgPSB7IHg6IHJlc3RyaWN0aW9uLmxlZnQgKyAxMCwgeTogcmVzdHJpY3Rpb24udG9wICsgMTAgfVxuICByZXN0cmljdC5zZXQoYXJnKVxuICB0LmRlZXBFcXVhbChcbiAgICBhcmcuY29vcmRzLFxuICAgIHsgeDogcmVzdHJpY3Rpb24ubGVmdCAtIHJlY3QubGVmdCwgeTogcmVzdHJpY3Rpb24udG9wIC0gcmVjdC50b3AgfSxcbiAgICAna2VlcHMgdGhlIHRvcCBsZWZ0IGVkZ2UgdmFsdWVzIGxvd2VyIHRoYW4gdGhlIHJlc3RyaWN0aW9uJ1xuICApXG5cbiAgYXJnLmNvb3JkcyA9IHsgeDogcmVzdHJpY3Rpb24ucmlnaHQgLSByZWN0LnJpZ2h0IC0gMTAsIHk6IHJlc3RyaWN0aW9uLmJvdHRvbSAtIHJlY3QucmlnaHQgLSAxMCB9XG4gIHJlc3RyaWN0LnNldChhcmcpXG4gIHQuZGVlcEVxdWFsKFxuICAgIGFyZy5jb29yZHMsXG4gICAgeyB4OiByZXN0cmljdGlvbi5yaWdodCAtIHJlY3QucmlnaHQsIHk6IHJlc3RyaWN0aW9uLmJvdHRvbSAtIHJlY3QucmlnaHQgfSxcbiAgICAna2VlcHMgdGhlIGJvdHRvbSByaWdodCBlZGdlIHZhbHVlcyBoaWdoZXIgdGhhbiB0aGUgcmVzdHJpY3Rpb24nXG4gIClcblxuICB0LmVuZCgpXG59KVxuIl19