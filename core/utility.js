function getResponse(result, start) {
    const duration = (Date.now() - start) / 1000;
    
    return {
        data: Array.isArray(result) ? result : [result],
        count: result?.length,
        duration
    };
}

module.exports = {
    getResponse
}
