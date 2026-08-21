import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MAX_JPEG_SIZE,
  readJpegDimensions,
  validateJpegUpload,
} from '../src/lib/jpegSecurity.ts';

function createJpeg(width: number, height: number) {
  return Uint8Array.from([
    0xff, 0xd8,
    0xff, 0xc0, 0x00, 0x11, 0x08,
    (height >> 8) & 0xff, height & 0xff,
    (width >> 8) & 0xff, width & 0xff,
    0x03, 0x01, 0x11, 0x00, 0x02, 0x11, 0x00, 0x03, 0x11, 0x00,
    0xff, 0xda, 0x00, 0x0c, 0x03, 0x01, 0x00, 0x02, 0x11, 0x03, 0x11, 0x00, 0x3f, 0x00,
    0x00,
    0xff, 0xd9,
  ]);
}

test('lee dimensiones de un JPEG estructuralmente valido', () => {
  assert.deepEqual(readJpegDimensions(createJpeg(1200, 900)), {
    width: 1200,
    height: 900,
  });
});

test('rechaza un archivo que solo declara MIME de imagen', () => {
  const result = validateJpegUpload(new TextEncoder().encode('contenido arbitrario'));

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /JPEG valida/);
  }
});

test('rechaza dimensiones superiores al limite', () => {
  const result = validateJpegUpload(createJpeg(1601, 900));

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /1600 x 1600/);
  }
});

test('rechaza archivos superiores a 3 MB antes de inspeccionarlos', () => {
  const result = validateJpegUpload(new Uint8Array(MAX_JPEG_SIZE + 1));

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /3 MB/);
  }
});
