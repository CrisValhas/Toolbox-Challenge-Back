const { it, describe } = require("mocha");
const Test = require("./index");
var chai = require('chai');
const expect = require('chai').expect;
const url = 'http://localhost:3001';
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("DataValidaterTest", async function () {
    it("validating data...", function () {
        const result = Test.dataValidate()
    })
});