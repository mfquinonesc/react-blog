class TabItems {

    constructor(labels = []) {
        this.items = {};
        labels.forEach((label, index) => {
            this.items[label] = { index, active: (index == 0) }
        });
    }

    select(label) {
        for (let key in this.items) {
            this.items[key].active = (label === key);
        }
        return this;
    }

    toArray() {
        let array = [];
        for (let key in this.items) {
            array.push({ label: key, index: this.items[key].index, active: this.items[key].active });
        }
        return array.sort((a, b) => a.index - b.index);
    }
}

export { TabItems }