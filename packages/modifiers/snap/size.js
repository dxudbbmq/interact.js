// This module allows snapping of the size of targets during resize
// interactions.
import extend from '@interactjs/utils/extend';
import * as is from '@interactjs/utils/is';
import snap from './pointer';
function start(arg) {
    const { interaction, state } = arg;
    const { options } = state;
    const edges = interaction.prepared.edges;
    if (!edges) {
        return null;
    }
    arg.state = {
        options: {
            targets: null,
            relativePoints: [{
                    x: edges.left ? 0 : 1,
                    y: edges.top ? 0 : 1,
                }],
            offset: options.offset || 'self',
            origin: { x: 0, y: 0 },
            range: options.range,
        },
    };
    state.targetFields = state.targetFields || [
        ['width', 'height'],
        ['x', 'y'],
    ];
    snap.start(arg);
    state.offsets = arg.state.offsets;
    arg.state = state;
}
function set(arg) {
    const { interaction, state, coords } = arg;
    const { options, offsets } = state;
    const relative = {
        x: coords.x - offsets[0].x,
        y: coords.y - offsets[0].y,
    };
    state.options = extend({}, options);
    state.options.targets = [];
    for (const snapTarget of (options.targets || [])) {
        let target;
        if (is.func(snapTarget)) {
            target = snapTarget(relative.x, relative.y, interaction);
        }
        else {
            target = snapTarget;
        }
        if (!target) {
            continue;
        }
        for (const [xField, yField] of state.targetFields) {
            if (xField in target || yField in target) {
                target.x = target[xField];
                target.y = target[yField];
                break;
            }
        }
        state.options.targets.push(target);
    }
    snap.set(arg);
    state.options = options;
}
const defaults = {
    range: Infinity,
    targets: null,
    offset: null,
    endOnly: false,
};
const snapSize = {
    start,
    set,
    defaults,
};
export default snapSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUVBQW1FO0FBQ25FLGdCQUFnQjtBQUVoQixPQUFPLE1BQU0sTUFBTSwwQkFBMEIsQ0FBQTtBQUM3QyxPQUFPLEtBQUssRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBRTFDLE9BQU8sSUFBZ0MsTUFBTSxXQUFXLENBQUE7QUFPeEQsU0FBUyxLQUFLLENBQUUsR0FBMkI7SUFDekMsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFDbEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQTtJQUN6QixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQTtJQUV4QyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUE7S0FBRTtJQUUzQixHQUFHLENBQUMsS0FBSyxHQUFHO1FBQ1YsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLElBQUk7WUFDYixjQUFjLEVBQUUsQ0FBQztvQkFDZixDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyQixDQUFDO1lBQ0YsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksTUFBTTtZQUNoQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1NBQ3JCO0tBQ0YsQ0FBQTtJQUVELEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksSUFBSTtRQUN6QyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7UUFDbkIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO0tBQ1gsQ0FBQTtJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDZixLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFBO0lBRWpDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ25CLENBQUM7QUFFRCxTQUFTLEdBQUcsQ0FBRSxHQUFHO0lBQ2YsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBQzFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFBO0lBQ2xDLE1BQU0sUUFBUSxHQUFHO1FBQ2YsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0IsQ0FBQTtJQUVELEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFFMUIsS0FBSyxNQUFNLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDaEQsSUFBSSxNQUFNLENBQUE7UUFFVixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7U0FDekQ7YUFDSTtZQUNILE1BQU0sR0FBRyxVQUFVLENBQUE7U0FDcEI7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQUUsU0FBUTtTQUFFO1FBRXpCLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ2pELElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO2dCQUN4QyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRXpCLE1BQUs7YUFDTjtTQUNGO1FBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ25DO0lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUViLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0FBQ3pCLENBQUM7QUFFRCxNQUFNLFFBQVEsR0FBb0I7SUFDaEMsS0FBSyxFQUFFLFFBQVE7SUFDZixPQUFPLEVBQUUsSUFBSTtJQUNiLE1BQU0sRUFBRSxJQUFJO0lBQ1osT0FBTyxFQUFFLEtBQUs7Q0FDZixDQUFBO0FBRUQsTUFBTSxRQUFRLEdBQUc7SUFDZixLQUFLO0lBQ0wsR0FBRztJQUNILFFBQVE7Q0FDVCxDQUFBO0FBRUQsZUFBZSxRQUFRLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIG1vZHVsZSBhbGxvd3Mgc25hcHBpbmcgb2YgdGhlIHNpemUgb2YgdGFyZ2V0cyBkdXJpbmcgcmVzaXplXG4vLyBpbnRlcmFjdGlvbnMuXG5cbmltcG9ydCBleHRlbmQgZnJvbSAnQGludGVyYWN0anMvdXRpbHMvZXh0ZW5kJ1xuaW1wb3J0ICogYXMgaXMgZnJvbSAnQGludGVyYWN0anMvdXRpbHMvaXMnXG5pbXBvcnQgeyBNb2RpZmllckFyZyB9IGZyb20gJy4uL2Jhc2UnXG5pbXBvcnQgc25hcCwgeyBTbmFwT3B0aW9ucywgU25hcFN0YXRlIH0gZnJvbSAnLi9wb2ludGVyJ1xuXG5leHBvcnQgdHlwZSBTbmFwU2l6ZU9wdGlvbnMgPSBQaWNrPFxuU25hcE9wdGlvbnMsXG4ndGFyZ2V0cycgfCAnb2Zmc2V0JyB8ICdlbmRPbmx5JyB8ICdyYW5nZSdcbj5cblxuZnVuY3Rpb24gc3RhcnQgKGFyZzogTW9kaWZpZXJBcmc8U25hcFN0YXRlPikge1xuICBjb25zdCB7IGludGVyYWN0aW9uLCBzdGF0ZSB9ID0gYXJnXG4gIGNvbnN0IHsgb3B0aW9ucyB9ID0gc3RhdGVcbiAgY29uc3QgZWRnZXMgPSBpbnRlcmFjdGlvbi5wcmVwYXJlZC5lZGdlc1xuXG4gIGlmICghZWRnZXMpIHsgcmV0dXJuIG51bGwgfVxuXG4gIGFyZy5zdGF0ZSA9IHtcbiAgICBvcHRpb25zOiB7XG4gICAgICB0YXJnZXRzOiBudWxsLFxuICAgICAgcmVsYXRpdmVQb2ludHM6IFt7XG4gICAgICAgIHg6IGVkZ2VzLmxlZnQgPyAwIDogMSxcbiAgICAgICAgeTogZWRnZXMudG9wID8gMCA6IDEsXG4gICAgICB9XSxcbiAgICAgIG9mZnNldDogb3B0aW9ucy5vZmZzZXQgfHwgJ3NlbGYnLFxuICAgICAgb3JpZ2luOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIHJhbmdlOiBvcHRpb25zLnJhbmdlLFxuICAgIH0sXG4gIH1cblxuICBzdGF0ZS50YXJnZXRGaWVsZHMgPSBzdGF0ZS50YXJnZXRGaWVsZHMgfHwgW1xuICAgIFsnd2lkdGgnLCAnaGVpZ2h0J10sXG4gICAgWyd4JywgJ3knXSxcbiAgXVxuXG4gIHNuYXAuc3RhcnQoYXJnKVxuICBzdGF0ZS5vZmZzZXRzID0gYXJnLnN0YXRlLm9mZnNldHNcblxuICBhcmcuc3RhdGUgPSBzdGF0ZVxufVxuXG5mdW5jdGlvbiBzZXQgKGFyZykge1xuICBjb25zdCB7IGludGVyYWN0aW9uLCBzdGF0ZSwgY29vcmRzIH0gPSBhcmdcbiAgY29uc3QgeyBvcHRpb25zLCBvZmZzZXRzIH0gPSBzdGF0ZVxuICBjb25zdCByZWxhdGl2ZSA9IHtcbiAgICB4OiBjb29yZHMueCAtIG9mZnNldHNbMF0ueCxcbiAgICB5OiBjb29yZHMueSAtIG9mZnNldHNbMF0ueSxcbiAgfVxuXG4gIHN0YXRlLm9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMpXG4gIHN0YXRlLm9wdGlvbnMudGFyZ2V0cyA9IFtdXG5cbiAgZm9yIChjb25zdCBzbmFwVGFyZ2V0IG9mIChvcHRpb25zLnRhcmdldHMgfHwgW10pKSB7XG4gICAgbGV0IHRhcmdldFxuXG4gICAgaWYgKGlzLmZ1bmMoc25hcFRhcmdldCkpIHtcbiAgICAgIHRhcmdldCA9IHNuYXBUYXJnZXQocmVsYXRpdmUueCwgcmVsYXRpdmUueSwgaW50ZXJhY3Rpb24pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGFyZ2V0ID0gc25hcFRhcmdldFxuICAgIH1cblxuICAgIGlmICghdGFyZ2V0KSB7IGNvbnRpbnVlIH1cblxuICAgIGZvciAoY29uc3QgW3hGaWVsZCwgeUZpZWxkXSBvZiBzdGF0ZS50YXJnZXRGaWVsZHMpIHtcbiAgICAgIGlmICh4RmllbGQgaW4gdGFyZ2V0IHx8IHlGaWVsZCBpbiB0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0LnggPSB0YXJnZXRbeEZpZWxkXVxuICAgICAgICB0YXJnZXQueSA9IHRhcmdldFt5RmllbGRdXG5cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0ZS5vcHRpb25zLnRhcmdldHMucHVzaCh0YXJnZXQpXG4gIH1cblxuICBzbmFwLnNldChhcmcpXG5cbiAgc3RhdGUub3B0aW9ucyA9IG9wdGlvbnNcbn1cblxuY29uc3QgZGVmYXVsdHM6IFNuYXBTaXplT3B0aW9ucyA9IHtcbiAgcmFuZ2U6IEluZmluaXR5LFxuICB0YXJnZXRzOiBudWxsLFxuICBvZmZzZXQ6IG51bGwsXG4gIGVuZE9ubHk6IGZhbHNlLFxufVxuXG5jb25zdCBzbmFwU2l6ZSA9IHtcbiAgc3RhcnQsXG4gIHNldCxcbiAgZGVmYXVsdHMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNuYXBTaXplXG4iXX0=