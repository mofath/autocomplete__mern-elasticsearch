const extractLocation = (urlLike) => {
    if (urlLike.indexOf(':') === -1) return [urlLike];
    const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
    const parts = regExp.exec(urlLike.replace(/[()]/g, ''));
    return [parts[1], parts[2] || undefined, parts[3] || undefined];
}

exports.errorStackParser = (error) => {
    const filtered = error.stack.split('\n').filter((line) => line);

    return filtered.map((line) => {
        let sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(');
        const location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
        sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;
        const tokens = sanitizedLine.split(/\s+/).slice(1);

        const locationParts = extractLocation(location ? location[1] : tokens.pop());
        const functionName = tokens.join(' ') || undefined;
        const fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

        return {
            locationParts,
            functionName,
            fileName
        }
    })
};