const { it, describe } = require("mocha");
var chai = require('chai');
const expect = require('chai').expect;
const url = 'http://localhost:3001';
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

class Test {
    dataValidate() {
        chai.request(url)
            .get('/files/data')
            .send()
            .end(function (err, res) {
                // console.log(res.body)
                res.body.map((e) =>
                    expect(typeof (e.file)).to.equal("string"))
                expect(res).to.have.status(200);
                // done();
            })
        // return{
        //     text : "string",
        //     hax : 32,
        //     number : "number"
        // }
    }
}

module.exports = new Test();