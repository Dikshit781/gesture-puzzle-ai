import cv2
import os
import numpy as np

OUTPUT_FOLDER = "generated"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def generate_puzzle(image_path, grid=3, unique_id="puzzle"):
    image = cv2.imread(image_path)

    if image is None:
        raise Exception("Image not found")

    grid = int(grid)

    if grid not in [3, 4, 5]:
        grid = 3

    output_size = 600

    h, w = image.shape[:2]

    # Resize image while keeping full image visible
    scale = output_size / max(w, h)
    new_w = int(w * scale)
    new_h = int(h * scale)

    resized = cv2.resize(image, (new_w, new_h))

    # Create square canvas
    canvas = np.ones((output_size, output_size, 3), dtype=np.uint8) * 255

    x_offset = (output_size - new_w) // 2
    y_offset = (output_size - new_h) // 2

    canvas[
        y_offset:y_offset + new_h,
        x_offset:x_offset + new_w
    ] = resized

    piece_size = output_size // grid
    pieces = []

    count = 0

    for row in range(grid):
        for col in range(grid):
            y = row * piece_size
            x = col * piece_size

            piece = canvas[y:y + piece_size, x:x + piece_size]

            filename = f"{unique_id}_piece_{count}.jpg"

            cv2.imwrite(os.path.join(OUTPUT_FOLDER, filename), piece)

            pieces.append(filename)
            count += 1

    return pieces