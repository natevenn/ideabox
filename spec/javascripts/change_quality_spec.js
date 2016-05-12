//= require status

describe('status', function() {
    it('changes the quality by incrementing up by 1', function() {
        var oldQuality = 0
        var vote = 'thumbs-up'
        result = 1
        expect(changeQuality(oldQuality, vote)).to.equal(result)
    });

    it('changes the quality by decreasing down by 1', function() {
        var oldQuality = 1
        var vote = 'thumbs-down'
        result = 0
        expect(changeQuality(oldQuality, vote)).to.equal(result)
    });

    it('does not change the quality if increasing by one when quality = 2', function() {
        var oldQuality = 2
        var vote = 'thumbs-up'
        result = oldQuality
        expect(changeQuality(oldQuality, vote)).to.equal(result)
    });

    it('does not change the quality if decreasing by one when qualtity = 0', function() {
        var oldQuality = 0
        var vote = 'thumbs-down'
        result = oldQuality
        expect(changeQuality(oldQuality, vote)).to.equal(result)
    });
});
