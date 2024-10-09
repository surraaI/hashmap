class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    // Build a balanced binary search tree from a sorted array
    buildTree(array) {
        array = [...new Set(array)].sort((a, b) => a - b); // Sort and remove duplicates
        return this.buildRecursive(array, 0, array.length - 1);
    }

    buildRecursive(array, start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const root = new Node(array[mid]);

        root.left = this.buildRecursive(array, start, mid - 1);
        root.right = this.buildRecursive(array, mid + 1, end);

        return root;
    }

    // Insertion
    insert(value) {
        const insertRecursively = (node, value) => {
            if (node === null) return new Node(value);
            if (value < node.data) node.left = insertRecursively(node.left, value);
            else node.right = insertRecursively(node.right, value);
            return node;
        };
        this.root = insertRecursively(this.root, value);
    }

    // Deletion
    deleteItem(value) {
        const deleteRecursively = (node, value) => {
            if (node === null) return null;
            if (value < node.data) {
                node.left = deleteRecursively(node.left, value);
            } else if (value > node.data) {
                node.right = deleteRecursively(node.right, value);
            } else {
                // Node with only one child or no child
                if (node.left === null) return node.right;
                if (node.right === null) return node.left;

                // Node with two children: Get the inorder successor (smallest in the right subtree)
                node.data = this.minValue(node.right);
                node.right = deleteRecursively(node.right, node.data);
            }
            return node;
        };
        this.root = deleteRecursively(this.root, value);
    }

    minValue(node) {
        let current = node;
        while (current.left !== null) current = current.left;
        return current.data;
    }

    // Find a node by value
    find(value) {
        const findRecursively = (node, value) => {
            if (node === null || node.data === value) return node;
            if (value < node.data) return findRecursively(node.left, value);
            return findRecursively(node.right, value);
        };
        return findRecursively(this.root, value);
    }

    // Level order traversal (breadth-first)
    levelOrder(callback) {
        if (!callback) throw new Error("Callback function is required");
        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (current === null) continue;
            callback(current);
            queue.push(current.left);
            queue.push(current.right);
        }
    }

    // Depth-first traversals
    inOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback function is required");
        if (node === null) return;
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback function is required");
        if (node === null) return;
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback function is required");
        if (node === null) return;
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }

    // Height of a node
    height(node) {
        if (node === null) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Depth of a node
    depth(node, root = this.root) {
        if (root === null || node === null) return -1;
        if (root === node) return 0;

        const left = this.depth(node, root.left);
        const right = this.depth(node, root.right);

        if (left >= 0) return left + 1;
        if (right >= 0) return right + 1;
        return -1;
    }

    // Check if tree is balanced
    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right)
        );
    }

    // Rebalance the tree
    rebalance() {
        const nodes = [];
        this.inOrder((node) => nodes.push(node.data));
        this.root = this.buildTree(nodes);
    }

    // Pretty print the tree
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}


function generateRandomArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function driverScript() {
    const randomArray = generateRandomArray(15, 100);
    const tree = new Tree(randomArray);

    console.log("Initial Binary Search Tree:");
    tree.prettyPrint();

    // Step 2: Confirm that the tree is balanced by calling isBalanced
    console.log("Is the tree balanced?", tree.isBalanced());

    // Step 3: Print out all elements in level, pre, post, and in order
    console.log("\nLevel-order Traversal:");
    tree.levelOrder((node) => console.log(node.data));

    console.log("\nPre-order Traversal:");
    tree.preOrder((node) => console.log(node.data));

    console.log("\nIn-order Traversal:");
    tree.inOrder((node) => console.log(node.data));

    console.log("\nPost-order Traversal:");
    tree.postOrder((node) => console.log(node.data));

    // Step 4: Unbalance the tree by adding several numbers > 100
    const unbalancingNumbers = [150, 200, 300, 250, 400];
    console.log("\nAdding values to unbalance the tree:", unbalancingNumbers);
    unbalancingNumbers.forEach((num) => tree.insert(num));

    console.log("Tree after inserting numbers > 100:");
    tree.prettyPrint();

    // Step 5: Confirm that the tree is unbalanced by calling isBalanced
    console.log("Is the tree balanced?", tree.isBalanced());

    // Step 6: Balance the tree by calling rebalance
    console.log("\nRebalancing the tree...");
    tree.rebalance();
    tree.prettyPrint();

    // Step 7: Confirm that the tree is balanced by calling isBalanced
    console.log("Is the tree balanced?", tree.isBalanced());

    // Step 8: Print out all elements in level, pre, post, and in order again
    console.log("\nLevel-order Traversal (After Rebalance):");
    tree.levelOrder((node) => console.log(node.data));

    console.log("\nPre-order Traversal (After Rebalance):");
    tree.preOrder((node) => console.log(node.data));

    console.log("\nIn-order Traversal (After Rebalance):");
    tree.inOrder((node) => console.log(node.data));

    console.log("\nPost-order Traversal (After Rebalance):");
    tree.postOrder((node) => console.log(node.data));
}

// Run the driver script
driverScript();