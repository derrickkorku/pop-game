// Base generator object for generating group list
class GroupGenerator {
    generateGroup() {
        // To be implemented by specific generators
    }
}

// Integer group generator
class IntegerGroupGenerator extends GroupGenerator {
    generateGroup() {
        return Array.from({ length: 10 }, () => Math.floor(Math.random() * 201) - 100);
    }
}

// Alphabet group generator
class AlphabetGroupGenerator extends GroupGenerator {
    generateGroup() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length: 10 }, () => alphabet.charAt(Math.floor(Math.random() * 26)));
    }
}

// Roman numeral group generator
class RomanNumeralGroupGenerator extends GroupGenerator {
    generateGroup() {
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
        return Array.from({ length: 10 }, () => romanNumerals[Math.floor(Math.random() * 12)]);
    }
}