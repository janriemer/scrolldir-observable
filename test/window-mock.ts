// make all readonly properties mutable
//declare function Mutable<T>(obj: { readonly [P in keyof T]: T[P] }): T;

function Mutable<T>(obj: { readonly [P in keyof T]: T[P] }): T {
    return obj;
}

let window : Window;

export default class WindowMock {

    private windowMockMutable = Mutable(window);
    private scrollEvent = new Event('scroll');

    constructor() {
        this.windowMockMutable = {} as any;
        this.windowMockMutable.pageXOffset = 0;
        this.windowMockMutable.pageYOffset = 0;
        this.windowMockMutable.document = {} as any;
    }

    public scrollTo(x?: number, y?: number): void;
    public scrollTo(options?: ScrollToOptions): void;
    public scrollTo(x?: any, y?: any, options?: any): void {
        if (typeof x == 'number') {
            this.windowMockMutable.pageXOffset = x;
        }
        if (typeof y == 'number') {
            this.windowMockMutable.pageYOffset = y;
        }
        if (options) {
            let optionsTyped: ScrollToOptions = options as ScrollToOptions;
            // TODO
            throw new Error('Support for options has not been implemented yet.');
        }
        this.windowMockMutable.document.dispatchEvent(this.scrollEvent);
    }

    public getWindowMock() {
        return this.windowMockMutable as Window;
    }
}