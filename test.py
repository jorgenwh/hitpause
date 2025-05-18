import sys

# Imports the Google Cloud client library
from google.cloud import vision

# Instantiates a client
client = vision.ImageAnnotatorClient()
# product_search_client = vision.ProductSearchClient()

# The URI of the image file to annotate
file_uri = sys.argv[1]

image_source = vision.ImageSource(image_uri = file_uri)
image = vision.Image(source=image_source)

response = client.object_localization(image=image)

localized_object_annotations = response.localized_object_annotations
print("Object localization results:")
for object_ in localized_object_annotations:
    print(f"  {object_.name} (confidence: {object_.score})")
    for vertex in object_.bounding_poly.normalized_vertices:
        print(f"  - ({vertex.x}, {vertex.y})")

# response = client.web_detection(image=image)

# web_detection = response.web_detection
# print("Web detection results:")
# if web_detection.web_entities:
#     print("Web entities:")
#     for entity in web_detection.web_entities:
#         print(f"  {entity.description} (score: {entity.score})")
#
# print("Best guess labels:")
# if web_detection.best_guess_labels:
#     for label in web_detection.best_guess_labels:
#         print(f"  {label.label}")
#
