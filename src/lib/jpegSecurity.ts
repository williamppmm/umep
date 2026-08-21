export const MAX_JPEG_SIZE = 3 * 1024 * 1024;
export const MAX_JPEG_DIMENSION = 1600;

const START_OF_FRAME_MARKERS = new Set([
  0xc0,
  0xc1,
  0xc2,
  0xc3,
  0xc5,
  0xc6,
  0xc7,
  0xc9,
  0xca,
  0xcb,
  0xcd,
  0xce,
  0xcf,
]);

export type JpegDimensions = {
  width: number;
  height: number;
};

export type JpegValidationResult =
  | { ok: true; dimensions: JpegDimensions }
  | { ok: false; error: string };

function hasJpegBoundaries(bytes: Uint8Array) {
  return (
    bytes.length >= 4 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[bytes.length - 2] === 0xff &&
    bytes[bytes.length - 1] === 0xd9
  );
}

export function readJpegDimensions(bytes: Uint8Array): JpegDimensions | null {
  if (!hasJpegBoundaries(bytes)) {
    return null;
  }

  let offset = 2;
  let dimensions: JpegDimensions | null = null;

  while (offset < bytes.length - 2) {
    if (bytes[offset] !== 0xff) {
      return null;
    }

    while (bytes[offset] === 0xff) {
      offset += 1;
    }

    const marker = bytes[offset];
    offset += 1;

    if (marker === 0xda) {
      return dimensions;
    }

    if (marker === 0xd9) {
      return null;
    }

    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue;
    }

    if (offset + 1 >= bytes.length) {
      return null;
    }

    const segmentLength = (bytes[offset] << 8) | bytes[offset + 1];
    if (segmentLength < 2 || offset + segmentLength > bytes.length) {
      return null;
    }

    if (START_OF_FRAME_MARKERS.has(marker)) {
      if (segmentLength < 7) {
        return null;
      }

      const height = (bytes[offset + 3] << 8) | bytes[offset + 4];
      const width = (bytes[offset + 5] << 8) | bytes[offset + 6];
      if (width < 1 || height < 1) {
        return null;
      }

      dimensions = { width, height };
    }

    offset += segmentLength;
  }

  return null;
}

export function validateJpegUpload(bytes: Uint8Array): JpegValidationResult {
  if (bytes.byteLength > MAX_JPEG_SIZE) {
    return {
      ok: false,
      error: 'La imagen supera el limite permitido de 3 MB',
    };
  }

  const dimensions = readJpegDimensions(bytes);
  if (!dimensions) {
    return {
      ok: false,
      error: 'El archivo recibido no es una imagen JPEG valida',
    };
  }

  if (
    dimensions.width > MAX_JPEG_DIMENSION ||
    dimensions.height > MAX_JPEG_DIMENSION
  ) {
    return {
      ok: false,
      error: `La imagen supera las dimensiones permitidas de ${MAX_JPEG_DIMENSION} x ${MAX_JPEG_DIMENSION} pixeles`,
    };
  }

  return { ok: true, dimensions };
}
