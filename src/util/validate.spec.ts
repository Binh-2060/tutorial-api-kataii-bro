import { expect } from 'chai';
import { describe, it } from 'mocha';
import {usernameRegEx} from "./validate";

describe('RegEx Validation', () => {
   it('validates username (hello)', () => {
       let text = 'hello';
       expect(usernameRegEx.test(text)).to.be.true;
   });
    it('validates username (Hello)', () => {
        let text = 'Hello';
        expect(usernameRegEx.test(text)).to.be.true;
    });
    it('validates username (ironman_)', () => {
        let text = 'ironman_';
        expect(usernameRegEx.test(text)).to.be.true;
    });
    it('validates username (ironman2)', () => {
        let text = 'ironman2';
        expect(usernameRegEx.test(text)).to.be.true;
    });
    it('validates username (myname_2)', () => {
        let text = 'myname_2';
        expect(usernameRegEx.test(text)).to.be.true;
    });
    it('validates username (myname-3)', () => {
        let text = 'myname-3';
        expect(usernameRegEx.test(text)).to.be.true;
    });
    it('validates username (myname.3)', () => {
        let text = 'myname.3';
        expect(usernameRegEx.test(text)).to.be.true;
    });
    it('validates username wrong (h)', () => {
        let text = 'h';
        expect(usernameRegEx.test(text)).to.be.false;
    });
    it('validates username wrong (abcdefghijklmnopqrstvuxyz)', () => {
        let text = 'abcdefghijklmnopqrstvuxyz';
        expect(usernameRegEx.test(text)).to.be.false;
    });
});