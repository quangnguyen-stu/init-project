<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @routes
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
{{--    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />--}}
    <link href="http://localhost:8000/css/app.css" rel="stylesheet" />
{{--    <script src="{{ mix('/js/app.js') }}" defer></script>--}}
    <script type="module" src="http://localhost:8000/js/app.js"></script>
</head>
<body>
@inertia
</body>
</html>
