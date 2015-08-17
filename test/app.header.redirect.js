var express = require("express");
var serveStatic = require("serve-static");

var app = express();

// load liveReload script only in development mode
if (app.get("env") === "development") {
    var respMod = require("..");
    app.use(respMod());
}

// load static content before routing takes place
app.use(serveStatic(__dirname + "/fixtures"));

app.get("/redirect_to_favicon", function (req, res) {
    res.writeHead(302, {"Location": "/favicon.ico"});
    res.end("just use nodejs method, donot call express api");
});

app.get("/redirect_to_favicon2", function (req, res) {
    res.writeHead(302, "description", {"Location": "/favicon.ico"});
    res.end("just use nodejs method, donot call express api");
});

app.get("/redirect_to_favicon3", function (req, res) {
    res.writeHead(302);
    res.end("just use nodejs method, donot call express api");
});

// start the server
if (!module.parent) {
    var port = settings.webserver.port || 3000;
    app.listen(port);
    console.log("Express app started on port " + port);
}

// run the tests
var request = require("supertest");

describe("GET /redirect_to_favicon", function () {
    it("respond with Location header", function (done) {
        request(app)
            .get("/redirect_to_favicon")
            .set("Accept", "text/html")
            .expect("Location", "/favicon.ico")
            .expect(302)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe("GET /redirect_to_favicon2", function () {
    it("respond with Location header", function (done) {
        request(app)
            .get("/redirect_to_favicon")
            .set("Accept", "text/html")
            .expect("Location", "/favicon.ico")
            .expect(302)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe("GET /redirect_to_favicon3", function () {
    it("respond with Location header", function (done) {
        request(app)
            .get("/redirect_to_favicon")
            .set("Accept", "text/html")
            .expect(302)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
