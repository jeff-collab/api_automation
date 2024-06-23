const supertest = require("supertest");
var assert = require("assert");
const chai = require('chai');
const { expect } = require("chai");
const { JSON_SCHEMA } = require("js-yaml");
const fs = require('fs');
const chaiJsonSchema = require('chai-json-schema')
chai.use(chaiJsonSchema)

describe('restful-api.dev API Test', () => {
    it('TC1 - GET Single User', async () => {
       const schema = JSON.parse(fs.readFileSync("resouce/schema/get_single_user_schema.json", 'utf8'));    
       const response = await supertest("https://reqres.in").get("/api/users/2");

       console.log(response.body)
       assert.equal(response.status,200)
       expect(response.body.data.id).to.equal(2)
       expect(response.body.data.first_name).to.equal("Janet")
       expect(response.body).to.be.jsonSchema(schema)
    });

    it('TC2 - POST ADD User Lala', async () => {
    const schema = JSON.parse(fs.readFileSync("resouce/schema/post_add_user_Lala.json", 'utf8'));
        const body = {
            "name": "Lala",
            "job": "leader"
        }
       const response = await supertest("https://reqres.in").post("/api/users").send(body);

       console.log(response)
       assert.equal(response.status,201)
       expect(response.body.name).to.equal("Lala")
       expect(response.body).to.be.jsonSchema(schema)
    });

    it('TC3 - DELETE USER ID 52', async () => {  
       const response = await supertest("https://reqres.in").del("/api/users/52");
       console.log(response.body)
       assert.equal(response.status,204)
    });

    it('TC4 - PUT UPDATE USER ID 572', async () => {
        const schema = JSON.parse(fs.readFileSync("resouce/schema/put_update_user_id_803.json", 'utf8'));
        const body = {
            "name": "Zaza",
            "job": "bos"
        }
       const response = await supertest("https://reqres.in").put("/api/users/803'").send(body);

       console.log(response)
       assert.equal(response.status,200)
       expect(response.body.name).to.equal("Zaza")
       expect(response.body.job).to.equal("bos")
       expect(response.body).to.be.jsonSchema(schema)
    });
    
});