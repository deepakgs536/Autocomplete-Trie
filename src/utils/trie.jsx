class Node {
    constructor(char){
        this.char = char;;
        this.isWord = false;
        this.children = {};
    }
}

export default class Trie {

    constructor(){
        this.root = new Node('');
        this.suggestions = [];
    }

    insert(word) {
        let currentNode = this.root;
        word =  word.toLowerCase();
        for(let i=0;i<word.length;i++){
            let char = word[i];
            if(!currentNode.children[char]){
                currentNode.children[char] = new Node(char);
                currentNode = currentNode.children[char];
            }
            else{
                currentNode = currentNode.children[char];
            }
        }
        currentNode.isWord = true;
    }

    search(word){
        let currentNode = this.root;
        for(let i=0;i<word.length;i++){
            let char = word[i];
            if(currentNode.children[char]){
                currentNode = currentNode.children[char];
                if(i === word.length - 1){
                    return currentNode.isWord
                }
            }
            else {
                return false;
            }

        }
    }

    suggestionsRec(value) {
        let currentNode = this.root;

        for(let i=0;i<value.length;i++){
            let char = value[i];
            if(currentNode.children[char]){
                if(currentNode.children[char].isWord && i === value.length - 1){
                    if(!this.suggestions.includes(value)){
                        this.suggestions.push(value);
                    }
                }
                currentNode = currentNode.children[char];
            }
            else {
                return this.suggestions;
            }
        }
        for(let key in currentNode.children){
            this.suggestionsRec(value + currentNode.children[key].char)
        }
        return this.suggestions;
    }

    resetRec() {
        this.suggestions = [];
    }
 

}


