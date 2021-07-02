
interface QueueItem<T> {
    key: T;
    priority: number;
}

class PriorityQueue<T> {

    private keys: Set<T> = new Set();
    private queue: QueueItem<T>[] = [];

    private sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    set(key: T, priority: number) {

        if (!this.keys.has(key)) {
            this.keys.add(key);
            this.queue.push({ key, priority });
        } else {
            this.queue.map((element) => {
                if (element.key === key) {
                    element.priority = priority;
                }

                return element;
            });
        }

        this.sort();
        return this.queue.length;
    }

    next() {
        const element = this.queue.shift();

        this.keys.delete(element.key);

        return element;
    }

    isEmpty() {
        return Boolean(this.queue.length === 0);
    }

    has(key: T) {
        return this.keys.has(key);
    }

    get(key: T) {
        return this.queue.find(element => element.key === key);
    }

}