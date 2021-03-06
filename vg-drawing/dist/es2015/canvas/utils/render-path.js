
export default function renderPath(ctx, path) {
    const segments = path.segments;

    if (segments.length === 0) {
        return;
    }

    let segment = segments[0];
    let anchor = segment.anchor();
    ctx.moveTo(anchor.x, anchor.y);

    for (let i = 1; i < segments.length; i++) {
        segment = segments[i];
        anchor = segment.anchor();

        let prevSeg = segments[i - 1];
        let prevOut = prevSeg.controlOut();
        let controlIn = segment.controlIn();

        if (prevOut && controlIn) {
            ctx.bezierCurveTo(prevOut.x, prevOut.y,
                              controlIn.x, controlIn.y,
                              anchor.x, anchor.y);
        } else {
            ctx.lineTo(anchor.x, anchor.y);
        }
    }

    if (path.options.closed) {
        ctx.closePath();
    }
}