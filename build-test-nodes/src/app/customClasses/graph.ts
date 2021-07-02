import Node from "./node";

class Graph {

    private _nodes: Node[] = [];
    private _curExamNode: Node | null = null;
    private _searchQueue: Node[] = [];

    public constructor() {
        // nothing to do here
    }

    public resetGraph() {
        this._nodes = [];
        this._curExamNode = null;
        this._searchQueue = [];
    }

    public getAllNodes(): Node[] {
        return this._nodes;
    }

    private getNodeById(nodeId: string): Node | null {
        if (this._nodes.length !== 0) {
            for (let node of this._nodes) {
                if (node.getId() === nodeId) {
                    return node;
                }
            }
        }
        return null;
    }

    private getNodesByIds(nodesIds: string[]): Node[] {
        let theNodes: Node[] = this._nodes.filter((node) => {
            return nodesIds.indexOf(node.getId()) !== -1;
        })
        return theNodes;
    }

    private nodeExists(nodeId: string): boolean {
        return this.getNodeById(nodeId) !== null;
    }

    private nodesExist(nodesIds: string[]): boolean[] {
        let result: boolean[] = [];
        for (let i = 0; i < nodesIds.length; i++) {
            result.push(this.nodeExists(nodesIds[i]));
        }
        return result;
    }

    private addNodeNeighbour(nodeId: string, neighbourId: string): void {
        let theNode: Node;
        if (!this.nodeExists(nodeId)) {
            this._nodes.push(new Node(nodeId));
        }
        theNode = this.getNodeById(nodeId);
        if (!theNode.getNeighboursIds().includes(neighbourId) &&
            nodeId !== neighbourId) {
            theNode.pushNeighbourId(neighbourId);
        }
    }

    public createConnection(nodeAId: string, nodeBId: string): void {
        console.log(`\nCreating direct connection: ${nodeAId} --- ${nodeBId}`);
        console.log(`(only if it doesn't already exist)`);
        this.addNodeNeighbour(nodeAId, nodeBId); // a --> b (one-way connection)
        this.addNodeNeighbour(nodeBId, nodeAId); // b --> a (one-way connection)
    }

    private removeCheckedNodes(arr: Node[]): Node[] {
        return arr.filter((node) => {
            return !node.getChecked()
        })
    }

    private getArr1EltsNotinArr2(arr1: Node[], arr2: Node[]): Node[] {
        let result: Node[] = [];
        let prevIds: string[] = arr2.map((node) => { return node.getId() });
        for (let i = 0; i < arr1.length; i++) {
            if (prevIds.indexOf(arr1[i].getId()) === -1) {
                result.push(arr1[i]);
                prevIds.push(arr1[i].getId());
            }
        }
        return result;
    }

    private uncheckAllNodes(): void {
        for (let node of this._nodes) {
            node.uncheckNode();
        }
    }

    private clearAllPahtsToThisNode(): void {
        for (let node of this._nodes) {
            node.clearPathToThisNode();
        }
    }

    private declareNonExistingNodes(theNodesIds: string[],
        theNodesExistence: boolean[]): void {
        for (let i = 0; i < theNodesExistence.length; i++) {
            if (!theNodesExistence[i]) {
                console.log("Node:", theNodesIds[i], "does not exist");
            }
        }
    }

    private resetValuesForConnectionCheck(): void {
        this._curExamNode = null;
        this._searchQueue = [];
        this.uncheckAllNodes();
        this.clearAllPahtsToThisNode();
    }

    private initializeCurExamNode(startNodeId: string): void {
        this._curExamNode = this.getNodeById(startNodeId);
        this._curExamNode.checkNode();
    }

    private updateCurExamNode(): void {
        // Array.shift() pops the item 0
        this._curExamNode = this._searchQueue.shift();
        this._curExamNode.checkNode();
    }

    private setPathToNodes(prevNode: Node, neighbours: Node[]) {
        for (let node of neighbours) {
            node.unshiftPathToThisNode(prevNode);
        }
    }

    private updateSearchQueue(): void {
        let nextNodes: Node[] = this.getNodesByIds(
            this._curExamNode.getNeighboursIds());
        nextNodes = this.getArr1EltsNotinArr2(nextNodes, this._searchQueue);
        this.setPathToNodes(this._curExamNode, nextNodes)
        this._searchQueue = this._searchQueue.concat(nextNodes);
        this._searchQueue = this.removeCheckedNodes(this._searchQueue);
    }

    private initializeSearchingForConnection(startNodeId: string): void {
        this.resetValuesForConnectionCheck();
        this.initializeCurExamNode(startNodeId);
        this.updateSearchQueue();
    }

    private handleNodeAandBEqual(): string[] {
        console.log("Node A id and node B id are equal");
        console.log("No need to create path to itself");
        return [];
    }

    private handleNonExistingNodes(nodesIds: string[],
        nodesExistence: boolean[]): string[] {
        this.declareNonExistingNodes(nodesIds, nodesExistence);
        return [];
    }

    private allTrue(arr: boolean[]): boolean {
        return arr.every((trueOrFalse) => { return trueOrFalse })
    }

    public getConnection(nodeAId: string, nodeBId: string): string[] {

        console.log(`\nTesting connection between ${nodeAId} and ${nodeBId}:`);

        let nodesExistence: boolean[] = this.nodesExist([nodeAId, nodeBId]);

        if (nodeAId === nodeBId) { return this.handleNodeAandBEqual(); }
        if (!this.allTrue(nodesExistence)) {
            return this.handleNonExistingNodes([nodeAId, nodeBId],
                nodesExistence);
        } else {
            this.initializeSearchingForConnection(nodeAId);
            while (this._searchQueue.length !== 0) {
                this.updateCurExamNode();
                if (this._curExamNode.getId() === nodeBId) {
                    this._curExamNode.addOwnIdToPathToThisNode();
                    console.log("Connection found");
                    return this._curExamNode.getPathToThisNode();
                } else {
                    this.updateSearchQueue();
                }
            }
            console.log("Connection not found");
            return [];
        }
    }
}

export default Graph;
