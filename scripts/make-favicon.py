import struct

try:
    from PIL import Image, ImageDraw

    img = Image.new("RGBA", (32, 32), (4, 24, 48, 255))
    d = ImageDraw.Draw(img)
    d.ellipse((2, 2, 29, 29), outline=(61, 184, 245, 255), width=2)
    d.rectangle((12, 10, 19, 24), fill=(61, 184, 245, 255))
    img.save("favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
    print("pillow ico ok")
except Exception as e:
    print("pillow fail", e)
    w = h = 16
    rows = []
    for y in range(h - 1, -1, -1):
        row = bytearray()
        for x in range(w):
            cx, cy = 7.5, 7.5
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            if 5.2 <= dist <= 7.2 or (5 <= x <= 10 and 4 <= y <= 11):
                row += bytes([245, 184, 61, 255])
            else:
                row += bytes([0x30, 0x18, 0x04, 255])
        rows.append(bytes(row))
    xor = b"".join(rows)
    and_mask = b"\x00\x00\x00\x00" * 16
    image_data = xor + and_mask
    bih = struct.pack("<IIIHHIIIIII", 40, w, h * 2, 1, 32, 0, len(image_data), 0, 0, 0, 0)
    entry = struct.pack("<BBBBHHII", w % 256, h % 256, 0, 0, 1, 32, 40 + len(image_data), 22)
    header = struct.pack("<HHH", 0, 1, 1)
    open("favicon.ico", "wb").write(header + entry + bih + image_data)
    print("manual ico ok")

open("favicon.svg", "w", encoding="utf-8").write(
    """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#041830"/>
  <circle cx="16" cy="16" r="10" fill="none" stroke="#3db8f5" stroke-width="2"/>
  <rect x="14" y="10" width="4" height="12" rx="1" fill="#3db8f5"/>
</svg>
"""
)
print("svg ok")
