class Node {

    private _id: string;
    private _checked: boolean = false;
    private _neighboursIds: string[] = [];
    private _pathToThisNode: string[] = [];

    public constructor(value: string) {
        this._id = value;
    }

    public getId(): string {
        return this._id;
    }

    public getChecked(): boolean {
        return this._checked;
    }

    public checkNode(): void {
        this._checked = true;
    }

    public uncheckNode(): void {
        this._checked = false;
    }

    public getNeighboursIds(): string[] {
        return this._neighboursIds;
    }

    public pushNeighbourId(newNeighbourId: string): void {
        this._neighboursIds.push(newNeighbourId);
    }

    public getPathToThisNode(): string[] {
        return this._pathToThisNode;
    }

    public clearPathToThisNode(): void {
        this._pathToThisNode = [];
    }

    public unshiftPathToThisNode(prevNode: Node): void {
        this._pathToThisNode.unshift(
            ...prevNode.getPathToThisNode(), prevNode.getId());
    }

    public addOwnIdToPathToThisNode(): void {
        this._pathToThisNode.push(this.getId());
    }

    public resetPathToNode(): void {
        this._pathToThisNode = [];
    }
}

export default Node;
