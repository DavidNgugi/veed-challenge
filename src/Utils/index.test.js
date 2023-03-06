import { convertToKMB, capParagraph } from './index';

describe('Utils', () => {

    it('should convert number to K for all values above 999 and below 1M', () => {
        expect(convertToKMB(1000)).toBe('1.0k');
        expect(convertToKMB(10000)).toBe('10.0k');
        expect(convertToKMB(99999)).toBe('100.0k');
    });

    it('should convert number to M for all values above 1M and below 1B', () => {
        expect(convertToKMB(1000000)).toBe('1.0m');
        expect(convertToKMB(10000000)).toBe('10.0m');
        expect(convertToKMB(99999999)).toBe('100.0m');
    });

    it('should convert number to B for all values above 1B', () => {
        expect(convertToKMB(1000000000)).toBe('1.0b');
        expect(convertToKMB(10000000000)).toBe('10.0b');
        expect(convertToKMB(99999999999)).toBe('100.0b');
    });

    it('should convert number to T for all values above 1T', () => {
        expect(convertToKMB(1000000000000)).toBe('1.0t');
        expect(convertToKMB(10000000000000)).toBe('10.0t');
        expect(convertToKMB(99999999999999)).toBe('100.0t');
    });

    it('should return the same number for all values below 999', () => {
        expect(convertToKMB(0)).toBe("0");
        expect(convertToKMB(999)).toBe("999");
    });

    it('should cap paragraph at 50 characters by default', () => {
        expect(capParagraph('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing...');
    });

    it('should cap paragraph at specified length', () => {
        expect(capParagraph('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 10)).toBe('Lorem ipsu...');
    });

    it('should return the same paragraph if it is shorter than the specified length', () => {
        expect(capParagraph('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 100)).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    });
});
