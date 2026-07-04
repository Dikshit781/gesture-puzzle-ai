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

    h, w = image.shape[:2]

    # Make square canvas without cropping the image
    size = min(h, w)

    start_x = (w - size) // 2
    start_y = (h - size) // 2

    square_image = image[
        start_y:start_y + size,
        start_x:start_x + size
    ]

    output_size = 600
    square_image = cv2.resize(square_image, (output_size, output_size))

    piece_size = output_size // grid
    pieces = []

    for file in os.listdir(OUTPUT_FOLDER):
        if file.endswith(".jpg") or file.endswith(".png"):
            os.remove(os.path.join(OUTPUT_FOLDER, file))

    count = 0

    for row in range(grid):
        for col in range(grid):
            y = row * piece_size
            x = col * piece_size

            piece = square_image[
                y:y + piece_size,
                x:x + piece_size
            ]

            filename = f"{unique_id}_piece_{count}.jpg"

            cv2.imwrite(
                os.path.join(OUTPUT_FOLDER, filename),
                piece
            )

            pieces.append(filename)
            count += 1

    return pieces