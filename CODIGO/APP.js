const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath === './') {
        filePath = './public/home.html'; 
    } 
    else {
        filePath = './public' + req.url + '.html'; 
    }

    // Verificar se o arquivo existe
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Arquivo não encontrado.");
            return;
        }

        // Arquivo encontrado, servir conteúdo
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

const PORT = process.env.PORT || 8000; 
server.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO EM http://localhost:${PORT}/`);
});
