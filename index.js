'use strict';

class PrefixSearch {

    /**
    @private
    @param {object} tree
    @param {string} word - key
    @param {object} what - data under key
    */
    _putToTree(tree, word, what) {
        let cur = tree;
        let letter;
        for (let i = 0; i < word.length; i++) {
            letter = word[i];

            if (!cur[letter]) {
                cur[letter] = {};
            }
            if (i < word.length - 1) {
                cur = cur[letter];
            } else {
                cur[letter].list = what || word;
            }
        }
    }

    // последним найдется самое глубокое
    /**
    @private
    @param {Array.<object>} res - result
    @param {object} tree
    @param {string} word - search criteria
    @param {number} idx - index of letter in 'word', null => 0
    */
    __findInTree(res, tree, word, idx) {
        if (!word) {
            return null;
        }
        if (idx == null) {
            idx = 0;
        }
        if (typeof tree == 'object' && tree.list != null) {
            res[0] = tree.list;
        }
        if (!word[idx]) {
            return;
        }
        if (typeof tree == 'object' && word[idx] in tree) {
            this.__findInTree(res, tree[word[idx]], word, idx + 1);
        }
    }

    /**
    @private
    @param {object} tree
    @param {string} word - search criteria
    @return {object}
    */
    _findInTree(tree, word) {
        const res = [];
        this.__findInTree(res, tree, word, 0);
        if (res[0]) {
            return res[0];
        }
        return null;
    }

    /**
    @param {object} options
    @param {object} options.map
    */
    constructor(options) {
        options = options || {};
        this.codesTree = {};

        if (options.map) {
            let key;
            let val;
            for ([key, val] of options.map) {
                this._putToTree(this.codesTree, key, val);
            }
        }
    }

    /**
    @param {string} str
    */
    find(str) {
        return this._findInTree(this.codesTree, str);
    }

}

module.exports = PrefixSearch;
