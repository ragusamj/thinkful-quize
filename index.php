<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Thinkful Quize App</title>
  <script src="/js/app.min.js"></script>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <div class="container-fluid">
    <section id="breadcrumb" class="col-xs-12"></section>
    <section id="questions" class="col-xs-12">	
      <fieldset class="form-group">
        <legend><label id="question" for="answer" class="required">Question</label></legend>
        <input id="answer" type="text" value="" class="form-control" />
      </fieldset>
    </section>
    <section id="actions" class="actions col-xs-12">
      <div class="text-right">	
        <button id="btn-submit" class="btn btn-success" >Next Question <span class="glyphicon glyphicon-chevron-right"></span></button>
      </div>
    </section>
  </div>
</body>
</html>