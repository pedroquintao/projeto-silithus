export default function normalizeWord(word) {
        const splitedWord = word.toLowerCase().split('');
        splitedWord[0] = splitedWord[0].toUpperCase();
        

        return splitedWord.join('')

    }