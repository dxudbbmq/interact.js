import extend from '@interactjs/utils/extend';
import * as is from '@interactjs/utils/is';
import rectUtils from '@interactjs/utils/rect';
function start({ rect, startOffset, state, interaction, pageCoords }) {
    const { options } = state;
    const { elementRect } = options;
    const offset = extend({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }, options.offset || {});
    if (rect && elementRect) {
        const restriction = getRestrictionRect(options.restriction, interaction, pageCoords);
        if (restriction) {
            const widthDiff = (restriction.right - restriction.left) - rect.width;
            const heightDiff = (restriction.bottom - restriction.top) - rect.height;
            if (widthDiff < 0) {
                offset.left += widthDiff;
                offset.right += widthDiff;
            }
            if (heightDiff < 0) {
                offset.top += heightDiff;
                offset.bottom += heightDiff;
            }
        }
        offset.left += startOffset.left - (rect.width * elementRect.left);
        offset.top += startOffset.top - (rect.height * elementRect.top);
        offset.right += startOffset.right - (rect.width * (1 - elementRect.right));
        offset.bottom += startOffset.bottom - (rect.height * (1 - elementRect.bottom));
    }
    state.offset = offset;
}
function set({ coords, interaction, state }) {
    const { options, offset } = state;
    const restriction = getRestrictionRect(options.restriction, interaction, coords);
    if (!restriction) {
        return;
    }
    const rect = rectUtils.xywhToTlbr(restriction);
    coords.x = Math.max(Math.min(rect.right - offset.right, coords.x), rect.left + offset.left);
    coords.y = Math.max(Math.min(rect.bottom - offset.bottom, coords.y), rect.top + offset.top);
}
function getRestrictionRect(value, interaction, coords) {
    if (is.func(value)) {
        return rectUtils.resolveRectLike(value, interaction.interactable, interaction.element, [coords.x, coords.y, interaction]);
    }
    else {
        return rectUtils.resolveRectLike(value, interaction.interactable, interaction.element);
    }
}
const defaults = {
    restriction: null,
    elementRect: null,
    offset: null,
    endOnly: false,
};
const restrict = {
    start,
    set,
    getRestrictionRect,
    defaults,
};
export default restrict;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sMEJBQTBCLENBQUE7QUFDN0MsT0FBTyxLQUFLLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTtBQUMxQyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQWlCOUMsU0FBUyxLQUFLLENBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUE4QjtJQUMvRixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFBO0lBQ3pCLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUE7SUFDL0IsTUFBTSxNQUFNLEdBQWtCLE1BQU0sQ0FBQztRQUNuQyxJQUFJLEVBQUUsQ0FBQztRQUNQLEdBQUcsRUFBRSxDQUFDO1FBQ04sS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLEVBQUUsQ0FBQztLQUNWLEVBQUUsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUV4QixJQUFJLElBQUksSUFBSSxXQUFXLEVBQUU7UUFDdkIsTUFBTSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFFcEYsSUFBSSxXQUFXLEVBQUU7WUFDZixNQUFNLFNBQVMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7WUFDckUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1lBRXZFLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtnQkFDakIsTUFBTSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUE7Z0JB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QVE7Q0FDVCxDQUFBO0FBRUQsZUFBZSxRQUFRLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXh0ZW5kIGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzL2V4dGVuZCdcbmltcG9ydCAqIGFzIGlzIGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzL2lzJ1xuaW1wb3J0IHJlY3RVdGlscyBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9yZWN0J1xuaW1wb3J0IHsgTW9kaWZpZXJBcmcsIE1vZGlmaWVyU3RhdGUgfSBmcm9tICcuLi9iYXNlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3RyaWN0T3B0aW9ucyB7XG4gIC8vIHdoZXJlIHRvIGRyYWcgb3ZlclxuICByZXN0cmljdGlvbjogSW50ZXJhY3QuUmVjdFJlc29sdmFibGU8W251bWJlciwgbnVtYmVyLCBJbnRlcmFjdC5JbnRlcmFjdGlvbl0+XG4gIC8vIHdoYXQgcGFydCBvZiBzZWxmIGlzIGFsbG93ZWQgdG8gZHJhZyBvdmVyXG4gIGVsZW1lbnRSZWN0OiBJbnRlcmFjdC5SZWN0XG4gIG9mZnNldDogSW50ZXJhY3QuUmVjdFxuICAvLyByZXN0cmljdCBqdXN0IGJlZm9yZSB0aGUgZW5kIGRyYWdcbiAgZW5kT25seTogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBSZXN0cmljdFN0YXRlID0gTW9kaWZpZXJTdGF0ZTxSZXN0cmljdE9wdGlvbnMsIHtcbiAgb2Zmc2V0OiBJbnRlcmFjdC5SZWN0XG59PlxuXG5mdW5jdGlvbiBzdGFydCAoeyByZWN0LCBzdGFydE9mZnNldCwgc3RhdGUsIGludGVyYWN0aW9uLCBwYWdlQ29vcmRzIH06IE1vZGlmaWVyQXJnPFJlc3RyaWN0U3RhdGU+KSB7XG4gIGNvbnN0IHsgb3B0aW9ucyB9ID0gc3RhdGVcbiAgY29uc3QgeyBlbGVtZW50UmVjdCB9ID0gb3B0aW9uc1xuICBjb25zdCBvZmZzZXQ6IEludGVyYWN0LlJlY3QgPSBleHRlbmQoe1xuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgfSwgb3B0aW9ucy5vZmZzZXQgfHwge30pXG5cbiAgaWYgKHJlY3QgJiYgZWxlbWVudFJlY3QpIHtcbiAgICBjb25zdCByZXN0cmljdGlvbiA9IGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLnJlc3RyaWN0aW9uLCBpbnRlcmFjdGlvbiwgcGFnZUNvb3JkcylcblxuICAgIGlmIChyZXN0cmljdGlvbikge1xuICAgICAgY29uc3Qgd2lkdGhEaWZmID0gKHJlc3RyaWN0aW9uLnJpZ2h0IC0gcmVzdHJpY3Rpb24ubGVmdCkgLSByZWN0LndpZHRoXG4gICAgICBjb25zdCBoZWlnaHREaWZmID0gKHJlc3RyaWN0aW9uLmJvdHRvbSAtIHJlc3RyaWN0aW9uLnRvcCkgLSByZWN0LmhlaWdodFxuXG4gICAgICBpZiAod2lkdGhEaWZmIDwgMCkge1xuICAgICAgICBvZmZzZXQubGVmdCArPSB3aWR0aERpZmZcbiAgICAgICAgb2Zmc2V0LnJpZ2h0ICs9IHdpZHRoRGlmZlxuICAgICAgfVxuICAgICAgaWYgKGhlaWdodERpZmYgPCAwKSB7XG4gICAgICAgIG9mZnNldC50b3AgKz0gaGVpZ2h0RGlmZlxuICAgICAgICBvZmZzZXQuYm90dG9tICs9IGhlaWdodERpZmZcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvZmZzZXQubGVmdCArPSBzdGFydE9mZnNldC5sZWZ0IC0gKHJlY3Qud2lkdGggICogZWxlbWVudFJlY3QubGVmdClcbiAgICBvZmZzZXQudG9wICArPSBzdGFydE9mZnNldC50b3AgIC0gKHJlY3QuaGVpZ2h0ICogZWxlbWVudFJlY3QudG9wKVxuXG4gICAgb2Zmc2V0LnJpZ2h0ICArPSBzdGFydE9mZnNldC5yaWdodCAgLSAocmVjdC53aWR0aCAgKiAoMSAtIGVsZW1lbnRSZWN0LnJpZ2h0KSlcbiAgICBvZmZzZXQuYm90dG9tICs9IHN0YXJ0T2Zmc2V0LmJvdHRvbSAtIChyZWN0LmhlaWdodCAqICgxIC0gZWxlbWVudFJlY3QuYm90dG9tKSlcbiAgfVxuXG4gIHN0YXRlLm9mZnNldCA9IG9mZnNldFxufVxuXG5mdW5jdGlvbiBzZXQgKHsgY29vcmRzLCBpbnRlcmFjdGlvbiwgc3RhdGUgfSkge1xuICBjb25zdCB7IG9wdGlvbnMsIG9mZnNldCB9ID0gc3RhdGVcblxuICBjb25zdCByZXN0cmljdGlvbiA9IGdldFJlc3RyaWN0aW9uUmVjdChvcHRpb25zLnJlc3RyaWN0aW9uLCBpbnRlcmFjdGlvbiwgY29vcmRzKVxuXG4gIGlmICghcmVzdHJpY3Rpb24pIHsgcmV0dXJuIH1cblxuICBjb25zdCByZWN0ID0gcmVjdFV0aWxzLnh5d2hUb1RsYnIocmVzdHJpY3Rpb24pXG5cbiAgY29vcmRzLnggPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LnJpZ2h0ICAtIG9mZnNldC5yaWdodCwgY29vcmRzLngpLCByZWN0LmxlZnQgKyBvZmZzZXQubGVmdClcbiAgY29vcmRzLnkgPSBNYXRoLm1heChNYXRoLm1pbihyZWN0LmJvdHRvbSAtIG9mZnNldC5ib3R0b20sIGNvb3Jkcy55KSwgcmVjdC50b3AgICsgb2Zmc2V0LnRvcClcbn1cblxuZnVuY3Rpb24gZ2V0UmVzdHJpY3Rpb25SZWN0ICh2YWx1ZSwgaW50ZXJhY3Rpb24sIGNvb3Jkcz86IEludGVyYWN0LlBvaW50KSB7XG4gIGlmIChpcy5mdW5jKHZhbHVlKSkge1xuICAgIHJldHVybiByZWN0VXRpbHMucmVzb2x2ZVJlY3RMaWtlKHZhbHVlLCBpbnRlcmFjdGlvbi5pbnRlcmFjdGFibGUsIGludGVyYWN0aW9uLmVsZW1lbnQsIFtjb29yZHMueCwgY29vcmRzLnksIGludGVyYWN0aW9uXSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVjdFV0aWxzLnJlc29sdmVSZWN0TGlrZSh2YWx1ZSwgaW50ZXJhY3Rpb24uaW50ZXJhY3RhYmxlLCBpbnRlcmFjdGlvbi5lbGVtZW50KVxuICB9XG59XG5cbmNvbnN0IGRlZmF1bHRzOiBSZXN0cmljdE9wdGlvbnMgPSB7XG4gIHJlc3RyaWN0aW9uOiBudWxsLFxuICBlbGVtZW50UmVjdDogbnVsbCxcbiAgb2Zmc2V0OiBudWxsLFxuICBlbmRPbmx5OiBmYWxzZSxcbn1cblxuY29uc3QgcmVzdHJpY3QgPSB7XG4gIHN0YXJ0LFxuICBzZXQsXG4gIGdldFJlc3RyaWN0aW9uUmVjdCxcbiAgZGVmYXVsdHMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlc3RyaWN0XG4iXX0=