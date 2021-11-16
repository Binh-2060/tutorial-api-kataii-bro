import { expect } from "chai";
import { encrypt, decrypt } from "./crypt";
import { describe, it } from "mocha";
import { sign, verify, PUBLIC_KEY, options } from "./jwt";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

describe("Json Web token", () => {
  const payload = { userId: 1, username: "hello", role: "admin" };

  it("encrypt return string in token format", () => {
    const token = sign(payload);

    expect(typeof token).to.equal("string");
    expect(token.split(".").length).to.equal(3);
  });

  it("verify return with payload", () => {
    const token = sign(payload);
    jwt.verify(token, PUBLIC_KEY, options, (err, decoded) => {
        expect(typeof decoded).to.equal("object");
        expect(decoded['userId']).to.equal(payload.userId);
        expect(decoded['username']).to.equal(payload.username);
        expect(decoded['role']).to.equal(payload.role);
    });
  });
  it("decode base64 payload", () => {});
  it("give different token", () => {});
});
