import json

def lambda_handler(event, context):
    with open("openapi.yaml", "r", encoding="utf-8") as f:
        openapi_spec = f.read()

    html = """
<!DOCTYPE html>
<html>
<head>
  <title>SpaceX Launches API</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
  <link rel="icon" href="data:,">
</head>
<body>

<div id="swagger-ui"></div>

<script src="https://unpkg.com/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>

<script>
  const YAML_SPEC = {openapi};

  SwaggerUIBundle({{
    spec: jsyaml.load(YAML_SPEC),
    dom_id: "#swagger-ui"
  }});
</script>

</body>
</html>
""".format(openapi=json.dumps(openapi_spec))

    # ⬇⬇⬇ AQUÍ VAN LLAVES NORMALES ⬇⬇⬇
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*"
        },
        "body": html
    }
