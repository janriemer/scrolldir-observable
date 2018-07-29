import * as express from 'express';

let app = express();
app.use(express.static('public'));
const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});