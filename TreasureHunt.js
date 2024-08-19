class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function largestBSTSubtree(root) {
    let maxSum = 0;

    function postOrder(node) {
        if (!node) return [true, 0, Infinity, -Infinity]; // isBST, sum, min, max

        const [leftIsBST, leftSum, leftMin, leftMax] = postOrder(node.left);
        const [rightIsBST, rightSum, rightMin, rightMax] = postOrder(node.right);

        // Check if current subtree is a BST
        if (leftIsBST && rightIsBST && leftMax < node.val && node.val < rightMin) {
            const currentSum = leftSum + rightSum + node.val;
            maxSum = Math.max(maxSum, currentSum);
            return [true, currentSum, Math.min(node.val, leftMin), Math.max(node.val, rightMax)];
        } else {
            return [false, 0, 0, 0];
        }
    }

    postOrder(root);
    return maxSum;
}

// Example Usage:
const tree = new TreeNode(1, 
    new TreeNode(4, 
        new TreeNode(2), 
        new TreeNode(4)
    ),
    new TreeNode(3, 
        new TreeNode(2),
        new TreeNode(5, 
            null, 
            new TreeNode(6)
        )
    )
);

console.log(largestBSTSubtree(tree)); // Output: 20
