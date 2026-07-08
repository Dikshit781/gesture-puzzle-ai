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

    output_size = 600
    h, w = image.shape[:2]

    # Resize like object-fit: cover
    scale = output_size / min(w, h)
    new_w = int(w * scale)
    new_h = int(h * scale)

    resized = cv2.resize(image, (new_w, new_h))

    # Center crop to 600x600
    start_x = (new_w - output_size) // 2
    start_y = (new_h - output_size) // 2

    square_image = resized[
        start_y:start_y + output_size,
        start_x:start_x + output_size
    ]

    piece_size = output_size // grid
    pieces = []

    count = 0

    for row in range(grid):
        for col in range(grid):
            y = row * piece_size
            x = col * piece_size

            piece = square_image[y:y + piece_size, x:x + piece_size]

            filename = f"{unique_id}_piece_{count}.jpg"
            cv2.imwrite(os.path.join(OUTPUT_FOLDER, filename), piece)

            pieces.append(filename)
            count += 1

    return pieces