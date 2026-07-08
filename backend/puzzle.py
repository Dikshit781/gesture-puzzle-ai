import cv2
import os

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

    size = min(h, w)

    start_x = (w - size) // 2
    start_y = (h - size) // 2

    image = image[
        start_y:start_y + size,
        start_x:start_x + size
    ]

    output_size = 600
    image = cv2.resize(image, (output_size, output_size))

    piece_size = output_size // grid

    pieces = []

    count = 0

    for row in range(grid):
        for col in range(grid):
            y = row * piece_size
            x = col * piece_size

            piece = image[
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