import { Converter } from "./converter";

describe('Tests for Converter class', () => {
    it('Should be able to convert a video to another format', () => {
        const converter = new Converter();
        const inputVideo = 'D:/Charles/JalaCapacitacion/Progra101/ffmpeg/converter/samples/sample1.avi';
        const outputVideo = 'mp4';
        return converter.runConverter(inputVideo, outputVideo)
        .then(data => {
            expect(data).toBe('Ok!');
        }).catch(data => {
            expect(data).not.toBe('Ok!');});
    });

    it('Should be able to convert a video to another format with width and height dimensions', () => {
        const converter = new Converter();
        const inputVideo = 'D:/Charles/JalaCapacitacion/Progra101/ffmpeg/converter/samples/sample4.avi';
        const outputVideo = 'mp4';
        const width = 640;
        const height = 420;
        return converter.runConverterWithDimensions(inputVideo, outputVideo, width, height)
        .then(data => {
            expect(data).toBe('Ok!');
        }).catch(data => {
            expect(data).not.toBe('Ok!');});
    });

    it('Should be able to convert a video to another format with aspect ratio', () => {
        const converter = new Converter();
        const inputVideo = 'D:/Charles/JalaCapacitacion/Progra101/ffmpeg/converter/samples/sample3.avi';
        const outputVideo = 'mp4';
        const aspectRatio = '16:9';
        return converter.runConverterWithAspectRatio(inputVideo, outputVideo, aspectRatio)
        .then(data => {
            expect(data).toBe('Ok!');
        }).catch(data => {
            expect(data).not.toBe('Ok!');});
    });
});