/* eslint-disable max-len */
const { ConvertImagen } = require('./imagenConvertService');

describe('Test for imagenConvertService class', () => {
  it('convertExtension method should convert a jpg to png', async () => {
    const fileName = 'test';
    const extensionInput = 'jpg';
    const extensionOutput = 'png';
    const convertClass = new ConvertImagen();
    const testResult = await convertClass.convertExtension(fileName, extensionInput, extensionOutput);
    expect(testResult).toBe('converted');
  });
  it('convertSize method should change the size if imagen', async () => {
    const fileNameInput = 'test';
    const fileNameOutput = 'output';
    const extensionInput = 'jpg';
    const width = '100';
    const height = '100';
    const convertClass = new ConvertImagen();
    const testResult = await convertClass.convertSize(fileNameInput, fileNameOutput, extensionInput, width, height);
    expect(testResult).toBe('converted');
  });
  it('convertGrayScale method should convert to gray scale', async () => {
    const fileNameInput = 'test';
    const fileNameOutput = 'outputGray';
    const extensionInput = 'jpg';
    const convertClass = new ConvertImagen();
    const testResult = await convertClass.convertGrayScale(fileNameInput, fileNameOutput, extensionInput);
    expect(testResult).toBe('converted');
  });
  it('rotate90 method should rotate 90 grades a imagen', async () => {
    const fileNameInput = 'test';
    const fileNameOutput = 'outputRotate';
    const extensionInput = 'jpg';
    const convertClass = new ConvertImagen();
    const testResult = await convertClass.rotate90(fileNameInput, fileNameOutput, extensionInput);
    expect(testResult).toBe('converted');
  });

  // negative testing

  it('convertExtension method should not convert a jpg to png because input file does not exist', async () => {
    const fileName = 'test12';
    const extensionInput = 'jpg';
    const extensionOutput = 'pnbbg';
    const convertClass = new ConvertImagen();
    const testResult = await convertClass.convertExtension(fileName, extensionInput, extensionOutput);
    expect(testResult).not.toBe('converted');
  });
  it('convertSize method should not change the size if imagen because input file does not exist', async () => {
    const fileNameInput = 'tes1t';
    const fileNameOutput = 'output';
    const extensionInput = 'jpg';
    const width = '100';
    const height = '100';
    const convertClass = new ConvertImagen();
    const testResult = await convertClass.convertSize(fileNameInput, fileNameOutput, extensionInput, width, height);
    expect(testResult).not.toBe('converted');
  });
  it('convertGrayScale method should not convert to gray scale because input file does not exist', async () => {
    const fileNameInput = 'te3st';
    const fileNameOutput = 'outputGray';
    const extensionInput = 'jpg';
    const convertClass = new ConvertImagen();
    const testResult = await convertClass.convertGrayScale(fileNameInput, fileNameOutput, extensionInput);
    expect(testResult).not.toBe('converted');
  });
  it('rotate90 method should not rotate 90 grades a imagen because input file does not exist', async () => {
    const fileNameInput = 'test1';
    const fileNameOutput = 'outputRotate';
    const extensionInput = 'jpg';
    const convertClass = new ConvertImagen();
    const testResult = await convertClass.rotate90(fileNameInput, fileNameOutput, extensionInput);
    expect(testResult).not.toBe('converted');
  });
});
