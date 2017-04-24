var e = require('express');
var a = e();
a.use(e.static('dist/'));
a.listen(process.env.PORT || 8000);
